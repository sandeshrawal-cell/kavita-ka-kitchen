import {esc} from './core.js';
export function dishPhoto(d,large=false){
 const p=d?.photo;
 if(!p?.src||p.status!=='reviewed')return `<div class="photo-pending"><span aria-hidden="true">♧</span><small>Dish photograph being curated</small></div>`;
 return `<img class="food-photo" src="${esc(large?p.src:p.small)}" srcset="${esc(p.small)} 600w, ${esc(p.src)} 1200w" sizes="${large?'(max-width: 700px) 95vw, 760px':'(max-width: 600px) 92vw, (max-width: 1100px) 44vw, 320px'}" width="${p.width}" height="${p.height}" alt="${esc(p.alt)}" loading="lazy" decoding="async">`;
}
export function photoCredit(d){const p=d?.photo;if(!p?.src||p.status!=='reviewed')return '';return `<details class="photo-credit"><summary>Photograph credit</summary><p><a href="${esc(p.source)}" target="_blank" rel="noopener">${esc(p.title.replace(/^File:/,''))}</a> by ${esc(p.author)} · <a href="${esc(p.licenseUrl)}" target="_blank" rel="noopener">${esc(p.license)}</a>.</p><p>${esc(p.changes)} Serving presentation may differ from the recipe.</p></details>`;}
