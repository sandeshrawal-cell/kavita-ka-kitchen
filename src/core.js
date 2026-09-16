export const VERSION = '3.1.1';
export const MODES = {home:'Home Kitchen',office:'Corporate / Office',factory:'Factory / Canteen',event:'Wedding / Event'};
export const MEALS = ['Breakfast','Lunch','Dinner'];
export const CATEGORIES = ['Breakfast','Lunch','Dinner','Snacks','Street Food','Sabzi/Curries','Dal/Legumes','Rice','Breads','One-Pot Meals','Soups','Salads','Chaats','Sandwiches','Wraps','Desserts','Indian Sweets','Cakes & Bakes','Shakes','Smoothies','Juices','Mocktails','Coffee','Tea','Hot Drinks','Cold Drinks','Kids Meals','Lunchbox','Quick Meals','High Protein Vegetarian','Light Meals','Jain','No Onion-Garlic','Vrat/Fasting','Guest Menus','Party Food','Festival Food','Leftover Recipes'];
export const norm = x => String(x ?? '').normalize('NFKC').trim().toLowerCase();
export const slug = x => norm(x).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const dayKey = (d = new Date()) => new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);
export const addDays = (day,n) => {const d=new Date(day+'T12:00:00');d.setDate(d.getDate()+n);return dayKey(d);};
export const monday = (d=new Date()) => addDays(dayKey(d),-((d.getDay()+6)%7));
export const esc = x => String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const currency = n => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
export const unique = a => [...new Set(a)];
export const uid = () => crypto.randomUUID();
const ALIASES = {aloo:'potato',batata:'potato',bateta:'potato',pyaz:'onion',pyaaz:'onion',kanda:'onion',lasun:'garlic',lahsun:'garlic',adrak:'ginger',gajar:'carrot',dahi:'curd',yogurt:'curd',yoghurt:'curd',palak:'spinach',matar:'peas',gobhi:'cauliflower',besan:'gram flour',maida:'flour',tofu:'tofu',doodh:'milk',dudhi:'bottle gourd',lauki:'bottle gourd',aubergine:'brinjal',eggplant:'brinjal',chana:'chickpeas',rajma:'kidney beans',kaju:'cashew'};
export const ingredientKey = n => ALIASES[norm(n)] || norm(n).replace(/tomatoes/g,'tomato').replace(/potatoes/g,'potato');
export const UNSAFE = /\b(eggs?|anda|omelette|omelet|chicken|mutton|beef|pork|fish|prawns?|shrimp|meat|bacon|ham|gelatin|gelatine|lard|anchovy|anchovies|oyster sauce|fish sauce|animal rennet)\b/i;
export const ROOTS = /\b(potato|onion|garlic|ginger|carrot|beetroot|radish|turnip|yam|sweet potato|mushroom|tapioca|peanuts?|groundnuts?|aloo|batata|bateta|pyaz|pyaaz|lasun|lahsun|adrak|gajar|mooli)\b/i;
export function vegetarianText(text){return !UNSAFE.test(norm(text).replace(/\beggless\b|\bno eggs?\b|\begg.free\b|\bplant.based chicken\b|\beggplant\b/g,''));}
export const COMMON_SIDES = new Set(['roti','plain rice','jeera rice','curd','chaas','papad','salad','pickle']);
export function headcount(p){
  const num=(v,name,max=100000)=>{const n=Number(v??0);if(!Number.isFinite(n)||n<0||n>max||!Number.isInteger(n))throw new Error(`${name} must be a whole number from 0 to ${max}.`);return n;};
  if(!MODES[p.mode||'home'])throw new Error('Choose a kitchen mode.');
  const adults=num(p.adults,'Adults'),kids=num(p.kids,'Kids'),guests=num(p.guests,'Guests');
  const total=adults+kids+guests;
  const buffer=Number(p.buffer||0);if(!Number.isFinite(buffer)||buffer<0||buffer>50)throw new Error('Buffer must be between 0% and 50%.');
  if(!total||total>100000)throw new Error('Enter between 1 and 100,000 people.');
  const jainMeals=num(p.jainMeals,'Jain meals');if(jainMeals>total)throw new Error('Jain meals are included in total attendance and cannot exceed it.');
  return {adults,kids,guests,total,jainMeals,buffer,servings:Math.ceil(total*(1+buffer/100)),equivalent:(adults+guests+kids*0.6)*(1+buffer/100)};
}
export function lockedUntil(d,history=[],at=Date.now()){
  if(d.side||COMMON_SIDES.has(norm(d.name)))return null;
  const dates=history.filter(h=>{const cooked=new Date(h.date).getTime();return (cooked<=at||(h.planned&&cooked-at<8*86400000))&&((h.dishIds||[h.dishId]).includes(d.id)||(h.canonicalIds||[]).includes(d.canonicalId)||norm(h.baseName||h.name)===norm(d.baseName||d.name));}).map(h=>new Date(h.date).getTime()+8*86400000).filter(n=>Number.isFinite(n)&&n>at);
  return dates.length?new Date(Math.max(...dates)).toISOString():null;
}
export function scaleSuitability(d,servings,mode='home'){
  if(mode==='home'&&servings<=20)return 10;
  const base=d.bulkScore??(['dal','rice','onepot','stew','curry','blend'].includes(d.method)?9:6);
  const penalty=(servings>=1000?3:servings>=300?2:servings>=50?1:0)*(d.individualPrep?2:0.25);
  return Math.max(0,Math.min(10,Math.round(base-penalty)));
}
export function eligible(d,f={},s={},at=Date.now()){
  if(d.vegetarian!==true||d.eggless!==true||!vegetarianText([d.name,...d.ingredients].join(' ')))return false;
  if((s.hidden||[]).includes(d.id)||(s.hidden||[]).includes(d.canonicalId)||lockedUntil(d,s.history,at))return false;
  const ingredients=d.ingredients.map(ingredientKey),hay=ingredients.join(' ');
  if(f.jain && (d.jainVerified!==true||ROOTS.test(hay)))return false;
  for(const ex of unique([...(s.exclusions||[]),...(f.exclusions||[])])){
    const n=ingredientKey(ex).replace(/^no\s+/,'');if(!n)continue;
    if(!d.ingredientsComplete)return false;
    if(/fried|frying/.test(n)){if(d.fried||d.method==='fry')return false;continue;}
    if(n==='nuts'&&(d.allergens?.some(a=>['tree nuts','peanut'].includes(a))||/peanut|groundnut|almond|cashew|pistachio|walnut|hazelnut/.test(hay)))return false;
    if(n==='dairy'&&(d.allergens?.includes('milk')||/milk|curd|paneer|cream|butter|ghee|cheese/.test(hay)))return false;
    if(n==='gluten'&&(d.allergens?.includes('gluten')||/wheat|barley|rye|semolina|bulgur|bread|pasta|maida/.test(hay)))return false;
    if(ingredients.some(i=>i===n||i.includes(n)||n.includes(i)))return false;
    // Composite ingredients without an audited component list cannot satisfy a hard exclusion.
    if(!d.ingredientsComplete)return false;
  }
  if(f.jain && !d.ingredientsComplete)return false;
  const serving=f.party?headcount(f.party).servings:2;
  if(f.party?.mode!=='home'&&scaleSuitability(d,serving,f.party?.mode)<4)return false;
  if(f.equipment?.length&&d.equipment?.some(e=>!f.equipment.includes(e)))return false;
  return true;
}
export function preferenceScore(d,s={}){
  const p=s.preferences?.[d.id]||{},r=s.ratings?.[d.id];
  return (p.cooked||0)*5+((s.favorites||[]).includes(d.id)?3:0)+(r?.count?r.sum/r.count:Number(r)||0)+Object.values(s.votes?.[d.id]||{}).reduce((a,v)=>a+Number(v)*2,0)-(p.skipped||0)*2-((s.hidden||[]).includes(d.id)?100:0);
}
const overlap=(a=[],b=[])=>a.filter(x=>b.some(y=>ingredientKey(y).includes(ingredientKey(typeof x==='string'?x:x.name)))).length;
export function recommend(dishes,f={},s={},limit=70,at=Date.now()){
  const category=f.category||'Dinner',seen=new Set(),rows=[];
  for(const d of dishes){
    if(!d.categories.includes(category)||!eligible(d,f,s,at))continue;if(f.newOnly&&(s.history||[]).some(h=>(h.dishIds||[h.dishId]).includes(d.id)))continue;
    const q=norm(f.query),words=q.split(/\s+/).filter(Boolean);
    const matches=!q||words.every(w=>norm(d.name+' '+d.cuisine+' '+d.ingredients.join(' ')).includes(w));
    const exact=(!f.cuisine||f.cuisine==='Any'||d.cuisine===f.cuisine)&&(!f.time||d.time<=f.time)&&(!f.effort||d.effort===f.effort)&&(!f.kids||d.kids)&&(!f.pantry||overlap(s.pantry,d.ingredients)>0)&&(!f.leftovers||overlap(s.leftovers,d.leftoverUses)>0)&&matches;
    let score=preferenceScore(d,s)+overlap(f.available,d.ingredients)*6+overlap(s.pantry,d.ingredients)*4+overlap(s.leftovers,d.leftoverUses)*12+(d.kids&&f.party?.kids>0?5:0);
    if(f.party&&f.party.mode!=='home')score+=scaleSuitability(d,headcount(f.party).servings,f.party.mode)*4-(d.individualPrep?10:0);
    if(f.budget&&d.estimatedCost)score+=d.estimatedCost<=f.budget?8:-8;
    if(f.weather==='hot'&&d.nutrition.includes('light'))score+=5;
    if(f.weather==='rainy'&&['onepot','stew','dal'].includes(d.method))score+=5;
    if(d.seasons?.includes(f.season))score+=4;
    for(const person of s.family||[]){score+=overlap(person.likes,d.ingredients)*2-overlap(person.dislikes,d.ingredients)*4;if(person.cuisines?.includes(d.cuisine))score+=3;}
    rows.push({...d,exact,score});
  }
  rows.sort((a,b)=>Number(b.exact)-Number(a.exact)||b.score-a.score||a.name.localeCompare(b.name));
  return rows.filter(d=>{const key=d.canonicalId||norm(d.baseName||d.name);if(seen.has(key))return false;seen.add(key);return true;}).slice(0,Math.min(70,limit));
}
export function parseSearch(text){
  const numbers={zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,thirty:30,forty:40,fifty:50};
  let q=norm(text).replace(/\b[a-z]+\b/g,w=>Object.hasOwn(numbers,w)?String(numbers[w]):w),f={exclusions:[]};
  const time=q.match(/(?:under|within|in|up to)\s*(\d+)\s*(?:min|minutes?)/);if(time)f.time=Number(time[1]);
  const adults=q.match(/(\d+)\s*adults?/),kids=q.match(/(\d+)\s*(?:kids?|children)/);if(adults)f.adults=Number(adults[1]);if(kids)f.kids=Number(kids[1]);
  const people=q.match(/(?:for)\s*(\d+)\s*(?:people|persons?|guests?)?/);if(people&&!adults)f.adults=Number(people[1]);
  const budget=q.match(/(?:₹|rs\.?\s*)(\d+)/);if(budget)f.budget=Number(budget[1]);
  f.jain=/\bjain\b/.test(q);
  for(const m of q.matchAll(/(?:\bno|\bwithout|\bexclude|don't want|do not want)\s+([a-z]+(?:\s+(?:nuts|foods))?(?:\s*(?:,|and)\s*[a-z]+)*)/g))for(const value of m[1].split(/,|\band\b/)){const ingredient=value.trim();if(ingredient&&!/^(we|i|for|under|within)$/.test(ingredient))f.exclusions.push(ingredientKey(ingredient));}
  const available=q.match(/(?:i have|we have|using)\s+([a-z ,]+?)(?:\s+(?:are available|under|within|but|and we)|[.;]|$)/);
  if(available)f.available=available[1].split(/,|\band\b/).map(ingredientKey).filter(x=>x&&!/^\d|minutes|adults|kids/.test(x));
  for(const c of ['Punjabi','Gujarati','Rajasthani','Italian','Mexican','Thai','South Indian','North Indian'])if(q.includes(norm(c)))f.cuisine=c;
  for(const c of MEALS)if(q.includes(norm(c)))f.category=c;
  if(/light/.test(q))f.category='Light Meals';
  f.query=(time||adults||kids||people||budget||f.jain||f.cuisine||f.category||f.exclusions.length||f.available?.length)?'':text.trim();
  return f;
}
export function scaleRecipe(recipe,party){
  const h=headcount(party),ratio=h.equivalent/(recipe.baseServings||4);
  // Ingredient mass scales linearly. Seasoning reduction is explicit and capped; water varies only for covered-batch recipes.
  const ingredients=recipe.ingredients.map(i=>{let factor=ratio;if(h.servings>=50&&i.scale==='seasoning')factor*=0.85;if(h.servings>=50&&i.scale==='evaporation')factor*=0.9;return {...i,qty:Math.round(i.qty*factor*100)/100};});
  const cost=ingredients.reduce((sum,i)=>sum+(i.pricePerUnit||0)*i.qty,0),missingPrices=ingredients.filter(i=>!Number.isFinite(i.pricePerUnit)).map(i=>i.name);
  return {...recipe,ingredients,...h,cost,costPerPerson:cost/h.total,bufferCost:cost-cost/(1+h.buffer/100),missingPrices,batches:Math.ceil(h.servings/(recipe.batchSize||50)),planningNote:h.servings>=50?'Batch guidance: validate vessel capacity, yields and seasoning with a pilot batch. Estimates exclude labour, energy and service.':''};
}
export function grocery(recipes){
  const map=new Map();
  for(const r of recipes)for(const raw of r.ingredients){
    const x={...raw};if(!Number.isFinite(x.qty))continue;
    if(x.unit==='kg'){x.qty*=1000;x.unit='g';}if(x.unit==='l'){x.qty*=1000;x.unit='ml';}
    const key=ingredientKey(x.name)+'|'+x.unit;const prev=map.get(key)||{...x,key,qty:0};prev.qty+=x.qty;map.set(key,prev);
  }
  return [...map.values()].sort((a,b)=>a.group.localeCompare(b.group)||a.name.localeCompare(b.name));
}
export function quantity(i){return i.qty>=1000&&['g','ml'].includes(i.unit)?`${+(i.qty/1000).toFixed(2)} ${i.unit==='g'?'kg':'l'}`:`${+i.qty.toFixed(1)} ${i.unit}`;}
export function planWeek(dishes,start,party,filters,state,existing={}){
  headcount(party);const plan={...existing},virtualHistory=[...(state.history||[])];let unfilled=0;
  // Account for existing slots before selecting replacements, including future planned rotation.
  for(const [key,entry] of Object.entries(existing))if(entry?.dishIds)virtualHistory.push({...entry,planned:true,date:key.slice(0,10)+'T12:00:00'});
  for(let day=0;day<7;day++)for(const meal of MEALS){const date=addDays(start,day),key=date+':'+meal;if(plan[key])continue;
    const at=new Date(date+'T23:59:59').getTime();
    const candidates=recommend(dishes,{...filters,category:meal,party},{...state,history:virtualHistory},70,at);
    const recurring=(state.recurrences||[]).find(r=>r.weekday===new Date(date+'T12:00:00').getDay()&&r.meal===meal);
    const pick=(recurring?candidates.find(d=>(recurring.dishIds||[]).includes(d.id)):null)||candidates[0];if(!pick){unfilled++;continue;}
    plan[key]={date,meal,name:pick.name,dishIds:[pick.id],canonicalIds:[pick.canonicalId],party:{...party}};
    virtualHistory.push({...plan[key],date:date+'T12:00:00'});
  }
  return {plan,unfilled};
}
export function productionPlan(dishes,party){const h=headcount(party);return {headcount:h,staff:{prep:Math.ceil(h.servings/100),cooking:Math.ceil(h.servings/150),serving:Math.ceil(h.servings/(party.service==='Sit-down'?25:75)),support:Math.ceil(h.servings/150)},timeline:[{when:'One day before',task:'Confirm attendance, dietary counts, procurement and vessel capacity.'},{when:'6 hours before',task:`Stage ingredients for ${dishes.filter(d=>d.method==='dal'||d.method==='curry').map(d=>d.name).join(', ')||'batch-cooked dishes'}. Follow each recipe’s soak and preparation times.`},{when:'2 hours before',task:'Cook in validated batches; separate Jain production and utensils.'},{when:'30 minutes before',task:'Finish fresh components and load service stations in batches.'}],note:'Staffing and timing are rough planning guidance; a kitchen supervisor must validate the production plan.'};}
export function coordinatedMenu(dishes,party,filters,state){
  const courses=party.mode==='event'?['Mocktails','Soups','Snacks','Chaats','Sabzi/Curries','Dal/Legumes','Breads','Rice','Salads','Desserts']:['Sabzi/Curries','Dal/Legumes','Breads','Rice','Salads'];
  const selected=[],missing=[];let paneer=0,fried=0;
  for(const course of courses){const candidates=recommend(dishes,{...filters,category:course,party},state,70);const pick=candidates.find(d=>!selected.some(x=>x.canonicalId===d.canonicalId)&&!(paneer&&d.ingredients.includes('paneer'))&&!(fried&&d.fried));if(!pick){missing.push(course);continue;}selected.push({...pick,course});if(pick.ingredients.includes('paneer'))paneer++;if(pick.fried)fried++;}
  return {dishes:selected,missing};
}
