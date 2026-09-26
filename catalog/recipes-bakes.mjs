export const bakeRecipes={};
const add=(id,ingredients,steps,time=60,tip='Preheat fully, use the stated tin size and begin checking at the earlier time because ovens vary.')=>bakeRecipes[id]={ingredients,steps,time,tip};
const cakes={
 'eggless-vanilla-cake':['plain flour:220:g|sugar:140:g|milk:220:ml|oil:70:ml|lemon juice:15:ml|vanilla extract:8:ml|baking powder:7:g|baking soda:1:g|salt:1:g',180,'20 cm round','30–35','Whisk milk with lemon juice and rest for 5 minutes, then whisk in sugar, oil and vanilla.'],
 'eggless-chocolate-cake':['plain flour:190:g|cocoa powder:35:g|sugar:170:g|water:240:ml|oil:80:ml|vinegar:15:ml|vanilla extract:5:ml|baking soda:5:g|salt:2:g',175,'20 cm round','30–35','Whisk water, oil, vinegar and vanilla together. Mix sugar with the dry ingredients.'],
 'eggless-banana-bread':['plain flour:230:g|ripe banana flesh:320:g|sugar:110:g|oil:70:ml|milk:60:ml|lemon juice:10:ml|baking powder:6:g|baking soda:2:g|cinnamon powder:2:g|salt:2:g',175,'22 × 12 cm loaf','50–60','Mash banana thoroughly, then whisk with sugar, oil, milk and lemon juice until combined.'],
 'eggless-brownie':['plain flour:130:g|cocoa powder:25:g|dark chocolate:150:g|butter:90:g|sugar:160:g|curd:130:g|milk:50:ml|vanilla extract:5:ml|baking powder:2:g|salt:2:g',170,'20 cm square','25–30','Melt butter and chocolate together gently and cool until warm. Whisk in sugar, room-temperature curd, milk and vanilla.']
};
for(const [id,[ingredients,temp,tin,mins,wet]] of Object.entries(cakes))add(id,ingredients,[
 `Preheat the oven to ${temp}°C conventional heat. Grease and line a ${tin} tin with baking parchment.`,
 'Sift flour, any cocoa or cinnamon, raising agents and salt together. Measure carefully; do not substitute baking soda and baking powder one-for-one.',wet,
 'Add the dry mixture to the wet ingredients and fold gently until no dry flour remains. Avoid vigorous beating once flour is added.',
 `Transfer immediately to the prepared tin and level. Bake for ${mins} minutes, checking the centre with a skewer. ${id==='eggless-brownie'?'Moist crumbs are correct, but there should be no liquid batter.':'The skewer should come out clean and the centre should spring back lightly.'}`,
 'Cool in the tin for 15 minutes, then lift or turn out onto a rack. Cool fully before slicing; this makes four generous or eight smaller dessert portions.'
],id==='eggless-banana-bread'?80:55);
add('eggless-oat-cookies','rolled oats:160:g|plain flour:100:g|butter:100:g|brown sugar:100:g|milk:35:ml|vanilla extract:5:ml|baking powder:4:g|salt:1:g',[
 'Preheat the oven to 175°C conventional heat and line two baking trays.',
 'Beat softened butter and sugar together for 2 minutes until creamy, then mix in milk and vanilla.',
 'Mix oats, flour, baking powder and salt in another bowl. Fold into the butter mixture to form a soft dough.',
 'Divide into 16 balls and space well apart on the trays. Flatten each to about 1 cm thick.',
 'Bake for 12–15 minutes until the edges are golden and the centres look set. Rotate the trays if the oven browns unevenly.',
 'Leave on trays for 10 minutes to firm up, then cool on a rack. Serve four small cookies per portion.'
],35);
for(const id of ['margherita-pizza','mini-pizza'])add(id,'plain flour:360:g|instant yeast:5:g|water:230:ml|olive oil:25:ml|sugar:5:g|salt:6:g|tomato:450:g|garlic:10:g|dried oregano:2:g|vegetarian mozzarella:250:g|basil:20:g',[
 'Mix flour, instant yeast, sugar and 4 g salt. Add lukewarm water and 15 ml oil, knead for 8 minutes and cover for 60–90 minutes until doubled.',
 'Meanwhile heat remaining oil, soften minced garlic for 30 seconds, add chopped tomato, oregano and remaining salt, and simmer for 20 minutes until thick. Cool the sauce.',
 'Preheat the oven and a heavy baking tray to 240°C for at least 20 minutes. Use mozzarella labelled suitable for vegetarians.',
 id==='mini-pizza'?'Divide dough into eight balls and stretch each into a 10–12 cm round. Place on lightly floured baking parchment.':'Divide dough into two balls and stretch each into a thin 26 cm round with a slightly thicker rim.',
 'Spread a thin layer of sauce over the dough, leaving the edge clear, and scatter torn mozzarella evenly without overloading.',
 `Transfer carefully to the hot tray and bake for ${id==='mini-pizza'?'8–12':'10–14'} minutes until the crust is browned underneath and cheese bubbles. Finish with basil and serve hot.`
],50,'Allow 60–90 minutes dough rising in addition to preparation and baking.');
add('vegetable-frittata-with-chickpea-flour','gram flour:220:g|water:420:ml|spinach:150:g|capsicum:180:g|zucchini:200:g|onion:100:g|olive oil:30:ml|baking powder:5:g|turmeric powder:1:g|salt:5:g|black pepper:1:g',[
 'Preheat oven to 190°C and grease a 22 cm shallow baking dish. Dice onion, capsicum and zucchini and chop washed spinach.',
 'Heat 20 ml oil and soften onion, capsicum and zucchini for 7–8 minutes. Add spinach for 2 minutes, then cook off excess liquid.',
 'Whisk gram flour, water, remaining oil, turmeric, salt and pepper until smooth. Rest for 10 minutes so the flour hydrates.',
 'Whisk in baking powder, fold in the cooked vegetables and pour into the dish in an even layer.',
 'Bake for 30–35 minutes until the centre is firm and a skewer comes out without wet batter. Cover loosely if the top browns early.',
 'Rest for 10 minutes before cutting into wedges. This chickpea-flour version contains no eggs.'
],60);
add('stuffed-capsicum','capsicum:800:g|cooked rice:400:g|cooked chickpeas:300:g|tomato:300:g|onion:120:g|garlic:10:g|olive oil:30:ml|vegetarian cheese:100:g|cumin powder:3:g|salt:5:g|black pepper:1:g|water:100:ml',[
 'Preheat oven to 190°C. Halve four large capsicums lengthwise, remove cores and seeds and place cut-side up in a baking dish.',
 'Heat oil and soften chopped onion for 6 minutes. Add minced garlic and cumin for 30 seconds, then chopped tomatoes for 7–8 minutes.',
 'Fold in cooked rice, drained cooked chickpeas, salt and pepper and heat through for 3 minutes.',
 'Fill capsicum halves with the rice mixture and top with grated vegetarian cheese. Pour the measured water around, not over, the peppers.',
 'Cover the dish with foil and bake for 25 minutes. Uncover and bake another 10–15 minutes until the peppers are tender and cheese is golden.',
 'Rest for 5 minutes and serve two halves per portion.'
],65);
add('gigantes-plaki','cooked butter beans:850:g|tomato:600:g|onion:180:g|carrot:150:g|celery:100:g|garlic:15:g|olive oil:60:ml|water:200:ml|dried oregano:3:g|parsley:25:g|salt:5:g|black pepper:1:g',[
 'Preheat oven to 180°C. Drain fully cooked butter beans; if starting with dried beans, soak and cook separately until tender before measuring.',
 'Dice onion, carrot and celery. Heat half the oil and soften for 8–10 minutes, then add minced garlic and oregano for 1 minute.',
 'Add chopped tomatoes, water, salt and pepper and simmer for 12 minutes until slightly thickened.',
 'Fold beans into the sauce and transfer to a baking dish. Drizzle remaining olive oil over the surface.',
 'Bake uncovered for 35–45 minutes until the sauce thickens around the beans, stirring once gently if the edges dry out.',
 'Rest for 10 minutes, scatter parsley and serve warm.'
],75);
add('imam-bayildi','brinjal:1000:g|onion:350:g|tomato:500:g|garlic:25:g|olive oil:70:ml|parsley:25:g|sugar:8:g|salt:6:g|black pepper:1:g|water:180:ml',[
 'Preheat oven to 200°C. Halve four small-medium brinjals lengthwise and score the flesh without cutting through the skin.',
 'Brush with 30 ml oil and half the salt. Roast cut-side up for 25 minutes until softened, then press the centres gently to form hollows.',
 'Meanwhile heat remaining oil, soften thinly sliced onions for 15 minutes, add sliced garlic for 1 minute, then chopped tomatoes, sugar, remaining salt and pepper.',
 'Simmer filling for 10 minutes until thick and fold in half the chopped parsley.',
 'Fill brinjal halves, pour measured water around them, cover the dish and bake for 25 minutes until completely tender.',
 'Uncover for a final 10 minutes if watery. Rest until warm and finish with remaining parsley.'
],85);
add('vegetarian-enchiladas','corn tortillas:320:g|cooked black beans:600:g|sweet corn:200:g|capsicum:200:g|onion:120:g|tomato:650:g|garlic:15:g|oil:30:ml|cumin powder:5:g|paprika:5:g|vegetarian cheese:180:g|water:150:ml|salt:6:g',[
 'Preheat oven to 190°C. For sauce, heat half the oil, cook minced garlic for 30 seconds, add chopped tomatoes, water, half the cumin, paprika and salt, and simmer for 15 minutes. Blend smooth if desired.',
 'Heat remaining oil and soften diced onion and capsicum for 6 minutes. Add drained beans, corn and the remaining seasonings and cook for 5 minutes.',
 'Warm tortillas briefly in a dry skillet so they bend without cracking. Spread a thin layer of sauce in a baking dish.',
 'Divide bean filling among tortillas, roll and arrange seam-side down in the dish.',
 'Cover with remaining sauce and grated vegetarian cheese. Bake for 20–25 minutes until hot throughout and bubbling at the edges.',
 'Rest for 5 minutes before lifting out portions with a wide spatula.'
],55);
add('vegetarian-lasagna','eggless lasagna sheets:250:g|tomato:800:g|onion:150:g|garlic:15:g|mushroom:300:g|spinach:250:g|olive oil:30:ml|milk:700:ml|butter:50:g|plain flour:50:g|vegetarian mozzarella:220:g|dried oregano:3:g|salt:8:g|black pepper:2:g',[
 'Preheat oven to 190°C. Cook or soak lasagna sheets only if their packet requires it. Slice mushrooms and chop washed spinach, onion and garlic.',
 'Heat oil and soften onion for 6 minutes. Add garlic and mushrooms and cook for 8 minutes until excess moisture evaporates. Add tomato, oregano, half the salt and pepper and simmer for 20 minutes; wilt spinach into the sauce.',
 'For white sauce, melt butter, stir in flour and cook for 2 minutes. Gradually whisk in milk and simmer for 5 minutes until smooth and thick; add remaining salt and pepper.',
 'Spread a little vegetable sauce in a 20 × 28 cm baking dish. Layer sheets, vegetable sauce, white sauce and cheese; repeat, finishing with white sauce and cheese.',
 'Cover with foil and bake for 30 minutes, then uncover for 15 minutes until bubbling and golden. A knife should pass easily through the pasta.',
 'Rest for 15 minutes before slicing into four generous portions.'
],90);
add('vegetarian-shepherd-s-pie','cooked brown lentils:700:g|potato:900:g|carrot:200:g|peas:200:g|onion:150:g|tomato paste:50:g|garlic:12:g|olive oil:25:ml|butter:40:g|milk:150:ml|water:300:ml|plain flour:20:g|dried thyme:2:g|salt:8:g|black pepper:2:g',[
 'Peel and cube potatoes, boil for 18–20 minutes until very tender and drain. Mash with butter, warm milk and half the salt and pepper.',
 'Preheat oven to 200°C. Heat oil and soften chopped onion and diced carrot for 8 minutes. Add garlic and thyme for 1 minute.',
 'Stir in tomato paste and flour for 1 minute, gradually add water and simmer for 5 minutes.',
 'Add cooked lentils, peas and remaining seasoning. Simmer for 8 minutes until thick, then spread in a baking dish.',
 'Spoon mashed potato over the filling, spread to the edges and roughen with a fork.',
 'Bake for 25–30 minutes until the top is golden and filling bubbles at the edges. Rest for 10 minutes before serving.'
],70);
