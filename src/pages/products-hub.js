import { PRODUCTS, AREAS } from '../data/site.js'
import { href, a } from '../components/ui.js'
import { innerHero, statement, ilist, cta, head } from '../components/blocks.js'

const P = (slug) => PRODUCTS.find((p) => p.slug === slug)
const blurb = (p) => p.summary.split('. ')[0].replace(/\.$/, '') + '.'
const POS = { 'product-nyumba-pms': '50% 72%' }
const CONTAIN = new Set(['product-edunexus']) // logo vertical sur fond noir : affiché en entier
const searchText = (p) => `${p.name} ${p.kind} ${p.area} ${p.summary}`.toLowerCase().replace(/["<>]/g, '')

const media = (p) =>
  `<div class="pm__img"><img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" style="object-position:${POS[p.slug] || '50% 50%'};${CONTAIN.has(p.slug) ? 'object-fit:contain;background:#050608' : ''}" /></div>`

const card = (p, size, i) => `
  <a class="pm pm--${size} reveal" style="--d:${i * 0.07}s" href="${href(p.slug)}" data-search="${searchText(p)}">
    ${media(p)}
    <div class="pm__txt">
      <span class="label">${p.kind}</span>
      <h3>${p.name}</h3>
      <p>${size === 'feat' ? p.summary : blurb(p)}</p>
      <span class="link-arrow">${size === 'feat' ? 'Discover ' + p.name.replace('™', '') : 'Learn more'}</span>
    </div>
  </a>`

const textCard = (p, i) => `
  <a class="pm pm--text reveal" style="--d:${i * 0.07}s" href="${href(p.slug)}" data-search="${searchText(p)}">
    <div class="pm__txt">
      <span class="label">${p.kind}</span>
      <h3>${p.name}</h3>
      <p>${p.summary}</p>
      <span class="link-arrow" style="color:#fff">Learn more</span>
    </div>
  </a>`

export const hub = () => `
${innerHero({ eyebrow: 'S4D products', title: 'Products &amp; Platforms', lead: 'Intelligent, data-driven platforms that simplify operations, power decision-making and unlock growth.', crumbs: [['products', 'Products']] })}

<section class="section paper">
  <div class="wrap">
    ${head('Our platforms', 'Six platforms, three markets.', '')}
    <form class="psearch reveal" role="search" id="psearch-form">
      <label class="sr-only" for="psearch">Search products and platforms</label>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input id="psearch" type="search" placeholder="Search products and platforms" autocomplete="off" />
      <span class="psearch__count" aria-live="polite"></span>
    </form>
    <div class="pmosaic" id="pmosaic">
      ${card(P('product-cognivo'), 'feat', 0)}
      ${card(P('product-edunexus'), 'sm', 1)}
      ${card(P('product-edunexus-ai'), 'sm', 2)}
      ${card(P('product-nyumba-pms'), 'sm', 3)}
      ${card(P('product-nhic-hub'), 'sm', 4)}
      ${textCard(P('product-learn-hub'), 5)}
    </div>
    <p class="psearch__empty" id="psearch-empty" hidden>No product matches your search. Try a market (health, education, property) or a product name.</p>
  </div>
</section>

${statement('Transforming Africa’s digital future, one intelligent platform at a time.', { label: 'Why platforms', cls: 'white' })}

<section class="section paper">
  <div class="wrap">
    ${head('Built for three markets', 'Each platform serves a core area.', '')}
    ${ilist(AREAS.slice(0, 3).map((x) => ({ route: x.slug, title: x.name, meta: 'Core area', text: x.short, img: x.img })))}
  </div>
</section>
${cta({ title: 'Schedule a demo.', text: 'Powering digital transformation across education, health and enterprise: whether you manage a school, a national data hub or a property portfolio, S4D platforms deliver the automation, analytics and insight you need.', label: 'Schedule a demo' })}`

export function initProductSearch() {
  const input = document.getElementById('psearch')
  const form = document.getElementById('psearch-form')
  const grid = document.getElementById('pmosaic')
  const empty = document.getElementById('psearch-empty')
  if (!input || !grid) return
  const cards = [...grid.querySelectorAll('.pm')]
  const count = form.querySelector('.psearch__count')
  form.addEventListener('submit', (e) => e.preventDefault())
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase()
    let n = 0
    cards.forEach((c) => {
      const show = !q || q.split(/\s+/).every((w) => c.dataset.search.includes(w))
      c.hidden = !show
      if (show) n++
    })
    grid.classList.toggle('is-filtering', !!q)
    empty.hidden = n > 0
    count.textContent = q ? n + (n === 1 ? ' result' : ' results') : ''
  })
}
