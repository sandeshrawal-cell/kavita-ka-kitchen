// Four modest servings. Each profile specifies the actual preparation, not a generic outline.
export const drinkRecipes = {};
const add=(id,ingredients,steps,time=10,tip='Serve freshly prepared. Adjust sweetness after tasting.')=>drinkRecipes[id]={ingredients,steps,time,tip};
const milkCoffee={
 'cafe-latte':['milk',720,'Steam or warm the milk to 60–65°C, then froth briefly to make a thin, glossy layer of microfoam.'],
 'flat-white':['milk',480,'Warm the milk to 60–65°C and create fine microfoam; tap and swirl the jug so no large bubbles remain.'],
 'cappuccino':['milk',480,'Steam or froth the warmed milk until its volume grows by roughly a third, producing a generous, fine foam.'],
 'cortado':['milk',120,'Warm the milk gently without creating a deep foam; use equal volumes of espresso and warm milk.'],
 'macchiato':['milk',80,'Froth the warmed milk in a narrow jug. Reserve the foam to mark each espresso with a small spoonful.'],
 'almond-latte':['almond milk',720,'Warm barista-style almond milk gently, then froth; avoid boiling, which can make it separate.'],
 'coconut-latte':['coconut milk drink',720,'Use a drinkable coconut milk beverage, not thick canned coconut cream. Warm gently and froth.'],
 'hazelnut-latte':['milk',720,'Warm the milk to 60–65°C and froth to a fine, pourable texture.','hazelnut syrup:60:ml'],
 'caramel-latte':['milk',720,'Warm the milk and froth it gently; stir caramel sauce into the espresso before adding milk.','caramel sauce:60:g'],
 'vanilla-latte':['milk',720,'Warm the milk and froth it gently; dissolve sugar and vanilla in the hot espresso.','vanilla extract:4:ml|sugar:40:g'],
 'cafe-mocha':['milk',720,'Whisk cocoa and sugar with a little hot espresso until smooth, then add the remaining espresso. Warm and froth the milk.','cocoa:24:g|sugar:48:g']
};
for(const [id,[milk,amount,technique,extra]] of Object.entries(milkCoffee))add(id,`ground espresso coffee:36:g|water:160:ml|${milk}:${amount}:ml${extra?'|'+extra:''}`,[
 'Set out four cups and warm them with hot water, then empty them. Measure the coffee and milk before brewing.',
 'Use an espresso machine to brew four single shots, using about 9 g coffee for each 30 ml shot. Aim for a steady extraction of about 25–30 seconds; follow your machine’s dose and basket instructions.',
 technique,
 id==='macchiato'?'Divide the espresso among four small cups and place a spoonful of milk foam on each; this drink stays mostly espresso.':id==='cortado'?'Divide the espresso among four small glasses, then add about 30 ml warm milk to each.':`Divide the espresso${extra?' and flavouring':''} between the cups and pour in the ${milk} evenly, keeping the foam appropriate to this drink.`,
 'Serve immediately while warm. If making the cups sequentially, prepare each milk portion shortly before serving so the foam remains fine.'
],10,'An espresso machine gives the intended concentration. Strong brewed coffee makes a different but usable home-style version.');

