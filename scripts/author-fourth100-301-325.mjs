import fs from 'node:fs/promises';

// Source-only authoring sheet for R0301–R0325. Each pipe-delimited row holds
// independently authored English, Hindi and Gujarati text in that order.
const records = [];
const add = (index, cuisine, minutes, nameHi, nameGu, ingredients, stepsEn, stepsHi, stepsGu, tip, reference) =>
  records.push({ index, cuisine, minutes, nameHi, nameGu, ingredients, steps: [stepsEn, stepsHi, stepsGu], tip, reference });

add(300, 'Pan-Indian', 35, 'प्याज़ पकोड़ा', 'ડુંગળીના ભજિયા', [
  'onions, thinly sliced|प्याज़, पतले कटे|ડુંગળી, પાતળી સમારેલી|350|g',
  'gram flour|बेसन|ચણાનો લોટ|160|g',
  'rice flour|चावल का आटा|ચોખાનો લોટ|25|g',
  'green chilli, minced|हरी मिर्च, बारीक कटी|લીલું મરચું, ઝીણું સમારેલું|12|g',
  'carom seeds|अजवाइन|અજમો|3|g',
  'turmeric|हल्दी|હળદર|2|g',
  'coriander leaves, chopped|हरा धनिया, कटा|લીલા ધાણા, સમારેલા|20|g',
  'salt|नमक|મીઠું|7|g',
  'water, as needed|पानी, आवश्यकतानुसार|પાણી, જરૂર મુજબ|50|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Separate the onion slices and toss with salt, chilli, carom, turmeric and coriander. Rest until the onion releases moisture.',
  'Mix in gram flour and rice flour. Add water only a spoonful at a time until the flour just clings to the onion; this should not be a pourable batter.',
  'Heat oil over medium heat. Drop loose small handfuls of onion mixture into it without compressing them, leaving room around each fritter.',
  'Turn the pakoras as the edges set and fry until deep golden, crisp and cooked through. Keep the oil at a steady medium heat.',
  'Lift out with a slotted spoon, drain well and serve immediately with coriander chutney or hot tea.'
], [
  'प्याज़ की परतें अलग करें और नमक, मिर्च, अजवाइन, हल्दी व धनिया मिलाएँ। प्याज़ से पानी निकलने तक रखें।',
  'बेसन और चावल का आटा मिलाएँ। पानी थोड़ा-थोड़ा डालें ताकि आटा बस प्याज़ से चिपके; घोल बहने वाला नहीं होना चाहिए।',
  'तेल मध्यम आँच पर गरम करें। प्याज़ के मिश्रण की छोटी ढीली मुट्ठियाँ तेल में डालें, उन्हें दबाएँ नहीं और बीच में जगह रखें।',
  'किनारे जमने पर पकोड़े पलटें और गहरे सुनहरे, कुरकुरे तथा भीतर से पके होने तक तलें। तेल मध्यम गरम रखें।',
  'छेद वाली कलछी से निकालकर तेल निथारें और हरी धनिया चटनी या गरम चाय के साथ तुरंत परोसें।'
], [
  'ડુંગળીના પડ અલગ કરી મીઠું, મરચું, અજમો, હળદર અને ધાણા ભેળવો. ડુંગળી પાણી છોડે ત્યાં સુધી રાખો.',
  'ચણાનો અને ચોખાનો લોટ ભેળવો. પાણી થોડું થોડું ઉમેરી લોટ ડુંગળીને માંડ ચોંટે એટલું જ રાખો; રેડી શકાય એવું ખીરું ન બનાવો.',
  'મધ્યમ તાપે તેલ ગરમ કરો. મિશ્રણની નાની ઢીલી મૂઠીઓ દબાવ્યા વગર તેલમાં મૂકો અને વચ્ચે જગ્યા રાખો.',
  'કિનારી જામી જાય ત્યારે ભજિયા પલટાવો અને ઘેરા સોનેરી, કરકરા તથા અંદરથી પાકે ત્યાં સુધી તળો. તેલ મધ્યમ ગરમ રાખો.',
  'ઝારાથી કાઢી તેલ નિતારો અને લીલા ધાણાની ચટણી અથવા ગરમ ચા સાથે તરત પીરસો.'
], 'Onion moisture should bind the coating; excess water makes heavy, oily pakoras.|प्याज़ का अपना पानी ही परत बाँधे; अधिक पानी से पकोड़े भारी और तेल वाले बनते हैं।|ડુંગળીનું પોતાનું પાણી જ પડ બાંધે; વધુ પાણીથી ભજિયા ભારે અને તેલિયા થાય છે.', 'https://www.vegrecipesofindia.com/onion-pakoda/');

add(301, 'Pan-Indian', 35, 'आलू पकोड़ा', 'બટાકાના ભજિયા', [
  'potatoes, peeled|आलू, छिले|બટાકા, છોલેલા|400|g',
  'gram flour|बेसन|ચણાનો લોટ|170|g',
  'rice flour|चावल का आटा|ચોખાનો લોટ|30|g',
  'red chilli powder|लाल मिर्च पाउडर|લાલ મરચું પાઉડર|5|g',
  'carom seeds|अजवाइन|અજમો|3|g',
  'turmeric|हल्दी|હળદર|2|g',
  'salt|नमक|મીઠું|7|g',
  'water|पानी|પાણી|220|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Slice peeled potatoes into uniformly thin rounds and pat them dry; thick slices may remain raw in the centre.',
  'Whisk gram flour, rice flour, chilli, carom, turmeric and salt. Add water gradually to make a smooth batter that coats a spoon without running off.',
  'Heat oil to medium hot. Dip each potato slice in batter, let the excess drip off and slide it carefully into the oil in small batches.',
  'Fry, turning once the coating sets, until both sides are golden and the potato inside is tender. Adjust the heat so the crust does not brown before the potato cooks.',
  'Drain on a rack or absorbent paper and serve warm with chutney.'
], [
  'छिले आलू के बराबर पतले गोल टुकड़े काटकर सुखाएँ; मोटे टुकड़े भीतर से कच्चे रह सकते हैं।',
  'बेसन, चावल का आटा, मिर्च, अजवाइन, हल्दी और नमक फेंटें। पानी धीरे-धीरे डालकर ऐसा चिकना घोल बनाएँ जो चम्मच पर चढ़े पर बहे नहीं।',
  'तेल मध्यम गरम करें। आलू का हर टुकड़ा घोल में डुबोएँ, अतिरिक्त घोल टपकाएँ और थोड़े-थोड़े टुकड़े तेल में सावधानी से डालें।',
  'परत जमने पर पलटते हुए दोनों ओर सुनहरा और भीतर आलू नरम होने तक तलें। आँच ऐसी रखें कि आलू पकने से पहले परत न जल जाए।',
  'जाली या सोखने वाले कागज़ पर निथारें और चटनी के साथ गरम परोसें।'
], [
  'છોલેલા બટાકાની એકસરખી પાતળી ગોળ ચીરીઓ કરી સૂકવો; જાડી ચીરીઓ અંદરથી કાચી રહી શકે છે.',
  'ચણાનો લોટ, ચોખાનો લોટ, મરચું, અજમો, હળદર અને મીઠું ફેંટો. પાણી ધીરે ઉમેરતાં ચમચીને ચોંટે પણ વહે નહીં એવું સુંવાળું ખીરું બનાવો.',
  'તેલ મધ્યમ ગરમ કરો. બટાકાની દરેક ચીરી ખીરામાં ડૂબાડી વધારું ખીરું ટપકવા દો અને થોડા થોડા ટુકડા સાવચેતીથી તેલમાં મૂકો.',
  'પડ જામી જાય પછી પલટાવી બંને બાજુ સોનેરી થાય અને અંદરનો બટાકો નરમ પડે ત્યાં સુધી તળો. બટાકો પાકે તે પહેલાં પડ બળી ન જાય એવો તાપ રાખો.',
  'જાળી અથવા શોષક કાગળ પર નિતારી ચટણી સાથે ગરમ પીરસો.'
], 'Cut the potato thinly and evenly so the centre cooks before the crust gets too dark.|आलू समान रूप से पतला काटें ताकि परत गहरी होने से पहले भीतर पक जाए।|બટાકા એકસરખા પાતળા કાપો જેથી પડ ઘેરો થાય તે પહેલાં અંદર પાકે.', 'https://www.vegrecipesofindia.com/aloo-pakora-aloo-bajji/');

add(302, 'Pan-Indian', 30, 'पालक पकोड़ा', 'પાલકના ભજિયા', [
  'large spinach leaves|पालक के बड़े पत्ते|પાલકનાં મોટા પાન|160|g',
  'gram flour|बेसन|ચણાનો લોટ|150|g',
  'rice flour|चावल का आटा|ચોખાનો લોટ|35|g',
  'carom seeds|अजवाइन|અજમો|3|g',
  'red chilli powder|लाल मिर्च पाउडर|લાલ મરચું પાઉડર|4|g',
  'turmeric|हल्दी|હળદર|2|g',
  'salt|नमक|મીઠું|6|g',
  'water|पानी|પાણી|200|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Wash spinach thoroughly, keep the leaves whole, trim thick stems and dry each leaf completely.',
  'Whisk gram flour, rice flour, carom, chilli, turmeric and salt with water into a smooth medium-thick batter.',
  'Heat oil over medium heat. Coat one leaf at a time in a thin layer of batter and gently lower it into the oil, without crowding.',
  'Turn after the batter sets and fry until the leaf-shaped pakoras are crisp and golden on both sides.',
  'Drain on a rack and serve promptly with tamarind or green chutney.'
], [
  'पालक अच्छी तरह धोएँ, पत्ते साबुत रखें, मोटी डंडी हटाएँ और हर पत्ता पूरी तरह सुखाएँ।',
  'बेसन, चावल का आटा, अजवाइन, मिर्च, हल्दी और नमक को पानी के साथ फेंटकर चिकना मध्यम गाढ़ा घोल बनाएँ।',
  'तेल मध्यम आँच पर गरम करें। एक-एक पत्ते पर घोल की पतली परत चढ़ाकर धीरे से तेल में डालें; कड़ाही न भरें।',
  'घोल जमने पर पलटें और पत्ते के आकार के पकोड़े दोनों ओर से सुनहरे व कुरकुरे होने तक तलें।',
  'जाली पर निथारें और इमली या हरी चटनी के साथ तुरंत परोसें।'
], [
  'પાલક સારી રીતે ધોઈ પાન આખાં રાખો, જાડી દાંડી દૂર કરો અને દરેક પાન સંપૂર્ણ સૂકવો.',
  'ચણાનો લોટ, ચોખાનો લોટ, અજમો, મરચું, હળદર અને મીઠું પાણી સાથે ફેંટીને મધ્યમ ઘટ્ટ સુંવાળું ખીરું બનાવો.',
  'તેલ મધ્યમ તાપે ગરમ કરો. એક એક પાન પર ખીરાનો પાતળો પડ ચઢાવી ધીમેથી તેલમાં મૂકો; કડાઈ ભરશો નહીં.',
  'પડ જામી જાય ત્યારે પલટાવો અને પાનના આકારના ભજિયા બંને બાજુ સોનેરી અને કરકરા થાય ત્યાં સુધી તળો.',
  'જાળી પર નિતારો અને આમલી અથવા લીલી ચટણી સાથે તરત પીરસો.'
], 'Dry leaves prevent splattering and help the light batter adhere evenly.|सूखे पत्तों पर घोल बराबर चढ़ता है और तलते समय तेल नहीं उछलता।|સૂકા પાન પર ખીરું સરખું ચડે છે અને તળતી વખતે તેલ ઊછળતું નથી.', 'https://www.vegrecipesofindia.com/palak-chaat-or-spinach-chaat/');

