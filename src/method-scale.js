// A method is performed once per cooking batch. Times and doneness cues are not
// multiplied by headcount; measured ingredients are divided across the batches.
export function methodBatch(recipe, scaled, vesselLimit) {
 const limit=Math.max(1,Math.min(Number(recipe.batchSize)||50,Number(vesselLimit)||Infinity));
 const batches=Math.max(1,Math.ceil(scaled.servings/limit));
 const servingsPerBatch=scaled.servings/batches;
 const ingredients=scaled.ingredients.map(item=>({...item,qty:Math.round(item.qty/batches*100)/100}));
 return {batches,servingsPerBatch,ingredients};
}

const measure=/\b(\d+(?:\.\d+)?)\s*(kg|g|ml|l|cups?|tbsp|tsp|pieces?)\b/gi;
const format=n=>String(Math.round(n*100)/100);

// Keep the original, translated method intact. Show conversions beside explicit
// base-recipe quantities, using the ingredient's adjusted amount when unique.
export function stepAdjustments(step,recipe,scaled,batch){
 const factor=scaled.equivalent/(recipe.baseServings||4)/batch.batches;
 if(Math.abs(factor-1)<0.00001)return [];
 const found=[];
 for(const match of step.matchAll(measure)){
  const amount=Number(match[1]),unit=match[2];
  const sameUnit=(recipe.ingredients||[]).map((item,index)=>({item,index})).filter(({item})=>item.unit.toLowerCase()===unit.toLowerCase());
  const after=step.slice(match.index+match[0].length).trimStart().toLowerCase(),before=step.slice(0,match.index).toLowerCase();
  const named=sameUnit.filter(({item})=>after.startsWith(item.name.toLowerCase())||after.startsWith('of '+item.name.toLowerCase())||before.trimEnd().endsWith(item.name.toLowerCase()));
  const exact=sameUnit.filter(({item})=>Math.abs(item.qty-amount)<0.00001);
  const chosen=named.length===1?named[0]:exact.length===1&&new RegExp(`\\b${exact[0].item.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\b`,'i').test(step)?exact[0]:null;
  const adjusted=chosen?amount/chosen.item.qty*batch.ingredients[chosen.index].qty:amount*factor;
  const label=`${match[1]} ${unit} → ${format(adjusted)} ${unit} per batch`;
  if(!found.includes(label))found.push(label);
 }
 return found;
}
