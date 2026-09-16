-- Safe, authenticated, one-time import from the existing per-user cloud row.
-- Never imports the old browser-wide localStorage key: it has no trustworthy owner.
begin;
create table if not exists public.kitchen_state (
 user_id uuid primary key references auth.users(id) on delete cascade,
 state jsonb not null default '{}'::jsonb,
 updated_at timestamptz not null default now()
);
alter table public.kitchen_state enable row level security;
revoke all on public.kitchen_state from anon;
-- Restrictive policies cap ANY pre-existing permissive policy without destroying it.
drop policy if exists kkk_legacy_owner on public.kitchen_state;
create policy kkk_legacy_owner on public.kitchen_state as restrictive for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);
drop policy if exists kkk_legacy_read on public.kitchen_state;
create policy kkk_legacy_read on public.kitchen_state for select to authenticated using((select auth.uid())=user_id);
grant select on public.kitchen_state to authenticated;

create or replace function public.kkk_import_legacy() returns jsonb language plpgsql security invoker set search_path='' as $$
declare s jsonb; v_uid uuid:=auth.uid(); field text; kind_name text; item jsonb; entry record; meal record; idx integer; rec_id text;
begin
 if v_uid is null then raise exception 'Authentication required' using errcode='42501'; end if;
 perform pg_advisory_xact_lock(hashtextextended(v_uid::text||':legacy-import',0));
 if exists(select 1 from public.kkk_records where user_id=v_uid and id='migration:legacy-v1') then return '{"alreadyImported":true}'::jsonb; end if;
 select state into s from public.kitchen_state where user_id=v_uid;
 if s is not null then
  foreach field in array array['party','weather','settings','exclusions'] loop
   if s ? field then perform public.kkk_write_record('config:'||field,'config',s->field,0,gen_random_uuid(),false); end if;
  end loop;
  foreach field in array array['favorites','hidden','pantry','leftovers','history','custom'] loop
   kind_name:=case field when 'favorites' then 'favorite' when 'leftovers' then 'leftover' when 'custom' then 'recipe' else field end;
   idx:=0;
   if jsonb_typeof(s->field)='array' then
    for item in select value from jsonb_array_elements(s->field) loop
     idx:=idx+1;
     if field in ('favorites','hidden') then rec_id:=kind_name||':'||(item#>>'{}');item:=jsonb_build_object('dishId',item#>>'{}');
     elsif field in ('pantry','leftovers') then rec_id:=kind_name||':legacy-'||idx;item:=jsonb_build_object('name',item#>>'{}');
     else rec_id:=kind_name||':'||coalesce(item->>'id','legacy-'||idx); end if;
     perform public.kkk_write_record(rec_id,kind_name,item,0,gen_random_uuid(),false);
    end loop;
   end if;
  end loop;
  foreach field in array array['ratings','votes','preference','groceryChecked'] loop
   kind_name:=case field when 'ratings' then 'rating' when 'votes' then 'vote' when 'groceryChecked' then 'grocery' else field end;
   if jsonb_typeof(s->field)='object' then
    for entry in select * from jsonb_each(s->field) loop
     perform public.kkk_write_record(kind_name||':'||entry.key,kind_name,jsonb_build_object('dishId',entry.key,'value',entry.value),0,gen_random_uuid(),false);
    end loop;
   end if;
  end loop;
  if jsonb_typeof(s->'planner')='object' then
   for entry in select * from jsonb_each(s->'planner') loop
    if jsonb_typeof(entry.value)='object' then
     for meal in select * from jsonb_each(entry.value) loop
      item:=meal.value||jsonb_build_object('date',entry.key,'meal',meal.key,'dishIds',jsonb_build_array(meal.value->>'dishId'),'party',jsonb_build_object('mode','home','adults',coalesce((meal.value->>'adults')::int,2),'kids',coalesce((meal.value->>'kids')::int,0),'guests',0,'buffer',0));
      perform public.kkk_write_record('plan:'||entry.key||':'||meal.key,'plan',item,0,gen_random_uuid(),false);
     end loop;
    end if;
   end loop;
  end if;
 end if;
 perform public.kkk_write_record('migration:legacy-v1','migration',jsonb_build_object('imported',s is not null,'at',now()),0,gen_random_uuid(),false);
 return jsonb_build_object('imported',s is not null);
end;
$$;
revoke all on function public.kkk_import_legacy() from public,anon;
grant execute on function public.kkk_import_legacy() to authenticated;
commit;