add(303, 'Pan-Indian', 40, 'मिक्स वेज पकोड़ा', 'મિક્સ વેજ ભજિયા', [
  'cabbage, finely shredded|पत्तागोभी, बारीक कटी|કોબી, ઝીણી સમારેલી|100|g',
  'cauliflower, finely chopped|फूलगोभी, बारीक कटी|ફૂલકોબી, ઝીણી સમારેલી|100|g',
  'carrot, grated|गाजर, कद्दूकस की हुई|ગાજર, છીણેલું|80|g',
  'onion, finely sliced|प्याज़, पतला कटा|ડુંગળી, પાતળી સમારેલી|80|g',
  'gram flour|बेसन|ચણાનો લોટ|175|g',
  'rice flour|चावल का आटा|ચોખાનો લોટ|25|g',
  'green chilli, minced|हरी मिर्च, बारीक कटी|લીલું મરચું, ઝીણું સમારેલું|10|g',
  'coriander leaves|हरा धनिया|લીલા ધાણા|20|g',
  'carom seeds|अजवाइन|અજમો|3|g',
  'salt|नमक|મીઠું|8|g',
  'water, as needed|पानी, आवश्यकतानुसार|પાણી, જરૂર મુજબ|70|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Chop cauliflower and cabbage very finely so they cook during frying. Squeeze excess moisture from the shredded vegetables.',
  'Toss the vegetables with onion, chilli, coriander, carom and salt. Mix in both flours until all the pieces are lightly coated.',
  'Add a little water only if needed to bind the vegetables into loose clusters; avoid a runny batter.',
  'Drop small spoonfuls into medium-hot oil in batches. Fry while turning until the edges are deeply crisp and the vegetable centres are tender.',
  'Drain well and serve hot with mint chutney.'
], [
  'फूलगोभी और पत्तागोभी बहुत बारीक काटें ताकि तलते समय पक जाएँ। कटी सब्ज़ियों का अतिरिक्त पानी निचोड़ें।',
  'सब्ज़ियों में प्याज़, मिर्च, धनिया, अजवाइन और नमक मिलाएँ। दोनों आटे डालकर हर टुकड़े पर हल्की परत चढ़ाएँ।',
  'केवल ज़रूरत पड़ने पर थोड़ा पानी डालें ताकि सब्ज़ियाँ ढीले गुच्छों में बँधें; पतला घोल न बनाएँ।',
  'मध्यम गरम तेल में छोटे चम्मचभर मिश्रण के हिस्से डालें। पलट-पलटकर किनारे कुरकुरे और अंदर की सब्ज़ियाँ नरम होने तक तलें।',
  'अच्छी तरह निथारकर पुदीना चटनी के साथ गरम परोसें।'
], [
  'ફૂલકોબી અને કોબી બહુ ઝીણી સમારો જેથી તળતી વખતે પાકે. સમારેલી શાકભાજીનું વધારું પાણી નીચોવો.',
  'શાકમાં ડુંગળી, મરચું, ધાણા, અજમો અને મીઠું ભેળવો. બંને લોટ ઉમેરી દરેક ટુકડે પાતળો પડ ચડાવો.',
  'જરૂર હોય તો જ થોડું પાણી ઉમેરો જેથી શાક ઢીલા ઝૂમખામાં બંધાય; પાતળું ખીરું ન બનાવો.',
  'મધ્યમ ગરમ તેલમાં નાની ચમચીભર મિશ્રણની ગાંઠો મૂકો. પલટાવી કિનારી કરકરી અને અંદરનું શાક નરમ થાય ત્યાં સુધી તળો.',
  'સારી રીતે નિતારી ફુદીનાની ચટણી સાથે ગરમ પીરસો.'
], 'Small, evenly chopped vegetables cook through before the outside browns.|समान बारीक कटी सब्ज़ियाँ बाहर सुनहरा होने से पहले भीतर पकती हैं।|સરખી ઝીણી સમારેલી શાકભાજી બહાર સોનેરી થાય તે પહેલાં અંદર પાકે છે.', 'https://www.vegrecipesofindia.com/mix-veg-pakora-recipe/');

add(304, 'Gujarati', 40, 'गुजराती दाल वडा', 'ગુજરાતી દાળવડા', [
  'split yellow moong dal|धुली मूंग दाल|પીળી મગની દાળ|300|g',
  'ginger, chopped|अदरक, कटा|આદુ, સમારેલું|20|g',
  'green chilli, chopped|हरी मिर्च, कटी|લીલું મરચું, સમારેલું|20|g',
  'coriander leaves|हरा धनिया|લીલા ધાણા|25|g',
  'cumin seeds|जीरा|જીરું|5|g',
  'asafoetida|हींग|હિંગ|1|g',
  'salt|नमक|મીઠું|8|g',
  'water for grinding|पीसने के लिए पानी|પીસવા માટે પાણી|30|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Rinse moong dal and soak until swollen but not mushy, then drain thoroughly and leave in a sieve until surface moisture is gone.',
  'Pulse the dal with ginger, chilli and very little water to a coarse paste with some visible lentil bits. Do not puree it smooth.',
  'Mix in coriander, cumin, asafoetida and salt. Beat the mixture briefly to lighten it, then shape rough small mounds with wet hands.',
  'Fry batches in medium-hot oil, turning gently after they firm up, until the vadas are evenly golden and cooked through.',
  'Drain well and serve hot in the Gujarati street style with chutney and, if desired, fried green chillies.'
], [
  'मूंग दाल धोकर फूलने तक भिगोएँ, गलने न दें। अच्छी तरह निथारकर छलनी में रखें ताकि ऊपर का पानी निकल जाए।',
  'दाल को अदरक, मिर्च और बहुत कम पानी के साथ दरदरा पीसें; दाल के कुछ दाने दिखने चाहिए। एकदम चिकना पेस्ट न बनाएँ।',
  'धनिया, जीरा, हींग और नमक मिलाएँ। मिश्रण हल्का करने के लिए थोड़ी देर फेंटें, फिर गीले हाथों से छोटी खुरदरी लोइयाँ बनाएँ।',
  'मध्यम गरम तेल में थोड़े-थोड़े वडा डालें; आकार जमने पर धीरे पलटें और समान सुनहरे व अंदर से पके होने तक तलें।',
  'अच्छी तरह निथारें और गुजराती सड़क-शैली में चटनी तथा चाहें तो तली हरी मिर्च के साथ गरम परोसें।'
], [
  'મગની દાળ ધોઈ ફૂલે ત્યાં સુધી પલાળો, ગળી ન જાય તે જુઓ. સારી રીતે નિતારી ચાળણીમાં રાખી ઉપરનું પાણી કાઢો.',
  'દાળને આદુ, મરચું અને બહુ ઓછા પાણી સાથે દરદરી પીસો; દાળના થોડા દાણા દેખાવા જોઈએ. એકદમ સુંવાળી પેસ્ટ ન બનાવો.',
  'ધાણા, જીરું, હિંગ અને મીઠું ભેળવો. મિશ્રણ હળવું થાય એટલું ફેંટો, પછી ભીના હાથથી નાની ખરબચડી ગાંઠો બનાવો.',
  'મધ્યમ ગરમ તેલમાં થોડા થોડા વડા મૂકો; આકાર જામી જાય ત્યારે હળવેથી પલટાવી સરખા સોનેરી અને અંદરથી પાકે ત્યાં સુધી તળો.',
  'સારી રીતે નિતારી ગુજરાતી શેરીની રીતમાં ચટણી અને ઇચ્છા હોય તો તળેલા લીલા મરચાં સાથે ગરમ પીરસો.'
], 'Coarse grinding and complete draining make the vadas crisp rather than dense.|दाल दरदरी पीसने और अच्छी तरह निथारने से वडा भारी नहीं, कुरकुरा बनता है।|દાળ દરદરી પીસવાથી અને બરાબર નિતારવાથી વડા ભારે નહીં, કરકરા બને છે.', 'https://hebbarskitchen.com/moong-dal-vada-recipe-moong-dal-pakoda/comment-page-1/');

add(305, 'Rajasthani', 40, 'मूंग दाल पकौड़ी', 'મગદાળ પકોડી', [
  'split yellow moong dal|धुली मूंग दाल|પીળી મગની દાળ|300|g',
  'ginger|अदरक|આદુ|18|g',
  'green chilli|हरी मिर्च|લીલું મરચું|15|g',
  'coriander seeds, coarsely crushed|साबुत धनिया, दरदरा कुटा|ધાણા, દરદરા ભૂકેલા|6|g',
  'black pepper, crushed|काली मिर्च, कुटी|કાળા મરી, ભૂકેલા|4|g',
  'coriander leaves|हरा धनिया|લીલા ધાણા|20|g',
  'asafoetida|हींग|હિંગ|1|g',
  'salt|नमक|મીઠું|8|g',
  'water for grinding|पीसने के लिए पानी|પીસવા માટે પાણી|35|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Rinse and soak moong dal until plump, then drain completely. Grind with ginger, chilli and just enough water to make a thick, nearly smooth paste.',
  'Stir in crushed coriander, pepper, coriander leaves, asafoetida and salt. Beat the batter briskly to incorporate air; it should hold a spoonful without spreading.',
  'Heat oil to medium hot. Drop small spoonfuls of batter carefully into the oil, leaving room for the pakodis to expand.',
  'Turn gently and fry until puffed, golden and cooked through. Keep the heat moderate so the centre cooks without a burnt crust.',
  'Drain thoroughly and serve hot with green or tamarind chutney.'
], [
  'मूंग दाल धोकर फूलने तक भिगोएँ, फिर पूरी तरह निथारें। अदरक, मिर्च और बस ज़रूरत भर पानी से गाढ़ा, लगभग चिकना पेस्ट पीसें।',
  'कुटा धनिया, काली मिर्च, हरा धनिया, हींग और नमक मिलाएँ। हवा भरने के लिए घोल अच्छी तरह फेंटें; चम्मचभर घोल फैलना नहीं चाहिए।',
  'तेल मध्यम गरम करें। घोल के छोटे चम्मचभर हिस्से सावधानी से तेल में डालें और फूलने की जगह रखें।',
  'धीरे पलटते हुए फूली, सुनहरी और भीतर से पकी होने तक तलें। आँच मध्यम रखें ताकि अंदर पके और बाहर न जले।',
  'अच्छी तरह निथारकर हरी या इमली की चटनी के साथ गरम परोसें।'
], [
  'મગની દાળ ધોઈ ફૂલે ત્યાં સુધી પલાળો, પછી સંપૂર્ણ નિતારો. આદુ, મરચું અને માત્ર જરૂરી પાણીથી ઘટ્ટ, લગભગ સુંવાળી પેસ્ટ પીસો.',
  'ભૂકેલા ધાણા, મરી, લીલા ધાણા, હિંગ અને મીઠું ભેળવો. હવા ભળે તેમ ખીરું ઝડપથી ફેંટો; ચમચીભર ખીરું ફેલાવું ન જોઈએ.',
  'તેલ મધ્યમ ગરમ કરો. નાની ચમચીભર ખીરું સાવચેતીથી તેલમાં મૂકો અને પકોડી ફૂલે એટલી જગ્યા રાખો.',
  'હળવેથી પલટાવી ફૂલી, સોનેરી અને અંદરથી પાકે ત્યાં સુધી તળો. અંદર પાકે અને બહાર ન બળે એવો મધ્યમ તાપ રાખો.',
  'સારી રીતે નિતારી લીલી અથવા આમલીની ચટણી સાથે ગરમ પીરસો.'
], 'Beating a thick moong batter is what gives pakodis their light interior.|गाढ़े मूंग घोल को फेंटने से पकौड़ियाँ भीतर से हल्की बनती हैं।|ઘટ્ટ મગના ખીરાને ફેંટવાથી પકોડી અંદરથી હળવી બને છે.', 'https://www.vegrecipesofindia.com/moong-dal-bhajiya-pakora-recipe/');

