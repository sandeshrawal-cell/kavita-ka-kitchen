const CACHE='kkk-public-v3.0.0';
const SHELL=['/index.html','/assets/styles.css','/art/kavita-mark.svg','/art/brand.svg','/art/kitchen-bowl.svg','/manifest.webmanifest','/data/manifest.json','/data/aliases.json','/fonts/manrope.woff2','/fonts/fraunces.woff2','/icons/icon-192.png','/icons/icon-512.png',/* BUILD_ASSETS */];
SHELL.push('/fonts/indic.css',...['hi','gu'].flatMap(lang=>['ui','recipes'].map(part=>`/data/locales/${lang}-${part}.json`)),...['gujarati','devanagari'].flatMap(script=>[400,500,600,700].map(weight=>`/fonts/noto-${script}-${weight}.ttf`)));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll([...new Set(SHELL)])).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('kkk-public-')&&k!==CACHE||k.startsWith('kavita-kitchen-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api/'))return;
 if(req.mode==='navigate'){const key=url.pathname==='/'?'/index.html':url.pathname;event.respondWith(fetch(req).then(async r=>{if(r.ok&&(r.headers.get('content-type')||'').includes('text/html')){const cache=await caches.open(CACHE);await cache.put(key,r.clone());}return r;}).catch(async()=>await caches.match(key)||await caches.match('/index.html')));return;}
 const allowed=/^\/(assets|art|icons|fonts|data|photos)\//.test(url.pathname)||url.pathname==='/manifest.webmanifest';if(!allowed)return;
 event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(async r=>{if(r.ok){const cache=await caches.open(CACHE);await cache.put(req,r.clone());}return r;})));
});
// Private changes use the authenticated per-user IndexedDB queue, never Cache Storage.
// Foreground reconnect / visibility events flush it. No credentials are exposed to the worker.
