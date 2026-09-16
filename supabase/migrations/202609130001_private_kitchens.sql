-- Additive migration. Back up the live database before applying.
-- Existing auth.users and kitchen_state records are retained.
begin;
create table if not exists public.kkk_records (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null check (length(id) between 1 and 180),
  kind text not null check (kind in ('config','profile','pantry','leftover','favorite','hidden','history','recipe','rating','vote','preference','plan','grocery','combo','family','event','recurrence','consumption','migration')),
  payload jsonb not null check (pg_column_size(payload) <= 524288),
  version bigint not null default 1 check (version > 0),
  mutation_id uuid not null,
  deleted_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id,id)
);
create index if not exists kkk_records_user_kind_idx on public.kkk_records(user_id,kind) where deleted_at is null;
create index if not exists kkk_records_user_updated_idx on public.kkk_records(user_id,updated_at,id);
alter table public.kkk_records enable row level security;
alter table public.kkk_records force row level security;
revoke all on public.kkk_records from anon,authenticated;
grant select,insert,update on public.kkk_records to authenticated;
create policy kkk_records_select on public.kkk_records for select to authenticated using ((select auth.uid())=user_id);
create policy kkk_records_insert on public.kkk_records for insert to authenticated with check ((select auth.uid())=user_id);
create policy kkk_records_update on public.kkk_records for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);

create or replace function public.kkk_write_record(p_id text,p_kind text,p_payload jsonb,p_expected_version bigint,p_mutation_id uuid,p_deleted boolean default false)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare v_uid uuid:=auth.uid(); v_row public.kkk_records;
begin
  if v_uid is null then raise exception 'Authentication required' using errcode='42501'; end if;
  perform pg_advisory_xact_lock(hashtextextended(v_uid::text||':'||p_id,0));
  select * into v_row from public.kkk_records where user_id=v_uid and id=p_id;
  if found and v_row.mutation_id=p_mutation_id then return jsonb_build_object('record',to_jsonb(v_row)); end if;
  if coalesce(v_row.version,0)<>p_expected_version then return jsonb_build_object('conflict',true,'version',coalesce(v_row.version,0)); end if;
  insert into public.kkk_records(user_id,id,kind,payload,version,mutation_id,deleted_at)
    values(v_uid,p_id,p_kind,p_payload,p_expected_version+1,p_mutation_id,case when p_deleted then now() else null end)
  on conflict(user_id,id) do update set kind=excluded.kind,payload=excluded.payload,version=excluded.version,mutation_id=excluded.mutation_id,deleted_at=excluded.deleted_at,updated_at=now()
  returning * into v_row;
  return jsonb_build_object('record',to_jsonb(v_row));
end;
$$;
revoke all on function public.kkk_write_record(text,text,jsonb,bigint,uuid,boolean) from public,anon;
grant execute on function public.kkk_write_record(text,text,jsonb,bigint,uuid,boolean) to authenticated;

create table if not exists public.kkk_dishes (
  id text primary key,
  canonical_id text not null unique,
  name text not null,
  cuisine text not null,
  categories text[] not null,
  vegetarian boolean not null check(vegetarian),
  eggless boolean not null check(eggless),
  metadata jsonb not null,
  published boolean not null default false,
  search_document tsvector generated always as (to_tsvector('simple',name||' '||cuisine)) stored
);
create index if not exists kkk_dishes_categories_idx on public.kkk_dishes using gin(categories);
create index if not exists kkk_dishes_search_idx on public.kkk_dishes using gin(search_document);
create index if not exists kkk_dishes_cuisine_idx on public.kkk_dishes(cuisine,id) where published;
alter table public.kkk_dishes enable row level security;
revoke all on public.kkk_dishes from anon,authenticated;
grant select on public.kkk_dishes to anon,authenticated;
create policy kkk_master_read on public.kkk_dishes for select to anon,authenticated using(published);

create table if not exists public.kkk_recipes (
  dish_id text primary key references public.kkk_dishes(id) on delete cascade,
  recipe jsonb not null,
  published boolean not null default false
);
alter table public.kkk_recipes enable row level security;
revoke all on public.kkk_recipes from anon,authenticated;
grant select on public.kkk_recipes to anon,authenticated;
create policy kkk_recipe_read on public.kkk_recipes for select to anon,authenticated using(published and exists(select 1 from public.kkk_dishes d where d.id=dish_id and d.published));
commit;
