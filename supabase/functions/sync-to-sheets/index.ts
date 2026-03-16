import { SignJWT, importPKCS8 } from 'npm:jose'

const REQUIRED_ENV = ['GOOGLE_SERVICE_ACCOUNT_JSON', 'GOOGLE_SHEET_ID']

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function getAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000)
  const key = await importPKCS8(serviceAccount.private_key, 'RS256')
  const jwt = await new SignJWT({
    scope: 'https://www.googleapis.com/auth/spreadsheets',
  })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuer(serviceAccount.client_email)
    .setSubject(serviceAccount.client_email)
    .setAudience(serviceAccount.token_uri)
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key)

  const response = await fetch(serviceAccount.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Token error: ${text}`)
  }

  const data = await response.json()
  return data.access_token
}

function toStringValue(value) {
  if (value === null || value === undefined) return ''
  if (Array.isArray(value)) return value.join(', ')
  return String(value)
}

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405)
    }

    for (const key of REQUIRED_ENV) {
      if (!Deno.env.get(key)) {
        return jsonResponse({ error: `Missing env ${key}` }, 500)
      }
    }

    const sheetId = Deno.env.get('GOOGLE_SHEET_ID')
    const sheetTab = Deno.env.get('GOOGLE_SHEET_TAB') || 'Applicants'
    const serviceAccount = JSON.parse(Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON'))

    const payload = await req.json()
    const record = payload.record || payload.new || payload

    const row = [
      toStringValue(record.created_at || new Date().toISOString()),
      toStringValue(record.first_name),
      toStringValue(record.last_name),
      toStringValue(record.email),
      toStringValue(record.phone_code),
      toStringValue(record.phone_number),
      toStringValue(record.gender),
      toStringValue(record.age),
      toStringValue(record.country),
      toStringValue(record.address),
      toStringValue(record.positions),
      toStringValue(record.cv_filename),
      toStringValue(record.cv_path),
    ]

    const accessToken = await getAccessToken(serviceAccount)

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetTab)}!A1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`

    const sheetResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [row] }),
    })

    if (!sheetResponse.ok) {
      const text = await sheetResponse.text()
      return jsonResponse({ error: `Sheets API error: ${text}` }, 500)
    }

    return jsonResponse({ ok: true })
  } catch (error) {
    return jsonResponse({ error: error.message }, 500)
  }
})
