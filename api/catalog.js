import fs from 'node:fs/promises';
let catalogue,index;
export default async function handler(req,res){
 if(req.method!=='GET')return res.status(405).json({error:'GET required.'});
 const category=String(req.query.category||'Dinner').slice(0,80),offset=Math.max(0,Math.min(50000,Number(req.query.offset)||0)),limit=Math.max(1,Math.min(100,Number(req.query.limit)||100));
 res.setHeader('Cache-Control','public, s-maxage=300, stale-while-revalidate=600');
 try{
  catalogue||=JSON.parse(await fs.readFile(new URL('../catalog/generated/dishes.json',import.meta.url),'utf8'));
  index||=new Map(catalogue.map(d=>[d.id,d]));
  if(process.env.CATALOG_SOURCE==='supabase'){
   const query=new URLSearchParams({select:'metadata',published:'eq.true',order:'id',offset:String(offset),limit:String(limit)});
   if(category!=='Any'&&category!=='Jain')query.set('categories','cs.{'+category+'}');
   const r=await fetch(process.env.SUPABASE_URL+'/rest/v1/kkk_dishes?'+query,{headers:{apikey:process.env.SUPABASE_PUBLISHABLE_KEY||process.env.SUPABASE_ANON_KEY},signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error();const rows=await r.json();return res.json({items:rows.map(x=>{const local=index.get(x.metadata?.id);return local?{...x.metadata,searchNames:local.searchNames,searchIngredients:local.searchIngredients}:x.metadata;}),next:rows.length===limit?offset+limit:null});
  }
  const rows=category==='Any'||category==='Jain'?catalogue:catalogue.filter(d=>d.categories.includes(category));return res.json({items:rows.slice(offset,offset+limit),next:offset+limit<rows.length?offset+limit:null});
 }catch{return res.status(503).json({error:'Catalogue temporarily unavailable.'});}
}
