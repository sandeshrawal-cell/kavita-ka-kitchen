import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {scaleRecipe,parseSearch,recommend} from '../src/core.js';
import {methodBatch,stepAdjustments} from '../src/method-scale.js';
import {buildMenuProposal} from '../src/proposal.js';
import {correctCategories} from '../catalog/categories.mjs';

const party={mode:'event',adults:150,kids:0,guests:0,jainMeals:0,buffer:0};

test('bulk method displays measured quantities per cooking batch without scaling times',()=>{
 const recipe={baseServings:4,batchSize:50,ingredients:[{name:'water',qty:200,unit:'ml',scale:'linear'},{name:'salt',qty:1,unit:'g',scale:'seasoning'}],steps:['Add 200 ml water and 1 g salt; simmer for 10 minutes.']};
 const scaled=scaleRecipe(recipe,party),batch=methodBatch(recipe,scaled);
 assert.equal(batch.batches,3);
 assert.equal(batch.servingsPerBatch,50);
 assert.equal(batch.ingredients[0].qty,2500);
 assert.equal(batch.ingredients[1].qty,10.63);
 assert.deepEqual(stepAdjustments(recipe.steps[0],recipe,scaled,batch),['200 ml → 2500 ml per batch','1 g → 10.63 g per batch']);
 assert.equal(stepAdjustments('Simmer for 10 minutes.',recipe,scaled,batch).length,0);
 const splitSalt={...recipe,ingredients:[{name:'cumin',qty:4,unit:'g',scale:'seasoning'},{name:'salt',qty:7,unit:'g',scale:'seasoning'}]};
 const splitScaled=scaleRecipe(splitSalt,party),splitBatch=methodBatch(splitSalt,splitScaled);
 assert.deepEqual(stepAdjustments('Add 4 g salt and reserve the rest for raita.',splitSalt,splitScaled,splitBatch),['4 g → 42.5 g per batch']);
});

test('client menu export uses guest count for quote and escapes client text',()=>{
 const result=buildMenuProposal({name:'Dinner',client:'<script>alert(1)</script>',party,dishes:[{name:'Paneer Tikka'}],pricePerGuest:'250',service:'Buffet'});
 assert.equal(result.total,37500);
 assert.match(result.html,/Paneer Tikka/);
 assert.match(result.html,/&lt;script&gt;/);
 assert.doesNotMatch(result.html,/<script>/);
 assert.doesNotMatch(result.html,/ingredient subtotal/i);
});

test('the assistant example has real matching dishes',()=>{
 const query=parseSearch('Punjabi dinner for six adults, under 45 minutes');
 const dishes=JSON.parse(fs.readFileSync(new URL('../public/data/categories/dinner.json',import.meta.url)));
 const results=recommend(dishes,{...query,party:{...party,mode:'home',adults:6}},{exclusions:[],history:[],hidden:[]},20);
 assert.ok(results.some(d=>d.name==='Achari Paneer'));
});

test('guest suggestions reuse dishes without mislabelling bowls and drinks',()=>{
 const drink={id:'fresh-lime-soda',recipeStatus:'complete',categories:['Salads','Cold Drinks']};correctCategories(drink);
 assert.ok(!drink.categories.includes('Salads'));
 const bowl={id:'vegetarian-burrito-bowl',recipeStatus:'complete',categories:['Wraps','Lunch']};correctCategories(bowl);
 assert.ok(!bowl.categories.includes('Wraps'));
 const partyDish={id:'samosa',recipeStatus:'complete',categories:['Party Food']};correctCategories(partyDish);
 assert.ok(partyDish.categories.includes('Guest Menus'));
});
