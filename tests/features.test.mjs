import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {parseAmount,shoppingList,materializeRecurrences,consumptionSummary,portionLearning,householdTaste,productionSchedule,eventSchedule,substitutes,skillStep} from '../src/intelligence.js';
import {parseSearch,recommend,headcount} from '../src/core.js';
import {sanitizeResult} from '../api/assistant.js';
const dishes=JSON.parse(await fs.readFile(new URL('../catalog/generated/dishes.json',import.meta.url)));
const party={mode:'home',adults:4,kids:0},dal=dishes.find(d=>d.id==='dal-tadka');
test('pantry quantities normalize units and never deduct expired or unmeasured stock',()=>{
 assert.deepEqual(parseAmount('1.5 kg'),{qty:1500,unit:'g'});assert.equal(parseAmount('one bag'),null);
 const r=[{ingredients:[{name:'tomato',qty:2000,unit:'g',group:'Vegetables'}]}];
 const list=shoppingList(r,[{name:'tomatoes',quantity:'1 kg'},{name:'tomato',quantity:'2 kg',expiry:'2020-01-01'},{name:'tomato',quantity:'a bag'}],'2026-09-14');
 assert.equal(list[0].qty,1000);assert.equal(list[0].required,2000);assert.equal(list[0].onHand,1000);
});
test('recurring combos preserve every dish, occupied slots and 8-day locks',()=>{
 const rule={_id:'recurrence:1',weekday:1,meal:'Lunch',name:'Dal and rice',dishIds:['dal-tadka','jeera-rice'],party};
 const r=materializeRecurrences(dishes,[rule],'2026-09-14',28,{},{});
 assert.equal(r.created.length,2);assert.equal(r.skipped.length,2);assert.deepEqual(r.created[0].dishIds,rule.dishIds);assert.equal(r.created[1].date,'2026-09-28');
 const occupied={date:'2026-09-14',meal:'Lunch',name:'Keep me',dishIds:['curd'],party};
 assert.ok(!materializeRecurrences(dishes,[rule],'2026-09-14',1,{}, {plans:[occupied]}).created.length);
 assert.equal(materializeRecurrences(dishes,[rule],'2026-09-14',1,{exclusions:['tomato']},{}).created.length,0);
 assert.equal(materializeRecurrences(dishes,[{...rule,enabled:false}],'2026-09-14',28,{},{}).created.length,0);
});
test('consumption values and portion learning are based on recorded evidence',()=>{
 assert.equal(portionLearning([{dishId:'a',prepared:4,eaten:3,people:4}],'a'),null);
 assert.equal(portionLearning(Array.from({length:3},()=>({dishId:'a',prepared:4,eaten:3,people:4})),'a').portionsPerPerson,.75);
 const s=consumptionSummary([{name:'rice',qty:500,unit:'g',outcome:'used',value:40},{name:'rice',qty:100,unit:'g',outcome:'wasted',value:8}]);assert.equal(s.valueUsed,40);assert.equal(s.valueWasted,8);assert.equal(s.groups[0].wasted,100);
});
test('plain language supports number words, multiple exclusions and available ingredients',()=>{
 const r=parseSearch('Punjabi dinner for six adults and three kids under 30 minutes without potato and onion');assert.equal(r.adults,6);assert.equal(r.kids,3);assert.deepEqual(r.exclusions,['potato','onion']);assert.equal(r.query,'');
 assert.deepEqual(parseSearch('I have paneer and capsicum').available,['paneer','capsicum']);
 assert.deepEqual(parseSearch("we don't want rice").exclusions,['rice']);
});
test('cook something new omits previously cooked dishes even after rotation unlock',()=>{
 const r=recommend(dishes,{category:'Dinner',newOnly:true},{history:[{date:'2020-01-01',dishIds:['dal-tadka']}]});assert.ok(!r.some(d=>d.id==='dal-tadka'));
});
test('production schedule respects staff, vessel limits and non-overlapping station jobs',()=>{
 const r=productionSchedule([dal,{...dal,id:'other',name:'Other'}],[{id:dal.id,batchSize:50}],{mode:'factory',adults:500,kids:0},{servingsPerBatch:100,stations:4,staff:2,serviceHour:13});
 assert.equal(r.stations,2);assert.equal(r.jobs.find(j=>j.id===dal.id).batches,10);
 for(const lane of [1,2]){const list=r.jobs.filter(j=>j.lane===lane).sort((a,b)=>a.start-b.start);for(let i=1;i<list.length;i++)assert.ok(list[i].start>=list[i-1].end);}
 assert.throws(()=>productionSchedule([],[],party,{stations:-1}));
});
test('all-day events coordinate four sessions and retain dietary filters',()=>{
 const r=eventSchedule(dishes,{mode:'event',adults:200,kids:0,meal:'All-day menu'},{jain:true},{});assert.equal(r.length,4);for(const session of r)for(const d of session.dishes)assert.equal(d.jainVerified,true);
});
test('substitutions preserve allergies and beginner instructions explain terms',()=>{
 assert.ok(!substitutes('cream',dal,{}, {exclusions:['nuts','dairy']}).includes('cashew'));assert.ok(!substitutes('cream',dal,{}, {exclusions:['nuts','dairy']}).includes('curd'));assert.match(skillStep('Simmer gently','Beginner'),/small gentle bubbles/);
});
test('household tastes include member-specific votes and cuisine preferences',()=>{
 const member={_id:'family:kid',name:'Kid',child:true,likes:['tomato'],cuisines:['North Indian']};const r=householdTaste([dal],{family:[member],votes:{[dal.id]:{'family:kid':1}}});assert.ok(r[0].scored[0].score>0);
});
test('every published photo has review, source, licence and both local image sizes',async()=>{
 const map=JSON.parse(await fs.readFile(new URL('../catalog/photos.json',import.meta.url)));let count=0;
 const prompts=JSON.parse(await fs.readFile(new URL('../catalog/generated-image-prompts.json',import.meta.url)));
 for(const d of dishes.filter(d=>d.photo)){const p=d.photo;assert.equal(p.status,'reviewed');if(p.kind==='generated'){assert.ok(prompts[d.id]?.prompt);assert.equal(p.author,'OpenAI image generation');}else{assert.match(p.source,/^https:\/\/commons.wikimedia.org\/wiki\/File:/);assert.match(p.license,/CC|Public domain/);assert.ok(p.author);}await fs.access(new URL('../public'+p.src,import.meta.url));await fs.access(new URL('../public'+p.small,import.meta.url));count++;}
 const pending=JSON.parse(await fs.readFile(new URL('../catalog/pending-images.json',import.meta.url)));
 assert.equal(count+pending.length,dishes.length,'Every dish must have a reviewed image or an explicit deferred replacement');
 for(const d of dishes.filter(d=>!d.photo))assert.ok(pending.some(p=>p.id===d.id),d.id);
 for(const [id,p] of Object.entries(map).filter(([,p])=>p.status==='rejected'))assert.ok(!dishes.find(d=>d.id===id)?.photo);
});
test('AI results are bounded and exclude animal ingredients',()=>{
 assert.deepEqual(sanitizeResult({ingredients:['tomato','chicken','egg','paneer']},'vision').ingredients,['tomato','paneer']);const r=sanitizeResult({category:'unsafe',adults:999999,jain:true,exclusions:['aloo']},'search');assert.equal(r.filters.category,'Dinner');assert.equal(r.filters.adults,100000);assert.deepEqual(r.filters.exclusions,['potato']);
});
test('AI quota is isolated, inaccessible directly and enforced by PostgreSQL',async()=>{
 const db=new PGlite();try{
 await db.exec("create role anon;create role authenticated;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth to authenticated,anon;grant execute on function auth.uid() to authenticated,anon;");
 await db.exec(await fs.readFile(new URL('../supabase/migrations/202609140003_ai_quota.sql',import.meta.url),'utf8'));
 const a='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',b='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';await db.exec(`insert into auth.users values('${a}'),('${b}');set role authenticated;select set_config('request.jwt.claim.sub','${a}',false);`);
 assert.equal((await db.query('select public.kkk_consume_ai_quota() ok')).rows[0].ok,true);assert.equal((await db.query('select public.kkk_consume_ai_quota() ok')).rows[0].ok,false);await assert.rejects(()=>db.query('select * from public.kkk_ai_usage'),/permission denied/);
 await db.exec(`select set_config('request.jwt.claim.sub','${b}',false);`);assert.equal((await db.query('select public.kkk_consume_ai_quota() ok')).rows[0].ok,true);
 await db.exec(`reset role;update public.kkk_ai_usage set requests=30,last_request=now()-interval '2 minutes' where user_id='${a}';set role authenticated;select set_config('request.jwt.claim.sub','${a}',false);`);assert.equal((await db.query('select public.kkk_consume_ai_quota() ok')).rows[0].ok,false);
 await db.exec('reset role;set role anon');await assert.rejects(()=>db.query('select public.kkk_consume_ai_quota()'),/permission denied/);
 }finally{await db.close();}
});
test('complete public recipes have static HTML, ingredients, canonical URLs and schema',async()=>{
 const page=await fs.readFile(new URL('../dist/recipe/dal-tadka/index.html',import.meta.url),'utf8');assert.match(page,/<h1>Dal Tadka<\/h1>/);assert.match(page,/application\/ld\+json/);assert.match(page,/rel="canonical"/);assert.match(page,/recipeIngredient/);
});
