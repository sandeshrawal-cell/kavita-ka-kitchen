const CACHE='kavita-kitchen-ultimate-v1';
const SHELL=['/','/index.html','/styles.css','/data.js','/app.js','/manifest.webmanifest','/icons/icon-192.png','/icons/icon-512.png','/icons/icon-maskable-512.png','/icons/apple-touch-icon.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put('/index.html',copy));return r}).catch(()=>caches.match('/index.html')));return;
  }
  if(url.origin!==self.location.origin)return;
  if(url.pathname.startsWith('/api/')){event.respondWith(fetch(req).catch(()=>new Response(JSON.stringify({offline:true}),{status:503,headers:{'Content-Type':'application/json'}})));return;}
  event.respondWith(caches.match(req).then(c=>c||fetch(req).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(cache=>cache.put(req,copy))}return r})));
});
