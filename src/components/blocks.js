// Composants de page : chaque famille de pages assemble ceux qui servent son contenu.
import { href, a, btn, media, photo, ARR, esc } from './ui.js'

/** En-tête de page intérieure. theme : 'dark' (par défaut) ou 'light'. */
export function innerHero({ eyebrow, title, lead = '', img = '', crumbs = [], actions = '', theme = 'dark', center = false, aside = '' }) {
  const trail = [['home', 'Home'], ...crumbs]
  return `
  <section class="ihero ihero--${theme} ${img ? 'ihero--img' : ''} ${aside ? 'ihero--aside' : ''} ${center ? 'ihero--center' : ''}">
    <div class="ihero__mesh" aria-hidden="true"></div>
    <div class="wrap ihero__in">
      <nav class="crumbs label" aria-label="Breadcrumb">${trail
        .map(([r, l], i) => (i < trail.length - 1 ? `<a href="${href(r)}">${l}</a>` : `<span aria-current="page">${l}</span>`))
        .join('<span aria-hidden="true">/</span>')}</nav>
      <div class="ihero__grid">
        <div>
          <p class="label ihero__eyebrow">${eyebrow}</p>
          <h1 data-split>${title}</h1>
          ${aside && lead ? `<p class="lead reveal" style="margin-top:20px;--d:.2s">${lead}</p>` : ''}${aside && actions ? `<div class="ihero__actions reveal" style="--d:.3s">${actions}</div>` : ''}
        </div>
        ${aside ? `<div class="ihero__aside">${aside}</div>` : lead || actions ? `<div class="ihero__side reveal" style="--d:.25s">${lead ? `<p class="lead">${lead}</p>` : ''}${actions ? `<div class="ihero__actions">${actions}</div>` : ''}</div>` : ''}
      </div>
      ${img ? `<div class="ihero__media">${media(img, '', { parallax: 0.06, d: 0.1 })}</div>` : ''}
    </div>
  </section>`
}

/** Grand texte dont les mots s'éclairent au défilement. */
export const statement = (text, { label = '', cls = '', foot = '' } = {}) => `
  <section class="section statement ${cls}">
    <div class="wrap">
      ${label ? `<p class="label reveal">${label}</p>` : ''}
      <p class="statement__t" data-lit>${text}</p>
      ${foot ? `<div class="statement__foot reveal">${foot}</div>` : ''}
    </div>
  </section>`

/** Rangée de faits : valeur en grand, légende en mono. */
export const facts = (items, cls = '') => `
  <ul class="facts line ${cls}">${items.map(([v, l], i) => `<li class="reveal" style="--d:${i * 0.08}s"><b>${v}</b><span class="label">${l}</span></li>`).join('')}</ul>`

/** Liste éditoriale : titres géants, aperçu d'image qui suit le curseur. */
export const ilist = (rows, { cls = '' } = {}) => `
  <ul class="ilist line ${cls}" data-preview>
    ${rows.map((r, i) => `
    <li class="reveal" style="--d:${Math.min(i, 8) * 0.05}s">
      <a class="irow" href="${href(r.route)}"${r.img ? ` data-img="${r.img}"` : ''}>
        <span class="irow__meta label">${r.meta || ''}</span>
        <span class="irow__title">${r.title}</span>
        ${r.text ? `<span class="irow__text">${r.text}</span>` : ''}
        <span class="irow__go" aria-hidden="true">${ARR}</span>
      </a>
    </li>`).join('')}
  </ul>`

/** Panneaux qui s'ouvrent au survol. */
export const panels = (items) => `
  <div class="panels">
    ${items.map((x) => `
    <article class="panel" tabindex="-1">
      <div class="panel__bg"><img src="${x.img}" alt="" loading="lazy" decoding="async" /></div>
      <span class="panel__tab label">${x.tab}</span>
      <div class="panel__body">
        <h3>${x.title}</h3>
        <p>${x.text}</p>
        ${a(x.route, x.cta || 'Explore', 'link-arrow')}
      </div>
    </article>`).join('')}
  </div>`

/** Carrousel horizontal. */
export const rail = (cards, { id = '' } = {}) => `
  <div class="rail" ${id ? `id="${id}"` : ''}>
    <div class="rail__track" tabindex="0" aria-label="Products, scroll horizontally">
      ${cards.map((c, i) => `
      <a class="rcard ${c.dark ? 'rcard--dark' : ''} reveal" style="--d:${i * 0.07}s" href="${href(c.route)}">
        <div class="rcard__img"><img src="${c.img}" alt="" loading="lazy" decoding="async" style="object-position:${c.pos || '50% 50%'}${c.contain ? ';object-fit:contain;background:#050608' : ''}" /></div>
        <div class="rcard__txt">
          <span class="label">${c.kind}</span>
          <h3>${c.title}</h3>
          <p>${c.text}</p>
          <span class="link-arrow">${c.cta || 'Learn more'}</span>
        </div>
      </a>`).join('')}
    </div>
    <div class="rail__ctrl">
      <div class="rail__bar" aria-hidden="true"><i></i></div>
      <button type="button" class="rail__btn" data-rail="prev" aria-label="Previous"><svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 9H3M8 4 3 9l5 5"/></svg></button>
      <button type="button" class="rail__btn" data-rail="next" aria-label="Next">${ARR}</button>
    </div>
  </div>`

