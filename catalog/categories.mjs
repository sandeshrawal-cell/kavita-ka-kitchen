// Meal suitability is editorial metadata; cooking method alone cannot establish it.
const mealCorrections={
 'pav-bhaji':['Lunch','Dinner','Snacks','Street Food'],
 'ragda-pattice':['Lunch','Dinner','Snacks','Chaats','Street Food'],
 'corn-chaat':['Snacks','Chaats','Street Food'],
 'sprouts-chaat':['Snacks','Chaats'],
 'patra':['Snacks'],
 'hummus':['Snacks'],
 'roasted-makhana':['Snacks'],
 'sakkarai-pongal':['Desserts','Indian Sweets','Festival Food'],
 'hot-chocolate':['Hot Drinks'],
 'saffron-milk':['Hot Drinks'],
 'rose-milk':['Cold Drinks'],
};
const coldCoffee=/^(iced-|cold-|nitro-|orange-espresso|coffee-lemonade|sparkling-americano|espresso-tonic)/;
export function correctCategories(d){
 const corrected=mealCorrections[d.id];
 if(corrected){
  const remove=new Set(['Breakfast','Lunch','Dinner','Lunchbox','Kids Meals','Coffee','Tea','Hot Drinks','Cold Drinks','Salads','One-Pot Meals','Rice']);
  d.categories=d.categories.filter(c=>!remove.has(c));
  d.categories.push(...corrected);
 }
 if(d.categories.includes('Coffee')&&coldCoffee.test(d.id)){
  d.categories=d.categories.filter(c=>c!=='Hot Drinks');d.categories.push('Cold Drinks');
 }
 if(d.method==='chaat')d.categories.push('Chaats','Snacks');
 if(/soup|minestrone|rasam/.test(d.id))d.categories.push('Soups');
 const drinks=d.categories.some(c=>['Coffee','Tea','Shakes','Smoothies','Juices','Mocktails','Hot Drinks','Cold Drinks'].includes(c));
 if(drinks||d.categories.includes('Desserts'))d.categories=d.categories.filter(c=>!['Breakfast','Lunch','Dinner','Light Meals','Lunchbox'].includes(c));
 if(d.advancePrep)d.categories=d.categories.filter(c=>c!=='Quick Meals');
 d.categories=[...new Set(d.categories)];
}
