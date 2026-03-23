alter table public.career_applications
add column if not exists interview_scheduled_at timestamptz;

alter table public.career_applications
add column if not exists interview_timezone text;

alter table public.career_applications
add column if not exists interview_location text;

alter table public.career_applications
add column if not exists interview_schedule_sent_at timestamptz;
x`