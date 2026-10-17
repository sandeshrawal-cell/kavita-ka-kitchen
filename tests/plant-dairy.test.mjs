import test from 'node:test';
import assert from 'node:assert/strict';
import {eligible,dairyEvidenceText} from '../src/core.js';
const dish=ingredients=>({id:'plant-snack',name:'Plant snack',canonicalId:'plant-snack',vegetarian:true,eggless:true,ingredientsComplete:true,ingredients,allergens:[]});
test('plant milks, coconut cream and nut butters are not evidence of dairy',()=>{
 for(const ingredient of ['smooth peanut butter','almond butter','cashew butter','cocoa butter','coconut cream','coconut milk','oat milk','rice milk','soy milk','almond milk','cashew milk'])assert.equal(eligible(dish([ingredient]),{exclusions:['dairy']}),true,ingredient);
});
test('real dairy and explicit milk allergens remain excluded alongside plant ingredients',()=>{
 for(const ingredient of ['butter','milk','cream','curd','paneer','cheese','yogurt','buttermilk','ricotta','ghee'])assert.equal(eligible(dish(['peanut butter','oat milk',ingredient]),{exclusions:['dairy']}),false,ingredient);
 assert.equal(eligible({...dish(['almond milk']),allergens:['milk']},{exclusions:['dairy']}),false);
});
test('plant substitution keeps nut and soy evidence and unknown ingredients fail closed',()=>{
 assert.equal(eligible(dish(['smooth peanut butter']),{exclusions:['nuts']}),false);
 assert.equal(eligible(dish(['soy milk']),{exclusions:['soy']}),false);
 assert.match(dairyEvidenceText('almond milk and peanut butter'),/almond.*peanut/);
 assert.equal(eligible({...dish(['oat milk']),ingredientsComplete:false},{exclusions:['dairy']}),false);
});
