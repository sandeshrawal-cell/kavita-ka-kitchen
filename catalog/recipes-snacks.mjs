export const snackRecipes={};
const add=(id,ingredients,steps,time=40,tip='Cook one test piece first to check seasoning, binding and cooking temperature before finishing the batch.')=>snackRecipes[id]={ingredients,steps,time,tip};
const patties={
 'veg-cutlet':['boiled potato:500:g|carrot:150:g|peas:150:g|eggless breadcrumbs:100:g','Steam diced carrot and peas for 8 minutes until tender, drain and mash coarsely with peeled boiled potato.'],
 'leftover-rice-cutlets':['cooked chilled rice:350:g|boiled potato:300:g|carrot:120:g|eggless breadcrumbs:100:g','Use rice cooled promptly and refrigerated after cooking. Mash with peeled boiled potato and finely grated carrot.'],
 'hara-bhara-kebab':['boiled potato:350:g|spinach:300:g|peas:250:g|roasted gram flour:70:g','Steam peas until tender. Blanch washed spinach for 1 minute, cool, squeeze very dry and chop finely. Mash both with peeled boiled potato and roasted gram flour.']
};
for(const [id,[base,prep]] of Object.entries(patties))add(id,base+'|cumin powder:4:g|garam masala:2:g|lemon juice:20:ml|coriander:20:g|salt:5:g|oil:45:ml',[
 prep,'Add cumin, garam masala, lemon juice, coriander and salt. For breadcrumb recipes, mix in half the crumbs and reserve the rest for coating.',
 'Mix into a firm dough-like filling. If very soft, chill for 20 minutes; avoid adding water.',
 'Divide into 12 equal portions and shape into patties about 1.5 cm thick. Coat breadcrumb recipes in the reserved crumbs.',
 'Heat a thin layer of oil in a wide skillet over medium heat. Pan-fry in batches for 3–4 minutes per side until crisp and heated through.',
 'Drain briefly and serve three patties per portion. Break the test piece open to check the centre is piping hot.'
],40);
const paneerTikka={ingredients:'paneer:500:g|capsicum:250:g|onion:180:g|thick curd:150:g|roasted gram flour:25:g|ginger:12:g|garlic:12:g|oil:25:ml|lemon juice:25:ml|coriander powder:5:g|cumin powder:3:g|Kashmiri chilli powder:3:g|garam masala:2:g|salt:5:g',steps:[
 'Cut paneer, capsicum and onion into similar 3 cm pieces. Mince ginger and garlic.',
 'Whisk thick curd with gram flour, oil, lemon juice, ginger, garlic, spices and salt into a thick marinade.',
 'Coat paneer and vegetables gently and refrigerate for 30 minutes. If using wooden skewers, soak them in water during this time.',
 'Preheat oven to 220°C. Thread pieces loosely onto skewers or arrange in one layer on a lined tray.',
 'Roast for 12–15 minutes, turning once, until the vegetables are tender-crisp and paneer is lightly browned. Use the grill briefly at the end only while watching closely.',
 'Rest for 2 minutes and serve hot. Avoid prolonged cooking, which makes paneer rubbery.'
]};
add('paneer-tikka',paneerTikka.ingredients,paneerTikka.steps,40,'Allow an additional 30 minutes marinating.');
add('paneer-tikka-wrap',paneerTikka.ingredients+'|eggless flour tortillas:320:g|lettuce:120:g|mint chutney:80:g',[
 ...paneerTikka.steps.slice(0,-1),'Warm tortillas in a dry pan for 20 seconds per side. Spread with mint chutney and add washed, dried lettuce.',
 'Remove cooked paneer and vegetables from the skewers, divide between tortillas and roll tightly, tucking in the ends. Serve warm.'
],45,'Allow 30 minutes marinating before cooking; check the chutney ingredients for exclusions.');
add('paneer-tikka-masala',paneerTikka.ingredients+'|tomato:500:g|onion:120:g|cashew:40:g|butter:25:g|cream:80:ml|water:300:ml',[
 ...paneerTikka.steps.slice(0,-1),'While the tikka cooks, soak cashews in hot water for 15 minutes. Melt butter and soften the extra chopped onion for 7 minutes; add chopped tomato and cook for 10 minutes until thick.',
 'Blend this tomato base with drained cashews and measured water until smooth, then return to the pan and simmer for 8 minutes.',
 'Fold the cooked paneer tikka and vegetables into the sauce, add cream and warm gently for 3 minutes. Taste and adjust salt before serving.'
],65,'Allow 30 minutes marinating separately. The ingredient list includes both tikka and gravy components.');
for(const id of ['chilli-paneer-dry','chilli-paneer-gravy'])add(id,'paneer:500:g|cornflour starch:45:g|plain flour:25:g|capsicum:250:g|onion:150:g|garlic:15:g|ginger:12:g|soy sauce:35:ml|tomato ketchup:50:g|chilli sauce:25:g|rice vinegar:20:ml|sugar:10:g|spring onion:50:g|oil:60:ml|water:'+(id.endsWith('gravy')?'450':'140')+':ml',[
 'Cube paneer and mix plain flour, 30 g starch and 60 ml water into a light batter. Toss paneer in the batter.',
 'Heat 40 ml oil in a wide non-stick pan and shallow-fry paneer for 2–3 minutes per side until lightly crisp. Transfer to a plate.',
 'Mix soy sauce, ketchup, chilli sauce, vinegar and sugar. Mix the remaining starch separately with 40 ml cold water.',
 'Heat remaining oil and stir-fry minced ginger and garlic for 30 seconds. Add capsicum and onion squares and toss for 3–4 minutes.',
 `Add the sauce mixture and remaining water, bring to a simmer, then stir in the starch slurry and cook for 2–3 minutes until ${id.endsWith('gravy')?'a glossy pourable gravy forms':'thick enough to coat the vegetables'}.`,
 'Return paneer and toss gently for 1–2 minutes. Finish with spring onion and serve immediately; taste before adding salt because the sauces already contain it.'
],35);
for(const id of ['veg-manchurian-dry','veg-manchurian-gravy'])add(id,'cabbage:350:g|carrot:180:g|capsicum:100:g|plain flour:80:g|cornflour starch:60:g|ginger:15:g|garlic:18:g|soy sauce:35:ml|tomato ketchup:40:g|chilli sauce:25:g|rice vinegar:20:ml|spring onion:80:g|salt:3:g|oil:20:ml|oil for frying:600:ml|water:'+(id.endsWith('gravy')?'500':'180')+':ml',[
 'Finely shred cabbage and carrot and mince capsicum. Mix with plain flour, 40 g starch, half the ginger and garlic, and salt; the vegetables should release enough moisture to bind. Add water only a teaspoon at a time if dry.',
 'Shape 16 small balls firmly. Heat frying oil to about 170°C in a deep pan less than half full and fry one test ball; add a little flour if it breaks.',
 'Fry the remaining balls in batches for 4–5 minutes until golden and cooked through, then drain.',
 'Heat 20 ml oil, stir-fry remaining ginger and garlic with spring onion whites for 30 seconds. Add soy sauce, ketchup, chilli sauce, vinegar and all but 60 ml measured water.',
 'Mix remaining starch with the reserved cold water. Stir into the simmering sauce and cook for 2–3 minutes until glossy and thickened.',
 'Add fried balls only at serving time and toss gently. Finish with spring onion greens; keep sauce separate if preparing ahead to preserve texture.'
],50,'Frying oil is a working quantity and is not all absorbed.');
add('masala-corn','sweet corn:700:g|butter:35:g|lemon juice:30:ml|chaat masala:5:g|cumin powder:3:g|red chilli powder:1:g|salt:2:g|coriander:15:g',[
 'Boil or steam corn kernels for 5–8 minutes until tender, then drain thoroughly.',
 'Melt butter in a wide pan over medium-low heat.',
 'Add corn and toss for 2–3 minutes until hot and lightly glossy.',
 'Turn off heat and add chaat masala, cumin, chilli and lemon juice.',
 'Taste before adding salt because chaat masala is already salted. Fold in chopped coriander.',
 'Divide into four small bowls and serve hot.'
],15);
