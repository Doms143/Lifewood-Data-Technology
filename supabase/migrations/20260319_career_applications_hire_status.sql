alter table public.career_applications
add column if not exists hire_status text;

alter table public.career_applications
drop constraint if exists career_applications_hire_status_check;

alter table public.career_applications
add constraint career_applications_hire_status_check
check (hire_status is null or hire_status in ('hired', 'not_hired'));
