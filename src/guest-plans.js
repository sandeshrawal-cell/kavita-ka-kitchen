const planKey='kkk-guest-plans-v1';
const groceryKey='kkk-guest-grocery-v1';
const meals=new Set(['Breakfast','Lunch','Dinner']);
const validPlan=p=>p&&/^plan:\d{4}-\d{2}-\d{2}:(Breakfast|Lunch|Dinner)$/.test(p._id)&&meals.has(p.meal)&&p._id===`plan:${p.date}:${p.meal}`&&Array.isArray(p.dishIds)&&p.dishIds.length>0;

export function readGuestPlans(storage){
 try{const rows=JSON.parse(storage.getItem(planKey)||'[]');return Array.isArray(rows)?rows.filter(validPlan):[];}catch{return [];}
}
export function saveGuestPlan(storage,id,plan){
 if(!validPlan({_id:id,...plan}))throw Error('Choose a valid date, meal and at least one dish.');
 const rows=readGuestPlans(storage).filter(p=>p._id!==id);
 if(rows.length>=1095)throw Error('This device has reached its guest plan limit. Clear an old meal or sign in to sync your plan.');
 rows.push({_id:id,...plan});storage.setItem(planKey,JSON.stringify(rows));
}
export function removeGuestPlan(storage,id){storage.setItem(planKey,JSON.stringify(readGuestPlans(storage).filter(p=>p._id!==id)));}
export function readGuestGrocery(storage){try{const value=JSON.parse(storage.getItem(groceryKey)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}catch{return {};}}
export function saveGuestGrocery(storage,id,checked){const rows=readGuestGrocery(storage);if(checked)rows[id]=true;else delete rows[id];storage.setItem(groceryKey,JSON.stringify(rows));}
