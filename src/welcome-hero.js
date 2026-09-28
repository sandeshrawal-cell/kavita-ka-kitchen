import {esc} from './core.js';

const usefulIngredient=name=>!/^\s*(?:water|salt|oil|ghee|butter|cumin|turmeric|black pepper|red chilli powder)\s*$/i.test(name);

export function createHeroPreview(plan, catalogue, idea) {
  const planned=(plan?.dishIds||[]).map(id=>catalogue.get(id)).filter(Boolean);
  const plannedPhoto=planned.find(d=>d.photo?.src&&d.photo?.status==='reviewed');
  const featured=plannedPhoto||idea;
  if(!featured?.photo?.src||featured.photo.status!=='reviewed')return null;
  const isPlan=Boolean(plannedPhoto);
  const ingredients=[...new Set((isPlan?planned:[featured]).flatMap(d=>d.ingredients||[]).filter(x=>typeof x==='string'&&usefulIngredient(x)))].slice(0,3);
  const weekday=isPlan?new Date(plan.date+'T12:00:00').toLocaleDateString('en-IN',{weekday:'long'}):'';
  return {
    photo:featured.photo.small||featured.photo.src,
    alt:featured.photo.alt||featured.name,
    name:isPlan?(plan.name||planned.map(d=>d.name).join(' + ')):featured.name,
    badge:isPlan?'My plan':'Meal idea',
    when:isPlan?`${weekday} · ${plan.meal}`:featured.categories?.includes('Dinner')?'Dinner idea':'Lunch idea',
    ingredients
  };
}

export function welcomeHero({dish,mode='home',preview}={}) {
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
      ${preview?`<div class="welcome-hero-preview" aria-label="${preview.badge==='My plan'?'Your next planned meal':'Meal idea and ingredients'}"><div class="welcome-hero-preview-top"><span>Your week, a little easier</span><small>${esc(preview.badge)}</small></div><div class="welcome-hero-preview-meal"><img src="${esc(preview.photo)}" width="52" height="52" alt="${esc(preview.alt)}" loading="lazy"><div><small>${esc(preview.when)}</small><strong>${esc(preview.name)}</strong></div><span class="welcome-hero-check" aria-hidden="true">✓</span></div><div class="welcome-hero-preview-list"><span>Ingredients to gather</span>${preview.ingredients.map(name=>`<span>${esc(name)}</span>`).join('')}</div></div>`:''}
    </div>
  </section>`;
}
