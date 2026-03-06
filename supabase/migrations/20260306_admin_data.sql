create table if not exists public.admin_interns (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  gender text,
  course text,
  contact text,
  required_hours integer not null default 0,
  school text,
  track text,
  status text,
  mentor text,
  join_date date,
  performance integer not null default 0,
  attendance integer not null default 0,
  progress integer not null default 0,
  low boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists admin_interns_set_updated_at on public.admin_interns;
create trigger admin_interns_set_updated_at
before update on public.admin_interns
for each row execute procedure public.set_updated_at();

alter table public.admin_interns enable row level security;

drop policy if exists "admin_interns_admin_select" on public.admin_interns;
create policy "admin_interns_admin_select"
on public.admin_interns
for select
using (public.is_admin() or owner_user_id = auth.uid());

drop policy if exists "admin_interns_admin_insert" on public.admin_interns;
create policy "admin_interns_admin_insert"
on public.admin_interns
for insert
with check (public.is_admin() or owner_user_id = auth.uid());

drop policy if exists "admin_interns_admin_update" on public.admin_interns;
create policy "admin_interns_admin_update"
on public.admin_interns
for update
using (public.is_admin() or owner_user_id = auth.uid())
with check (public.is_admin() or owner_user_id = auth.uid());

drop policy if exists "admin_interns_admin_delete" on public.admin_interns;
create policy "admin_interns_admin_delete"
on public.admin_interns
for delete
using (public.is_admin() or owner_user_id = auth.uid());

create table if not exists public.admin_task_entries (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  intern_name text not null,
  task text not null,
  score integer not null,
  activity_type text not null default 'Activity',
  created_at_date date not null default current_date,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.admin_task_entries enable row level security;

drop policy if exists "admin_task_entries_admin_select" on public.admin_task_entries;
create policy "admin_task_entries_admin_select"
on public.admin_task_entries
for select
using (public.is_admin() or owner_user_id = auth.uid());

drop policy if exists "admin_task_entries_admin_insert" on public.admin_task_entries;
create policy "admin_task_entries_admin_insert"
on public.admin_task_entries
for insert
with check (public.is_admin() or owner_user_id = auth.uid());

drop policy if exists "admin_task_entries_admin_update" on public.admin_task_entries;
create policy "admin_task_entries_admin_update"
on public.admin_task_entries
for update
using (public.is_admin() or owner_user_id = auth.uid())
with check (public.is_admin() or owner_user_id = auth.uid());

drop policy if exists "admin_task_entries_admin_delete" on public.admin_task_entries;
create policy "admin_task_entries_admin_delete"
on public.admin_task_entries
for delete
using (public.is_admin() or owner_user_id = auth.uid());
