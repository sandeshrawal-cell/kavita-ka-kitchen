import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
const actionSource=source.slice(source.indexOf('async function action(name,el){'),source.indexOf('\nfunction slotPicker()'));
test('guest pagination shows more dishes without navigating to the More page',async()=>{
 const ctx={navs:{more:'More'},state:()=>({}),visible:12,scrollY:240,renderCalls:0,navigation:null,window:{scrollTo:(x,y)=>{ctx.scroll=[x,y];}},render:()=>ctx.renderCalls++,nav:name=>{ctx.navigation=name;}};
 const action=vm.runInNewContext(actionSource+'\naction',ctx);
 const moreButton=source.match(/<div class="load-more"><button[^>]+data-action="([^"]+)"/);
 assert.ok(moreButton);
 await action(moreButton[1],{dataset:{}});
 assert.equal(ctx.visible,24);assert.equal(ctx.renderCalls,1);assert.equal(ctx.navigation,null);assert.deepEqual(ctx.scroll,[0,240]);
 await action(moreButton[1],{dataset:{}});
 assert.equal(ctx.visible,36);assert.equal(ctx.navigation,null);
 await action('more',{dataset:{}});
 assert.equal(ctx.navigation,'more');assert.equal(ctx.visible,36);
});
