# Kavita ka Kitchen upgrade

Baseline: `6480a9d` on existing `main`. Original repository preserved in `../kavita-ka-kitchen-before-upgrade.bundle` and Git history.

## Inspection findings

- Existing deployment: https://kavita-kitchen-v2.vercel.app, GitHub `sandeshrawal-cell/kavita-ka-kitchen`.
- Static vanilla JavaScript PWA; Vercel config/weather functions; Supabase email/password Auth.
- Repository schema: one `kitchen_state` JSON row per authenticated user, with RLS and cascading auth foreign key. Live schema access still needed to verify deployed policies.
- Critical: a shared localStorage key is loaded before authentication and retained after logout. Cloud sync can upload that state to another account.
- Whole-state timestamp sync overwrites concurrent changes; auth callbacks can race account changes.
- Weekly generation bypasses Jain and exclusions. Main-dish variants defeat uniqueness and locks.
- Full catalogue generation and all 70 cards run synchronously at startup/search. Recipes are generic method outlines, not tested dish-specific recipes.

## Sequence

1. Add private per-record storage, account-scoped IndexedDB, durable offline queue, version-checked writes, legacy cloud migration, RLS/indexes/tests, public signup/recovery/deletion.
2. Replace the interface with an accessible responsive forest-green/ivory design; create a shared tested recommendation engine; fetch category metadata and recipes on demand; preserve existing IDs through aliases.
3. Implement four kitchen modes, mandatory headcount, combos/history reuse, calendar operations, grocery aggregation, preferences/family/voting/pantry/leftovers.
4. Replace synthetic catalogue inflation with canonical dishes; add real global dishes and recipe content, scale/budget/equipment/timeline guidance, explicit coverage reporting.
5. Implement practical discovery/cooking features and extension interfaces for later AI/vision/translation. Document deferred functionality accurately.
6. Run meaningful automated and browser checks, package source/deployable ZIP, update existing main only when release prerequisites can be verified. Do not create infrastructure or remove existing data.

## Release checks

Run engine/storage/API tests and local PostgreSQL RLS tests where available. Verify desktop/mobile UI, guest/save boundary, auth flows with a test adapter, calendar/grocery/cooking interactions, offline behavior. Live signup/login/email, two-user RLS, existing-user migration, cross-device sync, privileged account deletion and deployment require the existing Supabase/Vercel credentials. Clearly distinguish mocks, local verification, and live verification in the final test report.
