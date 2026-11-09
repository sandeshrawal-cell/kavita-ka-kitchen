// Keep network outages distinct from rejected credentials. Never imply a reset
// email was sent when the authentication service could not be reached.
export function authErrorMessage(error,locale='en'){
 const message=String(error?.message||error||'');
 const unavailable=error?.name==='AuthRetryableFetchError'||error?.name==='TimeoutError'||error?.status>=500||/failed to fetch|fetch failed|networkerror|network request failed|load failed|timed? ?out|account library unavailable/i.test(message);
 if(!unavailable)return message;
 return ({
  en:'We could not reach the account service. Check your connection and try again in a moment. You can keep exploring recipes as a guest.',
  hi:'खाता सेवा से संपर्क नहीं हो सका। अपना इंटरनेट कनेक्शन जाँचें और थोड़ी देर में फिर कोशिश करें। आप अतिथि के रूप में रेसिपी देख सकते हैं।',
  gu:'ખાતાની સેવા સાથે સંપર્ક થઈ શક્યો નથી. તમારું ઇન્ટરનેટ જોડાણ તપાસો અને થોડી વારમાં ફરી પ્રયાસ કરો. તમે મહેમાન તરીકે વાનગીઓ જોઈ શકો છો.'
 })[locale.split('-')[0]]||authErrorMessage(error,'en');
}

export async function createClient(url,key,options){
 if(!window.supabase){await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='/assets/supabase.js';script.onload=resolve;script.onerror=()=>reject(new Error('Account library unavailable offline. Connect once, then retry.'));document.head.append(script);});}
 return window.supabase.createClient(url,key,options);
}
