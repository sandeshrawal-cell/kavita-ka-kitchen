import fs from 'node:fs/promises';

const progress=JSON.parse(await fs.readFile('catalog/intake/friend-third100-progress.json','utf8'));
const issues=[];
let checked=0;
const numbers=text=>(String(text).match(/\d+(?:\.\d+)?/g)||[]).sort().join(',');
const banned=/\b(chicken|mutton|beef|pork|fish sauce|shrimp|prawn|anchov(?:y|ies)|oyster sauce|egg yolk|whole egg|gelatin|gelatine|animal rennet)\b/i;
for(const item of progress.items){
 let dish;
 try{dish=JSON.parse(await fs.readFile(`catalog/intake/${item.id}-draft.json`,'utf8'));}catch{continue;}
 checked++;
 if(!dish.reference?.url||!/^https:\/\//.test(dish.reference.url))issues.push(`${item.id}: source reference missing`);
 if(dish.steps.length<5)issues.push(`${item.id}: fewer than five recipe steps`);
 if(dish.ingredients.length<6)issues.push(`${item.id}: fewer than six measured ingredients`);
 if(dish.ingredients.some(ingredient=>banned.test(ingredient.name)))issues.push(`${item.id}: potentially nonvegetarian ingredient`);
 const names=new Set();
 for(const ingredient of dish.ingredients){
  if(!Number.isFinite(ingredient.qty)||ingredient.qty<0.5||!['g','ml'].includes(ingredient.unit))issues.push(`${item.id}: invalid measurement for ${ingredient.name}`);
  const key=ingredient.name.toLowerCase().trim();
  if(names.has(key))issues.push(`${item.id}: duplicate ingredient ${ingredient.name}`);
  names.add(key);
 }
 for(const lang of ['hi','gu']){
  const tr=dish.translations?.[lang];
  if(!tr||!tr.name||tr.ingredients?.length!==dish.ingredients.length||tr.steps?.length!==dish.steps.length||tr.tips?.length!==dish.tips.length){issues.push(`${item.id}: ${lang} translation shape mismatch`);continue;}
  if(!tr.steps.every(step=>lang==='hi'?/[\u0900-\u097f]/.test(step):/[\u0a80-\u0aff]/.test(step)))issues.push(`${item.id}: ${lang} step script mismatch`);
  for(let i=0;i<dish.steps.length;i++)if(numbers(dish.steps[i])!==numbers(tr.steps[i]))issues.push(`${item.id}: ${lang} step ${i+1} measurement/time mismatch`);
 }
}
console.log(JSON.stringify({checked,issues},null,2));
if(issues.length)process.exitCode=1;
