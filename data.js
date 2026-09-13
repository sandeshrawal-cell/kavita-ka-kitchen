(() => {
  const CATEGORIES = ['Breakfast','Lunch','Dinner','Desserts','Shakes','Coffee','Snacks'];
  const CUISINES = ['Any','Rajasthani','Gujarati','North Indian','Punjabi','South Indian','Maharashtrian','Indo-Chinese','Indian Fusion','Global','Jain'];
  const SEASONS = ['summer','monsoon','winter','all'];

  const B=(name,cuisine,ingredients,method='curry',opts={})=>({
    name,cuisine,ingredients,method,
    kids: opts.kids ?? true,
    guest: opts.guest ?? false,
    jain: opts.jain ?? true,
    season: opts.season || 'all',
    nutrition: opts.nutrition || ['balanced'],
    baseTime: opts.baseTime || 30,
    effort: opts.effort || 'medium'
  });

  const breakfastBases = [
    B('Poha','Maharashtrian',['poha','peas','peanuts','lemon'],'stir', {baseTime:20,effort:'easy',nutrition:['light','veg-rich']}),
    B('Vegetable Upma','South Indian',['semolina','peas','carrot','beans'],'stir',{baseTime:25,effort:'easy',nutrition:['balanced','veg-rich']}),
    B('Rava Idli','South Indian',['semolina','curd','mustard seeds'],'steam',{baseTime:30,effort:'easy',nutrition:['light']}),
    B('Khaman Dhokla','Gujarati',['gram flour','curd','mustard seeds'],'steam',{baseTime:35,effort:'medium',nutrition:['protein-rich','light']}),
    B('Handvo','Gujarati',['rice','mixed lentils','bottle gourd'],'bake',{baseTime:45,effort:'medium',nutrition:['protein-rich','veg-rich']}),
    B('Methi Thepla','Gujarati',['whole wheat flour','fenugreek','curd'],'flatbread',{baseTime:30,effort:'easy',nutrition:['balanced']}),
    B('Moong Dal Chilla','North Indian',['moong dal','coriander','green chilli'],'griddle',{baseTime:30,effort:'easy',nutrition:['protein-rich','light']}),
    B('Besan Chilla','North Indian',['gram flour','tomato','coriander'],'griddle',{baseTime:20,effort:'easy',nutrition:['protein-rich']}),
    B('Sabudana Khichdi','Maharashtrian',['sabudana','peanuts','cumin'],'stir',{baseTime:25,effort:'easy',jain:true,nutrition:['energy-rich']}),
    B('Idli Sambar','South Indian',['idli batter','toor dal','mixed vegetables'],'steam',{baseTime:40,effort:'medium',nutrition:['balanced','protein-rich']}),
    B('Masala Dosa','South Indian',['dosa batter','potato','mustard seeds'],'griddle',{baseTime:40,effort:'medium',jain:false,nutrition:['balanced']}),
    B('Uttapam','South Indian',['dosa batter','tomato','capsicum'],'griddle',{baseTime:30,effort:'easy',nutrition:['balanced','veg-rich']}),
    B('Pesarattu','South Indian',['green moong','ginger','cumin'],'griddle',{baseTime:30,effort:'easy',nutrition:['protein-rich']}),
    B('Appam with Vegetable Stew','South Indian',['rice batter','coconut milk','mixed vegetables'],'stew',{baseTime:45,effort:'medium',nutrition:['balanced','veg-rich']}),
    B('Vegetable Sandwich','Global',['bread','cucumber','tomato','capsicum'],'assemble',{baseTime:15,effort:'easy',nutrition:['quick','veg-rich']}),
    B('Paneer Grilled Sandwich','Indian Fusion',['bread','paneer','capsicum'],'grill',{baseTime:20,effort:'easy',nutrition:['protein-rich','kids']}),
    B('Dal Pakwan','North Indian',['chana dal','flour','cumin'],'fry',{baseTime:50,effort:'special',nutrition:['protein-rich','indulgent'],guest:true}),
    B('Fafda with Kadhi','Gujarati',['gram flour','curd','spices'],'fry',{baseTime:45,effort:'special',nutrition:['indulgent'],guest:true}),
    B('Khakhra with Curd','Gujarati',['whole wheat flour','curd'],'griddle',{baseTime:20,effort:'easy',nutrition:['light']}),
    B('Methi Muthiya','Gujarati',['fenugreek','gram flour','whole wheat flour'],'steam',{baseTime:35,effort:'medium',nutrition:['veg-rich','protein-rich']}),
    B('Vegetable Dalia','North Indian',['broken wheat','peas','carrot'],'onepot',{baseTime:25,effort:'easy',nutrition:['light','balanced']}),
    B('Masala Oats','Indian Fusion',['oats','tomato','peas'],'onepot',{baseTime:15,effort:'easy',nutrition:['quick','light']}),
    B('Pav Bhaji','Maharashtrian',['mixed vegetables','pav','butter'],'mash',{baseTime:40,effort:'medium',nutrition:['veg-rich','indulgent'],guest:true}),
    B('Ragda Pattice','Maharashtrian',['white peas','potato','coriander'],'chaat',{baseTime:45,effort:'medium',jain:false,nutrition:['protein-rich','indulgent'],guest:true}),
    B('Vegetable Sevai Upma','South Indian',['vermicelli','peas','carrot'],'stir',{baseTime:25,effort:'easy',nutrition:['balanced']}),
    B('Sev Khamani','Gujarati',['chana dal','sev','coriander'],'steam',{baseTime:35,effort:'medium',nutrition:['protein-rich']}),
    B('Patra','Gujarati',['colocasia leaves','gram flour','tamarind'],'steam',{baseTime:45,effort:'medium',nutrition:['veg-rich']}),
    B('Vegetable Appe','South Indian',['rice batter','carrot','capsicum'],'griddle',{baseTime:30,effort:'easy',nutrition:['balanced','kids']}),
    B('Moong Dal Dhokla','Gujarati',['moong dal','curd','mustard seeds'],'steam',{baseTime:35,effort:'medium',nutrition:['protein-rich','light']}),
    B('Stuffed Paratha','North Indian',['whole wheat flour','paneer','coriander'],'flatbread',{baseTime:35,effort:'medium',nutrition:['balanced','protein-rich']}),
    B('Sprouts Chaat','Indian Fusion',['mixed sprouts','tomato','lemon'],'chaat',{baseTime:15,effort:'easy',nutrition:['protein-rich','light','quick']}),
    B('Corn Chaat','Indian Fusion',['sweet corn','capsicum','lemon'],'chaat',{baseTime:15,effort:'easy',nutrition:['quick','kids']}),
    B('Vegetable Suji Toast','Indian Fusion',['semolina','bread','capsicum'],'griddle',{baseTime:20,effort:'easy',nutrition:['quick','kids']}),
    B('Millet Breakfast Bowl','Indian Fusion',['millet','curd','cucumber'],'onepot',{baseTime:25,effort:'easy',nutrition:['light','balanced']}),
    B('Ragi Dosa','South Indian',['ragi flour','curd','cumin'],'griddle',{baseTime:25,effort:'easy',nutrition:['balanced','light']})
  ];

  const lunchBases = [
    B('Gatte ki Sabzi','Rajasthani',['gram flour','curd','cumin'],'curry',{baseTime:45,effort:'medium',guest:true,nutrition:['protein-rich']}),
    B('Ker Sangri','Rajasthani',['ker','sangri','yogurt'],'curry',{baseTime:45,effort:'medium',guest:true,nutrition:['veg-rich']}),
    B('Papad ki Sabzi','Rajasthani',['papad','curd','coriander'],'curry',{baseTime:25,effort:'easy',nutrition:['quick']}),
    B('Sev Tamatar','Rajasthani',['tomato','sev','coriander'],'curry',{baseTime:25,effort:'easy',nutrition:['quick']}),
    B('Panchmel Dal','Rajasthani',['mixed lentils','cumin','coriander'],'dal',{baseTime:35,effort:'medium',nutrition:['protein-rich']}),
    B('Rajasthani Kadhi','Rajasthani',['curd','gram flour','fenugreek seeds'],'kadhi',{baseTime:35,effort:'medium',nutrition:['light']}),
    B('Govind Gatta Curry','Rajasthani',['gram flour','paneer','curd'],'curry',{baseTime:50,effort:'special',guest:true,nutrition:['protein-rich']}),
    B('Dal Baati Churma','Rajasthani',['mixed dal','wheat flour','ghee'],'bake',{baseTime:75,effort:'special',guest:true,nutrition:['indulgent','protein-rich']}),
    B('Dal Dhokli','Gujarati',['toor dal','whole wheat flour','peanuts'],'onepot',{baseTime:45,effort:'medium',nutrition:['balanced']}),
    B('Undhiyu','Gujarati',['surti papdi','brinjal','methi muthiya'],'curry',{baseTime:70,effort:'special',season:'winter',guest:true,nutrition:['veg-rich']}),
    B('Gujarati Dal','Gujarati',['toor dal','jaggery','lemon'],'dal',{baseTime:35,effort:'easy',nutrition:['protein-rich']}),
    B('Gujarati Kadhi','Gujarati',['curd','gram flour','curry leaves'],'kadhi',{baseTime:30,effort:'easy',nutrition:['light']}),
    B('Ringan Bateta','Gujarati',['brinjal','potato','tomato'],'curry',{baseTime:35,effort:'medium',jain:false,nutrition:['veg-rich']}),
    B('Bhinda nu Shaak','Gujarati',['okra','coriander','cumin'],'curry',{baseTime:30,effort:'easy',nutrition:['veg-rich']}),
    B('Doodhi Chana Dal','Gujarati',['bottle gourd','chana dal','cumin'],'dal',{baseTime:35,effort:'easy',nutrition:['protein-rich','light']}),
    B('Lasaniya Bataka','Gujarati',['potato','garlic','red chilli'],'curry',{baseTime:30,effort:'easy',jain:false,nutrition:['indulgent']}),
    B('Paneer Butter Masala','Punjabi',['paneer','tomato','cream'],'curry',{baseTime:40,effort:'medium',guest:true,nutrition:['protein-rich','indulgent']}),
    B('Palak Paneer','North Indian',['paneer','spinach','tomato'],'curry',{baseTime:35,effort:'medium',nutrition:['protein-rich','veg-rich']}),
    B('Kadai Paneer','Punjabi',['paneer','capsicum','tomato'],'curry',{baseTime:35,effort:'medium',guest:true,nutrition:['protein-rich']}),
    B('Matar Paneer','North Indian',['paneer','peas','tomato'],'curry',{baseTime:35,effort:'medium',nutrition:['protein-rich']}),
    B('Chole Masala','Punjabi',['chickpeas','tomato','coriander'],'curry',{baseTime:45,effort:'medium',nutrition:['protein-rich']}),
    B('Rajma Masala','North Indian',['kidney beans','tomato','coriander'],'curry',{baseTime:50,effort:'medium',nutrition:['protein-rich']}),
    B('Dal Makhani','Punjabi',['black urad dal','kidney beans','cream'],'dal',{baseTime:75,effort:'special',guest:true,nutrition:['protein-rich','indulgent']}),
    B('Dal Tadka','North Indian',['toor dal','tomato','cumin'],'dal',{baseTime:30,effort:'easy',nutrition:['protein-rich']}),
    B('Dal Palak','North Indian',['moong dal','spinach','cumin'],'dal',{baseTime:35,effort:'easy',nutrition:['protein-rich','veg-rich']}),
    B('Lauki Kofta','North Indian',['bottle gourd','gram flour','tomato'],'curry',{baseTime:50,effort:'medium',nutrition:['veg-rich']}),
    B('Malai Kofta','North Indian',['paneer','potato','cream'],'curry',{baseTime:55,effort:'special',jain:false,guest:true,nutrition:['indulgent']}),
    B('Bhindi Masala','North Indian',['okra','tomato','coriander'],'curry',{baseTime:30,effort:'easy',nutrition:['veg-rich']}),
    B('Aloo Gobi','North Indian',['potato','cauliflower','coriander'],'curry',{baseTime:35,effort:'easy',jain:false,nutrition:['veg-rich']}),
    B('Baingan Bharta','North Indian',['brinjal','tomato','coriander'],'curry',{baseTime:40,effort:'medium',nutrition:['veg-rich']}),
    B('Mix Vegetable Curry','North Indian',['carrot','beans','peas','capsicum'],'curry',{baseTime:35,effort:'easy',nutrition:['veg-rich','balanced']}),
    B('Methi Malai Matar','North Indian',['fenugreek','peas','cream'],'curry',{baseTime:40,effort:'medium',guest:true,nutrition:['veg-rich']}),
    B('Corn Palak','North Indian',['sweet corn','spinach','tomato'],'curry',{baseTime:35,effort:'easy',nutrition:['veg-rich']}),
    B('Kadhi Pakora','Punjabi',['curd','gram flour','pakora'],'kadhi',{baseTime:50,effort:'medium',nutrition:['indulgent']}),
    B('Soya Chunk Masala','North Indian',['soya chunks','tomato','capsicum'],'curry',{baseTime:35,effort:'easy',nutrition:['protein-rich']}),
    B('Vegetable Pulao','North Indian',['basmati rice','peas','carrot','beans'],'rice',{baseTime:35,effort:'easy',nutrition:['balanced']}),
    B('Vegetable Biryani','North Indian',['basmati rice','mixed vegetables','curd'],'rice',{baseTime:55,effort:'special',guest:true,nutrition:['balanced']}),
    B('Paneer Tikka Masala','Punjabi',['paneer','capsicum','tomato'],'curry',{baseTime:45,effort:'medium',guest:true,nutrition:['protein-rich']}),
    B('Veg Jalfrezi','North Indian',['capsicum','carrot','beans','tomato'],'curry',{baseTime:35,effort:'easy',nutrition:['veg-rich']}),
    B('Kaju Curry','North Indian',['cashew','tomato','cream'],'curry',{baseTime:40,effort:'medium',guest:true,nutrition:['indulgent']})
  ];

  const dinnerBases = [
    B('Moong Dal Khichdi','North Indian',['rice','moong dal','cumin'],'onepot',{baseTime:30,effort:'easy',nutrition:['light','protein-rich']}),
    B('Palak Khichdi','North Indian',['rice','moong dal','spinach'],'onepot',{baseTime:30,effort:'easy',nutrition:['light','veg-rich']}),
    B('Masala Khichdi','Gujarati',['rice','mixed dal','peas'],'onepot',{baseTime:35,effort:'easy',nutrition:['balanced']}),
    B('Millet Khichdi','Indian Fusion',['millet','moong dal','vegetables'],'onepot',{baseTime:35,effort:'easy',nutrition:['balanced','light']}),
    B('Lemon Rice','South Indian',['rice','lemon','peanuts'],'rice',{baseTime:25,effort:'easy',nutrition:['quick']}),
    B('Tamarind Rice','South Indian',['rice','tamarind','peanuts'],'rice',{baseTime:30,effort:'easy',nutrition:['balanced']}),
    B('Curd Rice','South Indian',['rice','curd','mustard seeds'],'rice',{baseTime:20,effort:'easy',nutrition:['light','quick']}),
    B('Coconut Rice','South Indian',['rice','coconut','cashew'],'rice',{baseTime:30,effort:'easy',nutrition:['balanced']}),
    B('Bisi Bele Bath','South Indian',['rice','toor dal','mixed vegetables'],'onepot',{baseTime:45,effort:'medium',nutrition:['balanced','protein-rich']}),
    B('Vegetable Kurma','South Indian',['mixed vegetables','coconut','cashew'],'curry',{baseTime:40,effort:'medium',nutrition:['veg-rich']}),
    B('Avial','South Indian',['mixed vegetables','coconut','curd'],'stew',{baseTime:40,effort:'medium',nutrition:['veg-rich','light']}),
    B('Pithla Bhakri','Maharashtrian',['gram flour','jowar flour','cumin'],'curry',{baseTime:35,effort:'medium',nutrition:['protein-rich']}),
    B('Bharli Vangi','Maharashtrian',['brinjal','peanuts','coconut'],'curry',{baseTime:45,effort:'medium',nutrition:['veg-rich']}),
    B('Matki Usal','Maharashtrian',['moth beans','tomato','coconut'],'curry',{baseTime:40,effort:'medium',nutrition:['protein-rich']}),
    B('Vegetable Hakka Noodles','Indo-Chinese',['noodles','cabbage','capsicum'],'stir',{baseTime:25,effort:'easy',nutrition:['quick','veg-rich']}),
    B('Schezwan Fried Rice','Indo-Chinese',['rice','capsicum','cabbage','schezwan sauce'],'rice',{baseTime:25,effort:'easy',nutrition:['quick']}),
    B('Veg Manchurian Gravy','Indo-Chinese',['cabbage','carrot','capsicum'],'curry',{baseTime:40,effort:'medium',nutrition:['veg-rich','indulgent']}),
    B('Chilli Paneer Gravy','Indo-Chinese',['paneer','capsicum','soy sauce'],'curry',{baseTime:35,effort:'medium',nutrition:['protein-rich']}),
    B('Paneer Tikka Wrap','Indian Fusion',['paneer','whole wheat wrap','capsicum'],'assemble',{baseTime:30,effort:'easy',nutrition:['protein-rich','kids']}),
    B('Hara Bhara Kebab Meal','North Indian',['spinach','peas','gram flour'],'grill',{baseTime:40,effort:'medium',nutrition:['veg-rich'],guest:true}),
    B('Tandoori Paneer with Roti','Punjabi',['paneer','curd','whole wheat flour'],'grill',{baseTime:45,effort:'medium',guest:true,nutrition:['protein-rich']}),
    B('Achari Paneer','Punjabi',['paneer','tomato','pickle spices'],'curry',{baseTime:35,effort:'medium',guest:true,nutrition:['protein-rich']}),
    B('Paneer Lababdar','North Indian',['paneer','tomato','cream'],'curry',{baseTime:45,effort:'medium',guest:true,nutrition:['protein-rich','indulgent']}),
    B('Corn Capsicum Masala','North Indian',['sweet corn','capsicum','tomato'],'curry',{baseTime:30,effort:'easy',nutrition:['veg-rich']}),
    B('Mushroom Masala','North Indian',['mushroom','tomato','capsicum'],'curry',{baseTime:30,effort:'easy',nutrition:['veg-rich']}),
    B('Soya Chaap Masala','Punjabi',['soya chaap','tomato','curd'],'curry',{baseTime:40,effort:'medium',nutrition:['protein-rich']}),
    B('Stuffed Capsicum','North Indian',['capsicum','paneer','peas'],'bake',{baseTime:45,effort:'medium',guest:true,nutrition:['veg-rich','protein-rich']}),
    B('Pumpkin Curry','North Indian',['pumpkin','tomato','cumin'],'curry',{baseTime:30,effort:'easy',nutrition:['light','veg-rich']}),
    B('Green Moong Curry','North Indian',['green moong','tomato','coriander'],'curry',{baseTime:40,effort:'easy',nutrition:['protein-rich']}),
    B('Kala Chana Curry','North Indian',['black chickpeas','tomato','coriander'],'curry',{baseTime:45,effort:'medium',nutrition:['protein-rich']}),
    B('Chana Saag','North Indian',['chickpeas','spinach','tomato'],'curry',{baseTime:40,effort:'medium',nutrition:['protein-rich','veg-rich']}),
    B('Vegetable Stew','South Indian',['mixed vegetables','coconut milk','pepper'],'stew',{baseTime:35,effort:'easy',nutrition:['light','veg-rich']}),
    B('Vegetable Sambar','South Indian',['toor dal','mixed vegetables','tamarind'],'dal',{baseTime:40,effort:'medium',nutrition:['protein-rich','veg-rich']}),
    B('Pongal with Sambar','South Indian',['rice','moong dal','pepper'],'onepot',{baseTime:40,effort:'medium',nutrition:['balanced','protein-rich']}),
    B('Neer Dosa with Veg Curry','South Indian',['rice batter','mixed vegetables','coconut'],'griddle',{baseTime:45,effort:'medium',nutrition:['balanced']}),
    B('Jowar Roti with Mixed Sabzi','Indian Fusion',['jowar flour','mixed vegetables','coriander'],'flatbread',{baseTime:40,effort:'medium',nutrition:['veg-rich','balanced']}),
    B('Millet Vegetable Pulao','Indian Fusion',['millet','mixed vegetables','peas'],'rice',{baseTime:35,effort:'easy',nutrition:['balanced']}),
    B('Spinach Rice','South Indian',['rice','spinach','peas'],'rice',{baseTime:30,effort:'easy',nutrition:['veg-rich']}),
    B('Peas Pulao with Raita','North Indian',['rice','peas','curd'],'rice',{baseTime:30,effort:'easy',nutrition:['balanced']}),
    B('Vegetable Tehri','North Indian',['rice','mixed vegetables','turmeric'],'rice',{baseTime:35,effort:'easy',nutrition:['balanced']})
  ];

  const dessertBases = [
    B('Gulab Jamun','North Indian',['milk solids','sugar','cardamom'],'dessert',{baseTime:50,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Rasgulla','North Indian',['paneer','sugar','rose water'],'dessert',{baseTime:60,effort:'special',guest:true,jain:true,nutrition:['indulgent']}),
    B('Rasmalai','North Indian',['paneer','milk','saffron'],'dessert',{baseTime:70,effort:'special',guest:true,jain:true,nutrition:['indulgent']}),
    B('Kheer','North Indian',['milk','rice','cardamom'],'dessert',{baseTime:45,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Seviyan Kheer','North Indian',['milk','vermicelli','cardamom'],'dessert',{baseTime:35,effort:'easy',guest:true,jain:true,nutrition:['indulgent']}),
    B('Shrikhand','Gujarati',['hung curd','sugar','saffron'],'dessert',{baseTime:20,effort:'easy',guest:true,jain:true,nutrition:['indulgent']}),
    B('Basundi','Gujarati',['milk','sugar','cardamom'],'dessert',{baseTime:55,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Mohanthal','Gujarati',['gram flour','ghee','sugar'],'dessert',{baseTime:60,effort:'special',guest:true,jain:true,nutrition:['indulgent']}),
    B('Ghevar','Rajasthani',['flour','ghee','sugar syrup'],'dessert',{baseTime:70,effort:'special',guest:true,jain:true,nutrition:['indulgent'],season:'monsoon'}),
    B('Malpua','Rajasthani',['flour','milk','sugar syrup'],'dessert',{baseTime:45,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Moong Dal Halwa','Rajasthani',['moong dal','ghee','sugar'],'dessert',{baseTime:75,effort:'special',guest:true,jain:true,nutrition:['indulgent'],season:'winter'}),
    B('Gajar Halwa','North Indian',['carrot','milk','ghee'],'dessert',{baseTime:60,effort:'medium',guest:true,jain:false,nutrition:['indulgent'],season:'winter'}),
    B('Sooji Halwa','North Indian',['semolina','ghee','sugar'],'dessert',{baseTime:25,effort:'easy',guest:true,jain:true,nutrition:['indulgent']}),
    B('Besan Ladoo','North Indian',['gram flour','ghee','sugar'],'dessert',{baseTime:45,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Coconut Ladoo','Indian Fusion',['coconut','condensed milk','cardamom'],'dessert',{baseTime:25,effort:'easy',guest:true,jain:true,nutrition:['indulgent']}),
    B('Kaju Katli','North Indian',['cashew','sugar','cardamom'],'dessert',{baseTime:40,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Badam Halwa','South Indian',['almond','milk','ghee'],'dessert',{baseTime:55,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Mysore Pak','South Indian',['gram flour','ghee','sugar'],'dessert',{baseTime:45,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Payasam','South Indian',['milk','jaggery','rice'],'dessert',{baseTime:40,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Kulfi','North Indian',['milk','pistachio','cardamom'],'dessert',{baseTime:30,effort:'easy',guest:true,jain:true,nutrition:['indulgent'],season:'summer'}),
    B('Falooda','Indian Fusion',['milk','falooda sev','basil seeds'],'dessert',{baseTime:20,effort:'easy',guest:true,jain:true,nutrition:['indulgent'],season:'summer'}),
    B('Mango Mousse','Global',['mango','cream','sugar'],'dessert',{baseTime:20,effort:'easy',guest:true,jain:true,nutrition:['indulgent'],season:'summer'}),
    B('Chocolate Mousse','Global',['chocolate','cream','milk'],'dessert',{baseTime:20,effort:'easy',guest:true,jain:true,nutrition:['indulgent']}),
    B('Fruit Custard','Global',['milk','custard powder','mixed fruits'],'dessert',{baseTime:25,effort:'easy',guest:true,jain:true,nutrition:['fruit-rich']}),
    B('Cheesecake Cup','Global',['cream cheese','biscuits','fruit compote'],'dessert',{baseTime:30,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Brownie Sundae','Global',['brownie','ice cream','chocolate sauce'],'dessert',{baseTime:25,effort:'easy',guest:true,jain:true,nutrition:['indulgent']}),
    B('Rice Pudding','Global',['rice','milk','vanilla'],'dessert',{baseTime:40,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Panna Cotta','Global',['cream','milk','agar agar'],'dessert',{baseTime:30,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Fruit Trifle','Global',['cake','custard','mixed fruits'],'dessert',{baseTime:30,effort:'easy',guest:true,jain:true,nutrition:['fruit-rich','indulgent']}),
    B('Jalebi','North Indian',['flour','sugar syrup','saffron'],'dessert',{baseTime:45,effort:'medium',guest:true,jain:true,nutrition:['indulgent']})
  ];

  const shakeBases = [
    B('Mango Shake','Indian Fusion',['mango','milk','sugar'],'blend',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['fruit-rich','kids'],season:'summer'}),
    B('Banana Shake','Global',['banana','milk','dates'],'blend',{baseTime:6,effort:'easy',jain:true,nutrition:['fruit-rich','kids']}),
    B('Strawberry Shake','Global',['strawberry','milk','sugar'],'blend',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['fruit-rich','kids'],season:'winter'}),
    B('Chikoo Shake','Indian Fusion',['chikoo','milk','dates'],'blend',{baseTime:8,effort:'easy',jain:true,nutrition:['fruit-rich','kids']}),
    B('Apple Shake','Global',['apple','milk','cinnamon'],'blend',{baseTime:8,effort:'easy',jain:true,nutrition:['fruit-rich']}),
    B('Pineapple Shake','Global',['pineapple','milk','vanilla'],'blend',{baseTime:8,effort:'easy',jain:true,nutrition:['fruit-rich']}),
    B('Papaya Shake','Global',['papaya','milk','dates'],'blend',{baseTime:8,effort:'easy',jain:true,nutrition:['fruit-rich','light']}),
    B('Anjeer Shake','Indian Fusion',['figs','milk','almond'],'blend',{baseTime:10,effort:'easy',guest:true,jain:true,nutrition:['energy-rich']}),
    B('Kesar Badam Shake','Indian Fusion',['almond','milk','saffron'],'blend',{baseTime:10,effort:'easy',guest:true,jain:true,nutrition:['protein-rich','indulgent']}),
    B('Dry Fruit Shake','Indian Fusion',['almond','cashew','pistachio','milk'],'blend',{baseTime:10,effort:'easy',guest:true,jain:true,nutrition:['energy-rich','protein-rich']}),
    B('Chocolate Shake','Global',['cocoa','milk','ice cream'],'blend',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['indulgent','kids']}),
    B('Oreo Shake','Global',['oreo biscuits','milk','ice cream'],'blend',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['indulgent','kids']}),
    B('Vanilla Shake','Global',['vanilla','milk','ice cream'],'blend',{baseTime:7,effort:'easy',guest:true,jain:true,nutrition:['indulgent','kids']}),
    B('Rose Shake','Indian Fusion',['rose syrup','milk','basil seeds'],'blend',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['indulgent'],season:'summer'}),
    B('Coffee Shake','Global',['coffee','milk','ice cream'],'blend',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['indulgent']}),
    B('Peanut Butter Shake','Global',['peanut butter','milk','banana'],'blend',{baseTime:8,effort:'easy',jain:true,nutrition:['protein-rich','energy-rich']}),
    B('Dates Shake','Indian Fusion',['dates','milk','almond'],'blend',{baseTime:8,effort:'easy',jain:true,nutrition:['energy-rich']}),
    B('Avocado Shake','Global',['avocado','milk','honey'],'blend',{baseTime:8,effort:'easy',jain:true,nutrition:['balanced']}),
    B('Tender Coconut Shake','South Indian',['tender coconut','milk','cardamom'],'blend',{baseTime:8,effort:'easy',jain:true,nutrition:['light'],season:'summer'}),
    B('Mixed Berry Shake','Global',['mixed berries','milk','yogurt'],'blend',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['fruit-rich']}),
    B('Kiwi Shake','Global',['kiwi','milk','honey'],'blend',{baseTime:8,effort:'easy',jain:true,nutrition:['fruit-rich']}),
    B('Guava Shake','Indian Fusion',['guava','milk','honey'],'blend',{baseTime:8,effort:'easy',jain:true,nutrition:['fruit-rich']}),
    B('Pomegranate Shake','Indian Fusion',['pomegranate','milk','dates'],'blend',{baseTime:8,effort:'easy',jain:true,nutrition:['fruit-rich']}),
    B('Muskmelon Shake','Indian Fusion',['muskmelon','milk','cardamom'],'blend',{baseTime:8,effort:'easy',jain:true,nutrition:['light','fruit-rich'],season:'summer'})
  ];

  const coffeeBases = [
    B('Americano','Global',['coffee','water'],'coffee',{baseTime:5,effort:'easy',jain:true,nutrition:['light']}),
    B('Cappuccino','Global',['coffee','milk','foam'],'coffee',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['balanced']}),
    B('Cafe Latte','Global',['coffee','milk'],'coffee',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['balanced']}),
    B('Cafe Mocha','Global',['coffee','milk','cocoa'],'coffee',{baseTime:10,effort:'easy',guest:true,jain:true,nutrition:['indulgent']}),
    B('Espresso','Global',['coffee','water'],'coffee',{baseTime:4,effort:'easy',jain:true,nutrition:['light']}),
    B('Flat White','Global',['coffee','milk'],'coffee',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['balanced']}),
    B('Macchiato','Global',['coffee','milk foam'],'coffee',{baseTime:6,effort:'easy',jain:true,nutrition:['light']}),
    B('Cortado','Global',['coffee','milk'],'coffee',{baseTime:6,effort:'easy',jain:true,nutrition:['balanced']}),
    B('Cold Coffee','Indian Fusion',['coffee','milk','ice'],'coffee',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['indulgent'],season:'summer'}),
    B('Iced Latte','Global',['coffee','milk','ice'],'coffee',{baseTime:7,effort:'easy',guest:true,jain:true,nutrition:['balanced'],season:'summer'}),
    B('Iced Americano','Global',['coffee','water','ice'],'coffee',{baseTime:5,effort:'easy',jain:true,nutrition:['light'],season:'summer'}),
    B('Affogato','Global',['espresso','vanilla ice cream'],'coffee',{baseTime:6,effort:'easy',guest:true,jain:true,nutrition:['indulgent']}),
    B('Cafe au Lait','Global',['coffee','milk'],'coffee',{baseTime:7,effort:'easy',jain:true,nutrition:['balanced']}),
    B('Filter Coffee','South Indian',['coffee','milk','sugar'],'coffee',{baseTime:10,effort:'medium',guest:true,jain:true,nutrition:['balanced']}),
    B('Dalgona Coffee','Global',['coffee','milk','sugar'],'coffee',{baseTime:12,effort:'medium',guest:true,jain:true,nutrition:['indulgent']}),
    B('Vietnamese Style Coffee','Global',['coffee','condensed milk','ice'],'coffee',{baseTime:10,effort:'easy',guest:true,jain:true,nutrition:['indulgent']}),
    B('Hazelnut Latte','Global',['coffee','milk','hazelnut syrup'],'coffee',{baseTime:9,effort:'easy',guest:true,jain:true,nutrition:['indulgent']}),
    B('Caramel Latte','Global',['coffee','milk','caramel'],'coffee',{baseTime:9,effort:'easy',guest:true,jain:true,nutrition:['indulgent']}),
    B('Vanilla Latte','Global',['coffee','milk','vanilla'],'coffee',{baseTime:9,effort:'easy',guest:true,jain:true,nutrition:['balanced']}),
    B('Cinnamon Coffee','Global',['coffee','milk','cinnamon'],'coffee',{baseTime:8,effort:'easy',jain:true,nutrition:['balanced']}),
    B('Cardamom Coffee','Indian Fusion',['coffee','milk','cardamom'],'coffee',{baseTime:8,effort:'easy',jain:true,nutrition:['balanced']}),
    B('Turmeric Coffee','Indian Fusion',['coffee','milk','turmeric'],'coffee',{baseTime:8,effort:'easy',jain:true,nutrition:['balanced']}),
    B('Coconut Latte','Global',['coffee','coconut milk'],'coffee',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['light']}),
    B('Almond Latte','Global',['coffee','almond milk'],'coffee',{baseTime:8,effort:'easy',guest:true,jain:true,nutrition:['light']}),
    B('Long Black','Global',['coffee','water'],'coffee',{baseTime:5,effort:'easy',jain:true,nutrition:['light']}),
    B('Ristretto','Global',['coffee','water'],'coffee',{baseTime:4,effort:'easy',jain:true,nutrition:['light']}),
    B('Lungo','Global',['coffee','water'],'coffee',{baseTime:5,effort:'easy',jain:true,nutrition:['light']}),
    B('Cold Brew','Global',['coffee','water','ice'],'coffee',{baseTime:6,effort:'easy',jain:true,nutrition:['light'],season:'summer'}),
    B('Nitro Cold Brew','Global',['coffee','water','ice'],'coffee',{baseTime:6,effort:'easy',guest:true,jain:true,nutrition:['light'],season:'summer'}),
    B('Pour Over Coffee','Global',['coffee','water'],'coffee',{baseTime:7,effort:'medium',jain:true,nutrition:['light']}),
    B('French Press Coffee','Global',['coffee','water'],'coffee',{baseTime:8,effort:'medium',jain:true,nutrition:['light']}),
    B('AeroPress Coffee','Global',['coffee','water'],'coffee',{baseTime:6,effort:'medium',jain:true,nutrition:['light']}),
    B('Moka Pot Coffee','Global',['coffee','water'],'coffee',{baseTime:8,effort:'medium',jain:true,nutrition:['light']}),
    B('Turkish Coffee','Global',['coffee','water','cardamom'],'coffee',{baseTime:8,effort:'medium',guest:true,jain:true,nutrition:['light']}),
    B('Espresso Tonic','Global',['coffee','tonic water','ice'],'coffee',{baseTime:6,effort:'easy',guest:true,jain:true,nutrition:['light'],season:'summer'}),
    B('Orange Espresso','Global',['coffee','orange juice','ice'],'coffee',{baseTime:6,effort:'easy',guest:true,jain:true,nutrition:['light'],season:'summer'}),
    B('Sparkling Americano','Global',['coffee','sparkling water','ice'],'coffee',{baseTime:6,effort:'easy',guest:true,jain:true,nutrition:['light']}),
    B('Coffee Lemonade','Global',['coffee','lemon','water','ice'],'coffee',{baseTime:7,effort:'easy',guest:true,jain:true,nutrition:['light'],season:'summer'}),
    B('Black Filter Coffee','South Indian',['coffee','water'],'coffee',{baseTime:9,effort:'medium',jain:true,nutrition:['light']})
  ];

  const snackBases = [
    B('Samosa','North Indian',['flour','peas','potato'],'fry',{baseTime:45,effort:'medium',jain:false,guest:true,nutrition:['indulgent']}),
    B('Kachori','Rajasthani',['flour','moong dal','spices'],'fry',{baseTime:50,effort:'medium',guest:true,nutrition:['indulgent']}),
    B('Dabeli','Gujarati',['pav','potato','peanuts'],'assemble',{baseTime:30,effort:'easy',jain:false,guest:true,nutrition:['indulgent']}),
    B('Vada Pav','Maharashtrian',['pav','potato','gram flour'],'fry',{baseTime:35,effort:'medium',jain:false,nutrition:['indulgent']}),
    B('Khandvi','Gujarati',['gram flour','curd','mustard seeds'],'steam',{baseTime:40,effort:'medium',nutrition:['light']}),
    B('Dhokla Bites','Gujarati',['gram flour','curd','mustard seeds'],'steam',{baseTime:30,effort:'easy',nutrition:['light']}),
    B('Paneer Tikka','Punjabi',['paneer','curd','capsicum'],'grill',{baseTime:35,effort:'medium',guest:true,nutrition:['protein-rich']}),
    B('Hara Bhara Kebab','North Indian',['spinach','peas','gram flour'],'grill',{baseTime:35,effort:'medium',guest:true,nutrition:['veg-rich']}),
    B('Corn Cheese Balls','Global',['sweet corn','cheese','breadcrumbs'],'fry',{baseTime:35,effort:'medium',guest:true,nutrition:['indulgent','kids']}),
    B('Veg Cutlet','Indian Fusion',['mixed vegetables','breadcrumbs','spices'],'grill',{baseTime:35,effort:'medium',nutrition:['veg-rich']}),
    B('Bhel Puri','Indian Fusion',['puffed rice','tomato','sev'],'chaat',{baseTime:15,effort:'easy',nutrition:['quick']}),
    B('Sev Puri','Indian Fusion',['puri','sev','tomato'],'chaat',{baseTime:20,effort:'easy',nutrition:['indulgent']}),
    B('Dahi Puri','Indian Fusion',['puri','curd','chutney'],'chaat',{baseTime:20,effort:'easy',guest:true,nutrition:['indulgent']}),
    B('Aloo Tikki Chaat','North Indian',['potato','curd','chutney'],'chaat',{baseTime:30,effort:'medium',jain:false,nutrition:['indulgent']}),
    B('Papdi Chaat','North Indian',['papdi','curd','chutney'],'chaat',{baseTime:20,effort:'easy',guest:true,nutrition:['indulgent']}),
    B('Masala Corn','Indian Fusion',['sweet corn','lemon','spices'],'stir',{baseTime:12,effort:'easy',nutrition:['quick','kids']}),
    B('Roasted Makhana','North Indian',['makhana','ghee','spices'],'roast',{baseTime:12,effort:'easy',nutrition:['light','quick']}),
    B('Peanut Chaat','Indian Fusion',['peanuts','tomato','lemon'],'chaat',{baseTime:12,effort:'easy',nutrition:['protein-rich','quick']}),
    B('Vegetable Spring Roll','Indo-Chinese',['spring roll sheets','cabbage','carrot'],'fry',{baseTime:40,effort:'medium',guest:true,nutrition:['indulgent']}),
    B('Chilli Paneer Dry','Indo-Chinese',['paneer','capsicum','soy sauce'],'stir',{baseTime:30,effort:'medium',guest:true,nutrition:['protein-rich']}),
    B('Veg Manchurian Dry','Indo-Chinese',['cabbage','carrot','capsicum'],'fry',{baseTime:40,effort:'medium',guest:true,nutrition:['veg-rich','indulgent']}),
    B('Mini Pizza','Global',['pizza base','cheese','capsicum'],'bake',{baseTime:25,effort:'easy',guest:true,nutrition:['indulgent','kids']}),
    B('Bruschetta','Global',['bread','tomato','basil'],'assemble',{baseTime:15,effort:'easy',guest:true,nutrition:['quick','veg-rich']}),
    B('Nachos with Salsa','Global',['nachos','tomato','capsicum'],'assemble',{baseTime:15,effort:'easy',guest:true,nutrition:['indulgent']})
  ];

  const styles = {
    Breakfast: ['Classic','Vegetable','Paneer','Spinach','Corn','Millet','Methi','Cheese'],
    Lunch: ['Classic','Palak','Methi','Corn','Kaju','Achari','Coconut','Green Masala'],
    Dinner: ['Classic','Vegetable','Palak','Paneer','Millet','Coconut','Pepper','Lemon'],
    Desserts: ['Classic','Saffron','Dry Fruit','Jaggery','Rose','Mango','Chocolate','Pistachio'],
    Shakes: ['Classic','Coconut Water','Yogurt','Oats','Fresh Fruit','Almond','Dates','Kids Special','Premium'],
    Coffee: ['Classic','Iced','Cinnamon','Vanilla','Hazelnut','Caramel','Almond Milk','Cafe-style'],
    Snacks: ['Classic','Cheese','Paneer','Corn','Spinach','Baked','Tandoori','Chatpata']
  };

  function styleMeta(category, style, base){
    const meta={};
    meta.quick = base.baseTime<=20;
    meta.light = base.nutrition.includes('light') || ['Lemon','Spinach','Palak','Vegetable'].includes(style);
    meta.kids = base.kids || ['Cheese','Paneer','Corn','Chocolate','Vanilla'].includes(style);
    meta.guest = base.guest || ['Kaju','Saffron','Dry Fruit','Pistachio','Tandoori','Cafe-style'].includes(style);
    meta.jain = base.jain && !/potato|aloo|carrot|beetroot|onion|garlic|sweet potato/i.test([...base.ingredients,...additionalIngredients(style,category)].join(' '));
    meta.seasonal = base.season!=='all' || ['Methi','Palak','Spinach','Mango'].includes(style);
    meta.time = Math.max(5, base.baseTime + ({'Vegetable':3,'Paneer':5,'Spinach':3,'Corn':3,'Millet':4,'Methi':3,'Kaju':5,'Coconut':4,'Saffron':3,'Dry Fruit':3,'Iced':1,'Baked':5,'Tandoori':8,'Cafe-style':2}[style]||0));
    meta.effort = ['Kaju','Saffron','Dry Fruit','Pistachio','Tandoori'].includes(style)?'special':base.effort;
    meta.nutrition = [...base.nutrition];
    if(['Paneer','Almond','Dates'].includes(style) && !meta.nutrition.includes('protein-rich')) meta.nutrition.push('protein-rich');
    if(['Lemon','Spinach','Palak'].includes(style) && !meta.nutrition.includes('light')) meta.nutrition.push('light');
    if(['Cheese','Chocolate','Vanilla','Corn'].includes(style) && !meta.nutrition.includes('kids')) meta.nutrition.push('kids');
    return meta;
  }

  function additionalIngredients(style, category){
    const map={
      'Vegetable':['mixed vegetables'], 'Paneer':['paneer'], 'Spinach':['spinach'], 'Palak':['spinach'], 'Corn':['sweet corn'], 'Millet':['millet'], 'Methi':['fenugreek'], 'Cheese':['cheese'],
      'Kaju':['cashew'], 'Achari':['pickle spices'], 'Coconut':['coconut'], 'Green Masala':['coriander','mint'], 'Pepper':['black pepper'], 'Lemon':['lemon'],
      'Saffron':['saffron'], 'Dry Fruit':['almond','cashew'], 'Jaggery':['jaggery'], 'Rose':['rose water'], 'Mango':['mango'], 'Chocolate':['cocoa'], 'Pistachio':['pistachio'],
      'Almond':['almond'], 'Dates':['dates'], 'Oats':['oats','water'], 'Coconut Water':['coconut water'], 'Yogurt':['yogurt'], 'Fresh Fruit':['water'], 'Cinnamon':['cinnamon'], 'Vanilla':['vanilla'], 'Hazelnut':['hazelnut'], 'Caramel':['caramel'], 'Almond Milk':['almond milk'],
      'Baked':['breadcrumbs'], 'Tandoori':['curd','tandoori spices'], 'Chatpata':['chaat masala']
    };
    return map[style]||[];
  }

  function build(category,bases,target=180){
    const out=[];
    const seen=new Set();
    let idx=0;
    for(const base of bases){
      for(const style of styles[category]){
        if(style!=='Classic' && base.name.toLowerCase().includes(style.toLowerCase())) continue;
        let name = style==='Classic' ? base.name : `${style} ${base.name}`;
        if(seen.has(name.toLowerCase())) continue;
        const sm=styleMeta(category,style,base);
        let core=[...base.ingredients];
        if(category==='Shakes' && ['Coconut Water','Yogurt','Oats','Fresh Fruit'].includes(style)){
          core=core.filter(x=>!/milk|ice cream/i.test(x));
        }
        const ingredients=[...new Set([...core,...additionalIngredients(style,category)])];
        out.push({
          id:`${category.toLowerCase()}_${idx++}`,
          category,name,baseName:base.name,cuisine: style==='Jain'?'Jain':base.cuisine,
          majorIngredients:ingredients, method:base.method,
          time:sm.time, effort:sm.effort, quick:sm.quick, light:sm.light, kids:sm.kids, guest:sm.guest,
          jain:sm.jain, seasonal:sm.seasonal, season:base.season, nutrition:sm.nutrition,
          custom:false
        });
        seen.add(name.toLowerCase());
        if(out.length>=target) return out;
      }
    }
    // If target not reached, create numbered chef variations without changing core identity.
    let cycle=1;
    while(out.length<target){
      for(const base of bases){
        const name=`Chef Variation ${cycle} ${base.name}`;
        if(!seen.has(name.toLowerCase())){
          const sm=styleMeta(category,'Home-style',base);
          out.push({id:`${category.toLowerCase()}_${idx++}`,category,name,baseName:base.name,cuisine:base.cuisine,majorIngredients:[...base.ingredients],method:base.method,time:sm.time,effort:sm.effort,quick:sm.quick,light:sm.light,kids:sm.kids,guest:sm.guest,jain:sm.jain,seasonal:sm.seasonal,season:base.season,nutrition:sm.nutrition,custom:false});
          seen.add(name.toLowerCase());
          if(out.length>=target) break;
        }
      }
      cycle++;
    }
    return out;
  }

  const dishes=[
    ...build('Breakfast',breakfastBases,180),
    ...build('Lunch',lunchBases,180),
    ...build('Dinner',dinnerBases,180),
    ...build('Desserts',dessertBases,180),
    ...build('Shakes',shakeBases,216),
    ...build('Coffee',coffeeBases,280),
    ...build('Snacks',snackBases,180)
  ];

  const seasonalVegetables={
    summer:['bottle gourd','ridge gourd','okra','cucumber','pumpkin','tomato','mango','muskmelon','watermelon'],
    monsoon:['sweet corn','okra','bottle gourd','ridge gourd','brinjal','colocasia leaves','peanuts'],
    winter:['peas','carrot','fenugreek','spinach','cauliflower','surti papdi','strawberry','beetroot','green moong'],
    all:['tomato','capsicum','coriander','lemon','cucumber']
  };

  function currentSeason(date=new Date()){
    const m=date.getMonth()+1;
    if([3,4,5,6].includes(m)) return 'summer';
    if([7,8,9].includes(m)) return 'monsoon';
    return 'winter';
  }

  const pantryUnits={
    'rice':['g',70], 'basmati rice':['g',70], 'poha':['g',60], 'semolina':['g',55], 'whole wheat flour':['g',65], 'flour':['g',60],
    'gram flour':['g',55], 'moong dal':['g',55], 'toor dal':['g',55], 'chana dal':['g',55], 'mixed dal':['g',55], 'mixed lentils':['g',55],
    'milk':['ml',180], 'curd':['g',100], 'paneer':['g',80], 'cream':['ml',35], 'coffee':['g',8], 'water':['ml',180],
    'mango':['g',120], 'banana':['piece',1], 'apple':['g',100], 'strawberry':['g',100], 'mixed berries':['g',90], 'chikoo':['g',110],
    'mixed vegetables':['g',140], 'spinach':['g',90], 'peas':['g',70], 'capsicum':['g',70], 'tomato':['g',80], 'okra':['g',100],
    'brinjal':['g',100], 'bottle gourd':['g',120], 'sweet corn':['g',80], 'coconut':['g',35], 'peanuts':['g',20], 'cashew':['g',20], 'almond':['g',20],
    'sugar':['g',20], 'jaggery':['g',20], 'ghee':['g',10], 'butter':['g',10], 'oil':['ml',10], 'bread':['slice',2], 'pav':['piece',2]
  };

  function ingredientAmount(name, adultEq){
    const key=Object.keys(pantryUnits).find(k=>name.toLowerCase().includes(k));
    const [unit,per]=key?pantryUnits[key]:['g',50];
    return {qty:Math.max(unit==='piece'||unit==='slice'?1:5, Math.round(per*adultEq*10)/10),unit};
  }

  function recipeFor(item, adults=2, kids=0){
    const adultEq=Math.max(1, Number(adults||0)+Number(kids||0)*0.6);
    const ingredients=item.majorIngredients.map(n=>({name:n,...ingredientAmount(n,adultEq)}));
    const pantry=[
      {name:'oil or ghee',qty:Math.round(8*adultEq),unit:'ml'},
      {name:'salt',qty:'to taste',unit:''},
      {name:'basic spices',qty:'as needed',unit:''}
    ];
    if(item.jain===false){ /* no special action */ }
    const method=item.method;
    let steps=[];
    if(method==='coffee') steps=[
      'Brew the coffee fresh to the strength you like.',
      'Heat, froth or chill the milk/water depending on the style.',
      'Combine in the right ratio, add the flavouring, and serve immediately.'
    ];
    else if(method==='blend') steps=[
      'Chill the fruit/milk and prepare all ingredients.',
      'Blend everything until completely smooth and creamy.',
      'Taste, adjust sweetness or thickness, and serve immediately.'
    ];
    else if(method==='dessert') steps=[
      'Measure all ingredients before starting and prepare the base.',
      'Cook or set the dessert gently until the right texture develops.',
      'Finish with the listed flavourings, cool if needed, garnish and serve.'
    ];
    else if(['griddle','flatbread','grill','bake','steam','fry','roast'].includes(method)) steps=[
      'Prepare the batter/dough/filling and rest it briefly if needed.',
      `Cook using the ${method} method until evenly done and aromatic.`,
      'Finish with fresh coriander/lemon or the suggested accompaniment and serve hot.'
    ];
    else if(['rice','onepot','dal','kadhi','curry','stew','mash','stir'].includes(method)) steps=[
      'Wash, chop and measure all ingredients. Keep the spices ready.',
      'Start with a gentle tempering, then cook the main ingredients until almost tender.',
      'Add the remaining liquid/spices, simmer to the correct consistency, finish and serve.'
    ];
    else steps=[
      'Prepare all ingredients and the main base.',
      'Cook or assemble the dish until the texture and seasoning are right.',
      'Finish with fresh garnish and serve immediately.'
    ];
    return {ingredients:[...ingredients,...pantry],steps,time:item.time,effort:item.effort,servings:{adults:Number(adults),kids:Number(kids),adultEquivalent:adultEq}};
  }

  function nutritionIndicator(item){
    const n=new Set(item.nutrition);
    const score={protein:n.has('protein-rich')?3:1,vegetables:n.has('veg-rich')||n.has('fruit-rich')?3:1,light:n.has('light')?3:n.has('indulgent')?1:2,balance:n.has('balanced')?3:2};
    return score;
  }

  window.KKK_DATA={CATEGORIES,CUISINES,SEASONS,dishes,seasonalVegetables,currentSeason,recipeFor,nutritionIndicator};
})();
