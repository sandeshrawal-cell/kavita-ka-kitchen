export async function createClient(url,key,options){
 if(!window.supabase){await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='/assets/supabase.js';script.onload=resolve;script.onerror=()=>reject(new Error('Account library unavailable offline. Connect once, then retry.'));document.head.append(script);});}
 return window.supabase.createClient(url,key,options);
}
