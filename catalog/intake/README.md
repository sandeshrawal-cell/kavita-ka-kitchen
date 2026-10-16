# Friend dish list intake

`friend-dishes.json` is the deduplicated intake from
`Kavita_ka_Kitchen_dishes_with_batch1.xlsx`. The 3,775 candidates are ordered
in seven batches of 500 and a final batch of 275. Six 100-dish releases have
published 600 unique candidates. R0417 Tarri Poha was already published as
Tarri Pohe, so R0501 Jeera Aloo filled its slot; 3,173 unique candidates
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

The first 600 published dishes have measured recipes, Hindi and Gujarati translations,
and visually reviewed dish-specific generated photos in `photos/`. Their
optimized 600px and 1200px images are in `public/photos/` and their approved
recipes are in the public catalogue. Keep drafts and photos for future review;
do not treat source reference URLs in a draft as verified citations.

`scripts/prepare-friend-sixth100-photos.py` converts the newest reviewed images and
`scripts/promote-friend-sixth100.mjs` constructs the newest approved batch. Run the
normal catalogue build and validation after either script.

The intake was built by `outputs/dish-list-review/prepare_intake.py` in the
parent workspace from the earlier reviewed comparison. Regenerate from that
script when changing duplicate decisions, then run the project tests.

The current popular-dish expansion is tracked in `friend-popular200-progress.json`.
It selects 200 missing dishes using researched food-trend themes, not a ranked top-200 claim.
Finish recipes before photos; record only visually reviewed image IDs with
`scripts/record-friend-popular200-photos.mjs`. Prepare the reviewed images with
`scripts/prepare-friend-popular200-photos.py`, then promote cumulative groups of 25
with `node scripts/promote-friend-popular200.mjs --limit=25` (then 50, 75, etc.).
Run the build, catalogue validation and `verify-friend-popular200.mjs --limit=25 --require-complete`.
Only approved entries enter the public site; remaining drafts stay private.
Update `livePublishedCount` only after checking the production deployment.
