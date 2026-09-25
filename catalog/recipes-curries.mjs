export const curryRecipes={};
const add=(id,ingredients,steps,time=45,tip='Simmer gently, stir the base regularly and check the main ingredient is tender before finishing the gravy.')=>curryRecipes[id]={ingredients,steps,time,tip};
for(const id of ['gatte-ki-sabzi','govind-gatta-curry'])add(id,'gram flour:220:g|curd:400:g|oil:45:ml|cumin:4:g|coriander powder:6:g|turmeric powder:1:g|red chilli powder:2:g|salt:6:g|water:650:ml|coriander:15:g'+(id==='govind-gatta-curry'?'|paneer:120:g|raisins:25:g':''),[
 'Mix gram flour with 100 g curd, 20 ml oil, half the salt and half the cumin. Knead gently into a firm smooth dough, adding a spoonful of water only if needed.',
 id==='govind-gatta-curry'?'Crumble paneer and chop raisins. Divide dough into 12 portions, flatten each, fill with a little paneer and raisins and seal into smooth oval dumplings.':'Divide dough into four portions and roll into smooth logs about 2 cm thick.',
 'Bring a deep saucepan of water to a boil. Lower in the dough pieces and simmer for 12–15 minutes until firm and cooked through. Lift out and cool; cut plain logs into 1 cm slices.',
 'Whisk remaining curd with coriander powder, turmeric, chilli powder and measured water until smooth.',
 'Heat remaining oil, sizzle remaining cumin, reduce heat and pour in the curd mixture gradually while stirring. Bring to a gentle simmer, continuing to stir so it does not split.',
 'Add cooked gatta and remaining salt and simmer gently for 10 minutes. Finish with coriander and adjust with a little hot water if too thick.'
],55);
const yoghurtCurries={
 'doi-begun':['brinjal:800:g|curd:350:g|mustard oil:45:ml|cumin:3:g|turmeric powder:1:g|red chilli powder:1:g|sugar:10:g|salt:5:g|water:150:ml','Cut brinjal into thick slices and pat dry. Rub with half the turmeric and salt.','Pan-fry brinjal in most of the oil for 5–6 minutes per side until golden and tender; remove to a plate.','Return the fried brinjal to the sauce and simmer very gently for 5 minutes without breaking the slices.'],
 'kashmiri-dum-aloo':['small potatoes:800:g|curd:350:g|mustard oil:45:ml|cumin:3:g|fennel powder:6:g|dry ginger powder:3:g|Kashmiri chilli powder:5:g|cardamom:1:g|salt:5:g|water:300:ml','Boil small potatoes until just tender, about 15–20 minutes, then peel and prick all over with a fork.','Pan-fry potatoes in most of the oil for 10–12 minutes, turning until golden; lift out.','Return potatoes to the sauce, cover and simmer over low heat for 20 minutes, turning occasionally until the sauce clings.'],
 'papad-ki-sabzi':['plain vegetarian papad:100:g|curd:300:g|oil:25:ml|cumin:3:g|coriander powder:5:g|turmeric powder:1:g|red chilli powder:1:g|salt:3:g|water:400:ml','Roast papad in a dry pan or microwave according to its packet until crisp. Break into large pieces and set aside.','Heat the oil in a saucepan and keep the papad separate until the gravy is ready.','Add roasted papad to the sauce only for the last 2 minutes; it softens very quickly, so serve immediately.']
};
for(const [id,[ingredients,prep,brown,finish]] of Object.entries(yoghurtCurries))add(id,ingredients,[
 prep,brown,'Whisk curd with measured water and the listed ground spices until completely smooth.',
 'Add cumin and any listed whole spices to the remaining oil over medium heat. Lower heat and add the curd mixture gradually, stirring continuously until gently simmering.',
 'Add the remaining salt and sugar if listed. Simmer gently for 5 minutes, stirring the base; do not let the yoghurt sauce boil vigorously.',finish
],id==='kashmiri-dum-aloo'?65:40);
const koftas={
 'malai-kofta':['paneer:250:g|boiled potato:300:g|cornflour starch:45:g','Grate paneer and mash peeled boiled potato completely. Mix with cornflour and 2 g salt, divide into 12 portions and shape into smooth balls.'],
 'lauki-kofta':['bottle gourd:650:g|gram flour:100:g','Peel and grate bottle gourd, discarding it if bitter. Squeeze out excess liquid well and mix the flesh with gram flour and 2 g salt just before frying; shape small balls using damp hands.']
};
for(const [id,[base,prep]] of Object.entries(koftas))add(id,base+'|onion:120:g|tomato:350:g|cashew:40:g|ginger:10:g|garlic:10:g|cream:70:ml|oil for frying:600:ml|oil:25:ml|cumin:3:g|coriander powder:5:g|turmeric powder:1:g|garam masala:2:g|salt:6:g|water:350:ml',[
 prep,'Soak cashews in hot water for 20 minutes, then blend with 100 ml measured water. Chop onion and tomato and mince ginger and garlic.',
 'Heat frying oil to about 170°C in a stable pan less than half full. Fry one test kofta; if it breaks, add a little more binding flour to the mixture. Fry the rest in small batches for 4–6 minutes until golden and cooked through, then drain.',
 'For gravy, heat 25 ml oil, sizzle cumin and soften onion for 7 minutes. Add ginger and garlic for 1 minute, then tomato, coriander powder and turmeric; cook for 10 minutes until thick.',
 'Cool slightly and blend the masala with cashew paste until smooth. Return to the pan, add remaining measured water and salt and simmer for 8 minutes.',
 'Lower heat and add cream and garam masala. Warm for 2 minutes, then place koftas in serving bowls and spoon gravy over them just before serving so they do not disintegrate.'
],65,'Frying oil is the amount needed in the pan, not the amount absorbed. Add delicate koftas only when ready to serve.');
add('sev-tamatar','tomato:800:g|thick gram-flour sev:180:g|oil:25:ml|cumin:3:g|mustard seeds:3:g|turmeric powder:1:g|coriander powder:5:g|red chilli powder:1:g|jaggery:15:g|salt:4:g|water:250:ml|coriander:15:g',[
 'Wash and chop tomatoes into small pieces. Keep sev dry and separate until serving.',
 'Heat oil, let mustard seeds pop and add cumin for 20 seconds.',
 'Add tomato, turmeric, coriander powder, chilli and salt. Cook for 8–10 minutes until pulpy.',
 'Add jaggery and water and simmer for 5 minutes to make a slightly loose sweet-sour gravy.',
 'Taste and adjust seasoning, then add sev for only 30–60 seconds so it softens slightly without dissolving.',
 'Finish with coriander and serve immediately. For later serving, store the gravy and sev separately.'
],25);
add('vegetable-kurma','carrot:200:g|potato:200:g|green beans:150:g|peas:150:g|cauliflower:200:g|onion:120:g|tomato:180:g|coconut:100:g|cashew:35:g|ginger:10:g|garlic:10:g|fennel seeds:4:g|cinnamon:2:g|cardamom:1:g|oil:25:ml|turmeric powder:1:g|salt:6:g|water:550:ml|coriander:15:g',[
 'Cut vegetables into even bite-size pieces. Soak cashews for 15 minutes, then blend with coconut, fennel and 150 ml measured water into a fine paste.',
 'Heat oil, add cinnamon and lightly crushed cardamom, then soften chopped onion for 6 minutes. Add minced ginger and garlic for 1 minute.',
 'Add chopped tomato and turmeric and cook for 5 minutes until pulpy.',
 'Add potato, carrot, beans, cauliflower, salt and remaining water. Cover and simmer for 12–15 minutes until nearly tender.',
 'Add peas and coconut-cashew paste and simmer gently for 8–10 minutes, stirring the base, until all vegetables are tender.',
 'Adjust thickness with hot water, finish with coriander and remove whole spices before serving.'
],50);
add('pav-bhaji','potato:450:g|cauliflower:250:g|peas:180:g|capsicum:150:g|tomato:400:g|onion:180:g|ginger:12:g|garlic:15:g|butter:70:g|pav bhaji masala:18:g|turmeric powder:1:g|Kashmiri chilli powder:3:g|salt:6:g|water:600:ml|eggless pav:400:g|lemon:120:g|coriander:20:g',[
 'Peel and dice potatoes and cut cauliflower into florets. Simmer with peas and 400 ml water for 18–20 minutes until very soft, then mash with the cooking liquid.',
 'Reserve 50 g finely chopped onion for serving. Melt 40 g butter and soften remaining onion for 7 minutes; add minced ginger and garlic for 1 minute.',
 'Add finely chopped capsicum and tomato, turmeric, chilli and pav bhaji masala. Cook for 10 minutes until the vegetables soften into a thick base.',
 'Add mashed vegetables, salt and remaining water. Mash together and simmer for 10–15 minutes, stirring until thick but spoonable.',
 'Split pav and toast the cut sides in the remaining butter on a tawa until golden.',
 'Serve bhaji with warm pav, reserved onion, coriander and lemon wedges. This is a lunch, dinner or street-food meal.'
],55);
add('rajasthani-kadhi','curd:450:g|gram flour:70:g|water:1100:ml|ghee:25:g|cumin:4:g|fenugreek seeds:1:g|dried red chilli:3:g|turmeric powder:1:g|red chilli powder:1:g|salt:6:g|coriander:15:g',[
 'Whisk curd, gram flour, water, turmeric and salt until smooth with no flour lumps.',
 'Heat half the ghee in a deep pan, sizzle cumin and fenugreek briefly, then lower the heat.',
 'Pour in the curd mixture gradually while stirring. Bring to a gentle boil, stirring continuously so the flour does not settle.',
 'Reduce heat and simmer for 25–30 minutes, stirring often, until the gram flour is cooked and the kadhi is smooth and pourable.',
 'Heat remaining ghee, add dried chilli, turn off the heat and stir in chilli powder briefly. Pour this tempering over the kadhi.',
 'Finish with coriander and serve hot. Add boiling water if it thickens excessively during simmering.'
],40);
add('sindhi-kadhi','gram flour:100:g|oil:50:ml|okra:200:g|potato:250:g|carrot:200:g|green beans:150:g|tomato:250:g|tamarind paste:45:g|cumin:3:g|mustard seeds:3:g|fenugreek seeds:1:g|curry leaves:5:g|turmeric powder:1:g|salt:6:g|water:1400:ml',[
 'Cut potato and carrot into chunks and trim beans. Wash okra, dry completely and cut into short pieces.',
 'Heat 20 ml oil and pan-fry okra for 8 minutes until nearly tender; reserve. In a deep pot heat remaining oil and add cumin, mustard, fenugreek and curry leaves.',
 'Add gram flour and roast over low heat for 8–10 minutes, stirring until golden and nutty. Whisk in measured water gradually to avoid lumps.',
 'Add turmeric, salt, potato, carrot, beans and chopped tomato. Bring to a simmer and cook for 20–25 minutes until the vegetables are tender.',
 'Add tamarind and reserved okra and simmer for another 8 minutes, stirring the base regularly.',
 'Taste for sourness and salt, adjust consistency with hot water and serve hot.'
],55);
