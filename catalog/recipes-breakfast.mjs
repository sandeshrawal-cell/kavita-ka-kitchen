export const breakfastRecipes={};
const add=(id,ingredients,steps,time=40,tip='Cook one small test portion first and adjust the consistency and heat before cooking the rest.')=>breakfastRecipes[id]={ingredients,steps,time,tip};
const batters={
 'adai':['rice:180:g|toor dal:70:g|chana dal:70:g|urad dal:30:g|onion:100:g|curry leaves:5:g|cumin:3:g|dried red chilli:2:g','Soak the rice and lentils together for 4 hours, then drain. Grind with cumin, chilli and about 250 ml fresh water to a slightly coarse, thick pouring batter.','Stir in finely chopped onion and curry leaves. No fermentation is needed.','Spread into 15 cm pancakes slightly thicker than dosa; cook for 3–4 minutes, flip and cook for 2 minutes until the lentils are cooked through.'],
 'moong-dal-chilla':['moong dal:300:g|ginger:10:g|cumin:3:g|coriander:15:g','Soak rinsed moong dal for 4 hours, drain and blend with ginger, cumin and 200 ml fresh water to a smooth batter.','Stir in chopped coriander and enough extra water to make the batter spreadable.','Spread thinly from the centre; cook for 2–3 minutes until the top sets, then flip for 1–2 minutes.'],
 'pesarattu':['whole green moong:280:g|rice:40:g|ginger:12:g|cumin:3:g|onion:120:g','Soak moong and rice for 6–8 hours, drain and blend with ginger, cumin and 250 ml fresh water until fine.','Keep chopped onion separate to scatter over the wet pancakes. This batter does not need fermentation.','Spread thinly, scatter onion and press lightly. Cook for 3 minutes until crisp at the edges, flip for 1 minute and fold.'],
 'ragi-dosa':['ragi flour:180:g|rice flour:100:g|semolina:40:g|cumin:3:g|curd:100:g','Whisk flours, semolina, cumin and curd with 650 ml water to make a thin, lump-free batter.','Rest for 20 minutes. Stir before every dosa because the flour settles; thin with water if it no longer pours freely.','Pour from the outside towards the centre, leaving small holes. Cook for 3–4 minutes until crisp and releasing easily; flip briefly if the centre is still soft.'],
 'kuttu-chilla':['buckwheat flour:260:g|potato:180:g|cumin:3:g|coriander:15:g','Boil the potato until tender, peel and mash smoothly. Mix with buckwheat flour, cumin and about 350 ml water.','Add chopped coriander and beat to a smooth thick batter. If making this for a fast, choose salt and ingredients permitted by your practice.','Spread into small 12 cm pancakes that will be easy to turn. Cook for 3 minutes on each side until firm and lightly browned.']
};
for(const [id,[ingredients,prep,mix,cook]] of Object.entries(batters))add(id,ingredients+'|water:700:ml|oil:30:ml|salt:5:g',[
 prep,mix,'Mix in salt. Reserve unused measured water for adjusting the batter; soaking water is discarded and is additional.',
 'Heat a flat non-stick or well-seasoned tawa over medium heat. Brush lightly with some of the measured oil; the batter should sizzle gently on contact.',
 cook+' Drizzle a little oil around each pancake as it cooks.',
 'Repeat with the remaining batter, stirring it between batches. Serve hot; any chutney or accompaniment is additional to these quantities.'
],40,'Soaking or resting is additional to the cooking time. Keep the tawa at steady medium heat so the middle cooks before the outside burns.');
const breads={
 'akki-roti':['rice flour:320:g|onion:100:g|carrot:100:g|coriander:15:g|cumin:3:g',260,'Mix the flour with very finely chopped onion, grated carrot, coriander and cumin. Add warm water gradually to make a soft, pliable dough.','Pat a ball into a thin 15 cm round on lightly oiled baking parchment. Invert onto a warm tawa and carefully peel away the parchment before increasing the heat.'],
 'thalipeeth':['jowar flour:120:g|whole wheat flour:100:g|gram flour:100:g|onion:120:g|cumin:3:g|coriander:15:g',240,'Mix flours, finely chopped onion, cumin and coriander. Add water gradually to form a soft dough.','Pat into thin rounds on oiled parchment, making a small hole in the centre. Transfer to a warm tawa and remove the parchment.'],
 'bajra-roti':['bajra flour:320:g',280,'Add hot water gradually to the flour using a spoon, then knead once cool enough to handle. Make a soft dough and use immediately.','Pat each ball between palms or roll gently between sheets of parchment into a 15 cm round; handle carefully because millet dough has no gluten.'],
 'jowar-bhakri':['jowar flour:320:g',280,'Stir hot water gradually into the flour and knead when cool enough to handle until smooth and soft.','Pat out small rounds on a floured board or between parchment. Lift gently onto the tawa without tearing.'],
 'makki-roti':['maize flour:320:g',280,'Use fine maize flour, not white cornflour starch. Add warm water gradually and knead into a soft dough.','Pat each ball between parchment into a 14 cm round; peel away the paper carefully while transferring to the tawa.'],
 'methi-thepla':['whole wheat flour:260:g|gram flour:60:g|fenugreek leaves:120:g|curd:100:g|turmeric powder:1:g|cumin:3:g',130,'Wash, dry and finely chop fenugreek. Mix with the flours, curd, turmeric and cumin; add water gradually and knead to a soft dough.','Rest covered for 15 minutes, divide into 12 balls and roll thinly on a lightly floured surface.']
};
for(const [id,[ingredients,water,prep,shape]] of Object.entries(breads))add(id,ingredients+`|water:${water}:ml|salt:4:g|oil:25:ml`,[
 'Measure the ingredients, reserving a little flour from the listed amount for dusting where needed. Mix the salt into the flour.',prep,
 'Divide the dough into 8 portions, or 12 for thepla. Keep unused dough covered with a damp cloth to prevent cracking.',shape,
 'Cook on a medium-hot tawa for 1–2 minutes until the first side sets. Turn, brush lightly with oil, and cook the other side for 1–2 minutes. Turn again until brown spots form and there are no wet dough patches.',
 'Keep cooked breads wrapped in a clean cloth while finishing the batch. Serve warm; oil and water needs vary slightly with flour freshness.'
],40);
const stuffed={
 'stuffed-paratha':['boiled potato:500:g|cumin:3:g|dried mango powder:4:g|coriander:15:g','Mash the peeled cooked potatoes completely. Mix with cumin, dried mango powder, chopped coriander and half the salt; let the filling cool.'],
 'sattu-paratha':['roasted gram flour:220:g|onion:80:g|lemon juice:25:ml|cumin:3:g|coriander:15:g','Mix roasted gram flour with finely chopped onion, lemon juice, cumin, coriander, half the salt and 20 ml of the oil. Sprinkle in a little water so the filling holds together when squeezed but is not wet.'],
 'dal-paratha':['cooked chana dal:400:g|cumin:3:g|coriander:15:g','Drain the cooked chana dal thoroughly and mash. Cook in a dry non-stick pan for 3–4 minutes if wet, then cool and mix with cumin, coriander and half the salt.']
};
for(const [id,[ingredients,prep]] of Object.entries(stuffed))add(id,ingredients+'|whole wheat flour:360:g|water:240:ml|oil:45:ml|salt:5:g',[
 'Mix whole wheat flour with half the salt and 10 ml oil. Add most of the water gradually and knead to a soft dough; cover and rest for 20 minutes.',prep,
 'Divide dough and filling into 8 equal portions. Roll one dough ball to 10 cm, put filling in the middle, gather the edges and pinch tightly closed.',
 'Flatten gently and roll seam-side down to about 16 cm, using light pressure so the filling stays inside.',
 'Cook on a medium-hot tawa for 1 minute per side to set, then brush with the remaining oil and cook for another 1–2 minutes per side until browned and fully cooked.',
 'Repeat with the remaining portions. Serve hot, cutting one open to check that there is no raw dough around the filling.'
],55);
add('lachha-paratha','whole wheat flour:360:g|water:230:ml|oil:55:ml|salt:4:g',[
 'Mix flour and salt, reserving a little flour for dusting. Add 15 ml oil and water gradually; knead to a smooth soft dough.',
 'Cover and rest for 25 minutes, then divide into 8 equal balls.',
 'Roll a ball thinly, brush with a little oil and dust lightly with flour. Fold back and forth into narrow pleats like a paper fan.',
 'Coil the pleated strip into a spiral, tuck the end underneath and rest for 5 minutes. Roll gently to 15 cm without pressing out all the layers.',
 'Cook on a medium-hot tawa, turning and brushing with the remaining oil, for 4–5 minutes total until golden and cooked through.',
 'Press the cooked paratha gently between your palms using a cloth to separate the layers. Serve warm.'
],55);
add('eggless-naan','plain flour:360:g|curd:120:g|milk:130:ml|baking powder:6:g|sugar:8:g|salt:5:g|oil:20:ml|butter:20:g',[
 'Mix flour, baking powder, sugar and salt. Stir in curd, oil and most of the milk, adding the rest as needed for a soft slightly tacky dough.',
 'Knead for 5 minutes, cover and rest for 45 minutes. This quick naan uses baking powder and does not need yeast.',
 'Divide into 8 balls and roll each into an oval about 4 mm thick, using minimal extra flour.',
 'Heat a heavy skillet over medium-high heat. Cook one naan for 1–2 minutes until bubbles rise and the underside has brown spots.',
 'Turn and cook for 1–2 minutes more; lower heat if the outside browns before the centre cooks. Repeat with the remaining dough.',
 'Brush with melted butter and keep covered in a clean cloth until serving.'
],75);
const upmas={
 'vegetable-upma':['semolina:260:g|carrot:100:g|peas:100:g|onion:100:g',850,'Dry-roast semolina over medium-low heat for 5 minutes, stirring until aromatic but not brown; transfer to a bowl.','Add the semolina gradually in a steady stream while stirring continuously to prevent lumps. Cover and cook on low heat for 5–7 minutes.'],
 'vegetable-sevai-upma':['wheat vermicelli:280:g|carrot:120:g|peas:100:g|onion:100:g',650,'If the vermicelli is not pre-roasted, toast it in a dry pan for 3–4 minutes until light golden. Break into manageable lengths.','Add vermicelli, stir once and cover on low heat for 6–8 minutes or until tender and the water is absorbed; follow packet water guidance if it differs.'],
 'bread-upma':['eggless bread:400:g|tomato:180:g|onion:100:g',100,'Cut bread into 2 cm cubes. Slightly dry bread holds its shape better; discard any bread with mould.','Add bread cubes and toss gently for 3–4 minutes so the tomato seasoning coats them without turning them into paste.'],
 'idli-upma':['cooked idli:600:g|onion:100:g|carrot:100:g',80,'Crumble chilled, safely refrigerated idlis by hand into small uneven pieces. Grate the carrot.','Add the crumbled idli, sprinkle with measured water and stir for 4–5 minutes until heated through.'],
 'poha':['thick poha:300:g|onion:120:g|potato:200:g|peanuts:50:g',120,'Rinse thick poha gently in a sieve, drain and rest for 10 minutes. It should soften without turning mushy. Peel and cut potato into small cubes.','Add softened poha and toss gently. Cover over low heat for 3–4 minutes until hot, adding only a sprinkle of water if it seems dry.']
};
for(const [id,[ingredients,water,prep,finish]] of Object.entries(upmas))add(id,ingredients+`|oil:25:ml|mustard seeds:3:g|curry leaves:5:g|turmeric powder:1:g|salt:5:g|lemon juice:20:ml|water:${water}:ml`,[
 prep,'Prepare the vegetables: finely chop onion and tomato if listed; dice or grate carrot and potato into small pieces for even cooking.',
 'Heat oil in a deep pan. Let mustard seeds pop, add curry leaves carefully, and toast any listed peanuts until golden. Add onion and cook for 4 minutes.',
 'Add turmeric and the remaining listed vegetables. Cook for 5–8 minutes, covering briefly with a splash of the measured water if needed, until potato or carrot is tender.',
 ['vegetable-upma','vegetable-sevai-upma'].includes(id)?'Add measured water and salt and bring to a rolling boil.':`Add salt and ${id==='bread-upma'?'the measured water; let the tomato base simmer for 2 minutes':'a small sprinkle of water if the vegetables look dry'}.`,
 finish,'Turn off the heat, add lemon juice and rest for 2 minutes before serving. Keep the texture soft but not wet.'
],30);
add('sabudana-khichdi','sabudana:280:g|potato:250:g|roasted peanuts:90:g|ghee:25:g|cumin:3:g|salt:5:g|lemon juice:20:ml|coriander:15:g|water:300:ml',[
 'Rinse sabudana until the water is clearer. Add just enough of the measured water to reach its surface and soak 4–6 hours or overnight, depending on pearl size.',
 'Check a pearl: it must crush easily with no hard centre. Drain any excess water thoroughly; wet pearls turn sticky.',
 'Crush roasted peanuts coarsely and mix with the drained pearls and salt. Peel and dice potato into small cubes.',
 'Heat ghee, sizzle cumin and cook potato over medium-low heat for 10–12 minutes, covering briefly, until completely tender.',
 'Add the sabudana mixture and fold gently over low-medium heat for 5–7 minutes until the pearls look translucent. Do not keep stirring or overcook.',
 'Turn off the heat and finish with lemon juice and coriander. Serve immediately; soaking time is additional.'
],30);
