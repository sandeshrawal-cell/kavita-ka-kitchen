export const soupRecipes={};
const add=(id,ingredients,steps,time=40,tip='Cut vegetables evenly and check tenderness before serving; add hot water gradually when adjusting thickness.')=>soupRecipes[id]={ingredients,steps,time,tip};
add('pumpkin-soup','pumpkin:900:g|onion:150:g|garlic:10:g|olive oil:25:ml|water:900:ml|cream:80:ml|salt:5:g|black pepper:1:g',[
 'Peel and deseed pumpkin and cut into 2 cm cubes. Dice onion and mince garlic.',
 'Heat oil in a deep saucepan and soften onion for 6–8 minutes without browning. Add garlic and cook for 1 minute.',
 'Add pumpkin, water and salt. Bring to a boil, lower the heat and simmer partly covered for 20–25 minutes until the pumpkin breaks easily with a spoon.',
 'Remove from the heat and blend smooth with an immersion blender. If using a jug blender, cool first and follow its hot-liquid instructions.',
 'Return to low heat and stir in cream and pepper. Warm for 2–3 minutes, thinning with a little hot water if needed.',
 'Taste, adjust seasoning and serve hot in four bowls.'
]);
add('sweet-corn-soup','sweet corn:500:g|carrot:100:g|green beans:100:g|spring onion:60:g|cornflour starch:20:g|oil:15:ml|water:1100:ml|salt:5:g|white pepper:1:g|soy sauce:10:ml',[
 'Blend half the corn with 200 ml of the water into a coarse puree. Finely dice carrot and beans and slice spring onion, keeping the green tops separate.',
 'Heat oil and soften the white spring onion parts, carrot and beans for 3 minutes.',
 'Add corn puree, remaining whole corn and 800 ml water. Bring to a boil and simmer for 10–12 minutes until the vegetables are tender.',
 'Mix cornflour starch with the remaining 100 ml cold water until smooth. Stir the simmering soup and pour in the slurry slowly.',
 'Simmer for 3 minutes until lightly thickened and the starch is cooked. Add soy sauce, pepper and salt to taste.',
 'Scatter the reserved spring onion tops over the soup and serve hot.'
],30);
add('tomato-rasam','tomato:450:g|tamarind paste:20:g|water:1000:ml|cumin:4:g|black pepper:3:g|garlic:10:g|mustard seeds:3:g|curry leaves:5:g|turmeric powder:1:g|oil:15:ml|salt:5:g|coriander:15:g',[
 'Chop tomatoes and lightly crush cumin, pepper and garlic together. Dilute tamarind paste with the measured water.',
 'Put tomato, tamarind water, turmeric and salt in a saucepan. Simmer for 10–12 minutes until the tomato is soft.',
 'Add crushed cumin, pepper and garlic and simmer gently for 4–5 minutes until fragrant.',
 'Heat oil in a small pan, let mustard seeds pop and add curry leaves carefully. Pour this tempering into the rasam.',
 'Heat until foam appears around the edges, then turn off the heat; avoid prolonged boiling after tempering.',
 'Add chopped coriander, cover for 5 minutes and serve hot as a soup or rice accompaniment.'
],30);
add('mulligatawny-soup','masoor dal:160:g|carrot:180:g|onion:120:g|apple:150:g|tomato:200:g|ginger:10:g|garlic:8:g|curry powder:8:g|coconut milk:250:ml|oil:25:ml|water:1200:ml|lemon juice:25:ml|salt:5:g',[
 'Rinse red lentils. Peel and dice carrot and apple, chop onion and tomato, and mince ginger and garlic.',
 'Heat oil and soften onion and carrot for 6 minutes. Add ginger and garlic for 1 minute, then stir curry powder in for 20 seconds.',
 'Add lentils, apple, tomato, water and salt. Bring to a boil, skim foam and simmer partly covered for 25–30 minutes until the lentils and carrot are soft.',
 'Blend part or all of the soup with an immersion blender off the heat, depending on the texture you prefer.',
 'Stir in coconut milk and warm gently for 4 minutes. Thin with hot water if the soup is too thick.',
 'Turn off the heat, add lemon juice, taste and serve hot.'
],45);
add('vegetable-minestrone','onion:120:g|carrot:180:g|celery:100:g|zucchini:250:g|tomato:400:g|cooked white beans:400:g|eggless small pasta:100:g|garlic:10:g|olive oil:30:ml|water:1400:ml|dried oregano:2:g|basil:15:g|salt:6:g|black pepper:1:g',[
 'Dice onion, carrot, celery and zucchini into small even pieces. Chop tomatoes, mince garlic and drain fully cooked beans.',
 'Heat oil in a large saucepan and soften onion, carrot and celery for 8 minutes. Add garlic and oregano for 1 minute.',
 'Add tomatoes, water, salt and pepper. Simmer for 15 minutes until the carrot is nearly tender.',
 'Add zucchini and pasta and simmer for the pasta packet cooking time, usually 8–12 minutes, stirring so it does not stick.',
 'Add cooked beans for the final 5 minutes. Check the pasta is tender and adjust the liquid because it absorbs soup as it stands.',
 'Finish with torn basil and serve hot. For making ahead, cook and store the pasta separately, then combine on reheating.'
],45);
add('vegetable-stew','potato:300:g|carrot:200:g|green beans:150:g|peas:120:g|onion:100:g|ginger:12:g|coconut milk:500:ml|water:400:ml|coconut oil:20:ml|curry leaves:5:g|cinnamon:2:g|cardamom:1:g|salt:5:g|black pepper:1:g',[
 'Peel and cube potato and carrot, trim beans into short lengths, slice onion and cut ginger into thin strips.',
 'Heat coconut oil and add cinnamon, lightly crushed cardamom and curry leaves. Soften onion and ginger for 4 minutes without browning.',
 'Add potato, carrot, beans, water and salt. Cover and simmer for 12–15 minutes until the vegetables are nearly tender.',
 'Add peas and half the coconut milk. Simmer gently for 5–6 minutes until all vegetables are cooked.',
 'Lower the heat and stir in the remaining coconut milk and pepper. Heat through for 2 minutes without a vigorous boil.',
 'Taste, rest covered for 5 minutes and serve. Remove whole cinnamon and cardamom before eating.'
]);
add('avial','carrot:200:g|green beans:200:g|pumpkin:250:g|raw banana:200:g|grated coconut:150:g|curd:200:g|cumin:4:g|green chilli:5:g|turmeric powder:1:g|coconut oil:25:ml|curry leaves:5:g|salt:5:g|water:250:ml',[
 'Peel vegetables as needed and cut into similar finger-length batons. Blend coconut, cumin and chilli coarsely with 60 ml of the water.',
 'Put carrot, beans and raw banana in a wide pan with the remaining water, turmeric and salt. Cover and simmer for 8 minutes.',
 'Add pumpkin and cook another 7–10 minutes until all vegetables are tender but retain their shape.',
 'Fold in the coconut paste gently and cook on low heat for 4 minutes. The mixture should be moist with very little free liquid.',
 'Turn off the heat and let the pan cool for 2 minutes. Fold in smooth whisked curd without boiling it.',
 'Drizzle coconut oil and add torn curry leaves. Cover for 5 minutes before serving.'
]);
add('haak-saag','collard greens:800:g|mustard oil:25:ml|green chilli:8:g|asafoetida:0.5:g|salt:5:g|water:450:ml',[
 'Wash collard greens thoroughly in several changes of water. Strip away tough thick stems and cut large leaves into manageable pieces.',
 'Heat mustard oil according to its cooking instructions, then reduce to medium heat. Add asafoetida and slit green chillies briefly.',
 'Add the measured water carefully and bring it to a boil with salt.',
 'Add greens in batches, pressing them into the boiling liquid until wilted.',
 'Simmer partly covered for 20–25 minutes until the leaves are tender; add a little hot water if they begin to dry out.',
 'Taste and serve the greens with their light cooking broth. Avoid reducing the liquid to a dry masala.'
],35);
add('nadur-yakhni','lotus stem:650:g|curd:400:g|water:700:ml|ghee:25:g|fennel powder:6:g|dry ginger powder:3:g|cumin:3:g|cinnamon:2:g|cardamom:1:g|salt:5:g',[
 'Peel lotus stems, slice into 1 cm rounds and wash thoroughly through the holes to remove mud.',
 'Simmer in 500 ml of the water for 25–35 minutes, adding more boiling water if needed, until a knife enters easily. Drain, reserving some liquid.',
 'Whisk curd completely smooth with fennel powder, ginger powder and the remaining 200 ml water.',
 'Heat ghee, sizzle cumin, cinnamon and lightly crushed cardamom. Lower the heat and add the curd mixture gradually, stirring continuously.',
 'Once the sauce is gently steaming, add cooked lotus stem and salt. Simmer very gently for 10 minutes, stirring; do not boil hard.',
 'Adjust to a pourable sauce using reserved cooking liquid and serve hot. Remove whole spices before eating.'
],60);
add('ratatouille','brinjal:350:g|zucchini:350:g|capsicum:300:g|tomato:500:g|onion:150:g|garlic:15:g|olive oil:60:ml|dried thyme:2:g|basil:20:g|salt:6:g|black pepper:1:g',[
 'Cut brinjal, zucchini and capsicum into 2 cm pieces. Dice onion and tomato and mince garlic.',
 'Use half the oil to brown brinjal and zucchini in batches in a wide pan, about 5 minutes per batch. Transfer to a bowl.',
 'Add the remaining oil, soften onion and capsicum for 8 minutes, then add garlic and thyme for 1 minute.',
 'Add tomato, salt and pepper. Simmer uncovered for 10 minutes until the tomato breaks down.',
 'Return brinjal and zucchini to the pan, cover loosely and simmer for 15–20 minutes until tender, stirring gently.',
 'Uncover and reduce excess liquid if necessary. Finish with basil and serve hot or warm with bread or rice separately.'
],55);
add('vegetable-tagine','cooked chickpeas:400:g|carrot:250:g|pumpkin:350:g|zucchini:250:g|tomato:300:g|onion:150:g|dried apricot:80:g|olive oil:30:ml|cumin powder:4:g|cinnamon:2:g|paprika:4:g|water:450:ml|salt:5:g|lemon juice:25:ml|coriander:20:g',[
 'Cut carrot, pumpkin and zucchini into chunky pieces, chop onion and tomato, and halve the dried apricots.',
 'Heat oil in a heavy lidded saucepan and soften onion for 7 minutes. Add cumin, cinnamon and paprika for 20 seconds.',
 'Add tomato, carrot, pumpkin, apricots, water and salt. Bring to a simmer, cover and cook on low heat for 20 minutes.',
 'Add zucchini and drained cooked chickpeas. Cover and cook for another 12–15 minutes until the vegetables are tender.',
 'Uncover and simmer briefly if the sauce is watery; stir carefully to keep the pumpkin pieces intact.',
 'Turn off the heat, add lemon juice and coriander, and serve. Remove the cinnamon stick if used whole.'
],50);
