import {headcount} from './core.js';
const key = owner => 'kkk-household-v1:'+(owner||'guest');
export function readHousehold(storage,owner,defaults){
 let saved={};try{saved=JSON.parse(storage.getItem(key(owner))||'{}');}catch{}
 const party={...defaults,...saved?.party};try{headcount(party);}catch{Object.assign(party,defaults);}
 return {party,confirmed:saved?.confirmed===true,introDone:saved?.introDone===true,jain:saved?.jain===true,exclusions:Array.isArray(saved?.exclusions)?saved.exclusions.filter(x=>typeof x==='string').slice(0,100):[],metric:saved?.metric===true};
}
export function writeHousehold(storage,owner,value){try{storage.setItem(key(owner),JSON.stringify(value));return true;}catch{return false;}}
