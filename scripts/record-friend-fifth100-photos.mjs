import fs from 'node:fs/promises';

const intake=JSON.parse(await fs.readFile('catalog/intake/friend-dishes.json','utf8'));
const progressPath='catalog/intake/friend-fifth100-progress.json';
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
 item.photoReview='Visually checked on 2026-10-13 for realistic presentation, correct dish identity, and recipe-card quality.';
 const primary=`Use case: photorealistic-natural. Asset type: Kavita ka Kitchen recipe catalogue food photograph. Primary request: ${candidate.name}, ${candidate.description}. Culinary region: ${candidate.cuisineRegion}. Depict the defining preparation and recognizable shape of this exact vegetarian dish, with authentic ingredients and presentation. An appetizing editorial food photograph, true-to-life food texture, warm natural daylight, simple crockery, tightly framed three-quarter overhead composition suitable for a square recipe card. No text, watermark, logo, hands, people, extra unrelated dishes, or illustration.`;
 const finalPrompt=item.id==='mirchi-bajji'?'Use case: photorealistic-natural. Asset type: recipe catalogue food photograph. Primary request: a highly realistic, appetizing photo of Mirchi Bajji, the Indian street-food snack: long green chillies slit and filled with a small amount of spiced filling, coated in chickpea batter and deep fried golden, served whole with green chutney and a few onion slices. Show the recognizable elongated shape and crisp uneven batter, warm natural daylight, editorial food photography, overhead three-quarter view, simple ceramic plate, no text, no logos, no hands, no unrelated dishes. Square-friendly composition, high detail.':item.id==='taiwanese-sweet-potato-balls'?'Use case: photorealistic-natural. Asset type: recipe catalogue food photograph. Primary request: Taiwanese Sweet Potato Balls (di gua qiu), a Taiwanese night-market fried snack. Show a small paper tray holding dozens of distinct hollow, puffed, golden-orange round sweet-potato-and-tapioca balls with lightly crisp irregular surfaces, dry and ready to eat. Absolutely no soup, milk, syrup, shaved ice, colored mochi, or liquid. Warm natural light, authentic street-food editorial photo, close three-quarter view, high resolution, square composition, no text or logo.':item.id==='tacos-de-canasta'?'Use case: photorealistic-natural. Asset type: recipe catalogue food photograph. Primary request: authentic Mexican tacos de canasta, soft small corn tortillas folded around spiced potato filling, packed close together in a cloth-lined wicker basket and glistening lightly with red chile onion oil after steaming. Show several soft, pliable, moist tacos; one gently opened to reveal potato filling. Absolutely no hard fried taco shells, no crunchy U-shaped tacos, no deep frying. Editorial natural-light food photo, three-quarter overhead close composition, high realistic detail, no text, logo or people.':primary;
 const correction=item.id==='taiwanese-sweet-potato-balls'?'Regenerated to show dry golden fried sweet potato tapioca balls, not dessert soup.':item.id==='tacos-de-canasta'?'Regenerated to show soft folded potato tacos steamed together in a cloth-lined basket, not hard taco shells.':undefined;
 prompts[item.id]={prompt:finalPrompt,method:'Built-in image generation',reviewedAt:'2026-10-13',...(correction?{correction}:{} )};
}
if(progress.publicationStatus!=='published')progress.publicationStatus='ready-for-validation';
await fs.writeFile(progressPath,JSON.stringify(progress,null,2)+'\n');
await fs.writeFile(promptsPath,JSON.stringify(prompts,null,2)+'\n');
console.log(`Recorded ${progress.items.length} visually reviewed fifth-batch photos`);
