import fs from 'node:fs/promises';
const ids=process.argv.slice(2);
const file='catalog/intake/popular200-photo-generation.json';
const data=JSON.parse(await fs.readFile(file,'utf8'));
const selected=[];
for(const id of ids){
 const d=JSON.parse(await fs.readFile('catalog/intake/'+id+'-draft.json','utf8'));
 const prompt='Use case: photorealistic-natural. Asset: premium recipe catalogue photograph. Subject: '+d.name+'. '+d.photoDescription+' Show only the recipe ingredients, in their cooked form: '+d.ingredients.map(x=>x.name).join(', ')+'. Beautiful realistic freshly prepared food, natural window light, true edible textures, warm neutral background, square composition, one dish only. No text, logos, collage, people, meat, eggs or alcohol. Do not add unlisted vegetables or garnishes.';
 const prior=data.items.find(x=>x.id===id);
 if(prior){prior.previousPrompts=[...(prior.previousPrompts||[]),prior.prompt];prior.prompt=prompt;}else data.items.push({id,prompt});
 selected.push({id,prompt});
}
await fs.writeFile(file,JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify(selected));
