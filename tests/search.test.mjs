import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {recommend, parseSearch, textMatchScore, searchSummary} from '../src/core.js';

const catalog=JSON.parse(await fs.readFile(new URL('../catalog/generated/dishes.json',import.meta.url)));
const party={mode:'home',adults:4,kids:0};
const dish=(id,patch={})=>({id,canonicalId:id,name:id,categories:['Dinner'],cuisine:'Punjabi',ingredients:['rice'],vegetarian:true,eggless:true,ingredientsComplete:true,time:20,effort:'easy',kids:true,nutrition:[],leftoverUses:[],...patch});

test('dish names rank ahead of ingredient-only hits even when preferences favour another dish',()=>{
  const named=dish('paneer-tikka',{name:'Paneer Tikka',ingredients:['paneer','capsicum']});
  const ingredient=dish('vegetable-bowl',{name:'Vegetable Bowl',ingredients:['rice','paneer']});
  const unrelated=dish('dal',{name:'Dal Tadka',ingredients:['lentils']});
  const results=recommend([ingredient,unrelated,named],{category:'Dinner',query:'paneer',party},{preferences:{'vegetable-bowl':{cooked:100}}});
  assert.deepEqual(results.map(d=>d.id),['paneer-tikka','vegetable-bowl']);
  assert.ok(results.every(d=>d.exact));
  assert.ok(textMatchScore(named,'paneer')>textMatchScore(ingredient,'paneer'));
});

test('search supports aliases, ingredient tokens and a one-edit typo without matching arbitrary substrings',()=>{
  const aliased=dish('chickpea-curry',{name:'Chickpea Curry',aliases:['Chole Masala'],ingredients:['cooked chickpeas','tomato']});
  const paneer=dish('paneer-tikka',{name:'Paneer Tikka',ingredients:['paneer','capsicum']});
  assert.ok(textMatchScore(aliased,'chole masala')>0);
  assert.ok(textMatchScore(aliased,'chickpeas')>0);
  assert.ok(textMatchScore(paneer,'panner tikka')>0);
  assert.equal(textMatchScore(paneer,'panner noodles'),0);
  assert.equal(textMatchScore(dish('tea',{name:'Tea',ingredients:['tea leaves']}),'pea'),0);
});

test('real paneer typo results match the correct spelling instead of unrelated suggestions',()=>{
  const exact=recommend(catalog,{category:'Dinner',query:'paneer',party},{},Infinity);
  const typo=recommend(catalog,{category:'Dinner',query:'panner',party},{},Infinity);
  assert.ok(exact.length>0);
  assert.deepEqual(new Set(typo.map(d=>d.id)),new Set(exact.map(d=>d.id)));
  assert.ok(typo.every(d=>d.exact));
});

test('zero text matches produce labelled suggestions only within all selected filters',()=>{
  const valid=dish('valid',{ingredients:['rice'],leftoverUses:['cooked rice']});
  const rows=[valid,
    dish('wrong-cuisine',{cuisine:'Gujarati'}),
    dish('too-slow',{time:60}),
    dish('advance-prep',{advancePrep:true}),
    dish('too-hard',{effort:'hard'}),
    dish('not-kids',{kids:false}),
    dish('no-pantry',{ingredients:['lentils']}),
    dish('no-leftovers',{leftoverUses:[]})];
  const filters={category:'Dinner',query:'zzzzzzzz',cuisine:'Punjabi',time:30,effort:'easy',kids:true,pantry:true,leftovers:true,party};
  const results=recommend(rows,filters,{pantry:['rice'],leftovers:['cooked rice']},Infinity);
  assert.deepEqual(results.map(d=>d.id),['valid']);
  assert.equal(results[0].exact,false);
  assert.deepEqual(recommend(rows,{...filters,cuisine:'Impossible'},{pantry:['rice'],leftovers:['cooked rice']},Infinity),[]);
});

test('each explicit filter independently excludes invalid dishes, including on fallback',()=>{
  const cases=[
    [{cuisine:'Punjabi'},{cuisine:'Gujarati'},{}],
    [{time:30},{time:60},{}],
    [{time:30},{advancePrep:true},{}],
    [{effort:'easy'},{effort:'hard'},{}],
    [{kids:true},{kids:false},{}],
    [{pantry:true},{ingredients:['lentils']},{pantry:['rice']}],
    [{leftovers:true},{leftoverUses:[]},{leftovers:['cooked rice']}]
  ];
  for(const [filter,invalid,state] of cases)for(const query of ['', 'zzzzzzzz']){
    const good=dish('good',{leftoverUses:['cooked rice']}),bad=dish('bad',{leftoverUses:['cooked rice'],...invalid});
    const results=recommend([bad,good],{category:'Dinner',party,...filter,query},state,Infinity);
    assert.deepEqual(results.map(d=>d.id),['good'],JSON.stringify({filter,query}));
  }
});

test('all filtered results can be counted beyond the legacy default limit',()=>{
  const rows=Array.from({length:83},(_,i)=>dish(`dish-${i}`,{name:`Dish ${i}`}));
  assert.equal(recommend(rows,{party},{}).length,70);
  assert.equal(recommend(rows,{party},{},Infinity).length,83);
  assert.equal(recommend(rows,{party},{},80).length,80);
});

test('summary totals, displayed rows and remaining rows reconcile for all result states',()=>{
  const rows=Array.from({length:83},(_,i)=>({id:String(i),exact:true}));
  for(const visible of [0,24,72,83,100]){
    const summary=searchSummary(rows,visible);
    assert.equal(summary.total,83);
    assert.equal(summary.shown,Math.min(visible,83));
    assert.equal(summary.shown+summary.remaining,summary.total);
    assert.equal(summary.matched,83);
    assert.equal(summary.suggestions,0);
    assert.equal(summary.next,Math.min(12,summary.remaining));
  }
  assert.equal(searchSummary(rows,72).next,11);
  assert.equal(searchSummary(rows,83).next,0);
  assert.deepEqual(searchSummary([],24),{total:0,shown:0,remaining:0,next:0,matched:0,suggestions:0});
  const fallback=searchSummary(rows.slice(0,3).map(d=>({...d,exact:false})),24);
  assert.deepEqual(fallback,{total:3,shown:3,remaining:0,next:0,matched:0,suggestions:3});
});

test('plain-language filters preserve dish search words while removing structured phrases',()=>{
  const parsed=parseSearch('Punjabi dinner paneer for 4 adults, no potato');
  assert.equal(parsed.query,'paneer');
  assert.equal(parsed.cuisine,'Punjabi');
  assert.equal(parsed.category,'Dinner');
  assert.equal(parsed.adults,4);
  assert.deepEqual(parsed.exclusions,['potato']);
});
