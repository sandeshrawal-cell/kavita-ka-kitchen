import {breakfastRecipes} from './recipes-breakfast.mjs';
import {mainRecipes} from './recipes-mains.mjs';
import {soupRecipes} from './recipes-soups.mjs';
import {steamRecipes} from './recipes-steam.mjs';
export const regionalRecipes={};
const add=(id,ingredients,steps,time=60,tip='Prepare the components in the order shown and check each for doneness before assembling the meal.')=>regionalRecipes[id]={ingredients,steps,time,tip};
const componentNames={'jowar-roti-with-mixed-sabzi':['vegetable curry','jowar bhakri'],'misal-pav':['matki usal','pav and toppings'],'appam-with-vegetable-stew':['appam','vegetable stew'],'neer-dosa-with-veg-curry':['neer dosa','vegetable curry'],'pithla-bhakri':['pithla','jowar bhakri'],'pongal-with-sambar':['pongal','sambar'],'dal-baati-churma':['panchmel dal','baati and churma']};
const combine=(id,parts,time,tip)=>add(id,parts.map(p=>p.ingredients).join('|'),parts.flatMap((p,i)=>[
 `For the ${componentNames[id][i]}, set aside these quantities from the combined ingredient list: ${p.ingredients.split('|').map(x=>{const [n,q,u]=x.split(':');return `${q} ${u} ${n}`;}).join(', ')}. Follow the next steps for this part of the meal.`,...p.steps
]),time,tip);
combine('jowar-roti-with-mixed-sabzi',[mainRecipes['mix-vegetable-curry'],breakfastRecipes['jowar-bhakri']],80,'Cook the vegetable curry first and keep it hot while making the jowar rotis. Quantities include both components.');
combine('misal-pav',[mainRecipes['matki-usal'],{ingredients:'eggless pav:400:g|farsan:160:g|onion:100:g|lemon:120:g|water:250:ml',steps:[
 'Add the extra 250 ml water to the finished usal and simmer for 5 minutes to make a loose, spoonable gravy.',
 'Warm pav in a dry pan and finely chop the extra onion. Cut lemon into wedges.',
 'Divide hot usal into bowls. Top with farsan and onion only at serving time and serve with pav and lemon. Check the purchased farsan ingredients against your dietary restrictions.'
]}],55,'This regional breakfast can also be served as lunch. Keep farsan separate until eating so it stays crisp.');
combine('appam-with-vegetable-stew',[{ingredients:'rice:250:g|cooked rice:70:g|grated coconut:100:g|instant yeast:3:g|sugar:15:g|salt:4:g|water:400:ml|oil:15:ml',steps:[
 'Rinse raw rice and soak for 5 hours, then drain. Blend with cooked rice, coconut and 300 ml measured water until completely smooth.',
 'Stir in instant yeast and sugar, cover loosely and leave in a warm place for 2–3 hours until bubbly and risen. Add salt and enough remaining water to make a thin pouring batter.',
 'Lightly grease an appam pan and heat over medium heat. Pour in a small ladle of batter and swirl the pan so it coats the sides thinly while the centre remains thicker.',
 'Cover and cook for 2–3 minutes until the centre is set and the edges lift easily. Do not flip. Repeat with the remaining batter and keep warm while preparing the stew.'
 ]},soupRecipes['vegetable-stew']],75,'Allow 5 hours soaking plus 2–3 hours rising in addition to cooking. Prepare the stew while the batter rises.');
combine('neer-dosa-with-veg-curry',[{ingredients:'rice:280:g|water:650:ml|salt:4:g|oil:20:ml',steps:[
 'Rinse rice and soak for 4 hours. Drain and blend very smooth with 200 ml fresh water.',
 'Stir in remaining measured water and salt to make a thin milk-like batter. This neer dosa batter does not require fermentation.',
 'Heat a well-seasoned tawa over medium-high heat and grease lightly. Stir the batter each time before pouring a thin layer across the pan, tilting to fill gaps.',
 'Cover for 1–2 minutes until the top is set. Lift carefully without flipping, fold loosely and repeat; let each dosa cool briefly before stacking so they do not stick.'
 ]},mainRecipes['mix-vegetable-curry']],75,'Allow 4 hours rice soaking separately. Start the vegetable curry before cooking the dosas so both can be served warm.');
