create or replace function public.can_accept_contact_inquiry()
returns boolean
language sql
security definer
set search_path = public
as $$
  select (
    select count(*)
    from public.contact_inquiries
    where created_at >= timezone('utc', now()) - interval '1 minute'
  ) < 50;
$$;

revoke all on function public.can_accept_contact_inquiry() from public;
grant execute on function public.can_accept_contact_inquiry() to anon, authenticated;

create or replace function public.enforce_contact_inquiry_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (
    select count(*)
    from public.contact_inquiries
    where created_at >= timezone('utc', now()) - interval '1 minute'
  ) >= 50 then
    raise exception 'Too many contact inquiries. Please try again in a minute.'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

drop trigger if exists contact_inquiries_rate_limit on public.contact_inquiries;
create trigger contact_inquiries_rate_limit
before insert on public.contact_inquiries
for each row execute function public.enforce_contact_inquiry_rate_limit();
