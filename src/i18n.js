// Public, bundled translations only. Account data never leaves the browser.
export const LANGUAGES = {en:'English',gu:'ગુજરાતી',hi:'हिन्दी'};
export const normalizeText = value => String(value ?? '').replace(/\s+/g,' ').trim();
let language='en', dictionaries={}, patterns=[], reverse=[], dateWords={}, changeVersion=0;
const escapeRegex=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
export const getLanguage=()=>language;
export const getLocale=()=>({en:'en-IN',gu:'gu-IN',hi:'hi-IN'}[language]);

export function configureLanguage(next, dictionary={}) {
 if(!Object.hasOwn(LANGUAGES,next))throw Error('Unsupported language');
 language=next;dictionaries=dictionary;
 dateWords={};
 for(let month=0;month<12;month++)for(const style of ['short','long']){const date=new Date(2026,month,15);dateWords[date.toLocaleDateString('en-IN',{month:style})]=date.toLocaleDateString(getLocale(),{month:style});}
 for(let day=0;day<7;day++)for(const style of ['short','long']){const date=new Date(2026,0,4+day);dateWords[date.toLocaleDateString('en-IN',{weekday:style})]=date.toLocaleDateString(getLocale(),{weekday:style});}
 patterns=Object.entries(dictionary).filter(([key])=>/\{\d+\}/.test(key)&&key.replace(/\{\d+\}/g,'').trim().length>1).map(([key,value])=>{
  const indices=[];let source='',last=0;
  for(const match of key.matchAll(/\{(\d+)\}/g)){source+=escapeRegex(key.slice(last,match.index))+'(.+?)';indices.push(match[1]);last=match.index+match[0].length;}
  return {regex:new RegExp('^'+source+escapeRegex(key.slice(last))+'$','u'),value,indices,weight:key.replace(/\{\d+\}/g,'').length};
 }).sort((a,b)=>b.weight-a.weight);
 reverse=Object.entries(dictionary).filter(([key,value])=>key.length<75&&!/[.!?{}:]/.test(key)&&/[\u0900-\u097f\u0a80-\u0aff]/.test(value)).sort((a,b)=>b[1].length-a[1].length);
}

export function translate(value,depth=0){
 const source=normalizeText(value);if(language==='en'||!source)return String(value??'');
 let result=Object.hasOwn(dictionaries,source)?dictionaries[source]:undefined;
 if(result===undefined&&depth<3&&String(value).includes('\n\n'))return String(value).split(/(\n\n+)/).map(part=>part.trim()?translate(part,depth+1):part).join('');
 if(result===undefined&&depth<3){
  for(const pattern of patterns){const match=source.match(pattern.regex);if(!match)continue;const values=Object.fromEntries(pattern.indices.map((key,i)=>[key,translate(match[i+1],depth+1)]));result=pattern.value.replace(/\{(\d+)\}/g,(_,key)=>values[key]??'');break;}
  // Lists and labels frequently contain separately translated dish names.
  if(result===undefined&&/\s[·—–]\s|\n/.test(source))result=source.split(/(\s[·—–]\s|\n)/).map(part=>translate(part,depth+1)).join('');
  if(result===undefined){const decorated=source.match(/^([^\p{L}\p{N}]*)([\s\S]*?[\p{L}\p{N}.!?])([^\p{L}\p{N}]*?)$/u);if(decorated&&(decorated[1]||decorated[3])){const middle=translate(decorated[2],depth+1);if(middle!==decorated[2])result=decorated[1]+middle+decorated[3];}}
  if(result===undefined&&/^(?:[A-Za-z]+,? )?\d{1,2} [A-Za-z]+(?: \d{4})?$/.test(source))result=source.replace(/[A-Za-z]+/g,word=>dateWords[word]||word);
  if(result===undefined&&Object.hasOwn(dateWords,source))result=dateWords[source];
  if(result===undefined&&/^(simmer|saute|sauté|fold|temper|knead):/.test(source))result=source.split(/(?<=\.)\s+/).map(part=>dictionaries[part]||part).join(' ');
 }
 if(result===undefined)return String(value??'');
 const original=String(value);return (original.match(/^\s*/)?.[0]||'')+result+(original.match(/\s*$/)?.[0]||'');
}

