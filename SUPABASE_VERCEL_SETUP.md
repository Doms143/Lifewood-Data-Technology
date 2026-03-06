# Supabase + Vercel Setup

## 1. Supabase

1. Create a Supabase project.
2. In the SQL editor, run [supabase/migrations/20260306_admin_bootstrap.sql](C:\dominic files\lifewood-project\supabase\migrations\20260306_admin_bootstrap.sql).
3. In `Authentication > Providers`, enable `Email`.
4. In `Authentication > URL Configuration`, set:
   - `Site URL`: your Vercel production URL
   - `Redirect URLs`: your Vercel URL and local URL, for example:
     - `http://localhost:5173/sign-in`
     - `https://your-app.vercel.app/sign-in`
5. Create your first user from the app sign-up form.
6. Promote that user to admin in Supabase SQL:

```sql
update public.profiles
set role = 'admin'
where email = 'your-admin@example.com';
```

## 2. Vercel

Add these environment variables in the Vercel project settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_EMAILS`

`VITE_ADMIN_EMAILS` is only a bootstrap allowlist for frontend gating. The real admin source of truth should be `public.profiles.role`.

## 3. Local Development

Copy [.env.example](C:\dominic files\lifewood-project\.env.example) to `.env.local` and fill in your values.

## 4. Current Scope

This repo is prepared for:

- Supabase email/password auth
- Admin-only dashboard access
- Vercel static deployment with SPA rewrites

The dashboard data is still local seed data in the frontend. The next backend step is moving interns, tasks, and reports into Supabase tables.
