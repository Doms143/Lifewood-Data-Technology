const chatbotGeminiApiKey =
  process.env.CHATBOT_GEMINI_API_KEY ||
  process.env.GEMINI_CHATBOT_API_KEY ||
  process.env.VITE_CHATBOT_GEMINI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  ''

const chatbotModelName =
  process.env.CHATBOT_GEMINI_MODEL ||
  process.env.GEMINI_CHATBOT_MODEL ||
  process.env.VITE_CHATBOT_GEMINI_MODEL ||
  'gemini-2.5-flash'

const readRequestBody = (req) => {
  const body = req.body
  if (!body) return {}
  if (typeof body === 'object') return body
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }
  return {}
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
          maxOutputTokens: 500,
        },
      }),
    }
  )

  const responseText = await geminiResponse.text()
  if (!geminiResponse.ok) {
    throw new Error(`Gemini error (${geminiResponse.status}): ${responseText || 'empty response'}`)
  }

  const geminiJson = JSON.parse(responseText)
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

    const { message, context, history } = readRequestBody(req)
    if (!message || !String(message).trim()) {
      res.status(400).json({ error: 'message is required' })
      return
    }

    const prompt = buildPrompt({ message, context, history })
    const answer = await callGemini(chatbotGeminiApiKey, chatbotModelName, prompt)

    const cleaned = String(answer || '').trim()
    if (!cleaned) {
      res.status(500).json({ error: 'Empty Gemini response' })
      return
    }

    res.status(200).json({
      answer: cleaned,
      model: chatbotModelName,
    })
  } catch (error) {
    console.error('chatbot handler failed:', error)
    res.status(500).json({ error: error?.message || 'Unexpected server error' })
  }
}

