create or replace function public.is_valid_email(value text)
returns boolean
language sql
immutable
set search_path = public
as $$
  select
    value is not null
    and length(btrim(value)) between 3 and 320
    and lower(btrim(value)) ~ '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$';
$$;

revoke all on function public.is_valid_email(text) from public;
grant execute on function public.is_valid_email(text) to anon, authenticated;

alter table public.profiles
  drop constraint if exists profiles_email_format_check;
alter table public.profiles
  add constraint profiles_email_format_check
  check (email is null or public.is_valid_email(email));

alter table public.signup_requests
  drop constraint if exists signup_requests_email_format_check;
alter table public.signup_requests
  add constraint signup_requests_email_format_check
  check (public.is_valid_email(email));

alter table public.signup_requests
  drop constraint if exists signup_requests_full_name_length_check;
alter table public.signup_requests
  add constraint signup_requests_full_name_length_check
  check (length(btrim(full_name)) between 1 and 160);

alter table public.signup_requests
  drop constraint if exists signup_requests_phone_length_check;
alter table public.signup_requests
  add constraint signup_requests_phone_length_check
  check (phone is null or length(btrim(phone)) <= 40);

alter table public.signup_requests
  drop constraint if exists signup_requests_department_length_check;
alter table public.signup_requests
  add constraint signup_requests_department_length_check
  check (department is null or length(btrim(department)) <= 120);

alter table public.contact_inquiries
  drop constraint if exists contact_inquiries_email_format_check;
alter table public.contact_inquiries
  add constraint contact_inquiries_email_format_check
  check (public.is_valid_email(work_email));

alter table public.contact_inquiries
  drop constraint if exists contact_inquiries_full_name_length_check;
alter table public.contact_inquiries
  add constraint contact_inquiries_full_name_length_check
  check (length(btrim(full_name)) between 1 and 160);

alter table public.contact_inquiries
  drop constraint if exists contact_inquiries_company_name_length_check;
alter table public.contact_inquiries
  add constraint contact_inquiries_company_name_length_check
  check (company_name is null or length(btrim(company_name)) <= 160);

alter table public.contact_inquiries
  drop constraint if exists contact_inquiries_requirements_length_check;
alter table public.contact_inquiries
  add constraint contact_inquiries_requirements_length_check
  check (length(btrim(requirements)) between 1 and 4000);

alter table public.hired_employees
  drop constraint if exists hired_employees_email_format_check;
alter table public.hired_employees
  add constraint hired_employees_email_format_check
  check (public.is_valid_email(email));

alter table public.hired_employees
  drop constraint if exists hired_employees_first_name_length_check;
alter table public.hired_employees
  add constraint hired_employees_first_name_length_check
  check (length(btrim(first_name)) between 1 and 100);

alter table public.hired_employees
  drop constraint if exists hired_employees_last_name_length_check;
alter table public.hired_employees
  add constraint hired_employees_last_name_length_check
  check (length(btrim(last_name)) between 1 and 100);

alter table public.hired_employees
  drop constraint if exists hired_employees_phone_number_length_check;
alter table public.hired_employees
  add constraint hired_employees_phone_number_length_check
  check (phone_number is null or length(btrim(phone_number)) <= 40);

alter table public.admin_interns
  drop constraint if exists admin_interns_email_format_check;
alter table public.admin_interns
  add constraint admin_interns_email_format_check
  check (public.is_valid_email(email));

alter table public.admin_interns
  drop constraint if exists admin_interns_name_length_check;
alter table public.admin_interns
  add constraint admin_interns_name_length_check
  check (length(btrim(name)) between 1 and 160);

alter table public.admin_task_entries
  drop constraint if exists admin_task_entries_task_length_check;
alter table public.admin_task_entries
  add constraint admin_task_entries_task_length_check
  check (length(btrim(task)) between 1 and 1000);
