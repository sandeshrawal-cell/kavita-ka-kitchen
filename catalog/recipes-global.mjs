export const globalRecipes={};
const add=(id,ingredients,steps,time=35,tip='Prepare and measure every component before heating the pan; serve promptly for the best texture.')=>globalRecipes[id]={ingredients,steps,time,tip};
const noodles={
 'vegetable-hakka-noodles':['eggless wheat noodles:320:g','soy sauce:30:ml|rice vinegar:20:ml|black pepper:1:g','Boil noodles in plenty of water for the packet time, stopping while still slightly firm. Drain, rinse briefly and toss with 5 ml of the measured oil.'],
 'vegetable-chow-mein':['eggless wheat noodles:320:g','soy sauce:30:ml|rice vinegar:20:ml|sesame oil:10:ml|sugar:8:g','Cook noodles just short of the packet time, drain very well and spread out for 5 minutes so excess steam escapes.'],
 'roti-noodles':['cooked roti:450:g','soy sauce:25:ml|tomato ketchup:35:g|rice vinegar:15:ml','Stack fully cooked, safely refrigerated rotis and slice into thin strips. Separate the strips gently; do not boil them.']
};
for(const [id,[base,sauce,prep]] of Object.entries(noodles))add(id,base+'|'+sauce+'|carrot:150:g|cabbage:200:g|capsicum:180:g|spring onion:80:g|garlic:12:g|ginger:10:g|oil:30:ml|salt:3:g',[
 prep,'Cut carrot, cabbage and capsicum into thin strips. Slice spring onion, reserving green tops, and mince garlic and ginger.',
 'Mix the listed sauces, vinegar, pepper or sugar in a small bowl before stir-frying.',
 'Heat a large wok over medium-high heat. Add remaining oil, ginger, garlic and spring onion whites and stir for 30 seconds. Add carrot, cabbage and capsicum and toss for 3–4 minutes, keeping a slight crunch.',
 'Add the prepared noodles or roti strips and the sauce mixture. Toss with two spatulas for 2–3 minutes until evenly coated and piping hot; work in batches if the pan is crowded.',
 'Taste before adding salt because soy sauce is salty. Finish with spring onion greens and serve immediately.'
],30);
const tofuProfiles={
 'sesame-tofu':['sesame seeds:20:g|soy sauce:35:ml|rice vinegar:20:ml|maple syrup:30:ml|cornflour starch:15:g|water:120:ml','Whisk soy sauce, vinegar, maple syrup, starch and water until smooth.','Pour sauce into the pan and stir for 2–3 minutes until glossy; fold in tofu and toasted sesame seeds.'],
 'kung-pao-tofu':['roasted peanuts:70:g|dried red chilli:4:g|soy sauce:35:ml|rice vinegar:25:ml|sugar:20:g|cornflour starch:15:g|water:120:ml','Whisk soy sauce, vinegar, sugar, starch and water. Break dried chillies into pieces and shake out seeds for less heat.','Briefly stir-fry dried chillies with the vegetables, add sauce and simmer for 2–3 minutes until glossy. Return tofu and add peanuts.'],
 'thai-basil-tofu':['basil:40:g|soy sauce:35:ml|vegetarian mushroom stir-fry sauce:30:ml|sugar:10:g|green chilli:8:g|water:70:ml','Mix soy sauce, vegetarian mushroom sauce, sugar and water. Slice chilli finely and pick basil leaves.','Add chilli and sauce and bubble for 2 minutes; return tofu, toss, turn off the heat and fold in basil just until wilted.']
};
for(const [id,[extra,prep,finish]] of Object.entries(tofuProfiles))add(id,'firm tofu:600:g|capsicum:250:g|spring onion:80:g|garlic:15:g|ginger:12:g|oil:35:ml|'+extra,[
 'Drain tofu, wrap in a clean towel and press under a light plate for 15 minutes. Cut into 2 cm cubes; dice capsicum and slice spring onion.',prep,
 'Heat half the oil in a wide non-stick pan and brown tofu for 8–10 minutes, turning gently. Transfer to a plate.',
 'Add remaining oil, minced garlic, ginger and spring onion whites. Stir for 30 seconds, add capsicum and stir-fry for 3 minutes.',finish,
 'Finish with spring onion greens and taste before adding any extra salt. Serve with separately prepared rice if desired.'
],35);
add('vegetarian-pad-thai','rice noodles:300:g|firm tofu:400:g|bean sprouts:200:g|spring onion:80:g|garlic:12:g|tamarind paste:35:g|soy sauce:40:ml|jaggery:35:g|water:100:ml|oil:35:ml|roasted peanuts:60:g|lime:120:g',[
 'Soak or cook rice noodles according to their packet until flexible but still firm, then drain. Press and cube tofu and slice spring onion.',
 'Dissolve jaggery with water, tamarind and soy sauce in a small pan for 2 minutes, then set aside.',
 'Heat half the oil and brown tofu for 8 minutes. Transfer to a plate; add remaining oil and minced garlic and stir for 30 seconds.',
 'Add drained noodles and sauce and toss for 3–5 minutes until the noodles are tender and sauce mostly absorbed. Add a small splash of water if they remain firm.',
 'Return tofu and add sprouts and spring onion. Toss for 3–4 minutes until sprouts are thoroughly cooked and everything is hot.',
 'Serve with crushed peanuts and lime wedges. This version omits both egg and fish sauce; check purchased sauces are vegetarian.'
],35);
add('vegetable-udon','eggless udon noodles:600:g|firm tofu:300:g|mushroom:250:g|carrot:150:g|bok choy:300:g|spring onion:60:g|ginger:15:g|soy sauce:45:ml|sesame oil:15:ml|water:1400:ml|dried shiitake:15:g',[
 'Soak dried shiitake in 300 ml hot water for 20 minutes. Slice rehydrated mushrooms and strain the soaking liquid through a fine sieve to remove grit.',
 'Slice carrot thinly, quarter fresh mushrooms, separate bok choy stems and leaves and cube tofu.',
 'Simmer ginger slices, shiitake, strained soaking liquid and remaining water for 10 minutes. Add soy sauce, carrot and fresh mushrooms for another 6–8 minutes.',
 'Cook udon according to its packet in a separate pan, then drain and divide between four bowls.',
 'Add tofu and bok choy stems to the broth for 3 minutes, then add the leaves for 2 minutes until wilted and tender.',
 'Ladle broth and vegetables over noodles, drizzle sesame oil and add sliced spring onion. Use noodles and broth ingredients without egg, fish or bonito.'
],40);
add('tofu-scramble','firm tofu:600:g|tomato:200:g|spinach:200:g|onion:120:g|olive oil:25:ml|turmeric powder:1:g|cumin powder:3:g|salt:4:g|black pepper:1:g|water:60:ml',[
 'Drain tofu and crumble into bite-size pieces. Chop onion and tomato and wash and roughly chop spinach.',
 'Heat oil in a wide skillet and soften onion for 6 minutes.',
 'Add tomato, turmeric and cumin and cook for 4–5 minutes until pulpy.',
 'Add crumbled tofu, salt, pepper and measured water. Cook for 5 minutes, stirring gently so some curds stay intact.',
 'Fold in spinach and cook for 3–4 minutes until wilted and hot throughout.',
 'Taste and serve while moist. Toast or roti can be prepared separately as an accompaniment.'
],25);
add('tofu-fajitas','firm tofu:600:g|capsicum:400:g|onion:180:g|eggless flour tortillas:320:g|oil:35:ml|lime juice:35:ml|cumin powder:5:g|paprika:5:g|salt:5:g|coriander:20:g',[
 'Press tofu for 15 minutes and cut into thick strips. Slice capsicum and onion into similar strips.',
 'Mix oil, lime juice, cumin, paprika and salt. Toss half with tofu and half with the vegetables.',
 'Heat a large skillet and brown tofu for 8–10 minutes, turning gently; transfer to a warm plate.',
 'Cook capsicum and onion in the same skillet for 6–8 minutes until lightly charred at the edges but still slightly crisp.',
 'Warm tortillas briefly in a dry pan and keep wrapped in a cloth.',
 'Divide tofu and vegetables among tortillas, add coriander and fold. Serve immediately.'
],35);
add('black-bean-tacos','cooked black beans:700:g|corn tortillas:320:g|tomato:300:g|onion:100:g|avocado flesh:250:g|coriander:20:g|lime juice:35:ml|oil:25:ml|cumin powder:4:g|paprika:3:g|salt:5:g|water:100:ml',[
 'Drain and rinse cooked black beans. Finely chop onion and tomato, and slice avocado.',
 'Reserve half the onion for salsa. Heat oil and soften the rest for 4 minutes, then stir in cumin and paprika for 20 seconds.',
 'Add beans, water and half the salt. Simmer for 8 minutes, mashing a spoonful to bind the filling.',
 'Mix tomato, reserved onion, coriander, lime juice and remaining salt into a fresh salsa.',
 'Warm tortillas in a dry skillet for 20–30 seconds per side until flexible.',
 'Fill with beans, salsa and avocado, then fold and serve promptly.'
],30);
const pastas={
 'pasta-arrabbiata':['eggless penne:350:g|tomato:700:g|garlic:20:g|red chilli flakes:4:g|olive oil:35:ml|basil:20:g|salt:6:g','Warm oil over medium-low heat and cook sliced garlic and chilli flakes for 1 minute without browning. Add finely chopped tomato and half the salt and simmer for 18–20 minutes until thick.'],
 'pasta-primavera':['eggless pasta:350:g|carrot:150:g|zucchini:250:g|peas:150:g|capsicum:200:g|garlic:15:g|olive oil:40:ml|lemon juice:30:ml|vegetarian hard cheese:60:g|salt:6:g|black pepper:1:g','Cut vegetables into thin bite-size pieces. Heat oil, soften carrot for 3 minutes, then add garlic, zucchini, peas and capsicum for 5–6 minutes until tender-crisp. Add pepper and half the salt.'],
 'gnocchi-with-tomato-sauce':['eggless potato gnocchi:700:g|tomato:650:g|garlic:15:g|olive oil:35:ml|basil:20:g|vegetarian hard cheese:60:g|salt:6:g','Check gnocchi is eggless. Heat oil, soften minced garlic for 30 seconds, add chopped tomato and half the salt, and simmer for 18–20 minutes until saucy.']
};
for(const [id,[ingredients,method]] of Object.entries(pastas))add(id,ingredients,[
 'Bring a large saucepan of water to a boil and add half the salt. Measure the other ingredients and prepare the vegetables.',method,
 id.startsWith('gnocchi')?'Boil gnocchi according to its packet, usually until it floats plus 1 minute. Lift out gently with a slotted spoon.':'Cook pasta for the packet time until tender with a slight bite. Reserve 200 ml pasta water before draining.',
 'Add the cooked pasta or gnocchi to the sauce and toss gently over low heat for 1–2 minutes. Add a splash of cooking water if needed to make the sauce cling.',
 id==='pasta-primavera'?'Turn off heat and add lemon juice and grated vegetarian hard cheese.':'Turn off heat and add torn basil; add grated vegetarian hard cheese if listed.',
 'Taste, divide among four bowls and serve hot. Choose cheese made with vegetarian rennet.'
],35);
add('vegetarian-thai-green-curry','firm tofu:500:g|brinjal:300:g|green beans:200:g|capsicum:150:g|coconut milk:600:ml|vegetarian Thai green curry paste:60:g|oil:20:ml|water:200:ml|soy sauce:25:ml|sugar:12:g|basil:25:g|lime juice:25:ml',[
 'Check that green curry paste contains no shrimp paste or fish sauce. Cube tofu and brinjal and trim beans into short lengths.',
 'Heat oil in a saucepan and cook curry paste for 1–2 minutes over medium heat until fragrant.',
 'Stir in 200 ml coconut milk and simmer for 3 minutes, then add remaining coconut milk and water.',
 'Add brinjal and beans and simmer gently for 8 minutes. Add tofu and capsicum for another 6–8 minutes until vegetables are tender.',
 'Season with soy sauce and sugar, tasting because curry pastes differ in salt and heat.',
 'Turn off the heat, stir in basil and lime juice, and serve with separately cooked rice.'
],35);
