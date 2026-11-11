import test from 'node:test';
import assert from 'node:assert/strict';
import {createHeroPreview,welcomeHero} from '../src/welcome-hero.js';

const dish=(id,name,ingredients)=>({id,name,ingredients,categories:['Dinner'],photo:{src:`/photos/${id}-1200.webp`,small:`/photos/${id}-600.webp`,alt:name,status:'reviewed'}});

test('a guest sees a real rotating recipe idea, never the fixed paneer example',()=>{
 const idea=dish('pumpkin-soup','Pumpkin Soup',['pumpkin','cream','salt']);
 const preview=createHeroPreview(null,new Map(),idea);
 assert.equal(preview.name,'Pumpkin Soup');
 assert.deepEqual(preview.ingredients,['pumpkin','cream']);
 const html=welcomeHero({dish:idea,preview});
 assert.match(html,/Pumpkin Soup/);
 assert.match(html,/Dinner idea/);
 assert.doesNotMatch(html,/Paneer \+ jeera rice|MONDAY · DINNER/);
 assert.equal(preview.dishId,'pumpkin-soup');
 assert.equal((html.match(/href="\/recipe\/pumpkin-soup"/g)||[]).length,2,'both featured photograph and meal idea open the displayed dish');
 assert.match(html,/data-action="recipe" data-id="pumpkin-soup"/);
});

test('a saved meal shows its own name, day, photograph and ingredients',()=>{
 const paneer=dish('palak-paneer','Palak Paneer',['spinach','paneer','salt']);
 const rice=dish('jeera-rice','Jeera Rice',['rice','cumin','water']);
 const catalogue=new Map([[paneer.id,paneer],[rice.id,rice]]);
 const preview=createHeroPreview({date:'2026-09-29',meal:'Dinner',name:'Palak Paneer + Jeera Rice',dishIds:[paneer.id,rice.id]},catalogue,null);
 assert.equal(preview.badge,'My plan');
 assert.equal(preview.when,'Tuesday · Dinner');
 assert.equal(preview.photo,'/photos/palak-paneer-600.webp');
 assert.deepEqual(preview.ingredients,['spinach','paneer','rice']);
 assert.match(welcomeHero({preview}),/Palak Paneer \+ Jeera Rice/);
 assert.match(welcomeHero({preview}),/href="\/recipe\/palak-paneer"/);
 assert.match(welcomeHero({preview}),/href="\/recipe\/jeera-rice"/);
 assert.equal(preview.recipeName,'Palak Paneer');
});

test('a different hero and preview keep their own recipe destinations',()=>{
 const hero=dish('dhuska','Dhuska',['rice']),idea=dish('tomato-soup','Tomato Soup',['tomato']);
 const html=welcomeHero({dish:hero,preview:createHeroPreview(null,new Map(),idea)});
 assert.match(html,/class="welcome-hero-food" href="\/recipe\/dhuska"/);
 assert.match(html,/class="welcome-hero-preview-meal" href="\/recipe\/tomato-soup"/);
 assert.doesNotMatch(html,/\/recipe\/undefined/);
 assert.match(welcomeHero(),/href="\/recipe\/achari-paneer"/);
});