const searchWords={
 'બટાકા':'potato','બટાકું':'potato','आलू':'potato','મગફળી':'peanut','मूंगफली':'peanut',
 'ઈંડા વિનાનું':'eggless','ઇંડા વિનાનું':'eggless','अंडे रहित':'eggless','ઈંડા':'eggs','ઇંડા':'eggs','ઈંડું':'egg','અંડું':'egg','अंडा':'egg','अंडे':'eggs','માછલી':'fish','मछली':'fish','માંસ':'meat','मांस':'meat','ચિકન':'chicken','चिकन':'chicken','મટન':'mutton','मटन':'mutton','ઝીંગા':'prawn','झींगा':'prawn',
 'કિલોગ્રામ':'kg','કિલો':'kg','किलोग्राम':'kg','किलो':'kg','ગ્રામ':'g','ग्राम':'g','મિલિલીટર':'ml','मिलीलीटर':'ml','લિટર':'l','लीटर':'l',
 'સવારનો નાસ્તો':'breakfast','सुबह का नाश्ता':'breakfast','બપોરનું ભોજન':'lunch','दोपहर का भोजन':'lunch','રાત્રિભોજન':'dinner','રાતનું ભોજન':'dinner','रात का खाना':'dinner','रात्रि भोजन':'dinner',
 'નાસ્તો':'breakfast','नाश्ता':'breakfast','જૈન':'jain','जैन':'jain','હળવું':'light','હળવો':'light','हल्का':'light','हल्की':'light',
 'પુખ્ત લોકો':'adults','પુખ્ત':'adults','वयस्कों':'adults','वयस्क':'adults','બાળકો':'kids','બાળક':'kids','बच्चों':'kids','बच्चे':'kids',
 'લોકો':'people','લોકો માટે':'people for','લોકો માટેનું':'people for','लोगों':'people','લસણ':'garlic','लहसुन':'garlic','ડુંગળી':'onion','प्याज':'onion','દૂધ':'milk','दूध':'milk',
 'મિનિટમાં':'minutes within','મિનિટ':'minutes','मिनट':'minutes','માટે':'for','के लिए':'for','અને':'and','और':'and','એક':'1','એકને':'1','બે':'2','ત્રણ':'3','ચાર':'4','પાંચ':'5','છ':'6','સાત':'7','આઠ':'8','નવ':'9','દસ':'10','एक':'1','दो':'2','तीन':'3','चार':'4','पाँच':'5','पांच':'5','छह':'6','सात':'7','आठ':'8','नौ':'9','दस':'10',
};
export function toEnglishSearch(value){
 let text=String(value??'').replace(/[०-९૦-૯]/g,c=>String(c.charCodeAt(0)-(c>='૦'?0xAE6:0x966)));
 // Whole-word matching keeps the Gujarati number “two” from splitting “besan”.
 const replacePhrase=(local,english)=>{if(!text.includes(local))return;text=text.replace(new RegExp('(?<![\\p{L}\\p{M}])'+escapeRegex(local)+'(?![\\p{L}\\p{M}])','gu'),' '+english+' ');};
 text=text.replace(/के\s+बिना|વગર/gu,' WITHOUT_AFTER ').replace(/बिना|વિના/gu,' without ');
 for(const [local,english] of Object.entries(searchWords).sort((a,b)=>b[0].length-a[0].length))replacePhrase(local,english);
 for(const [english,local] of reverse)replacePhrase(local,english);
 text=text.replace(/\s+/g,' ').trim();
 const names=[...new Set(['onion','garlic','milk','nuts','peanuts','potato',...reverse.map(([key])=>key).filter(key=>/^[a-z]+(?: [a-z]+){0,3}$/i.test(key))])].filter(name=>text.toLowerCase().includes(name.toLowerCase())).sort((a,b)=>b.length-a.length).map(escapeRegex).join('|');
 text=text.replace(new RegExp('\\b((?:'+names+')(?:\\s*(?:,|and)\\s*(?:'+names+'))*)\\s+WITHOUT_AFTER','gi'),'without $1');
 text=text.replace(/\b(\d+)\s+kids\s+for\b/g,'$1 kids').replace(/\b(\d+)\s+(adults|people)\s+for\b/g,'for $1 $2').replace(/\b(\d+)\s+minutes\s+(?:within|में|ની અંદર)/gi,'within $1 minutes');
 return text.replace(/\s+/g,' ').trim();
}

