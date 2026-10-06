import fs from 'node:fs/promises';

const source=JSON.parse(await fs.readFile('catalog/intake/friend-dishes.json','utf8'));
const published=JSON.parse(await fs.readFile('catalog/generated/dishes.json','utf8'));
const batch=source.candidates.slice(300,400);
if(batch.length!==100)throw Error(`Expected 100 candidates, found ${batch.length}`);
const normalize=value=>String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\b(jain|veg|vegetarian|eggless|easy|homestyle)\b/g,'').replace(/[^a-z0-9]/g,'');
const distance=(a,b)=>{
 let previous=Array.from({length:b.length+1},(_,i)=>i);
 for(let i=1;i<=a.length;i++){
  const current=[i];
  for(let j=1;j<=b.length;j++)current[j]=Math.min(current[j-1]+1,previous[j]+1,previous[j-1]+Number(a[i-1]!==b[j-1]));
  previous=current;
 }
 return previous[b.length];
};
const seen=published.flatMap(dish=>[dish.name,...(dish.aliases||[])].map(name=>({name,dish:dish.name,key:normalize(name)})));
const result=[];
for(const candidate of batch){
 const names=[candidate.name,...candidate.sourceAliases];
 const matches=[];
 for(const name of names){
  const key=normalize(name);
  for(const item of seen){
   const similarity=1-distance(key,item.key)/Math.max(key.length,item.key.length,1);
   if(similarity>=0.88)matches.push({sourceName:name,publishedName:item.dish,similarity:Number(similarity.toFixed(3))});
  }
 }
 result.push({id:candidate.id,name:candidate.name,sourceReviewId:candidate.sourceReviewId,sourceRow:candidate.sourceRow,status:matches.length?'duplicate-review':'recipe-needed',matches});
 seen.push(...names.map(name=>({name,dish:candidate.name,key:normalize(name)})));
}
const path='catalog/intake/friend-fourth100-progress.json';
try{await fs.access(path);throw Error(`${path} already exists; preserve existing progress`);}catch(error){if(error.code!=='ENOENT')throw error;}
await fs.writeFile(path,JSON.stringify({batch:'friend-list-fourth100',source:'Kavita_ka_Kitchen_dishes_with_batch1.xlsx',range:'R0301–R0400',publicationStatus:'draft',items:result},null,2)+'\n');
console.log(`Prepared ${result.length} candidates; ${result.filter(item=>item.matches.length).length} require duplicate review`);
for(const item of result.filter(item=>item.matches.length))console.log(`${item.name}: ${item.matches.map(m=>`${m.publishedName} (${m.similarity})`).join(', ')}`);
