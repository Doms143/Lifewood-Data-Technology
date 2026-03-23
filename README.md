# Lifewood Project

React/Vite frontend for the Lifewood website and admin dashboard, backed by Supabase and a small set of serverless API endpoints.

## Stack

- React 18
- Vite 4
- Tailwind CSS
- Framer Motion
- Supabase
- Vercel serverless functions in [`api/`](./api)

## Main Areas

- Public marketing pages and route shell: [`src/App.jsx`](./src/App.jsx)
- Shared frontend content/config: [`src/lib/appContent.js`](./src/lib/appContent.js)
- Supabase client setup: [`src/lib/supabaseClient.js`](./src/lib/supabaseClient.js)
- Admin dashboard shell: [`src/components/AdminDashboardShell.jsx`](./src/components/AdminDashboardShell.jsx)
- Admin tab components: [`src/components/admin`](./src/components/admin)
- Chat assistant endpoint: [`api/chatbot.js`](./api/chatbot.js)
- CV scoring endpoint: [`api/score-cv.js`](./api/score-cv.js)
- Supabase SQL migrations: [`supabase/migrations`](./supabase/migrations)
- Supabase edge function for Sheets sync: [`supabase/functions/sync-to-sheets/index.ts`](./supabase/functions/sync-to-sheets/index.ts)

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Environment

Copy the shape from [`.env.example`](./.env.example) into your local env file and provide the values you actually use.

Common variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_EMAILS`
- `CHATBOT_GEMINI_API_KEY`
- `CHATBOT_GEMINI_MODEL`
- `CHATBOT_GROQ_API_KEY`
- `CHATBOT_GROQ_MODEL`
- `VITE_EMAILJS_*`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`

## Notes

- The app currently keeps a large amount of page and dashboard state in [`src/App.jsx`](./src/App.jsx).
- The admin surface is already being split into dedicated components under [`src/components/admin`](./src/components/admin), which is the right direction for further cleanup.
- Build output is written to [`dist/`](./dist).
