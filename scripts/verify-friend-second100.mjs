import fs from 'node:fs/promises';
import {normalizeName} from './validate-catalog.mjs';

const intake=JSON.parse(await fs.readFile('catalog/intake/friend-dishes.json','utf8'));
const progress=JSON.parse(await fs.readFile('catalog/intake/friend-second100-progress.json','utf8'));
const catalogue=JSON.parse(await fs.readFile('catalog/generated/dishes.json','utf8'));
const photos=JSON.parse(await fs.readFile('catalog/photos.json','utf8'));
const candidates=intake.candidates.slice(100,200);
const errors=[];
if(candidates.length!==100||progress.items.length!==100)errors.push('Expected exactly 100 next candidates and progress entries.');
const publishedNames=new Set(catalogue.flatMap(dish=>[dish.name,...(dish.aliases||[])].map(normalizeName)));
let complete=0,photoOnly=0;
for(let index=0;index<candidates.length;index++){
 const candidate=candidates[index],item=progress.items[index];
 if(item?.id!==candidate.id)errors.push(`Progress order mismatch at ${index+1}`);
 if(publishedNames.has(normalizeName(candidate.name)))errors.push(`${candidate.id}: already published by name`);
 let draft;
 try{draft=JSON.parse(await fs.readFile(`catalog/intake/${candidate.id}-draft.json`,'utf8'));}catch(error){if(error.code!=='ENOENT')errors.push(`${candidate.id}: draft is unreadable`);}
 let photo=false;
 try{await fs.access(`catalog/intake/photos/${candidate.id}.png`);photo=true;}catch{}
 if(photo){
  photoOnly++;
  if(photos[candidate.id]?.status!=='reviewed')errors.push(`${candidate.id}: photo lacks reviewed manifest entry`);
  for(const size of [600,1200])try{await fs.access(`public/photos/${candidate.id}-${size}.webp`);}catch{errors.push(`${candidate.id}: ${size}px photo missing`);}
 }
 if(!draft)continue;
 if(draft.id!==candidate.id||draft.sourceReviewId!==candidate.sourceReviewId)errors.push(`${candidate.id}: draft identity mismatch`);
 if(draft.baseServings!==4||draft.ingredients?.length<4||draft.steps?.length<4||draft.tips?.length<1)errors.push(`${candidate.id}: incomplete English recipe`);
 for(const ingredient of draft.ingredients||[])if(!Number.isFinite(ingredient.qty)||ingredient.qty<0.5||!['g','ml'].includes(ingredient.unit))errors.push(`${candidate.id}: invalid quantity for ${ingredient.name}`);
 for(const lang of ['hi','gu']){
  const translation=draft.translations?.[lang];
  if(!translation||translation.ingredients?.length!==draft.ingredients?.length||translation.steps?.length!==draft.steps?.length||translation.tips?.length!==draft.tips?.length||!translation.name||(draft.passiveTime&&!translation.passiveTime))errors.push(`${candidate.id}: incomplete ${lang} translation`);
 }
 if(!photo)errors.push(`${candidate.id}: recipe draft lacks a reviewed photo`);
 else complete++;
 if(catalogue.some(dish=>dish.id===candidate.id))errors.push(`${candidate.id}: draft leaked into public catalogue`);
}
const report={planned:candidates.length,completePrivateDrafts:complete,reviewedPhotos:photoOnly,remaining:candidates.length-complete,errors};
console.log(JSON.stringify(report,null,2));
if(errors.length||(process.argv.includes('--require-complete')&&complete!==100))process.exitCode=1;
