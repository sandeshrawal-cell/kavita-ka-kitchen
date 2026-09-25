export const mainRecipes={};
const add=(id,ingredients,steps,time=40,tip='Taste at the end and adjust salt, heat and consistency before serving.')=>mainRecipes[id]={ingredients,steps,time,tip};
const dalProfiles={
 'amti':['toor dal:240:g','tamarind paste:20:g|jaggery:16:g|goda masala:8:g','30–40','Stir in tamarind, jaggery and goda masala after the dal is soft; simmer for 6 minutes to balance sweet and sour flavours.'],
 'varan':['toor dal:240:g','','30–40','Mash the soft dal lightly, retaining its simple texture; finish with the measured ghee and cumin tempering.'],
 'masoor-dal':['masoor dal:240:g','tomato:200:g','20–25','Mash a small portion of the red lentils against the side of the pan to thicken the dal while keeping it pourable.'],
 'dal-banjara':['split urad dal:160:g|chana dal:100:g','tomato:200:g|coriander powder:5:g','45–60','Keep some lentils intact: this dal should be thick and textured rather than completely smooth.'],
 'panchmel-dal':['toor dal:60:g|moong dal:50:g|chana dal:50:g|split urad dal:50:g|masoor dal:50:g','tomato:200:g|coriander powder:5:g','45–60','Check the chana dal in particular; it must crush easily before the combined lentils are considered cooked.'],
 'dal-palak':['moong dal:240:g','spinach:300:g|tomato:150:g','25–35','Add washed, finely chopped spinach only after the lentils are tender, then simmer uncovered for 6–8 minutes.'],
 'sai-bhaji':['chana dal:200:g','spinach:400:g|tomato:200:g|onion:100:g','50–65','Add chopped spinach for the final 15 minutes, then mash the lentils and greens together into a thick, soft mixture.'],
 'doodhi-chana-dal':['chana dal:240:g','bottle gourd:500:g|tomato:180:g','45–60','Peel and dice the bottle gourd; add it after the dal has simmered for 30 minutes so both finish tender together. Discard bitter-tasting bottle gourd.'],
 'cholar-dal':['chana dal:260:g','coconut:50:g|jaggery:16:g|raisins:20:g|cinnamon:2:g','45–60','Keep the cooked chana dal grains whole. Lightly toast coconut and raisins in the tempering, then stir them into the dal with jaggery.'],
 'gujarati-dal':['toor dal:240:g','tomato:200:g|jaggery:24:g|lemon juice:30:ml','30–40','Whisk the cooked dal smooth, add jaggery and simmer for 5 minutes. Add lemon juice after turning off the heat.']
};
for(const [id,[pulses,extras,duration,special]] of Object.entries(dalProfiles))add(id,`${pulses}|water:1200:ml|turmeric powder:1:g|cumin:3:g|ghee:20:g|salt:5:g|coriander:12:g${extras?'|'+extras:''}`,[
 `Pick over and rinse the ${pulses.split('|').map(x=>x.split(':')[0]).join(' and ')}. ${pulses.includes('chana')?'Soak for 1 hour, then drain to help the lentils cook evenly.':'Drain after rinsing.'}`,
 `Put the lentils, measured water and turmeric in a deep saucepan. Bring to a boil, skim off foam, then reduce to a steady simmer with the lid partly open.`,
 `Cook for approximately ${duration} minutes, stirring occasionally and adding boiling water if the base becomes dry. ${id==='doodhi-chana-dal'?'After the first 30 minutes, add peeled diced bottle gourd and continue until both are tender. Discard bitter bottle gourd.':id==='sai-bhaji'?'Add washed chopped spinach for the final 15 minutes.':''} The lentils must crush easily between a spoon and the pan.`,
 extras.includes('tomato')?`While they cook, chop the tomato${extras.includes('onion')?' and onion':''}. Heat ghee in a separate pan, let cumin sizzle, ${extras.includes('onion')?'soften the onion for 6 minutes, ':''}then cook tomato for 6–8 minutes until pulpy. Add any listed dry spices on low heat.`:'Heat ghee in a small pan and let cumin sizzle for 20–30 seconds; add any listed whole spices without allowing them to burn.',
 ['doodhi-chana-dal','sai-bhaji'].includes(id)?'Stir gently to combine the tender vegetables and dal, mashing a few lentils to thicken the mixture.':special,
 'Stir the tempering into the cooked lentils with salt. Simmer gently for another 3–5 minutes, stirring the base, and adjust the thickness with hot water.',
 'Finish with chopped coriander and serve hot. Soaking time is additional to the active preparation and cooking time.'
],pulses.includes('chana')?75:50);
add('dal-makhani','whole black urad dal:220:g|kidney beans:60:g|tomato:300:g|ginger:12:g|garlic:12:g|butter:35:g|cream:80:ml|cumin:3:g|red chilli powder:2:g|garam masala:2:g|salt:6:g|water:1800:ml',[
 'Rinse the whole urad and kidney beans, then soak together in plenty of water for 8–12 hours. Drain and rinse again.',
 'Cover with the measured fresh water in a large saucepan and boil vigorously for 30 minutes, topping up with boiling water to keep the beans submerged. Do not cook raw kidney beans only in a low-temperature slow cooker.',
 'Reduce to a simmer and cook for another 60–90 minutes, or longer if needed, until both beans crush easily and their centres are creamy. Mash a small portion against the side.',
 'Heat butter separately, sizzle cumin and cook minced ginger and garlic for 1 minute. Add pureed tomato and chilli powder and cook for 10 minutes until thick.',
 'Stir this masala and salt into the beans. Simmer very gently for 30–40 minutes, stirring often and adding hot water as needed.',
 'Add cream and garam masala, warm through for 3 minutes and serve. The finished dal should be creamy with soft whole lentils visible.'
],180,'Allow overnight soaking separately. Fully cooked canned kidney beans may replace the dry kidney beans and be added during the final simmer.');

