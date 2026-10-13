// Briques de base partagées par toutes les pages.
export const href = (route) => (route === 'home' ? '#home' : `#${route}`)
export const a = (route, text, cls = '') => `<a class="${cls}" href="${href(route)}">${text}</a>`
export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')

export const ARR = '<svg class="arr" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9h12M10 4l5 5-5 5"/></svg>'

/** Bouton avec flèche. */
export const btn = (route, text, cls = '', attrs = '') => `<a class="btn ${cls}" href="${href(route)}" ${attrs}><span>${text}</span>${ARR}</a>`

/** Image dévoilée par un masque, avec parallaxe optionnelle. */
export const media = (src, alt = '', { cls = '', d = 0, parallax = 0.07, ratio = '' } = {}) =>
  `<div class="mask ${cls}" style="--d:${d}s;${ratio ? `aspect-ratio:${ratio}` : ''}"><div class="ph px"><img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async"${parallax ? ` data-parallax="${parallax}"` : ''} /></div></div>`

/** Image simple (sans masque), pour vignettes. */
export const photo = (src, alt = '', cls = '') => `<div class="ph ${cls}"><img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async" /></div>`

export const list = (items, cls = 'ticks') => (items.length ? `<ul class="${cls} line">${items.map((i) => `<li>${i}</li>`).join('')}</ul>` : '')
export const section = (inner, cls = '', id = '') => `<section class="section ${cls}" ${id ? `id="${id}"` : ''}><div class="wrap">${inner}</div></section>`
