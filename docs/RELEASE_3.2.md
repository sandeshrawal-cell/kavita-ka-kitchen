# Version 3.2

This release completes the measured methods for all 356 built-in dishes, corrects meal categories, adds the approved image collection, and introduces English, Gujarati and Hindi throughout the public app and recipe library.

- The language menu is available in the header and dialogs. The selected language persists on the device. Built-in names, ingredients, steps, tips, controls, instructions and accessibility labels use bundled translations. Private free-form account content is not sent to a translation service.
- Gujarati and Hindi use locally served Noto fonts with readable weights. Search understands translated dish names, meal categories, Indic digits and common ingredient exclusions. Cooking commands and spoken instructions use the selected language; actual speech support depends on the browser and installed voices.
- All 356 recipes have numeric ingredient quantities and multiple detailed steps. Soaking, fermentation, resting and chilling are distinguished from active preparation. Original preparation quantities remain explicit when serving sizes change; adjusted ingredient quantities are shown alongside them.
- Breakfast excludes the identified lunch/dinner, drink, dessert and snack-only mismatches. Quick-meal selection excludes recipes requiring additional advance preparation. Strict ingredient checks remain conservative for prepared sauces, breads and other composite ingredients.
- 250 dish images passed the current review. Generated serving illustrations are identified as such; internet photographs retain source and licence information. The remaining 106 image replacements are saved in `catalog/pending-images.json` for a later owner-requested image session.
- The service worker now registers correctly, caches visited dish images and does not let a recipe page overwrite the offline home page. Content-only releases also invalidate the old public cache.
- Legacy recipe aliases serve the completed canonical recipe. Public recipe pages and structured data cover all 356 dishes.

Cloud AI remains disabled at the owner's request. Existing accounts, private kitchen records, database project and production domain are preserved. These are content-complete recipes, not a claim of professional kitchen testing. The larger catalogue targets and other historical master-brief items are not represented as finished by this release.
