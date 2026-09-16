import {browserSafeKey} from './config.js';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'POST required.'});}
 if(!process.env.APP_ORIGIN||req.headers.origin!==process.env.APP_ORIGIN)return res.status(403).json({error:'Request origin is not allowed.'});
 if(!String(req.headers['content-type']||'').startsWith('application/json')||req.body?.confirmation!=='DELETE')return res.status(400).json({error:'Type DELETE to confirm.'});
 const authorization=req.headers.authorization||'';if(!/^Bearer [A-Za-z0-9_.-]+$/.test(authorization))return res.status(401).json({error:'Sign in again to delete your account.'});
 if(process.env.ACCOUNT_DELETION_BACKEND==='supabase'){
  const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_PUBLISHABLE_KEY||process.env.SUPABASE_ANON_KEY;
  if(!url||!browserSafeKey(key))return res.status(503).json({error:'Account deletion is temporarily unavailable.'});
  try{
   const result=await fetch(url+'/functions/v1/delete-account',{method:'POST',headers:{apikey:key,Authorization:authorization,Origin:process.env.APP_ORIGIN,'Content-Type':'application/json'},body:JSON.stringify({confirmation:'DELETE'}),signal:AbortSignal.timeout(45000)});
   const data=await result.json();
   if(result.ok&&data.deleted===true)return res.json({deleted:true});
   return res.status(result.ok?502:result.status).json({error:typeof data.error==='string'?data.error:'Deletion could not be completed. Sign in to check your account before retrying.'});
  }catch{return res.status(503).json({error:'Deletion service unavailable. Sign in to check your account before retrying.'});}
 }
 const url=process.env.SUPABASE_URL,publicKey=process.env.SUPABASE_PUBLISHABLE_KEY||process.env.SUPABASE_ANON_KEY,secret=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!browserSafeKey(publicKey)||!secret)return res.status(503).json({error:'Account deletion requires the existing project’s server configuration.'});
 try{
  const check=await fetch(url+'/auth/v1/user',{headers:{apikey:publicKey,Authorization:authorization},signal:AbortSignal.timeout(10000)});
  if(!check.ok)return res.status(401).json({error:'Sign in again to delete your account.'});
  const user=await check.json();
  if(!user.id||!user.last_sign_in_at||Date.now()-Date.parse(user.last_sign_in_at)>10*60*1000)return res.status(401).json({error:'Confirm your password by signing in again, then retry within 10 minutes.'});
  const deletion=await fetch(url+'/auth/v1/admin/users/'+encodeURIComponent(user.id),{method:'DELETE',headers:{apikey:secret,Authorization:'Bearer '+secret,'Content-Type':'application/json'},body:JSON.stringify({should_soft_delete:false}),signal:AbortSignal.timeout(15000)});
  if(!deletion.ok)return res.status(502).json({error:'Deletion could not be completed. Your account may own uploaded storage objects; contact the operator.'});
  return res.json({deleted:true});
 }catch{return res.status(503).json({error:'Deletion service unavailable. Sign in to check your account before retrying.'});}
}
