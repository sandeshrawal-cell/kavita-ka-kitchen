import fs from 'node:fs/promises';
import {normalizeName,validateEntry,duplicates} from './validate-catalog.mjs';

const intakePath='catalog/intake/friend-dishes.json';
const intake=JSON.parse(await fs.readFile(intakePath,'utf8'));
const progressPath='catalog/intake/friend-popular200-progress.json';
const progress=JSON.parse(await fs.readFile(progressPath,'utf8'));
const byId=new Map(intake.candidates.map(item=>[item.id,item]));
const limit=Number(process.argv.find(arg=>arg.startsWith('--limit='))?.split('=')[1]||200);
if(progress.items.length!==200||!Number.isInteger(limit)||limit<25||limit>200||limit%25)throw Error('Expected 200 planned dishes and a publication limit in groups of 25');
if(limit<(progress.preparedForPublicationCount||0))throw Error('Refusing to remove an earlier published group');
const source=progress.items.slice(0,limit).map(item=>byId.get(item.id));
if(source.some((item,index)=>!item||item.sourceReviewId!==progress.items[index].sourceReviewId))throw Error('Popular-batch source/progress identity mismatch');
const published=JSON.parse(await fs.readFile('catalog/generated/dishes.json','utf8'));
const incomingIds=new Set(source.map(item=>item.id));
const existing=published.filter(dish=>!incomingIds.has(dish.id)).map(dish=>({dish}));
const photoManifest=JSON.parse(await fs.readFile('catalog/photos.json','utf8'));
const notes='Quantities serve four adults. Check the doneness cues in each step and adjust seasoning to taste. Jain suitability depends on your household ingredient rules.';
const noteTranslations={
 hi:'मात्राएँ चार वयस्कों के लिए हैं। हर चरण में पकने के संकेत जाँचें और स्वाद के अनुसार मसाला बदलें। जैन उपयुक्तता आपके परिवार की सामग्री संबंधी नियमों पर निर्भर है।',
 gu:'માત્રા ચાર પુખ્ત વ્યક્તિઓ માટે છે. દરેક પગલામાં પાકવાના સંકેત તપાસો અને સ્વાદ પ્રમાણે મસાલો ગોઠવો. જૈન યોગ્યતા તમારા પરિવારના સામગ્રીના નિયમો પર આધારિત છે.'
};
const group=name=>/coconut milk/i.test(name)?'Packaged':/milk|curd|yogurt|ghee|butter|cheese|ricotta|buttermilk/i.test(name)?'Dairy':/dal|lentil|chickpeas|mung beans|white beans|peas/i.test(name)?'Pulses':/rice|pasta|noodle|flour|semolina|oats|millet|quinoa|grits|groats|cornmeal|tapioca/i.test(name)?'Grains':/almond|cashew|peanut|pistachio|nuts|seeds/i.test(name)?'Dry Fruits':/cumin|turmeric|chilli|pepper|cardamom|cinnamon|mustard|salt|oregano|thyme|parsley|coriander|spice/i.test(name)?'Spices':/banana|berries|figs|apple|lemon|lime|strawberr/i.test(name)?'Fruits':/bread|pav/i.test(name)?'Bakery':/oil|sugar|jaggery|syrup|cocoa/i.test(name)?'Packaged':/potato|tomato|onion|mushroom|spinach|gourd|corn|carrot/i.test(name)?'Vegetables':'Other';
const entries=[];
const pendingWrites=[];
for(const candidate of source){
 const draftPath=`catalog/intake/${candidate.id}-draft.json`;
 const draft=JSON.parse(await fs.readFile(draftPath,'utf8'));
 if(draft.id!==candidate.id||draft.sourceReviewId!==candidate.sourceReviewId)throw Error(`Draft ID mismatch: ${candidate.id}`);
 if(draft.steps.length<4||draft.ingredients.length<(candidate.id==='hojicha'?1:4))throw Error(`Incomplete draft: ${candidate.id}`);
 const image=`catalog/intake/photos/${candidate.id}.png`;
 await fs.access(image);
 await fs.access(`public/photos/${candidate.id}-1200.webp`);
 await fs.access(`public/photos/${candidate.id}-600.webp`);
 if(photoManifest[candidate.id]?.status!=='reviewed')throw Error(`Photo not reviewed: ${candidate.id}`);
 candidate.photoDraft=image;
 draft.photoDraft=image;
 draft.photoReview=progress.items.find(x=>x.id===candidate.id).photoReview;
 if(!draft.photoReview||progress.items.find(x=>x.id===candidate.id).photoStatus!=='reviewed')throw Error('Missing explicit visual review: '+candidate.id);
 draft.status='published-popular-200-intake-batch';
 candidate.contentStatus='published-popular-200-intake-batch';
 const id=draft.id;
 const method=draft.method||(candidate.sourceCategory==='Sabzi/Curries'?'curry':
  candidate.sourceCategory==='Dal/Legumes'?'dal':
  candidate.sourceCategory==='Rice'?'rice':
  candidate.sourceCategory==='One-Pot Meals'?'onepot':
  candidate.sourceCategory==='Soups'?'stew':
  candidate.sourceCategory==='Salads'?'assemble':
  candidate.sourceCategory==='Wraps'?'assemble':
  candidate.sourceCategory==='Cakes & Bakes'?'bake':
  candidate.sourceCategory==='Smoothies'?'blend':'assemble');
 const ingredientNames=draft.ingredients.map(item=>item.name);
 const joined=ingredientNames.join(' ').replace(/\b(?:coconut|oat|rice|soy|almond) milk\b/gi,match=>match.replace(/milk$/i,'drink'));
 const allergens=[...new Set([...(draft.allergens||[]), ...[[/\b(milk|paneer|curd|cream|ghee|butter|cheese|yogurt|buttermilk|ricotta)\b/i,'milk'],[/\b(wheat|semolina|bread|pav|plain flour|all-purpose flour|barley flour|sourdough|pasta|panko|ramen|udon|tortilla|cannelloni|ziti|orzo|gnocchi|couscous|bulgur)\b/i,'gluten'],[/peanut/i,'peanut'],[/cashew|almond|pistachio|walnut|hazelnut/i,'tree nuts'],[/sesame|tahini/i,'sesame'],[/soy|tofu/i,'soy']].filter(([pattern])=>pattern.test(joined)).map(([,value])=>value)])];
 if(/\bsoy sauce\b/i.test(joined)&&!allergens.includes('gluten'))allergens.push('gluten');
 const categories=[...new Set(draft.categories)];
 if(candidate.sourceCategory==='Wraps')categories.push('Wraps');
 const nutrition=/dessert|sweet|cake|bake/i.test(candidate.sourceCategory)?'indulgent':candidate.sourceCategory==='Smoothies'?'fruit-rich':candidate.sourceCategory==='Salads'?'veg-rich':candidate.sourceCategory==='Mocktails'?'light':'balanced';
 const dish={id:draft.id,canonicalId:draft.id,name:draft.name,cuisine:draft.cuisine,categories:[...new Set(categories)],ingredients:ingredientNames,method,time:draft.prepAndCookMinutes,effort:'medium',kids:!/chilli|spicy|fiery|peri-peri/i.test(draft.name),nutrition:[nutrition],vegetarian:true,eggless:true,ingredientsComplete:true,jainVerified:false,recipeStatus:'complete',seasons:['all'],bulkScore:4,individualPrep:!['assemble','blend'].includes(method),fried:method==='fry',equipment:method==='bake'?['Oven']:method==='blend'?['Blender']:[],side:false,leftoverUses:[],allergens,advancePrep:!!draft.passiveTime};
 const ingredients=draft.ingredients.map(item=>({...item,group:group(item.name),scale:/salt|chilli|pepper|cumin|turmeric|cinnamon|cardamom|mustard|spice/i.test(item.name)?'seasoning':'linear'}));
 const recipe={id:draft.id,name:draft.name,baseServings:4,batchSize:20,ingredients,steps:draft.steps,tips:draft.tips,substitutions:[],status:'complete',prepTime:draft.prepAndCookMinutes,passiveTime:draft.passiveTime||null,notes};
 const translations={};
 for(const language of ['hi','gu']){
  const translated=draft.translations?.[language];
  if(!translated||translated.ingredients?.length!==ingredients.length||translated.steps?.length!==recipe.steps.length||translated.tips?.length!==recipe.tips.length)throw Error(`Incomplete ${language} translation: ${draft.id}`);
  const map={[recipe.name]:translated.name,[notes]:noteTranslations[language]};
  ingredients.forEach((item,index)=>map[item.name]=translated.ingredients[index]);
  recipe.steps.forEach((step,index)=>map[step]=translated.steps[index]);
  recipe.tips.forEach((tip,index)=>map[tip]=translated.tips[index]);
  if(recipe.passiveTime){if(!translated.passiveTime)throw Error(`Missing ${language} passive time: ${draft.id}`);map[recipe.passiveTime]=translated.passiveTime;}
  translations[language]=map;
 }
 const errors=validateEntry(dish,recipe).errors;
 if(errors.length)throw Error(errors.join('\n'));
 entries.push({reviewStatus:'published',translationReviewStatus:'approved',aliases:candidate.sourceAliases||[],dish,recipe,translations});
 pendingWrites.push([draftPath,JSON.stringify(draft,null,2)+'\n']);
}
const collisionErrors=duplicates([...existing,...entries]);
if(collisionErrors.length)throw Error(collisionErrors.join('\n'));
const normalized=new Set(existing.flatMap(item=>[item.dish.name,...(item.aliases||[])].map(normalizeName)));
for(const entry of entries)if(normalized.has(normalizeName(entry.dish.name)))throw Error(`Existing name: ${entry.dish.name}`);
for(const [file,content] of pendingWrites)await fs.writeFile(file,content);
const batch={batch:'friend-list-popular200',reviewStatus:'published',publicationApproved:true,jainPolicy:'Household-defined; no universal Jain certification.',sources:[{source:intake.source,use:'Dish selection and names only; quantities and instructions independently authored.'}],entries,approval:'User requested another 200 currently popular dishes on 2026-10-15; selected by current trend themes and missing catalogue coverage.',trendSources:progress.trendSources};
await fs.writeFile('catalog/approved/friend-popular200.json',JSON.stringify(batch,null,2)+'\n');
await fs.writeFile(intakePath,JSON.stringify(intake,null,2)+'\n');
progress.preparedForPublicationCount=limit;
progress.publicationStatus=limit===200?'ready-for-live-verification':'partially-prepared-for-publication';
for(const item of progress.items.slice(0,limit))item.status='prepared-for-publication';
await fs.writeFile(progressPath,JSON.stringify(progress,null,2)+'\n');
console.log(`Promoted ${entries.length} complete dishes with three-language recipes and reviewed photographs`);