for(const [id,amount,sequence] of [['americano',600,'Pour espresso into each cup, then add hot water.'],['long-black',480,'Put hot water in each cup first, then pour the espresso gently over it to preserve more crema.']])add(id,`ground espresso coffee:36:g|water:${amount+160}:ml`,[
 'Measure the coffee and divide the water into 160 ml for brewing and the remainder for diluting the finished espresso.',
 'Brew four single espresso shots of approximately 30 ml each, following the machine’s basket dose and extraction instructions.',
 `Heat the dilution water until hot but no longer vigorously boiling; allow about ${amount/4} ml per cup.`,
 sequence,
 'Stir only if needed, taste for strength and serve promptly. Add a small extra splash of hot water if the drink is stronger than preferred.'
]);
for(const [id,grams,water,output,seconds] of [['espresso',36,160,30,'25–30'],['ristretto',36,120,20,'20–25'],['lungo',36,260,50,'35–45']])add(id,`ground espresso coffee:${grams}:g|water:${water}:ml`,[
 'Warm four small cups and prepare a clean espresso basket. Use freshly ground coffee suited to your machine.',
 'Dose approximately 9 g ground coffee for each single basket, distribute it evenly and tamp level. Do not exceed the basket’s rated dose.',
 `Extract each shot for approximately ${seconds} seconds, targeting about ${output} ml in the cup; stop by yield rather than allowing the water to run indefinitely.`,
 'If flow gushes out, use a finer grind next time; if it barely flows, use a slightly coarser grind. Change one variable at a time.',
 'Serve the four shots immediately, preparing sequentially if your machine has one group head.'
],8,'Machine, roast and basket size affect extraction; the stated yield is a starting point.');
add('aeropress-coffee','ground coffee:60:g|water:880:ml',[
 'Use a standard upright AeroPress, a rinsed paper filter and a sturdy mug. Heat water to about 85–95°C according to the roast.',
 'For each of four servings, add 15 g medium-fine ground coffee and about 220 ml hot water, keeping below the device’s fill limit.',
 'Stir gently to wet every ground, insert the plunger a little to form a seal, and steep for 60–90 seconds.',
 'Press slowly for about 30 seconds. Stop if resistance is excessive rather than forcing the plunger.',
 'Remove the brewer carefully, discard the grounds after cooling and repeat for the remaining cups. Taste and dilute slightly if desired.'
],12);
add('french-press-coffee','coarsely ground coffee:60:g|water:1000:ml',[
 'Warm a one-litre French press and four mugs; empty the warming water. Add the coarsely ground coffee.',
 'Bring the measured water to a boil and let it stand for about 30 seconds. Pour enough to saturate the grounds, then add the remainder.',
 'Stir once to wet all the coffee, place the lid on with the plunger raised and steep for 4 minutes.',
 'Press the filter down slowly and evenly. If it resists, stop and lift slightly before trying again; do not force it.',
 'Pour all the coffee into four cups or a warmed serving jug immediately so it does not continue steeping on the grounds.'
],8);
for(const id of ['pour-over-coffee','black-filter-coffee'])add(id,'medium-ground coffee:60:g|water:1000:ml',[
 'Place a paper filter in a suitable dripper, rinse it with hot water and discard that rinse water. Set the dripper securely over a heatproof server.',
 'Add the ground coffee and gently shake the dripper level. Heat the measured water to about 92–96°C.',
 'Pour about 120 ml over the grounds, wetting them evenly, and allow them to bloom for 30–45 seconds.',
 'Pour the remaining water in slow circles in several additions, allowing the water level to fall between pours. Aim for a total brew time of roughly 3–4 minutes.',
 'Let the final water drain, remove the filter, swirl the server and divide the brewed black coffee between four cups.'
],8);
add('moka-pot-coffee','medium-fine ground coffee:30:g|water:360:ml',[
 'Use a moka pot sized for approximately six espresso-size cups; follow its fill markings if they differ from these quantities.',
 'Fill the bottom chamber with water below the safety valve. Fill the filter basket level with coffee without tamping or compressing it.',
 'Check that the rim and gasket are clean, then screw the pot together securely. Place it over medium-low heat with the handle away from the flame.',
 'When coffee begins entering the upper chamber, reduce the heat so the flow remains gentle. Remove from heat as it begins to sputter.',
 'Stir the collected coffee and divide among four small cups. Let the pot cool fully before opening it.'
],10);
add('cafe-au-lait','medium-ground coffee:36:g|water:600:ml|milk:500:ml',[
 'Brew the coffee with the measured water using a filter or French press. Strain out all grounds.',
 'Warm the milk in a small saucepan over medium-low heat, stirring to keep the base from catching.',
 'When the milk is steaming but not boiling, remove it from the heat. A little froth is optional.',
 'Divide the brewed coffee into four warmed cups and add an approximately equal amount of hot milk to each.',
 'Stir gently and serve straight away; this drink uses brewed coffee rather than an espresso base.'
]);
for(const [id,flavour,qty,unit] of [['cardamom-coffee','cardamom',2,'g'],['cinnamon-coffee','cinnamon',2,'g'],['turmeric-coffee','turmeric powder',1,'g']])add(id,`instant coffee:8:g|milk:800:ml|water:160:ml|sugar:32:g|${flavour}:${qty}:${unit}`,[
 `${flavour==='turmeric powder'?'Break up any lumps in the measured turmeric powder with the back of a spoon':'Lightly crush the '+(flavour==='cardamom'?'cardamom pods':'cinnamon stick')}. Measure the milk, water and coffee.`,
 `Warm the milk with ${flavour} over low heat for 4–5 minutes, stirring occasionally; do not let it boil over.`,
 'Dissolve instant coffee and sugar in the hot measured water in a heatproof jug.',
 `Strain the spiced milk${flavour==='turmeric powder'?' through a fine sieve if any lumps remain':''} into the coffee and stir well.`,
 'Taste, divide between four mugs and serve immediately. Reduce sugar for a less sweet drink.'
]);
add('turkish-coffee','very finely ground coffee:28:g|water:280:ml|sugar:16:g|cardamom powder:0.5:g',[
 'Put the cold water, very finely ground coffee, sugar and cardamom into a cezve or small narrow saucepan and stir once.',
 'Heat over low heat without stirring again, allowing the foam to rise slowly over 3–4 minutes.',
 'As the foam reaches the rim, lift the pot off the heat before it boils over. Spoon a little foam into each small cup.',
 'Return to low heat briefly until the coffee rises once more, then remove it from the heat and pour gently into four cups.',
 'Wait 1–2 minutes for the fine grounds to settle before sipping; leave the sediment at the bottom of the cup.'
],8);
add('dalgona-coffee','instant coffee:16:g|sugar:48:g|hot water:40:ml|milk:800:ml|ice:200:g',[
 'Place instant coffee, sugar and hot water in a narrow mixing bowl. Ground coffee will not whip in the same way.',
 'Whisk with an electric whisk for 3–5 minutes, or by hand longer, until pale, thick and able to hold soft peaks.',
 'Divide the ice between four glasses and pour 200 ml chilled milk into each.',
 'Spoon the whipped coffee evenly over the milk, keeping a little headroom so the drink can be stirred.',
 'Serve with a spoon and stir the foam thoroughly into the milk before drinking.'
],10);
const iced={
 'iced-americano':['water',600,'Pour the cool water over ice, then add the freshly brewed espresso.'],
 'iced-latte':['milk',720,'Pour chilled milk over ice, then add the espresso slowly.'],
 'espresso-tonic':['tonic water',600,'Pour chilled tonic gently over ice first; add espresso slowly down the glass to reduce foaming.'],
 'sparkling-americano':['sparkling water',600,'Add chilled sparkling water to the ice, then pour in the espresso slowly.'],
 'orange-espresso':['orange juice',600,'Pour chilled orange juice over ice, then gently add espresso for a layered drink.'],
 'coffee-lemonade':['water',560,'Stir 60 ml lemon juice and 60 g sugar into the cool water before pouring over ice; then add espresso.','lemon juice:60:ml|sugar:60:g']
};
for(const [id,[liquid,amount,finish,extra]] of Object.entries(iced))add(id,`ground espresso coffee:36:g|water:160:ml|${liquid}:${amount}:ml|ice:320:g${extra?'|'+extra:''}`,[
 'Chill four tall glasses and measure the dilution liquid. Prepare clean drinking-water ice.',
 'Brew four single espresso shots, about 30 ml each, using 9 g ground coffee per shot. Leave them to stop steaming for a minute.',
 'Divide the ice evenly between the four glasses.',finish,
 'Serve immediately. Stir gently if you prefer a uniform flavour; do not shake drinks containing sparkling water.'
]);
add('cold-coffee','instant coffee:8:g|water:40:ml|milk:800:ml|sugar:40:g|ice:240:g',[
 'Dissolve the instant coffee and sugar in the small amount of hot water, then cool completely.',
 'Put the chilled milk and cooled coffee mixture into a blender.',
 'Blend for 15–20 seconds until evenly mixed and lightly frothy; taste and adjust sweetness.',
 'Divide the ice among four glasses and pour the coffee over it.',
 'Serve immediately while the froth remains airy. Keep the milk refrigerated until use.'
]);
add('nitro-cold-brew','coarsely ground coffee:100:g|water:1000:ml',[
 'Combine the ground coffee and cold drinking water in a clean covered container and refrigerate for 12–16 hours.',
 'Strain through a fine sieve followed by a paper coffee filter, allowing it to drain without squeezing the grounds.',
 'Chill the filtered coffee thoroughly. Prepare a beverage dispenser specifically rated for nitrogen-infused cold coffee.',
 'Charge and dispense only according to that appliance’s manufacturer instructions, using its specified food-grade nitrogen cartridge; never improvise with another gas or container.',
 'Pour into four glasses and serve immediately without stirring away the cascading foam. Without a rated dispenser, serve as ordinary cold brew.'
],15,'Allow 12–16 hours cold steeping in addition to preparation time. Nitrogen equipment is required for the nitro texture.');
add('vietnamese-style-coffee','ground coffee:60:g|water:360:ml|condensed milk:160:g|ice:320:g',[
 'Spoon 40 g sweetened condensed milk into each of four heatproof glasses.',
 'For each serving, place 15 g coffee in a phin filter, fit the press gently and set it over the glass.',
 'Add a little of the hot measured water to wet the grounds, wait 30 seconds, then add the rest of that serving’s 90 ml water.',
 'Cover and let the coffee drip for approximately 4–5 minutes. Remove the phin and stir the coffee into the condensed milk.',
 'Let the mixture stop steaming, then pour over fresh ice in four serving glasses. Serve immediately.'
],12);
add('affogato','ground espresso coffee:36:g|water:160:ml|eggless vanilla ice cream:320:g',[
 'Chill four small dessert glasses. Keep the eggless vanilla ice cream frozen until the coffee is ready.',
 'Brew four single espresso shots, approximately 30 ml each, following your espresso machine’s instructions.',
 'Place two small scoops, about 80 g in total, into each chilled dessert glass.',
 'Immediately pour one hot espresso shot over each portion of ice cream.',
 'Serve at once with spoons, while there is still a contrast between hot coffee and cold ice cream.'
],8);
add('hot-chocolate','milk:900:ml|cocoa:32:g|sugar:48:g|dark chocolate:60:g|vanilla extract:2:ml',[
 'Whisk the cocoa and sugar with 100 ml of the milk in a saucepan until there are no dry lumps.',
 'Add the remaining milk gradually while whisking, then place the pan over medium-low heat.',
 'Heat for 4–5 minutes, stirring, until steaming. Add the chopped dark chocolate and whisk until completely melted.',
 'Remove from the heat and stir in vanilla. Do not boil hard, which can scorch the milk.',
 'Divide among four mugs and serve warm. This recipe contains no coffee.'
]);

