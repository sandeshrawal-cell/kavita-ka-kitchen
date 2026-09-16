import {publicCache} from './storage.js';
import {slug} from './core.js';
export const dishes=new Map(),recipes=new Map();
const categories=new Map();
export async function cachedJSON(url){
 try{const r=await fetch(url,{signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error('Unavailable');const data=await r.json();publicCache.set(url,data).catch(()=>{});return data;}
 catch{const cached=await publicCache.get(url);if(cached)return cached;throw new Error('This content is not saved offline yet. Connect once to load it.');}
}
export async function loadCategory(category){
 if(categories.has(category))return categories.get(category);
 let all=[];
 try{let offset=0;do{const data=await cachedJSON('/api/catalog?'+new URLSearchParams({category,offset,limit:100}));all.push(...data.items);offset=data.next;}while(offset!==null&&all.length<1000);}
 catch{all=await cachedJSON('/data/categories/'+slug(category)+'.json');}
 all.forEach(d=>dishes.set(d.id,d));categories.set(category,all);return all;
}
export async function loadCategories(names){await Promise.all([...new Set(names)].map(loadCategory));return [...dishes.values()];}
export async function getRecipe(id){if(recipes.has(id))return recipes.get(id);if(!/^[a-z0-9-]+$/.test(id))throw new Error('Recipe not available.');const r=await cachedJSON('/data/recipes/'+id+'.json');recipes.set(id,r);return r;}
