const chatbotGeminiApiKey =
  process.env.CHATBOT_GEMINI_API_KEY ||
  process.env.GEMINI_CHATBOT_API_KEY ||
  process.env.VITE_CHATBOT_GEMINI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  ''

const chatbotGroqApiKey =
  process.env.CHATBOT_GROQ_API_KEY ||
  process.env.GROQ_CHATBOT_API_KEY ||
  process.env.GROQ_API_KEY ||
  ''

const chatbotGeminiModel =
  process.env.CHATBOT_GEMINI_MODEL ||
  process.env.GEMINI_CHATBOT_MODEL ||
  process.env.VITE_CHATBOT_GEMINI_MODEL ||
  'gemini-2.5-flash'

const chatbotGroqModel =
  process.env.CHATBOT_GROQ_MODEL ||
  process.env.GROQ_CHATBOT_MODEL ||
  'llama-3.3-70b-versatile'

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
- For application lifecycle questions, treat final hire decisions from hire_status as higher priority than status.
- The hiring flow is: pending -> approved / Proceeding to HR Interview -> interview scheduled -> hired or not hired.
- If an application has hire_status of hired or not_hired, describe it using that final state instead of the intermediate status.

Dashboard context:
${JSON.stringify(context || {}, null, 2)}

Recent chat:
${historyText || 'No prior chat.'}

User question:
${String(message || '').trim()}
`
}

const parseTextResponse = async (response, providerName) => {
  const responseText = await response.text()
  if (!response.ok) {
    throw new Error(`${providerName} error (${response.status}): ${responseText || 'empty response'}`)
  }

  try {
    return JSON.parse(responseText)
  } catch {
    throw new Error(`${providerName} returned invalid JSON`)
  }
}

const callGemini = async (apiKey, modelName, prompt) => {
  const response = await fetch(
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

  const json = await parseTextResponse(response, 'Gemini')
  return json?.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

const callGroq = async (apiKey, modelName, prompt) => {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelName,
      temperature: 0.2,
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  const json = await parseTextResponse(response, 'Groq')
  return json?.choices?.[0]?.message?.content || ''
}

const isQuotaLikeError = (error) => {
  const message = String(error?.message || error || '').toLowerCase()
  return (
    message.includes('429') ||
    message.includes('quota') ||
    message.includes('resource_exhausted') ||
    message.includes('rate limit') ||
    message.includes('too many requests') ||
    message.includes('insufficient')
  )
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    const { message, context, history } = readRequestBody(req)
    if (!message || !String(message).trim()) {
      res.status(400).json({ error: 'message is required' })
      return
    }

    const prompt = buildPrompt({ message, context, history })

    let answer = ''
    let provider = 'gemini'
    let model = chatbotGeminiModel

    if (chatbotGeminiApiKey) {
      try {
        answer = await callGemini(chatbotGeminiApiKey, chatbotGeminiModel, prompt)
      } catch (error) {
        if (!isQuotaLikeError(error) || !chatbotGroqApiKey) {
          throw error
        }
        provider = 'groq'
        model = chatbotGroqModel
        answer = await callGroq(chatbotGroqApiKey, chatbotGroqModel, prompt)
      }
    } else if (chatbotGroqApiKey) {
      provider = 'groq'
      model = chatbotGroqModel
      answer = await callGroq(chatbotGroqApiKey, chatbotGroqModel, prompt)
    } else {
      res.status(500).json({ error: 'Chatbot API key is not configured' })
      return
    }

    const cleaned = String(answer || '').trim()
    if (!cleaned) {
      res.status(500).json({ error: `Empty ${provider} response` })
      return
    }

    res.status(200).json({
      answer: cleaned,
      provider,
      model,
    })
  } catch (error) {
    console.error('chatbot handler failed:', error)
    res.status(500).json({ error: error?.message || 'Unexpected server error' })
  }
}

