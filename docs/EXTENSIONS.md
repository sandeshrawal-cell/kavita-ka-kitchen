# Integrations and remaining extensions

The features previously described here now have implementations in src/features.js, src/intelligence.js, api/assistant.js and scripts/recipe-pages.mjs. See FEATURE_STATUS.md for current coverage.

AI sends only the explicitly submitted text or photograph. No private recipes, household records, history or location are automatically attached. The response is constrained to search parameters or proposed ingredients and is rechecked by the deterministic food engine. The quota fails closed if migration 003 is unavailable. Configure a Responses API model with image and structured-output support via OPENAI_MODEL; no model choice is silently imposed.

Official API implementation references: https://developers.openai.com/api/reference/cli/resources/responses/methods/create and https://developers.openai.com/api/docs/guides/images-vision . store:false disables response storage, but does not promise zero provider processing or retention under every account policy.

The cuisine map uses public-domain Natural Earth country geometry: https://www.naturalearthdata.com/about/terms-of-use/ . Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson .

Photographs are public Commons assets, not AI-generated substitutes. scripts/photos.mjs retrieves candidates at build time only, with rate-limit backoff. It requires Sharp through SHARP_PATH or a local installation for maintainers; the normal application build does not require Sharp or network access. New candidates have source-matched status and are not displayed until reviewed. Preserve rejected status to avoid importing a known bad match again. Full credits are stored in catalog/photos.json and displayed on recipe pages.

All-day event menus and recurring plans execute in the foreground. Production scheduling is an estimate based on entered capacity and recipe batch limits. Public SEO pages are generated only for complete global recipes. Private recipe photos never enter that build pipeline.

New private record types must retain owner RLS. Community publishing, household account invitations and background jobs require separate schema, lifecycle, permissions and operational work; they are not enabled by this release.