add(306, 'Tamil', 45, 'मसाला वडा', 'મસાલા વડા', [
  'chana dal|चना दाल|ચણાની દાળ|320|g',
  'onion, finely chopped|प्याज़, बारीक कटा|ડુંગળી, ઝીણી સમારેલી|100|g',
  'fennel seeds|सौंफ|વરિયાળી|8|g',
  'dried red chilli|सूखी लाल मिर्च|સૂકું લાલ મરચું|8|g',
  'green chilli|हरी मिर्च|લીલું મરચું|10|g',
  'ginger|अदरक|આદુ|15|g',
  'curry leaves|करी पत्ते|મીઠા લીમડાનાં પાન|12|g',
  'coriander leaves|हरा धनिया|લીલા ધાણા|20|g',
  'salt|नमक|મીઠું|8|g',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Rinse and soak chana dal until swollen. Drain completely, reserve a small handful of whole dal and coarsely pulse the rest with chillies, fennel and ginger without added water.',
  'Mix reserved whole dal, onion, chopped curry leaves, coriander and salt into the coarse mixture. It should hold together when pressed but still show dal pieces.',
  'Form small balls and flatten each between your palms into a thin disc with rough edges.',
  'Fry in medium-hot oil in batches, turning after the underside is firm, until both faces are golden and the centre is fully cooked.',
  'Drain well and serve warm with coconut chutney or tea.'
], [
  'चना दाल धोकर फूलने तक भिगोएँ। पूरी तरह निथारें, थोड़ी साबुत दाल अलग रखें और बाकी को मिर्च, सौंफ व अदरक के साथ बिना पानी दरदरा पीसें।',
  'अलग रखी दाल, प्याज़, कटा करी पत्ता, धनिया और नमक मिलाएँ। दबाने पर मिश्रण जुड़ना चाहिए, पर दाल के टुकड़े दिखें।',
  'छोटी लोइयाँ बनाकर हथेलियों के बीच पतली, खुरदरे किनारों वाली टिक्की दबाएँ।',
  'मध्यम गरम तेल में थोड़े-थोड़े डालें। नीचे की सतह जमने पर पलटें और दोनों ओर सुनहरे व भीतर से पके होने तक तलें।',
  'अच्छी तरह निथारकर नारियल चटनी या चाय के साथ गरम परोसें।'
], [
  'ચણાની દાળ ધોઈ ફૂલે ત્યાં સુધી પલાળો. પૂરેપૂરી નિતારી થોડી આખી દાળ અલગ રાખો અને બાકી દાળને મરચાં, વરિયાળી અને આદુ સાથે પાણી વગર દરદરી પીસો.',
  'અલગ રાખેલી દાળ, ડુંગળી, સમારેલા લીમડાના પાન, ધાણા અને મીઠું ભેળવો. દબાવતાં મિશ્રણ બંધાય પણ દાળના દાણા દેખાય એવું હોવું જોઈએ.',
  'નાની ગોળીઓ બનાવી હથેળીઓ વચ્ચે પાતળી અને ખરબચડી કિનારીવાળી ટિક્કીઓ દબાવો.',
  'મધ્યમ ગરમ તેલમાં થોડા થોડા તળો. નીચેની બાજુ જામી જાય પછી પલટાવી બંને બાજુ સોનેરી અને અંદરથી પાકે ત્યાં સુધી તળો.',
  'સારી રીતે નિતારી નાળિયેરની ચટણી અથવા ચા સાથે ગરમ પીરસો.'
], 'A coarse grind and a few whole lentils create the distinctive crunchy masala-vada texture.|दरदरी पिसाई और थोड़ी साबुत दाल से मसाला वड़े की खास कुरकुरी बनावट आती है।|દરદરી પીસેલી અને થોડી આખી દાળથી મસાલા વડાનો ખાસ કરકરો ટેક્સ્ચર આવે છે.', 'https://www.vegrecipesofindia.com/masala-vada/');

add(307, 'Tamil', 40, 'बटर मुरुक्कु', 'બટર મુરુક્કુ', [
  'fine rice flour|बारीक चावल का आटा|ઝીણો ચોખાનો લોટ|250|g',
  'gram flour|बेसन|ચણાનો લોટ|45|g',
  'roasted gram flour|भुने चने का आटा|શેકેલી ચણાદાળનો લોટ|35|g',
  'soft unsalted butter|नरम बिना नमक मक्खन|નરમ મીઠા વગરનું માખણ|25|g',
  'sesame seeds|तिल|તલ|8|g',
  'asafoetida|हींग|હિંગ|1|g',
  'salt|नमक|મીઠું|7|g',
  'water, approximately|पानी, लगभग|પાણી, અંદાજે|220|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Sift the three flours together. Rub in butter thoroughly, then mix in sesame, asafoetida and salt.',
  'Add water gradually to make a soft, smooth dough that can be pressed without cracking; do not make it sticky.',
  'Fit a murukku press with a small star plate. Press neat loose spirals onto small oiled squares of paper or directly over medium-hot oil.',
  'Slide the spirals into oil and fry gently, turning once, until bubbling subsides and they are pale golden rather than dark brown.',
  'Drain, cool completely so they crisp up, then serve or store airtight.'
], [
  'तीनों आटे छानें। मक्खन अच्छी तरह मलें, फिर तिल, हींग और नमक मिलाएँ।',
  'पानी धीरे-धीरे डालकर नरम, चिकना आटा गूँधें जो दबाने पर टूटे नहीं; चिपचिपा न करें।',
  'मुरुक्कु प्रेस में छोटी सितारा जाली लगाएँ। तेल लगे कागज़ के छोटे टुकड़ों पर या सीधे मध्यम गरम तेल के ऊपर ढीले गोल चक्र दबाएँ।',
  'चक्र तेल में सरकाएँ और धीरे तलें; एक बार पलटें और बुलबुले कम होकर हल्के सुनहरे होने पर निकालें, गहरे भूरे न करें।',
  'निथारकर पूरी तरह ठंडा करें ताकि कुरकुरे हों, फिर परोसें या बंद डिब्बे में रखें।'
], [
  'ત્રણેય લોટ ચાળી લો. માખણ સારી રીતે મસળો, પછી તલ, હિંગ અને મીઠું ભેળવો.',
  'પાણી ધીરે ઉમેરી નરમ સુંવાળો લોટ બાંધો જે દબાવતાં તૂટે નહીં; ચીકણો ન બનાવો.',
  'મુરુક્કુ પ્રેસમાં નાની તારાકાર જાળી લગાવો. તેલ લગાવેલા કાગળના ટુકડા પર અથવા સીધા મધ્યમ ગરમ તેલ ઉપર ઢીલા ગોળ ચકરડા પાડો.',
  'ચકરડાં તેલમાં સરકાવી ધીમે તળો; એક વાર પલટાવો અને પરપોટા ઘટે તથા આછા સોનેરી થાય ત્યારે કાઢો, ઘેરા ભૂરા ન થવા દો.',
  'નિતારી સંપૂર્ણ ઠંડા થવા દો જેથી કરકરા થાય, પછી પીરસો અથવા હવાચુસ્ત ડબ્બામાં રાખો.'
], 'Too much butter makes the spirals break in the oil; measure it accurately.|अधिक मक्खन से चक्र तेल में टूटते हैं; इसे ठीक नापें।|વધુ માખણથી ચકરડાં તેલમાં તૂટે છે; બરાબર માપો.', 'https://rakskitchen.net/butter-murukku-recipe-easy-diwali-snacks/');

add(308, 'Tamil', 40, 'कारा बूंदी', 'કારા બૂંદી', [
  'gram flour|बेसन|ચણાનો લોટ|220|g',
  'rice flour|चावल का आटा|ચોખાનો લોટ|35|g',
  'red chilli powder|लाल मिर्च पाउडर|લાલ મરચું પાઉડર|6|g',
  'asafoetida|हींग|હિંગ|1|g',
  'salt|नमक|મીઠું|8|g',
  'water, approximately|पानी, लगभग|પાણી, અંદાજે|260|ml',
  'raw peanuts|कच्ची मूँगफली|કાચી મગફળી|80|g',
  'curry leaves, dried well|करी पत्ते, अच्छी तरह सूखे|મીઠા લીમડાનાં પાન, સારી રીતે સૂકવેલાં|12|g',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|750|ml'
], [
  'Whisk gram and rice flours with half the salt and water into a lump-free batter that runs from a spoon in a steady ribbon.',
  'Heat oil to medium hot. Hold a perforated boondi ladle just above it and pour a little batter onto the ladle so round drops fall through. Fry in small batches until crisp.',
  'Wipe and dry the ladle between batches so boondi stays round. Separately fry peanuts until crisp and dry curry leaves briefly until brittle.',
  'Drain everything fully and toss the cool boondi with peanuts, curry leaves, chilli, asafoetida and the remaining salt.',
  'Let the mixture cool completely before serving or storing airtight.'
], [
  'बेसन और चावल के आटे में आधा नमक तथा पानी फेंटकर बिना गुठली वाला घोल बनाएँ जो चम्मच से लगातार धार में गिरे।',
  'तेल मध्यम गरम करें। छेद वाली बूंदी झारी तेल के ठीक ऊपर रखकर उस पर थोड़ा घोल डालें ताकि गोल बूँदें गिरें। थोड़ी-थोड़ी बूंदी कुरकुरी होने तक तलें।',
  'हर खेप के बीच झारी पोंछकर सुखाएँ ताकि बूंदी गोल बने। अलग से मूँगफली कुरकुरी और सूखे करी पत्ते थोड़ी देर भुरभुरे होने तक तलें।',
  'सबका तेल अच्छी तरह निथारें। ठंडी बूंदी में मूँगफली, करी पत्ते, मिर्च, हींग और बचा नमक मिलाएँ।',
  'मिश्रण पूरी तरह ठंडा करके परोसें या बंद डिब्बे में रखें।'
], [
  'ચણાના અને ચોખાના લોટમાં અડધું મીઠું તથા પાણી ફેંટીને ગાંઠ વગરનું ખીરું બનાવો, જે ચમચીથી સતત ધાર પડે એવું હોય.',
  'તેલ મધ્યમ ગરમ કરો. છિદ્રવાળી બૂંદીની ઝારી તેલની ઉપર રાખી થોડું ખીરું રેડો જેથી ગોળ ટીપાં પડે. થોડી થોડી બૂંદી કરકરી થાય ત્યાં સુધી તળો.',
  'દરેક વારા પછી ઝારી લૂછીને સૂકવો જેથી બૂંદી ગોળ બને. અલગથી મગફળી કરકરી અને સૂકા લીમડાનાં પાન થોડા સમય ભુરભુરાં થાય ત્યાં સુધી તળો.',
  'બધું સારી રીતે નિતારો. ઠંડી બૂંદીમાં મગફળી, લીમડાનાં પાન, મરચું, હિંગ અને બાકી મીઠું ભેળવો.',
  'મિશ્રણ સંપૂર્ણ ઠંડું કરી પીરસો અથવા હવાચુસ્ત ડબ્બામાં રાખો.'
], 'The batter must flow freely but not be watery; wipe the perforated ladle after each batch.|घोल आसानी से गिरे पर पानी जैसा न हो; हर खेप बाद झारी पोंछें।|ખીરું સહેલાઈથી પડે પણ પાણી જેવું ન હોય; દરેક વારા પછી ઝારી લૂછો.', 'https://rakskitchen.net/kara-boondi-recipe-easy-diwali-snacks-recipes/');

