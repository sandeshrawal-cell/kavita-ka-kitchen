import {norm,ingredientKey,dayKey,addDays,headcount,eligible,recommend,coordinatedMenu,scaleRecipe,grocery} from './core.js';

export function parseAmount(value){
 const match=String(value||'').trim().match(/^(\d+(?:\.\d+)?)\s*(kg|g|ml|l|pieces?|slices?)$/i);
 if(!match)return null;let qty=Number(match[1]),unit=match[2].toLowerCase().replace(/s$/,'');
 if(unit==='kg'){qty*=1000;unit='g';}if(unit==='l'){qty*=1000;unit='ml';}
 return qty>0?{qty,unit}:null;
}
export function shoppingList(scaled,stock=[],today=dayKey()){
 const available=new Map();
 for(const item of stock){if(item.expiry&&item.expiry<today)continue;const amount=parseAmount(item.quantity);if(!amount)continue;const key=ingredientKey(item.name)+'|'+amount.unit;available.set(key,(available.get(key)||0)+amount.qty);}
 return grocery(scaled).map(item=>{const onHand=Math.min(item.qty,available.get(item.key)||0);return {...item,required:item.qty,onHand,qty:Math.max(0,+(item.qty-onHand).toFixed(2))};});
}
export function materializeRecurrences(dishes,rules,from,days,filters,state){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(from)||!Number.isInteger(days)||days<1||days>90)throw Error('Choose a valid start date and 1–90 days.');
 const existing=state.plans||[],planned=[...existing],created=[],skipped=[];
 const byId=new Map(dishes.map(d=>[d.id,d]));
 for(let offset=0;offset<days;offset++){
  const date=addDays(from,offset),weekday=new Date(date+'T12:00:00').getDay();
  for(const rule of rules.filter(r=>r.enabled!==false&&r.weekday===weekday&&(!r.startDate||date>=r.startDate)&&(!r.endDate||date<=r.endDate))){
   if(planned.some(p=>p.date===date&&p.meal===rule.meal))continue;
   const party=rule.party||filters.party;headcount(party);
   const history=[...(state.history||[]),...planned.map(p=>({...p,planned:true,date:p.date+'T12:00:00'}))];
   const ids=[...new Set(rule.dishIds||[])];
   if(!ids.length||ids.some(id=>!byId.has(id)||!eligible(byId.get(id),{...filters,party,jain:filters.jain||party.jainMeals>0},{...state,history},new Date(date+'T23:59:59').getTime()))){skipped.push({date,meal:rule.meal,name:rule.name,reason:'Rotation, dietary rules, hidden dishes or unavailable content'});continue;}
   const p={date,meal:rule.meal,name:rule.name,dishIds:ids,canonicalIds:ids.map(id=>byId.get(id).canonicalId),party:{...party},recurrenceId:rule._id};planned.push(p);created.push(p);
  }
 }
 return {created,skipped};
}
export function consumptionSummary(records){
 const groups=new Map();let used=0,wasted=0,valueUsed=0,valueWasted=0;
 for(const r of records){if(!['used','wasted'].includes(r.outcome)||!Number.isFinite(r.qty)||r.qty<=0)continue;const k=ingredientKey(r.name)+'|'+r.unit,x=groups.get(k)||{name:r.name,unit:r.unit,used:0,wasted:0,samples:0};x[r.outcome]+=r.qty;x.samples++;groups.set(k,x);const value=Number.isFinite(r.value)&&r.value>0?r.value:0;if(r.outcome==='used'){used++;valueUsed+=value;}else{wasted++;valueWasted+=value;}}
 return {groups:[...groups.values()],used,wasted,valueUsed,valueWasted};
}
export function portionLearning(records,dishId){
 const rows=records.filter(r=>r.dishId===dishId&&r.prepared>0&&r.eaten>=0&&r.eaten<=r.prepared&&r.people>0);
 if(rows.length<3)return null;
 const actual=rows.reduce((n,r)=>n+r.eaten/r.people,0)/rows.length;
 return {samples:rows.length,portionsPerPerson:Math.max(.5,Math.min(1.5,actual)),note:'Based on your recorded consumption; review before changing attendance.'};
}
export function householdTaste(dishes,state){
 return (state.family||[]).map(person=>{
  const scored=dishes.map(d=>{let score=0;for(const like of person.likes||[])if(d.ingredients.some(i=>ingredientKey(i).includes(ingredientKey(like))))score+=2;for(const dislike of person.dislikes||[])if(d.ingredients.some(i=>ingredientKey(i).includes(ingredientKey(dislike))))score-=4;if(person.cuisines?.includes(d.cuisine))score+=3;if(person.child&&d.kids)score+=2;score+=Number(state.votes?.[d.id]?.[person._id]||0)*2;return {dish:d,score};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,5);
  return {person,scored};
 });
}
export const MOODS={comfort:['dal','rice','onepot','stew'],light:['assemble','blend','stew'],crispy:['fry','bake'],fresh:['assemble','blend'],weekend:['grill','bake','flatbread'],spicy:['curry','fry']};
export function moodMatches(d,mood){if(!mood)return true;if(mood==='new')return true;if(mood==='spicy')return /chilli|pepper|spicy/.test(d.ingredients.join(' '));return (MOODS[mood]||[]).includes(d.method);}
export function productionSchedule(dishes,recipes,party,settings={}){
 const h=headcount(party),capacity=Number(settings.servingsPerBatch||50),stations=Number(settings.stations||1),staff=Number(settings.staff||1);
 if(!Number.isFinite(capacity)||capacity<1||capacity>100000||!Number.isInteger(stations)||stations<1||stations>100||!Number.isInteger(staff)||staff<1||staff>1000)throw Error('Enter valid batch capacity, stations and staff.');
 const hour=Number(settings.serviceHour??13);if(!Number.isInteger(hour)||hour<0||hour>23)throw Error('Service hour must be 0–23.');const lanes=Array.from({length:Math.min(stations,staff)},()=>0),service=hour*60;
 const jobs=dishes.map(d=>{const r=recipes.find(r=>r.id===d.id);const batch=Math.min(capacity,r?.batchSize||capacity);return {id:d.id,name:d.name,batches:Math.ceil(h.servings/batch),minutes:Math.max(5,d.time||30),equipment:d.equipment||[],passive:r?.passiveTime||null};}).sort((a,b)=>b.minutes*b.batches-a.minutes*a.batches);
 for(const job of jobs){const lane=lanes.indexOf(Math.min(...lanes));job.lane=lane+1;job.duration=job.batches*job.minutes;job.start=lanes[lane];lanes[lane]+=job.duration;job.end=lanes[lane];}
 const duration=Math.max(0,...lanes),clock=m=>{const n=((m%1440)+1440)%1440;return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');};
 for(const j of jobs){j.startTime=clock(service-duration+j.start);j.finishTime=clock(service-duration+j.end);}
 return {jobs,duration,overnight:service-duration<0,stations:lanes.length,headcount:h,note:'Conservative serial batches per station. Confirm recipe soak/rest times, usable vessel capacity and staffing with the kitchen supervisor. This is scheduling, not a food-holding instruction.'};
}
export function eventSchedule(dishes,party,filters,state){
 const meals=party.meal==='All-day menu'?['Breakfast','Lunch','High Tea','Dinner']:[party.meal||'Dinner'];
 const history=[...(state.history||[])],sessions=[];
 for(const meal of meals){let selected=[],missing=[];
  if(meal==='Breakfast'||meal==='High Tea'){
   for(const category of meal==='Breakfast'?['Breakfast','Tea','Juices']:['Snacks','Tea','Coffee']){const list=recommend(dishes,{...filters,party,category},{...state,history});const choice=list.find(d=>!selected.some(x=>x.canonicalId===d.canonicalId));if(choice)selected.push({...choice,course:category});else missing.push(category);}
  }else{const m=coordinatedMenu(dishes,party,filters,{...state,history});selected=m.dishes;missing=m.missing;}
  sessions.push({meal,dishes:selected,missing});history.push({date:new Date().toISOString(),dishIds:selected.map(d=>d.id),canonicalIds:selected.map(d=>d.canonicalId)});
 }
 return sessions;
}
export function substitutes(ingredient,dish,filters,state){
 const options={cream:['curd','coconut milk','cashew'],milk:['oat milk','soy milk','coconut milk'],paneer:['tofu'],butter:['oil','ghee'],curd:['unsweetened soy yogurt'],cashew:['sunflower seeds'],rice:['millet'],sugar:['jaggery']};
 return (options[ingredientKey(ingredient)]||[]).filter(replacement=>{
  const candidate={...dish,id:'substitution-check',canonicalId:'substitution-check',name:replacement,ingredients:[replacement],ingredientsComplete:true,allergens:[],jainVerified:! /potato|onion|garlic|ginger|carrot|mushroom/.test(replacement),vegetarian:true,eggless:true};
  return eligible(candidate,{...filters,party:{mode:'home',adults:1,kids:0},equipment:[]},{...state,history:[],hidden:[]});
 });
}
export function skillStep(text,skill){
 if(skill!=='Beginner')return text;
 const terms={simmer:'small gentle bubbles, below a rolling boil',saute:'cook in a little fat while stirring',sauté:'cook in a little fat while stirring',fold:'combine gently by lifting the mixture over itself',temper:'briefly bloom the listed spices in hot fat, then combine as directed',knead:'press and fold the dough until the stated texture is reached'};
 const extras=Object.entries(terms).filter(([term])=>norm(text).includes(term)).map(([term,meaning])=>term+': '+meaning);
 return text+(extras.length?'\n\n'+extras.join('. ')+'.':'');
}
