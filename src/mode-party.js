import {headcount,MODES} from './core.js';

const count=(value,label)=>{const n=Number(value??0);if(!Number.isInteger(n)||n<0||n>100000)throw Error(`${label} must be a whole number from 0 to 100,000.`);return n;};

export function partyForMode(mode,values={},previous={}){
 if(!MODES[mode])throw Error('Choose a kitchen mode.');
 const next={...previous,mode,kids:0,guests:0,jainMeals:0,buffer:0,shifts:null};
 if(mode==='home'){next.adults=count(values.adults,'Adults');next.kids=count(values.kids,'Children');next.guests=count(values.guests,'Guests');}
 if(mode==='office'){next.adults=count(values.team,'Team members');next.guests=count(values.visitors,'Visitors');}
 if(mode==='factory'){next.shifts=[count(values.shift1,'Shift 1'),count(values.shift2,'Shift 2'),count(values.shift3,'Shift 3')];next.adults=next.shifts.reduce((a,b)=>a+b,0);}
 if(mode==='event'){next.adults=count(values.attendees,'Guests expected');next.eventType=values.eventType||previous.eventType||'Wedding';next.service=values.service||previous.service||'Buffet';next.meal=values.meal||previous.meal||'Dinner';}
 next.jainMeals=mode==='home'?0:count(values.jainMeals,'Jain meals');
 next.buffer=mode==='home'?0:Number(values.buffer??0);
 next.budget=Number(values.budget??previous.budget??100);
 if(!Number.isFinite(next.budget)||next.budget<0||next.budget>100000)throw Error('Enter a valid budget per person.');
 headcount(next);return next;
}
