import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const intake=JSON.parse(await fs.readFile('catalog/intake/friend-dishes.json','utf8'));
const items=intake.candidates.slice(325,350);
const issues=[];
const hashes=new Set();
for(const item of items){
 const id=item.id;
 let d;
 try{d=JSON.parse(await fs.readFile(`catalog/intake/${id}-draft.json`,'utf8'));}catch{issues.push(`${id}: draft missing`);continue;}
 if(d.sourceReviewId!==item.sourceReviewId)issues.push(`${id}: source ID mismatch`);
 if(d.baseServings!==4||d.steps?.length<5||d.ingredients?.length<6||d.tips?.length<1)issues.push(`${id}: incomplete recipe`);
 for(const i of d.ingredients||[])if(!Number.isFinite(i.qty)||i.qty<0.5||!['g','ml'].includes(i.unit))issues.push(`${id}: invalid measurement ${i.name}`);
 for(const lang of ['hi','gu']){
  const t=d.translations?.[lang];
  if(t?.ingredients?.length!==d.ingredients.length||t?.steps?.length!==d.steps.length||t?.tips?.length!==d.tips.length)issues.push(`${id}: ${lang} translation lengths mismatch`);
  const re=lang==='hi'?/[\u0900-\u097f]/:/[\u0a80-\u0aff]/;
  if(!re.test(t?.name||'')||t?.steps?.some(s=>!re.test(s)))issues.push(`${id}: ${lang} script mismatch`);
  for(let n=0;n<d.steps.length;n++){
   const digits=s=>(s.match(/\d+(?:\.\d+)?/g)||[]).sort().join(',');
   if(digits(d.steps[n])!==digits(t.steps[n]))issues.push(`${id}: ${lang} step ${n+1} numbers mismatch`);
  }
 }
 if(!d.reference?.url?.startsWith('https://'))issues.push(`${id}: reference missing`);
 try{const image=await fs.readFile(`catalog/intake/photos/${id}.png`);if(!image.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex')))issues.push(`${id}: photo invalid`); const hash=crypto.createHash('sha256').update(image).digest('hex'); if(hashes.has(hash))issues.push(`${id}: duplicate photo`);hashes.add(hash);}catch{issues.push(`${id}: photo missing`);}
}
console.log(JSON.stringify({recipes:items.length,distinctPhotos:hashes.size,issues},null,2));
if(issues.length)process.exitCode=1;
