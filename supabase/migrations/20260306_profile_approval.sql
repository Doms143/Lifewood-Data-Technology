alter table public.profiles
add column if not exists is_approved boolean not null default false;

alter table public.profiles
add column if not exists approved_at timestamptz;

update public.profiles
set is_approved = true,
    approved_at = coalesce(approved_at, timezone('utc', now()))
where role in ('admin', 'superadmin');

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'superadmin')
      and is_approved = true
  );
$$;
