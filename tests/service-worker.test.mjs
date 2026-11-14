import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
const code=await fs.readFile(new URL('../service-worker.js',import.meta.url),'utf8');
function setup(fetchOverride){
 const handlers={},saved=new Map(),origin='https://kavita-kitchen-v2.vercel.app';
 const key=x=>typeof x==='string'?x:x.url;
 const cache={put:async(k,v)=>saved.set(key(k),v),addAll:async()=>{}};
 vm.runInNewContext(code,{URL,Response,self:{location:{origin},addEventListener:(name,fn)=>handlers[name]=fn},caches:{open:async()=>cache,match:async k=>saved.get(key(k))?.clone()},fetch:fetchOverride|| (async req=>new Response(req.url,{status:200,headers:{'content-type':req.mode==='navigate'?'text/html':'image/webp'}}))});
 async function request(path,mode='same-origin',method='GET'){
  let response;handlers.fetch({request:{url:origin+path,method,mode},respondWith:p=>response=p});return response?await response:null;
 }
 return {request,saved};
}
test('service worker caches visited local dish images but never API responses or writes',async()=>{
 const {request,saved}=setup();assert.equal((await request('/photos/dal-tadka-600.webp')).status,200);assert.equal(saved.size,1);
 assert.equal(await request('/api/account'),null);assert.equal(await request('/data/private','same-origin','POST'),null);assert.equal(saved.size,1);
});
test('public recipe navigation cannot replace the offline planner shell',async()=>{
 const {request,saved}=setup();await request('/','navigate');const shell=saved.get('/index.html');await request('/recipe/dal-tadka','navigate');assert.equal(saved.get('/index.html'),shell);assert.ok(saved.has('/recipe/dal-tadka'));
});

test('installed-app metadata refreshes from the network instead of keeping old icon URLs',async()=>{
 let requestedCache;
 const {request,saved}=setup(async(req,options)=>{requestedCache=options.cache;return new Response('new icon');});
 const path='/manifest.webmanifest',key='https://kavita-kitchen-v2.vercel.app'+path;
 saved.set(key,new Response('old icon'));
 assert.equal(await (await request(path)).text(),'new icon');
 assert.equal(await saved.get(key).text(),'new icon');
 assert.equal(requestedCache,'no-cache');
});

test('installed-app metadata remains available offline and survives failed server responses',async()=>{
 for(const fetcher of [async()=>{throw new Error('offline');},async()=>new Response('unavailable',{status:503})]){
  const {request,saved}=setup(fetcher),path='/manifest.webmanifest';
  saved.set('https://kavita-kitchen-v2.vercel.app'+path,new Response('saved manifest'));
  assert.equal(await (await request(path)).text(),'saved manifest');
 }
});
