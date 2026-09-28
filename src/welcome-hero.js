import {esc} from './core.js';

/** The preview is illustrative; it never implies that a guest has saved a plan. */
export function welcomeHero({dish,mode='home'}={}) {
  const photo=dish?.photo;
  const name=esc(dish?.name||'Achari Paneer');
  const full=esc(photo?.src||'/photos/achari-paneer-1200.webp');
  const small=esc(photo?.small||'/photos/achari-paneer-600.webp');
  const alt=esc(photo?.alt||'Achari paneer with a rich, spiced gravy');
  return `<section class="welcome-hero" aria-labelledby="welcomeHeroTitle">
    <div class="welcome-hero-copy">
      <span class="welcome-hero-eyebrow"><img src="/art/kavita-mark.svg" width="30" height="30" alt="">A little inspiration. Every day.</span>
      <h2 id="welcomeHeroTitle">What’s cooking today?<br><em>Let’s make it easy.</em></h2>
      <p class="welcome-hero-intro">${mode==='home'?'Discover dishes your family will love. Plan meals, use what’s at home, and make shopping simpler.':mode==='factory'?'Plan dependable canteen meals across your shifts. Find recipes, adjust serving quantities, and shop from one clear list.':mode==='office'?'Plan good meals for your team. Find recipes, adjust portions, and shop from one clear list.':'Plan a memorable menu for your guests. Find recipes, adjust portions, and shop from one clear list.'}</p>
      <div class="welcome-hero-actions"><button class="welcome-hero-primary" data-nav="planner">Plan my week <span aria-hidden="true">↗</span></button><button class="welcome-hero-secondary" data-nav="discover">Find a recipe <span aria-hidden="true">→</span></button></div>
      <div class="welcome-hero-search"><label for="welcomeQuery">Already craving something?</label><form id="heroSearch" class="search-box"><span aria-hidden="true">⌕</span><input id="welcomeQuery" name="query" aria-label="What do you feel like eating?" placeholder="What do you feel like eating?" maxlength="200"><button type="submit" aria-label="Find food ideas" class="search-go">→</button></form></div>
      <div class="welcome-hero-benefits"><span>Recipes for your tastes</span><span>A plan for your week</span><span>One simple shopping list</span></div>
    </div>
    <div class="welcome-hero-visual">
      <figure class="welcome-hero-food"><img src="${full}" srcset="${small} 600w, ${full} 1200w" sizes="(max-width: 760px) 90vw, 42vw" alt="${alt}" width="1200" height="800" fetchpriority="high"><figcaption><span>Something delicious to look forward to</span><strong>${name}</strong></figcaption></figure>
      <div class="welcome-hero-preview" aria-label="Example meal plan and shopping list"><div class="welcome-hero-preview-top"><span>Your week, a little easier</span><small>Example plan</small></div><div class="welcome-hero-preview-meal"><img src="/photos/jeera-rice-600.webp" width="52" height="52" alt="Jeera rice" loading="lazy"><div><small>MONDAY · DINNER</small><strong>Paneer + jeera rice</strong></div><span class="welcome-hero-check" aria-hidden="true">✓</span></div><div class="welcome-hero-preview-list"><span>Shopping, sorted</span><span>Paneer</span><span>Rice</span><span>Tomatoes</span></div></div>
    </div>
  </section>`;
}
