import fs from 'node:fs/promises';

const path='catalog/generated-image-prompts.json';
const prompts=JSON.parse(await fs.readFile(path,'utf8'));
const intake=JSON.parse(await fs.readFile('catalog/intake/friend-dishes.json','utf8'));
for(const candidate of intake.candidates.slice(0,100)){
 const exactPath=`catalog/intake/photos/${candidate.id}-prompt.txt`;
 let prompt,provenance;
 try{prompt=(await fs.readFile(exactPath,'utf8')).trim();provenance='exact original prompt retained in intake photos';}
 catch{
  prompt=`Use case: photorealistic-natural. Authentic ${candidate.name}: ${candidate.description}. Premium realistic editorial food photograph in natural daylight, whole dish visible, vegetarian and eggless, no text, no watermark.`;
  provenance='reconstructed regeneration prompt; exact original generation prompt was not retained';
 }
 prompts[candidate.id]={prompt,method:'Built-in image generation',reviewedAt:'2026-09-27',provenance};
}
await fs.writeFile(path,JSON.stringify(prompts,null,2)+'\n');
console.log('Recorded provenance for 100 generated dish photos');
