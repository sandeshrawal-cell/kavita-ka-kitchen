// LOCAL TEST SERVER ONLY. This file is not copied into dist or any Vercel function.
import {PGlite} from '@electric-sql/pglite';
import fs from 'node:fs/promises';
const db=new PGlite();
await db.exec(`create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key); create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$; grant usage on schema auth to anon,authenticated; grant execute on function auth.uid() to anon,authenticated;`);
for(const file of ['202609130001_private_kitchens.sql','202609130002_legacy_migration.sql'])await db.exec(await fs.readFile(new URL('../supabase/migrations/'+file,import.meta.url),'utf8'));
const ids={a:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',b:'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'};
await db.exec(`insert into auth.users values('${ids.a}'),('${ids.b}');`);
let serial=Promise.resolve();
const script=`(()=>{let session=JSON.parse(sessionStorage.getItem('kkk-test-session')||'null'),listeners=[];const emit=e=>listeners.forEach(f=>f(e,session));window.supabase={createClient:()=>({auth:{onAuthStateChange:f=>{listeners.push(f);setTimeout(()=>f('INITIAL_SESSION',session),0);return {data:{subscription:{unsubscribe(){}}}}},getSession:async()=>({data:{session},error:null}),signInWithPassword:async({email,password})=>{if(!/^tester-[ab]@example.test$/.test(email)||password!=='PreviewOnly123!')return {error:{message:'Use tester-a@example.test or tester-b@example.test and PreviewOnly123!'}};let k=email.includes('-a@')?'a':'b';session={user:{id:${JSON.stringify(ids)}[k],email},access_token:'test-'+k};sessionStorage.setItem('kkk-test-session',JSON.stringify(session));emit('SIGNED_IN');return {data:session,error:null}},signUp:async()=>({data:{session:null},error:null}),resetPasswordForEmail:async()=>({error:null}),updateUser:async()=>({data:{user:session?.user},error:null}),signOut:async()=>{session=null;sessionStorage.removeItem('kkk-test-session');emit('SIGNED_OUT');return {error:null}}},rpc:async(name,body)=>{const r=await fetch('/rest/v1/rpc/'+name,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+(session?.access_token||'')},body:JSON.stringify(body||{})});const data=await r.json();return r.ok?{data,error:null}:{data:null,error:{message:data.message}}}})};})();`;
export async function handle(req,res,url){
 const json=(status,x)=>{res.statusCode=status;res.setHeader('Content-Type','application/json');res.setHeader('Cache-Control','no-store');res.end(JSON.stringify(x));};
 if(url.pathname==='/api/config'){json(200,{configured:true,url:'http://'+req.headers.host,key:'local-test-only',accountDeletion:false});return true;}
 if(url.pathname==='/assets/supabase.js'){res.setHeader('Content-Type','text/javascript');res.end(script);return true;}
 if(!url.pathname.startsWith('/rest/v1/'))return false;
 let body='';for await(const c of req)body+=c;const p=body?JSON.parse(body):{};const id=ids[String(req.headers.authorization||'').replace('Bearer test-','')];if(!id){json(401,{message:'Test sign-in required'});return true;}
 const work=async()=>{try{await db.exec(`reset role;set role authenticated;select set_config('request.jwt.claim.sub','${id}',false);`);let result;
 if(url.pathname==='/rest/v1/rpc/kkk_import_legacy')result=(await db.query('select public.kkk_import_legacy() result')).rows[0].result;
 else if(url.pathname==='/rest/v1/rpc/kkk_write_record')result=(await db.query('select public.kkk_write_record($1,$2,$3,$4,$5,$6) result',[p.p_id,p.p_kind,JSON.stringify(p.p_payload),p.p_expected_version,p.p_mutation_id,p.p_deleted])).rows[0].result;
 else if(url.pathname==='/rest/v1/kkk_records'){const filter=url.searchParams.get('id');result=(await db.query('select * from public.kkk_records'+(filter?' where id '+(filter.startsWith('gt.')?'>':'=')+' $1':'')+' order by id limit 500',filter?[filter.slice(3)]:[])).rows;}
 else throw Error('Unknown test route');json(200,result);
 }catch(e){json(400,{message:e.message});}};
 serial=serial.then(work,work);await serial;return true;
}
