import {curryRecipes} from './recipes-curries.mjs';
export const finalRecipes={};
const add=(id,ingredients,steps,time=35,tip='Measure and prepare all components before cooking, then taste and adjust seasoning before serving.')=>finalRecipes[id]={ingredients,steps,time,tip};
add('aam-panna','raw green mango:600:g|water:1100:ml|jaggery:130:g|roasted cumin powder:5:g|black salt:4:g|mint:25:g',[
 'Wash green mangoes and simmer whole in enough water to cover for 20–25 minutes until soft; this cooking water is separate from the measured drinking water.',
 'Cool until safe to handle, peel and scrape the pulp away from the stones. Discard skin and stones.',
 'Dissolve jaggery in 200 ml warm measured water and strain if gritty.',
 'Blend mango pulp with jaggery water, mint, cumin and black salt until smooth.',
 'Stir in the remaining chilled drinking water. Taste and adjust sweetness or dilution because raw mango acidity varies.',
 'Refrigerate until cold and serve in four glasses, stirring before pouring.'
],35,'Cooling and chilling time are additional.');
add('pineapple-mint-cooler','pineapple flesh:650:g|mint:20:g|lime juice:35:ml|sugar:60:g|water:600:ml|ice:200:g',[
 'Peel pineapple, remove the eyes and hard core and weigh the edible flesh. Wash mint and remove tough stems.',
 'Dissolve sugar in 100 ml warm measured water, then cool completely.',
 'Blend pineapple with mint, lime juice, cooled syrup and remaining water until smooth.',
 'Strain through a coarse sieve if you prefer a lighter drink; leave some pulp for a fuller texture.',
 'Taste and adjust lime or sweetness to the ripeness of the pineapple.',
 'Divide ice among four glasses, pour in the cooler and serve immediately.'
],15);
add('eggless-banana-pancakes','plain flour:220:g|ripe banana flesh:220:g|milk:300:ml|baking powder:8:g|sugar:25:g|oil:30:ml|vanilla extract:5:ml|salt:2:g',[
 'Mash banana until smooth and whisk with milk, vanilla and 15 ml oil.',
 'Mix flour, baking powder, sugar and salt in another bowl.',
 'Fold wet and dry ingredients together just until no dry flour remains; a few small lumps are fine. Rest for 5 minutes.',
 'Heat a non-stick skillet over medium-low heat and brush lightly with remaining oil. Pour small ladlefuls into 10 cm rounds.',
 'Cook for 2–3 minutes until bubbles appear and the edges set, then flip and cook for another 1–2 minutes until the centre is cooked.',
 'Repeat to make about 12 small pancakes. Serve warm; toppings are optional and separate from these quantities.'
],30);
add('eggless-waffles','plain flour:250:g|cornflour starch:30:g|milk:350:ml|oil:60:ml|sugar:45:g|baking powder:10:g|vanilla extract:5:ml|salt:3:g',[
 'Preheat a waffle iron following its instructions and grease lightly if required.',
 'Whisk flour, starch, sugar, baking powder and salt together.',
 'Whisk milk, oil and vanilla separately, then fold into the dry mixture until just combined. Rest for 5 minutes.',
 'Pour the amount of batter recommended for the waffle iron into its centre, leaving room for expansion, and close gently.',
 'Cook for 4–6 minutes or until the iron signals and the waffle is golden and releases easily. Avoid opening too early, which can tear it.',
 'Keep cooked waffles on a rack in a 100°C oven while finishing the batch so they stay crisp. Serve immediately.'
],30);
add('vegetable-suji-toast','eggless bread:400:g|semolina:180:g|curd:200:g|water:80:ml|carrot:100:g|capsicum:100:g|onion:80:g|coriander:15:g|salt:5:g|oil:40:ml',[
 'Mix semolina, curd and water and rest for 15 minutes until the grains hydrate.',
 'Grate carrot and finely chop capsicum, onion and coriander. Fold into the semolina mixture with salt; it should be thick and spreadable.',
 'Spread a thin even layer over one side of each bread slice, keeping the topping no more than about 4 mm thick.',
 'Heat a little oil in a non-stick pan over medium-low heat. Place bread topping-side down and cook for 3–4 minutes until golden and set.',
 'Turn and toast the bread side for 1–2 minutes, adding a little oil if needed. Check that the semolina layer is cooked through.',
 'Cut into triangles and serve hot. Repeat in batches without crowding the pan.'
],30);
add('vegetable-quesadilla','eggless flour tortillas:320:g|capsicum:250:g|onion:120:g|sweet corn:150:g|cooked black beans:250:g|vegetarian cheese:220:g|oil:25:ml|cumin powder:3:g|paprika:3:g|salt:4:g',[
 'Dice capsicum and onion finely and drain cooked black beans and corn.',
 'Heat half the oil and soften onion and capsicum for 6 minutes. Add beans, corn, cumin, paprika and salt and cook for 3 minutes until excess moisture evaporates.',
 'Place a tortilla on a board, scatter some grated vegetarian cheese over one half, add a thin layer of filling and more cheese, then fold over.',
 'Heat a heavy skillet over medium heat and brush lightly with remaining oil.',
 'Cook each filled tortilla for 2–3 minutes per side until golden and cheese is melted, pressing gently with a spatula.',
 'Rest for 1 minute, cut into wedges and serve hot.'
],30);
add('sabzi-wrap','eggless flour tortillas:320:g|cooked mixed vegetable sabzi:700:g|curd:150:g|cumin powder:2:g|mint:15:g|cucumber:200:g|oil:15:ml|salt:2:g',[
 'Use cooked vegetarian sabzi with known ingredients that was cooled promptly and refrigerated. Chop large pieces smaller and remove any whole spice sticks.',
 'Reheat sabzi in a pan until steaming hot throughout; cook off excess gravy so the filling does not soak the wrap.',
 'Whisk curd with cumin, chopped mint and salt. Cut cucumber into thin sticks and pat dry.',
 'Warm tortillas in a dry pan for 20 seconds per side until flexible.',
 'Spread a little mint curd on each, add hot sabzi and cucumber, fold the sides inward and roll tightly.',
 'Brush with oil and toast seam-side down for 1–2 minutes, then turn briefly. Serve immediately.'
],20,'This leftover recipe depends on already-cooked sabzi; its dietary suitability depends on all ingredients in that sabzi.');
add('khakhra-with-curd','whole wheat flour:220:g|oil:25:ml|water:120:ml|cumin:3:g|salt:4:g|curd:600:g|roasted cumin powder:2:g',[
 'Mix flour, cumin and 3 g salt. Rub in 15 ml oil and add water gradually to form a firm smooth dough; cover for 20 minutes.',
 'Divide into 12 balls and roll each as thinly as possible using minimal flour for dusting.',
 'Cook each on a medium-hot tawa for 20–30 seconds per side until just set, then lower the heat.',
 'Brush lightly with remaining oil and press with a clean folded cloth or khakhra press, turning repeatedly for 2–3 minutes until uniformly crisp and golden.',
 'Cool completely on a rack; trapped steam makes khakhra soft. Whisk curd with remaining salt and roasted cumin.',
 'Serve three khakhra per portion with a bowl of curd alongside. Store any extra khakhra airtight once cold.'
],55);
add('dabeli','eggless pav:400:g|boiled potato:600:g|dabeli masala:18:g|oil:25:ml|butter:30:g|tamarind chutney:100:g|garlic chutney:60:g|roasted peanuts:80:g|pomegranate arils:120:g|onion:100:g|sev:100:g|coriander:20:g|salt:4:g|water:100:ml',[
 'Mash peeled boiled potatoes and finely chop onion and coriander.',
 'Heat oil, stir dabeli masala for 20 seconds, then add potato, water, salt and half the tamarind chutney. Cook for 4–5 minutes until soft and spreadable.',
 'Spread potato filling in a shallow dish and scatter half the peanuts, pomegranate and coriander over it.',
 'Split pav and spread the insides with garlic chutney and remaining tamarind chutney.',
 'Fill with potato mixture, onion and remaining peanuts and pomegranate. Toast the filled buns on a tawa with butter for 1–2 minutes per side.',
 'Press the open edges into sev and serve immediately. Check spice mixes and chutneys for allergens and exclusions.'
],30);
add('vegetarian-sushi-rolls','sushi rice:300:g|water:390:ml|rice vinegar:50:ml|sugar:25:g|salt:5:g|nori sheets:12:g|cucumber:250:g|carrot:180:g|avocado flesh:250:g|soy sauce:40:ml',[
 'Rinse sushi rice several times, drain for 10 minutes and cook with measured water according to the rice packet, usually covered on low heat for 12–15 minutes followed by 10 minutes resting.',
 'Dissolve sugar and salt in rice vinegar. Fold into hot rice with a slicing motion and spread in a shallow bowl to cool to room temperature; do not mash.',
 'Cut cucumber, carrot and avocado into thin long strips. Steam carrot for 2–3 minutes if you prefer it softer, then cool and dry.',
 'Place a nori sheet shiny-side down on a bamboo mat. With damp hands spread a thin layer of rice over it, leaving 2 cm bare at the far edge.',
 'Lay vegetable strips across the near third. Roll firmly with the mat, tucking the filling in, and seal the bare nori edge with a little water.',
 'Repeat for four rolls. Slice each into six pieces using a sharp damp knife and serve promptly with soy sauce; use only the listed vegetarian fillings and eggless condiments.'
],50);
add('dal-pakwan','chana dal:260:g|tomato:200:g|onion:120:g|cumin:4:g|turmeric powder:1:g|red chilli powder:2:g|dried mango powder:4:g|salt:7:g|oil:70:ml|water:1300:ml|plain flour:250:g|semolina:40:g|oil for frying:600:ml|coriander:20:g',[
 'Rinse chana dal and soak for 1 hour. Drain and simmer with 1000 ml fresh water, turmeric and 4 g salt for 45–55 minutes until tender but still mostly whole.',
 'Mix flour, semolina, 40 ml oil, remaining salt and about 130 ml water into a firm dough. Cover and rest for 20 minutes.',
 'Heat remaining 30 ml oil, sizzle cumin, soften chopped onion for 6 minutes and add chopped tomato for 7 minutes. Add chilli and dried mango powder, then stir this masala into the cooked dal and simmer for 5 minutes.',
 'Divide dough into eight balls, roll into thin rounds and prick all over with a fork to stop them puffing.',
 'Fry pakwan in oil at 165–170°C for 2–3 minutes per side until crisp and golden, then drain.',
 'Adjust dal with remaining measured water if too thick, finish with coriander and serve with crisp pakwan alongside.'
],85,'Allow 1 hour soaking separately; keep the pakwan dry until serving.');
add('fafda-with-kadhi','gram flour:300:g|ajwain:3:g|baking soda:1:g|salt:6:g|oil:35:ml|water:500:ml|curd:200:g|sugar:20:g|mustard seeds:3:g|curry leaves:5:g|turmeric powder:1:g|oil for frying:650:ml',[
 'For fafda, mix 250 g gram flour, ajwain, baking soda, 4 g salt and 25 ml oil. Add about 100 ml water gradually and knead a smooth firm dough; rest covered for 15 minutes.',
 'For kadhi, whisk remaining gram flour, curd, sugar, turmeric, remaining salt and 400 ml water until smooth.',
 'Heat remaining 10 ml oil, pop mustard seeds and add curry leaves. Stir in the curd mixture and simmer for 15–20 minutes, stirring until the flour is cooked and the sauce is pourable.',
 'Divide fafda dough into small logs. Press each lengthwise with the heel of your palm on a lightly oiled board into a thin strip and lift with a flat scraper.',
 'Fry strips in oil at 170°C in small batches for 1–2 minutes until crisp but still pale golden. Drain carefully without breaking.',
 'Serve fafda with warm kadhi. Keep the strips and sauce separate until eating.'
],55);
add('kadhi-pakora',curryRecipes['rajasthani-kadhi'].ingredients+'|gram flour:150:g|onion:150:g|coriander:20:g|water:100:ml|salt:3:g|oil for frying:600:ml',[
 ...curryRecipes['rajasthani-kadhi'].steps.slice(0,4),
 'For pakora, thinly slice the extra onion and mix with the extra gram flour, coriander and salt. Add the extra water gradually to form a thick coating batter.',
 'Heat frying oil to 170°C and drop small spoonfuls carefully. Fry for 4–5 minutes until golden and cooked through, then drain.',
 ...curryRecipes['rajasthani-kadhi'].steps.slice(4),
 'Add pakoras to the finished kadhi and simmer for 3–4 minutes to soften slightly. Serve hot; add them later if you prefer a firmer texture.'
],65);
add('raj-kachori','semolina:160:g|plain flour:60:g|gram flour:40:g|oil:25:ml|water:140:ml|salt:4:g|oil for frying:650:ml|boiled potato:250:g|cooked moong:250:g|curd:450:g|tamarind chutney:120:g|mint coriander chutney:80:g|sev:100:g|pomegranate arils:100:g|chaat masala:5:g|coriander:20:g',[
 'Mix semolina, flours and salt, rub in 25 ml oil and add water gradually to make a firm smooth dough. Cover and rest for 25 minutes.',
 'Divide into 8 balls and roll each into an even 11–12 cm round without making the centre too thin.',
 'Heat oil to 175–180°C. Slide in a round and press gently with a slotted spoon to help it puff, then turn and fry for 2–3 minutes until crisp and golden. Drain and cool completely.',
 'Dice boiled potato, drain fully cooked moong and whisk curd until smooth. Set out chutneys and toppings.',
 'Crack a hole in the top of each cooled shell. Fill with potato, moong and curd, then drizzle both chutneys.',
 'Finish with sev, pomegranate, chaat masala and coriander. Serve immediately, two small filled kachori per portion.'
],65);
