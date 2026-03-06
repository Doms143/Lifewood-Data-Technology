alter table public.profiles
add column if not exists can_manage_approvals boolean not null default false;

update public.profiles
set can_manage_approvals = true
where email = 'dominictacatani123@gmail.com';

create or replace function public.can_manage_approvals()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and can_manage_approvals = true
      and is_approved = true
  );
$$;
