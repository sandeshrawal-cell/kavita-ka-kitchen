export const dessertRecipes={};
const add=(id,ingredients,steps,time=40,tip='Use gentle heat for milk and sugar mixtures, and scrape the base frequently to prevent scorching.')=>dessertRecipes[id]={ingredients,steps,time,tip};
const chennaSteps=[
 'Bring the milk to a boil, turn off the heat and wait 1 minute. Add lemon juice diluted with an equal amount of water gradually, stirring until the curds separate from clear yellow-green whey.',
 'Pour through muslin in a sieve. Rinse the curds briefly with cool drinking water to remove lemon flavour, gather the cloth and drain for 30–40 minutes. The chenna should be moist but not dripping.'
];
add('rasgulla','milk:2000:ml|lemon juice:50:ml|sugar:400:g|water:1600:ml|cardamom:2:g',[
 ...chennaSteps,'Knead the drained chenna on a clean plate for 8–10 minutes until smooth, stopping before it becomes oily. Divide into 16 pieces and roll into smooth, crack-free balls.',
 'Dissolve sugar in the measured water in a wide deep saucepan. Add lightly crushed cardamom and bring to a rolling boil.',
 'Lower the balls gently into the boiling syrup, leaving room to double in size. Cover and boil steadily for 15–18 minutes; avoid crowding and cook in batches if necessary.',
 'Add a little boiling water if the syrup becomes thick. A finished rasgulla springs back gently when pressed and should have no dense raw centre.',
 'Turn off the heat, cool the rasgullas in their syrup and refrigerate for at least 3 hours before serving four per portion.'
],80,'Draining and chilling are additional. Use regular milk rather than UHT milk where possible for softer chenna.');
add('sandesh','milk:2000:ml|lemon juice:50:ml|powdered sugar:110:g|cardamom powder:1:g|pistachio:25:g',[
 ...chennaSteps,'Knead the drained chenna for 6–8 minutes until smooth. Mix in powdered sugar and cardamom.',
 'Transfer to a heavy non-stick pan and stir on very low heat for 5–7 minutes, just until the mixture gathers and loses excess moisture. Do not cook until dry or crumbly.',
 'Cool until comfortably warm, then knead lightly and divide into 12 portions.',
 'Press into small discs or moulds and garnish with chopped pistachio. Refrigerate until firm and serve chilled.'
],60);
add('rasmalai','milk:2800:ml|lemon juice:50:ml|sugar:350:g|water:1500:ml|almond:30:g|pistachio:30:g|cardamom powder:1:g|saffron:0.5:g',[
 'Set aside 800 ml milk for the sweetened milk sauce. Bring the remaining 2 litres to a boil, turn off heat for 1 minute, then add diluted lemon juice gradually until the curds separate.',
 'Strain into muslin, rinse briefly and drain for 30–40 minutes until moist but not dripping. Knead for 8–10 minutes until smooth, divide into 12 balls and flatten gently into crack-free discs.',
 'Boil 250 g sugar with the measured water in a wide pan. Add the discs with room to expand, cover and boil steadily for 15–18 minutes until spongy and cooked through.',
 'In another pan, simmer the reserved 800 ml milk for 20 minutes, stirring, until reduced to about 600 ml. Add remaining sugar, saffron, cardamom and finely sliced nuts and simmer for 5 minutes.',
 'Let the cooked discs cool slightly in syrup. Gently press each between spoons to remove excess syrup without breaking it, then place into warm sweetened milk.',
 'Cool promptly and refrigerate for at least 4 hours to absorb the milk. Serve three small pieces per portion.'
],100,'Draining and chilling time are additional.');
add('mishti-doi','milk:1200:ml|sugar:160:g|plain live-culture curd:100:g|water:30:ml',[
 'Simmer milk in a heavy pan for 25–30 minutes until reduced to about 900 ml, stirring frequently.',
 'In a separate saucepan, heat sugar with the measured water. Let it turn amber without stirring vigorously; remove from heat before it darkens too far.',
 'Carefully add a ladle of hot milk to the caramel because it will bubble, stir until dissolved, then mix into the remaining milk.',
 'Cool the sweet milk to about 40–43°C: warm, not hot. Whisk the live-culture curd smooth and mix it into the milk.',
 'Divide into four clean pots, cover and leave undisturbed in a warm place for 6–10 hours until set, depending on room temperature.',
 'Refrigerate for at least 3 hours before serving. Use fresh starter curd and refrigerate as soon as the yoghurt sets.'
],50,'Allow 6–10 hours culturing plus chilling.');
add('gulab-jamun','full-fat milk powder:150:g|plain flour:40:g|baking powder:2:g|ghee:20:g|milk:90:ml|sugar:350:g|water:500:ml|cardamom:2:g|rose water:5:ml|oil for frying:600:ml',[
 'Simmer sugar, water and lightly crushed cardamom for 5 minutes until the sugar is dissolved and syrup is slightly sticky but not thick. Turn off heat and add food-grade rose water.',
 'Mix milk powder, flour and baking powder. Rub in ghee, then add milk gradually to form a soft dough; do not knead heavily. Rest for 5 minutes.',
 'Divide into 16 small portions and roll smoothly with greased palms. If cracks persist, work in a few drops of milk.',
 'Heat oil in a deep, stable pan to about 150–160°C, keeping the pan less than half full. Fry a few balls at a time, moving gently, for 6–8 minutes until evenly deep golden.',
 'Drain for 1 minute, then place in warm syrup. The syrup should not be boiling; keep the balls submerged gently.',
 'Soak for at least 2 hours before serving. Four small jamuns make one generous dessert portion; frying oil is a working quantity, not the amount absorbed.'
],50,'Allow at least 2 hours soaking after cooking.');
add('malpua','plain flour:160:g|semolina:40:g|milk:280:ml|sugar:180:g|water:180:ml|fennel seeds:3:g|cardamom powder:1:g|ghee for frying:180:g',[
 'Whisk flour, semolina, fennel and milk into a smooth pouring batter. Rest for 30 minutes, then stir and thin with a little milk if needed.',
 'Simmer sugar and water for 5–6 minutes until lightly sticky. Add cardamom and keep the syrup warm off the heat.',
 'Heat a shallow layer of ghee in a heavy pan over medium heat. Test a teaspoon of batter: it should spread gently and bubble at the edges.',
 'Pour small ladlefuls to form 8–10 cm pancakes. Fry for 2–3 minutes per side until golden with crisp edges and a cooked centre.',
 'Drain briefly, dip each pancake in warm syrup for 20–30 seconds, turn once and lift out.',
 'Serve warm. Fry in small batches so pancakes do not overlap; the frying ghee quantity includes what remains in the pan.'
],55);
add('jalebi','plain flour:160:g|cornflour starch:25:g|curd:120:g|water:300:ml|baking powder:3:g|turmeric powder:0.5:g|sugar:300:g|lemon juice:10:ml|cardamom powder:1:g|oil for frying:600:ml',[
 'For this quick version, whisk flour, starch, curd, turmeric and 120 ml of the water to a smooth batter that flows in a thick continuous ribbon. Rest for 15 minutes.',
 'Simmer sugar with the remaining 180 ml water and lemon juice until lightly sticky, about 6–8 minutes; add cardamom and keep warm.',
 'Heat oil to about 170°C in a stable pan less than half full. Stir baking powder into the batter immediately before frying and transfer to a piping bag or food squeeze bottle.',
 'Pipe small spirals close to the oil surface, working carefully to avoid splashes. Fry for 1–2 minutes per side until crisp, keeping them pale golden.',
 'Drain briefly, dip into warm syrup for 20–30 seconds and lift onto a rack or plate.',
 'Serve immediately for the crispest texture. This is an instant batter version; frying oil is a working quantity, not all consumed.'
],45);
add('ghevar','plain flour:180:g|ghee:45:g|milk:60:ml|ice-cold water:400:ml|sugar:220:g|water for syrup:150:ml|lemon juice:5:ml|cardamom powder:1:g|pistachio:25:g|oil for frying:700:ml',[
 'Beat cool ghee until creamy, then beat in milk and flour with ice-cold water gradually to make a very thin, smooth batter. Keep chilled while preparing the syrup.',
 'Simmer sugar with syrup water and lemon juice for 6–8 minutes until lightly sticky. Add cardamom and keep warm.',
 'Use a stable deep saucepan with a narrow 14–16 cm base and ample headroom. Add enough oil for about 4 cm depth but keep it below one-third of the pan height; heat to 175–180°C.',
 'Pour a tablespoon of batter in a thin stream into the centre from a safe short distance. Wait for the vigorous bubbling to subside, then repeat several times, maintaining a small central opening with a skewer.',
 'Build a lacy disc rather than a solid pancake. Cook until the edges are golden and the centre is firm; carefully lift with a skewer and slotted spoon and drain completely. Repeat for four small ghevar.',
 'Spoon warm syrup over each drained ghevar and scatter pistachios. Let excess syrup drain and serve soon; the frying oil is not all consumed.'
],60,'This is an advanced frying recipe: use small batter additions and stop pouring whenever foaming approaches the top of the pan.');
add('mohanthal','coarse gram flour:250:g|ghee:140:g|milk:40:ml|sugar:200:g|water:130:ml|cardamom powder:1:g|almond:30:g',[
 'Rub 30 g of the ghee and the milk into gram flour to make damp coarse crumbs. Rest for 20 minutes, then rub through a coarse sieve.',
 'Melt remaining ghee in a heavy pan, add the crumbs and roast over low heat for 20–25 minutes until deep golden and fragrant, stirring continuously.',
 'In another pan, dissolve sugar in water and simmer to one-thread consistency: a cooled drop stretches into one fine thread between damp fingertips. Do not touch hot syrup.',
 'Take the roasted flour off the heat, wait 2 minutes, then mix in warm syrup and cardamom carefully. Stir until the mixture thickens and holds together.',
 'Spread into a lightly greased 18 cm square tin, level without pressing hard and scatter sliced almonds.',
 'Let set for 3–4 hours, then cut into small squares. Portion as a rich sweet rather than a main dish.'
],65);
add('mysore-pak','gram flour:150:g|sugar:300:g|water:120:ml|ghee:200:g|oil:70:ml',[
 'Sift gram flour and dry-toast on low heat for 3 minutes without browning. Grease a small deep tray and keep it ready.',
 'Warm ghee and oil together in a separate pan; keep hot but not smoking.',
 'Dissolve sugar in water in a heavy pan and simmer to a light one-thread syrup, testing only a cooled drop.',
 'Reduce heat and add sifted gram flour in portions, stirring vigorously to remove lumps.',
 'Add the hot ghee mixture a small ladle at a time, stirring continuously. Cook for 8–12 minutes until the mixture becomes airy, porous and begins leaving the sides; stop before it turns dry and crumbly.',
 'Pour promptly into the prepared tray without compressing the bubbles. Cool for 10 minutes, score pieces while warm and separate once fully set.'
],40,'Hot sugar and fat bubble strongly; use a deep heavy pan and add hot fat in small portions.');
add('falooda','milk:600:ml|rose syrup:100:ml|basil seeds:20:g|falooda sev:80:g|eggless vanilla ice cream:240:g|pistachio:25:g|water:500:ml',[
 'Soak basil seeds in 250 ml water for 20 minutes until each seed has a swollen translucent coating, then drain any excess.',
 'Cook falooda sev in boiling water following the packet instructions, usually 3–5 minutes. Drain, rinse cool and drain again.',
 'Chill milk, rose syrup, cooked sev and soaked seeds before assembling.',
 'Spoon rose syrup into four tall glasses, then add seeds and cooked sev.',
 'Pour milk slowly down the side of each glass and top with a scoop of eggless vanilla ice cream.',
 'Scatter chopped pistachios and serve immediately with a spoon and wide straw.'
],30);
add('fruit-trifle','eggless sponge cake:300:g|milk:500:ml|cornflour starch:25:g|sugar:70:g|vanilla extract:5:ml|strawberry:250:g|banana:200:g|whipping cream:200:ml',[
 'Whisk cornflour with 100 ml cold milk. Heat remaining milk with 50 g sugar, stir in slurry and simmer for 3 minutes until thick. Add vanilla and cool promptly, then chill.',
 'Cut the eggless cake into cubes. Wash and hull strawberries and slice banana shortly before assembling.',
 'Whip cold cream with remaining sugar to soft peaks.',
 'Layer cake, fruit and cold custard in four glasses, repeating once if the glasses allow.',
 'Spoon whipped cream on top, cover and refrigerate for 1–2 hours so the cake softens slightly.',
 'Serve chilled. The layers in this version are eggless custard, cream, fruit and cake; no jelly is needed.'
],35,'Allow time to cool the custard and 1–2 hours chilling after assembly.');
const puddings={
 'rice-pudding':['short grain rice:100:g|milk:1000:ml|sugar:90:g|vanilla extract:5:ml|cinnamon powder:1:g','Rinse the rice and drain.','Add rice to the hot milk and simmer very gently for 30–40 minutes, stirring often, until the grains are soft and the milk is creamy.','Add sugar, vanilla and cinnamon and simmer for 5 minutes.'],
 'seviyan-kheer':['wheat vermicelli:90:g|milk:1000:ml|sugar:90:g|ghee:15:g|cardamom powder:1:g|cashew:25:g|raisins:25:g','Heat ghee, toast cashews and raisins briefly and set aside. Toast vermicelli in the same pan until lightly golden.','Add the toasted vermicelli to hot milk and simmer for 8–12 minutes, stirring, until tender.','Stir in sugar and cardamom and simmer for 3 minutes; return toasted nuts and raisins.'],
 'payasam':['rice:90:g|milk:1000:ml|sugar:100:g|ghee:15:g|cashew:30:g|raisins:20:g|cardamom powder:1:g','Rinse rice and drain. Heat ghee separately and toast cashews and raisins until golden; reserve.','Add rice to hot milk and simmer gently for 35–45 minutes until very soft, scraping the base and sides regularly.','Stir in sugar, cardamom and the toasted cashews and raisins; simmer for 5 minutes.'],
 'basundi':['milk:1500:ml|sugar:100:g|almond:25:g|pistachio:25:g|cardamom powder:1:g|saffron:0.5:g','Slice almonds and pistachios finely. Soak saffron in a spoonful of warm milk taken from the measured amount.','Simmer milk in a wide heavy pan for 40–50 minutes until reduced by about one-third, stirring and returning the thin cream layers from the sides to the milk.','Add sugar, cardamom, saffron milk and sliced nuts and simmer for 5 minutes.']
};
for(const [id,[ingredients,prep,cook,finish]] of Object.entries(puddings))add(id,ingredients,[
 prep,'Use a heavy saucepan with plenty of room. Bring the measured milk just to a simmer, stirring the bottom so it does not catch.',cook,finish,
 'Turn off the heat when slightly looser than your desired final texture; it thickens during cooling.',
 'Serve warm, or cool promptly and refrigerate for a chilled dessert. Stir before portioning into four bowls.'
],id==='seviyan-kheer'?30:60);
add('coconut-payasam','grated coconut:180:g|coconut milk:500:ml|water:450:ml|jaggery:150:g|rice flour:20:g|cashew:30:g|coconut oil:15:ml|cardamom powder:1:g',[
 'Dissolve jaggery in 250 ml warm water and strain if gritty. Mix rice flour with the remaining 200 ml cool water.',
 'Put grated coconut and strained jaggery liquid in a saucepan and simmer for 8 minutes.',
 'Stir in the rice-flour slurry and simmer for 4–5 minutes, stirring continuously until lightly thickened.',
 'Lower the heat, add coconut milk and cardamom and warm gently for 3 minutes without a hard boil.',
 'Toast cashews in coconut oil until golden and pour over the payasam.',
 'Serve warm in small bowls; the dessert becomes thicker as it cools.'
],30);
const halwas={
 'gajar-halwa':['carrot:900:g|milk:600:ml|sugar:140:g|ghee:70:g|cashew:30:g|raisins:25:g|cardamom powder:1:g','Wash, peel and grate carrots using medium holes.','Put carrot and milk in a heavy pan. Simmer for 25–35 minutes, stirring, until the carrot is soft and most milk has evaporated.','Add ghee and cook for 8–10 minutes, then add sugar and cook another 8 minutes until the moisture released by the sugar evaporates.'],
 'badam-halwa':['almond:220:g|milk:180:ml|sugar:180:g|ghee:90:g|cardamom powder:1:g|saffron:0.5:g','Soak almonds in hot water for 1 hour, peel and blend with milk to a fine, slightly textured paste. Soak saffron in a spoonful of the milk first.','Heat half the ghee in a heavy pan, add almond paste and stir on low heat for 8–10 minutes until the raw aroma fades.','Add sugar and saffron milk. Cook for 10–15 minutes, stirring continuously and adding remaining ghee a little at a time until the mixture becomes glossy and leaves the sides.'],
 'moong-dal-halwa':['moong dal:220:g|milk:350:ml|water:200:ml|sugar:180:g|ghee:140:g|cashew:30:g|cardamom powder:1:g','Rinse and soak moong dal for 4 hours, drain extremely well and grind to a coarse paste using as little water as possible.','Heat ghee in a heavy non-stick pan, add dal paste and stir over medium-low heat for 25–35 minutes until golden, crumbly and nutty-smelling. Do not rush this roasting.','Heat milk and water separately. Add carefully to the hot roasted dal in small additions, stirring against splashes. Cook until absorbed, then add sugar and cook for 8–10 minutes until glossy.']
};
for(const [id,[ingredients,prep,cook,finish]] of Object.entries(halwas))add(id,ingredients,[
 prep,'Measure all ingredients and use a long-handled spatula and a heavy pan; the mixture needs frequent stirring.',cook,finish,
 'Stir in cardamom and any listed cashews and raisins, reserving a few for garnish. Cook gently for another 2 minutes.',
 'Rest for 5 minutes and portion into four small bowls. Serve warm; soak time, where required, is additional.'
],id==='badam-halwa'?45:70);
add('besan-ladoo','gram flour:250:g|ghee:120:g|powdered sugar:160:g|cardamom powder:1:g|almond:30:g',[
 'Sift gram flour to remove lumps and chop almonds finely.',
 'Melt ghee in a heavy pan on low heat. Add gram flour and stir continuously for 20–25 minutes until deeper golden and fragrant; keep the heat low so the inside does not remain raw.',
 'Take off the heat and transfer to a bowl. Cool until just warm to the touch; hot flour will melt the sugar.',
 'Mix in powdered sugar, cardamom and chopped almonds until evenly combined.',
 'Squeeze a small portion firmly in your palm, then roll into a smooth ball. Make 12 small ladoos, about three per serving.',
 'Let set at room temperature for 1 hour before storing in an airtight container.'
],40);
add('coconut-ladoo','desiccated coconut:220:g|sweetened condensed milk:250:g|milk:80:ml|ghee:15:g|cardamom powder:1:g',[
 'Reserve 30 g coconut for coating. Warm ghee in a non-stick pan over low heat.',
 'Add the remaining coconut and stir for 1 minute without browning it.',
 'Add condensed milk and milk and cook on low heat for 5–8 minutes, stirring constantly until the mixture holds together and leaves the sides.',
 'Stir in cardamom, transfer to a plate and cool until safe to handle.',
 'With lightly greased palms shape 12 small balls. Roll each in the reserved coconut.',
 'Let firm up for 30 minutes. Refrigerate in an airtight container because this version contains milk.'
],25);
add('kaju-katli','cashew:250:g|sugar:140:g|water:80:ml|ghee:8:g',[
 'Pulse dry cashews in short bursts to a fine powder. Stop before they release oil; sieve out coarse pieces and pulse those separately.',
 'Heat sugar and water in a non-stick pan, stirring only until dissolved. Simmer for 2–3 minutes to a light sticky syrup.',
 'Lower the heat, add cashew powder and stir continuously for 6–8 minutes until it forms a soft mass leaving the sides.',
 'Test a little cooled mixture: it should roll into a soft non-sticky ball. Stop cooking as soon as this happens to avoid a brittle katli.',
 'Transfer to lightly greased parchment, cool until warm and knead gently with the ghee for 30 seconds. Roll between parchment sheets to about 4 mm thick.',
 'While still slightly warm, cut into diamonds. Cool completely before separating and storing.'
],30);
add('shrikhand','plain thick curd:1000:g|powdered sugar:120:g|cardamom powder:1:g|saffron:0.5:g|milk:20:ml|pistachio:30:g',[
 'Line a sieve with clean muslin, set over a bowl and add curd. Cover and drain in the refrigerator for 6–8 hours until thick; discard or separately save the whey.',
 'Warm the milk slightly and steep saffron in it for 10 minutes.',
 'Transfer drained curd to a bowl and whisk until smooth without adding water.',
 'Fold in powdered sugar, cardamom and saffron milk. Taste and adjust sweetness if needed.',
 'Chill for at least 1 hour so the flavours blend and the dessert firms up.',
 'Divide into four bowls and scatter chopped pistachios on top.'
],20,'Allow 6–8 hours for draining and at least 1 hour chilling, in addition to preparation.');
add('agar-panna-cotta','cream:400:ml|milk:300:ml|sugar:90:g|agar agar powder:3:g|vanilla extract:5:ml|strawberry:250:g',[
 'Mix agar powder with the cold milk in a saucepan, whisking until evenly dispersed. Use powder rather than flakes; check the packet setting guidance as brands differ.',
 'Bring the milk mixture to a full simmer while stirring, then simmer for 2 minutes to dissolve the agar completely.',
 'Add cream and sugar, stir until dissolved and bring back just to a gentle simmer for 1 minute.',
 'Take off the heat, add vanilla and pour promptly into four ramekins; agar begins setting as it cools.',
 'Cool, cover and refrigerate for at least 3 hours. Wash and hull strawberries and mash half into a simple unsweetened sauce.',
 'Serve in the ramekins or loosen carefully and unmould. Spoon strawberries and sauce over each portion.'
],20,'Setting and chilling take at least 3 hours. This version uses plant-derived agar.');
add('vegan-chocolate-mousse','silken tofu:400:g|vegan dark chocolate:180:g|maple syrup:45:ml|vanilla extract:5:ml|cocoa powder:15:g',[
 'Drain silken tofu and let it lose its refrigerator chill for 10 minutes. Use silken tofu, not firm tofu, for a smooth texture.',
 'Chop chocolate and melt gently in a heatproof bowl above barely simmering water, keeping the bowl clear of the water. Stir until smooth and cool slightly.',
 'Blend tofu, maple syrup, vanilla and cocoa until completely smooth, scraping down the sides.',
 'With the blender running slowly, add the melted chocolate and blend just until uniform. Taste and adjust sweetness if needed.',
 'Divide between four dessert glasses, cover and refrigerate for at least 3 hours until set.',
 'Serve chilled. Check chocolate is vegan and avoid adding dairy cream to this version.'
],20,'Allow at least 3 hours chilling after preparation.');
add('mango-mousse','ripe mango flesh:400:g|whipping cream:300:ml|powdered sugar:50:g|lime juice:15:ml',[
 'Peel mango, remove the stone and weigh the flesh. Blend it completely smooth with lime juice.',
 'Chill the mango puree and use cold whipping cream with enough fat to whip, following its label.',
 'Whip cream and powdered sugar in a chilled bowl to soft peaks that gently curl over; avoid overbeating into butter.',
 'Fold one-third of the whipped cream into the mango puree to lighten it, then gently fold in the rest.',
 'Spoon into four glasses and refrigerate for at least 4 hours.',
 'Serve in the glasses as a soft spoonable mousse. It has no setting agent and is not intended for unmoulding.'
],20,'Allow at least 4 hours chilling.');
add('fruit-custard-with-cornstarch','milk:800:ml|cornflour starch:40:g|sugar:100:g|vanilla extract:5:ml|banana:150:g|apple:180:g|grapes:150:g|pomegranate arils:100:g',[
 'Mix cornflour starch with 150 ml cold milk until completely smooth.',
 'Heat the remaining milk and sugar in a heavy saucepan until steaming. Stir in the starch mixture in a thin stream.',
 'Bring to a gentle simmer and cook for 3–4 minutes, stirring continuously, until smooth and thick enough to coat a spoon.',
 'Remove from heat, add vanilla and transfer to a clean bowl. Cool promptly, cover the surface and refrigerate until cold.',
 'Wash fruit, core and dice apple, peel and slice banana and halve grapes. Fold the fruit and pomegranate into cold custard just before serving.',
 'Divide into four bowls. Keep fruit and custard separately chilled if preparing ahead.'
],25,'Cooling and refrigeration are additional to cooking time.');
add('cheesecake-cup','eggless digestive biscuits:140:g|butter:55:g|cream cheese:250:g|whipping cream:200:ml|powdered sugar:70:g|lemon juice:20:ml|vanilla extract:5:ml|strawberry:200:g',[
 'Crush biscuits finely and mix with melted butter. Divide between four glasses and press lightly into a base.',
 'Beat cream cheese with sugar, lemon juice and vanilla until smooth and free of lumps.',
 'In a separate chilled bowl, whip cold cream to soft peaks.',
 'Fold whipped cream into the cream cheese mixture gently and spoon over the biscuit bases.',
 'Cover and refrigerate for at least 4 hours. Wash, hull and slice strawberries.',
 'Top with strawberries just before serving. This vegetarian, eggless cup dessert is spoonable and does not need baking or a setting agent.'
],25,'Allow at least 4 hours chilling.');
add('brownie-sundae','eggless brownie:320:g|eggless vanilla ice cream:400:g|dark chocolate:80:g|milk:60:ml|almond:30:g',[
 'Use ready-baked eggless brownies and ice cream labelled eggless. Cut the brownie into four portions.',
 'Warm milk until steaming, take it off the heat and add finely chopped chocolate. Rest for 1 minute and stir into a smooth sauce.',
 'Toast chopped almonds in a dry pan for 2–3 minutes and let cool.',
 'Warm brownies briefly in an oven at 150°C for 5 minutes, or serve them at room temperature.',
 'Place a brownie portion in each bowl, top with a scoop of ice cream and drizzle with chocolate sauce.',
 'Scatter toasted almonds on top and serve immediately before the ice cream melts.'
],20);
add('kulfi','milk:1200:ml|sweetened condensed milk:180:g|almond:30:g|pistachio:30:g|cardamom powder:1:g|saffron:0.5:g',[
 'Bring milk to a simmer in a heavy wide pan. Cook on low heat for 35–45 minutes, scraping the base and returning cream from the sides until reduced to about 750 ml.',
 'Finely chop almonds and pistachios and steep saffron in a spoonful of the warm milk.',
 'Add condensed milk, nuts, cardamom and saffron milk. Simmer for another 5 minutes, stirring.',
 'Cool promptly, then refrigerate until cold. Stir the mixture so the nuts are evenly distributed.',
 'Pour into four large kulfi moulds or smaller moulds as available, leaving expansion room, and freeze for at least 8 hours.',
 'Dip moulds briefly in warm water to loosen and serve immediately.'
],60,'Cooling and at least 8 hours freezing are additional.');
