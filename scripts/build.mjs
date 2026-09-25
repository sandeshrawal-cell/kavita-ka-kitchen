import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import './catalog.mjs';
await fs.mkdir('dist',{recursive:true});
await fs.cp('public','dist',{recursive:true});
await fs.cp('icons','dist/icons',{recursive:true});
for(const file of ['index.html','manifest.webmanifest','service-worker.js'])await fs.copyFile(file,'dist/'+file);
await fs.mkdir('dist/assets',{recursive:true});
for(const name of ['app.js','welcome-hero.js','welcome-hero.css','household.js','household-units.js','core.js','storage.js','catalog.js','auth-client.js','features.js','intelligence.js','photos.js','i18n.js','styles.css'])await fs.copyFile('src/'+name,'dist/assets/'+name);
await fs.copyFile('node_modules/@supabase/supabase-js/dist/umd/supabase.js','dist/assets/supabase.js');
const files=(await fs.readdir('dist/assets')).filter(x=>/\.(js|css)$/.test(x));
const hash=createHash('sha256');for(const f of files)hash.update(await fs.readFile('dist/assets/'+f));hash.update(await fs.readFile('index.html'));
// A catalogue or image-only update must also retire the previous offline cache.
async function hashPublic(dir){for(const entry of (await fs.readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){const name=dir+'/'+entry.name;if(entry.isDirectory())await hashPublic(name);else{hash.update(name);hash.update(await fs.readFile(name));}}}
await hashPublic('public');
let sw=await fs.readFile('dist/service-worker.js','utf8');sw=sw.replace('kkk-public-v3.0.0','kkk-public-v3.0.0-'+hash.digest('hex').slice(0,10)).replace('/* BUILD_ASSETS */',files.map(f=>JSON.stringify('/assets/'+f)).join(','));await fs.writeFile('dist/service-worker.js',sw);
await import('./recipe-pages.mjs');
console.log('Build complete. Deploy the existing Vercel project with output directory dist.');
