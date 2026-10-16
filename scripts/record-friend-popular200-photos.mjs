import fs from 'node:fs/promises';
const ids=process.argv.slice(2);
if(!ids.length)throw Error('Pass only dish IDs whose photos have actually been visually reviewed');
const file='catalog/intake/friend-popular200-progress.json';
const progress=JSON.parse(await fs.readFile(file,'utf8'));
const generation=JSON.parse(await fs.readFile('catalog/intake/popular200-photo-generation.json','utf8'));
const prompts=JSON.parse(await fs.readFile('catalog/generated-image-prompts.json','utf8'));
const date=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Kolkata'});
for(const id of ids){
 const item=progress.items.find(x=>x.id===id),record=generation.items.find(x=>x.id===id);
 if(!item||!record?.prompt)throw Error('Unknown photo or missing prompt: '+id);
 await fs.access('catalog/intake/photos/'+id+'.png');
 item.photoDraft='catalog/intake/photos/'+id+'.png';
 item.photoStatus='reviewed';
 item.photoReview='Visually reviewed on '+date+' for realistic appearance, dish identity, recipe consistency and catalogue presentation.';
 item.status='reviewed-photo-awaiting-final-validation';
 delete item.photoReviewNote;
 prompts[id]={...record,method:'Built-in image generation',reviewedAt:date};
}
await fs.writeFile(file,JSON.stringify(progress,null,2)+'\n');
await fs.writeFile('catalog/generated-image-prompts.json',JSON.stringify(prompts,null,2)+'\n');
console.log('Recorded '+ids.length+' visually reviewed photos');
