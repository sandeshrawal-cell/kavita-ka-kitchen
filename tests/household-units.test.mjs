import test from 'node:test';
import assert from 'node:assert/strict';
import {householdQuantity} from '../src/household-units.js';

const measure = (name,qty,unit='g',metric=false) => householdQuantity({name,qty,unit},metric);

test('spice measures use ingredient density, not a universal grams-to-spoons conversion',()=>{
  assert.equal(measure('chilli powder',1.35),'≈ ½ tsp');
  assert.equal(measure('Kashmiri chilli powder',4.5),'≈ 1 ¾ tsp');
  assert.equal(measure('salt',3),'≈ ½ tsp');
  assert.equal(measure('coriander powder',3.6),'≈ 2 tsp');
  assert.equal(measure('chilli powder',0.1),'0.1 g');
});

test('common staples, liquids and whole vegetables use household measures',()=>{
  assert.equal(measure('wheat flour',60),'≈ ½ cup');
  assert.equal(measure('basmati rice',185),'≈ 1 cup');
  assert.equal(measure('sugar',25),'≈ 2 tbsp');
  assert.equal(measure('oil',5,'ml'),'≈ 1 tsp');
  assert.equal(measure('milk',120,'ml'),'≈ ½ cup');
  assert.equal(measure('milk',0.24,'l'),'≈ 1 cup');
  assert.equal(measure('onions',300),'≈ 2 medium pieces');
});

test('unknown densities and existing household units retain the source quantity',()=>{
  assert.equal(measure('paneer',125),'125 g');
  assert.equal(measure('cooked rice',185),'185 g');
  assert.equal(measure('rice flour',60),'60 g');
  assert.equal(measure('coarse salt',3),'3 g');
  assert.equal(measure('milk powder',25),'25 g');
  assert.equal(measure('eggs',2,'pieces'),'2 pieces');
  assert.equal(measure('salt',0),'0 g');
});

test('metric preference preserves original precise scaled weights and quantities',()=>{
  assert.equal(measure('chilli powder',4.5,'g',true),'4.5 g');
  assert.equal(measure('wheat flour',1500,'g',true),'1.5 kg');
  assert.equal(measure('milk',1200,'ml',true),'1.2 l');
  assert.equal(measure('rice',0.185,'kg'),'≈ 1 cup');
});
