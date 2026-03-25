create or replace function public.can_accept_signup_request()
returns boolean
language sql
security definer
set search_path = public
as $$
  select (
    select count(*)
    from public.signup_requests
    where created_at >= timezone('utc', now()) - interval '1 minute'
  ) < 50;
$$;

revoke all on function public.can_accept_signup_request() from public;
grant execute on function public.can_accept_signup_request() to anon, authenticated;

create or replace function public.enforce_signup_request_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (
    select count(*)
    from public.signup_requests
    where created_at >= timezone('utc', now()) - interval '1 minute'
  ) >= 50 then
    raise exception 'Too many signup requests. Please try again in a minute.'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

drop trigger if exists signup_requests_rate_limit on public.signup_requests;
create trigger signup_requests_rate_limit
before insert on public.signup_requests
for each row execute function public.enforce_signup_request_rate_limit();
