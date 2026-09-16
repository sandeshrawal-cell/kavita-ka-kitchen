import test from 'node:test';
import assert from 'node:assert/strict';
import {deleteOwnAccount, recentlyAuthenticated} from '../supabase/functions/delete-account/handler.js';
import proxy from '../api/delete-account.js';
import config from '../api/config.js';

const env={url:'https://test.supabase.co',publicKey:'sb_publishable_test',secretKey:'sb_secret_server'};
const claims=()=>({sub:'verified-owner',role:'authenticated',is_anonymous:false,session_id:'test-session',amr:[{method:'password',timestamp:Math.floor(Date.now()/1000)}]});
const token=value=>'eyJhbGciOiJIUzI1NiJ9.'+Buffer.from(JSON.stringify(value)).toString('base64url')+'.signature';
const request=(value=claims(),body={confirmation:'DELETE',user_id:'victim'})=>new Request('https://test.supabase.co/functions/v1/delete-account',{method:'POST',headers:{Origin:'https://kavita-kitchen-v2.vercel.app','Content-Type':'application/json',Authorization:'Bearer '+token(value)},body:JSON.stringify(body)});
const response=()=>({code:200,setHeader(){},status(n){this.code=n;return this;},json(body){this.body=body;return this;}});

test('Supabase deletion verifies owner, revokes sessions and deletes only that account',async()=>{
 const calls=[];
 const fetcher=async(url,options)=>{calls.push({url,options});return calls.length===1?Response.json({id:'verified-owner'}):calls.length===2?new Response(null,{status:204}):Response.json({});};
 const result=await deleteOwnAccount(request(),env,fetcher);
 assert.equal(result.status,200);assert.deepEqual(await result.json(),{deleted:true});
 assert.deepEqual(calls.map(x=>x.url),[env.url+'/auth/v1/user',env.url+'/auth/v1/logout?scope=global',env.url+'/auth/v1/admin/users/verified-owner']);
 assert.equal(calls[2].options.method,'DELETE');assert.equal(calls[2].options.headers.apikey,env.secretKey);
 assert.equal(calls[2].options.headers.Authorization,undefined);
 assert.equal(calls[0].options.headers.apikey,env.publicKey);assert.equal(calls[1].options.headers.apikey,env.publicKey);
 assert.equal(JSON.parse(calls[2].options.body).should_soft_delete,false);
});

test('old, refreshed, missing, malformed and future authentication cannot authorize deletion',async()=>{
 const now=Math.floor(Date.now()/1000);
 const variants=[{amr:[{method:'password',timestamp:now-601},{method:'token_refresh',timestamp:now}]},{amr:[]},{amr:[{method:'password',timestamp:'yesterday'}]},{amr:[{method:'password',timestamp:now+90}]},{amr:undefined},{is_anonymous:true},{sub:'victim'},{role:'service_role'}];
 for(const changes of variants){let count=0;const result=await deleteOwnAccount(request({...claims(),...changes}),env,async()=>{count++;return Response.json({id:'verified-owner',last_sign_in_at:new Date().toISOString()});});assert.equal(result.status,401);assert.equal(count,1);}
 assert.equal(recentlyAuthenticated('bad-token','verified-owner'),false);
});

test('a forged token rejected by Auth never reaches an administrative request',async()=>{
 let count=0;const result=await deleteOwnAccount(request(),env,async()=>{count++;return new Response(null,{status:401});});
 assert.equal(result.status,401);assert.equal(count,1);
});

test('method, origin, confirmation and token guards run before any network call',async()=>{
 const requests=[new Request('https://test.supabase.co'),request(claims(),{confirmation:'cancel'})];
 const wrongOrigin=request();wrongOrigin.headers.set('Origin','https://evil.example');requests.push(wrongOrigin);
 const missingToken=request();missingToken.headers.delete('Authorization');requests.push(missingToken);
 const expected=[405,400,403,401];
 for(let i=0;i<requests.length;i++){const result=await deleteOwnAccount(requests[i],env,()=>{throw Error('must not fetch');});assert.equal(result.status,expected[i]);}
});

test('failed session revocation does not delete an account; failed deletion does not report success',async()=>{
 for(const failAt of [2,3]){let count=0;const result=await deleteOwnAccount(request(),env,async()=>{count++;return count===1?Response.json({id:'verified-owner'}):new Response(null,{status:count===failAt?500:204});});assert.equal(result.status,failAt===2?503:502);assert.equal(count,failAt);assert.equal((await result.json()).deleted,undefined);}
});

test('the Vercel proxy forwards confirmation and user token, never a supplied target user or secret',async()=>{
 const originalFetch=globalThis.fetch,previous={...process.env};let captured;
 Object.assign(process.env,{APP_ORIGIN:'https://kavita-kitchen-v2.vercel.app',SUPABASE_URL:env.url,SUPABASE_PUBLISHABLE_KEY:env.publicKey,ACCOUNT_DELETION_BACKEND:'supabase'});
 delete process.env.SUPABASE_SERVICE_ROLE_KEY;
 globalThis.fetch=async(url,options)=>{captured={url,options};return Response.json({deleted:true});};
 try{
  const res=response();await proxy({method:'POST',headers:{origin:process.env.APP_ORIGIN,'content-type':'application/json',authorization:'Bearer user-token'},body:{confirmation:'DELETE',user_id:'victim'}},res);
  assert.equal(res.code,200);assert.equal(res.body.deleted,true);assert.equal(captured.url,env.url+'/functions/v1/delete-account');
  assert.deepEqual(JSON.parse(captured.options.body),{confirmation:'DELETE'});assert.equal(captured.options.headers.Authorization,'Bearer user-token');assert.equal(captured.options.headers.apikey,env.publicKey);
  const publicConfig=response();config({},publicConfig);assert.equal(publicConfig.body.accountDeletion,true);assert.equal(publicConfig.body.secretKey,undefined);
 }finally{globalThis.fetch=originalFetch;for(const key of Object.keys(process.env))if(!(key in previous))delete process.env[key];Object.assign(process.env,previous);}
});