const gravyBase='onion:120:g|tomato:280:g|ginger:10:g|garlic:10:g|oil:25:ml|cumin:3:g|turmeric powder:1:g|coriander powder:5:g|red chilli powder:1:g|garam masala:2:g|salt:5:g|water:300:ml|coriander:12:g';
const gravyProfiles={
 'achari-paneer':['paneer:500:g|fennel seeds:2:g|mustard seeds:2:g|fenugreek seeds:0.5:g','Cut the paneer into 2 cm cubes. Lightly crush fennel, mustard and fenugreek seeds.','Add the paneer to the finished spiced tomato gravy and simmer gently for 5 minutes.'],
 'matar-paneer':['paneer:400:g|peas:250:g','Cube the paneer and thaw frozen peas, or rinse fresh peas.','Add peas to the gravy and simmer until tender, about 6–8 minutes, before adding paneer for the last 4 minutes.'],
 'paneer-butter-masala':['paneer:500:g|cashew:50:g|butter:30:g|cream:80:ml|dried fenugreek leaves:2:g','Soak cashews in hot water for 20 minutes and blend smooth with a little measured water. Cube the paneer.','Blend the cooked tomato base and cashew paste until smooth, return to the pan, add butter and paneer, and simmer for 5 minutes. Finish on low heat with cream and crushed dried fenugreek.'],
 'paneer-lababdar':['paneer:500:g|cashew:40:g|cream:60:ml|dried fenugreek leaves:2:g','Grate 100 g of the paneer and cut the rest into cubes. Soak cashews and blend to a smooth paste.','Add cashew paste and grated paneer to the gravy and simmer for 5 minutes; add the cubes for another 4 minutes, then stir in cream and dried fenugreek.'],
 'kadai-paneer':['paneer:450:g|capsicum:250:g|coriander seeds:6:g','Cube the paneer and capsicum. Toast coriander seeds in a dry pan for 1 minute and crush coarsely.','Stir-fry capsicum separately over high heat for 3 minutes. Add it with paneer and crushed coriander to the reduced tomato gravy, then toss for 4 minutes; keep this curry fairly thick.'],
 'corn-capsicum-masala':['sweet corn:400:g|capsicum:250:g','Slice the capsicum into bite-size squares and rinse or thaw the corn.','Add corn and capsicum to the gravy, cover loosely and simmer for 8–10 minutes until tender but not mushy.'],
 'mix-vegetable-curry':['carrot:180:g|green beans:160:g|peas:160:g|capsicum:150:g','Peel and dice carrots, trim beans into short lengths and cube capsicum. Keep the vegetables similar in size.','Add carrots and beans first and simmer covered for 10 minutes; add peas and capsicum and cook another 7–8 minutes until all are tender.'],
 'mushroom-masala':['mushroom:600:g|capsicum:150:g','Wipe mushrooms clean, trim the stems and halve or quarter them. Slice capsicum.','Brown the mushrooms separately in a wide pan for 6–8 minutes so excess moisture evaporates. Add them and capsicum to the masala and simmer for 6 minutes.'],
 'kaju-curry':['cashew:240:g|cream:80:ml','Soak half the cashews in hot water for 20 minutes and blend smooth; lightly toast the remaining whole cashews.','Stir cashew paste into the tomato gravy and simmer for 6 minutes, adding water if it catches. Add whole cashews and cream and heat gently for 3 minutes.'],
 'chole-masala':['cooked chickpeas:700:g|chole masala:8:g','Drain and rinse canned chickpeas, or use chickpeas already boiled until completely tender.','Add the chickpeas and chole masala to the gravy. Simmer for 15 minutes, mashing a few chickpeas to thicken the sauce.'],
 'kala-chana-curry':['cooked black chickpeas:700:g','Use black chickpeas soaked overnight and fully boiled in advance, or ready-cooked chickpeas. They must crush easily.','Add the cooked chickpeas to the gravy and simmer for 15–20 minutes; mash a spoonful to give the sauce body.'],
 'green-moong-curry':['cooked whole green moong:700:g','Rinse the cooked mung beans gently and drain; they should be soft but still mostly whole.','Fold the cooked moong into the gravy and simmer for 10 minutes, stirring gently so it does not become a paste.'],
 'soya-chunk-masala':['dry soya chunks:180:g|capsicum:200:g','Boil the soya chunks in plenty of water for 8–10 minutes or as directed on the packet. Drain, rinse and squeeze out water; chop the capsicum.','Add squeezed soya chunks and capsicum to the gravy and simmer covered for 10–12 minutes so the chunks absorb the sauce.'],
 'soya-chaap-masala':['ready-cooked vegetarian soya chaap:500:g|curd:120:g','Check that the chaap is vegetarian and eggless. Remove sticks and cut into pieces; lightly pan-brown the pieces.','Turn the heat low and add whisked curd gradually to the cooked masala. Add chaap and simmer gently for 12 minutes; do not boil hard.'],
 'pumpkin-curry':['pumpkin:750:g|jaggery:12:g|lemon juice:15:ml','Peel the pumpkin, remove seeds and cut into 2 cm cubes.','Add pumpkin and jaggery to the gravy, cover and simmer for 15–18 minutes until a knife enters easily. Finish with lemon juice off the heat.'],
 'ringan-bateta':['brinjal:400:g|potato:350:g','Cut brinjal into wedges and peeled potatoes into 2 cm cubes; keep the potatoes slightly smaller so they cook in the same time.','Add potatoes to the gravy and cook covered for 10 minutes. Add brinjal and cook another 12–15 minutes until both are tender.'],
 'alur-dom':['small potatoes:750:g','Boil the potatoes for 12–15 minutes until nearly tender, cool slightly, peel and prick them with a fork.','Add the potatoes to the masala, cover and simmer for 15 minutes, turning gently until the sauce coats them.'],
 'veg-jalfrezi':['carrot:200:g|green beans:150:g|capsicum:300:g','Cut carrot and capsicum into thin strips; slice beans on the diagonal.','Stir-fry the vegetables separately over high heat for 5–6 minutes, then toss into a well-reduced masala for 3 minutes. Retain a little crunch.']
};
for(const [id,[main,prep,finish]] of Object.entries(gravyProfiles))add(id,`${main}|${gravyBase}`,[
 prep,
 'Finely chop the onion, mince ginger and garlic, and chop or puree the tomatoes. Measure the spices before heating the pan.',
 `Heat oil in a heavy pan over medium heat. Add cumin${id==='achari-paneer'?' and the crushed fennel, mustard and fenugreek seeds':''} and let it sizzle, then cook onion for 7–9 minutes until golden at the edges.`,
 'Stir in ginger and garlic for 1 minute. Lower the heat and add turmeric, coriander powder and chilli powder, followed immediately by tomato.',
 'Cook the tomato masala for 8–10 minutes, stirring, until it thickens and no longer smells raw. Add the measured water and bring to a gentle simmer.',
 finish,
 'Add salt and garam masala, taste and adjust the sauce with a splash of hot water if needed. Finish with chopped coriander and serve hot.'
],main.includes('soak')?50:45);

