-- Kavita ka Kitchen cloud backup & sync
-- Run this ONCE in Supabase: SQL Editor -> New query -> paste -> Run.

create table if not exists public.kitchen_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.kitchen_state enable row level security;

-- Re-create policies safely.
drop policy if exists "Users can read their kitchen state" on public.kitchen_state;
drop policy if exists "Users can insert their kitchen state" on public.kitchen_state;
drop policy if exists "Users can update their kitchen state" on public.kitchen_state;
drop policy if exists "Users can delete their kitchen state" on public.kitchen_state;

create policy "Users can read their kitchen state"
on public.kitchen_state for select
using (auth.uid() = user_id);

create policy "Users can insert their kitchen state"
on public.kitchen_state for insert
with check (auth.uid() = user_id);

create policy "Users can update their kitchen state"
on public.kitchen_state for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their kitchen state"
on public.kitchen_state for delete
using (auth.uid() = user_id);

-- Keep updated_at current even if an older client does not send it.
create or replace function public.set_kitchen_state_updated_at()
returns trigger language plpgsql security invoker set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_kitchen_state_updated_at on public.kitchen_state;
create trigger trg_kitchen_state_updated_at
before update on public.kitchen_state
for each row execute function public.set_kitchen_state_updated_at();
