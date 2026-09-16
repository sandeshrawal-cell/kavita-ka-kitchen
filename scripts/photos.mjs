// Build-time only. Match actual dish names, retain licences, never use random image URLs.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require(process.env.SHARP_PATH||'sharp');
const all=JSON.parse(await fs.readFile('catalog/generated/dishes.json','utf8'));
const output='public/photos';await fs.mkdir(output,{recursive:true});
const manifest=JSON.parse(await fs.readFile('catalog/photos.json','utf8').catch(()=>'{}'));
const aliases={'rajma-masala':['Rajma'],'cucumber-raita':['Cucumber raita'],'rice-kheer':['Rice kheer','Chawal ki kheer'],'masala-chai':['Masala chai'],'indian-filter-coffee':['Filter coffee'],'plain-rice':['Cooked rice'],'curd':['Dahi'],'roti':['Roti','Chapati'],'fresh-lime-soda':['Lime soda'],'besan-chilla':['Besan chilla','Besan cheela'],'vegetable-upma':['Upma'],'gatte-ki-sabzi':['Gatte ki sabzi'],'sev-tamatar':['Sev tamatar','Sev tameta'],'agar-panna-cotta':[],'vegan-chocolate-mousse':[]};
const clean=s=>String(s||'').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&#\d+;/g,' ').trim();
const normalized=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function request(params){const u='https://commons.wikimedia.org/w/api.php?'+new URLSearchParams({action:'query',format:'json',...params});for(let retry=0;retry<3;retry++){await pause(4000);const r=await fetch(u,{headers:{'User-Agent':'KavitaKitchen/3.1 (open-source vegetarian catalogue; photo credit preserved)'},signal:AbortSignal.timeout(22000)});if(r.status===429){const seconds=Math.max(60,Number(r.headers.get('retry-after'))||60);console.log('Commons rate limit: waiting '+seconds+' seconds');await pause(seconds*1000);continue;}if(!r.ok)throw Error('Commons '+r.status);return r.json();}throw Error('Rate limited; rerun the importer later.');}
async function photo(d){
 if(manifest[d.id]?.src||manifest[d.id]?.status==='rejected')return;
 // Eggless, vegan and composite menu names need editorial evidence for that exact version.
 const terms=aliases[d.id]??(/eggless|vegan|vegetarian|with |style|meal|leftover/i.test(d.name)?[]:[d.name]);
 let chosen;
 for(const term of terms){
  const data=await request({generator:'search',gsrsearch:'"'+term+'" filetype:bitmap',gsrnamespace:'6',gsrlimit:'6',prop:'imageinfo',iiprop:'url|extmetadata|size',iiurlwidth:'1280'});
  const candidates=Object.values(data.query?.pages||{}).map(p=>({p,i:p.imageinfo?.[0]})).filter(({p,i})=>{
   if(!i||i.width<700||i.height<450||i.width/i.height>2.5||i.width/i.height<.6)return false;
   const meta=i.extmetadata||{},lic=clean(meta.LicenseShortName?.value);
   if(!/^(CC BY(?:-SA)? [1-4]\.0|CC0|Public domain)$/i.test(lic)||clean(meta.Restrictions?.value))return false;
   const title=normalized(p.title.replace(/^File:/,''));
   if(!title.includes(normalized(term)))return false;
   if(/chicken|mutton|beef|pork|fish |shrimp|egg |omelet|menu|collage|ingredient|packaging|logo|advert|shop|restaurant|stall|making |preparing /i.test(p.title))return false;
   return true;
  }).sort((a,b)=>Number(!!b.i.extmetadata.Assessments?.value)-Number(!!a.i.extmetadata.Assessments?.value)||Math.min(b.i.width*b.i.height,4000000)-Math.min(a.i.width*a.i.height,4000000));
  if(candidates.length){chosen=candidates[0];break;}
 }
 if(!chosen){manifest[d.id]={status:'needs-exact-photo',name:d.name};return;}
 const {p,i}=chosen,remote=i.thumburl||i.url;
 const response=await fetch(remote,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error('Photo '+response.status);
 const buf=Buffer.from(await response.arrayBuffer());
 const large=await sharp(buf).rotate().resize({width:1200,height:1200,fit:'inside',withoutEnlargement:true}).webp({quality:88}).toBuffer();
 const metadata=await sharp(large).metadata();
 await fs.writeFile(path.join(output,d.id+'-1200.webp'),large);
 await sharp(buf).rotate().resize({width:600,height:600,fit:'inside',withoutEnlargement:true}).webp({quality:84}).toFile(path.join(output,d.id+'-600.webp'));
 const meta=i.extmetadata;
 manifest[d.id]={name:d.name,src:'/photos/'+d.id+'-1200.webp',small:'/photos/'+d.id+'-600.webp',width:metadata.width,height:metadata.height,alt:d.name+' — photographed serving',source:i.descriptionurl,title:p.title,author:clean(meta.Artist?.value)||'See source',license:clean(meta.LicenseShortName?.value),licenseUrl:clean(meta.LicenseUrl?.value)||'https://creativecommons.org/publicdomain/zero/1.0/',changes:'Resized and converted to WebP; composition preserved.',status:'source-matched',sourceWidth:i.width,sourceHeight:i.height};
}
let index=0,finished=0;
async function worker(){while(index<all.length){const d=all[index++];try{await photo(d);}catch(e){console.log(d.name+': '+e.message);}finished++;await fs.writeFile('catalog/photos.json',JSON.stringify(manifest,null,2));if(finished%20===0)console.log(finished+'/'+all.length+' checked; '+Object.values(manifest).filter(p=>p.src).length+' photos');}}
// Sequential checkpoints avoid a damaged manifest if the network is interrupted.
await worker();
await fs.writeFile('catalog/photos.json',JSON.stringify(manifest,null,2));
console.log('Photos ready: '+Object.values(manifest).filter(p=>p.src).length+'/'+all.length);
