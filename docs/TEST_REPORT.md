# Version 3.1.1 verification — 16 September 2026

All 45 existing tests passed again after the typography and recipe edits; the build generated all 28 public recipe pages. Browser checks confirmed body weight 500, heading/navigation weight 600, 14px recipe steps, the expanded Dal Tadka method and cooking-step navigation. There was no horizontal overflow on the desktop page (1241px) or phone page/recipe dialog (390 × 844 viewport). Ingredient quantities and dietary metadata remain unchanged. No production deployment occurred.

The 3.1 baseline coverage below still applies. See RELEASE_3.1.1.md for the scope of this review update.

# Version 3.1 test report — 16 September 2026

**45 automated tests passed, 0 failed, 0 skipped.** The production build succeeds and generates 28 public recipe pages. The catalogue contains 356 canonical dishes and 153 reviewed photographs. No release was deployed to the live website or database.

## Automated evidence

Run `pnpm test` and `pnpm build` with Node 22 or later. Tests use local fixtures, disposable identities and mocked provider HTTP responses; no production credentials or paid AI requests are required. The release also includes the captured test output.

| Area | Coverage |
|---|---|
| Discovery and food rules | 70 unique canonical recommendations, vegetarian/egg restrictions, strict Jain rules, ingredient aliases, allergies, exclusions, hidden dishes and safe expansion |
| Rotation and menus | Exact 8-day unlock boundary, common-side exception, coordinated menus, weekly uniqueness and future-plan regression |
| Quantities | Adult/child equivalents, mandatory headcount, buffers, large events, ingredient/seasoning scaling, batches and cost arithmetic |
| Recipes | Numeric ingredients and explicit steps for all 28 complete recipes; beginner cooking explanations |
| Private data | PostgreSQL RLS denies cross-owner reads/writes and anonymous access; master data publication policies, legacy migration and account deletion cascades |
| Offline and concurrency | Per-owner caches, durable queue, tombstones, retries, version conflicts, different-record merges and account-switch race prevention |
| HTTP boundaries | Public configuration rejects secret keys; account deletion requires verified identity, recent login, origin and confirmation |
| Pantry and consumption | Compatible unit conversion, measured stock deductions, expiry handling, waste/use records and serving guidance after three observations |
| Recurring plans | Complete-menu preservation, occupied-slot protection, rotation, skipped occurrences and paused rules |
| New discovery tools | Written headcounts, multiple exclusions, available ingredients, cook-something-new filtering and household taste aggregation |
| Event production | All-day Jain menu rules, cooking-station non-overlap, staff limits and vessel/batch capacity |
| Photos and public pages | Reviewed images have local files and licence metadata; recipe HTML includes ingredients, canonical URLs and structured data |
| Optional AI | Bounded outputs, animal-ingredient filtering, consent/origin/image validation, server-only provider requests with response storage disabled |
| AI quota | Actual PostgreSQL enforces user isolation, daily limit, cooldown and inaccessible direct quota-table access; failures prevent provider calls |

Database tests use PGlite with actual migration SQL, roles, policies and functions. The Supabase Auth UID helper is emulated for disposable identities. This validates local PostgreSQL behavior; it is not a hosted Supabase integration test.

## Browser checks

The following additions were checked in the local browser with disposable `example.test` accounts and a local database harness:

- The world map opens with country controls and India-to-regional-cuisine navigation.
- Local assistant search for dinner for six adults and three kids under 30 minutes, without potato and onion, preserves headcounts and exclusions.
- Saving 1 kg of tomato and recording 300 g used leaves 700 g in the pantry and displays the consumption record in Insights.
- Liking a swipe card advances to the next dish.
- No console errors appeared in the discovery checks inspected.

Earlier version 3.0 browser checks covered guest access, 70-result discovery and pagination, local sign-in/out, profile/pantry/family forms, saved three-dish menus, reuse for 500 people with 10% buffer, dated calendar saving, bulk grocery totals and account A/B separation. Its desktop layout was inspected at 1440 × 1050 and phone layout at 390 × 844 with no horizontal overflow. These earlier observations are retained as baseline evidence, not a claim that every new 3.1 control received a phone test.

The 205 candidate photographs were visually inspected; 52 unsuitable matches were rejected. Only 153 retained photos and their responsive derivatives are release assets. Recipe/photo editorial coverage remains incomplete.

## Not verified or activated

Production signup/recovery delivery, real existing-account migration, hosted RLS with real tokens, two-device live sync, live deletion/storage cleanup, real AI requests, private photo upload and PNG download on target browsers, microphone commands, actual Android PWA installation/update, closed-app timer behavior and device performance benchmarks remain acceptance checks. Not every calendar/recurrence control received a complete browser scenario; the underlying planning rules have automated coverage.

Live tables and keys still need operator setup. No GitHub push, Vercel deployment or production migration occurred. See DEPLOYMENT.md and FEATURE_STATUS.md for setup and the explicitly unfinished requirements. Production schedule estimates and recipe content need practical kitchen validation.