export function cookingCommand(text){
 const words=String(text).toLowerCase().replace(/[०-९૦-૯]/g,c=>String(c.charCodeAt(0)-(c>='૦'?0xAE6:0x966)));
 if(/\bnext\b|આગળ|अगला|अगली|आगे/.test(words))return {action:'step-next'};
 if(/\bprevious\b|\bback\b|પાછળ|પાછું|पिछला|पिछली|पीछे/.test(words))return {action:'step-prev'};
 if(/\brepeat\b|ફરી|દોહરાવો|दोहराओ|दोहराएँ|फिर/.test(words))return {action:'step-repeat'};
 const match=words.match(/(?:timer|ટાઇમર|ટાઈમર|टाइमर)\s*(\d+)\s*(?:min|મિનિટ|मिनट)/);return match&&+match[1]>0&&+match[1]<=240?{minutes:+match[1]}:null;
}

export function languageControl(){return `<label class="language-control"><span>Language</span><select data-language aria-label="Language">${Object.entries(LANGUAGES).map(([key,label])=>`<option value="${key}" lang="${key}" translate="no" ${key===language?'selected':''}>${label}</option>`).join('')}</select></label>`;}

export async function initializeLanguages(){
 const textSources=new WeakMap(),attributeSources=new WeakMap(),loaded={en:{}},root=document.body;
 let observer,queued=false;
 const ignored=node=>node.parentElement?.closest('script,style,code,pre,textarea,[translate="no"],[data-no-translate],[data-user-content]');
 function textNode(node){
  if(ignored(node)||!node.nodeValue?.trim())return;
  let saved=textSources.get(node);if(!saved||node.nodeValue!==saved.last)saved={source:node.nodeValue};
  node.nodeValue=translate(saved.source);saved.last=node.nodeValue;textSources.set(node,saved);
 }
 function apply(){
  queued=false;observer?.disconnect();
  // A translated option label must never change a form's stored value.
  for(const option of root.querySelectorAll('option:not([value])'))option.setAttribute('value',option.textContent);
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);while(walker.nextNode())textNode(walker.currentNode);
  for(const element of root.querySelectorAll('[aria-label],[placeholder],[title],[alt]')){
   if(element.closest('[translate="no"],[data-no-translate],[data-user-content]'))continue;
   const saved=attributeSources.get(element)||{};
   for(const attr of ['aria-label','placeholder','title','alt'])if(element.hasAttribute(attr)){
    const current=element.getAttribute(attr);if(!saved[attr]||saved[attr].last!==current)saved[attr]={source:current};
    const translated=translate(saved[attr].source);element.setAttribute(attr,translated);saved[attr].last=translated;
   }attributeSources.set(element,saved);
  }
  for(const select of root.querySelectorAll('[data-language]'))select.value=language;
  document.documentElement.lang=language;
  observer?.observe(root,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','title','alt']});
 }
 async function setLanguage(next){
  if(!Object.hasOwn(LANGUAGES,next))return;const version=++changeVersion;
  root.setAttribute('aria-busy','true');
  try{
   if(!loaded[next]){
    const parts=await Promise.all(['ui','recipes'].map(async part=>{const response=await fetch(`/data/locales/${next}-${part}.json`,{signal:AbortSignal.timeout(15000)});if(!response.ok)throw Error('Language download failed');return response.json();}));
    loaded[next]=Object.assign({},...parts);
   }
   if(version!==changeVersion)return;configureLanguage(next,loaded[next]);
   try{localStorage.setItem('kkk-language',next);}catch{}
   apply();document.dispatchEvent(new CustomEvent('languagechange',{detail:{language:next}}));
  }catch{
   if(version!==changeVersion)return;apply();
   const toast=document.querySelector('#toast');if(toast){toast.textContent=language==='gu'?'ભાષા ડાઉનલોડ થઈ શકી નથી. ઇન્ટરનેટ જોડીને ફરી પ્રયાસ કરો.':language==='hi'?'भाषा डाउनलोड नहीं हो सकी। इंटरनेट जोड़कर फिर कोशिश करें।':'The language could not be downloaded. Connect to the internet and try again.';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),5000);}
  }finally{if(version===changeVersion)root.removeAttribute('aria-busy');}
 }
 document.querySelector('.topbar-actions')?.insertAdjacentHTML('afterbegin',languageControl());
 observer=new MutationObserver(()=>{if(!queued){queued=true;queueMicrotask(apply);}});
 document.addEventListener('change',event=>{if(event.target.matches('[data-language]'))void setLanguage(event.target.value);});
 let saved='en';try{saved=localStorage.getItem('kkk-language')||'en';}catch{}
 apply();await setLanguage(saved);
 return {setLanguage,apply};
}
