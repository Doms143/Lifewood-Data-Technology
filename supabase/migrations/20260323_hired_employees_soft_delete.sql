alter table public.hired_employees
add column if not exists record_status text;

update public.hired_employees
set record_status = 'active'
where record_status is null;

alter table public.hired_employees
alter column record_status set default 'active';

alter table public.hired_employees
alter column record_status set not null;

alter table public.hired_employees
drop constraint if exists hired_employees_record_status_check;

alter table public.hired_employees
add constraint hired_employees_record_status_check
check (record_status in ('active', 'deleted'));
