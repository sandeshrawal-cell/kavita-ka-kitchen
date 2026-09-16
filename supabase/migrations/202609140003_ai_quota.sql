begin;
create table if not exists public.kkk_ai_usage (
 user_id uuid primary key references auth.users(id) on delete cascade,
 usage_day date not null default current_date,
 requests integer not null default 0 check (requests between 0 and 30),
 last_request timestamptz
);
alter table public.kkk_ai_usage enable row level security;
revoke all on public.kkk_ai_usage from public,anon,authenticated;
create or replace function public.kkk_consume_ai_quota() returns boolean
language plpgsql security definer set search_path='' as $$
declare v_id uuid:=auth.uid(); v_row public.kkk_ai_usage;
begin
 if v_id is null then raise exception 'Authentication required' using errcode='42501'; end if;
 perform pg_advisory_xact_lock(hashtextextended('ai:'||v_id::text,0));
 select * into v_row from public.kkk_ai_usage where user_id=v_id;
 if found and v_row.last_request > now()-interval '60 seconds' then return false; end if;
 if found and v_row.usage_day=current_date and v_row.requests>=30 then return false; end if;
 insert into public.kkk_ai_usage(user_id,usage_day,requests,last_request)
 values(v_id,current_date,1,now()) on conflict(user_id) do update
 set requests=case when kkk_ai_usage.usage_day=current_date then kkk_ai_usage.requests+1 else 1 end,usage_day=current_date,last_request=now();
 return true;
end; $$;
revoke all on function public.kkk_consume_ai_quota() from public,anon;
grant execute on function public.kkk_consume_ai_quota() to authenticated;
commit;
