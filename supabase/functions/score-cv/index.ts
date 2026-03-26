import { Buffer } from 'node:buffer'
import { createClient } from 'npm:@supabase/supabase-js@2.57.4'
import pdf from 'npm:pdf-parse@1.1.1'
import { corsHeaders, jsonResponse } from '../_shared/http.ts'

const DEFAULT_GEMINI_MODEL = 'gemini-1.5-flash-latest'
const MAX_CV_TEXT_LENGTH = 12000
const RETRY_CV_TEXT_LENGTH = 6000

const supabaseUrl =
  Deno.env.get('SUPABASE_URL') ||
  Deno.env.get('PROJECT_URL') ||
  ''

const supabaseServiceKey =
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ||
  Deno.env.get('SERVICE_ROLE_KEY') ||
  ''

const geminiApiKey =
  Deno.env.get('GEMINI_API_KEY') ||
  Deno.env.get('CHATBOT_GEMINI_API_KEY') ||
  ''

const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
    : null

const preferredGeminiModels = [
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash-002',
  'gemini-1.5-flash-001',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
]

const supportsGenerateContent = (model: { supportedGenerationMethods?: string[] }) =>
  (model.supportedGenerationMethods || []).includes('generateContent')

const resolveModelName = async (apiKey: string) => {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
  if (!response.ok) {
    return DEFAULT_GEMINI_MODEL
  }

  const data = await response.json()
  const models = data.models || []

  for (const name of preferredGeminiModels) {
    const found = models.find((model: { name?: string; supportedGenerationMethods?: string[] }) =>
      model.name === `models/${name}` && supportsGenerateContent(model)
    )
    if (found) return name
  }

  const fallbackFlashModel = models.find(
    (model: { name?: string; supportedGenerationMethods?: string[] }) =>
      model.name?.includes('gemini-1.5-flash') && supportsGenerateContent(model)
  )

  return fallbackFlashModel?.name?.replace('models/', '') || DEFAULT_GEMINI_MODEL
}

const buildPrompt = (cvText: string) => `
You are a hiring analyst. Score the following CV text from 1-100 using this weighted rubric.
Be slightly lenient: if the CV is reasonably relevant and competent, avoid very low scores.
Use the full range only when clearly warranted; average/typical CVs should land around 55-75.
1) Relevance to applied role: 30%
2) Experience depth and impact: 25%
3) Skills and tools match: 20%
4) Education and certifications: 15%
5) Clarity, structure, and professionalism: 10%

Return ONLY in this exact format:
<score> | <short reason>
Where <score> is an integer 1-100 and <short reason> is a single short sentence (max 12 words).
No JSON, no labels, no extra text.

CV TEXT:
${cvText}
`

const extractCvText = async (signedUrl: string) => {
  const pdfResponse = await fetch(signedUrl)
  if (!pdfResponse.ok) {
    throw new Error(`Failed to download CV (${pdfResponse.status})`)
  }

  const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer())
  const parsed = await pdf(pdfBuffer)
  return (parsed.text || '').replace(/\s+/g, ' ').trim().slice(0, MAX_CV_TEXT_LENGTH)
}

const callGemini = async ({ apiKey, modelName, prompt }: { apiKey: string; modelName: string; prompt: string }) => {
  const geminiResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 900,
        },
      }),
    }
  )

  if (!geminiResponse.ok) {
    const errorText = await geminiResponse.text()
    throw new Error(`Gemini error: ${errorText || geminiResponse.status}`)
  }

  const geminiJson = await geminiResponse.json()
  return geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

const extractScoreAndReason = (text: string) => {
  const raw = String(text || '').trim()
  const match = raw.match(/\b(\d{1,3})\b/)
  if (!match) return { score: null, reason: '' }

  const value = Number(match[1])
  if (!Number.isFinite(value)) return { score: null, reason: '' }

  const score = Math.min(100, Math.max(1, value))
  const parts = raw.split('|')

  let reason = ''
  if (parts.length > 1) {
    reason = parts.slice(1).join('|').trim()
  } else {
    reason = raw.replace(match[1], '').replace(/^[^a-zA-Z0-9]+/, '').trim()
  }

  if (reason.length > 140) {
    reason = reason.slice(0, 140).trim()
  }

  return { score, reason }
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    if (req.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405)
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      return jsonResponse(
        {
          error:
            'Supabase Edge Function secrets are missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
        },
        500
      )
    }

    if (!supabase || !geminiApiKey) {
      return jsonResponse(
        {
          error:
            'Gemini API key is missing. Set GEMINI_API_KEY in Supabase Edge Function secrets.',
        },
        500
      )
    }

    const { applicationId } = await req.json().catch(() => ({}))
    if (!applicationId) {
      return jsonResponse({ error: 'applicationId is required' }, 400)
    }

    const { data: application, error: fetchError } = await supabase
      .from('career_applications')
      .select('*')
      .eq('id', applicationId)
      .single()

    if (fetchError || !application) {
      return jsonResponse({ error: 'Application not found' }, 404)
    }

    if (application.cv_score !== null && application.cv_score !== undefined) {
      return jsonResponse({ application })
    }

    const cvPath = application.cv_path || ''
    if (!cvPath) {
      return jsonResponse({ error: 'CV path missing' }, 400)
    }

    const normalizedPath = cvPath.replace(/^career-cv\//, '').replace(/^CAREER-CV\//, '')

    const { data: signedData, error: signedError } = await supabase.storage
      .from('career-cv')
      .createSignedUrl(normalizedPath, 60 * 10)

    if (signedError || !signedData?.signedUrl) {
      return jsonResponse({ error: 'Unable to access CV file', details: signedError?.message }, 500)
    }

    const cvText = await extractCvText(signedData.signedUrl)
    if (!cvText) {
      return jsonResponse({ error: 'Unable to extract text from CV' }, 500)
    }

    const modelName = await resolveModelName(geminiApiKey)

    let rawText = await callGemini({
      apiKey: geminiApiKey,
      modelName,
      prompt: buildPrompt(cvText),
    })

    let { score: overallScore, reason: summary } = extractScoreAndReason(rawText)

    if (overallScore === null) {
      rawText = await callGemini({
        apiKey: geminiApiKey,
        modelName,
        prompt: `${buildPrompt(cvText.slice(0, RETRY_CV_TEXT_LENGTH))}\nReturn ONLY: <score> | <short reason>.`,
      })

      const retry = extractScoreAndReason(rawText)
      overallScore = retry.score
      summary = retry.reason

      if (overallScore === null) {
        return jsonResponse({ error: 'Invalid Gemini response', details: rawText }, 500)
      }
    }

    const { data: updated, error: updateError } = await supabase
      .from('career_applications')
      .update({
        cv_score: overallScore,
        cv_breakdown: null,
        cv_summary: summary,
        cv_scored_at: new Date().toISOString(),
      })
      .eq('id', applicationId)
      .select('*')
      .single()

    if (updateError || !updated) {
      return jsonResponse({ error: 'Failed to save score' }, 500)
    }

    return jsonResponse({
      application: {
        ...updated,
        cv_score: updated.cv_score,
        cv_breakdown: updated.cv_breakdown,
        cv_summary: updated.cv_summary,
        cv_scored_at: updated.cv_scored_at,
      },
    })
  } catch (error) {
    return jsonResponse({ error: (error as { message?: string })?.message || 'Unexpected server error' }, 500)
  }
})
