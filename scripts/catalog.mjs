import fs from 'node:fs/promises';
import vm from 'node:vm';
import {recipes} from '../catalog/recipes.mjs';
import {extra} from '../catalog/extra.mjs';
import {slug,norm,CATEGORIES,COMMON_SIDES,ROOTS,vegetarianText} from '../src/core.js';
const root=new URL('../',import.meta.url);
const source=await fs.readFile(new URL('data.js',root),'utf8');
const box={window:{}};
vm.runInNewContext(source.replace('window.KKK_DATA={','window.BASES={Breakfast:breakfastBases,Lunch:lunchBases,Dinner:dinnerBases,Desserts:dessertBases,Shakes:shakeBases,Coffee:coffeeBases,Snacks:snackBases};window.KKK_DATA={'),box);
const photos=JSON.parse(await fs.readFile(new URL('catalog/photos.json',root),'utf8').catch(()=>'{}'));
const db=new Map(),aliases={};
function add(name,cuisine,category,ingredients,method,opts={}){
 if(!vegetarianText(name+' '+ingredients.join(' ')))return;
 const id=slug(name),previous=db.get(id);
 const d=previous||{id,canonicalId:id,name,cuisine,categories:[],ingredients,method,time:opts.baseTime||30,effort:opts.effort||'medium',kids:opts.kids!==false,nutrition:opts.nutrition||['balanced'],vegetarian:true,eggless:true,ingredientsComplete:false,jainVerified:false,recipeStatus:'outline',seasons:[opts.season||'all'],bulkScore:['dal','rice','onepot','curry','stew','blend'].includes(method)?9:6,individualPrep:['griddle','flatbread','fry','bake','grill','assemble'].includes(method),fried:method==='fry',equipment:method==='bake'?['Oven']:method==='grill'?['Tandoor']:[],side:COMMON_SIDES.has(norm(name)),leftoverUses:[],allergens:[]};
 d.categories=[...new Set([...d.categories,category])];db.set(id,d);return d;
}
for(const [category,items] of Object.entries(box.window.BASES))for(const b of items)add(b.name,b.cuisine,category,b.ingredients,b.method,b);
for(const row of extra.trim().split('\n')){const [n,c,cat,ing,m]=row.split('|');add(n,c,cat,ing.split(','),m);}
const price={rice:.065,'basmati rice':.12,'toor dal':.15,'moong dal':.13,'kidney beans':.16,tomato:.04,cucumber:.05,spinach:.06,paneer:.4,curd:.08,milk:.065,cream:.25,oil:.15,ghee:.6,sugar:.045,jaggery:.07,coffee:1.1,'black tea':.5,'whole wheat flour':.045,'gram flour':.09,semolina:.055,water:0,'soda water':.025,peanuts:.18,almond:.85,cashew:.9,banana:.06,mango:.12,oats:.15,dates:.3,'sweet corn':.1,peas:.12,carrot:.06,beans:.08,makhana:1,tahini:.7,'cooked chickpeas':.08,'olive oil':.9};
const spice=/cumin|turmeric|chilli|pepper|cardamom|cinnamon|mustard|salt/;
function group(n){if(/milk|curd|paneer|cream|butter|cheese/.test(n))return 'Dairy';if(/dal|lentil|chickpeas|kidney beans|moth beans/.test(n))return 'Pulses';if(/rice|flour|semolina|oats|millet|poha|bulgur/.test(n))return 'Grains';if(/almond|cashew|peanuts|dates|pistachio|makhana/.test(n))return 'Dry Fruits';if(spice.test(n)||/curry leaves|coriander|basil|mint/.test(n))return 'Spices';if(/banana|mango|apple|lemon|watermelon|strawberry|orange/.test(n))return 'Fruits';if(/bread|pav|wrap|tortilla/.test(n))return 'Bakery';if(/oil|ghee|sugar|jaggery|coffee|tea|tahini|soda/.test(n))return 'Packaged';if(/tomato|cucumber|spinach|corn|peas|carrot|beans|capsicum|gourd|brinjal|potato|onion/.test(n))return 'Vegetables';return 'Other';}
const recipeMap=new Map();
for(const [name,cuisine,method,time,raw,steps,tip] of recipes){
 const ing=raw.split('|').map(x=>{const [name,q,unit]=x.split(':');return {name,qty:Number(q),unit,group:group(name),scale:spice.test(name)?'seasoning':'linear',pricePerUnit:price[name]??(spice.test(name)?name==='salt'?.025:.65:undefined)};});
 const cat=method==='coffee'?'Coffee':method==='tea'?'Tea':method==='dessert'?'Desserts':method==='blend'?'Cold Drinks':method==='assemble'?'Salads':method==='griddle'?'Breakfast':'Dinner';
 const d=add(name,cuisine,cat,ing.map(x=>x.name),method,{baseTime:time});d.ingredients=ing.map(x=>x.name);d.ingredientsComplete=true;d.jainVerified=!ROOTS.test(d.ingredients.join(' '))&&!d.ingredients.includes('peanuts');d.recipeStatus='complete';d.time=time;d.equipment=[];
 if(['blend'].includes(method))d.equipment=['Blender'];
 d.estimatedCost=ing.reduce((n,i)=>n+i.qty*(i.pricePerUnit||0),0)/4;
 recipeMap.set(d.id,{id:d.id,name,baseServings:4,batchSize:['flatbread','griddle','assemble'].includes(method)?20:50,ingredients:ing,steps,tips:[tip],substitutions:method==='curry'?['For a cream finish, plain whisked curd may work: cool the pan and add gradually. Recheck dietary filters before substituting.']:['Any substitution changes the recipe: recheck allergies, Jain rules and quantities.'],status:'complete',prepTime:time,passiveTime:/soak/i.test(steps.join(' '))?'See soaking/resting time in the steps':null,notes:'Prices are sample ingredient-cost assumptions. Replace with supplier rates before procurement.'});
}
// Collapse known synonyms and explicit side-only variants while keeping redirects for saved IDs.
for(const [oldId,newId] of Object.entries({'kheer':'rice-kheer','eggless-malpua':'malpua','panna-cotta':'agar-panna-cotta','chocolate-mousse':'vegan-chocolate-mousse','fruit-custard':'fruit-custard-with-cornstarch','sev-tameta':'sev-tamatar','chana-dal-lauki':'doodhi-chana-dal','hara-bhara-kebab-meal':'hara-bhara-kebab','tandoori-paneer-with-roti':'paneer-tikka'})){
 if(db.has(oldId)&&db.has(newId)){const old=db.get(oldId),target=db.get(newId);target.categories=[...new Set([...target.categories,...old.categories])];db.delete(oldId);recipeMap.delete(oldId);aliases[oldId]=newId;}
}
for(const d of db.values()){
 if(photos[d.id]?.status==='reviewed'){d.photo=photos[d.id];if(recipeMap.has(d.id))recipeMap.get(d.id).photo=d.photo;}
 if(d.method==='assemble'&&!/wrap|sandwich|sushi|taco|roll/.test(norm(d.name))){d.individualPrep=false;d.bulkScore=9;}
 if(d.categories.some(x=>['Lunch','Dinner','Sabzi/Curries','Dal/Legumes','Rice','One-Pot Meals'].includes(x)))d.categories.push('Lunch','Dinner');
 if(d.method==='curry'||d.method==='kadhi')d.categories.push('Sabzi/Curries');if(d.method==='dal')d.categories.push('Dal/Legumes');if(d.method==='rice')d.categories.push('Rice');if(d.method==='onepot')d.categories.push('One-Pot Meals');if(d.method==='flatbread')d.categories.push('Breads');
 if(d.categories.includes('Coffee')||d.categories.includes('Tea'))d.categories.push('Hot Drinks');
 if(d.categories.includes('Shakes')||d.categories.includes('Smoothies')||d.categories.includes('Juices')||d.categories.includes('Mocktails'))d.categories.push('Cold Drinks');
 if(d.categories.includes('Cakes & Bakes')||d.categories.includes('Indian Sweets'))d.categories.push('Desserts');
 if(d.categories.includes('Chaats'))d.categories.push('Snacks','Street Food');
 if(d.categories.includes('Snacks'))d.categories.push('Party Food');
 if(d.categories.includes('Breakfast')&&d.kids)d.categories.push('Lunchbox');
 d.kids=d.kids&&!/coffee|espresso|latte|cappuccino|chai|tea|chilli|spicy|schezwan|kung pao/.test(norm(d.name));
 if(d.kids&&['Breakfast','Lunchbox','Shakes','Smoothies','Quick Meals'].some(c=>d.categories.includes(c)))d.categories.push('Kids Meals');if(d.time<=30)d.categories.push('Quick Meals');if(d.nutrition.includes('light'))d.categories.push('Light Meals');if(d.nutrition.includes('protein-rich'))d.categories.push('High Protein Vegetarian');
 if(d.jainVerified)d.categories.push('Jain');if(d.ingredientsComplete&&!/onion|garlic/.test(d.ingredients.join(' ')))d.categories.push('No Onion-Garlic');
 if(/wrap|burrito/i.test(d.name))d.categories.push('Wraps');if(/sandwich|toast|bruschetta/i.test(d.name))d.categories.push('Sandwiches');
 if(d.categories.includes('Indian Sweets'))d.categories.push('Festival Food');
 if(d.categories.includes('Leftover Recipes'))d.leftoverUses=d.ingredients.filter(x=>/leftover|cooked|bread/.test(x));
 if(['rice','onepot'].includes(d.method))d.leftoverUses.push('cooked rice');
 d.categories=[...new Set(d.categories)];
 const joined=d.ingredients.join(' ');d.allergens=[/milk|paneer|curd|cream|ghee|butter|cheese/.test(joined)&&'milk',/wheat|flour|semolina|bread|pav|pasta|noodles|bulgur/.test(joined)&&'gluten',/peanut/.test(joined)&&'peanut',/almond|cashew|pistachio|hazelnut/.test(joined)&&'tree nuts',/sesame|tahini/.test(joined)&&'sesame',/soy|tofu/.test(joined)&&'soy'].filter(Boolean);
 if(!recipeMap.has(d.id)){
  const legacy=box.window.KKK_DATA.dishes.find(x=>x.baseName===d.name);
  const rough=d.ingredients.map(name=>({name,qty:spice.test(name)?2:/milk|water/.test(name)?300:160,unit:/milk|water|oil/.test(name)?'ml':'g',group:group(name),scale:spice.test(name)?'seasoning':'linear'}));
  const outline=legacy?box.window.KKK_DATA.recipeFor(legacy,4,0).steps:['Prepare the ingredients for this dish. A complete dish-specific method is still being developed.'];
  recipeMap.set(d.id,{id:d.id,name:d.name,baseServings:4,ingredients:rough,steps:outline,tips:['This imported preparation outline is incomplete. Confirm ingredients, quantities and method with a complete recipe before cooking or bulk procurement.'],substitutions:[],status:'outline',notes:'Quantities are provisional planning placeholders, not a validated recipe. Ingredient prices are unavailable.'});
 }
}
for(const legacy of box.window.KKK_DATA.dishes){const id=slug(legacy.baseName),d=db.get(aliases[id]||id);if(d)aliases[legacy.id]=d.id;}
const all=[...db.values()].sort((a,b)=>a.name.localeCompare(b.name));
await fs.mkdir(new URL('catalog/generated',root),{recursive:true});
await fs.mkdir(new URL('public/data/recipes',root),{recursive:true});
await fs.mkdir(new URL('public/data/categories',root),{recursive:true});
await fs.writeFile(new URL('catalog/generated/dishes.json',root),JSON.stringify(all));
await fs.writeFile(new URL('public/data/aliases.json',root),JSON.stringify(aliases));
for(const [id,r] of recipeMap)await fs.writeFile(new URL(`public/data/recipes/${id}.json`,root),JSON.stringify(r));
const counts={};for(const cat of CATEGORIES){const rows=all.filter(d=>d.categories.includes(cat));counts[cat]=rows.length;await fs.writeFile(new URL(`public/data/categories/${slug(cat)}.json`,root),JSON.stringify(rows));}
await fs.writeFile(new URL('public/data/manifest.json',root),JSON.stringify({version:'3.1',photos:all.filter(d=>d.photo).length,total:all.length,completeRecipes:recipes.length,categories:counts,cuisines:[...new Set(all.map(d=>d.cuisine))].sort(),featured:all.filter(d=>d.recipeStatus==='complete').sort((a,b)=>Number(!!b.photo)-Number(!!a.photo)).slice(0,8)}));
const quote=s=>"'"+String(s).replaceAll("'","''")+"'";
const sql=['-- Generated master catalogue. Existing private records are untouched.','begin;'];
for(const d of all)sql.push(`insert into public.kkk_dishes(id,canonical_id,name,cuisine,categories,vegetarian,eggless,metadata,published) values(${quote(d.id)},${quote(d.canonicalId)},${quote(d.name)},${quote(d.cuisine)},array[${d.categories.map(quote).join(',')}],true,true,${quote(JSON.stringify(d))}::jsonb,true) on conflict(id) do update set name=excluded.name,cuisine=excluded.cuisine,categories=excluded.categories,metadata=excluded.metadata,published=true;`);
for(const [id,r] of recipeMap)sql.push(`insert into public.kkk_recipes(dish_id,recipe,published) values(${quote(id)},${quote(JSON.stringify(r))}::jsonb,true) on conflict(dish_id) do update set recipe=excluded.recipe,published=true;`);
sql.push('commit;');await fs.writeFile(new URL('supabase/seed-catalog.sql',root),sql.join('\n'));
console.log(JSON.stringify({total:all.length,completeRecipes:recipes.length,categories:counts},null,2));
