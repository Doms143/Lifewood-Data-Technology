create table if not exists public.hired_employees (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  application_id uuid not null unique references public.career_applications(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone_code text,
  phone_number text,
  gender text,
  age integer,
  country text,
  address text,
  positions text[] not null default '{}',
  cv_filename text,
  cv_path text,
  application_status text,
  hire_status text not null default 'hired',
  hired_at timestamptz not null default timezone('utc', now()),
  reviewed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint hired_employees_hire_status_check check (hire_status in ('hired'))
);

drop trigger if exists hired_employees_set_updated_at on public.hired_employees;
create trigger hired_employees_set_updated_at
before update on public.hired_employees
for each row execute procedure public.set_updated_at();

alter table public.hired_employees enable row level security;

drop policy if exists "hired_employees_admin_select" on public.hired_employees;
create policy "hired_employees_admin_select"
on public.hired_employees
for select
using (public.is_admin() or owner_user_id = auth.uid());

drop policy if exists "hired_employees_admin_insert" on public.hired_employees;
create policy "hired_employees_admin_insert"
on public.hired_employees
for insert
with check (public.is_admin() or owner_user_id = auth.uid());

drop policy if exists "hired_employees_admin_update" on public.hired_employees;
create policy "hired_employees_admin_update"
on public.hired_employees
for update
using (public.is_admin() or owner_user_id = auth.uid())
with check (public.is_admin() or owner_user_id = auth.uid());

drop policy if exists "hired_employees_admin_delete" on public.hired_employees;
create policy "hired_employees_admin_delete"
on public.hired_employees
for delete
using (public.is_admin() or owner_user_id = auth.uid());
