import { createClient } from '@supabase/supabase-js'
import pdf from 'pdf-parse'

const DEFAULT_GEMINI_MODEL = 'gemini-1.5-flash-latest'
const MAX_CV_TEXT_LENGTH = 12000
const RETRY_CV_TEXT_LENGTH = 6000

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const geminiApiKey = process.env.GEMINI_API_KEY

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

const supportsGenerateContent = (model) =>
  (model.supportedGenerationMethods || []).includes('generateContent')

const resolveModelName = async (apiKey) => {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
  if (!response.ok) {
    return DEFAULT_GEMINI_MODEL
  }

  const data = await response.json()
  const models = data.models || []

  for (const name of preferredGeminiModels) {
    const found = models.find((model) => model.name === `models/${name}` && supportsGenerateContent(model))
    if (found) return name
  }

  const fallbackFlashModel = models.find(
    (model) => model.name.includes('gemini-1.5-flash') && supportsGenerateContent(model)
  )

  return fallbackFlashModel?.name?.replace('models/', '') || DEFAULT_GEMINI_MODEL
}

const buildPrompt = (cvText) => `
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

const extractCvText = async (signedUrl) => {
  const pdfResponse = await fetch(signedUrl)
  if (!pdfResponse.ok) {
    throw new Error(`Failed to download CV (${pdfResponse.status})`)
  }

  const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer())
  const parsed = await pdf(pdfBuffer)
  return (parsed.text || '').replace(/\s+/g, ' ').trim().slice(0, MAX_CV_TEXT_LENGTH)
}

const callGemini = async ({ apiKey, modelName, prompt }) => {
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

const extractScoreAndReason = (text) => {
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

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    if (!supabase || !geminiApiKey) {
      res.status(500).json({ error: 'Server is not configured' })
      return
    }

    const { applicationId } = req.body || {}
    if (!applicationId) {
      res.status(400).json({ error: 'applicationId is required' })
      return
    }

    const { data: application, error: fetchError } = await supabase
      .from('career_applications')
      .select('*')
      .eq('id', applicationId)
      .single()

    if (fetchError || !application) {
      res.status(404).json({ error: 'Application not found' })
      return
    }

    if (application.cv_score !== null && application.cv_score !== undefined) {
      res.status(200).json({ application })
      return
    }

    const cvPath = application.cv_path || ''
    if (!cvPath) {
      res.status(400).json({ error: 'CV path missing' })
      return
    }

    const normalizedPath = cvPath.replace(/^career-cv\//, '').replace(/^CAREER-CV\//, '')

    const { data: signedData, error: signedError } = await supabase.storage
      .from('career-cv')
      .createSignedUrl(normalizedPath, 60 * 10)

    if (signedError || !signedData?.signedUrl) {
      res.status(500).json({ error: 'Unable to access CV file', details: signedError?.message })
      return
    }

    const cvText = await extractCvText(signedData.signedUrl)
    if (!cvText) {
      res.status(500).json({ error: 'Unable to extract text from CV' })
      return
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
        res.status(500).json({ error: 'Invalid Gemini response', details: rawText })
        return
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
      res.status(500).json({ error: 'Failed to save score' })
      return
    }

    res.status(200).json({
      application: {
        ...updated,
        cv_score: updated.cv_score,
        cv_breakdown: updated.cv_breakdown,
        cv_summary: updated.cv_summary,
        cv_scored_at: updated.cv_scored_at,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Unexpected server error' })
  }
}