combine('pithla-bhakri',[{ingredients:'gram flour:150:g|onion:120:g|garlic:10:g|oil:25:ml|mustard seeds:3:g|cumin:3:g|turmeric powder:1:g|salt:5:g|water:750:ml|coriander:15:g',steps:[
 'Whisk gram flour with 300 ml water until smooth. Chop onion and mince garlic.',
 'Heat oil, pop mustard seeds and sizzle cumin. Soften onion for 6 minutes, add garlic for 1 minute, then turmeric.',
 'Add remaining 450 ml water and salt and bring to a boil. Pour in gram-flour slurry gradually while stirring continuously.',
 'Cook over low heat for 10–12 minutes, scraping the base, until thick and smooth with no raw flour taste. Finish with coriander and keep warm while making bhakri.'
 ]},breakfastRecipes['jowar-bhakri']],65,'Serve hot pithla with freshly cooked bhakri; both are included in the ingredient quantities.');
combine('pongal-with-sambar',[{ingredients:'rice:220:g|moong dal:100:g|water:1200:ml|ghee:35:g|cumin:4:g|black pepper:3:g|ginger:12:g|curry leaves:5:g|cashew:40:g|salt:5:g',steps:[
 'Dry-toast moong dal for 2 minutes until aromatic, then rinse with rice and drain.',
 'Add grains, measured water and salt to a deep pan. Bring to a boil, cover loosely and simmer for 30–35 minutes until very soft, stirring occasionally.',
 'Mash lightly to a creamy consistency. Heat ghee separately, toast cashews, add cumin, coarsely crushed pepper, finely chopped ginger and curry leaves for 30 seconds.',
 'Stir tempering into the soft rice and dal. Add hot water if too firm and keep warm while making sambar.'
 ]},steamRecipes['vegetable-sambar']],85,'Cook the pongal and sambar in separate pans at the same time if your stove allows.');
