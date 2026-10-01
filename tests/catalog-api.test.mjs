import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/catalog.js';

function request(category,offset=0){
 let status=200,body;
 const response={setHeader(){},status(code){status=code;return this;},json(value){body=value;return this;}};
 return handler({method:'GET',query:{category,offset,limit:100}},response).then(()=>({status,body}));
}

test('the public catalogue can page across every meal for ingredient searches',async()=>{
 const first=await request('Any');
 assert.equal(first.status,200);
 assert.equal(first.body.items.length,100);
 assert.equal(first.body.next,100);
 const second=await request('Any',first.body.next);
 assert.equal(second.status,200);
 assert.ok(second.body.items.some(d=>d.categories.includes('Dinner')||d.categories.includes('Breakfast')));
 const dinner=await request('Dinner');
 assert.ok(dinner.body.items.every(d=>d.categories.includes('Dinner')));
 assert.ok(first.body.items.every(d=>Array.isArray(d.searchNames)&&Array.isArray(d.searchIngredients)));
});
