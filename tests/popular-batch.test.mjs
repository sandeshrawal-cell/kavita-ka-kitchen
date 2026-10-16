import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('popular-dish release contains only complete approved groups and keeps remaining drafts private',()=>{
 const read=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));
 const progress=read('catalog/intake/friend-popular200-progress.json');
 const approved=read('catalog/approved/friend-popular200.json').entries;
 const published=read('catalog/generated/dishes.json');
 assert.equal(progress.items.length,200);
 assert.equal(new Set(progress.items.map(x=>x.id)).size,200);
 assert.equal(approved.length%25,0);
 assert.ok(approved.length>=25&&approved.length<=200);
 assert.deepEqual(approved.map(x=>x.dish.id),progress.items.slice(0,approved.length).map(x=>x.id));
 for(const [index,item] of progress.items.entries()){
  const matches=published.filter(x=>x.id===item.id);
  if(index<approved.length){
   assert.equal(matches.length,1,item.id);
   assert.equal(matches[0].recipeStatus,'complete',item.id);
   assert.equal(item.photoStatus,'reviewed',item.id);
  }else{
   assert.equal(matches.length,0,item.id);
   for(const path of ['public/data/recipes/'+item.id+'.json','dist/recipe/'+item.id+'/index.html'])
    assert.equal(fs.existsSync(new URL('../'+path,import.meta.url)),false,path);
  }
 }
});