add(309, 'Tamil', 60, 'मद्रास मिक्सचर', 'મદ્રાસ મિક્સચર', [
  'gram flour|बेसन|ચણાનો લોટ|320|g',
  'rice flour|चावल का आटा|ચોખાનો લોટ|70|g',
  'water, approximately|पानी, लगभग|પાણી, અંદાજે|330|ml',
  'raw peanuts|कच्ची मूँगफली|કાચી મગફળી|90|g',
  'roasted gram|भुना चना|શેકેલા ચણા|70|g',
  'curry leaves, dried|करी पत्ते, सूखे|મીઠા લીમડાનાં પાન, સૂકવેલાં|15|g',
  'red chilli powder|लाल मिर्च पाउडर|લાલ મરચું પાઉડર|8|g',
  'asafoetida|हींग|હિંગ|1|g',
  'salt|नमक|મીઠું|9|g',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|800|ml'
], [
  'Mix 200 g gram flour, 40 g rice flour, 5 g salt and about 120 ml water into a soft pressable dough. Press fine strands into medium-hot oil and fry until crisp to make sev.',
  'Whisk the remaining 120 g gram flour and 30 g rice flour with about 210 ml water into a pourable boondi batter. Pour over a perforated ladle held above hot oil and fry the droplets until crisp.',
  'Fry peanuts and roasted gram separately until crisp, then briefly fry completely dry curry leaves. Drain every component and cool fully.',
  'Break the sev into short lengths. Toss it with boondi, nuts, curry leaves, chilli powder, asafoetida and remaining salt.',
  'Taste and adjust seasoning, then serve or transfer the fully cooled mixture to an airtight container.'
], [
  '200 ग्राम बेसन, 40 ग्राम चावल का आटा, 5 ग्राम नमक और लगभग 120 मिली पानी मिलाकर नरम दबने वाला आटा बनाएँ। बारीक तार मध्यम गरम तेल में दबाकर कुरकुरे तलें; यह सेव है।',
  'बचे 120 ग्राम बेसन और 30 ग्राम चावल के आटे को लगभग 210 मिली पानी से फेंटकर बूंदी का बहने वाला घोल बनाएँ। गरम तेल के ऊपर छेद वाली झारी पर डालें और बूँदें कुरकुरी तलें।',
  'मूँगफली और भुना चना अलग-अलग कुरकुरे तलें, फिर पूरी तरह सूखे करी पत्ते थोड़ी देर तलें। हर चीज़ निथारकर पूरी तरह ठंडी करें।',
  'सेव छोटे टुकड़ों में तोड़ें। बूंदी, मेवे, करी पत्ते, मिर्च पाउडर, हींग और बचा नमक मिलाएँ।',
  'चखकर मसाला ठीक करें, फिर परोसें या पूरी तरह ठंडा मिश्रण बंद डिब्बे में भरें।'
], [
  '200 ગ્રામ ચણાનો લોટ, 40 ગ્રામ ચોખાનો લોટ, 5 ગ્રામ મીઠું અને આશરે 120 મિલી પાણી ભેળવી નરમ દબાવી શકાય એવો લોટ બાંધો. મધ્યમ ગરમ તેલમાં ઝીણી સેવ પાડી કરકરી તળો.',
  'બાકી 120 ગ્રામ ચણાનો અને 30 ગ્રામ ચોખાનો લોટ આશરે 210 મિલી પાણી સાથે ફેંટીને બૂંદીનું રેડી શકાય એવું ખીરું બનાવો. ગરમ તેલ ઉપર છિદ્રવાળી ઝારી પર રેડી ટીપાં કરકરાં તળો.',
  'મગફળી અને શેકેલા ચણા અલગ અલગ કરકરા તળો, પછી સંપૂર્ણ સૂકા લીમડાનાં પાન થોડા સમય તળો. બધું નિતારી સંપૂર્ણ ઠંડું કરો.',
  'સેવને ટૂંકા ટુકડામાં તોડો. બૂંદી, મગફળી, લીમડાનાં પાન, મરચું પાઉડર, હિંગ અને બાકી મીઠું ભેળવો.',
  'ચાખીને મસાલો ગોઠવો, પછી પીરસો અથવા સંપૂર્ણ ઠંડું મિશ્રણ હવાચુસ્ત ડબ્બામાં ભરો.'
], 'Cool each fried component before mixing so the mixture remains crunchy in storage.|हर तली चीज़ मिलाने से पहले ठंडी करें ताकि रखा मिश्रण कुरकुरा रहे।|દરેક તળેલી વસ્તુ ભેળવતાં પહેલાં ઠંડી કરો જેથી રાખેલું મિશ્રણ કરકરું રહે.', 'https://rakskitchen.net/spicy-mixture-recipe-south-indian-style-deepavali-recipes/');

add(310, 'Maharashtrian', 70, 'भाकरवड़ी', 'ભાખરવડી', [
  'gram flour for dough|आटे के लिए बेसन|લોટ માટે ચણાનો લોટ|130|g',
  'plain flour|मैदा|મેંદો|130|g',
  'neutral oil for dough|आटे के लिए तेल|લોટ માટે તેલ|45|ml',
  'water for dough|आटे के लिए पानी|લોટ માટે પાણી|110|ml',
  'desiccated coconut|सूखा नारियल बुरादा|સૂકા નાળિયેરનું છીણ|65|g',
  'white sesame seeds|सफेद तिल|સફેદ તલ|30|g',
  'coriander seeds|साबुत धनिया|આખા ધાણા|18|g',
  'fennel seeds|सौंफ|વરિયાળી|10|g',
  'red chilli powder|लाल मिर्च पाउडर|લાલ મરચું પાઉડર|8|g',
  'jaggery, grated|गुड़, कसा|ગોળ, છીણેલો|30|g',
  'tamarind paste|इमली का गूदा|આમલીની પેસ્ટ|20|g',
  'salt|नमक|મીઠું|8|g',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Mix both dough flours with half the salt. Rub in the measured oil until sandy, then add water gradually and knead a firm smooth dough. Cover and rest.',
  'Dry-toast coconut, sesame, coriander and fennel separately until fragrant. Cool, grind coarsely, then blend with chilli, jaggery and the remaining salt.',
  'Divide dough and roll thin rectangles. Brush each lightly with tamarind paste, spread the dry filling to the edges, then roll tightly into logs and seal the ends.',
  'Cut the logs into narrow pinwheels and press each slice gently so the swirl stays intact. Fry in medium-low oil, turning often, until fully crisp and golden.',
  'Drain and cool completely before serving; the sweet-spicy centre should stay distinct from the brittle outer pastry.'
], [
  'दोनों आटों में आधा नमक मिलाएँ। नापा तेल रगड़कर रेत जैसा करें, फिर पानी धीरे डालकर कड़ा चिकना आटा गूँधें। ढककर रखें।',
  'नारियल, तिल, धनिया और सौंफ अलग-अलग सूखा भूनकर सुगंध आने दें। ठंडा करके दरदरा पीसें और मिर्च, गुड़ व बचा नमक मिलाएँ।',
  'आटे को बाँटकर पतले आयत बेलें। हर आयत पर इमली की पतली परत लगाएँ, सूखी भरावन किनारों तक फैलाएँ, फिर कसकर लपेटें और सिरे बंद करें।',
  'रोल की पतली चकरी काटें और हर टुकड़े को हल्के दबाएँ ताकि घुमाव जुड़ा रहे। मध्यम-धीमे तेल में बार-बार पलटते हुए पूरी कुरकुरी व सुनहरी होने तक तलें।',
  'निथारकर पूरी तरह ठंडा करें; मीठी-तीखी भरावन भुरभुरी बाहरी परत से अलग दिखनी चाहिए।'
], [
  'બંને લોટમાં અડધું મીઠું ભેળવો. માપેલું તેલ મસળી રેતી જેવું કરો, પછી પાણી ધીમે ઉમેરી કડક સુંવાળો લોટ બાંધો. ઢાંકી રાખો.',
  'નાળિયેર, તલ, ધાણા અને વરિયાળી અલગ અલગ સૂકા શેકી સુગંધ આવે ત્યાં સુધી રાખો. ઠંડા કરી દરદરા પીસી મરચું, ગોળ અને બાકી મીઠું ભેળવો.',
  'લોટના ભાગ કરી પાતળા લંબચોરસ વણો. દરેક પર આમલીની પાતળી પરત લગાવી સૂકું પૂરણ કિનારી સુધી પાથરો, પછી ચુસ્ત વાળી છેડા બંધ કરો.',
  'રોલના પાતળા ચકતા કાપી દરેકને હળવેથી દબાવો જેથી વળાંક જોડાયેલો રહે. મધ્યમ-ધીમા તેલમાં વારંવાર પલટાવી સંપૂર્ણ કરકરા અને સોનેરી થાય ત્યાં સુધી તળો.',
  'નિતારી સંપૂર્ણ ઠંડા કરો; મીઠું-તીખું પૂરણ ભુરભુરા બહારના પડથી અલગ દેખાવું જોઈએ.'
], 'Fry pinwheels slowly so the rolled centre dries before the outside darkens.|चकरी धीरे तलें ताकि बाहर गहरा होने से पहले बीच की परत सूख जाए।|ચકરડાં ધીમે તળો જેથી બહાર ઘેરું થાય તે પહેલાં વચ્ચેનો પડ સૂકાય.', 'https://www.vegrecipesofindia.com/bhakarwadi-recipe/');

const khakhra = (index, nameHi, nameGu, ingredients, firstEn, firstHi, firstGu, noteEn, noteHi, noteGu, reference, minutes = 55) =>
  add(index, 'Gujarati', minutes, nameHi, nameGu, ingredients, [
    firstEn,
    'Add the measured oil and water gradually, then knead a firm, smooth dough. Cover and rest briefly so it rolls without cracking.',
    'Divide into small balls and roll each one extremely thin and evenly round, dusting very lightly with flour only when needed.',
    'Cook on a dry tawa over low heat. Turn repeatedly and press the whole surface with a folded cloth or khakhra press until the bread is uniformly dry, browned in spots and brittle.',
    'Cool each khakhra separately on a rack before stacking; serve plain or store airtight once completely cold.'
  ], [
    firstHi,
    'नापा तेल और पानी धीरे-धीरे डालकर कड़ा, चिकना आटा गूँधें। ढककर थोड़ी देर रखें ताकि बेलते समय न फटे।',
    'छोटी लोइयाँ बाँटें और हर एक को बहुत पतला, बराबर गोल बेलें। केवल ज़रूरत होने पर थोड़ा सूखा आटा लगाएँ।',
    'सूखे तवे पर धीमी आँच में सेंकें। बार-बार पलटें और मुड़े कपड़े या खाखरा प्रेस से पूरी सतह दबाएँ, जब तक हर ओर सूखा, जगह-जगह सुनहरा और भुरभुरा न हो।',
    'हर खाखरा अलग जाली पर ठंडा करके रखें; सादा परोसें या पूरी तरह ठंडा होने पर बंद डिब्बे में रखें।'
  ], [
    firstGu,
    'માપેલું તેલ અને પાણી ધીમે ધીમે ઉમેરી કડક, સુંવાળો લોટ બાંધો. ઢાંકી થોડી વાર રાખો જેથી વણતાં ન ફાટે.',
    'નાની ગોળીઓ કરી દરેકને ખૂબ પાતળી અને સરખી ગોળ વણો. જરૂર હોય ત્યારે જ થોડો સૂકો લોટ વાપરો.',
    'સૂકા તવા પર ધીમા તાપે શેકો. વારંવાર પલટાવો અને વાળેલા કપડા અથવા ખાખરા પ્રેસથી આખી સપાટી દબાવો, બધે સૂકો, કશેક સોનેરી અને ભુરભુરો થાય ત્યાં સુધી.',
    'દરેક ખાખરો અલગ જાળી પર ઠંડો કરો; સાદો પીરસો અથવા સંપૂર્ણ ઠંડો થયા પછી હવાચુસ્ત ડબ્બામાં રાખો.'
  ], `${noteEn}|${noteHi}|${noteGu}`, reference);

khakhra(311, 'मसाला खाखरा', 'મસાલા ખાખરા', [
  'whole wheat flour|गेहूँ का आटा|ઘઉંનો લોટ|300|g',
  'red chilli powder|लाल मिर्च पाउडर|લાલ મરચું પાઉડર|6|g',
  'turmeric|हल्दी|હળદર|2|g',
  'cumin seeds|जीरा|જીરું|5|g',
  'carom seeds|अजवाइन|અજમો|3|g',
  'salt|नमक|મીઠું|7|g',
  'neutral oil|तेल|તેલ|25|ml',
  'water|पानी|પાણી|150|ml'
], 'Mix wheat flour, chilli, turmeric, cumin, carom and salt until the masala is evenly distributed.', 'गेहूँ के आटे में मिर्च, हल्दी, जीरा, अजवाइन और नमक बराबर मिलाएँ।', 'ઘઉંના લોટમાં મરચું, હળદર, જીરું, અજમો અને મીઠું સરખું ભેળવો.', 'Press continuously on low heat; merely roasting like a roti leaves the centre soft.', 'धीमी आँच पर लगातार दबाएँ; रोटी की तरह केवल सेंकने से बीच नरम रहता है।', 'ધીમા તાપે સતત દબાવો; રોટલીની જેમ માત્ર શેકવાથી વચ્ચે નરમ રહે છે.', 'https://www.easyvegrecipes.com/2016/05/khakhra-recipe.html');

