-- Supabase schema for Firefly III user sync endpoint.
-- Endpoint: POST /api/v1/about/supabase/sync-user
-- Expected table: public.firefly_users

create table if not exists public.firefly_users (
    firefly_user_id bigint primary key,
    email text not null default '',
    name text not null default '',
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

-- Keep updated_at current on updates.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = timezone('utc', now());
    return new;
end;
$$;

drop trigger if exists trg_firefly_users_updated_at on public.firefly_users;
create trigger trg_firefly_users_updated_at
before update on public.firefly_users
for each row execute function public.set_updated_at();

-- Optional: index for email lookups.
create index if not exists idx_firefly_users_email on public.firefly_users (email);

-- Optional hardening: enable RLS, keep write access to service_role only.
alter table public.firefly_users enable row level security;

drop policy if exists ff3_service_role_all on public.firefly_users;
create policy ff3_service_role_all
on public.firefly_users
as permissive
for all
to service_role
using (true)
with check (true);
