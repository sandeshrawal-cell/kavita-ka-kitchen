import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {parseSearch,recommend} from '../src/core.js';
const dishes=JSON.parse(await fs.readFile(new URL('../catalog/generated/dishes.json',import.meta.url)));
test('every published dish has a measured multi-step recipe',async()=>{
 assert.equal(dishes.length,356);
 for(const d of dishes){
  const r=JSON.parse(await fs.readFile(new URL('../public/data/recipes/'+d.id+'.json',import.meta.url)));
  assert.equal(r.status,'complete',d.id);assert.equal(d.recipeStatus,'complete',d.id);
  assert.ok(r.steps.length>=4,d.id+' needs a complete method');
  assert.ok(r.steps.every(s=>typeof s==='string'&&s.trim().length>=25),d.id+' has an empty or skeletal step');
  assert.ok(r.ingredients.length>0&&r.ingredients.every(i=>Number.isFinite(i.qty)&&i.qty>0&&i.unit),d.id);
  assert.ok(!/still being developed|provisional planning|incomplete preparation/i.test(r.steps.join(' ')),d.id);
 }
});
test('explicit breakfast remains the requested meal when the search says light',()=>{
 assert.equal(parseSearch('light breakfast for four adults').category,'Breakfast');
 assert.equal(parseSearch('light dinner').category,'Dinner');
 assert.equal(parseSearch('light food').category,'Light Meals');
 const results=recommend(dishes,{...parseSearch('light breakfast'),party:{mode:'home',adults:4}},{});
 assert.ok(results.length>0);assert.ok(results.every(d=>d.categories.includes('Breakfast')));
 for(const id of ['pav-bhaji','ragda-pattice','corn-chaat','sprouts-chaat','patra'])assert.ok(!results.some(d=>d.id===id),id);
});
test('meal labels exclude drinks, desserts and snack-only dishes',()=>{
 for(const id of ['hummus','roasted-makhana','sakkarai-pongal','espresso','hot-chocolate']){
  const d=dishes.find(x=>x.id===id);assert.ok(!d.categories.some(c=>['Breakfast','Lunch','Dinner'].includes(c)),id);
 }
 assert.ok(dishes.find(d=>d.id==='misal-pav').categories.includes('Breakfast'));
 assert.ok(dishes.find(d=>d.id==='pav-bhaji').categories.includes('Dinner'));
 assert.ok(!dishes.find(d=>d.id==='iced-latte').categories.includes('Hot Drinks'));
});
