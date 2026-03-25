revoke all on function public.set_updated_at() from public;
revoke all on function public.handle_new_user() from public;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, phone, department, role, is_approved, can_manage_approvals, approved_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.raw_user_meta_data ->> 'department', ''),
    'user',
    false,
    false,
    null
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = excluded.full_name,
    phone = excluded.phone,
    department = excluded.department;

  return new;
end;
$$;

create or replace function public.protect_profile_privileged_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    if auth.uid() is not null and auth.uid() <> new.id then
      raise exception 'You may only create your own profile.' using errcode = '42501';
    end if;

    if auth.uid() is not null and not public.is_admin() then
      new.role := 'user';
      new.is_approved := false;
      new.can_manage_approvals := false;
      new.approved_at := null;
    end if;

    return new;
  end if;

  if auth.uid() is null then
    return new;
  end if;

  if public.is_admin() then
    return new;
  end if;

  if auth.uid() <> old.id then
    raise exception 'You may only update your own profile.' using errcode = '42501';
  end if;

  if new.role is distinct from old.role
    or new.is_approved is distinct from old.is_approved
    or new.can_manage_approvals is distinct from old.can_manage_approvals
    or new.approved_at is distinct from old.approved_at then
    raise exception 'Only admins may change profile approval or role fields.' using errcode = '42501';
  end if;

  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'superadmin')
      and is_approved = true
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create or replace function public.can_manage_approvals()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and can_manage_approvals = true
      and is_approved = true
  );
$$;

revoke all on function public.can_manage_approvals() from public;
grant execute on function public.can_manage_approvals() to authenticated;

alter table public.profiles force row level security;
alter table public.signup_requests force row level security;
alter table public.contact_inquiries force row level security;
alter table public.admin_interns force row level security;
alter table public.admin_task_entries force row level security;
alter table public.hired_employees force row level security;

drop trigger if exists profiles_protect_privileged_fields on public.profiles;
create trigger profiles_protect_privileged_fields
before insert or update on public.profiles
for each row execute function public.protect_profile_privileged_fields();

drop policy if exists "signup_requests_public_insert" on public.signup_requests;
create policy "signup_requests_public_insert"
on public.signup_requests
for insert
to anon, authenticated
with check (
  nullif(btrim(full_name), '') is not null
  and length(btrim(full_name)) <= 160
  and nullif(btrim(email), '') is not null
  and length(btrim(email)) <= 320
  and lower(btrim(email)) ~ '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
  and coalesce(length(btrim(phone)), 0) <= 40
  and coalesce(length(btrim(department)), 0) <= 120
  and status = 'pending'
  and reviewed_by is null
  and reviewed_at is null
);

drop policy if exists "contact_inquiries_public_insert" on public.contact_inquiries;
create policy "contact_inquiries_public_insert"
on public.contact_inquiries
for insert
to anon, authenticated
with check (
  nullif(btrim(full_name), '') is not null
  and length(btrim(full_name)) <= 160
  and nullif(btrim(work_email), '') is not null
  and length(btrim(work_email)) <= 320
  and lower(btrim(work_email)) ~ '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
  and coalesce(length(btrim(company_name)), 0) <= 160
  and nullif(btrim(requirements), '') is not null
  and length(btrim(requirements)) <= 4000
  and status = 'new'
  and reviewed_by is null
);
