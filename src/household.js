import {headcount} from './core.js';
const key = owner => 'kkk-household-v1:'+(owner||'guest');
export function readHousehold(storage,owner,defaults){
 let saved={};try{saved=JSON.parse(storage.getItem(key(owner))||'{}');}catch{}
 const party={...defaults,...saved?.party};
 // Older searches could leave people in fields that a mode does not show.
 // Move them into a visible count without changing the planned total.
 if(party.mode!=='home'&&Number(party.kids)>0){
  const children=Number(party.kids);party.kids=0;
  if(party.mode==='office')party.guests=(Number(party.guests)||0)+children;
  else party.adults=(Number(party.adults)||0)+children;
 }
 if(['factory','event'].includes(party.mode)&&Number(party.guests)>0){
  party.adults=(Number(party.adults)||0)+Number(party.guests);party.guests=0;
 }
 if(party.mode==='factory'&&(!Array.isArray(party.shifts)||party.shifts.reduce((a,b)=>a+Number(b||0),0)!==Number(party.adults)))party.shifts=[Number(party.adults)||0,0,0];
 try{headcount(party);}catch{Object.assign(party,defaults);}
 return {party,confirmed:saved?.confirmed===true,introDone:saved?.introDone===true,jain:saved?.jain===true,jainRules:saved?.jainRules?.confirmed===true?saved.jainRules:null,exclusions:Array.isArray(saved?.exclusions)?saved.exclusions.filter(x=>typeof x==='string').slice(0,100):[],metric:saved?.metric===true};
}
export function writeHousehold(storage,owner,value){try{storage.setItem(key(owner),JSON.stringify(value));return true;}catch{return false;}}
