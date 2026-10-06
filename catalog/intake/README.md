# Friend dish list intake

`friend-dishes.json` is the deduplicated intake from
`Kavita_ka_Kitchen_dishes_with_batch1.xlsx`. The 3,775 candidates are ordered
in seven batches of 500 and a final batch of 275. The first 400 have been
published through the four `catalog/approved/friend-*100.json` releases; the remaining 3,375
remain private. Each candidate retains its spreadsheet row, aliases, cuisine,
description, and batch number. The 64 names already represented by the
original 416-dish catalogue and 30 repeated preparations remain in `excluded`
with their reasons.

The source's Jain and onion/garlic flags are unverified hints. Household Jain
rules require the user's own choices; never derive universal suitability from
these columns. The source meal category also needs review before publication.

A candidate can move to an approved batch only after it has a measured recipe
with substantive steps, complete Hindi and Gujarati translations, and a
reviewed realistic dish-specific image. The normal catalogue validator and
photo checks must pass. Update `contentStatus` when a candidate is published
so the intake collision test continues to cover only pending entries.

The first 400 dishes have measured recipes, Hindi and Gujarati translations,
and visually reviewed dish-specific generated photos in `photos/`. Their
optimized 600px and 1200px images are in `public/photos/` and their approved
recipes are in the public catalogue. Keep drafts and photos for future review;
do not treat source reference URLs in a draft as verified citations.

`scripts/prepare-friend-fourth100-photos.py` converts the newest reviewed images and
`scripts/promote-friend-fourth100.mjs` constructs the newest approved batch. Run the
normal catalogue build and validation after either script.

The intake was built by `outputs/dish-list-review/prepare_intake.py` in the
parent workspace from the earlier reviewed comparison. Regenerate from that
script when changing duplicate decisions, then run the project tests.