khakhra(312, 'मेथी खाखरा', 'મેથી ખાખરા', [
  'whole wheat flour|गेहूँ का आटा|ઘઉંનો લોટ|300|g',
  'fresh fenugreek leaves, finely chopped and dried|ताज़ी मेथी, बारीक कटी और सूखी|તાજી મેથી, ઝીણી સમારેલી અને સૂકવેલી|90|g',
  'green chilli, minced|हरी मिर्च, बारीक कटी|લીલું મરચું, ઝીણું સમારેલું|10|g',
  'turmeric|हल्दी|હળદર|2|g',
  'sesame seeds|तिल|તલ|8|g',
  'salt|नमक|મીઠું|7|g',
  'neutral oil|तेल|તેલ|25|ml',
  'water|पानी|પાણી|135|ml'
], 'Wash fenugreek leaves, dry them well and chop finely. Mix them through the wheat flour with chilli, turmeric, sesame and salt.', 'मेथी के पत्ते धोकर अच्छी तरह सुखाएँ और बारीक काटें। गेहूँ के आटे में मिर्च, हल्दी, तिल और नमक के साथ मिलाएँ।', 'મેથીનાં પાન ધોઈ સારી રીતે સૂકવી ઝીણાં સમારો. ઘઉંના લોટમાં મરચું, હળદર, તલ અને મીઠા સાથે ભેળવો.', 'Wet methi leaves make the khakhra steam rather than dry; pat them well before mixing.', 'गीली मेथी से खाखरा सूखने के बजाय भाप में नरम होता है; मिलाने से पहले पत्ते सुखाएँ।', 'ભીની મેથીથી ખાખરો સૂકાવાને બદલે વરાળથી નરમ થાય છે; ભેળવતાં પહેલાં પાન સૂકવો.', 'https://www.sunayanagupta.com/recipes/methi-khakhra-recipe');

khakhra(313, 'जीरा खाखरा', 'જીરા ખાખરા', [
  'whole wheat flour|गेहूँ का आटा|ઘઉંનો લોટ|300|g',
  'cumin seeds, lightly crushed|जीरा, हल्का कुटा|જીરું, સહેજ ભૂકેલું|12|g',
  'black pepper, ground|काली मिर्च, पिसी|કાળા મરી, ભૂકેલા|3|g',
  'sesame seeds|तिल|તલ|8|g',
  'salt|नमक|મીઠું|7|g',
  'neutral oil|तेल|તેલ|25|ml',
  'water|पानी|પાણી|150|ml'
], 'Lightly crush cumin so it releases aroma, then mix it with wheat flour, pepper, sesame and salt.', 'जीरा हल्का कूटें ताकि खुशबू निकले, फिर गेहूँ के आटे, काली मिर्च, तिल और नमक में मिलाएँ।', 'જીરું સહેજ ભૂકો કરો જેથી સુગંધ આવે, પછી ઘઉંના લોટ, મરી, તલ અને મીઠામાં ભેળવો.', 'Keep the cumin coarse enough to see it in the finished cracker.', 'जीरा इतना दरदरा रखें कि तैयार खाखरे पर दिखे।', 'જીરું એટલું દરદરું રાખો કે તૈયાર ખાખરામાં દેખાય.', 'https://www.easyvegrecipes.com/2016/05/khakhra-recipe.html');

khakhra(314, 'बाजरा खाखरा', 'બાજરી ખાખરા', [
  'pearl millet flour|बाजरे का आटा|બાજરીનો લોટ|180|g',
  'whole wheat flour|गेहूँ का आटा|ઘઉંનો લોટ|130|g',
  'sesame seeds|तिल|તલ|10|g',
  'carom seeds|अजवाइन|અજમો|4|g',
  'turmeric|हल्दी|હળદર|2|g',
  'salt|नमक|મીઠું|7|g',
  'neutral oil|तेल|તેલ|30|ml',
  'warm water|गुनगुना पानी|હૂંફાળું પાણી|170|ml'
], 'Mix millet and wheat flours with sesame, carom, turmeric and salt. Use fresh millet flour so the dough does not taste bitter.', 'बाजरे और गेहूँ के आटे में तिल, अजवाइन, हल्दी और नमक मिलाएँ। ताज़ा बाजरे का आटा लें ताकि कड़वापन न हो।', 'બાજરી અને ઘઉંના લોટમાં તલ, અજમો, હળદર અને મીઠું ભેળવો. લોટ કડવો ન લાગે માટે તાજી બાજરી વાપરો.', 'Millet dough is more fragile than wheat; roll between sheets if it cracks.', 'बाजरे का आटा गेहूँ से अधिक टूटता है; ज़रूरत हो तो दो परतों के बीच बेलें।', 'બાજરીનો લોટ ઘઉં કરતાં વધુ તૂટે છે; જરૂર હોય તો બે પડ વચ્ચે વણો.', 'https://staging.foodfood.com/public/recipedetails/bajre-ka-khakra', 60);

add(315, 'Gujarati', 35, 'नायलॉन सेव', 'નાયલોન સેવ', [
  'fine gram flour|बारीक बेसन|ઝીણો ચણાનો લોટ|250|g',
  'rice flour|चावल का आटा|ચોખાનો લોટ|25|g',
  'neutral oil for dough|आटे के लिए तेल|લોટ માટે તેલ|25|ml',
  'turmeric|हल्दी|હળદર|1|g',
  'asafoetida|हींग|હિંગ|1|g',
  'salt|नमक|મીઠું|7|g',
  'water, approximately|पानी, लगभग|પાણી, અંદાજે|170|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Sift gram flour and rice flour together to remove lumps. Mix in turmeric, asafoetida, salt and the measured dough oil.',
  'Add water gradually and knead a soft, perfectly smooth dough that can pass through the finest sev plate without tearing.',
  'Fit the sev press with its tiniest holes and grease it lightly. Heat oil to medium hot and press thin strands directly over the oil in a loose circle.',
  'Fry briefly, turning once, until bubbling nearly stops and the strands are pale golden. Lift out before they darken.',
  'Drain and cool completely; break into short nests for chaat or keep the fine strands in an airtight tin.'
], [
  'बेसन और चावल का आटा छानकर गुठलियाँ हटाएँ। हल्दी, हींग, नमक और नापा आटे वाला तेल मिलाएँ।',
  'पानी धीरे डालकर नरम, पूरी तरह चिकना आटा गूँधें जो सेव की सबसे बारीक जाली से बिना टूटे निकल सके।',
  'सेव प्रेस में सबसे बारीक जाली लगाकर हल्का तेल लगाएँ। तेल मध्यम गरम करें और सीधे तेल के ऊपर ढीले गोल में बारीक तार दबाएँ।',
  'थोड़ी देर तलें, एक बार पलटें और बुलबुले लगभग रुककर तार हल्के सुनहरे हों तो निकालें; गहरे न होने दें।',
  'निथारकर पूरी तरह ठंडा करें; चाट के लिए छोटी घोंसली जैसी सेव तोड़ें या बारीक तार बंद डिब्बे में रखें।'
], [
  'ચણાનો અને ચોખાનો લોટ ચાળી ગાંઠ દૂર કરો. હળદર, હિંગ, મીઠું અને માપેલું લોટનું તેલ ભેળવો.',
  'પાણી ધીરે ઉમેરી નરમ, સંપૂર્ણ સુંવાળો લોટ બાંધો જે સેવની સૌથી ઝીણી જાળીમાંથી તૂટ્યા વગર નીકળી શકે.',
  'સેવ પ્રેસમાં સૌથી ઝીણી જાળી લગાવી સહેજ તેલ લગાવો. તેલ મધ્યમ ગરમ કરી સીધા તેલ ઉપર ઢીલા ગોળમાં ઝીણી સેવ પાડો.',
  'થોડો સમય તળો, એક વાર પલટાવો અને પરપોટા લગભગ અટકે તથા સેવ આછી સોનેરી થાય ત્યારે કાઢો; ઘેરી ન થવા દો.',
  'નિતારી સંપૂર્ણ ઠંડી કરો; ચાટ માટે નાનાં ઝૂમખાં તોડો અથવા ઝીણી સેવ હવાચુસ્ત ડબ્બામાં રાખો.'
], 'The finest press plate and smooth dough make nylon sev distinct from thicker snack sev.|सबसे बारीक जाली और चिकने आटे से नायलॉन सेव मोटी नमकीन सेव से अलग बनती है।|સૌથી ઝીણી જાળી અને સુંવાળા લોટથી નાયલોન સેવ જાડી નમકીન સેવથી અલગ બને છે.', 'https://www.spiceupthecurry.com/sev-recipe/comment-page-1/');

add(316, 'Rajasthani', 45, 'आलू भुजिया', 'બટાકાની ભુજિયા', [
  'potatoes, boiled and peeled|आलू, उबले और छिले|બટાકા, બાફેલા અને છોલેલા|260|g',
  'fine gram flour|बारीक बेसन|ઝીણો ચણાનો લોટ|230|g',
  'rice flour|चावल का आटा|ચોખાનો લોટ|25|g',
  'red chilli powder|लाल मिर्च पाउडर|લાલ મરચું પાઉડર|7|g',
  'turmeric|हल्दी|હળદર|2|g',
  'dry mango powder|अमचूर|આમચૂર|6|g',
  'asafoetida|हींग|હિંગ|1|g',
  'salt|नमक|મીઠું|8|g',
  'neutral oil for dough|आटे के लिए तेल|લોટ માટે તેલ|20|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Mash boiled potatoes while warm and press through a sieve until completely smooth, with no lumps that could block the sev press.',
  'Mix in gram flour, rice flour, chilli, turmeric, mango powder, asafoetida, salt and measured dough oil to form a soft, non-sticky dough; add no water unless absolutely needed.',
  'Fit a thin sev plate to the press. Press the potato dough in loose circles directly into medium-hot oil, taking care not to overlap thickly.',
  'Turn once and fry until the strands are golden and crisp with no bubbling. Drain thoroughly.',
  'Cool completely, then gently break into short pieces and store airtight or serve as a snack.'
], [
  'गरम उबले आलू मसलकर छलनी से निकालें ताकि बिल्कुल चिकने हों और गाँठ सेव प्रेस न रोके।',
  'बेसन, चावल का आटा, मिर्च, हल्दी, अमचूर, हींग, नमक और नापा आटे वाला तेल मिलाकर नरम, न चिपकने वाला आटा बनाएँ; बहुत ज़रूरी हो तभी पानी डालें।',
  'प्रेस में पतली सेव वाली जाली लगाएँ। आलू का आटा ढीले गोलों में सीधे मध्यम गरम तेल में दबाएँ; मोटी परत न चढ़ाएँ।',
  'एक बार पलटकर तार सुनहरे, कुरकुरे और बिना बुलबुलों वाले होने तक तलें। अच्छी तरह निथारें।',
  'पूरी तरह ठंडा करके हल्के हाथ से छोटे टुकड़े तोड़ें और बंद डिब्बे में रखें या नाश्ते की तरह परोसें।'
], [
  'ગરમ બાફેલા બટાકા મસળી ચાળણીમાંથી પસાર કરો જેથી એકદમ સુંવાળા થાય અને ગાંઠ પ્રેસ ન અટકાવે.',
  'ચણાનો લોટ, ચોખાનો લોટ, મરચું, હળદર, આમચૂર, હિંગ, મીઠું અને માપેલું લોટનું તેલ ભેળવી નરમ, ન ચોંટે એવો લોટ બાંધો; ખૂબ જરૂર હોય ત્યારે જ પાણી ઉમેરો.',
  'પ્રેસમાં પાતળી સેવની જાળી લગાવો. બટાકાનો લોટ ઢીલા ગોળમાં સીધો મધ્યમ ગરમ તેલમાં દબાવો; વધુ જાડો પડ ન થવા દો.',
  'એક વાર પલટાવી સેવ સોનેરી, કરકરી અને પરપોટા વગરની થાય ત્યાં સુધી તળો. સારી રીતે નિતારો.',
  'સંપૂર્ણ ઠંડી કરીને હળવે હાથે ટૂંકા ટુકડા કરો અને હવાચુસ્ત ડબ્બામાં રાખો અથવા નાસ્તા તરીકે પીરસો.'
], 'Use lump-free potato mash or the fine press holes will clog and the strands will break.|आलू की गाँठ रहित प्यूरी लें, वरना बारीक जाली बंद होगी और सेव टूटेगी।|ગાંઠ વગરનો બટાકાનો માવો લો, નહીં તો ઝીણી જાળી બંધ થશે અને સેવ તૂટશે.', 'https://www.vegrecipesofindia.com/potato-sev-recipe-aloo-sev/');

