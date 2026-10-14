import fs from 'node:fs/promises';

const intake=JSON.parse(await fs.readFile('catalog/intake/friend-dishes.json','utf8'));
const published=JSON.parse(await fs.readFile('catalog/generated/dishes.json','utf8'));
// Deliberately span ten thin areas of the published catalogue instead of taking
// the next hundred source rows (which are almost all curries).
const selection={
  'Sabzi/Curries':['aloo-matar','sarson-ka-saag','lauki-ki-sabzi','bharwa-bhindi','aloo-methi','gobi-matar','bharwan-karela','tinda-masala','aloo-baingan','kathal-ki-sabzi'],
  'Dal/Legumes':['majjige-huli','pulissery','kadala-curry','tomato-pappu','gongura-pappu','mamidikaya-pappu','muddha-pappu','pappu-charu','ulavacharu','dosakaya-pappu'],
  Rice:['tomato-rice','hyderabadi-veg-dum-biryani','kashmiri-pulao','tawa-pulao','vangi-bath','ghee-rice','pudina-rice','paneer-pulao','kathal-biryani','mushroom-biryani'],
  'One-Pot Meals':['pasta-e-broccoli','pasta-e-lenticchie','pizzoccheri','arroz-con-verduras','huggi','thinai-pongal','kashmiri-khetchir','rasam-sadam','paruppu-sadam','sweet-potato-congee'],
  Soups:['garlic-rasam','pineapple-rasam','paruppu-rasam','clear-vegetable-soup','cream-of-mushroom-soup','broccoli-cheddar-soup','jeera-rasam','kollu-rasam','tomato-saar','kokum-saar'],
  Salads:['kachumber-salad','greek-salad','eggless-caesar-salad','caprese-salad','gajar-koshimbir','kakdi-koshimbir','fattoush','russian-salad','coleslaw','thai-green-papaya-salad'],
  Wraps:['chilli-paneer-roll','paneer-frankie','schezwan-frankie','manchurian-roll','chowmein-roll','paneer-bhurji-roll','mushroom-tikka-roll','veg-seekh-kebab-roll','rumali-roti-roll','aloo-tikki-wrap'],
  'Cakes & Bakes':['eggless-black-forest-cake','eggless-pineapple-cake','nankhatai','eggless-red-velvet-cake','eggless-butterscotch-cake','eggless-mawa-cake','eggless-plum-cake','eggless-chocolate-chip-cookies','eggless-chocolate-truffle-cake','eggless-marble-cake'],
  Smoothies:['mango-smoothie','mixed-berry-smoothie','strawberry-banana-smoothie','mango-banana-smoothie','avocado-mango-smoothie','blueberry-oat-smoothie','peanut-butter-oat-smoothie','green-smoothie','acai-bowl','tropical-smoothie'],
  Mocktails:['virgin-mojito','virgin-pina-colada','blue-lagoon-mocktail','virgin-margarita','virgin-strawberry-daiquiri','virgin-sangria','shirley-temple','watermelon-mojito','strawberry-mojito','kala-khatta-mojito']
};
const ids=Object.values(selection).flat();
if(ids.length!==100||new Set(ids).size!==100)throw Error('Selection must have 100 unique IDs');
const byId=new Map(intake.candidates.map(item=>[item.id,item]));
const normalize=value=>String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\b(jain|veg|vegetarian|eggless|easy|homestyle)\b/g,'').replace(/[^a-z0-9]/g,'');
const existing=new Map(published.flatMap(dish=>[dish.name,...(dish.aliases||[])].map(name=>[normalize(name),dish.name])));
const items=[];
for(const [category,chosen] of Object.entries(selection)){
  if(chosen.length!==10)throw Error(`${category} must have ten IDs`);
  for(const id of chosen){
    const candidate=byId.get(id);
    if(!candidate||candidate.sourceCategory!==category||candidate.contentStatus!=='recipe-photo-translation-review-required')throw Error(`Invalid pending candidate: ${id}`);
    const match=[candidate.name,...(candidate.sourceAliases||[])].map(name=>existing.get(normalize(name))).find(Boolean);
    if(match)throw Error(`${candidate.name} duplicates published ${match}`);
    items.push({id,name:candidate.name,category,sourceReviewId:candidate.sourceReviewId,sourceRow:candidate.sourceRow,status:'recipe-needed',matches:[]});
    existing.set(normalize(candidate.name),candidate.name);
  }
}
const path='catalog/intake/friend-sixth100-progress.json';
try{await fs.access(path);throw Error(`${path} already exists; preserve existing progress`);}catch(error){if(error.code!=='ENOENT')throw error;}
await fs.writeFile(path,JSON.stringify({batch:'friend-list-sixth100',source:'Kavita_ka_Kitchen_dishes_with_batch1.xlsx',selection:'Ten dishes each from ten underrepresented categories',publicationStatus:'draft',items},null,2)+'\n');
console.log(`Prepared ${items.length} distinct candidates across ${Object.keys(selection).length} categories`);
