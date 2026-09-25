/** The preview is illustrative; it never implies that a guest has saved a plan. */
export function welcomeHero({signedIn=false}={}) {
  return `<section class="welcome-hero" aria-labelledby="welcomeHeroTitle">
    <div class="welcome-hero-copy">
      <span class="welcome-hero-eyebrow"><img src="/art/kavita-mark.svg" width="30" height="30" alt="">A little inspiration. Every day.</span>
      <h2 id="welcomeHeroTitle">What’s cooking today?<br><em>Let’s make it easy.</em></h2>
      <p class="welcome-hero-intro">Discover dishes your family will love. Plan meals, use what’s at home, and make shopping simpler.</p>
      <div class="welcome-hero-actions">${signedIn?'<button class="welcome-hero-primary" data-nav="planner">Plan my week <span aria-hidden="true">↗</span></button>':'<button class="welcome-hero-primary" data-action="welcome-start">Create my kitchen <span aria-hidden="true">↗</span></button>'}<button class="welcome-hero-secondary" data-nav="discover">Explore recipes <span aria-hidden="true">→</span></button></div>
      <div class="welcome-hero-search"><label for="welcomeQuery">Already craving something?</label><form id="heroSearch" class="search-box"><span aria-hidden="true">⌕</span><input id="welcomeQuery" name="query" aria-label="What do you feel like eating?" placeholder="What do you feel like eating?" maxlength="200"><button type="submit" aria-label="Find food ideas" class="search-go">→</button></form></div>
      <div class="welcome-hero-benefits"><span>Recipes for your tastes</span><span>A plan for your week</span><span>One simple shopping list</span></div>
    </div>
    <div class="welcome-hero-visual">
      <figure class="welcome-hero-food"><img src="/photos/achari-paneer-1200.webp" srcset="/photos/achari-paneer-600.webp 600w, /photos/achari-paneer-1200.webp 1200w" sizes="(max-width: 760px) 90vw, 42vw" alt="Achari paneer with a rich, spiced gravy" width="1200" height="800" fetchpriority="high"><figcaption><span>Something delicious to look forward to</span><strong>Achari Paneer</strong></figcaption></figure>
      <div class="welcome-hero-preview" aria-label="Example meal plan and shopping list"><div class="welcome-hero-preview-top"><span>Your week, a little easier</span><small>Example plan</small></div><div class="welcome-hero-preview-meal"><img src="/photos/jeera-rice-600.webp" width="52" height="52" alt="Jeera rice" loading="lazy"><div><small>MONDAY · DINNER</small><strong>Paneer + jeera rice</strong></div><span class="welcome-hero-check" aria-hidden="true">✓</span></div><div class="welcome-hero-preview-list"><span>Shopping, sorted</span><span>Paneer</span><span>Rice</span><span>Tomatoes</span></div></div>
    </div>
  </section>`;
}
