import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {configureLanguage,translate,toEnglishSearch,getLocale,languageControl} from '../src/i18n.js';
import {parseSearch} from '../src/core.js';

test('language changes preserve English originals, numbers and recipe parameters',()=>{
 configureLanguage('hi',{'Poha':'पोहा','Cook for 5–8 minutes.':'5–8 मिनट पकाएँ।','{0} servings':'{0} लोगों के लिए','Add {0} to your menu':'अपने मेनू में {0} जोड़ें'});
 assert.equal(translate(' Cook for 5–8 minutes. '),' 5–8 मिनट पकाएँ। ');
 assert.equal(translate('4 servings'),'4 लोगों के लिए');
 assert.equal(translate('Add Poha to your menu'),'अपने मेनू में पोहा जोड़ें');
 assert.equal(translate('My private note'),'My private note');
 assert.equal(getLocale(),'hi-IN');
 assert.match(languageControl(),/value="hi" lang="hi" translate="no" selected/);
 configureLanguage('en');assert.equal(translate('Poha'),'Poha');
});

for(const lang of ['hi','gu'])test(`${lang}: full dictionaries retain meal, time and exclusion search rules`,async()=>{
 const read=async part=>JSON.parse(await fs.readFile(new URL(`../public/data/locales/${lang}-${part}.json`,import.meta.url),'utf8'));
 configureLanguage(lang,{...await read('ui'),...await read('recipes')});
 assert.equal(parseSearch(toEnglishSearch('३० मिनट में')).time,30);
 const dinner=parseSearch(toEnglishSearch('ચાર લોકો માટે રાતનું ભોજન'));
 assert.equal(dinner.category,'Dinner');assert.equal(dinner.adults,4);
 assert.deepEqual(parseSearch(toEnglishSearch('બટાકા વગર')).exclusions,['potato']);
 assert.deepEqual(parseSearch(toEnglishSearch('बिना मूंगफली')).exclusions,['peanut']);
 assert.ok(!translate('◷ ~20 min + resting').includes('resting'));
 assert.ok(!translate('14 Sept – 20 Sept 2026').includes('Sept'));
 configureLanguage('en');assert.equal(translate('14 Sept – 20 Sept 2026'),'14 Sept – 20 Sept 2026');
});
test('Gujarati and Hindi meal searches preserve counts and hard exclusions',()=>{
 configureLanguage('gu',{'Poha':'પૌંઆ','Besan Chilla':'બેસન ચીલા','onion':'ડુંગળી'});
 assert.equal(toEnglishSearch('પૌંઆ'),'Poha');
 assert.equal(toEnglishSearch('બેસન ચીલા'),'Besan Chilla');
 let result=parseSearch(toEnglishSearch('૪ પુખ્ત માટે હળવો નાસ્તો'));
 assert.equal(result.category,'Breakfast');assert.equal(result.adults,4);
 result=parseSearch(toEnglishSearch('ડુંગળી વગર'));
 assert.deepEqual(result.exclusions,['onion']);
 result=parseSearch(toEnglishSearch('નાસ્તો ડુંગળી વગર'));
 assert.deepEqual(result.exclusions,['onion']);assert.equal(result.category,'Breakfast');
 result=parseSearch(toEnglishSearch('बिना लहसुन'));
 assert.deepEqual(result.exclusions,['garlic']);
 result=parseSearch(toEnglishSearch('४ वयस्क के लिए रात का खाना'));
 assert.equal(result.category,'Dinner');assert.equal(result.adults,4);
 result=parseSearch(toEnglishSearch('२० मिनट में'));
 assert.equal(result.time,20);
 configureLanguage('en');
});