const shakes={
 'banana-shake':['banana:400:g|dates:40:g','Peel and slice the bananas; remove the pits from the dates.'],
 'anjeer-shake':['dried figs:120:g|almond:24:g','Trim the stems from the dried figs and soak them in warm water for 20–30 minutes, then drain. Soak the almonds as well and peel if preferred.'],
 'apple-shake':['apple:400:g|cinnamon powder:1:g','Wash, core and chop the apples; peel them if you prefer a smoother drink.'],
 'avocado-shake':['avocado:320:g|honey:32:g','Halve the ripe avocados, remove the stones and scoop the flesh out of the skin.'],
 'chikoo-shake':['chikoo:400:g|dates:32:g','Peel the ripe chikoo, remove every hard seed and discard any tough core. Pit and chop the dates.'],
 'chocolate-shake':['cocoa:24:g|eggless vanilla ice cream:240:g|sugar:24:g','Whisk the cocoa with a small portion of milk first so dry lumps will not remain.'],
 'coffee-shake':['instant coffee:8:g|eggless vanilla ice cream:240:g|sugar:24:g','Dissolve the instant coffee in a tablespoon of warm water, then cool completely.'],
 'dates-shake':['dates:140:g|almond:24:g','Pit the dates and soak firm ones in warm water for 15 minutes; drain before blending.'],
 'dry-fruit-shake':['almond:40:g|cashew:40:g|pistachio:24:g|dates:48:g','Soak the nuts and pitted dates for 30 minutes, drain, and peel the almonds if desired.'],
 'guava-shake':['guava:400:g|honey:32:g','Wash ripe guavas, trim the ends and chop. Blend the fruit with a little water, then strain firmly to remove the hard seeds.'],
 'kesar-badam-shake':['almond:80:g|saffron:0.5:g|sugar:40:g','Soak the almonds for 4 hours, drain and peel. Steep the saffron in two tablespoons of warm milk for 10 minutes, then cool.'],
 'mango-shake':['mango:500:g|sugar:32:g','Peel ripe mangoes and cut the flesh away from the stones. Taste the fruit before adding all the sugar.'],
 'mixed-berry-shake':['mixed berries:400:g|curd:160:g|sugar:32:g','Wash and sort the berries. If using frozen berries, follow the packet’s instructions for any required heat treatment and cool before use.'],
 'muskmelon-shake':['muskmelon:500:g|cardamom powder:0.5:g|sugar:24:g','Scrub the whole melon before cutting. Remove the rind and seeds, then cut the flesh into small pieces.'],
 'oreo-shake':['eggless chocolate sandwich biscuits:120:g|eggless vanilla ice cream:200:g','Check that the biscuits and ice cream are eggless, then break the biscuits into small pieces.'],
 'papaya-shake':['papaya:500:g|dates:32:g','Peel the ripe papaya, scrape out all seeds and chop the flesh. Remove pits from the dates.'],
 'peanut-butter-banana-shake':['banana:360:g|peanut butter:80:g','Peel and slice the bananas. Stir the peanut butter in its jar so its oil is evenly mixed.'],
 'peanut-butter-shake':['peanut butter:100:g|banana:200:g','Measure the peanut butter and peel the banana. This version is more peanut-forward than the banana shake.'],
 'pomegranate-shake':['pomegranate arils:400:g|dates:40:g','Pick away all white pith from the pomegranate arils. Pulse the arils briefly with a little milk and strain out the hard seed centres.'],
 'rose-shake':['rose syrup:80:ml|basil seeds:12:g','Soak the basil seeds in plenty of drinking water for 15 minutes until fully swollen, then drain. Reserve them for the finished drink.'],
 'strawberry-shake':['strawberry:400:g|sugar:40:g','Wash and hull the strawberries, then halve large ones. Taste a berry before deciding how much sugar to add.'],
 'tender-coconut-shake':['tender coconut flesh:320:g|coconut water:200:ml|cardamom powder:0.5:g','Use fresh tender coconut flesh, removing any hard shell fragments. Strain the coconut water.'],
 'vanilla-shake':['eggless vanilla ice cream:320:g|vanilla extract:4:ml','Check that the ice cream is eggless and let it soften for only 2–3 minutes so it blends easily.']
};
for(const [id,[fruit,prep]] of Object.entries(shakes))add(id,`milk:720:ml|${fruit}`,[
 prep,
 'Chill the milk and four serving glasses. Measure all ingredients before blending; keep any soaked basil seeds aside.',
 'Put the fruit or flavour base in the blender with about one quarter of the milk. Blend for 30–45 seconds until the base is smooth.',
 'Add the remaining milk and the other ingredients, excluding any reserved basil seeds. Blend for another 15–20 seconds; scrape the jug if necessary.',
 'Taste for sweetness and thickness. Add a small splash of cold milk if too thick; use less sweetener when the fruit is already sweet.',
 id==='rose-shake'?'Divide the soaked basil seeds between the glasses, pour in the rose milkshake and stir gently before serving.':'Pour into four glasses and serve immediately. Refrigerate ingredients promptly rather than leaving milk drinks at room temperature.'
],id==='kesar-badam-shake'?20:10,'Soaking time, where stated, is additional. Use chilled milk; the recipe makes four modest glasses.');
add('kiwi-shake','ripe kiwi:400:g|coconut milk drink:720:ml|sugar:32:g',[
 'Peel the ripe kiwi and cut away any hard stem ends. Reserve a few slices if you want a garnish.',
 'Use chilled coconut milk beverage here: fresh kiwi can make dairy milk taste bitter if left standing.',
 'Blend the kiwi with 180 ml of the coconut milk for 20–30 seconds until smooth.',
 'Add the remaining coconut milk and sugar, then blend briefly. Taste and adjust sweetness according to the fruit.',
 'Pour into four chilled glasses and serve immediately; do not store this drink for a long period.'
],10);
add('pineapple-shake','pineapple:400:g|milk:720:ml|sugar:32:g|vanilla extract:2:ml',[
 'Use drained canned pineapple, or simmer fresh peeled pineapple pieces in a little water for 5 minutes and cool completely. Heating prevents fresh pineapple enzymes from turning a stored milkshake bitter.',
 'Drain excess liquid and chill the pineapple and milk before blending.',
 'Blend pineapple with about 180 ml milk until smooth, then add the remaining milk, sugar and vanilla.',
 'Blend briefly until frothy; taste before adding more sugar because canned fruit may already be sweetened.',
 'Divide into four glasses and serve immediately. Do not blend hot fruit with cold dairy.'
],15);
for(const [id,ingredients,prep] of [
 ['green-apple-smoothie','apple:320:g|spinach:60:g|curd:480:g|water:240:ml|honey:32:g','Wash the apples and spinach thoroughly. Core and chop the apples, discarding the seeds.'],
 ['strawberry-smoothie','strawberry:360:g|curd:480:g|banana:200:g|water:160:ml','Wash and hull the strawberries; peel and slice the banana.'],
 ['banana-oat-smoothie','banana:320:g|rolled oats:80:g|milk:720:ml|dates:48:g|cinnamon powder:1:g','Soak rolled oats in the milk for 15 minutes. Peel the bananas and remove every date pit.']
])add(id,ingredients,[prep,'Put the fruit and a small amount of the measured liquid into a blender and blend until the fruit is broken down.','Add the remaining ingredients and blend for 45–60 seconds, stopping once to scrape down the sides.','Check for unblended pieces. Thin with a little cold water or milk if necessary; avoid adding so much that the drink loses its smoothie texture.','Divide between four glasses and serve immediately while cold.'],10);
add('ginger-tea','black tea:8:g|ginger:16:g|water:500:ml|milk:400:ml|sugar:40:g',[
 'Wash and lightly crush the ginger. Put it into a saucepan with the measured water.',
 'Bring to a boil and simmer for 3 minutes so the water takes on the ginger flavour.',
 'Add the black tea and simmer for 1–2 minutes, then add milk and sugar.',
 'Heat until the tea rises toward the rim, lower the heat and simmer for 1 minute while watching to prevent boiling over.',
 'Strain into four cups and serve hot. Shorten the tea simmer if you prefer less bitterness.'
]);
add('kashmiri-kahwa','green tea:5:g|water:900:ml|cardamom:2:g|cinnamon:2:g|saffron:0.5:g|almond:24:g|sugar:32:g',[
 'Crush the cardamom lightly and slice the almonds. Put the water, cardamom and cinnamon in a saucepan.',
 'Bring to a gentle boil and simmer for 3–4 minutes to infuse the spices.',
 'Turn off the heat and let the water cool for about a minute. Add green tea and saffron and steep for 2 minutes.',
 'Strain promptly so the green tea does not become bitter, then stir in sugar to taste.',
 'Divide the sliced almonds between four cups, pour the kahwa over them and serve warm.'
]);
add('lemon-tea','black tea:6:g|water:900:ml|lemon juice:40:ml|sugar:32:g',[
 'Heat the drinking water to a boil, then take the pan off the heat.',
 'Add black tea and steep for 2–3 minutes according to the leaf size; avoid a prolonged boil.',
 'Strain the tea into a warm jug and dissolve the sugar while the tea is hot.',
 'Add lemon juice gradually, tasting after each addition so the tea is pleasantly tart.',
 'Divide among four cups and serve warm. Do not add milk to this lemon tea.'
]);
add('tulsi-tea','tulsi leaves:12:g|water:900:ml|lemon juice:20:ml|honey:24:g',[
 'Rinse the tulsi leaves carefully and discard damaged leaves or tough stems.',
 'Bring the water to a gentle boil, add the tulsi and simmer on low heat for 3 minutes.',
 'Turn off the heat, cover and steep for another 3 minutes.',
 'Strain, allow to cool slightly, then stir in lemon juice and honey to taste.',
 'Divide among four cups and serve warm. This is an herbal drink, not a substitute for medical treatment.'
]);
add('saffron-milk','milk:900:ml|saffron:0.5:g|sugar:40:g|cardamom powder:0.5:g',[
 'Warm two tablespoons of the measured milk and crumble the saffron into it; leave for 10 minutes.',
 'Heat the remaining milk in a heavy saucepan over medium-low heat, stirring the base frequently.',
 'When steaming, add sugar, cardamom and the saffron infusion. Simmer gently for 3–4 minutes without boiling over.',
 'Taste and adjust sweetness. Stir so the saffron colour is evenly distributed.',
 'Divide into four small cups and serve warm, or cool promptly and refrigerate for a chilled version.'
],15);
add('rose-milk','milk:900:ml|rose syrup:80:ml',[
 'Chill the milk and four glasses before beginning.',
 'Put the rose syrup into a jug and add about 100 ml of the milk.',
 'Stir until the syrup is completely dissolved with no thick layer remaining at the bottom.',
 'Add the remaining milk and stir again. Taste before adding any extra syrup because brands differ in sweetness.',
 'Pour into the chilled glasses and serve promptly.'
],5);
add('orange-juice','orange:1600:g',[
 'Wash and dry the oranges before cutting, even though the peel will not be used.',
 'Halve the oranges across their centres and juice them with a citrus press.',
 'Remove all seeds; strain through a coarse sieve only if you want less pulp.',
 'Stir the collected juice and divide evenly among four glasses. Yield depends on how juicy the fruit is.',
 'Serve immediately, or refrigerate in a clean covered jug and use the same day.'
],10);
add('watermelon-juice','watermelon flesh:1200:g|lemon juice:24:ml',[
 'Wash the outside of the melon before cutting. Remove the rind and any mature black seeds.',
 'Cut the flesh into blender-sized pieces and chill if time allows.',
 'Blend the watermelon without added water until smooth; the fruit supplies enough liquid.',
 'Stir in lemon juice and strain only if you prefer a very smooth drink.',
 'Divide between four glasses and serve cold. Refrigerate unused juice promptly and use the same day.'
],10);
add('jaljeera','mint:30:g|coriander:20:g|lemon juice:60:ml|roasted cumin powder:6:g|black salt:3:g|sugar:16:g|water:1000:ml',[
 'Wash the mint and coriander thoroughly, discard coarse stems and drain.',
 'Blend the herbs with lemon juice and 100 ml of the measured water to a fine paste.',
 'Strain into a jug if desired, pressing the herb pulp to extract the flavour.',
 'Stir in the remaining chilled water, roasted cumin, black salt and sugar until dissolved.',
 'Taste and balance the sourness and salt, then divide among four glasses. Stir again just before pouring because the spices settle.'
],10);
