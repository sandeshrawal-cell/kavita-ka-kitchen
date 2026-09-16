# Release 3.1 — coverage and reasons for remaining work

Updated 17 September 2026. Version 3.1.1 is published on the existing production domain with the bolder typography and expanded recipes. The three database migrations were applied after a protected legacy-row snapshot; existing account data was preserved. Version 3.1.2 adds the Supabase account-deletion backend. This does not claim that the full 80-part master brief is complete.

## Completed in this update

- 153 licensed dish photographs reviewed against the dish name and visually inspected. Search cards and recipes use local responsive WebP files. Every image includes source, author, licence and transformation information. Unrelated or unsuitable matches were rejected; the remaining 203 dishes display an honest photo placeholder.
- A world cuisine map with India-to-regional-cuisine navigation and keyboard-accessible country controls.
- Swipe or button-based discovery that saves likes and skips in the account's private store; a cook-something-new filter excludes previously cooked dishes.
- Better natural-language parsing for written numbers, multiple exclusions and available ingredients. Headcount confirmation and hard food rules remain mandatory.
- Recurring complete menus, pause/resume controls, preview and generation for up to 90 days. Existing calendar slots are preserved. The 8-day main-dish lock can cause a weekly rule to skip alternate weeks. Rules materialize on user request rather than a background scheduler.
- A dish shelf on the calendar, enabling desktop drag/drop without changing pages and a button alternative for phones.
- Grocery deductions from measured, non-expired pantry stock with matching units. Unknown quantities are not guessed.
- Food-use and waste records, recorded ingredient values, stock deduction, and serving estimates after three consumption observations. These are actual user entries, not invented money-saved statistics.
- A household taste view based on each member's likes, dislikes, cuisines and votes.
- Full-day event session planning and production schedules using entered vessel yield, station count, cooking staff and service hour. Recipes retain their batch ceiling. These calculations still require a kitchen supervisor's practical validation.
- Ingredient substitutions filtered through the same exclusions; beginner explanations of cooking terms; optional browser voice commands after explicit microphone initiation.
- Private family recipe photographs, locally resized before saving in the existing account-isolated store; recipe-card PNG downloads.
- Pre-rendered public pages, canonical links, Recipe structured data, social metadata, robots.txt and sitemap for all 28 complete recipes.
- Optional authenticated AI request parsing and pantry-photo identification, explicit submission consent, output validation, a fixed provider endpoint, disabled response storage and a PostgreSQL-enforced per-user daily/minute quota. Photo suggestions require manual selection before saving.

## Why the previous implementation was partial

The first release established account isolation, shared food rules, offline storage and planning. Several later features had interfaces or simple heuristics but no completed workflow. This update implements those workflows instead of describing them only as future extensions.

Other requirements depend on content or services that code alone cannot establish. A photo search result is not proof of the dish's identity; many exact-name searches returned people, buildings, cars, raw ingredients or other dishes. Of 205 downloaded candidates, 52 were rejected after visual inspection. No rejected image is included in the published assets. 153 reviewed photos are included; a complete exact-photo library is still unfinished.

The legacy catalogue contains preparation outlines. These have not been relabelled as complete recipes or used as trustworthy procurement quantities. The current catalogue remains 356 canonical dishes, including 28 complete recipes. Producing and validating 100 distinct dishes in every category / 5,000 recipes remains editorial and development work; repeating a dish with different sides would violate the user's uniqueness rule.

## Implemented but requires operator setup or real-device verification

- Migrations 001–003 are applied. Live transactional checks passed for owner isolation, legacy import, retry idempotence, conflicts, quota, anonymous denial and cascade deletion; disposable test changes were rolled back.
- Cloud AI is deliberately disabled at the owner's request. Standard search and manual pantry entry remain available. No OpenAI API key was provisioned and no live AI call was made.
- Account deletion now uses a Supabase Edge Function with authoritative Auth verification, recent-session authentication, session revocation and owner-only deletion. The administrative key stays within Supabase. Unit tests and live rejection checks passed; an actual production user's deletion was not performed. Production signup/recovery email delivery, existing-account UI migration and two-device sync still require verification.
- Verify browser microphone support, PNG download, private image upload, PWA installation and Android behavior on target devices. These vary across browsers.
- GitHub and Supabase access are working. Vercel project settings are accessible through the signed-in browser; the connector still lacks the owning team scope. The existing repository, project, domain and database are retained.

## Still not completed

The full catalogue and photo targets; professional recipe/kitchen validation; complete Hindi/Gujarati translations; a regional seasonal produce dataset; multi-account household invitations; opt-in public community publishing and trust aggregates; a continuously learning taste model; automatic closed-app recurring jobs or guaranteed timer alerts; industrial vessel geometry/evaporation models; separately budgeted Jain production lines; a compiled, signed Android app and Play Store release.

These are explicitly outstanding. Full completion needs further development and curated content; this release does not hide them behind inactive success screens. Multi-user sharing in particular needs a separately reviewed access model so private household data does not become public.
