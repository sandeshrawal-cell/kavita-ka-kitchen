# Migration and data preservation

Baseline code commit: `6480a9d`. A complete Git bundle was created before editing. No live database data was deleted or modified during development.

## Changes

Migration 001 adds `kkk_records`, `kkk_dishes` and `kkk_recipes`. Every private row has an Auth-owned `user_id`; its composite primary key is `(user_id,id)`. RLS restricts reads and writes to `auth.uid()`. Anonymous users have no private-table privileges. Owner/kind and owner/update indexes support private queries; master categories and text search have GIN indexes.

`kkk_write_record` is a security-invoker function. It derives the user from Auth, serializes writes to a record, compares the expected version and supports mutation-ID retries. A conflict is returned rather than silently overwriting a newer row. Tombstones preserve deletions across offline devices.

Migration 002 retains or creates the legacy `kitchen_state` table and tightens its owner boundary with a restrictive policy. Existing permissive policies are not blindly dropped. Existing authenticated grants are retained; anonymous grants are revoked. The migration adds only the SELECT grant required for legacy import.

`kkk_import_legacy()` runs on authenticated sign-in. It reads **only that user's** cloud row, maps data into records and writes an import marker in the same transaction. Repeated calls are idempotent. Existing v3 records win if their IDs already exist. Original legacy rows remain untouched.

| Old field | New kind |
|---|---|
| party, weather, settings, exclusions | config |
| favorites, hidden | favorite, hidden |
| pantry, leftovers | pantry, leftover |
| history | history |
| custom dishes | recipe, kept as an outline until completed |
| ratings, votes, preference | rating, vote, preference |
| date/meal planner slots | plan |
| groceryChecked | grocery (legacy checks retained; new checks are scoped by week/unit) |

Legacy synthetic dish IDs resolve through `public/data/aliases.json` to canonical items. Known synonyms and side-only variations are collapsed; saved historical names remain in their history records.

## Browser storage

The old application used a browser-wide key, `kavitaKitchenUltimate_v1`, before authentication. That blob has no reliable owner. This release does not read, delete or automatically upload it. Neither does it silently import older `kavitaKaKitchen_v1` or `aajKyaBanaye_v1` keys. If the only copy of valuable data is there, an owner must inspect/export it and explicitly determine its account before a separate controlled import. Do not assign it to whoever happens to log in first.

New stores are named `kkk-private-v3:<auth user id>`. Sign-out/account switch closes the store, clears the screen, private recipe metadata, pending callbacks and cooking state. Cached records remain in their own account store for offline continuity. Account deletion removes the active account's local database.

Queue requests capture the session for their store's owner before making HTTP calls. If the shared Auth client has changed accounts, the old queue rejects the request; it cannot send user A's payload with user B's token.

## Rollback

The SQL is additive. Do not drop v3 tables as a routine rollback; that would destroy newly saved data. Keep the database backup and export new records first. Restoring the previous frontend restores its previous behavior, including the known shared-browser storage vulnerability, so that is not a safe long-term fallback for a public multi-user app. Use a temporary maintenance page or a patched previous client while diagnosing a failed release.

The new frontend requires these migrations before normal cloud saves. Do not switch production to it while the database is still on the old schema.
