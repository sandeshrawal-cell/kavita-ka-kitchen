export const freshRecipes={};
const add=(id,ingredients,steps,time=25,tip='Prepare components ahead, but combine wet dressings and crisp ingredients just before serving.')=>freshRecipes[id]={ingredients,steps,time,tip};
const salads={
 'chickpea-cucumber-salad':['cooked chickpeas:600:g|cucumber:300:g|tomato:250:g|onion:60:g|parsley:20:g','Rinse and drain fully cooked chickpeas. Dice cucumber and tomato and finely chop onion and parsley.','olive oil:30:ml|lemon juice:35:ml|salt:4:g|black pepper:1:g','Whisk olive oil, lemon juice, salt and pepper until combined.','Toss chickpeas, vegetables and parsley with the dressing. Rest for 10 minutes so the chickpeas absorb the seasoning.'],
 'kosambari':['moong dal:160:g|cucumber:350:g|carrot:200:g|grated coconut:60:g|coriander:15:g','Rinse moong dal and soak for 2 hours, then drain thoroughly. Dice cucumber and grate carrot. For a cooked version, simmer soaked dal for 5–8 minutes until just tender, then drain and cool.','lemon juice:30:ml|oil:15:ml|mustard seeds:3:g|curry leaves:4:g|salt:4:g','Heat oil and let mustard seeds pop, add curry leaves carefully, then cool the tempering for a minute.','Mix dal, vegetables, coconut and coriander. Add cooled tempering, lemon juice and salt immediately before serving.'],
 'sprouted-moong-salad':['moong sprouts:500:g|cucumber:250:g|tomato:200:g|onion:60:g|coriander:15:g','Rinse sprouts and simmer in fresh boiling water for 8–10 minutes until fully cooked. Drain and cool promptly. Dice cucumber and tomato; finely chop onion.','lemon juice:35:ml|olive oil:20:ml|cumin powder:3:g|salt:4:g','Whisk lemon juice, oil, cumin and salt.','Combine the cooked sprouts and prepared vegetables, add the dressing and fold gently. Scatter coriander over the top.'],
 'tabbouleh':['fine bulgur:140:g|parsley:100:g|mint:25:g|tomato:350:g|cucumber:200:g|spring onion:60:g|water:220:ml','Cover fine bulgur with the measured boiling water, cover for 15–20 minutes until tender and fluff. Drain any excess and cool. Finely chop the herbs, tomatoes, cucumber and spring onion.','olive oil:45:ml|lemon juice:60:ml|salt:4:g|black pepper:1:g','Whisk oil, lemon juice, salt and pepper.','Fold the cooled bulgur, vegetables and herbs together. Toss with dressing and rest for 15 minutes; the herbs should remain the main ingredient.'],
 'panzanella':['stale eggless bread:280:g|tomato:600:g|cucumber:200:g|onion:60:g|basil:20:g','Cube the bread and toast at 180°C for 8–10 minutes until dry at the edges. Chop tomatoes and cucumber, thinly slice onion and tear basil.','olive oil:45:ml|red wine vinegar:25:ml|salt:4:g|black pepper:1:g','Whisk oil, vinegar, salt and pepper with any juices collected from the chopped tomatoes.','Toss bread with tomatoes, cucumber, onion and dressing. Rest for 15–20 minutes so the bread softens slightly, then fold in basil.'],
 'watermelon-feta-salad':['watermelon:900:g|vegetarian feta cheese:160:g|cucumber:250:g|mint:20:g','Remove watermelon rind and seeds and cut the flesh into cubes. Dice cucumber, pat it dry and crumble feta labelled suitable for vegetarians.','olive oil:25:ml|lime juice:25:ml|black pepper:1:g|salt:2:g','Whisk oil, lime juice and pepper. Taste the feta before adding any salt because it can be quite salty.','Arrange chilled watermelon and cucumber, scatter feta and torn mint, and drizzle with dressing just before serving.'],
 'fruit-chaat':['apple:250:g|banana:250:g|orange:250:g|pomegranate arils:150:g|grapes:150:g','Wash fruit, core the apple, peel banana and orange, and remove any seeds. Cut into bite-size pieces; halve grapes.','lemon juice:30:ml|cumin powder:2:g|black salt:2:g|chaat masala:3:g','Mix lemon juice, cumin, black salt and chaat masala in a large bowl.','Add the fruit and toss gently without crushing the banana. Taste before adding any more seasoning.']
};
for(const [id,[base,prep,dressing,mix,finish]] of Object.entries(salads))add(id,base+'|'+dressing,[
 'Wash fresh produce under running water and use a clean board. Measure the ingredients for four servings.',prep,mix,finish,
 'Taste a portion containing both the main ingredients and dressing, then adjust acidity or salt if needed.',
 'Serve promptly. Refrigerate prepared components if holding them for later; add delicate herbs and dressing near serving time.'
],id==='kosambari'?30:25);
const toast={
 'avocado-toast':['eggless wholegrain bread:320:g|avocado flesh:350:g|lemon juice:25:ml|olive oil:15:ml|salt:3:g|black pepper:1:g','Mash avocado with lemon juice, salt and pepper, leaving a little texture.','Toast the bread until crisp and golden; brush lightly with olive oil.','Spread avocado generously over the warm toast and serve immediately.'],
 'bruschetta':['eggless baguette:320:g|tomato:500:g|basil:20:g|garlic:8:g|olive oil:40:ml|balsamic vinegar:15:ml|salt:4:g|black pepper:1:g','Dice tomatoes and drain excess liquid. Toss with torn basil, half the oil, vinegar, salt and pepper.','Slice bread diagonally and brush with the remaining oil. Toast at 200°C for 6–8 minutes, then rub one side lightly with a cut garlic clove.','Spoon the tomato mixture over the toast just before eating so the bread stays crisp.'],
 'vegetable-sandwich':['eggless bread:400:g|cucumber:200:g|tomato:200:g|boiled potato:250:g|mint chutney:80:g|butter:35:g|salt:3:g|black pepper:1:g','Thinly slice cucumber, tomato and peeled boiled potato. Pat vegetables dry and check that the chutney ingredients suit your dietary restrictions.','Spread bread thinly with butter and mint chutney, keeping a small border.','Layer potato, cucumber and tomato, season lightly with salt and pepper, close and cut into triangles.'],
 'paneer-grilled-sandwich':['eggless bread:400:g|paneer:300:g|capsicum:150:g|onion:80:g|vegetarian cheese:100:g|butter:35:g|cumin powder:3:g|salt:4:g|black pepper:1:g','Crumble paneer, finely dice capsicum and onion, and mix with grated vegetarian cheese, cumin, salt and pepper.','Butter the outside faces of the bread lightly. Divide filling between four sandwiches, keeping the edges clear.','Cook in a sandwich press for 4–6 minutes, or on a covered skillet for 3–4 minutes per side, until the centre is hot and bread is golden.']
};
for(const [id,[ingredients,prep,base,finish]] of Object.entries(toast))add(id,ingredients,[
 'Measure the ingredients and wash and dry any vegetables or herbs before cutting.',prep,base,finish,
 'Let very hot toasted sandwiches stand for 1 minute before slicing; serve open toasts immediately.',
 'Make only the portions needed for serving now. Keep any remaining filling covered and refrigerated.'
],20);
add('overnight-oats','rolled oats:200:g|milk:600:ml|curd:200:g|chia seeds:30:g|banana:240:g|dates:60:g|cinnamon powder:1:g',[
 'Use rolled oats rather than coarse steel-cut oats. Finely chop pitted dates and measure the remaining ingredients.',
 'Mix oats, milk, curd, chia seeds, dates and cinnamon until no dry clumps remain.',
 'Divide between four covered jars, leaving room for the oats to expand.',
 'Refrigerate for at least 6 hours or overnight; do not leave the milk mixture at room temperature.',
 'Stir in the morning and loosen with a splash of milk if needed. Peel and slice the banana immediately before serving.',
 'Top each jar with banana and serve cold. Keep unused portions refrigerated.'
],10,'The hands-on preparation takes 10 minutes; allow at least 6 hours in the refrigerator.');
add('chia-pudding','chia seeds:100:g|milk:700:ml|maple syrup:45:ml|vanilla extract:5:ml|strawberry:250:g',[
 'Whisk milk, maple syrup and vanilla together in a bowl.',
 'Sprinkle in chia seeds while whisking so they do not clump at the bottom.',
 'Rest for 10 minutes and whisk again, breaking up any clusters.',
 'Divide into four covered jars and refrigerate for at least 4 hours until thick and spoonable.',
 'Wash, hull and slice strawberries shortly before serving. Stir the puddings and add a splash of milk if too firm.',
 'Top with strawberries and serve chilled.'
],15,'Allow at least 4 hours chilling in addition to hands-on preparation.');
const simpleChaats={
 'corn-chaat':['cooked sweet corn:650:g|tomato:160:g|onion:80:g','Drain hot cooked sweet corn thoroughly; finely chop tomato and onion.','Toss warm corn with tomato and onion.'],
 'peanut-chaat':['raw peanuts:300:g|tomato:200:g|onion:100:g|cucumber:200:g','Boil peanuts in plenty of water for 25–35 minutes until tender, then drain. Dice tomato and cucumber and finely chop onion.','Toss the warm drained peanuts with the vegetables.'],
 'sprouts-chaat':['moong sprouts:500:g|boiled potato:250:g|tomato:150:g|onion:80:g','Simmer rinsed sprouts in boiling water for 8–10 minutes until fully cooked, then drain. Dice peeled boiled potato and tomato; chop onion.','Mix the cooked sprouts and potato with tomato and onion.']
};
for(const [id,[ingredients,prep,combine]] of Object.entries(simpleChaats))add(id,ingredients+'|lemon juice:30:ml|chaat masala:5:g|cumin powder:3:g|salt:2:g|coriander:20:g',[
 'Measure ingredients and wash fresh vegetables and coriander.',prep,
 'Mix lemon juice, chaat masala, cumin and salt in a large bowl. Begin with less salt because chaat masala already contains some.',combine,
 'Pour over the dressing and toss gently. Add finely chopped coriander.',
 'Taste and serve while fresh. If preparing ahead, chill cooked ingredients promptly and add raw vegetables and lemon near serving time.'
],id==='peanut-chaat'?45:25);
const crispChaats={
 'bhel-puri':['puffed rice:180:g|sev:80:g|papdi:100:g|boiled potato:250:g|tomato:180:g|onion:100:g','Dry-toast puffed rice for 2 minutes if needed and cool completely. Dice potato and tomato and finely chop onion.','Mix puffed rice with vegetables and broken papdi. Add both chutneys and toss quickly; finish with sev.'],
 'sev-puri':['papdi:180:g|boiled potato:300:g|onion:100:g|sev:120:g','Dice the potato and finely chop onion. Arrange papdi in a single layer on four plates.','Top each papdi with potato and onion, drizzle both chutneys and finish with sev.'],
 'papdi-chaat':['papdi:200:g|boiled potato:250:g|cooked chickpeas:250:g|curd:350:g|sev:60:g','Dice potato, drain cooked chickpeas and whisk curd smooth. Arrange papdi on serving plates.','Spoon potato and chickpeas over papdi, add curd, drizzle chutneys and finish with sev.'],
 'dahi-puri':['ready-made puri shells:120:g|boiled potato:300:g|curd:400:g|sev:80:g','Dice potato and whisk curd until smooth. Gently crack a small opening in the top of each puri shell.','Fill each shell with potato, a little of each chutney and curd. Sprinkle sev over the top and serve at once.']
};
for(const [id,[ingredients,prep,assemble]] of Object.entries(crispChaats))add(id,ingredients+'|tamarind chutney:100:g|mint coriander chutney:80:g|chaat masala:5:g|coriander:20:g',[
 'Use ready-made vegetarian, eggless shells or papdi and chutneys; check their ingredient labels for allergens and exclusions.',prep,
 'Set out both chutneys in separate bowls so you can control sweetness and heat.',assemble,
 'Sprinkle evenly with chaat masala and chopped coriander. Start with less masala and taste before adding more.',
 'Serve immediately before the crisp base softens. Keep extra dry components separate from chutneys and curd.'
],20);
add('pani-puri','ready-made puri shells:140:g|boiled potato:350:g|cooked chickpeas:250:g|mint:40:g|coriander:40:g|ginger:10:g|tamarind paste:35:g|lemon juice:25:ml|cumin powder:5:g|black salt:4:g|jaggery:35:g|water:1000:ml',[
 'Wash mint and coriander thoroughly. Blend them with ginger, tamarind, lemon juice, cumin, black salt, jaggery and 150 ml of the drinking water.',
 'Stir the paste into the remaining chilled drinking water. Strain if desired, then taste and adjust the sour-sweet balance.',
 'Refrigerate the pani for 30 minutes while preparing the filling.',
 'Dice the boiled potato and mix with drained, fully cooked chickpeas. Check that purchased puri shells are vegetarian and eggless.',
 'Crack a small hole in each shell, add a spoonful of filling and dip or spoon in the chilled pani.',
 'Eat immediately, assembling one puri at a time so it stays crisp. Keep unused pani refrigerated.'
],25,'Chilling time is additional; use safe drinking water for pani.');
add('nachos-with-salsa','corn tortilla chips:250:g|tomato:400:g|onion:80:g|coriander:20:g|lime juice:35:ml|vegetarian cheese:180:g|cooked black beans:300:g|salt:3:g|cumin powder:2:g',[
 'Preheat the oven to 190°C. Dice tomatoes and onion finely and chop coriander.',
 'Mix tomato, onion, coriander, lime juice and salt for the salsa. Drain excess watery tomato juice so it does not soak the chips.',
 'Rinse and drain cooked black beans, then warm with cumin and a splash of water for 3–4 minutes.',
 'Spread chips on a baking tray, scatter beans and grated cheese labelled suitable for vegetarians over them.',
 'Bake for 5–7 minutes, just until the cheese melts. Watch carefully because thin chips scorch quickly.',
 'Serve immediately with salsa on the side or spooned on at the last moment.'
],25);
