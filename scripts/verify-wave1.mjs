import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {normalizeName} from './validate-catalog.mjs';
import {recommend} from '../src/core.js';

// Parse quoted commas and escaped quotes in the supplied recipe request.
const csv=await fs.readFile('catalog/wave1-request.csv','utf8');
const rows=[];let row=[],field='',quoted=false;
for(let i=0;i<csv.length;i++){
 const c=csv[i];
 if(c==='"'){if(quoted&&csv[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}
 else if(!quoted&&(c===','||c==='\n')){row.push(field.replace(/\r$/,''));field='';if(c==='\n'){rows.push(row);row=[];}}
 else field+=c;
}
if(field||row.length){row.push(field.replace(/\r$/,''));rows.push(row);}
const requested=rows.slice(1).filter(r=>r[2]);
assert.equal(requested.length,60,'The source request must contain all 60 dishes');
const dishes=JSON.parse(await fs.readFile('catalog/generated/dishes.json','utf8'));
const aliases=JSON.parse(await fs.readFile('public/data/aliases.json','utf8'));
const manifest=JSON.parse(await fs.readFile('public/data/manifest.json','utf8'));
const sitemap=await fs.readFile('dist/sitemap.xml','utf8');
assert.equal(manifest.total,dishes.length);
const verified=[];
for(const [category,,name,otherNames] of requested){
 const matches=dishes.filter(d=>normalizeName(d.name)===normalizeName(name));
 assert.equal(matches.length,1,name+': must exist exactly once');
 const d=matches[0];
 assert.ok(d.categories.includes(category),name+': missing requested category');
 for(const query of [name,...otherNames.split(',').map(s=>s.trim()).filter(Boolean)]){
  assert.equal(recommend(dishes,{category:'Any',query})[0]?.id,d.id,query+': search should rank this dish first');
  if(query!==name)assert.ok(Object.entries(aliases).some(([alias,id])=>id===d.id&&normalizeName(alias)===normalizeName(query)),query+': missing alias');
 }
 const recipe=JSON.parse(await fs.readFile(`public/data/recipes/${d.id}.json`,'utf8'));
 const html=await fs.readFile(`dist/recipe/${d.id}/index.html`,'utf8');
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]||'null');
 assert.equal(schema?.['@type'],'Recipe',d.id);
 assert.equal(schema.recipeYield,'4 servings',d.id);
 assert.equal(schema.recipeIngredient.length,recipe.ingredients.length,d.id);
 assert.deepEqual(schema.recipeInstructions.map(s=>s.text),recipe.steps,d.id);
 assert.ok(html.includes('<h2>Ingredients for 4</h2>')&&html.includes('<h2>Method</h2>'),d.id+': missing server-rendered body');
 assert.ok(sitemap.includes('/recipe/'+d.id+'</loc>'),d.id+': absent from sitemap');
 verified.push({id:d.id,name,category,steps:recipe.steps.length});
}
console.log(JSON.stringify({requested:60,verified:verified.length,catalogueTotal:manifest.total,checks:'Names, aliases, categories, first search result, server-rendered Recipe schema and sitemap',dishes:verified},null,2));