/** Constellation : la liste des capacités pilote un schéma de réseau. */
export function constellation(items) {
  const pos = [[20, 24], [80, 24], [80, 76], [20, 76]]
  const ring = [[0, 1], [1, 2], [2, 3], [3, 0]]
  return `
  <div class="const" data-active="0">
    <ul class="const__list">
      ${items.map((c, i) => `
      <li class="const__item reveal" style="--d:${i * 0.08}s">
        <button type="button" aria-expanded="false"><span class="label">0${i + 1}</span><span class="const__name">${c.name}</span></button>
        <div class="const__more"><p>${c.short}</p>${a(c.slug, c.cta, 'link-arrow')}</div>
      </li>`).join('')}
    </ul>
    <div class="const__fig reveal reveal--fade" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        ${ring.map(([x, y]) => `<line class="const__line" data-n="${x} ${y}" x1="${pos[x][0]}" y1="${pos[x][1]}" x2="${pos[y][0]}" y2="${pos[y][1]}"/>`).join('')}
        ${pos.map((p, i) => `<line class="const__line" data-n="${i}" x1="50" y1="50" x2="${p[0]}" y2="${p[1]}"/>`).join('')}
        <circle class="const__core" cx="50" cy="50" r="9"/>
        <image href="/img/s4d-logo.png" x="43.5" y="43.5" width="13" height="13"/>
        ${pos.map((p, i) => `<circle class="const__ring" cx="${p[0]}" cy="${p[1]}" r="6.4"/><circle class="const__dot" cx="${p[0]}" cy="${p[1]}" r="2.2"/>`).join('')}
      </svg>
      ${pos.map((p, i) => `<button type="button" class="const__node ${i < 2 ? 'is-top' : ''}" data-i="${i}" tabindex="-1" style="left:${p[0]}%;top:${p[1]}%" aria-label="${esc(items[i].name)}"><span>${items[i].name}</span></button>`).join('')}
    </div>
  </div>`
}

/** Bande défilante de mots-clés. */
export const marquee = (words) => `
  <div class="marquee" aria-hidden="true"><div class="marquee__in">${[0, 1].map(() => `<ul>${words.map((w) => `<li>${w}</li>`).join('')}</ul>`).join('')}</div></div>`

/** Appel à l'action final, grand format. */
export const cta = ({ title = 'Let’s build the next system together.', text = 'Tell us about your institution and the problem to solve.', label = 'Contact us', route = 'contact', secondary = '' } = {}) => `
  <section class="cta cut-a dark">
    <div class="cta__mesh" aria-hidden="true"></div>
    <div class="wrap cta__in">
      <h2 data-split>${title}</h2>
      <div class="cta__side reveal" style="--d:.2s">
        <p class="lead">${text}</p>
        <div class="cta__btns">${btn(route, label, 'btn--light', 'data-magnet')}${secondary}</div>
      </div>
    </div>
  </section>`

/** Texte + média côte à côte. */
export const split = ({ body, mediaHtml, flip = false, cls = '', align = 'center' }) => `
  <div class="split ${flip ? 'split--flip' : ''} ${cls}" style="align-items:${align}">
    <div class="split__body reveal">${body}</div>
    <div class="split__media">${mediaHtml}</div>
  </div>`

/** Étiquette de section. */
export const head = (label, title, text = '', cls = '') => `
  <div class="shead ${cls}">
    <div><p class="label reveal">${label}</p><h2 data-split>${title}</h2></div>
    ${text ? `<p class="lead reveal" style="--d:.15s">${text}</p>` : ''}
  </div>`

/** Récit mis en avant (grande image) à côté d'une liste compacte. */
export const storyFeature = (lead, rows) => `
  <div class="sfeat">
    <a class="sfeat__lead reveal" href="${href(lead.route)}">
      <div class="sfeat__img"><img src="${lead.img}" alt="" loading="lazy" decoding="async" /></div>
      <div class="sfeat__txt">
        <span class="label">${lead.meta}</span>
        <h3>${lead.title}</h3>
        <p>${lead.text}</p>
        <span class="link-arrow">Read the story</span>
      </div>
    </a>
    <div class="sfeat__list">${ilist(rows, { cls: 'ilist--compact' })}</div>
  </div>`

/** Carte flottante qui chevauche un média. */
export const floatCard = (label, big, text = '') => `
  <div class="float-card reveal" style="--d:.35s"><span class="label">${label}</span><b>${big}</b>${text ? `<p>${text}</p>` : ''}</div>`

export { photo, media, btn, a, href }