const dryProfiles={
 'aloo-gobi':['potato:350:g|cauliflower:500:g','Peel and cube potatoes. Cut cauliflower into medium florets, rinse and drain very well.','Cook potatoes covered with 60 ml water for 8 minutes, then add cauliflower and cook 12–15 minutes more, turning gently until both are tender.'],
 'bhinda-nu-shaak':['okra:750:g','Wash the okra and dry it thoroughly with a clean towel before trimming and slicing into 1 cm pieces.','Cook uncovered for 15–18 minutes, turning occasionally. Add salt only near the end and avoid adding water so the okra loses its sticky texture.'],
 'bhindi-masala':['okra:700:g|onion:150:g|tomato:180:g','Wash and dry okra completely; cut into short lengths. Slice onion and chop tomato.','Pan-fry okra separately until nearly tender. Soften onion in the spice oil for 7 minutes, cook tomato until pulpy, then fold in okra and cook uncovered for 5 minutes.'],
 'tindora-nu-shaak':['ivy gourd:750:g','Wash the ivy gourds, trim both ends and cut lengthwise into thin wedges.','Cook covered over medium-low heat for 15 minutes, stirring occasionally, then uncover and cook another 6–8 minutes until tender with lightly browned edges.'],
 'gawar-phali':['cluster beans:650:g|gram flour:40:g','Trim and string the cluster beans, cut into short pieces and blanch in boiling water for 8–10 minutes; drain.','Toss the beans in the spice oil for 5 minutes. Sprinkle gram flour gradually, stirring well, and cook uncovered for 6–8 minutes until the flour smells nutty rather than raw.'],
 'chorchori':['pumpkin:250:g|potato:250:g|brinjal:250:g|mustard seeds:3:g','Cut the pumpkin, potato and brinjal into similar bite-size pieces.','Add vegetables and 120 ml water, cover and simmer for 18–22 minutes until tender. Uncover and cook off excess moisture without mashing all the vegetables.']
};
for(const [id,[main,prep,finish]] of Object.entries(dryProfiles))add(id,`${main}|oil:30:ml|cumin:3:g|turmeric powder:1:g|coriander powder:5:g|red chilli powder:1:g|salt:5:g|lemon juice:15:ml|coriander:12:g`,[
 prep,'Measure the spices and keep a wide, heavy pan ready so the vegetables can cook without piling too deeply.',
 'Heat oil over medium heat and let cumin sizzle for 20–30 seconds. Add any listed mustard seeds and allow them to pop.',
 'Reduce the heat and add turmeric, coriander powder and chilli powder briefly; immediately begin the vegetable-cooking sequence in the next step so the spices do not scorch.',
 finish,'Check tenderness with a knife and add salt to taste. Turn off the heat, add lemon juice and chopped coriander, and serve hot.'
],35);
mainRecipes['bhindi-masala'].steps=[
 'Wash okra and dry completely before slicing into short lengths. Slice onion and chop tomato.',
 'Heat 20 ml of the oil in a wide pan and fry okra uncovered for 12–15 minutes until nearly tender. Transfer to a plate.',
 'Heat the remaining 10 ml oil, sizzle cumin and soften onion for 7 minutes. Add turmeric, coriander powder and chilli briefly, then tomato.',
 'Cook tomato for 6–8 minutes until pulpy. Return okra and cook uncovered for 5 minutes until fully tender.',
 'Add salt and turn off the heat. Fold in lemon juice and coriander.',
 'Serve hot; avoid covering the finished okra or adding water, which makes the texture sticky.'
];
add('baingan-bharta','brinjal:900:g|onion:150:g|tomato:300:g|ginger:12:g|garlic:15:g|oil:30:ml|cumin:3:g|turmeric powder:1:g|red chilli powder:2:g|salt:5:g|coriander:15:g',[
 'Wash and dry the whole brinjals and prick them several times. Roast at 220°C for 35–45 minutes, turning once, until the skin collapses and the flesh is completely soft.',
 'Cool until safe to handle, peel off the dark skin and mash the flesh. Discard any hard or undercooked sections.',
 'Heat oil in a wide pan, sizzle cumin and cook chopped onion for 7–8 minutes until golden. Add minced ginger and garlic for 1 minute.',
 'Add chopped tomato, turmeric, chilli powder and salt. Cook for 8–10 minutes until the tomato becomes a thick masala.',
 'Fold in the mashed roasted brinjal and cook over medium-low heat for 8–10 minutes, stirring to evaporate excess moisture.',
 'Finish with chopped coriander, taste and serve hot with roti. For a smokier result, use a suitable grill following its instructions.'
],65);
add('bharli-vangi','small brinjal:800:g|roasted peanuts:80:g|grated coconut:60:g|onion:150:g|tamarind paste:20:g|jaggery:15:g|goda masala:8:g|turmeric powder:1:g|oil:30:ml|salt:5:g|water:350:ml',[
 'Wash the small brinjals and cut a cross into each from the base, keeping the stem end intact so they can hold stuffing.',
 'Grind roasted peanuts and coconut coarsely. Mix with finely chopped onion, tamarind, jaggery, goda masala, turmeric and salt.',
 'Gently fill each brinjal with the mixture, reserving the excess stuffing.',
 'Heat oil in a wide pan and arrange the brinjals in one layer. Cook for 4 minutes, turning carefully.',
 'Add reserved stuffing and measured water around them. Cover and simmer on low heat for 25–30 minutes, turning occasionally and adding a splash of hot water if dry.',
 'Check that a knife passes easily through the flesh to the stem end. Rest covered for 5 minutes and serve with the thick peanut gravy.'
],50);
add('lasaniya-bataka','small potatoes:800:g|garlic:45:g|tomato:250:g|oil:30:ml|cumin:3:g|red chilli powder:3:g|turmeric powder:1:g|coriander powder:5:g|salt:5:g|water:200:ml|coriander:12:g',[
 'Boil the potatoes until just tender, about 15–20 minutes depending on size. Cool slightly, peel and prick with a fork.',
 'Crush the garlic to a coarse paste and puree the tomato. Measure the spices.',
 'Heat oil, sizzle cumin and cook garlic over medium-low heat for 1–2 minutes without burning it.',
 'Add tomato, chilli, turmeric and coriander powder. Cook for 8–10 minutes until thick and fragrant.',
 'Add potatoes, salt and water. Cover and simmer for 12–15 minutes, turning occasionally until the garlic masala clings to the potatoes.',
 'Finish with chopped coriander and serve. Start with less chilli if serving people who prefer a milder curry.'
],45);
add('methi-malai-matar','fenugreek leaves:250:g|peas:350:g|onion:150:g|cashew:50:g|cream:120:ml|milk:150:ml|ginger:10:g|oil:20:ml|cumin:3:g|garam masala:1:g|salt:5:g|water:150:ml',[
 'Pick and wash fenugreek leaves, then chop finely. Soak cashews in hot water for 20 minutes and blend smooth with the measured water.',
 'Heat oil, sizzle cumin and soften finely chopped onion over medium-low heat for 7 minutes without deeply browning it. Add grated ginger for 1 minute.',
 'Add fenugreek and cook uncovered for 5–6 minutes until wilted and excess moisture has evaporated.',
 'Stir in peas, cashew paste and milk. Simmer gently for 8–10 minutes until the peas are tender, stirring the base.',
 'Lower the heat and add cream, salt and garam masala. Warm for 2–3 minutes without a vigorous boil.',
 'Adjust thickness with a little hot water and serve while the sauce is creamy and pourable.'
],40);
add('chana-saag','cooked chickpeas:700:g|spinach:450:g|tomato:250:g|onion:120:g|ginger:10:g|garlic:10:g|oil:25:ml|cumin:3:g|coriander powder:5:g|turmeric powder:1:g|salt:5:g|water:200:ml',[
 'Wash spinach in several changes of water and chop finely. Drain and rinse fully cooked chickpeas.',
 'Heat oil, sizzle cumin and soften chopped onion for 7 minutes. Add minced ginger and garlic and cook for 1 minute.',
 'Add chopped tomato, coriander powder and turmeric; cook for 8 minutes until pulpy.',
 'Add spinach in handfuls, stirring until wilted. Cook uncovered for 5 minutes.',
 'Add chickpeas, salt and water and simmer for 12–15 minutes. Mash a few chickpeas to thicken the greens.',
 'Check seasoning and serve hot; the sauce should cling to the chickpeas rather than remain watery.'
],40);
add('matki-usal','cooked moth beans:700:g|onion:150:g|tomato:250:g|grated coconut:50:g|oil:25:ml|cumin:3:g|goda masala:8:g|turmeric powder:1:g|red chilli powder:1:g|salt:5:g|water:300:ml|coriander:12:g',[
 'Use soaked moth beans or moth-bean sprouts already simmered until fully tender. Drain, reserving some cooking liquid if desired.',
 'Toast the coconut in a dry pan until lightly golden and set aside.',
 'Heat oil, sizzle cumin and cook chopped onion for 7 minutes. Add tomato and cook for another 7–8 minutes until pulpy.',
 'Add turmeric, chilli and goda masala, then the cooked moth beans, toasted coconut and measured water.',
 'Simmer gently for 12–15 minutes, stirring occasionally, until the beans have absorbed the masala.',
 'Add salt, finish with coriander and serve hot. Cook sprouts thoroughly rather than adding them raw at the end.'
],40);
add('ker-sangri','dried sangri:120:g|dried ker:60:g|curd:120:g|oil:35:ml|cumin:3:g|coriander powder:8:g|red chilli powder:2:g|turmeric powder:1:g|dried mango powder:4:g|salt:4:g|water:250:ml',[
 'Rinse the dried ker and sangri separately and soak in plenty of water overnight. Change the ker soaking water to reduce bitterness; trim any tough sangri ends.',
 'Drain and boil in fresh water for 20–30 minutes, or until tender. Drain thoroughly and discard the boiling water.',
 'Whisk curd with turmeric, coriander powder and chilli powder. Heat oil in a heavy pan and let cumin sizzle.',
 'Lower the heat and add the curd mixture gradually, stirring continuously until it comes to a gentle simmer.',
 'Add the cooked ker and sangri, salt and measured water. Cover and cook on low heat for 15 minutes, stirring occasionally.',
 'Uncover, add dried mango powder and reduce until the masala coats the vegetables. Taste before adding more salt or souring.'
],65,'Overnight soaking is additional. The dried vegetables must be tender before the final masala cooking.');

