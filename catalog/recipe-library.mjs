import {drinkRecipes} from './recipes-drinks.mjs';
import {mainRecipes} from './recipes-mains.mjs';
import {breakfastRecipes} from './recipes-breakfast.mjs';
import {freshRecipes} from './recipes-fresh.mjs';
import {soupRecipes} from './recipes-soups.mjs';
import {steamRecipes} from './recipes-steam.mjs';
import {dessertRecipes} from './recipes-desserts.mjs';
import {globalRecipes} from './recipes-global.mjs';
import {bakeRecipes} from './recipes-bakes.mjs';
import {curryRecipes} from './recipes-curries.mjs';
import {regionalRecipes} from './recipes-regional.mjs';
import {riceRecipes} from './recipes-rice.mjs';
import {snackRecipes} from './recipes-snacks.mjs';
import {friedRecipes} from './recipes-fried.mjs';
import {finalRecipes} from './recipes-final.mjs';
export const recipeLibrary=Object.assign({},drinkRecipes,mainRecipes,breakfastRecipes,freshRecipes,soupRecipes,steamRecipes,dessertRecipes,globalRecipes,bakeRecipes,curryRecipes,regionalRecipes,riceRecipes,snackRecipes,friedRecipes,finalRecipes);
// Prepared blends and bought components have brand-dependent ingredient lists.
export const hasUnspecifiedComponents=names=>names.some(n=>/masala|curry powder|curry paste|bread|pav\b|chutney|sauce|ketchup|farsan|\bsev\b|papdi|puri shells|biscuits?|ice cream|gnocchi|wrappers?|tortillas?|chaap|cooked mixed vegetable|brownie|sponge cake|syrup|papad/.test(n));
