# Kavita ka Kitchen 3.1.1 — readability and recipe detail

Updated 16 September 2026 following the user's review.

- Normal reading text now uses medium weight (500); previously light headings and navigation use semibold (600). Existing bold buttons and labels retain their emphasis.
- Ingredient text increases from 11px to 13px, and recipe instructions from 12px to 14px. Numbered instructions on public recipe pages have more breathing room.
- All 28 complete recipes now have fuller dish-specific preparation, heat levels, cooking stages, texture/doneness cues and simple corrections. Cooking mode and public recipe pages use the same updated instructions.
- The 328 preparation outlines remain labelled as incomplete. Private family recipes were not edited.

The build succeeds and all 45 existing automated tests pass. Browser checks confirm medium body text and semibold headings/navigation, the expanded Dal Tadka method, and step navigation in cooking mode. The desktop page at 1241px content width and phone layout at 390 × 844 have no horizontal overflow; the phone recipe dialog's content stays within its width.

This release updates the local preview and downloadable project. The production site has not been deployed. Existing setup requirements and the remaining broader features are documented in DEPLOYMENT.md and FEATURE_STATUS.md.
