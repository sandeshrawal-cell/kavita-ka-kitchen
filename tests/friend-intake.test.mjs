import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {normalizeName} from '../scripts/validate-catalog.mjs';

const intake=JSON.parse(await fs.readFile(new URL('../catalog/intake/friend-dishes.json',import.meta.url)));
const published=JSON.parse(await fs.readFile(new URL('../catalog/generated/dishes.json',import.meta.url)));
const publicAliases=JSON.parse(await fs.readFile(new URL('../public/data/aliases.json',import.meta.url)));

test('friend list is partitioned into reviewable batches of at most 500',()=>{
 assert.equal(intake.published,false);
 assert.equal(intake.batchSize,500);
 assert.equal(intake.counts.sourceRows,intake.candidates.length+intake.excluded.length);
 assert.equal(intake.counts.candidates,intake.candidates.length);
 assert.equal(intake.counts.appOrAliasOmitted+intake.counts.duplicateOmitted,intake.excluded.length);
 const ids=new Set();
 for(const batch of intake.batches){
  assert.ok(batch.count>0&&batch.count<=500);
  assert.equal(batch.sourceReviewIds.length,batch.count);
  for(const id of batch.sourceReviewIds){assert.ok(!ids.has(id),`repeated review ID ${id}`);ids.add(id);}
 }
 assert.equal(ids.size,intake.candidates.length);
 for(const candidate of intake.candidates)assert.ok(ids.has(candidate.sourceReviewId));
});

test('pending dishes have unique names and aliases outside the published catalogue',()=>{
 const names=new Map();
 const publishedNames=new Map();
 for(const dish of published)for(const name of [dish.name,...(dish.aliases||[])])publishedNames.set(normalizeName(name),dish.id);
 for(const [alias,id] of Object.entries(publicAliases))publishedNames.set(normalizeName(alias.replaceAll('-',' ')),id);
 const ids=new Set(published.map(dish=>dish.id));
 for(const dish of intake.candidates){
  if(dish.contentStatus!=='recipe-photo-translation-review-required')continue;
  assert.ok(!ids.has(dish.id),`already published ID: ${dish.id}`);
  ids.add(dish.id);
  for(const name of [dish.name,...dish.sourceAliases]){
   const key=normalizeName(name);
   assert.ok(key,`empty name: ${dish.sourceReviewId}`);
   assert.ok(!publishedNames.has(key),`already published name or alias: ${name}`);
   assert.ok(!names.has(key)||names.get(key)===dish.id,`duplicate source name or alias: ${name}`);
   names.set(key,dish.id);
  }
 }
});

test('unpublished intake drafts keep photos and translations outside the public catalogue',async()=>{
 for(const candidate of intake.candidates.filter(dish=>dish.photoDraft&&dish.contentStatus==='recipe-photo-translation-review-required')){
  const draft=JSON.parse(await fs.readFile(new URL('../catalog/intake/'+candidate.id+'-draft.json',import.meta.url)));
  assert.equal(draft.id,candidate.id);
  assert.equal(draft.photoDraft,candidate.photoDraft);
  assert.ok(draft.ingredients.length>=5&&draft.steps.length>=4);
  assert.ok(draft.ingredients.every(item=>item.name&&item.qty>0&&['g','ml'].includes(item.unit)));
  assert.ok(draft.steps.every(step=>step.length>=25));
  for(const lang of ['hi','gu']){
   assert.ok(draft.translations[lang].name);
   assert.equal(draft.translations[lang].ingredients.length,draft.ingredients.length);
   assert.equal(draft.translations[lang].steps.length,draft.steps.length);
   assert.equal(draft.translations[lang].tips.length,draft.tips.length);
   assert.ok(draft.translations[lang].ingredients.every(text=>text.trim()));
   assert.ok(draft.translations[lang].steps.every(text=>text.trim().length>=25));
  }
  await fs.access(new URL('../'+draft.photoDraft,import.meta.url));
  assert.ok(!published.some(dish=>dish.id===draft.id));
 }
});

test('the first 100 intake dishes are published once with complete recipes and photos',async()=>{
 const first=intake.candidates.slice(0,100);
 assert.equal(first.length,100);
 assert.ok(first.every(candidate=>candidate.contentStatus==='published-first-100-intake-batch'));
 for(const candidate of first){
  const matches=published.filter(dish=>dish.id===candidate.id);
  assert.equal(matches.length,1,`missing or duplicate published dish: ${candidate.id}`);
  assert.equal(matches[0].recipeStatus,'complete');
  assert.equal(matches[0].photo?.status,'reviewed');
  const recipe=JSON.parse(await fs.readFile(new URL(`../public/data/recipes/${candidate.id}.json`,import.meta.url)));
  assert.ok(recipe.steps.length>=4);
  assert.ok(recipe.ingredients.every(item=>item.qty>0));
  for(const size of [600,1200])await fs.access(new URL(`../public/photos/${candidate.id}-${size}.webp`,import.meta.url));
 }
});
