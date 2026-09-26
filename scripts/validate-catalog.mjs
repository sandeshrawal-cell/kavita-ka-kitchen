import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {CATEGORIES} from '../src/core.js';
export const normalizeName=s=>String(s).normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const methods='assemble bake blend chaat coffee curry dal dessert flatbread fry griddle grill kadhi mash onepot rice roast steam stew stir tea'.split(' ');
const fields={strings:['id','canonicalId','name','cuisine','method','effort','recipeStatus'],arrays:['categories','ingredients','nutrition','seasons','equipment','leftoverUses','allergens'],numbers:['time','bulkScore'],booleans:['kids','vegetarian','eggless','ingredientsComplete','jainVerified','individualPrep','fried','side','advancePrep']};
const values={method:methods,effort:['easy','medium','special'],recipeStatus:['complete','outline'],nutrition:['balanced','energy-rich','fruit-rich','indulgent','kids','light','protein-rich','quick','veg-rich'],seasons:['all','monsoon','summer','winter'],equipment:['Blender','Oven','Tandoor'],allergens:['milk','gluten','peanut','tree nuts','sesame','soy'],categories:CATEGORIES};
const banned=/\b(eggs?|gelatin|gelatine|fish|meat|anchovy|anchovies|lard|rennet|honey|chicken|beef|pork|mutton|prawns?|shrimp|bone stock)\b/i;
const jainExcluded=/\b(onions?|garlic|potato(?:es)?|sweet potato(?:es)?|carrots?|radish|beetroots?|ginger|arbi|taro|turnips?|yams?|cassava|mushrooms?|honey|yeast)\b/i;
export function validateEntry(d,r,{legacy=false}={}){
 const errors=[],warnings=[];const fail=s=>errors.push(`${d?.id||'?'}: ${s}`);
 for(const [type,keys] of Object.entries(fields))for(const key of keys){const x=d[key];if(type==='arrays'?!Array.isArray(x):type==='strings'?typeof x!=='string'||!x.trim():type==='numbers'?typeof x!=='number'||!Number.isFinite(x):typeof x!=='boolean')fail(`invalid or missing ${key}`);}
 for(const [key,allowed] of Object.entries(values))for(const v of Array.isArray(d[key])?d[key]:[d[key]])if(!allowed.includes(v))fail(`invalid ${key}: ${v}`);
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.id)||d.canonicalId!==d.id)fail('invalid canonical ID');
 if(d.time<=0||d.bulkScore<0||d.bulkScore>10)fail('invalid time or bulk score');
 if(d.vegetarian!==true||d.eggless!==true)fail('vegetarian and eggless must be true');
 if(!r||r.id!==d.id||r.name!==d.name){fail('missing/mismatched measured recipe');return {errors,warnings};}
 for(const key of ['ingredients','steps','tips','substitutions'])if(!Array.isArray(r[key]))fail(`missing recipe ${key}`);
 if(r.baseServings!==4||!Number.isFinite(r.batchSize)||r.batchSize<=0||r.status!=='complete'||d.recipeStatus!=='complete'||!Number.isFinite(r.prepTime)||r.prepTime<=0||typeof r.notes!=='string'||!(r.passiveTime===null||typeof r.passiveTime==='string'))fail('invalid measured recipe fields');
 if(!r.ingredients?.length||r.steps?.length<4||r.steps?.some(s=>typeof s!=='string'||s.trim().length<25))fail('recipe is incomplete');
 for(const i of r.ingredients||[]){
  if(typeof i.name!=='string'||!i.name.trim()||!Number.isFinite(i.qty)||i.qty<=0||!['g','ml'].includes(i.unit)||!['linear','seasoning','evaporation'].includes(i.scale)||!['Bakery','Dairy','Dry Fruits','Fruits','Grains','Other','Packaged','Pulses','Spices','Vegetables'].includes(i.group))fail(`invalid ingredient: ${i.name}`);
  if(i.pricePerUnit!==undefined&&(!Number.isFinite(i.pricePerUnit)||i.pricePerUnit<0))fail('invalid ingredient price');
  if(i.qty<.5)errors.push(`${d.id}: ${i.name} ${i.qty}${i.unit} below 0.5 minimum`);
 }
 if(JSON.stringify(d.ingredients)!==JSON.stringify(r.ingredients.map(i=>i.name)))fail('dish ingredients differ from measured recipe');
 let text=[...r.ingredients.map(i=>i.name),...r.steps].join(' ').replace(/\beggless\b|\bno eggs?\b|\bagar instead of gelatin\b/gi,'');
 if(!d.jainVerified)text=text.replace(/\bhoney\b/gi,'');
 if(banned.test(text))fail('prohibited ingredient or instruction: '+text.match(banned)[0]);
 if(d.jainVerified&&(jainExcluded.test(r.ingredients.map(i=>i.name).join(' '))||/overnight.{0,30}ferment|ferment.{0,40}overnight/i.test(r.steps.join(' ')))){
  fail('Jain label conflicts with ingredient or fermentation');
 }
 if(!legacy&&d.jainVerified)fail('new dishes must not assert universal Jain certification; household rules decide suitability');
 const ing=r.ingredients.map(i=>i.name).join(' ');const expected=[[/\b(milk|paneer|curd|cream|ghee|butter|cheese)\b/i,'milk'],[/\b(wheat|semolina|bread|pav|bulgur)\b/i,'gluten'],[/peanut/i,'peanut'],[/cashew|almond|pistachio|walnut|hazelnut/i,'tree nuts'],[/sesame|tahini/i,'sesame'],[/soy|tofu/i,'soy']].filter(([re])=>re.test(ing)).map(([,v])=>v);
 if(!legacy&&expected.some(x=>!d.allergens.includes(x)))fail('missing allergen');
 return {errors,warnings};
}
export function duplicates(entries){const errors=[],ids=new Set(),names=new Map();for(const {dish:d,aliases=[]} of entries){if(ids.has(d.id))errors.push(`duplicate id: ${d.id}`);ids.add(d.id);for(const name of [d.name,...aliases]){const n=normalizeName(name);if(names.has(n)&&names.get(n)!==d.id)errors.push(`duplicate normalized name/alias: ${name}`);names.set(n,d.id);}}return errors;}
export async function audit(){
 const published=JSON.parse(await fs.readFile('catalog/generated/dishes.json','utf8'));
 const staged=JSON.parse(await fs.readFile('catalog/staging/wave1.json','utf8'));
 const aliases=JSON.parse(await fs.readFile('public/data/aliases.json','utf8'));
 const errors=duplicates([...published.map(dish=>({dish,aliases:Object.entries(aliases).filter(([,id])=>id===dish.id).map(([a])=>a.replaceAll('-',' '))})),...staged.entries]),warnings=[];
 const legacyErrors=[];
 const approved={entries:[]};
 for(const file of (await fs.readdir('catalog/approved')).filter(f=>f.endsWith('.json'))){
  const batch=JSON.parse(await fs.readFile('catalog/approved/'+file,'utf8'));
  if(batch.publicationApproved!==true||batch.reviewStatus!=='published')errors.push(file+': missing publication approval');
  approved.entries.push(...batch.entries);
 }
 for(const e of approved.entries){
  errors.push(...validateEntry(e.dish,e.recipe).errors);
  if(!published.some(d=>d.id===e.dish.id))errors.push(e.dish.id+': approved recipe missing from public catalogue');
  if(e.reviewStatus!=='published'||e.translationReviewStatus!=='approved')errors.push(e.dish.id+': missing entry approval');
  const r=e.recipe;
  for(const lang of ['hi','gu'])for(const text of [r.name,...r.ingredients.map(i=>i.name),...r.steps,...r.tips,...r.substitutions,r.notes,...(r.passiveTime?[r.passiveTime]:[])])
   if(typeof e.translations?.[lang]?.[text]!=='string'||!e.translations[lang][text].trim()||e.translations[lang][text]===text)errors.push(e.dish.id+': missing '+lang+' translation: '+text);
 }
 for(const d of published){const r=JSON.parse(await fs.readFile(`public/data/recipes/${d.id}.json`,'utf8'));const report=validateEntry(d,r,{legacy:true});legacyErrors.push(...report.errors);warnings.push(...report.warnings);}
 for(const e of staged.entries){errors.push(...validateEntry(e.dish,e.recipe).errors);if(e.reviewStatus!=='needs-review'||e.translationReviewStatus!=='needs-review')errors.push(`${e.dish.id}: missing review state`);if(e.dish.photo||e.recipe.photo)errors.push(`${e.dish.id}: unexpected photo`);
  for(const lang of ['hi','gu'])for(const text of [e.recipe.name,...e.recipe.ingredients.map(i=>i.name),...e.recipe.steps])if(typeof e.translations?.[lang]?.[text]!=='string'||!e.translations[lang][text].trim()||e.translations[lang][text]===text)errors.push(`${e.dish.id}: missing ${lang} translation`);
  const publicFiles=[`public/data/recipes/${e.dish.id}.json`,`dist/recipe/${e.dish.id}/index.html`];for(const path of publicFiles)try{await fs.access(path);errors.push(`${e.dish.id}: draft leaked into ${path}`);}catch{}
  for(const path of ['public/data/manifest.json','public/data/aliases.json','dist/sitemap.xml',...(await fs.readdir('public/data/categories')).map(p=>'public/data/categories/'+p)])try{if((await fs.readFile(path,'utf8')).includes(e.dish.id))errors.push(`${e.dish.id}: draft referenced by ${path}`);}catch{}
 }
 if(staged.publicationApproved!==false||staged.reviewStatus!=='needs-review')errors.push('batch is not safely staged');
 // Staging must never be copied into the static output or imported by build code.
 for(const file of ['scripts/catalog.mjs','scripts/build.mjs'])if(/(?:import|readFile|cp)\([^\n]*catalog\/staging|from\s+['"][^'"]*staging/.test(await fs.readFile(file,'utf8')))errors.push('production builder reads staging');
 try{await fs.access('dist/catalog/staging');errors.push('staging directory is publicly served');}catch{}
 const report={published:published.length,approvedBatch:approved.entries.length,drafts:staged.entries.length,draftErrors:errors,legacyErrors,legacyReviewNotes:warnings};return report;
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])){
 const report=await audit();console.log(JSON.stringify(report,null,2));if(report.draftErrors.length||(!process.argv.includes('--batch')&&(report.legacyErrors.length||report.legacyReviewNotes.length)))process.exitCode=1;
}
