create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  work_email text not null,
  company_name text,
  requirements text not null,
  status text not null default 'new',
  reviewed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint contact_inquiries_status_check check (status in ('new', 'reviewed', 'archived'))
);

drop trigger if exists contact_inquiries_set_updated_at on public.contact_inquiries;
create trigger contact_inquiries_set_updated_at
before update on public.contact_inquiries
for each row execute procedure public.set_updated_at();

alter table public.contact_inquiries enable row level security;

drop policy if exists "contact_inquiries_public_insert" on public.contact_inquiries;
create policy "contact_inquiries_public_insert"
on public.contact_inquiries
for insert
to anon, authenticated
with check (true);

drop policy if exists "contact_inquiries_admin_select" on public.contact_inquiries;
create policy "contact_inquiries_admin_select"
on public.contact_inquiries
for select
to authenticated
using (public.is_admin());

drop policy if exists "contact_inquiries_admin_update" on public.contact_inquiries;
create policy "contact_inquiries_admin_update"
on public.contact_inquiries
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "contact_inquiries_admin_delete" on public.contact_inquiries;
create policy "contact_inquiries_admin_delete"
on public.contact_inquiries
for delete
to authenticated
using (public.is_admin());
