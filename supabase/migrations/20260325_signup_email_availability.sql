create or replace function public.is_signup_email_available(candidate_email text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select not exists (
    select 1
    from public.signup_requests
    where lower(trim(email)) = lower(trim(candidate_email))
  );
$$;

revoke all on function public.is_signup_email_available(text) from public;
grant execute on function public.is_signup_email_available(text) to anon, authenticated;
