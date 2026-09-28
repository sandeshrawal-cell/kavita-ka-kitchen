import test from 'node:test';
import assert from 'node:assert/strict';
import {readGuestPlans,saveGuestPlan,removeGuestPlan,readGuestGrocery,saveGuestGrocery} from '../src/guest-plans.js';
import {partyForMode} from '../src/mode-party.js';
import {readHousehold} from '../src/household.js';
import {headcount} from '../src/core.js';

const memory=()=>{const items=new Map();return {getItem:key=>items.get(key)??null,setItem:(key,value)=>items.set(key,String(value))};};

test('guest meals and shopping checks survive a fresh read and can be changed',()=>{
 const storage=memory(),id='plan:2026-10-01:Dinner';
 saveGuestPlan(storage,id,{date:'2026-10-01',meal:'Dinner',name:'Paneer and rice',dishIds:['paneer'],party:{mode:'home',adults:4,kids:0,guests:0}});
 assert.equal(readGuestPlans(storage)[0].name,'Paneer and rice');
 saveGuestPlan(storage,id,{date:'2026-10-01',meal:'Dinner',name:'Dal and rice',dishIds:['dal'],party:{mode:'home',adults:4,kids:0,guests:0}});
 assert.deepEqual(readGuestPlans(storage).map(p=>p.name),['Dal and rice']);
 saveGuestGrocery(storage,'2026-09-28:rice',true);
 assert.equal(readGuestGrocery(storage)['2026-09-28:rice'],true);
 saveGuestGrocery(storage,'2026-09-28:rice',false);
 assert.deepEqual(readGuestGrocery(storage),{});
 removeGuestPlan(storage,id);
 assert.deepEqual(readGuestPlans(storage),[]);
});

test('each kitchen mode uses only its own headcount fields',()=>{
 const previous={mode:'home',adults:4,kids:2,guests:1,budget:100};
 const factory=partyForMode('factory',{shift1:'80',shift2:'60',shift3:'40',buffer:'10',jainMeals:'12'},previous);
 assert.deepEqual(factory.shifts,[80,60,40]);
 assert.equal(headcount(factory).servings,198);
 assert.equal(factory.kids,0);
 assert.equal(factory.guests,0);
 const event=partyForMode('event',{attendees:'120',buffer:'5'},factory);
 assert.equal(headcount(event).servings,126);
 assert.equal(event.shifts,null);
 const home=partyForMode('home',{adults:'2',kids:'2',guests:'0'},event);
 assert.equal(headcount(home).equivalent,3.2);
 assert.equal(home.buffer,0);
 assert.equal(home.jainMeals,0);
 assert.throws(()=>partyForMode('factory',{shift1:'0',shift2:'0',shift3:'0'},previous),/Enter between 1 and 100,000 people/);
});

test('hidden legacy child counts move into visible non-home headcounts',()=>{
 const storage=memory();
 storage.setItem('kkk-household-v1:guest',JSON.stringify({party:{mode:'event',adults:6,kids:3,guests:0}}));
 const event=readHousehold(storage,null,{mode:'home',adults:2,kids:0,guests:0}).party;
 assert.equal(event.adults,9);assert.equal(event.kids,0);assert.equal(headcount(event).total,9);
 storage.setItem('kkk-household-v1:guest',JSON.stringify({party:{mode:'factory',adults:6,kids:3,shifts:[20,10,0]}}));
 const factory=readHousehold(storage,null,{mode:'home',adults:2,kids:0,guests:0}).party;
 assert.deepEqual(factory.shifts,[9,0,0]);assert.equal(factory.kids,0);
 storage.setItem('kkk-household-v1:guest',JSON.stringify({party:{mode:'event',adults:6,kids:0,guests:3}}));
 const eventWithHiddenGuests=readHousehold(storage,null,{mode:'home',adults:2,kids:0,guests:0}).party;
 assert.equal(eventWithHiddenGuests.adults,9);assert.equal(eventWithHiddenGuests.guests,0);assert.equal(headcount(eventWithHiddenGuests).total,9);
});
