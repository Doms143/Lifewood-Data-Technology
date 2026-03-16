import { createClient } from '@supabase/supabase-js'
import pdf from 'pdf-parse'

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const geminiApiKey = process.env.GEMINI_API_KEY

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
  : null

const resolveModelName = async (apiKey) => {
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey)
  if (!res.ok) {
    return 'gemini-1.5-flash-latest'
  }
  const data = await res.json()
  const models = data.models || []
  const supportsGenerateContent = (model) => (model.supportedGenerationMethods || []).includes('generateContent')
  const preferred = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash-002',
    'gemini-1.5-flash-001',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
  ]
  for (const name of preferred) {
    const found = models.find((m) => m.name === 'models/' + name && supportsGenerateContent(m))
    if (found) return name
  }
  const anyFlash = models.find((m) => m.name.includes('gemini-1.5-flash') && supportsGenerateContent(m))
  if (anyFlash) return anyFlash.name.replace('models/', '')
  return 'gemini-1.5-flash-latest'
}
const buildPrompt = (cvText) => `
You are a hiring analyst. Score the following CV text from 1-100 using this weighted rubric:
1) Relevance to applied role: 30%
2) Experience depth and impact: 25%
3) Skills and tools match: 20%
4) Education and certifications: 15%
5) Clarity, structure, and professionalism: 10%

Return ONLY valid JSON with this schema:
{
  "overall_score": number,
  "breakdown": {
    "relevance": number,
    "experience": number,
    "skills": number,
    "education": number,
    "clarity": number
  },
  "summary": "string"
}

CV TEXT:
${cvText}
`

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

    const { data: signedData, error: signedError } = await supabase
      .storage
      .from('career-cv')
      .createSignedUrl(normalizedPath, 60 * 10)

    if (signedError || !signedData?.signedUrl) {
      res.status(500).json({ error: 'Unable to access CV file', details: signedError?.message })
      return
    }

    const pdfResponse = await fetch(signedData.signedUrl)
    if (!pdfResponse.ok) {
      res.status(500).json({ error: `Failed to download CV (${pdfResponse.status})` })
      return
    }
    const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer())
    const parsed = await pdf(pdfBuffer)
    const cvText = (parsed.text || '').replace(/\s+/g, ' ').trim().slice(0, 12000)
    if (!cvText) {
      res.status(500).json({ error: 'Unable to extract text from CV' })
      return
    }

    const modelName = await resolveModelName(geminiApiKey)

    const callGemini = async (prompt) => {\r\n      const geminiResponse = await fetch(\r\n        'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':generateContent',\r\n        {\r\n          method: 'POST',\r\n          headers: {\r\n            'Content-Type': 'application/json',\r\n            'x-goog-api-key': geminiApiKey,\r\n          },\r\n          body: JSON.stringify({\r\n            contents: [{ role: 'user', parts: [{ text: prompt }] }],\r\n            generationConfig: {\r\n              temperature: 0.2,\r\n              maxOutputTokens: 900,\r\n              responseMimeType: 'application/json',\r\n            },\r\n          }),\r\n        }\r\n      )\r\n\r\n      if (!geminiResponse.ok) {\r\n        const errorText = await geminiResponse.text()\r\n        throw new Error(Gemini error: )\r\n      }\r\n\r\n      const geminiJson = await geminiResponse.json()\r\n      return geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text || ''\r\n    }\r\n\r\n    let rawText = await callGemini(buildPrompt(cvText))
    let jsonText = rawText
    const fencedMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/i)
    if (fencedMatch) {
      jsonText = fencedMatch[1]
    }
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      const retryPrompt = buildPrompt(cvText.slice(0, 6000)) + "\nReturn ONLY JSON. Do not truncate."
      rawText = await callGemini(retryPrompt)
      jsonText = rawText
      const retryFence = rawText.match(/```json\s*([\s\S]*?)\s*```/i)
      if (retryFence) {
        jsonText = retryFence[1]
      }
      const retryMatch = jsonText.match(/\{[\s\S]*\}/)
      if (!retryMatch) {
        res.status(500).json({ error: 'Invalid Gemini response', details: rawText })
        return
      }
      jsonText = retryMatch[0]
    } else {
      jsonText = jsonMatch[0]
    }

    let scorePayload
    try {
      scorePayload = JSON.parse(jsonText)
    } catch (error) {
      res.status(500).json({ error: 'Failed to parse Gemini response', details: jsonText })
      return
    }

    const overallScore = Number(scorePayload.overall_score || 0)
    const breakdown = scorePayload.breakdown || {}
    const summary = scorePayload.summary || ''

    const { data: updated, error: updateError } = await supabase
      .from('career_applications')
      .update({
        cv_score: overallScore,
        cv_breakdown: breakdown,
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



