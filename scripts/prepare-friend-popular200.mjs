import fs from 'node:fs/promises';
const intake=JSON.parse(await fs.readFile('catalog/intake/friend-dishes.json','utf8'));
const published=JSON.parse(await fs.readFile('catalog/generated/dishes.json','utf8'));
const groups={
 'Korean and Japanese favourites':'kimchi-fried-rice vegetable-bibimbap vegetable-kimbap vegetable-ramen japchae kimchi-pancake korean-corn-cheese vegetarian-sundubu-jjigae tofu-katsu inari-sushi',
 'Asian restaurant dishes':'mapo-tofu agedashi-tofu hotteok onigiri tofu-broccoli-stir-fry vegetable-tempura veg-gyoza crystal-dumplings tofu-bao mushroom-bao',
 'Indian protein meals':'paneer-tikka-bowl paneer-quinoa-bowl soya-65 soya-seekh-kebab soya-momos soya-chunk-tikka chilli-soya-chunks rajma-galouti-kebab sattu-chilla moong-sprouts-dosa',
 'Protein bowls and snacks':'quinoa-black-bean-salad grilled-paneer-salad peanut-tofu-bowl chickpea-shawarma-bowl lentil-tacos tofu-burger chickpea-burger edamame-hummus greek-yogurt-bowl frozen-yogurt-bark',
 'Mexican favourites':'elote paneer-quesadilla sweet-potato-black-bean-burrito paneer-burrito taquitos tostadas guacamole pico-de-gallo queso-dip nachos-platter',
 'Sandwiches and burgers':'corn-cheese-sandwich paneer-bhurji-sandwich ghughra-sandwich palak-corn-sandwich paneer-burger paneer-tikka-sub portobello-mushroom-burger falafel-burger focaccia-sandwich caprese-panini',
 'Contemporary salads':'churros three-bean-salad grilled-halloumi-salad smashed-cucumber-salad cowboy-caviar burrata-salad edamame-salad orzo-salad foxtail-millet-salad black-bean-mango-salad',
 'Italian cafe favourites':'baked-feta-pasta baked-mac-and-cheese spinach-ricotta-cannelloni stuffed-pasta-shells baked-ziti mushroom-risotto gnocchi-alla-sorrentina garlic-butter-pasta avocado-pasta focaccia',
 'Indian restaurant curries':'paneer-pasanda dum-paneer-kali-mirch paneer-changezi bindaetteok veg-handi vegetable-chettinad veg-makhanwala paneer-angara paneer-rezala afghani-paneer',
 'Party starters':'paneer-65 gobi-65 baby-corn-manchurian dragon-paneer veg-crispy crispy-lotus-stem dahi-ke-sholay jalapeno-poppers buffalo-cauliflower-wings cheese-balls',
 'Tandoori and mezze':'hariyali-paneer-tikka malai-paneer-tikka tandoori-aloo tandoori-gobi malai-broccoli mushroom-tikka baba-ganoush muhammara tzatziki whipped-feta',
 'Biryani and rice favourites':'paneer-biryani soya-biryani navratan-pulao kabuli-chana-pulao masale-bhat burnt-garlic-fried-rice paneer-fried-rice pineapple-fried-rice thai-basil-fried-rice vegetable-paella',
 'Everyday grain meals':'oats-khichdi quinoa-khichdi sambar-sadam dal-chawal-palidu panchmel-khichdi podi-idli rava-appe moong-dal-appe quinoa-dosa paneer-chilla',
 'Chaat and convenient snacks':'kala-chana-chaat rajma-chaat moong-dal-chaat palak-patta-chaat masala-papad cheese-garlic-bread poha-cutlet makhana-chivda seed-crackers granola-bars',
 'Contemporary desserts':'eggless-tiramisu kunafa baklava mochi-ice-cream mango-sticky-rice pistachio-gelato basbousa eggless-new-york-cheesecake eggless-tres-leches-cake rasmalai-cake',
 'Bakery favourites':'eggless-molten-lava-cake mug-cake eggless-blueberry-muffins eggless-carrot-cake eggless-date-and-walnut-cake eggless-coffee-walnut-cake eggless-pistachio-cake eggless-cinnamon-rolls eggless-donuts banoffee-pie',
 'Indian desserts':'phirni shahi-tukda amrakhand bhapa-doi qubani-ka-meetha sheer-khurma ada-pradhaman pal-ada-payasam fruit-cream makhana-kheer',
 'Indian sweets':'kaju-pista-roll mathura-peda chhena-poda khaja gond-ladoo dry-fruit-ladoo anjeer-barfi sukhdi magas churma-ladoo',
 'Cafe drinks':'matcha-latte brown-sugar-boba-milk thai-iced-tea hojicha tiramisu-latte vietnamese-coconut-coffee iced-shaken-espresso sweet-cream-cold-brew spanish-latte butterfly-pea-iced-tea',
 'Soups and regional favourites':'khow-suey vegetarian-tom-yum vegetarian-tom-kha vegetarian-pho vegetarian-laksa jhol-momo thenthuk surti-locho panki dudhi-muthiya'
};
const normalize=s=>String(s||'').normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/\b(eggless|vegetarian|veg|homestyle)\b/g,'').replace(/[^a-z0-9]/g,'');
const names=new Map(published.flatMap(d=>[d.name,...(d.aliases||[])].map(n=>[normalize(n),d.name])));
const byId=new Map(intake.candidates.map(x=>[x.id,x]));
const items=[];
for(const [theme,list] of Object.entries(groups))for(const id of list.split(' ')){
 const c=byId.get(id);if(!c||c.contentStatus!=='recipe-photo-translation-review-required')throw Error('Not a pending candidate: '+id);
 const match=[c.name,...(c.sourceAliases||[])].map(n=>names.get(normalize(n))).find(Boolean);if(match)throw Error(c.name+' duplicates '+match);
 names.set(normalize(c.name),c.name);
 items.push({id,name:c.name,category:c.sourceCategory,theme,sourceReviewId:c.sourceReviewId,sourceRow:c.sourceRow,status:'recipe-needed',matches:[]});
}
if(items.length!==200||new Set(items.map(x=>x.id)).size!==200)throw Error('Expected 200 unique dishes');
const path='catalog/intake/friend-popular200-progress.json';
try{await fs.access(path);throw Error('Progress exists; resume instead of replacing');}catch(e){if(e.code!=='ENOENT')throw e;}
await fs.writeFile(path,JSON.stringify({batch:'friend-list-popular200',source:intake.source,selection:'Current trend themes and enduring popular favourites missing from the catalogue; not a ranked national top-200 list.',publicationStatus:'draft',researchDate:'2026-10-15',trendSources:[{url:'https://www.swiggy.com/corporate/press-release/how-india-swiggyd-2025-a-feast-for-the-fast-the-foodie-and-the-future/',supports:'Indian order preferences, Korean and Mexican food, desserts and regional cuisines'},{url:'https://blog.swiggy.com/food/world-protein-day-2026-high-protein-food-swiggy/',supports:'Protein-focused bowls, wraps and vegetarian ingredients'},{url:'https://www.aranca.com/knowledge-library/articles/business-research/korean-food-trends-india',supports:'2026 Korean food market growth'}],items},null,2)+'\n');
console.log('Selected '+items.length+' distinct dishes across '+Object.keys(groups).length+' themes');
