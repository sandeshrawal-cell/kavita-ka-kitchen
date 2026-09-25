export const friedRecipes={};
const add=(id,ingredients,steps,time=50,tip='Frying oil is the working amount needed in the pan, not the quantity absorbed. Keep a deep stable pan less than half full and fry in small batches.')=>friedRecipes[id]={ingredients,steps,time,tip};
for(const id of ['puri','rajgira-puri'])add(id,(id==='puri'?'whole wheat flour:320:g|water:170:ml':'amaranth flour:280:g|boiled potato:200:g|water:40:ml')+'|oil:20:ml|salt:4:g|oil for frying:600:ml',[
 id==='puri'?'Mix wheat flour, salt and 20 ml oil. Add water gradually to make a firm smooth dough; rest covered for 15 minutes.':'Mash peeled boiled potato very smoothly. Mix with amaranth flour, salt and 20 ml oil; add only enough water to make a firm pliable dough.',
 'Divide dough into 16 small balls. Keep covered so the surface does not dry out.',
 id==='puri'?'Roll each ball with a little oil on the board into an even 10 cm round, about 2 mm thick.':'Pat or roll each ball between lightly oiled parchment sheets into a 9 cm round; lift carefully because amaranth dough is delicate.',
 'Heat frying oil to about 180°C. A tiny piece of dough should rise promptly without darkening immediately.',
 'Slide in one puri and press lightly with a slotted spoon until it puffs. Turn and fry for 20–30 seconds more until golden and cooked.',
 'Drain and repeat, allowing oil to regain heat between batches. Serve four small puris per portion.'
],35);
add('samosa','plain flour:300:g|oil:75:ml|water:150:ml|potato:600:g|peas:120:g|ginger:12:g|cumin:4:g|coriander seeds:6:g|fennel seeds:3:g|garam masala:2:g|dried mango powder:5:g|salt:7:g|oil for frying:700:ml',[
 'Rub 60 ml oil and 3 g salt into flour until a handful holds together when squeezed. Add water gradually to make a firm dough; cover and rest for 30 minutes.',
 'Boil potatoes until tender, peel and break into small pieces. Heat remaining oil, sizzle cumin, crushed coriander and fennel, then add grated ginger and peas for 3 minutes.',
 'Add potatoes, garam masala, dried mango powder and remaining salt. Stir for 4 minutes, then cool the filling completely.',
 'Divide dough into 4 balls. Roll each into an oval, cut in half and form each half into a cone, sealing the straight edge with a little water.',
 'Fill each cone without overpacking, moisten the open edge, pinch tightly closed and press the seam firmly. Make 8 samosas.',
 'Heat oil to 150–160°C and fry in batches for 12–15 minutes, turning occasionally, until the pastry is evenly golden and cooked through. Drain and serve warm.'
],85);
add('kachori','plain flour:300:g|moong dal:140:g|oil:75:ml|water:150:ml|fennel seeds:5:g|coriander seeds:6:g|cumin:3:g|asafoetida:0.5:g|dried mango powder:5:g|red chilli powder:2:g|salt:7:g|oil for frying:700:ml',[
 'Rinse moong dal and soak for 2 hours, then drain very well and grind coarsely without extra water.',
 'Rub 60 ml oil and 3 g salt into flour. Add water gradually and knead a soft dough; cover and rest for 25 minutes.',
 'Heat remaining oil, toast cumin, coarsely crushed fennel and coriander and asafoetida. Add ground dal and cook on low heat for 12–15 minutes, stirring until dry, crumbly and cooked.',
 'Mix chilli, dried mango powder and remaining salt into the filling and cool completely.',
 'Divide dough and filling into 10 portions. Flatten each dough ball, fill, gather and seal, then press gently into a 7 cm disc without tearing.',
 'Fry in oil at 150–160°C for 10–14 minutes, turning occasionally, until crisp and golden. Drain and let cool slightly before serving.'
],75,'Allow 2 hours soaking separately. Fry slowly so the inner pastry cooks before the outside browns.');
add('corn-cheese-balls','cooked sweet corn:250:g|boiled potato:350:g|vegetarian cheese:180:g|plain flour:60:g|eggless breadcrumbs:140:g|water:100:ml|black pepper:1:g|salt:4:g|oil for frying:600:ml',[
 'Drain cooked corn very well and chop it coarsely. Mash peeled boiled potato and grate cheese made with vegetarian rennet.',
 'Mix corn, potato, cheese, 40 g breadcrumbs, salt and pepper into a firm mixture. Chill for 20 minutes if soft.',
 'Whisk flour and water to a smooth coating batter. Place remaining breadcrumbs on a plate.',
 'Shape 16 small balls, dip each in batter and coat completely with breadcrumbs. Chill coated balls for 15 minutes to firm up.',
 'Heat oil to 170–175°C. Fry one test ball; if it bursts, reinforce the coating or chill longer. Fry remaining balls in small batches for 3–4 minutes until golden.',
 'Drain and rest for 2 minutes before serving; the cheese centre will be very hot.'
],50);
add('dahi-vada','urad dal:250:g|water:100:ml|ginger:10:g|cumin:3:g|salt:6:g|oil for frying:650:ml|curd:700:g|sugar:30:g|tamarind chutney:120:g|mint coriander chutney:80:g|roasted cumin powder:4:g|red chilli powder:1:g',[
 'Rinse urad dal and soak for 4 hours. Drain thoroughly and grind with ginger and measured water added a little at a time into a thick smooth batter.',
 'Beat batter by hand for 4–5 minutes until light. Mix in cumin and half the salt; a tiny dollop should float in water when sufficiently aerated.',
 'Heat frying oil to 165–170°C. Drop small spoonfuls carefully and fry for 4–5 minutes, turning until golden and cooked in the centre.',
 'Drain, cool for 2 minutes, then soak vadas in a bowl of warm drinking water for 10 minutes. Press gently between palms to remove excess water without breaking.',
 'Whisk curd with sugar and remaining salt. Arrange softened vadas in a shallow dish and cover generously with curd.',
 'Refrigerate for 30 minutes, then drizzle both chutneys and sprinkle roasted cumin and chilli. Serve chilled.'
],55,'Allow 4 hours soaking plus 30 minutes chilling separately.');
const tikkiSteps=[
 'Mash peeled boiled potatoes completely and mix with rice flour, grated ginger, cumin, coriander and salt. Shape into 12 firm patties about 1.5 cm thick.',
 'Heat oil in a wide skillet and pan-fry the patties for 4–5 minutes per side until crisp and heated through. Keep warm while preparing the toppings.'
];
const tikkiIngredients='boiled potato:650:g|rice flour:55:g|ginger:10:g|cumin powder:4:g|coriander:20:g|salt:5:g|oil:60:ml';
add('aloo-tikki-chaat',tikkiIngredients+'|curd:400:g|tamarind chutney:120:g|mint coriander chutney:80:g|sev:80:g|chaat masala:5:g',[
 ...tikkiSteps,'Whisk curd until smooth and set out both chutneys and sev separately.',
 'Arrange three hot tikkis on each plate and spoon curd over them.',
 'Drizzle tamarind and mint chutneys, sprinkle chaat masala and finish with sev.',
 'Serve immediately while the patties are crisp and warm; add toppings only at the last moment.'
],40);
add('ragda-pattice',tikkiIngredients+'|cooked white peas:700:g|water:400:ml|turmeric powder:1:g|tamarind chutney:120:g|mint coriander chutney:80:g|onion:100:g|sev:80:g',[
 'Use white peas already soaked and boiled until completely tender, or cooked canned peas. Simmer with measured water and turmeric for 12–15 minutes, mashing some peas to make a thick ragda.',
 ...tikkiSteps,'Finely chop onion and set out chutneys and sev. Taste ragda and adjust salt if needed.',
 'Spoon ragda onto four plates, add three patties each and drizzle both chutneys over the top.',
 'Finish with onion and sev and serve immediately. Keep crisp patties separate from ragda until serving.'
],45);
add('vada-pav','potato:650:g|gram flour:200:g|water:220:ml|ginger:12:g|garlic:15:g|mustard seeds:3:g|curry leaves:5:g|turmeric powder:2:g|salt:7:g|oil:20:ml|oil for frying:650:ml|eggless pav:400:g|dry garlic chutney:60:g|mint chutney:80:g',[
 'Boil potatoes until tender, peel and mash. Heat 20 ml oil, pop mustard seeds, add curry leaves and minced ginger and garlic for 30 seconds.',
 'Add potatoes, half the turmeric and 4 g salt and cook for 3 minutes. Cool and shape into 8 round balls.',
 'Whisk gram flour with water, remaining turmeric and salt into a thick smooth batter that coats a spoon.',
 'Heat oil to about 170°C. Dip potato balls in batter and fry in batches for 4–5 minutes until crisp and golden; drain.',
 'Split pav without cutting all the way through. Spread a little mint chutney and sprinkle dry garlic chutney inside each.',
 'Place a hot vada in each bun and serve two small vada pav per portion. Check purchased chutneys and pav ingredients.'
],60);
add('falafel-pita','dried chickpeas:300:g|onion:120:g|garlic:15:g|parsley:50:g|coriander:40:g|cumin powder:5:g|coriander powder:5:g|plain flour:25:g|baking powder:4:g|salt:6:g|oil for frying:700:ml|eggless pita bread:320:g|tomato:250:g|cucumber:250:g|tahini:80:g|lemon juice:40:ml|water:80:ml',[
 'Soak dried chickpeas in plenty of water for 12–18 hours, then drain and dry thoroughly. Use soaked uncooked chickpeas here; canned chickpeas make a softer mixture that can break during frying.',
 'Pulse chickpeas with onion, garlic, parsley, coriander, ground spices and salt into fine damp crumbs that hold when squeezed; do not puree smooth.',
 'Mix in flour and baking powder, cover and refrigerate for 30 minutes. Shape into 16 small balls or thick discs.',
 'Heat oil to 175°C and fry in batches for 4–5 minutes until deep golden and fully cooked inside. Drain and test one centre before finishing the batch.',
 'Whisk tahini with lemon juice and measured water to a smooth sauce. Slice tomato and cucumber and warm pita briefly.',
 'Split pita pockets and fill with falafel, vegetables and tahini sauce. Serve immediately.'
],55,'Allow 12–18 hours soaking plus 30 minutes chilling separately.');
add('vegetable-spring-roll','eggless spring roll wrappers:250:g|cabbage:400:g|carrot:200:g|capsicum:150:g|spring onion:70:g|garlic:12:g|soy sauce:25:ml|rice vinegar:15:ml|black pepper:1:g|oil:25:ml|plain flour:30:g|water:45:ml|oil for frying:650:ml',[
 'Finely shred cabbage, carrot and capsicum. Slice spring onion and mince garlic.',
 'Heat 25 ml oil in a wok, stir-fry garlic and spring onion whites for 30 seconds, then add vegetables and toss for 4–5 minutes.',
 'Add soy sauce, vinegar and pepper and cook until excess moisture evaporates. Add spring onion greens and cool the filling completely.',
 'Mix flour and water to a thick sealing paste. Place a wrapper as a diamond, put a small amount of filling near one corner, fold sides inward and roll tightly, sealing the tip with paste.',
 'Heat oil to 175°C. Fry sealed rolls in batches for 3–4 minutes until golden and crisp, turning carefully.',
 'Drain on a rack and serve hot. Keep uncooked wrappers covered to prevent drying and splitting.'
],50);
