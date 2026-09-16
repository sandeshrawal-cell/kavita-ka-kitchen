import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/assistant.js';
const response=()=>({code:200,setHeader(){},status(n){this.code=n;return this;},json(x){this.body=x;return this;}});
async function env(run){const saved={...process.env},original=globalThis.fetch;Object.assign(process.env,{APP_ORIGIN:'https://kitchen.example',OPENAI_API_KEY:'test-server-only',OPENAI_MODEL:'test-model',SUPABASE_URL:'https://example.supabase.co',SUPABASE_PUBLISHABLE_KEY:'test-public'});try{await run();}finally{globalThis.fetch=original;for(const key of Object.keys(process.env))if(!(key in saved))delete process.env[key];Object.assign(process.env,saved);}}
const req=()=>({method:'POST',headers:{origin:'https://kitchen.example','content-type':'application/json',authorization:'Bearer user-a'},body:{mode:'search',text:'dinner for 4',consent:true}});
test('AI endpoint rejects cross-origin requests, absent consent and unsafe image URLs',()=>env(async()=>{
 globalThis.fetch=async()=>{throw Error('Should not call a provider');};
 let r=response();await handler({...req(),headers:{...req().headers,origin:'https://evil.example'}},r);assert.equal(r.code,403);
 r=response();await handler({...req(),body:{...req().body,consent:false}},r);assert.equal(r.code,400);
 r=response();await handler({...req(),body:{...req().body,mode:'vision',image:'https://private.example/image'}},r);assert.equal(r.code,400);
}));
test('AI quota rejection prevents provider usage',()=>env(async()=>{
 let calls=0;globalThis.fetch=async(url)=>{calls++;return new Response(JSON.stringify(url.endsWith('/user')?{id:'user-a'}:false),{status:200});};
 const r=response();await handler(req(),r);assert.equal(r.code,429);assert.equal(calls,2);
}));
test('AI calls use a fixed provider, structured output and disabled response storage',()=>env(async()=>{
 let body;globalThis.fetch=async(url,options)=>{if(url.endsWith('/user'))return Response.json({id:'user-a'});if(url.includes('kkk_consume_ai_quota'))return Response.json(true);assert.equal(url,'https://api.openai.com/v1/responses');body=JSON.parse(options.body);return Response.json({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({category:'Dinner',adults:4,kids:0,exclusions:['potato'],available:[],jain:true})}]}]});};
 const r=response();await handler(req(),r);assert.equal(r.code,200);assert.equal(body.store,false);assert.equal(body.text.format.strict,true);assert.equal(r.body.filters.jain,true);assert.deepEqual(r.body.filters.exclusions,['potato']);assert.ok(!JSON.stringify(r.body).includes('test-server-only'));
}));
