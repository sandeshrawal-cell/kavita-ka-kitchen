import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateEntry,duplicates,normalizeName} from '../scripts/validate-catalog.mjs';
import {recommend} from '../src/core.js';
const batch=JSON.parse(fs.readFileSync(new URL('../catalog/approved/wave1.json',import.meta.url)));
test('draft validation catches unsafe content, subminimum quantities and bad fields',()=>{
 const {dish,recipe}=structuredClone(batch.entries[0]);assert.deepEqual(validateEntry(dish,recipe).errors,[]);
 recipe.ingredients[0].qty=.1;assert.ok(validateEntry(dish,recipe).errors.some(x=>x.includes('minimum')));recipe.ingredients[0].qty=240;
 recipe.steps.push('Add fish sauce to the finished preparation.');assert.ok(validateEntry(dish,recipe).errors.some(x=>x.includes('prohibited')));recipe.steps.pop();
 dish.jainVerified=true;assert.ok(validateEntry(dish,recipe).errors.some(x=>x.includes('Jain')));dish.jainVerified=false;
 dish.categories.push('Invented category');assert.ok(validateEntry(dish,recipe).errors.some(x=>x.includes('invalid categories')));
 delete dish.time;assert.ok(validateEntry(dish,recipe).errors.some(x=>x.includes('time')));
});
test('duplicates cannot hide behind accents, punctuation or aliases',()=>{
 assert.equal(normalizeName('Pán-eer!'),normalizeName('paneer'));
 assert.ok(duplicates([{dish:{id:'one',name:'New dish'}},{dish:{id:'two',name:'Other'},aliases:['new-dish']}]).length);
 assert.ok(duplicates([{dish:{id:'one',name:'A'}},{dish:{id:'one',name:'B'}}]).length);
});
test('all batch recipes have measured methods and both translated methods',()=>{
 assert.equal(batch.entries.length,10);assert.equal(batch.publicationApproved,true);
 for(const e of batch.entries){assert.deepEqual(validateEntry(e.dish,e.recipe).errors,[],e.dish.id);for(const lang of ['hi','gu'])for(const s of [e.recipe.name,...e.recipe.ingredients.map(i=>i.name),...e.recipe.steps])assert.ok(e.translations[lang][s],`${e.dish.id} ${lang}: ${s}`);}
});
test('each draft name will be discoverable with Category Any after publication',()=>{
 const dishes=batch.entries.map(e=>e.dish);
 for(const d of dishes)assert.equal(recommend(dishes,{category:'Any',query:d.name})[0]?.id,d.id);
});
test('approved dishes and aliases are searchable in the generated public catalogue',()=>{
 const dishes=JSON.parse(fs.readFileSync(new URL('../catalog/generated/dishes.json',import.meta.url)));
 for(const e of batch.entries)for(const query of [e.dish.name,...e.aliases])assert.equal(recommend(dishes,{category:'Any',query})[0]?.id,e.dish.id,query);
});