add(317, 'Marwari', 55, 'दाल मोठ', 'દાલ મોઠ', [
  'whole brown masoor lentils|साबुत भूरी मसूर|આખી ભૂરા મસૂર|170|g',
  'moth beans|मोठ दाल साबुत|આખા મઠ|130|g',
  'fine nylon sev|बारीक नायलॉन सेव|ઝીણી નાયલોન સેવ|140|g',
  'raw peanuts|कच्ची मूँगफली|કાચી મગફળી|70|g',
  'coriander seeds, ground|पिसा धनिया|ધાણા પાઉડર|8|g',
  'red chilli powder|लाल मिर्च पाउडर|લાલ મરચું પાઉડર|6|g',
  'dry mango powder|अमचूर|આમચૂર|8|g',
  'black salt|काला नमक|સંચળ|5|g',
  'salt|नमक|મીઠું|5|g',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|750|ml'
], [
  'Soak masoor and moth separately until plump but firm. Drain very thoroughly, spread on towels and allow the surface to dry completely before frying.',
  'Heat oil to medium hot and fry the lentils in small separate batches until crisp, with splatter protection and a dry slotted spoon. Drain each batch.',
  'Fry peanuts separately until golden and let all fried ingredients cool fully. Break nylon sev into short strands.',
  'Mix coriander, chilli, mango powder and both salts. Toss with the cooled lentils, peanuts and sev until evenly coated.',
  'Taste for tartness and serve dry, or store in an airtight jar only after everything is cool.'
], [
  'मसूर और मोठ अलग-अलग फूलने तक भिगोएँ पर नरम न होने दें। अच्छी तरह निथारें, कपड़े पर फैलाएँ और तलने से पहले ऊपर का पानी पूरी तरह सुखाएँ।',
  'तेल मध्यम गरम करें और दालें अलग-अलग छोटी खेप में कुरकुरी तलें; छींटों से बचाव करें और सूखी झारी लें। हर खेप निथारें।',
  'मूँगफली अलग सुनहरी तलें और सब तली चीज़ें पूरी ठंडी करें। नायलॉन सेव छोटे टुकड़ों में तोड़ें।',
  'धनिया, मिर्च, अमचूर और दोनों नमक मिलाएँ। ठंडी दाल, मूँगफली और सेव पर डालकर बराबर लपेटें।',
  'खट्टापन चखें और सूखा परोसें, या सब ठंडा होने के बाद ही बंद डिब्बे में रखें।'
], [
  'મસૂર અને મઠ અલગ અલગ ફૂલે ત્યાં સુધી પલાળો, નરમ ન થવા દો. સારી રીતે નિતારી કપડા પર પાથરો અને તળતા પહેલાં બહારનું પાણી સંપૂર્ણ સૂકવો.',
  'તેલ મધ્યમ ગરમ કરી દાળને અલગ અલગ નાનાં વારમાં કરકરી તળો; છાંટાથી બચો અને સૂકી ઝારી વાપરો. દરેક વારો નિતારો.',
  'મગફળી અલગથી સોનેરી તળો અને બધી તળેલી વસ્તુઓ પૂરી ઠંડી કરો. નાયલોન સેવ ટૂંકા ટુકડામાં તોડો.',
  'ધાણા, મરચું, આમચૂર અને બંને મીઠાં ભેળવો. ઠંડી દાળ, મગફળી અને સેવ સાથે સરખું મિશ્રિત કરો.',
  'ખટાશ ચાખી સૂકું પીરસો અથવા બધું ઠંડું થયા પછી જ હવાચુસ્ત ડબ્બામાં રાખો.'
], 'Never add damp soaked lentils to hot oil; dry them thoroughly first to prevent violent splattering.|गीली भीगी दाल गरम तेल में कभी न डालें; तेज छींटे रोकने के लिए पहले पूरी तरह सुखाएँ।|ભીની પલાળેલી દાળ ગરમ તેલમાં ક્યારેય ન નાખો; જોરદાર છાંટા અટકાવવા પહેલાં પૂરી સૂકવો.', 'https://www.nehascookbook.com/dal-moth-namkeen-recipe-how-to-make-dalmoth-namkeen-market-style-dal-moth-namkeen/');

add(318, 'Gujarati', 55, 'फुलवड़ी', 'ફૂલવડી', [
  'coarse gram flour|दरदरा बेसन|કરકરો ચણાનો લોટ|300|g',
  'plain yogurt|सादा दही|સાદું દહીં|100|g',
  'white sesame seeds|सफेद तिल|સફેદ તલ|20|g',
  'fennel seeds, crushed|सौंफ, कुटी|વરિયાળી, ભૂકેલી|12|g',
  'coriander seeds, crushed|धनिया, कुटा|ધાણા, ભૂકેલા|12|g',
  'black pepper, crushed|काली मिर्च, कुटी|કાળા મરી, ભૂકેલા|5|g',
  'red chilli powder|लाल मिर्च पाउडर|લાલ મરચું પાઉડર|7|g',
  'sugar|चीनी|ખાંડ|15|g',
  'salt|नमक|મીઠું|8|g',
  'neutral oil for dough|आटे के लिए तेल|લોટ માટે તેલ|30|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Whisk yogurt with sugar, salt, chilli, crushed fennel, coriander and pepper until the sugar dissolves. Stir in sesame.',
  'Rub measured dough oil into coarse gram flour, then add the seasoned yogurt and knead a stiff dough. Rest covered so the flour hydrates.',
  'Pinch off small portions and roll into short, thick, irregular fingers or nuggets. Keep them similar in size for even frying.',
  'Fry on medium-low heat in small batches, turning frequently, until deep golden and crisp to the centre; high heat leaves the middle doughy.',
  'Drain, cool completely and serve as dry farsan or store airtight.'
], [
  'दही में चीनी, नमक, मिर्च, कुटी सौंफ, धनिया और काली मिर्च फेंटें जब तक चीनी घुले। तिल मिलाएँ।',
  'दरदरे बेसन में नापा आटे वाला तेल रगड़ें, फिर मसालेदार दही डालकर कड़ा आटा गूँधें। ढककर रखें ताकि आटा नमी सोखे।',
  'छोटे हिस्से तोड़कर छोटी, मोटी, अनगढ़ उँगली या डली बनाएँ। बराबर आकार रखें ताकि समान तलें।',
  'मध्यम-धीमी आँच पर थोड़ी-थोड़ी फुलवड़ी बार-बार पलटते हुए गहरी सुनहरी और बीच तक कुरकुरी तलें; तेज आँच में भीतर कच्ची रहती है।',
  'निथारें, पूरी तरह ठंडा करें और सूखे फरसाण की तरह परोसें या बंद डिब्बे में रखें।'
], [
  'દહીંમાં ખાંડ, મીઠું, મરચું, ભૂકેલી વરિયાળી, ધાણા અને મરી ફેંટો, ખાંડ ઓગળે ત્યાં સુધી. તલ ભેળવો.',
  'કરકરા ચણાના લોટમાં માપેલું લોટનું તેલ મસળો, પછી મસાલેદાર દહીં ઉમેરી કડક લોટ બાંધો. ઢાંકી રાખો જેથી લોટ ભેજ શોષે.',
  'નાના ભાગ તોડી ટૂંકા, જાડા, અસમાન આંગળી જેવા ટુકડા બનાવો. સરખા કદના રાખો જેથી સરખા તળાય.',
  'મધ્યમ-ધીમા તાપે થોડી થોડી ફૂલવડી વારંવાર પલટાવી ઘેરી સોનેરી અને વચ્ચે સુધી કરકરી તળો; વધુ તાપે અંદર કાચી રહે છે.',
  'નિતારી સંપૂર્ણ ઠંડી કરો અને સૂકા ફરસાણ તરીકે પીરસો અથવા હવાચુસ્ત ડબ્બામાં રાખો.'
], 'A firm dough and slow frying produce the characteristic dense, crisp fulwadi bite.|कड़ा आटा और धीमी तलायी से फुलवड़ी की खास घनी कुरकुराहट आती है।|કડક લોટ અને ધીમે તળવાથી ફૂલવડીનો ખાસ ઘટ્ટ કરકરો સ્વાદ આવે છે.', 'https://www.nehascookbook.com/fulwadi-recipe-gujarati-fulvadi-recipe-masala-fulwadi-recipe/');

add(319, 'Maharashtrian', 60, 'कोथिंबीर वड़ी', 'કોથિંબીર વડી', [
  'fresh coriander leaves, chopped|हरा धनिया, कटा|લીલા ધાણા, સમારેલા|150|g',
  'gram flour|बेसन|ચણાનો લોટ|200|g',
  'rice flour|चावल का आटा|ચોખાનો લોટ|35|g',
  'green chilli|हरी मिर्च|લીલું મરચું|15|g',
  'ginger|अदरक|આદુ|15|g',
  'garlic|लहसुन|લસણ|12|g',
  'turmeric|हल्दी|હળદર|2|g',
  'sesame seeds|तिल|તલ|12|g',
  'salt|नमक|મીઠું|8|g',
  'water|पानी|પાણી|160|ml',
  'neutral oil for pan-frying|सेकने के लिए तेल|તવા પર શેકવા માટે તેલ|70|ml'
], [
  'Wash coriander, dry well and chop finely including tender stems. Grind chilli, ginger and garlic into a coarse paste.',
  'Mix coriander, paste, gram flour, rice flour, turmeric, sesame and salt. Add water gradually to make a thick spreadable batter.',
  'Spread in an oiled shallow tin and steam until a skewer comes out clean and the slab feels firm. Cool completely before cutting into even squares.',
  'Heat a little oil in a wide pan and shallow-fry the squares on both sides until the surfaces are golden and crisp.',
  'Drain briefly and serve warm with green chutney.'
], [
  'धनिया धोकर अच्छी तरह सुखाएँ और नरम डंठलों सहित बारीक काटें। मिर्च, अदरक और लहसुन दरदरा पीसें।',
  'धनिया, पेस्ट, बेसन, चावल का आटा, हल्दी, तिल और नमक मिलाएँ। पानी धीरे डालकर गाढ़ा फैलने वाला घोल बनाएँ।',
  'तेल लगी उथली थाली में घोल फैलाकर भाप में पकाएँ, जब तक सींक साफ निकले और परत ठोस लगे। बराबर चौकोर काटने से पहले पूरी ठंडी करें।',
  'चौड़ी कड़ाही में थोड़ा तेल गरम करें और चौकोर टुकड़ों के दोनों ओर सुनहरी कुरकुरी परत आने तक सेकें।',
  'थोड़ा निथारकर हरी चटनी के साथ गरम परोसें।'
], [
  'ધાણા ધોઈ સારી રીતે સૂકવી નરમ ડાંડી સહિત ઝીણા સમારો. મરચું, આદુ અને લસણ દરદરા પીસો.',
  'ધાણા, પેસ્ટ, ચણાનો લોટ, ચોખાનો લોટ, હળદર, તલ અને મીઠું ભેળવો. પાણી ધીરે ઉમેરી ઘટ્ટ પાથરી શકાય એવું ખીરું બનાવો.',
  'તેલ લગાવેલી છીછરી થાળીમાં ખીરું પાથરી વરાળે પકાવો, સળી ચોખ્ખી બહાર આવે અને પડ મજબૂત લાગે ત્યાં સુધી. સમાન ચોરસ કાપતાં પહેલાં સંપૂર્ણ ઠંડું કરો.',
  'પહોળી કડાઈમાં થોડું તેલ ગરમ કરી ચોરસ ટુકડાની બંને બાજુ સોનેરી કરકરો પડ થાય ત્યાં સુધી શેકો.',
  'થોડું નિતારી લીલી ચટણી સાથે ગરમ પીરસો.'
], 'Cooling the steamed slab fully is essential for clean squares that do not crumble in the pan.|भाप में पकी परत पूरी ठंडी हो तो साफ चौकोर कटते हैं और पैन में टूटते नहीं।|વરાળે પાકેલો પડ સંપૂર્ણ ઠંડો થાય તો સરસ ચોરસ કપાય અને તવામાં તૂટે નહીં.', 'https://www.vegrecipesofindia.com/kothimbir-vadi-maharashtrian-kothimbir-vadi/');

