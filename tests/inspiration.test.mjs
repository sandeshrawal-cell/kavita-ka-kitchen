import test from 'node:test';
import assert from 'node:assert/strict';
import {chooseInspiration} from '../src/inspiration.js';

test('home inspiration rotates without repeating recent dishes until the pool cycles',()=>{
 const pool=Array.from({length:12},(_,i)=>({id:`dish-${i}`}));
 const first=chooseInspiration(pool,[],4,()=>0);
 const second=chooseInspiration(pool,first.map(d=>d.id),4,()=>0);
 const third=chooseInspiration(pool,[...first,...second].map(d=>d.id),4,()=>0);
 assert.equal(new Set(first.map(d=>d.id)).size,4);
 assert.ok(second.every(d=>!first.some(x=>x.id===d.id)));
 assert.ok(third.every(d=>!first.concat(second).some(x=>x.id===d.id)));
 const cycled=chooseInspiration(pool,[...first,...second,...third].map(d=>d.id),4,()=>0);
 assert.equal(cycled.length,4);
 assert.equal(new Set(cycled.map(d=>d.id)).size,4);
});
