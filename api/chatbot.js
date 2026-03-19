const chatbotGeminiApiKey =
  process.env.CHATBOT_GEMINI_API_KEY ||
  process.env.GEMINI_CHATBOT_API_KEY ||
  ''

const chatbotModelOverride = process.env.CHATBOT_GEMINI_MODEL || ''

const resolveModelName = async (apiKey) => {
  if (chatbotModelOverride) return chatbotModelOverride

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

const buildPrompt = ({ message, context, history }) => {
  const historyText = Array.isArray(history)
    ? history
        .slice(-8)
        .map((item) => `${item.role === 'user' ? 'User' : 'Assistant'}: ${String(item.content || '').trim()}`)
        .filter(Boolean)
        .join('\n')
    : ''

  return `
You are Dashboard AI for Lifewood.

Rules:
- Answer only using the provided dashboard context.
- If the answer is not present in the context, reply exactly: I can only answer questions about the dashboard data shown here.
- Do not invent numbers, names, statuses, or actions.
- Do not give general advice, and do not discuss anything outside the dashboard.
- Keep the answer concise and practical.

Dashboard context:
${JSON.stringify(context || {}, null, 2)}

Recent chat:
${historyText || 'No prior chat.'}

User question:
${String(message || '').trim()}
`
}

const callGemini = async (apiKey, modelName, prompt) => {
  const geminiResponse = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':generateContent',
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
          maxOutputTokens: 500,
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

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    if (!chatbotGeminiApiKey) {
      res.status(500).json({ error: 'Chatbot API key is not configured' })
      return
    }

    const { message, context, history } = req.body || {}
    if (!message || !String(message).trim()) {
      res.status(400).json({ error: 'message is required' })
      return
    }

    const modelName = await resolveModelName(chatbotGeminiApiKey)
    const prompt = buildPrompt({ message, context, history })
    const answer = await callGemini(chatbotGeminiApiKey, modelName, prompt)

    const cleaned = String(answer || '').trim()
    if (!cleaned) {
      res.status(500).json({ error: 'Empty Gemini response' })
      return
    }

    res.status(200).json({
      answer: cleaned,
      model: modelName,
    })
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Unexpected server error' })
  }
}
