KAVITA KA KITCHEN — VERCEL + SUPABASE ULTIMATE BUILD
======================================================

WHAT IS INCLUDED
----------------
This package is an installable pure-vegetarian PWA with:
- Supabase email/password login
- Backup & Sync across devices through Supabase
- 70 unique recommendations per search (exact matches first, smart broadened matches after that)
- 8-day no-repeat lock for cooked dishes
- Minimum 100 unique items in every category; the bundled database currently contains:
  Breakfast 180, Lunch 180, Dinner 180, Desserts 180, Shakes 216, Coffee 280, Snacks 180
- No eggs
- Smart Family Preference Score
- What's Available at Home mode
- Leftover Mode
- Weekly Meal Planner
- Automatic Grocery List
- Cooking Time selector
- Meal Effort selector
- Weather-based ranking
- Seasonal vegetable intelligence
- Family Voting
- Ingredient exclusions (hard rule; never relaxed)
- Guest Mode
- Adults + Kids prompt before EVERY search
- Kids Mode
- Never Show Again / Hide Dish
- Recipe View
- Nutrition Balance Indicator
- Serving Size Calculator
- Today Dashboard
- Kitchen Insights
- Custom family dishes
- Installable Android PWA

IMPORTANT: NO KAVITA PHOTOS ARE INCLUDED IN THIS PACKAGE.


PART A — SUPABASE SETUP
========================

1) OPEN YOUR SUPABASE PROJECT
-----------------------------
Use the same Supabase project connected to Kavita ka Kitchen.

2) CREATE THE CLOUD SYNC TABLE
------------------------------
In Supabase:
SQL Editor -> New query

Open the file:
  supabase_schema.sql

Copy the COMPLETE file into the SQL Editor and click Run.

This creates one private JSON backup row per logged-in user and applies Row Level Security so a user can only read/write their own kitchen data.

3) AUTHENTICATION
-----------------
Go to:
Authentication -> Users

To avoid SMTP/email problems, the simplest family setup is to create the user manually:
- Add user / Create new user
- Enter Kavita's email
- Set the password directly
- Mark/confirm the email if the UI offers an Auto Confirm option

Do NOT share the Supabase service_role or secret key with the app.

4) URL CONFIGURATION
--------------------
After your Vercel site is deployed, return to:
Authentication -> URL Configuration

Site URL:
  https://YOUR-APP.vercel.app

Redirect URL:
  https://YOUR-APP.vercel.app/**

This is only required for password recovery links. Normal manual email/password login works without SMTP.


PART B — VERCEL DEPLOYMENT
===========================

1) DEPLOY THIS FOLDER / ZIP
---------------------------
You can use Vercel Drop or import the project in Vercel.
The root of the deployment must contain:
- index.html
- app.js
- data.js
- styles.css
- manifest.webmanifest
- service-worker.js
- vercel.json
- api/ folder
- icons/ folder

If Vercel Drop does not accept the ZIP directly, unzip it first and drag the complete project folder.

2) ADD ENVIRONMENT VARIABLES
----------------------------
Vercel project -> Settings -> Environment Variables

Add:

Key:
  SUPABASE_URL
Value:
  https://YOUR-PROJECT.supabase.co

Key:
  SUPABASE_PUBLISHABLE_KEY
Value:
  sb_publishable_xxxxxxxxx

Select Production (and Preview if you use previews).

IMPORTANT:
- Use the Supabase PUBLISHABLE key.
- Do NOT use sb_secret, service_role, or any secret backend key.

3) REDEPLOY
-----------
After saving the environment variables:
Deployments -> latest deployment -> Redeploy

Then test:
  https://YOUR-APP.vercel.app/api/config

Expected:
  {"configured":true,...}

4) TEST CLOUD SYNC
------------------
Sign in to the app.
Run the SQL schema first, otherwise the app will show "Sync setup needed" but local use will still work.

When successful the top pill shows:
  Synced

Kitchen state that syncs includes:
- History
- 8-day locks
- Favourites
- Hidden dishes
- Ratings
- Family votes
- Preference learning
- Pantry / available ingredients
- Leftovers
- Ingredient exclusions
- Weekly planner
- Grocery check state
- Custom family dishes
- Weather preference
- Party size defaults


PART C — INSTALL ON KAVITA'S ANDROID PHONE
===========================================

1) Open the Vercel URL in Google Chrome.
2) Sign in with Kavita's Supabase email + password.
3) Tap the download/install icon in the app header.
4) If Chrome does not show the native prompt:
   Chrome menu (three dots) -> Install app / Add to Home screen
5) Confirm Install.
6) "Kavita ka Kitchen" appears in the app drawer/home screen.

The PWA shell can open offline. Login/cloud sync/weather need internet; kitchen changes made locally are kept and sync again when online.


HOW THE NEW SEARCH WORKS
========================

Every time "Show 70 ideas" is tapped, the app FIRST asks:
- Adults
- Kids
- Guest Mode
- Optional guest adults / guest kids

Then it ranks the selected category using:
- Family preference score
- Exact cuisine
- Cooking time
- Effort
- Kids preference
- Guest preference
- Pantry ingredients
- Leftovers
- Weather
- Seasonal ingredients
- Favourites
- Ratings
- Family voting
- Cooking history

HARD RULES that are NEVER relaxed:
- Pure vegetarian / no eggs
- 8-day lock
- Never Show Again / hidden dishes
- Jain mode
- Explicit ingredient exclusions

If a narrow combination has fewer than 70 exact matches, other safe dishes from the SAME CATEGORY are added after the exact matches and marked SMART EXPANDED.


WEATHER
=======
Weather is fetched through /api/weather using Open-Meteo and defaults to Surat coordinates. No weather API key is required.
The app also has manual Hot / Rainy / Cool / Pleasant selection.


UPDATING THE APP LATER
======================
Keep the same Vercel project.
Deploy the updated package to the same project.
Do not create a new Supabase project unless you intentionally want a separate database.

Because data is stored in Supabase and local storage, normal front-end updates do not delete the family's synced kitchen state.
