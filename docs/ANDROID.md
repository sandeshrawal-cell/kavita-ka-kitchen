# Android / Play preparation

The web/PWA remains the primary app and installation is optional. The manifest includes new 192/512 icons, a maskable icon, theme/background colors, scope, start URL and shortcuts. Version: 3.0.0. Suggested future package: `com.kavitakitchen.app`.

For a future Trusted Web Activity, keep the existing HTTPS domain and generate a TWA wrapper with the selected Android signing key. Publish `.well-known/assetlinks.json` only after the real signing certificate SHA-256 fingerprint is known. Do not ship a placeholder fingerprint or claim domain verification succeeded.

For Capacitor, wrap the built web output after deciding local versus remote hosting and checking authentication deep-link handling. Test session restoration, recovery URLs, offline content and hardware back navigation.

Before a Play release: finalize operator identity/support, public privacy/terms and the `/delete-account` page; test deletion end-to-end; complete the Data Safety form from actual data practices; verify content accessibility and real Android performance; prepare store screenshots and run closed testing. No APK/AAB or store publication was produced.

## Draft Data Safety inventory

Collected for app functionality: account email, user-entered kitchen preferences, family profile data, private recipes, meal plans/history, pantry/leftovers and votes. These sync to the existing Supabase project. Approximate location is optional when explicitly requested for weather and is sent to Open-Meteo through the website endpoint. The current release has no ad tracking, payments, vision uploads or AI-provider processing. Local cached data stays on the browser/device until removed by site-data controls or the implemented account deletion path.

This inventory is an engineering draft, not a completed store/legal declaration. Verify the actual production service configuration, logging and backup retention before submitting it.