const riceProfiles={
 'bhuga-chawal':['onion:300:g','Brown sliced onion slowly in the oil for 15–20 minutes until deep golden but not black; this supplies the rice’s characteristic colour.'],
 'coconut-rice':['grated coconut:120:g|cashew:40:g|mustard seeds:3:g|curry leaves:5:g','Sizzle mustard seeds and curry leaves, toast cashews until golden, then stir in coconut for 1 minute without browning it.'],
 'spinach-rice':['spinach:300:g|peas:150:g','Wash and finely chop spinach. Wilt it in the spice oil for 3 minutes, then add peas before adding rice.'],
 'vegetable-tehri':['potato:200:g|carrot:150:g|peas:150:g|turmeric powder:2:g','Dice potato and carrot. Toss vegetables and turmeric in the spice oil for 4 minutes before adding rice.'],
 'millet-vegetable-pulao':['millet:300:g|carrot:150:g|green beans:150:g|peas:100:g','Rinse the millet and soak for 20 minutes, then drain. Dice vegetables and sauté in the spice oil for 3 minutes.'],
 'tamarind-rice':['tamarind paste:40:g|peanuts:70:g|mustard seeds:3:g|curry leaves:5:g|turmeric powder:1:g|jaggery:15:g','Sizzle mustard and curry leaves, toast peanuts, then add tamarind, jaggery and turmeric with 80 ml water. Simmer for 5 minutes to make a thick tangy paste.']
};
for(const [id,[extras,technique]] of Object.entries(riceProfiles)){
 const grain=id==='millet-vegetable-pulao'?'millet':'rice';const special=grain==='millet';
 add(id,`${special?'':`rice:300:g|`}${extras}|oil:25:ml|cumin:3:g|salt:5:g|water:${special?700:650}:ml`,[
 special?'Rinse and soak the millet as described below. Prepare all vegetables before heating the pan.':'Rinse the rice until the water runs less cloudy. Soak for 20 minutes, drain and measure fresh cooking water.',
 ['coconut-rice','tamarind-rice'].includes(id)?`Cook the drained rice with ${id==='tamarind-rice'?'570':'650'} ml of the water and salt: bring to a boil, cover on low heat for 12–15 minutes, then rest off the heat for 10 minutes. Spread out gently so steam can escape. Heat the oil separately and sizzle cumin before making the tempering.`:'Heat oil in a heavy saucepan, sizzle cumin and prepare the flavour base.',
 technique,
 ['coconut-rice','tamarind-rice'].includes(id)?'Fold the cooked rice gently into the prepared tempering or paste, keeping the grains separate. Warm over low heat for 2–3 minutes.':`Add drained ${grain}, cumin if not yet used, salt and measured water. Bring to a boil, cover tightly and simmer over low heat for ${special?'18–20':'12–15'} minutes until the liquid is absorbed.`,
 ['coconut-rice','tamarind-rice'].includes(id)?'Taste and adjust the salt. Rest for 5 minutes so the seasoning distributes through the grains.':'Switch off the heat and rest covered for 10 minutes without stirring. If the grains are still firm, sprinkle in a little boiling water and steam for another 3 minutes.',
 'Fluff gently with a fork and serve hot. Cool any rice intended for later use promptly and refrigerate rather than leaving it warm on the counter.'
 ],40);
}
const khichdiProfiles={
 'masala-khichdi':['rice:180:g|moong dal:140:g|peas:150:g|carrot:150:g|tomato:150:g','Add diced carrot, peas and chopped tomato to the tempering and cook for 3 minutes before adding the grains.'],
 'palak-khichdi':['rice:180:g|moong dal:140:g|spinach:350:g','Wash spinach thoroughly and chop it. Add it during the last 8 minutes so it stays greener.'],
 'millet-khichdi':['millet:180:g|moong dal:140:g|carrot:150:g|green beans:150:g','Dice carrot and beans and sauté for 3 minutes before adding the grains.'],
 'vegetable-dalia':['broken wheat:260:g|peas:150:g|carrot:150:g|tomato:150:g','Dry-roast the broken wheat over medium-low heat for 4 minutes, stirring, before beginning the tempering. Dice the vegetables.'],
 'sama-rice-khichdi':['barnyard millet:260:g|potato:300:g','Rinse the barnyard millet and peel and dice the potatoes. Use ingredients acceptable to your own fasting practice.']
};
for(const [id,[main,special]] of Object.entries(khichdiProfiles))add(id,`${main}|ghee:20:g|cumin:3:g|turmeric powder:1:g|salt:5:g|water:1200:ml`,[
 id==='vegetable-dalia'?'Pick over the clean packaged broken wheat and dry-roast it for 4 minutes, stirring; set aside. Measure the water.':'Pick over and rinse the grains and any lentils, then drain. Measure the fresh cooking water.',
 id==='palak-khichdi'?'Wash spinach thoroughly, chop it and reserve for the final 8 minutes of cooking.':'Wash and dice the listed vegetables into small even pieces. Peel potato or carrot where used and thaw frozen peas if necessary.',
 `Heat ghee in a deep saucepan, sizzle cumin and add turmeric on low heat. ${id==='palak-khichdi'?'Keep the spinach aside for later.':'Add the prepared vegetables and cook for 3 minutes.'} Add the prepared grains and any lentils and stir for 1 minute.`,
 'Add measured water and salt, bring to a boil, then cover loosely and simmer on low heat for 25–35 minutes, stirring occasionally.',
 'Add any reserved spinach near the end. Check that the grains and lentils are completely soft; if firm or dry, add boiling water and continue cooking.',
 'Stir to the desired soft, spoonable consistency, rest covered for 5 minutes and serve hot. The mixture thickens as it stands.'
],45);
