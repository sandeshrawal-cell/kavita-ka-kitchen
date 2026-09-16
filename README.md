# Review update 3.1.1

Slightly bolder typography and more detailed instructions for all 28 complete recipes. See [release notes](docs/RELEASE_3.1.1.md). The production site is unchanged.

# Version 3.1 update

See [release notes](docs/RELEASE_3.1.md), [current coverage and remaining work](docs/FEATURE_STATUS.md) and [photo credits](docs/PHOTO_CREDITS.md). The new optional AI endpoint needs migration 003 and operator-configured server credentials. The public catalogue remains 356 dishes / 28 complete recipes, with 153 reviewed dish photographs.

# Kavita ka Kitchen · v3

A working upgrade of the existing vegetarian kitchen planner, with private accounts, four kitchen modes, saved combinations, a weekly calendar and offline-aware sync.

**Release status: built and tested locally; not deployed.** This is a foundation release through the main parts of Phases 1–3, with partial Phases 4–5. The full 80-part brief is not complete. See `docs/FEATURE_STATUS.md` and `docs/TEST_REPORT.md` for exact coverage and limitations.

Existing infrastructure is preserved:

- GitHub: `sandeshrawal-cell/kavita-ka-kitchen`, branch `main`.
- Production: https://kavita-kitchen-v2.vercel.app/
- Supabase: the existing project supplied by `/api/config`. No replacement projects were created.
- Existing Supabase auth storage key remains `kavita-kitchen-auth-v2`.

## Run locally

Use Node 22 or newer and pnpm:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

Open http://127.0.0.1:4173. Guest discovery works without account configuration. For real login, copy `.env.example` to `.env`, supply the existing project's browser-safe connection values, and apply the migrations to that project first. Keep `.env` out of Git and ZIP exports.

`pnpm test` runs the engine, offline-store, API and local PostgreSQL/RLS suite. It does not create production users or change the live database.

## What is implemented

- Immediate public guest browsing; saving requires sign-in. Public signup, sign-in, password recovery, profile and sign-out screens use the existing Supabase Auth project.
- Private per-user IndexedDB stores and RLS-protected cloud records. Versioned writes, durable offline changes, conflict choices, tombstone deletes, retry idempotence and protection against account-switch races.
- One-time owner-scoped import from the old `kitchen_state` cloud row. Old cloud data is retained. Unowned browser-wide local data is not silently imported into an account.
- Home, Office, Factory and Event modes; adults/kids/guests, attendance buffers, dietary count, ingredient budget and event/service inputs.
- Shared recommendation rules for discovery and generated plans: eggless vegetarian checks, strict Jain ingredient checks, exclusions, hidden dishes, 8-day rotation and canonical deduplication. Up to 70 logical results; 12 cards rendered at a time.
- Saved menus: name, notes, cuisine, occasion, tags, favourite, edit, duplicate, explicit sharing, reuse, delete. Reuse recalculates portions and ingredient estimates.
- Dated weekly calendar, previous/next weeks, automatic generation, copy previous week, duplicate/clear day, editable slots, grocery aggregation and checks.
- Pantry, leftovers, date reminders, family profiles, voting, favourites, ratings, preference scores, hidden-dish restore, private family recipes and meal memory.
- Lazy recipe loading, serving calculator, step-by-step cooking, named in-app timers, optional spoken step repetition and basic troubleshooting.
- Responsive ivory/forest-green design, local Fraunces and Manrope fonts, new icons, optional PWA installation, high-contrast/large-text/reduced-motion controls, keyboard and dialog support.

## Important boundaries

- The catalogue is a curated starter plus preserved legacy discovery entries, not 5,000 finished recipes. There are **28 complete recipes**. Other entries are explicitly labelled preparation outlines and excluded from procurement totals. Exact counts are generated in `public/data/manifest.json`.
- A complete recipe here means ingredients, numeric quantities and explicit steps are supplied. It does **not** mean professionally kitchen-tested or medically certified. Supplier labels and local cooking validation remain necessary.
- Jain uses a conservative rule for listed root ingredients, mushrooms and groundnuts, plus complete ingredient lists. Individual religious practices can differ. Exclusions can tighten this further.
- Requested Jain meals currently make the entire generated menu Jain-compatible; split dietary production is not yet implemented.
- Budgets cover sample ingredient estimates only. Unpriced ingredients remain visible as missing; labour, fuel, service and live procurement prices are not included.
- Large-kitchen scores, batch counts, staffing and timelines are planning estimates, not an industrial production specification.
- Public recipe URLs render in the client; server-rendered SEO/structured data are not yet implemented. Hindi/Gujarati, camera scanning, AI copilot, advanced taste graphs and Play Store publishing remain future work.

## Project layout

- `src/`: new UI, shared food engine, catalogue loading and private offline store.
- `api/`: Vercel connection, catalogue, weather and authenticated account-deletion endpoints.
- `supabase/migrations/`: additive private-record schema, RLS, indexes and legacy import.
- `supabase/seed-catalog.sql`: optional read-only master catalogue import for indexed database-backed discovery.
- `catalog/`: explicit recipe content and canonical discovery entries.
- `public/`: public recipe/category snapshots, illustrations and fonts; never private data.
- `scripts/build.mjs`: portable build with native browser modules and no native compiler requirement.
- `dist/`: generated deployment output. The repository root retains original `app.js`, `data.js` and `styles.css` for historical compatibility/reference; they are **not** served by the new build.
- `tests/`: automated tests plus an isolated optional local browser harness.

Read `docs/DEPLOYMENT.md` and `docs/MIGRATION.md` before updating production. Do not redeploy the new frontend before the existing database migration is applied and verified.

Implementation references: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Supabase user management](https://supabase.com/docs/guides/auth/managing-user-data).
