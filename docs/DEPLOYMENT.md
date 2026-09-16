# Deploy to the existing site

Deployment status, 17 September 2026: release 3.1.1 is live on the existing domain. Migrations 001–003 are applied and verified; the original kitchen row remains unchanged. A protected same-database snapshot was taken before migration (not a full provider backup). The following procedure remains the runbook for future deployments. Version 3.1.2 adds the Supabase account-deletion backend described below.

## 1. Back up the existing database

Use the existing project's Supabase backup facilities or a database dump, including the old `kitchen_state` rows and Auth user data where supported by the provider. Verify the backup can be restored. The supplied Git bundle backs up code history only; it is **not** a backup of live user data.

## 2. Apply migrations to the existing Supabase project

Apply these files, once and in order, using Supabase migrations or its SQL editor:

1. `supabase/migrations/202609130001_private_kitchens.sql`
2. `supabase/migrations/202609130002_legacy_migration.sql`

Optionally apply `supabase/seed-catalog.sql` for database-backed master discovery. The static catalogue works without this seed. Check the SQL execution results and the table policies. See the migration guide for ownership, preserved data and rollback details.

## 3. Verify existing authentication settings

In the same Supabase project, enable email/password signup, configure production SMTP and email confirmation, and retain existing users. Set the Site URL and permitted recovery/confirmation redirects to the existing production domain. Use an explicit allowed URL rather than a broad unrelated-domain wildcard.

Test with disposable users A and B before inviting public users. Check SELECT, INSERT, UPDATE and DELETE denial across accounts, including direct requests to the API rather than only UI tests.

## 4. Existing Vercel environment

Retain the current project and domain. Set:

| Variable | Value |
|---|---|
| `SUPABASE_URL` | Existing project URL |
| `SUPABASE_PUBLISHABLE_KEY` | Existing browser-safe publishable key (or retain `SUPABASE_ANON_KEY`) |
| `ACCOUNT_DELETION_BACKEND` | `supabase`, after deploying `supabase/functions/delete-account` |
| `SUPABASE_SERVICE_ROLE_KEY` | Only for the legacy Vercel deletion backend; not needed with the Supabase backend |
| `APP_ORIGIN` | `https://kavita-kitchen-v2.vercel.app` |
| `CATALOG_SOURCE` | `static`, or `supabase` only after the seed succeeds |

Never put a secret/service-role key into browser code, public JSON, `VITE_*`, or `NEXT_PUBLIC_*` variables. `/api/config` rejects secret keys and JWTs whose role is not `anon`.

`vercel.json` specifies the build, output directory `dist`, routes and security headers. Use Node 22+; keep the existing static/Other framework setting. API functions remain in the repository's `api` directory.

## 5. Update existing main

Inspect the diff and reconcile any new upstream commits before pushing. Use the existing `main` branch and origin; do not force-push. Once migrations and account checks pass, push the prepared commit to `sandeshrawal-cell/kavita-ka-kitchen` main. The existing Vercel Git integration should build and deploy to the current domain.

Do not upload `.env`, test data, `node_modules`, private exports or the original live backup. The provided ZIP excludes them. It includes source, lockfile, migrations, tests and prebuilt `dist` output.

## 6. Live acceptance checks

- Existing user login shows migrated history/favourites/plans; old cloud rows are preserved.
- New signup confirmation and recovery emails work through production SMTP.
- User A cannot read or alter B's data with either client or direct requests.
- Two real devices see saves after sync; conflicting changes produce a choice, not silent overwrites.
- Offline edits survive reload and sync after authenticated reconnection.
- Delete a disposable test account; verify Auth, `kkk_records`, legacy cloud rows and any independently existing storage objects are handled.
- Confirm all previously deployed private tables/storage buckets beyond the repository schema have owner policies and an account-deletion path. Their live structure could not be inspected during this build.
- Test real Android install/update/offline behavior and check Vercel deployment logs and security headers.
- Finalize operator identity, support contact, privacy retention and jurisdictional terms before public launch.

No Play Store publication is included or authorized by this release.

## Account deletion backend (3.1.2)

Deploy `supabase/functions/delete-account` to the existing project. It uses the project's built-in secret environment variables; do not copy the administrative key into Vercel or the browser. Set `ACCOUNT_DELETION_BACKEND=supabase` and `APP_ORIGIN` to the existing production origin, then deploy the website.

The function performs authoritative verification through Supabase Auth before reading the token's authentication-method timestamps. The caller must have authenticated within ten minutes; token refresh alone is insufficient. It revokes sessions before deleting the verified account. Foreign keys cascade to private records, AI quota, legacy data and the protected legacy snapshot. There are no Storage buckets or objects in this project as of this deployment; revisit object cleanup if uploads are later moved to Storage.

`verify_jwt=false` selects application-level Auth verification compatible with current signing keys. It does not permit anonymous deletion: missing/forged tokens fail, and the verified identity is the only deletion target. No client-supplied user ID is accepted.

Cloud AI remains disabled at the owner's request; do not provision an API key or enable billed calls without a new instruction.


## Version 3.1 additions

For optional cloud AI, also apply `supabase/migrations/202609140003_ai_quota.sql`. It creates a private usage counter with cascading account deletion and a narrow authenticated quota function (30 requests per day, at least 60 seconds between requests). The endpoint refuses to call the provider if quota storage is unavailable.

Set `OPENAI_API_KEY` as a server-only secret and `OPENAI_MODEL` to a Responses API model supporting image input and structured JSON output. Leave both unset to retain standard local search and manual pantry entry. Never expose this key through public config. Review provider billing/retention and test with disposable users before activating it publicly. No live AI call was tested in this release.

The ZIP includes reviewed photographs and all generated static recipe pages. Keep photo credits and licences. The importer is a maintainer tool; it is not run by the normal build and does not perform live browser image searches.

After deployment, test a direct `/recipe/dal-tadka` request without JavaScript, the sitemap, image credits, recurring menu preview/application, measured pantry deduction, private photo account separation, quota exhaustion and disabled-AI fallback. Browser voice commands use an explicit start button and depend on device support.
