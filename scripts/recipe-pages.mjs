import fs from 'node:fs/promises';
import {esc} from '../src/core.js';
import {photoCredit} from '../src/photos.js';
const origin='https://kavita-kitchen-v2.vercel.app';
const shell=await fs.readFile('index.html','utf8');
const dishes=JSON.parse(await fs.readFile('catalog/generated/dishes.json','utf8'));
const links=[];
for(const d of dishes.filter(d=>d.recipeStatus==='complete')){
 const r=JSON.parse(await fs.readFile('public/data/recipes/'+d.id+'.json','utf8')),url=origin+'/recipe/'+d.id;
 const description=`${d.name}: a vegetarian, eggless recipe with ingredients, quantities and cooking steps.`;
 const recipe={'@context':'https://schema.org','@type':'Recipe',name:r.name,description,recipeCuisine:d.cuisine,recipeCategory:d.categories[0],recipeYield:String(r.baseServings)+' servings',suitableForDiet:'https://schema.org/VegetarianDiet',recipeIngredient:r.ingredients.map(i=>`${i.qty} ${i.unit} ${i.name}`),recipeInstructions:r.steps.map(text=>({'@type':'HowToStep',text})),url};
 if(d.photo)recipe.image=origin+d.photo.src;
 const content=`<article class="panel public-recipe"><h1>${esc(r.name)}</h1><p>${esc(description)}</p>${d.photo?`<img class="food-photo" src="${d.photo.src}" width="${d.photo.width}" height="${d.photo.height}" alt="${esc(d.photo.alt)}">${photoCredit(d)}`:''}<h2>Ingredients for ${r.baseServings}</h2><ul>${r.ingredients.map(i=>`<li>${esc(i.name)} — ${i.qty} ${esc(i.unit)}</li>`).join('')}</ul><h2>Method</h2><ol>${r.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><p>${esc(r.tips?.join(' ')||'')}</p><a href="/">Open the kitchen planner</a></article>`;
 const html=shell.replace(/<title>[^<]*<\/title>/,`<title>${esc(r.name)} · Kavita ka Kitchen</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${esc(description)}">`).replace('</head>',`<link rel="canonical" href="${url}"><meta property="og:title" content="${esc(r.name)}"><meta property="og:description" content="${esc(description)}">${d.photo?`<meta property="og:image" content="${origin+d.photo.src}">`:''}<script type="application/ld+json">${JSON.stringify(recipe).replace(/</g,'\\u003c')}</script></head>`).replace(/<noscript>[\s\S]*?<\/noscript>/,content);
 await fs.mkdir('dist/recipe/'+d.id,{recursive:true});await fs.writeFile('dist/recipe/'+d.id+'/index.html',html);links.push(url);
}
await fs.writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+[origin,...links].map(loc=>`<url><loc>${loc}</loc></url>`).join('')+'</urlset>');
await fs.writeFile('dist/robots.txt','User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: '+origin+'/sitemap.xml\n');
console.log(links.length+' public recipe pages rendered with structured data.');