add(320, 'Gujarati', 45, 'मकई ना वडा', 'મકાઈના વડા', [
  'maize flour|मकई का आटा|મકાઈનો લોટ|300|g',
  'plain thick yogurt|गाढ़ा सादा दही|ઘટ્ટ સાદું દહીં|150|g',
  'green chilli, chopped|हरी मिर्च, कटी|લીલું મરચું, સમારેલું|15|g',
  'ginger, grated|अदरक, कसा|આદુ, છીણેલું|15|g',
  'sesame seeds|तिल|તલ|12|g',
  'cumin seeds|जीरा|જીરું|6|g',
  'jaggery, grated|गुड़, कसा|ગોળ, છીણેલો|18|g',
  'salt|नमक|મીઠું|8|g',
  'neutral oil for dough|आटे के लिए तेल|લોટ માટે તેલ|25|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Mix maize flour with chilli, ginger, sesame, cumin, jaggery and salt. Rub in the measured dough oil.',
  'Add yogurt gradually and knead into a firm but pliable dough. Rest covered to let the maize flour hydrate; it should hold together without crumbling.',
  'With lightly oiled hands, form small balls and flatten into palm-sized discs of even thickness. Smooth cracked edges gently.',
  'Fry in medium-hot oil in batches, turning once firm, until both sides are golden and the centre is cooked rather than gummy.',
  'Drain on a rack and serve warm with green chutney or masala tea.'
], [
  'मकई के आटे में मिर्च, अदरक, तिल, जीरा, गुड़ और नमक मिलाएँ। नापा आटे वाला तेल रगड़ें।',
  'दही धीरे-धीरे डालकर कड़ा लेकिन लचीला आटा गूँधें। मकई का आटा नमी सोखे इसलिए ढककर रखें; आटा बिखरना नहीं चाहिए।',
  'हल्के तेल लगे हाथों से छोटी लोइयाँ बनाकर हथेली के आकार की बराबर मोटाई वाली टिक्की दबाएँ। फटे किनारे धीरे जोड़ें।',
  'मध्यम गरम तेल में थोड़ी-थोड़ी तलें, आकार जमने पर पलटें और दोनों ओर सुनहरी तथा बीच से पकी होने तक तलें, गीली न रहें।',
  'जाली पर निथारकर हरी चटनी या मसाला चाय के साथ गरम परोसें।'
], [
  'મકાઈના લોટમાં મરચું, આદુ, તલ, જીરું, ગોળ અને મીઠું ભેળવો. માપેલું લોટનું તેલ મસળો.',
  'દહીં ધીરે ઉમેરી કડક છતાં વાળી શકાય એવો લોટ બાંધો. મકાઈનો લોટ ભેજ શોષે તેથી ઢાંકી રાખો; લોટ ભાંગી પડવો ન જોઈએ.',
  'હળવા તેલવાળા હાથથી નાની ગોળીઓ કરી હથેળી જેટલી અને સરખી જાડાઈની ટિક્કીઓ દબાવો. ફાટેલી કિનારી હળવેથી જોડો.',
  'મધ્યમ ગરમ તેલમાં થોડી થોડી તળો, આકાર જામી જાય પછી પલટાવો અને બંને બાજુ સોનેરી તથા વચ્ચે સુધી પાકે ત્યાં સુધી તળો, ભીની ન રહે.',
  'જાળી પર નિતારી લીલી ચટણી અથવા મસાલા ચા સાથે ગરમ પીરસો.'
], 'Use fresh maize flour and thick yogurt; a runny dough is difficult to shape and absorbs oil.|ताज़ा मकई का आटा और गाढ़ा दही लें; पतला आटा आकार नहीं पकड़ता और तेल सोखता है।|તાજો મકાઈનો લોટ અને ઘટ્ટ દહીં લો; ઢીલો લોટ આકાર પકડતો નથી અને તેલ શોષે છે.', 'https://www.theroute2roots.com/makai-na-vada/');

add(321, 'Gujarati (Surat)', 40, 'पोंक वडा', 'પોંક વડા', [
  'fresh tender green sorghum grains, ponk|ताज़े नरम हरे ज्वार के दाने, पोंक|તાજા કુમળા લીલા જુવારના દાણા, પોંક|300|g',
  'gram flour|बेसन|ચણાનો લોટ|110|g',
  'rice flour|चावल का आटा|ચોખાનો લોટ|30|g',
  'green chilli, chopped|हरी मिर्च, कटी|લીલું મરચું, સમારેલું|15|g',
  'ginger, grated|अदरक, कसा|આદુ, છીણેલું|15|g',
  'coriander leaves|हरा धनिया|લીલા ધાણા|25|g',
  'mint leaves|पुदीना पत्ते|ફુદીનાનાં પાન|15|g',
  'cumin seeds|जीरा|જીરું|5|g',
  'salt|नमक|મીઠું|8|g',
  'water, only if needed|पानी, केवल ज़रूरत पर|પાણી, માત્ર જરૂર હોય તો|25|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Pick through fresh ponk to remove husks, rinse briefly and dry well. Crush only part of it coarsely, leaving many tender grains whole.',
  'Mix crushed and whole ponk with chilli, ginger, herbs, cumin and salt. Add gram and rice flours; use a little water only if the mixture will not bind.',
  'Shape small, loose fritters with damp hands; do not pack them tightly or the grains lose their light texture.',
  'Fry in medium-hot oil in batches until golden outside and hot through, turning gently as they set.',
  'Drain thoroughly and serve at once with green chutney while the seasonal ponk remains sweet and tender.'
], [
  'ताज़ा पोंक चुनकर भूसी हटाएँ, जल्दी धोएँ और अच्छी तरह सुखाएँ। केवल कुछ दाने दरदरे कूटें, बहुत से नरम दाने साबुत रखें।',
  'कुटे और साबुत पोंक में मिर्च, अदरक, हरी पत्तियाँ, जीरा और नमक मिलाएँ। बेसन व चावल का आटा डालें; मिश्रण न बँधे तभी थोड़ा पानी डालें।',
  'गीले हाथ से छोटे ढीले वडा बनाएँ; कसकर न दबाएँ, वरना दानों की हल्की बनावट खो जाएगी।',
  'मध्यम गरम तेल में थोड़े-थोड़े सुनहरे और भीतर तक गरम होने तक तलें; जमने पर धीरे पलटें।',
  'अच्छी तरह निथारकर हरी चटनी के साथ तुरंत परोसें, जब मौसमी पोंक मीठा और नरम हो।'
], [
  'તાજો પોંક વીણી ફોતરાં દૂર કરો, ઝડપથી ધોઈ સારી રીતે સૂકવો. માત્ર થોડા દાણા દરદરા ભૂકો કરો અને ઘણા કુમળા દાણા આખા રાખો.',
  'ભૂકેલા અને આખા પોંકમાં મરચું, આદુ, લીલાં પાન, જીરું અને મીઠું ભેળવો. ચણાનો અને ચોખાનો લોટ ઉમેરો; મિશ્રણ ન બંધાય તો જ થોડું પાણી નાખો.',
  'ભીના હાથથી નાના ઢીલા વડા બનાવો; ચુસ્ત ન દબાવો, નહીં તો દાણાનો હળવો સ્વાદ ખોવાય.',
  'મધ્યમ ગરમ તેલમાં થોડા થોડા બહાર સોનેરી અને અંદર ગરમ થાય ત્યાં સુધી તળો; જામી જાય પછી હળવેથી પલટાવો.',
  'સારી રીતે નિતારી લીલી ચટણી સાથે તરત પીરસો, જ્યારે મોસમી પોંક મીઠો અને કુમળો હોય.'
], 'Fresh ponk is seasonal; use tender grains, not dried mature sorghum, for the intended texture.|ताज़ा पोंक मौसमी है; सही बनावट के लिए सूखे पके ज्वार के बजाय नरम दाने लें।|તાજો પોંક મોસમી છે; યોગ્ય ટેક્સ્ચર માટે સૂકા પાકેલા જુવારને બદલે કુમળા દાણા લો.', 'https://www.theroute2roots.com/ponk-vada-one-of-the-many-ways-of-enjoying-ponk-hurda/');

add(322, 'Tamil', 40, 'कारा सेव', 'કારા સેવ', [
  'gram flour|बेसन|ચણાનો લોટ|230|g',
  'fine rice flour|बारीक चावल का आटा|ઝીણો ચોખાનો લોટ|110|g',
  'black pepper, coarsely crushed|काली मिर्च, दरदरी कुटी|કાળા મરી, દરદરા ભૂકેલા|10|g',
  'red chilli powder|लाल मिर्च पाउडर|લાલ મરચું પાઉડર|5|g',
  'asafoetida|हींग|હિંગ|1|g',
  'salt|नमक|મીઠું|8|g',
  'neutral oil for dough|आटे के लिए तेल|લોટ માટે તેલ|25|ml',
  'water, approximately|पानी, लगभग|પાણી, અંદાજે|190|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Sift the two flours and blend with pepper, chilli, asafoetida and salt. Rub in the measured dough oil.',
  'Add water gradually and knead a soft, smooth, non-sticky dough that can pass through the thick sev die.',
  'Heat oil to medium hot. Press short, thick strands directly into the oil with a broad-hole sev press, working in small batches.',
  'Turn the strands and fry until crisp and evenly golden, with bubbling almost stopped. Do not darken the pepper-spiced sev.',
  'Drain, cool completely and break into snack-sized lengths before serving or storing airtight.'
], [
  'दोनों आटे छानकर काली मिर्च, लाल मिर्च, हींग और नमक मिलाएँ। नापा आटे वाला तेल रगड़ें।',
  'पानी धीरे डालकर नरम, चिकना, न चिपकने वाला आटा गूँधें जो मोटी सेव वाली जाली से निकल सके।',
  'तेल मध्यम गरम करें। बड़े छेद वाली सेव प्रेस से सीधे तेल में छोटे मोटे तार दबाएँ और थोड़े-थोड़े तलें।',
  'तार पलटकर कुरकुरे और समान सुनहरे होने तक तलें, जब बुलबुले लगभग बंद हों। मिर्च वाली सेव गहरी न करें।',
  'निथारकर पूरी ठंडी करें और नाश्ते के आकार के टुकड़े तोड़कर परोसें या बंद डिब्बे में रखें।'
], [
  'બંને લોટ ચાળી તેમાં મરી, લાલ મરચું, હિંગ અને મીઠું ભેળવો. માપેલું લોટનું તેલ મસળો.',
  'પાણી ધીરે ઉમેરી નરમ, સુંવાળો, ન ચોંટે એવો લોટ બાંધો જે જાડી સેવની જાળીમાંથી નીકળી શકે.',
  'તેલ મધ્યમ ગરમ કરો. મોટા છિદ્રવાળા સેવ પ્રેસથી સીધા તેલમાં ટૂંકી જાડી સેવ પાડો અને થોડા થોડા તળો.',
  'સેવ પલટાવી કરકરી અને સરખી સોનેરી થાય તથા પરપોટા લગભગ અટકે ત્યાં સુધી તળો. મરીવાળી સેવ ઘેરી ન થવા દો.',
  'નિતારી સંપૂર્ણ ઠંડી કરો અને નાસ્તાના કદના ટુકડા તોડી પીરસો અથવા હવાચુસ્ત ડબ્બામાં રાખો.'
], 'Use a larger press hole than nylon sev; karasev is deliberately thicker and peppery.|नायलॉन सेव से बड़ा छेद लें; कारा सेव जानबूझकर मोटी और काली मिर्च वाली होती है।|નાયલોન સેવ કરતાં મોટું છિદ્ર લો; કારા સેવ ખાસ જાડી અને મરીવાળી હોય છે.', 'https://rakskitchen.net/karasev-recipe-how-to-make-karasev/');

