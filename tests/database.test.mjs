import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
test('real PostgreSQL RLS, migration, compare-and-swap, idempotence and cascade deletion',async()=>{
 const db=new PGlite();
 try{
 await db.exec(`create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema auth to authenticated,anon; grant execute on function auth.uid() to authenticated,anon;`);
 await db.exec(await fs.readFile(new URL('../supabase/migrations/202609130001_private_kitchens.sql',import.meta.url),'utf8'));
 await db.exec(await fs.readFile(new URL('../supabase/migrations/202609130002_legacy_migration.sql',import.meta.url),'utf8'));
 const A='11111111-1111-4111-8111-111111111111',B='22222222-2222-4222-8222-222222222222',m='33333333-3333-4333-8333-333333333333';
 await db.exec(`insert into auth.users values('${A}'),('${B}'); insert into public.kitchen_state(user_id,state) values('${A}','{"favorites":["lunch_0"],"party":{"adults":4,"kids":1},"history":[{"id":"old","name":"Dal Tadka","dishId":"lunch_1","date":"2026-09-01"}],"planner":{"2026-09-14":{"Lunch":{"name":"Dal Tadka","dishId":"lunch_1","adults":4,"kids":1}}}}');`);
 const role=async(uid,as='authenticated')=>db.exec(`reset role; set role ${as}; select set_config('request.jwt.claim.sub','${uid}',false);`);
 await role(A);const imported=await db.query('select public.kkk_import_legacy() result');assert.equal(imported.rows[0].result.imported,true);
 assert.equal((await db.query("select count(*)::int n from public.kkk_records where kind='favorite'")).rows[0].n,1);
 assert.equal((await db.query('select public.kkk_import_legacy() result')).rows[0].result.alreadyImported,true);
 assert.equal((await db.query('select count(*)::int n from public.kitchen_state')).rows[0].n,1);
 const write=`select public.kkk_write_record('combo:test','combo','{"name":"A private menu"}',0,'${m}',false) result`;
 const first=(await db.query(write)).rows[0].result;assert.equal(first.record.user_id,A);assert.equal(first.record.version,1);
 assert.equal((await db.query(write)).rows[0].result.record.version,1);
 assert.equal((await db.query(`select public.kkk_write_record('combo:test','combo','{}',0,gen_random_uuid(),false) result`)).rows[0].result.conflict,true);
 await role(B);assert.equal((await db.query('select count(*)::int n from public.kkk_records')).rows[0].n,0);assert.equal((await db.query('select count(*)::int n from public.kitchen_state')).rows[0].n,0);
 await assert.rejects(()=>db.exec(`insert into public.kkk_records(user_id,id,kind,payload,mutation_id) values('${A}','stolen','combo','{}',gen_random_uuid())`),/row-level security/);
 assert.equal((await db.query(`update public.kkk_records set payload='{}' where user_id='${A}' returning id`)).rows.length,0);
 await assert.rejects(()=>db.exec(`delete from public.kkk_records where user_id='${A}'`),/permission denied/);
 await role('', 'anon');await assert.rejects(()=>db.query('select * from public.kkk_records'),/permission denied/);await assert.rejects(()=>db.query(write),/permission denied/);
 await db.exec('reset role');await db.exec(`insert into public.kkk_dishes(id,canonical_id,name,cuisine,categories,vegetarian,eggless,metadata,published) values('public','public','Dal','Indian',array['Dinner'],true,true,'{}',true),('draft','draft','Draft','Indian',array['Dinner'],true,true,'{}',false);`);
 await role('', 'anon');assert.equal((await db.query('select count(*)::int n from public.kkk_dishes')).rows[0].n,1);await assert.rejects(()=>db.exec(`update public.kkk_dishes set name='tampered'`),/permission denied/);
 await db.exec(`reset role; delete from auth.users where id='${A}';`);assert.equal((await db.query('select count(*)::int n from public.kkk_records')).rows[0].n,0);assert.equal((await db.query('select count(*)::int n from public.kitchen_state')).rows[0].n,0);
 }finally{await db.close();}
});
