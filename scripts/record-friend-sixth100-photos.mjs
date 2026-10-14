import fs from 'node:fs/promises';

const intake=JSON.parse(await fs.readFile('catalog/intake/friend-dishes.json','utf8'));
const progressPath='catalog/intake/friend-sixth100-progress.json';
const progress=JSON.parse(await fs.readFile(progressPath,'utf8'));
const promptsPath='catalog/generated-image-prompts.json';
const prompts=JSON.parse(await fs.readFile(promptsPath,'utf8'));
const candidates=new Map(intake.candidates.map(item=>[item.id,item]));
if(progress.items.length!==100)throw Error('Expected 100 items');
for(const item of progress.items){
  const candidate=candidates.get(item.id);
  if(!candidate||candidate.sourceReviewId!==item.sourceReviewId)throw Error(`Intake identity mismatch: ${item.id}`);
  await fs.access(`catalog/intake/${item.id}-draft.json`);
  await fs.access(`catalog/intake/photos/${item.id}.png`);
  item.status='reviewed-photo-and-recipe-draft';
  item.photoDraft=`catalog/intake/photos/${item.id}.png`;
  item.photoReview='Visually checked on 2026-10-14 for realistic presentation, correct dish identity, and recipe-card quality.';
  prompts[item.id]={
    prompt:`Photorealistic premium editorial food photograph of authentic ${candidate.name}. Show the dish-specific ingredients and preparation in a realistic, appetizing presentation with natural window light and a square recipe-card composition. No text, illustration, people, meat, eggs, alcohol or unrelated dishes.`,
    method:'Built-in image generation',
    reviewedAt:'2026-10-14',
    ...(item.id==='rumali-roti-roll'?{correction:'Regenerated after visual review to show a thin rumali roti rather than a layered paratha.'}:{}),
    ...(item.id==='majjige-huli'?{correction:'Regenerated after visual review to match the ash-gourd recipe without drumstick pods.'}:{})
  };
}
if(progress.publicationStatus!=='published')progress.publicationStatus='ready-for-validation';
await fs.writeFile(progressPath,JSON.stringify(progress,null,2)+'\n');
await fs.writeFile(promptsPath,JSON.stringify(prompts,null,2)+'\n');
console.log(`Recorded ${progress.items.length} visually reviewed sixth-batch photos`);