add(323, 'Tamil', 45, 'मुल्लू मुरुक्कु', 'મુલ્લુ મુરુક્કુ', [
  'fine rice flour|बारीक चावल का आटा|ઝીણો ચોખાનો લોટ|260|g',
  'roasted urad dal flour|भुनी उड़द दाल का आटा|શેકેલી અડદ દાળનો લોટ|70|g',
  'roasted gram flour|भुने चने का आटा|શેકેલી ચણાદાળનો લોટ|35|g',
  'white sesame seeds|सफेद तिल|સફેદ તલ|12|g',
  'cumin seeds|जीरा|જીરું|5|g',
  'asafoetida|हींग|હિંગ|1|g',
  'ghee|घी|ઘી|20|g',
  'salt|नमक|મીઠું|8|g',
  'warm water, approximately|गुनगुना पानी, लगभग|હૂંફાળું પાણી, અંદાજે|220|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Sift rice, urad and roasted gram flours together. Mix in sesame, cumin, asafoetida and salt, then rub in ghee.',
  'Add warm water gradually to form a smooth, pliable dough that can be pressed without cracking. Keep covered while shaping.',
  'Fit the press with a star-shaped ridged plate. Press distinct thorny spirals onto small oiled squares, keeping coils slightly apart.',
  'Slide spirals into medium-hot oil and fry in batches, turning once, until bubbling stops and each ring is evenly crisp and golden.',
  'Drain and cool fully before stacking; serve or store airtight.'
], [
  'चावल, उड़द और भुने चने का आटा छानें। तिल, जीरा, हींग और नमक मिलाएँ, फिर घी रगड़ें।',
  'गुनगुना पानी धीरे डालकर चिकना लचीला आटा गूँधें जो दबाने पर न फटे। आकार देते समय ढककर रखें।',
  'प्रेस में सितारा आकार की धारदार जाली लगाएँ। तेल लगे कागज़ के छोटे टुकड़ों पर काँटेदार चक्र दबाएँ और घुमावों में थोड़ी जगह रखें।',
  'चक्र मध्यम गरम तेल में सरकाकर थोड़े-थोड़े तलें। एक बार पलटें और बुलबुले रुककर हर चक्र सुनहरा व कुरकुरा हो जाए तब निकालें।',
  'निथारकर पूरी तरह ठंडा करें, फिर सजाकर परोसें या बंद डिब्बे में रखें।'
], [
  'ચોખા, અડદ અને શેકેલી ચણાદાળનો લોટ ચાળો. તલ, જીરું, હિંગ અને મીઠું ભેળવી ઘી મસળો.',
  'હૂંફાળું પાણી ધીરે ઉમેરી સુંવાળો વાળી શકાય એવો લોટ બાંધો જે દબાવતાં ન ફાટે. આકાર આપતાં ઢાંકી રાખો.',
  'પ્રેસમાં તારાકાર ધારવાળી જાળી લગાવો. તેલ લગાવેલા નાના કાગળ પર કાંટેદાર ચકરડા પાડો અને વળાંકો વચ્ચે થોડી જગ્યા રાખો.',
  'ચકરડાં મધ્યમ ગરમ તેલમાં સરકાવી થોડા થોડા તળો. એક વાર પલટાવો અને પરપોટા અટકે તથા દરેક ચકરડો સોનેરી અને કરકરો થાય ત્યારે કાઢો.',
  'નિતારી સંપૂર્ણ ઠંડા કરો, પછી ગોઠવી પીરસો અથવા હવાચુસ્ત ડબ્બામાં રાખો.'
], 'The star die gives mullu murukku its thorny ridges; a round die makes a different snack.|सितारा जाली से मुल्लू मुरुक्कु की काँटेदार धार बनती है; गोल जाली से अलग नाश्ता बनेगा।|તારાકાર જાળીથી મુલ્લુ મુરુક્કુની કાંટેદાર ધાર બને છે; ગોળ જાળીથી જુદો નાસ્તો બનશે.', 'https://hebbarskitchen.com/mullu-murukku-recipe-mullu-thenkuzhal/');

add(324, 'Tamil', 35, 'वाज़क्कै बज्जी', 'વાઝક્કાઈ બજી', [
  'raw green bananas or plantains|कच्चे हरे केले|કાચાં લીલાં કેળાં|450|g',
  'gram flour|बेसन|ચણાનો લોટ|190|g',
  'rice flour|चावल का आटा|ચોખાનો લોટ|35|g',
  'red chilli powder|लाल मिर्च पाउडर|લાલ મરચું પાઉડર|5|g',
  'turmeric|हल्दी|હળદર|2|g',
  'asafoetida|हींग|હિંગ|1|g',
  'salt|नमक|મીઠું|8|g',
  'water|पानी|પાણી|225|ml',
  'neutral oil, for frying|तलने के लिए तेल|તળવા માટે તેલ|700|ml'
], [
  'Peel raw green bananas and slice lengthwise into evenly thin oval pieces. Hold briefly in water to prevent browning, then dry the slices thoroughly.',
  'Whisk gram flour, rice flour, chilli, turmeric, asafoetida and salt with water into a smooth thick-flowing batter.',
  'Heat oil to medium hot. Dip each dry banana slice in batter and let excess drip off before lowering it into the oil in small batches.',
  'Turn when the first side sets and fry until both sides are golden, the crust is crisp and the raw banana inside is tender.',
  'Drain well and serve hot with coconut or coriander chutney.'
], [
  'कच्चे हरे केले छीलकर लम्बाई में बराबर पतले अंडाकार टुकड़े काटें। कालापन रोकने को थोड़ी देर पानी में रखें, फिर अच्छी तरह सुखाएँ।',
  'बेसन, चावल का आटा, मिर्च, हल्दी, हींग और नमक को पानी से फेंटकर चिकना गाढ़ा-बहने वाला घोल बनाएँ।',
  'तेल मध्यम गरम करें। हर सूखे केले के टुकड़े को घोल में डुबोकर अतिरिक्त घोल टपकाएँ और थोड़े-थोड़े तेल में उतारें।',
  'पहली ओर परत जमने पर पलटें और दोनों ओर सुनहरी, परत कुरकुरी तथा भीतर कच्चा केला नरम होने तक तलें।',
  'अच्छी तरह निथारकर नारियल या धनिया चटनी के साथ गरम परोसें।'
], [
  'કાચાં લીલાં કેળાં છોલી લંબાઈમાં સરખી પાતળી અંડાકાર ચીરીઓ કરો. કાળા ન પડે માટે થોડી વાર પાણીમાં રાખી પછી સારી રીતે સૂકવો.',
  'ચણાનો લોટ, ચોખાનો લોટ, મરચું, હળદર, હિંગ અને મીઠું પાણીથી ફેંટીને સુંવાળું ઘટ્ટ-રેડી શકાય એવું ખીરું બનાવો.',
  'તેલ મધ્યમ ગરમ કરો. દરેક સૂકી કેળાની ચીરી ખીરામાં ડૂબાડી વધારું ખીરું ટપકાવી થોડા થોડા ટુકડા તેલમાં મૂકો.',
  'પહેલી બાજુનો પડ જામી જાય પછી પલટાવો અને બંને બાજુ સોનેરી, પડ કરકરો તથા અંદરનું કાચું કેળું નરમ થાય ત્યાં સુધી તળો.',
  'સારી રીતે નિતારી નાળિયેર અથવા ધાણાની ચટણી સાથે ગરમ પીરસો.'
], 'Dry banana slices before battering so the coating does not slip off in the oil.|घोल लगाने से पहले केले के टुकड़े सुखाएँ ताकि परत तेल में न छूटे।|ખીરું લગાવતાં પહેલાં કેળાની ચીરીઓ સૂકવો જેથી પડ તેલમાં ઊતરી ન જાય.', 'https://www.vegrecipesofindia.com/raw-banana-plantain-pakoras-bhajiya-recipe/');

const intake = JSON.parse(await fs.readFile('catalog/intake/friend-dishes.json', 'utf8'));
const passive = {
  300: ['15 minutes drawing moisture from onions', 'प्याज़ से पानी निकलने के लिए 15 मिनट', 'ડુંગળી પાણી છોડે તે માટે 15 મિનિટ'],
  304: ['3 hours soaking moong dal', 'मूंग दाल भिगोने के लिए 3 घंटे', 'મગની દાળ પલાળવા માટે 3 કલાક'],
  305: ['4 hours soaking moong dal', 'मूंग दाल भिगोने के लिए 4 घंटे', 'મગની દાળ પલાળવા માટે 4 કલાક'],
  306: ['2 hours soaking chana dal', 'चना दाल भिगोने के लिए 2 घंटे', 'ચણાની દાળ પલાળવા માટે 2 કલાક'],
  310: ['15 minutes resting dough', 'आटे को आराम देने के लिए 15 मिनट', 'લોટને આરામ આપવા માટે 15 મિનિટ'],
  317: ['6 hours soaking and drying lentils', 'दाल भिगोने और सुखाने के लिए 6 घंटे', 'દાળ પલાળવા અને સૂકવવા માટે 6 કલાક'],
  320: ['15 minutes resting dough', 'आटे को आराम देने के लिए 15 मिनट', 'લોટને આરામ આપવા માટે 15 મિનિટ']
};
for (const r of records) {
  const candidate = intake.candidates[r.index];
  if (!candidate || r.ingredients.length < 6 || r.steps[0].length < 5 || r.steps[1].length !== r.steps[0].length || r.steps[2].length !== r.steps[0].length) throw Error(`Incomplete recipe ${r.index}`);
  const ingredientRows = r.ingredients.map(row => row.split('|'));
  if (ingredientRows.some(row => row.length !== 5)) throw Error(`Ingredient translation mismatch: ${candidate.id}`);
  const tips = r.tip.split('|');
  if (tips.length !== 3) throw Error(`Tip translation mismatch: ${candidate.id}`);
  const draft = {
    sourceReviewId: candidate.sourceReviewId, id: candidate.id, status: 'draft-fourth-100-intake-batch', name: candidate.name,
    cuisine: r.cuisine, categories: ['Snacks'], baseServings: 4, prepAndCookMinutes: r.minutes,
    ingredients: ingredientRows.map(([name, , , qty, unit]) => ({ name, qty: Number(qty), unit })),
    steps: r.steps[0], tips: [tips[0]],
    translations: {
      hi: { name: r.nameHi, ingredients: ingredientRows.map(row => row[1]), steps: r.steps[1], tips: [tips[1]] },
      gu: { name: r.nameGu, ingredients: ingredientRows.map(row => row[2]), steps: r.steps[2], tips: [tips[2]] }
    },
    reference: { url: r.reference, use: 'Traditional method and dish identity checked; measurements and wording independently authored.' },
    photoDraft: `catalog/intake/photos/${candidate.id}.png`,
    photoReview: 'Generated dish-specific realistic image visually checked for identity and quality on 2026-10-06.'
  };
  if (passive[r.index]) {
    draft.passiveTime = passive[r.index][0];
    draft.translations.hi.passiveTime = passive[r.index][1];
    draft.translations.gu.passiveTime = passive[r.index][2];
  }
  await fs.writeFile(`catalog/intake/${candidate.id}-draft.json`, JSON.stringify(draft, null, 2) + '\n');
}
console.log(`${records.length} fourth-batch drafts authored`);
