import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {normalizeText,configureLanguage,translate,cookingCommand} from '../src/i18n.js';
const read=async path=>JSON.parse(await fs.readFile(new URL('../'+path,import.meta.url),'utf8'));
const dishes=await read('catalog/generated/dishes.json');
const recipes=await Promise.all(dishes.map(d=>read('public/data/recipes/'+d.id+'.json')));
const required=new Set(recipes.flatMap(r=>[r.name,...r.ingredients.map(i=>i.name),...r.steps,...r.tips,...r.substitutions,r.notes,r.passiveTime]).filter(x=>typeof x==='string'&&x).map(normalizeText));
for(const language of ['hi','gu'])test(`${language}: every published recipe field is translated with all numeric quantities preserved`,async()=>{
 const dictionary=await read(`public/data/locales/${language}-recipes.json`);
 const missing=[...required].filter(key=>!dictionary[key]);assert.deepEqual(missing,[],'Missing recipe translations');
 const numberErrors=[];
 for(const key of required){const expected=(key.match(/\d+(?:\.\d+)?/g)||[]).sort(),actual=(dictionary[key].match(/\d+(?:\.\d+)?/g)||[]).sort();if(JSON.stringify(expected)!==JSON.stringify(actual))numberErrors.push({key,translation:dictionary[key],expected,actual});}
 assert.deepEqual(numberErrors,[],'Recipe numbers changed in translation');
 const ui=await read(`public/data/locales/${language}-ui.json`);
 for(const [key,value] of Object.entries(ui))assert.deepEqual((value.match(/\{\d+\}/g)||[]).sort(),(key.match(/\{\d+\}/g)||[]).sort(),key);
 configureLanguage(language,{...ui,...dictionary});
 for(const key of ['Language','Breakfast','Lunch','Dinner','Settings','Ingredients','Method'])assert.notEqual(translate(key),key,key);
 configureLanguage('en');
});
test('legacy recipe aliases serve complete canonical recipes',async()=>{
 const aliases=await read('public/data/aliases.json');
 for(const id of ['chana-dal-lauki','chocolate-mousse','eggless-malpua','fruit-custard','hara-bhara-kebab-meal','kheer','panna-cotta','sev-tameta','tandoori-paneer-with-roti']){
  const recipe=await read('public/data/recipes/'+id+'.json');assert.equal(recipe.id,aliases[id]);assert.equal(recipe.status,'complete');assert.ok(recipe.steps.length>=4);
 }
});
test('cooking voice commands support all three languages and Indic digits',()=>{
 assert.deepEqual(cookingCommand('આગળ'),{action:'step-next'});
 assert.deepEqual(cookingCommand('पिछला'),{action:'step-prev'});
 assert.deepEqual(cookingCommand('repeat'),{action:'step-repeat'});
 assert.deepEqual(cookingCommand('टाइमर ५ मिनट'),{minutes:5});
 assert.deepEqual(cookingCommand('ટાઇમર ૧૦ મિનિટ'),{minutes:10});
 assert.equal(cookingCommand('timer 900 min'),null);
});
