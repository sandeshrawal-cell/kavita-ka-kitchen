import test from 'node:test';
import assert from 'node:assert/strict';
import {readHousehold,writeHousehold} from '../src/household.js';
const defaults={mode:'home',adults:2,kids:0,guests:0,buffer:0,jainMeals:0};
const memory=()=>{const data=new Map();return {getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)};};
test('household and diet survive repeat sessions without crossing account boundaries',()=>{
 const storage=memory(),prefs={party:{...defaults,adults:4},confirmed:true,jain:true,exclusions:['onion'],metric:false};
 writeHousehold(storage,null,prefs);
 for(let visit=0;visit<5;visit++){const saved=readHousehold(storage,null,defaults);assert.equal(saved.party.adults,4);assert.equal(saved.confirmed,true);assert.equal(saved.jain,true);assert.deepEqual(saved.exclusions,['onion']);}
 assert.equal(readHousehold(storage,'user-a',defaults).confirmed,false);
 writeHousehold(storage,'user-a',{...prefs,party:{...defaults,adults:6}});
 assert.equal(readHousehold(storage,'user-a',defaults).party.adults,6);
 assert.equal(readHousehold(storage,'user-b',defaults).party.adults,2);
 assert.equal(readHousehold(storage,null,defaults).party.adults,4);
});
test('unavailable or corrupt storage leaves a valid home default',()=>{
 assert.equal(readHousehold({getItem:()=>'{oops'},null,defaults).party.adults,2);
 assert.equal(readHousehold({getItem:()=>JSON.stringify({party:{adults:-5}})},null,defaults).party.adults,2);
 assert.equal(writeHousehold({setItem(){throw Error('full');}},null,{}),false);
});

test('welcome completion persists for returning guests and remains account scoped',()=>{const storage=memory();writeHousehold(storage,null,{party:defaults,introDone:true});assert.equal(readHousehold(storage,null,defaults).introDone,true);assert.equal(readHousehold(storage,'new-account',defaults).introDone,false);writeHousehold(storage,'new-account',{party:defaults,introDone:true});assert.equal(readHousehold(storage,'new-account',defaults).introDone,true);});
