import { corsHeaders, jsonResponse } from '../_shared/http.ts'

const MAX_HISTORY_ITEMS = 8
const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash'
const DEFAULT_GROQ_MODEL = 'llama-3.3-70b-versatile'
const DASHBOARD_ONLY_RESPONSE = 'I can only answer questions about the dashboard data shown here.'

const chatbotGeminiApiKey =
  Deno.env.get('CHATBOT_GEMINI_API_KEY') ||
  Deno.env.get('GEMINI_CHATBOT_API_KEY') ||
  Deno.env.get('GEMINI_API_KEY') ||
  ''

const chatbotGroqApiKey =
  Deno.env.get('CHATBOT_GROQ_API_KEY') ||
  Deno.env.get('GROQ_CHATBOT_API_KEY') ||
  Deno.env.get('GROQ_API_KEY') ||
  ''

const chatbotGeminiModel =
  Deno.env.get('CHATBOT_GEMINI_MODEL') ||
  Deno.env.get('GEMINI_CHATBOT_MODEL') ||
  DEFAULT_GEMINI_MODEL

const chatbotGroqModel =
  Deno.env.get('CHATBOT_GROQ_MODEL') ||
  Deno.env.get('GROQ_CHATBOT_MODEL') ||
  DEFAULT_GROQ_MODEL

const formatHistory = (history: unknown) => {
  if (!Array.isArray(history)) return ''

  return history
    .slice(-MAX_HISTORY_ITEMS)
    .map((item) => {
      const content = String((item as { content?: string })?.content || '').trim()
      if (!content) return ''
      const role = (item as { role?: string })?.role === 'user' ? 'User' : 'Assistant'
      return `${role}: ${content}`
    })
    .filter(Boolean)
    .join('\n')
}

const buildPrompt = ({
  message,
  context,
  history,
}: {
  message: string
  context: unknown
  history: unknown
}) => {
  const historyText = formatHistory(history)

  return `
You are Dashboard AI for Lifewood.

Rules:
- Answer only using the provided dashboard context.
- If the answer is not present in the context, reply exactly: ${DASHBOARD_ONLY_RESPONSE}
- Do not invent numbers, names, statuses, or actions.
- Do not give general advice, and do not discuss anything outside the dashboard.
- Keep the answer concise and practical.
- Use the full dashboard context payload, not only the currently active or rendered tab view.
- For application lifecycle questions, treat final hire decisions from hire_status as higher priority than status.
- The hiring flow is: pending -> approved / Proceeding to HR Interview -> interview scheduled -> hired or not hired.
- If an application has hire_status of hired or not_hired, describe it using that final state instead of the intermediate status.
- Applications are split into active and archived scopes. Archived applications are those with hire_status of hired or not_hired.
- The dashboard also includes a website inquiry inbox under the Inquiries tab.

Dashboard context:
${JSON.stringify(context || {}, null, 2)}

Recent chat:
${historyText || 'No prior chat.'}

User question:
${String(message || '').trim()}
`
}

const parseTextResponse = async (response: Response, providerName: string) => {
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

const callGemini = async (apiKey: string, modelName: string, prompt: string) => {
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

const callGroq = async (apiKey: string, modelName: string, prompt: string) => {
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

const isQuotaLikeError = (error: unknown) => {
  const message = String((error as { message?: string })?.message || error || '').toLowerCase()
  return (
    message.includes('429') ||
    message.includes('quota') ||
    message.includes('resource_exhausted') ||
    message.includes('rate limit') ||
    message.includes('too many requests') ||
    message.includes('insufficient')
  )
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    if (req.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405)
    }

    const { message, context, history } = await req.json().catch(() => ({}))
    if (!message || !String(message).trim()) {
      return jsonResponse({ error: 'message is required' }, 400)
    }

    const prompt = buildPrompt({ message, context, history })

    if (!chatbotGeminiApiKey && !chatbotGroqApiKey) {
      return jsonResponse({ error: 'Chatbot API key is not configured' }, 500)
    }

    let provider = chatbotGeminiApiKey ? 'gemini' : 'groq'
    let model = provider === 'gemini' ? chatbotGeminiModel : chatbotGroqModel
    let answer = ''

    try {
      answer =
        provider === 'gemini'
          ? await callGemini(chatbotGeminiApiKey, chatbotGeminiModel, prompt)
          : await callGroq(chatbotGroqApiKey, chatbotGroqModel, prompt)
    } catch (error) {
      if (provider !== 'gemini' || !isQuotaLikeError(error) || !chatbotGroqApiKey) {
        throw error
      }

      provider = 'groq'
      model = chatbotGroqModel
      answer = await callGroq(chatbotGroqApiKey, chatbotGroqModel, prompt)
    }

    const cleaned = String(answer || '').trim()
    if (!cleaned) {
      return jsonResponse({ error: `Empty ${provider} response` }, 500)
    }

    return jsonResponse({
      answer: cleaned,
      provider,
      model,
    })
  } catch (error) {
    console.error('chatbot handler failed:', error)
    return jsonResponse({ error: (error as { message?: string })?.message || 'Unexpected server error' }, 500)
  }
})
