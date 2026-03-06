create table if not exists public.signup_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  password_hint text,
  phone text,
  department text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_note text,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists signup_requests_set_updated_at on public.signup_requests;
create trigger signup_requests_set_updated_at
before update on public.signup_requests
for each row execute procedure public.set_updated_at();

alter table public.signup_requests enable row level security;

drop policy if exists "signup_requests_public_insert" on public.signup_requests;
create policy "signup_requests_public_insert"
on public.signup_requests
for insert
with check (true);

drop policy if exists "signup_requests_authenticated_select" on public.signup_requests;
create policy "signup_requests_authenticated_select"
on public.signup_requests
for select
using (public.can_manage_approvals());

drop policy if exists "signup_requests_authenticated_update" on public.signup_requests;
create policy "signup_requests_authenticated_update"
on public.signup_requests
for update
using (public.can_manage_approvals())
with check (public.can_manage_approvals());

drop policy if exists "signup_requests_authenticated_delete" on public.signup_requests;
create policy "signup_requests_authenticated_delete"
on public.signup_requests
for delete
using (public.can_manage_approvals());