add('shukto','bitter gourd:150:g|potato:180:g|raw banana:200:g|brinjal:200:g|green beans:150:g|mustard seeds:3:g|fennel seeds:3:g|mustard paste:20:g|milk:200:ml|water:400:ml|oil:35:ml|ghee:15:g|sugar:10:g|salt:5:g',[
 'Wash vegetables, peel potato and raw banana and cut all vegetables into similar batons. Slice bitter gourd into thin half-moons.',
 'Heat half the oil and fry bitter gourd over medium heat for 5–6 minutes until lightly golden; remove and reserve.',
 'Add remaining oil, sizzle mustard and fennel seeds, then add potato, raw banana and beans and stir for 3 minutes.',
 'Add water and salt, cover and simmer for 10 minutes. Add brinjal and cook another 8–10 minutes until all vegetables are tender.',
 'Whisk mustard paste with milk and pour into the pan. Add reserved bitter gourd and sugar and simmer very gently for 4 minutes.',
 'Finish with ghee and serve warm as a mildly bitter vegetable course. Keep enough liquid for a light sauce rather than reducing it dry.'
],45);
add('handvo','rice:180:g|chana dal:90:g|moong dal:60:g|urad dal:40:g|curd:150:g|bottle gourd:350:g|ginger:10:g|water:200:ml|oil:40:ml|mustard seeds:4:g|sesame seeds:25:g|curry leaves:5:g|turmeric powder:1:g|salt:6:g|plain fruit salt:5:g',[
 'Rinse rice and lentils and soak for 5–6 hours. Drain and grind with curd and measured water into a thick, slightly coarse batter.',
 'Cover loosely and ferment in a warm place for 6–8 hours until lightly sour and bubbly.',
 'Preheat oven to 180°C and grease a 22 cm tin. Peel and grate bottle gourd, discarding it if bitter, and fold into batter with grated ginger, turmeric and salt.',
 'Heat oil, pop mustard seeds and add sesame and curry leaves. Stir half the tempering into the batter and reserve the rest.',
 'Fold fruit salt into the batter, transfer promptly to the tin and spread the remaining tempering on top.',
 'Bake for 40–50 minutes until deeply golden and a skewer comes out clean. Rest for 15 minutes before slicing so the centre sets.'
],75,'Allow 5–6 hours soaking and 6–8 hours fermentation in addition to preparation and baking.');
add('litti-chokha','whole wheat flour:320:g|sattu roasted gram flour:180:g|ghee:50:g|water:220:ml|mustard oil:35:ml|lemon juice:30:ml|onion:140:g|ginger:12:g|garlic:15:g|cumin:4:g|salt:8:g|brinjal:500:g|tomato:350:g|potato:300:g|coriander:25:g',[
 'Mix wheat flour with 20 g ghee and half the salt. Add most of the water gradually and knead a soft dough; cover for 25 minutes.',
 'Mix sattu with half the finely chopped onion, ginger, half the garlic, cumin, lemon juice, 20 ml mustard oil and a little salt. Add a spoonful of water only if needed so the filling holds together when squeezed.',
 'Preheat oven to 210°C. Prick brinjal and roast with whole tomatoes for 35–45 minutes until soft; remove tomatoes earlier if done. Boil potato separately until tender.',
 'Divide dough and filling into 8 portions. Flatten each dough ball, add filling, gather and seal completely, and roll gently into a ball.',
 'Bake litti on a tray for 30–40 minutes, turning twice, until browned all around and the dough is fully cooked. Brush with remaining melted ghee.',
 'Peel roasted brinjal and tomato and mash with peeled boiled potato, remaining onion, garlic, mustard oil, salt and coriander to make chokha. Serve with hot litti.'
],85);
combine('dal-baati-churma',[mainRecipes['panchmel-dal'],{ingredients:'whole wheat flour:320:g|semolina:60:g|ghee:120:g|curd:80:g|water:140:ml|salt:4:g|powdered sugar:70:g|cardamom powder:1:g|almond:25:g',steps:[
 'Preheat oven to 190°C. Mix flour, semolina and salt, rub in 60 g ghee, then add curd and water gradually to make a firm dough. Rest for 20 minutes.',
 'Divide into 10 balls and make a shallow cross on each top. Bake for 35–45 minutes, turning halfway, until golden and cooked through; a cut baati should have no sticky raw dough.',
 'Brush eight hot baatis with 30 g melted ghee and keep warm for serving.',
 'Cool the remaining two baatis, break into pieces and pulse into coarse crumbs. Mix with remaining ghee, powdered sugar, cardamom and chopped almonds to make churma.',
 'Serve two baatis per person with the prepared panchmel dal and a small portion of churma.'
]}],110,'Lentil soaking is additional; make the dal while the baati bake. The quantities include all three components.');
add('undhiyu','surti papdi:300:g|small brinjal:300:g|small potatoes:250:g|purple yam:250:g|raw banana:200:g|coconut:120:g|coriander:60:g|roasted peanuts:70:g|sesame seeds:25:g|ginger:15:g|garlic:15:g|cumin:4:g|coriander powder:8:g|turmeric powder:2:g|lemon juice:30:ml|jaggery:20:g|oil:60:ml|salt:8:g|water:400:ml|cooked methi muthiya:250:g',[
 'String and split papdi. Peel and cube yam and raw banana. Slit small potatoes and brinjals in crosses while keeping them attached at the base.',
 'Coarsely grind coconut, coriander, peanuts, sesame, ginger and garlic. Mix with coriander powder, turmeric, lemon juice, jaggery, half the oil and salt to make stuffing.',
 'Fill potato and brinjal slits with some stuffing. Toss papdi, yam and banana with the remaining stuffing.',
 'Heat remaining oil in a heavy pot and sizzle cumin. Layer papdi and yam at the bottom, then stuffed potatoes, brinjals and banana. Pour water around the edges.',
 'Cover tightly and simmer on low heat for 30–40 minutes, gently turning occasionally and adding a little boiling water if dry, until potatoes and yam are fully tender.',
 'Place fully cooked methi muthiya on top, cover and steam for 8–10 minutes. Mix gently without crushing and serve hot.'
],70,'This version uses prepared cooked methi muthiya; make the separate Methi Muthiya recipe in advance if needed.');
