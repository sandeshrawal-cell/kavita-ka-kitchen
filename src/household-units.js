import {quantity} from './core.js';

export const HOUSEHOLD_UNITS_NOTE = 'Household measures are approximate. Use level spoons and a 240 ml cup. Switch to grams for precise weights; ingredients without a reliable conversion keep their original units.';

// Approximate kitchen densities, keyed by ingredient rather than treating all
// powders, grains and chopped foods as having the same weight per spoon/cup.
const gramsPerTeaspoon = new Map([
  ['chilli powder',2.7],['red chilli powder',2.7],['kashmiri chilli powder',2.7],
  ['turmeric',3],['turmeric powder',3],['cumin powder',2.1],
  ['coriander powder',1.8],['garam masala',2],['cinnamon powder',2.6],
  ['black pepper powder',2.3],['salt',6],['fine salt',6],
  ['cumin',2.1],['cumin seeds',2.1],['mustard seeds',3],['baking powder',4],['baking soda',4.6],
]);
const gramsPerCup = new Map([
  ['flour',120],['plain flour',120],['all purpose flour',120],['maida',120],
  ['wheat flour',120],['whole wheat flour',120],['atta',120],
  ['rice',185],['basmati rice',185],['raw rice',185],['white rice',185],
  ['sugar',200],['white sugar',200],['granulated sugar',200],
  ['curd',245],['thick curd',245],['yogurt',245],['plain yogurt',245],
]);
const gramsPerMediumPiece = new Map([
  ['onion',150],['onions',150],['tomato',120],['tomatoes',120],
  ['potato',170],['potatoes',170],['carrot',60],['carrots',60],
  ['capsicum',150],
]);
const fractions = ['', '⅛', '¼', '⅜', '½', '⅝', '¾', '⅞'];

function roundedMeasure(value) {
  // Eighths for small seasoning quantities; quarters for larger measures.
  // Never round a nonzero ingredient down to zero or exaggerate a tiny dose.
  if (value < 0.125) return null;
  const eighths = Math.round(value * (value < 1 ? 8 : 4)) * (value < 1 ? 1 : 2);
  const whole = Math.floor(eighths / 8), fraction = fractions[eighths % 8];
  return `${whole || ''}${whole && fraction ? ' ' : ''}${fraction}`;
}

function approximate(value, unit, original) {
  const measure = roundedMeasure(value);
  return measure ? `≈ ${measure} ${unit}` : quantity(original);
}

export function householdQuantity(ingredient, metric = false) {
  if (metric || !Number.isFinite(ingredient.qty) || ingredient.qty <= 0) return quantity(ingredient);
  const name = String(ingredient.name || '').trim().toLowerCase().replace(/-/g,' ').replace(/\s+/g,' ');
  const unit = String(ingredient.unit || '').toLowerCase();
  if (['ml','l'].includes(unit)) {
    const ml = ingredient.qty * (unit === 'l' ? 1000 : 1);
    if (ml >= 60) return approximate(ml / 240, 'cup', ingredient);
    if (ml >= 15) return approximate(ml / 15, 'tbsp', ingredient);
    return approximate(ml / 5, 'tsp', ingredient);
  }
  if (!['g','kg'].includes(unit)) return quantity(ingredient);
  const grams = ingredient.qty * (unit === 'kg' ? 1000 : 1);
  if (gramsPerTeaspoon.has(name)) {
    const teaspoons = grams / gramsPerTeaspoon.get(name);
    return teaspoons >= 3
      ? approximate(teaspoons / 3, 'tbsp', ingredient)
      : approximate(teaspoons, 'tsp', ingredient);
  }
  if (gramsPerCup.has(name)) {
    const cups = grams / gramsPerCup.get(name);
    return cups < 0.25
      ? approximate(cups * 16, 'tbsp', ingredient)
      : approximate(cups, 'cup', ingredient);
  }
  if (gramsPerMediumPiece.has(name)) return approximate(grams / gramsPerMediumPiece.get(name), 'medium pieces', ingredient);
  return quantity(ingredient);
}
