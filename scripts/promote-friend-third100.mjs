import fs from 'node:fs/promises';
import {normalizeName,validateEntry,duplicates} from './validate-catalog.mjs';

const intakePath='catalog/intake/friend-dishes.json';
const intake=JSON.parse(await fs.readFile(intakePath,'utf8'));
const source=intake.candidates.slice(200,300);
if(source.length!==100)throw Error('Expected exactly 100 intake candidates');
const published=JSON.parse(await fs.readFile('catalog/generated/dishes.json','utf8'));
const incomingIds=new Set(source.map(item=>item.id));
const existing=published.filter(dish=>!incomingIds.has(dish.id)).map(dish=>({dish}));
const photoManifest=JSON.parse(await fs.readFile('catalog/photos.json','utf8'));
const notes='Quantities serve four adults. Check the doneness cues in each step and adjust seasoning to taste. Jain suitability depends on your household ingredient rules.';
const noteTranslations={
 hi:'मात्राएँ चार वयस्कों के लिए हैं। हर चरण में पकने के संकेत जाँचें और स्वाद के अनुसार मसाला बदलें। जैन उपयुक्तता आपके परिवार की सामग्री संबंधी नियमों पर निर्भर है।',
 gu:'માત્રા ચાર પુખ્ત વ્યક્તિઓ માટે છે. દરેક પગલામાં પાકવાના સંકેત તપાસો અને સ્વાદ પ્રમાણે મસાલો ગોઠવો. જૈન યોગ્યતા તમારા પરિવારના સામગ્રીના નિયમો પર આધારિત છે.'
};
const group=name=>/milk|curd|yogurt|ghee|butter|cheese|ricotta|buttermilk/i.test(name)?'Dairy':/dal|lentil|chickpeas|mung beans|white beans|peas/i.test(name)?'Pulses':/rice|flour|semolina|oats|millet|quinoa|grits|groats|cornmeal|tapioca/i.test(name)?'Grains':/almond|cashew|peanut|pistachio|nuts|seeds/i.test(name)?'Dry Fruits':/cumin|turmeric|chilli|pepper|cardamom|cinnamon|mustard|salt|oregano|thyme|parsley|coriander|spice/i.test(name)?'Spices':/banana|berries|figs|apple|lemon|lime|strawberr/i.test(name)?'Fruits':/bread|pav/i.test(name)?'Bakery':/oil|sugar|jaggery|syrup|cocoa/i.test(name)?'Packaged':/potato|tomato|onion|mushroom|spinach|gourd|corn|carrot/i.test(name)?'Vegetables':'Other';
const griddle=/dosa|paratha|roti|thepla|pancake|crepe|galette|cachapa|baghrir|msemen|pudla|ghavan|amboli|chilre|chilka|dibba|chakuli|chilla|adhirasam|tomato-omelette|brazilian-tapioca/i;
const assembled=/parfait|muesli|ricotta-toast|komal-saul/i;
const baked=/granola|cinnamon-toast/i;
const fried=/dhuska|bara-ghugni|nagori-halwa|trini-doubles|mandazi|medu-vada|dahi-bara-aloo-dum/i;
const steamed=/moong-dal-idli|thatte-idli|oats-idli|ragi-idli|poha-idli|idiyappam|puttu/i;
const toasted=/toast/i;
const entries=[];
for(const candidate of source){
 const draftPath=`catalog/intake/${candidate.id}-draft.json`;
 const draft=JSON.parse(await fs.readFile(draftPath,'utf8'));
 if(draft.id!==candidate.id||draft.sourceReviewId!==candidate.sourceReviewId)throw Error(`Draft ID mismatch: ${candidate.id}`);
 if(draft.steps.length<4||draft.ingredients.length<4)throw Error(`Incomplete draft: ${candidate.id}`);
 const image=`catalog/intake/photos/${candidate.id}.png`;
 await fs.access(image);
 await fs.access(`public/photos/${candidate.id}-1200.webp`);
 await fs.access(`public/photos/${candidate.id}-600.webp`);
 if(photoManifest[candidate.id]?.status!=='reviewed')throw Error(`Photo not reviewed: ${candidate.id}`);
 candidate.photoDraft=image;
 draft.photoDraft=image;
 draft.photoReview='Visually reviewed for dish identity, appetizing realistic appearance and photo quality on 2026-10-05.';
 draft.status='published-third-100-intake-batch';
 candidate.contentStatus='published-third-100-intake-batch';
 const id=draft.id;
 const method=/moussaka|gratin|mushroom-julienne/.test(id)?'bake':
  /tofu-katsu-curry/.test(id)?'fry':
  /chilli-tofu|paneer-pepper-fry|paneer-sukka|kerala-mushroom-roast|kerala-soya-roast|tahu-bumbu-bali|wambatu-moju/.test(id)?'stir':
  /tofu-amok/.test(id)?'steam':
  /ambe-sasam/.test(id)?'assemble':'onepot';
 const ingredientNames=draft.ingredients.map(item=>item.name);
 const joined=ingredientNames.join(' ');
 const allergens=[[/\b(milk|paneer|curd|cream|ghee|butter|cheese|yogurt|buttermilk|ricotta)\b/i,'milk'],[/\b(wheat|semolina|bread|pav|plain flour|all-purpose flour|barley flour|sourdough)\b/i,'gluten'],[/peanut/i,'peanut'],[/cashew|almond|pistachio|walnut|hazelnut/i,'tree nuts'],[/sesame|tahini/i,'sesame'],[/soy|tofu/i,'soy']].filter(([pattern])=>pattern.test(joined)).map(([,value])=>value);
 const categories=[...new Set(draft.categories)];
 if(method==='griddle'&&/roti|paratha|thepla|msemen/.test(draft.id))categories.push('Breads');
 if(toasted.test(draft.id))categories.push('Sandwiches');
 if(/burger|sando|sandwich|banh-mi|panini/.test(id))categories.push('Sandwiches');
 if(/frankie|roll|burrito|wrap|shawarma/.test(id))categories.push('Wraps');
 const dish={id:draft.id,canonicalId:draft.id,name:draft.name,cuisine:draft.cuisine,categories:[...new Set(categories)],ingredients:ingredientNames,method,time:draft.prepAndCookMinutes,effort:'medium',kids:!/chilli|spicy|fiery/i.test(draft.name),nutrition:['balanced'],vegetarian:true,eggless:true,ingredientsComplete:true,jainVerified:false,recipeStatus:'complete',seasons:['all'],bulkScore:method==='onepot'?8:4,individualPrep:!['onepot','assemble'].includes(method),fried:method==='fry',equipment:method==='bake'?['Oven']:[],side:false,leftoverUses:[],allergens,advancePrep:!!draft.passiveTime};
 const ingredients=draft.ingredients.map(item=>({...item,group:group(item.name),scale:/salt|chilli|pepper|cumin|turmeric|cinnamon|cardamom|mustard|spice/i.test(item.name)?'seasoning':'linear'}));
 const recipe={id:draft.id,name:draft.name,baseServings:4,batchSize:method==='onepot'?50:20,ingredients,steps:draft.steps,tips:draft.tips,substitutions:[],status:'complete',prepTime:draft.prepAndCookMinutes,passiveTime:draft.passiveTime||null,notes};
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
 await fs.writeFile(draftPath,JSON.stringify(draft,null,2)+'\n');
}
const collisionErrors=duplicates([...existing,...entries]);
if(collisionErrors.length)throw Error(collisionErrors.join('\n'));
const normalized=new Set(existing.flatMap(item=>[item.dish.name,...(item.aliases||[])].map(normalizeName)));
for(const entry of entries)if(normalized.has(normalizeName(entry.dish.name)))throw Error(`Existing name: ${entry.dish.name}`);
const batch={batch:'friend-list-third100',reviewStatus:'published',publicationApproved:true,jainPolicy:'Household-defined; no universal Jain certification.',sources:[{source:intake.source,use:'Dish selection and names only; quantities and instructions independently authored.'}],entries,approval:'User requested completion of the third 100 intake dishes on 2026-10-05.'};
await fs.writeFile('catalog/approved/friend-third100.json',JSON.stringify(batch,null,2)+'\n');
await fs.writeFile(intakePath,JSON.stringify(intake,null,2)+'\n');
console.log(`Promoted ${entries.length} complete dishes with three-language recipes and reviewed photographs`);
