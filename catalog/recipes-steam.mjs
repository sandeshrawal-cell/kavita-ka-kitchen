export const steamRecipes={};
const add=(id,ingredients,steps,time=45,tip='Use a preheated steamer and check the centre for doneness before serving.')=>steamRecipes[id]={ingredients,steps,time,tip};
const sambarIngredients='toor dal:120:g|carrot:120:g|pumpkin:150:g|tomato:150:g|tamarind paste:20:g|sambar powder:12:g|mustard seeds:3:g|curry leaves:5:g|oil:15:ml|turmeric powder:1:g|salt:4:g|water:900:ml';
const sambarSteps=[
 'Rinse toor dal and simmer with 550 ml water and turmeric for 35–45 minutes until completely soft, topping up with boiling water if necessary. Mash gently.',
 'Meanwhile, dice carrot, pumpkin and tomato. Simmer with the remaining 350 ml water for 12–15 minutes until tender.',
 'Add tamarind paste and sambar powder to the vegetables and simmer for 5 minutes. Stir in cooked dal and salt and simmer for another 5–8 minutes.',
 'Heat the oil separately, let mustard seeds pop, add curry leaves carefully, then pour the tempering into the sambar. Thin with hot water if needed.'
];
add('vegetable-sambar',sambarIngredients,[...sambarSteps,'Check that lentils and vegetables are fully soft and taste for salt and sourness.','Rest covered for 5 minutes and serve hot with a separately prepared accompaniment.'],60);
const fermentedIngredients='idli rice:300:g|urad dal:100:g|fenugreek seeds:2:g|water:550:ml|salt:5:g|oil:15:ml';
const fermentedSteps=[
 'Rinse rice and urad dal separately. Soak rice in plenty of water for 5 hours; soak urad with fenugreek for the same time, then drain both.',
 'Grind urad with about 200 ml fresh measured water until light and fluffy. Grind rice separately with 250 ml water until fine but faintly grainy. Reserve the remaining water for consistency.',
 'Mix both batters in a large bowl with room to rise. Cover loosely and ferment in a warm place for 8–12 hours, or until risen and pleasantly sour; refrigerate after fermentation if not cooking immediately.',
 'Fold in salt gently. The batter should fall in thick ribbons; add reserved water a spoonful at a time only if needed.'
];
add('idli-sambar',fermentedIngredients+'|'+sambarIngredients,['For the idlis, reserve 550 ml of the listed water, 5 g salt and 15 ml oil. Keep the other 900 ml water, 4 g salt and 15 ml oil for the sambar. Water for soaking and steaming is additional.',...fermentedSteps,
 'Bring water to a boil in a steamer. Grease idli moulds with the measured oil, fill three-quarters full and steam covered for 12–15 minutes without opening early.',
 'Check that a skewer comes out clean. Rest the moulds for 3 minutes, loosen idlis with a wet spoon and repeat with remaining batter.',...sambarSteps,
 'Serve warm idlis with the hot sambar. Start soaking and fermenting the batter the day before.'
],80,'Soaking and fermentation take about 13–17 hours in addition to cooking; fermentation depends on room temperature.');
add('kanchipuram-idli',fermentedIngredients+'|ghee:20:g|cumin:4:g|black pepper:3:g|dry ginger powder:2:g|curry leaves:5:g|cashew:30:g',[
 ...fermentedSteps,'Heat ghee, toast cashews until golden and add cumin, coarsely crushed pepper and curry leaves for 20 seconds. Cool slightly and fold into the batter with dry ginger powder.',
 'Grease small heatproof bowls or idli moulds. Fill only three-quarters full and place above simmering water in a preheated steamer.',
 'Steam for 15–20 minutes for small moulds, or 25–30 minutes for deeper bowls, until a skewer inserted in the centre comes out clean.',
 'Rest for 5 minutes, loosen the edges and unmould. Serve warm; soaking and fermentation are additional.'
],55);
add('uttapam',fermentedIngredients+'|onion:120:g|tomato:150:g|carrot:100:g|coriander:15:g',[
 ...fermentedSteps,'Finely chop onion, tomato and coriander and grate carrot. Heat a lightly oiled tawa over medium heat.',
 'Pour a ladle of batter and spread gently into a thick 12 cm pancake. Scatter vegetables over the wet top and press lightly.',
 'Drizzle oil around the edge, cover for 2–3 minutes, then flip carefully and cook the vegetable side for 2 minutes until the centre is set.',
 'Repeat with remaining batter and serve hot. Lower the heat if the base browns before the thick centre cooks.'
],50);
add('vegetable-appe',fermentedIngredients+'|carrot:120:g|onion:100:g|coriander:15:g|mustard seeds:3:g|curry leaves:5:g',[
 ...fermentedSteps,'Finely chop onion and curry leaves and grate carrot. Heat half the oil, pop mustard seeds, soften onion and carrot for 3 minutes and cool.',
 'Fold the cooled vegetables and coriander into the batter. Heat an appe pan over medium-low heat and grease each cavity lightly with remaining oil.',
 'Fill cavities three-quarters full, cover and cook for 3–4 minutes until the bottoms are golden and the edges set.',
 'Turn each appe with a skewer and cook uncovered for another 3 minutes. Break one open to check that no wet batter remains; repeat and serve hot.'
],50);
add('masala-dosa',fermentedIngredients+'|potato:650:g|onion:180:g|mustard seeds:3:g|curry leaves:5:g|turmeric powder:2:g|oil:30:ml|salt:4:g',[
 'For the dosa batter and cooking, reserve 5 g salt and 15 ml oil. The remaining 4 g salt and 30 ml oil are for the potato filling. Water for soaking and boiling potatoes is additional.',...fermentedSteps,'Boil potatoes until tender, peel and roughly mash. Heat the extra 30 ml oil, pop mustard seeds, add curry leaves and sliced onion, and cook for 6 minutes.',
 'Add turmeric, potatoes and the extra salt. Sprinkle in a little water and cook for 4–5 minutes to make a soft but dry filling; keep warm.',
 'Thin the fermented batter slightly so it spreads easily. Heat a lightly oiled tawa over medium-high heat, pour a ladle in the centre and spread outwards in circles.',
 'Drizzle a little of the batter recipe oil around the edge and cook for 2–3 minutes until the underside is golden and the top has no wet batter.',
 'Place potato filling on one side, fold the dosa over it and serve immediately. Repeat, letting an overheated tawa cool slightly between dosas.'
],80);
add('rava-idli','semolina:280:g|curd:280:g|water:220:ml|carrot:100:g|cashew:30:g|oil:25:ml|mustard seeds:3:g|curry leaves:5:g|salt:5:g|plain fruit salt:5:g',[
 'Heat oil, toast cashews until golden, pop mustard seeds and add chopped curry leaves. Add semolina and roast on medium-low heat for 4–5 minutes; cool completely.',
 'Mix cooled semolina with curd, grated carrot, salt and most of the water. Rest for 20 minutes to hydrate.',
 'Bring water to a boil in a steamer and grease idli moulds. Adjust the rested batter with reserved water to a thick spoonable consistency.',
 'Just before steaming, fold fruit salt gently into the batter; do not beat out the bubbles. Fill moulds three-quarters full immediately.',
 'Steam for 12–15 minutes until a skewer comes out clean. If cooking in batches, divide batter and fruit salt proportionally and activate each batch just before steaming.',
 'Rest for 3 minutes, loosen with a wet spoon and serve warm.'
],40);
const dhoklas={
 'khaman-dhokla':['gram flour:240:g',300,'Whisk gram flour, water, curd, sugar, turmeric and salt into a smooth thick pouring batter. Rest for 15 minutes.'],
 'dhokla-bites':['gram flour:240:g',300,'Whisk gram flour with water, curd, sugar, turmeric and salt until smooth. Rest for 15 minutes; the finished khaman will be cut into small bite-size cubes.'],
 'moong-dal-dhokla':['moong dal:260:g',180,'Soak moong dal for 4 hours, drain and blend with the measured water until smooth. Mix in curd, sugar, turmeric and salt.']
};
for(const [id,[base,water,prep]] of Object.entries(dhoklas))add(id,base+`|water:${water}:ml|curd:100:g|sugar:20:g|turmeric powder:1:g|salt:5:g|plain fruit salt:6:g|oil:25:ml|mustard seeds:3:g|curry leaves:5:g|lemon juice:25:ml|coriander:15:g`,[
 prep,'Grease a 20 cm shallow steaming tin with a little oil. Bring water to a boil in a steamer; the water must remain below the tin.',
 'Fold fruit salt into the batter immediately before steaming. Transfer to the tin, filling no deeper than about 3 cm, and place in the hot steamer.',
 'Steam covered for 18–22 minutes without opening during the first 15 minutes. A skewer inserted in the centre should come out clean.',
 'Cool for 10 minutes and cut into squares. Heat remaining oil, pop mustard seeds and add curry leaves; take off the heat and carefully mix in lemon juice and 60 ml drinking water.',
 'Spoon the tempering evenly over the cut dhokla and let it absorb for 5 minutes. Finish with chopped coriander and serve.'
],45,'For moong dal dhokla allow 4 hours soaking separately. Activate fruit salt only when the steamer is ready.');
add('khandvi','gram flour:120:g|curd:120:g|water:360:ml|turmeric powder:0.5:g|salt:3:g|oil:15:ml|mustard seeds:3:g|sesame seeds:8:g|curry leaves:4:g|grated coconut:25:g|coriander:15:g',[
 'Grease the backs of two large steel trays very lightly. Whisk gram flour, curd, water, turmeric and salt until completely smooth and strain out lumps.',
 'Pour into a heavy non-stick pan and cook over medium-low heat, stirring and scraping continuously for 8–12 minutes as it thickens.',
 'Spread a teaspoon on a tray, cool for a minute and try rolling it. If it tears or stays sticky, cook the batter for another minute and test again.',
 'As soon as the test rolls cleanly, work quickly: spread the hot batter very thinly over the prepared trays with a flat spatula.',
 'Cool for 8–10 minutes, cut into 4 cm strips and roll each strip gently from one end. Arrange seam-side down.',
 'Heat oil, pop mustard seeds, add sesame and curry leaves briefly, then spoon over the rolls. Scatter coconut and coriander and serve.'
],35);
add('methi-muthiya','fenugreek leaves:250:g|whole wheat flour:180:g|gram flour:120:g|curd:100:g|oil:30:ml|water:80:ml|lemon juice:20:ml|sugar:10:g|turmeric powder:1:g|salt:5:g|mustard seeds:3:g|sesame seeds:15:g|curry leaves:5:g',[
 'Wash, dry and finely chop fenugreek leaves. Mix with flours, curd, half the oil, lemon juice, sugar, turmeric and salt.',
 'Add water little by little only as needed to make a soft dough; the leaves release moisture as you mix.',
 'With oiled hands shape four logs about 3 cm thick. Place on a greased tray in a preheated steamer.',
 'Steam for 20–25 minutes until a skewer comes out clean. Cool for 10 minutes, then slice into 1.5 cm rounds.',
 'Heat the remaining oil, pop mustard seeds and add sesame and curry leaves. Add sliced muthiya in a single layer.',
 'Toss over medium heat for 5–7 minutes until lightly golden around the edges. Serve warm.'
],50);
add('patra','edible colocasia leaves:250:g|gram flour:200:g|tamarind paste:35:g|jaggery:40:g|water:180:ml|cumin powder:3:g|turmeric powder:1:g|salt:4:g|oil:25:ml|mustard seeds:3:g|sesame seeds:15:g|curry leaves:5:g',[
 'Use edible colocasia leaves sold for cooking. Wash, pat dry and carefully shave thick veins without tearing the leaves; never taste the leaves raw.',
 'Dissolve tamarind and jaggery in water. Whisk with gram flour, cumin, turmeric and salt into a thick spreadable paste.',
 'Place a large leaf vein-side up, spread paste thinly over it and layer another leaf on top. Repeat with 3–4 leaves, fold the sides inward and roll tightly from the broad end.',
 'Make the remaining rolls and place seam-side down in a preheated steamer. Steam for 30–35 minutes until the centre is firm and fully cooked.',
 'Cool completely before slicing into 1 cm rounds so the layers hold together.',
 'Heat oil, pop mustard seeds and add sesame and curry leaves. Pan-toast the slices for 3–4 minutes per side and serve warm.'
],65);
add('sev-khamani','chana dal:250:g|water:180:ml|curd:100:g|plain fruit salt:5:g|sugar:20:g|salt:5:g|turmeric powder:1:g|oil:25:ml|mustard seeds:3:g|sesame seeds:15:g|lemon juice:25:ml|sev:100:g|pomegranate arils:100:g|coriander:20:g',[
 'Rinse chana dal and soak for 4–6 hours. Drain and grind with the measured water to a fine but slightly grainy paste.',
 'Mix with curd, turmeric, sugar and salt. Prepare a greased shallow tray and a steamer with boiling water.',
 'Fold in fruit salt, spread batter in the tray and steam for 20–25 minutes until a skewer comes out clean.',
 'Cool for 10 minutes and crumble the cooked cake into coarse pieces.',
 'Heat oil, pop mustard seeds and add sesame briefly. Toss in the crumbled cake, sprinkle with lemon juice and 60 ml water and stir for 3 minutes.',
 'Serve topped with sev, pomegranate and coriander. Add sev at the last moment to keep it crisp.'
],55,'Allow 4–6 hours soaking in addition to cooking.');
