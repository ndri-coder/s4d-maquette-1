import { AREAS, PRODUCTS, CAPS, STORIES, IMG } from '../data/site.js'
import { btn, a, href, media, list } from '../components/ui.js'
import { innerHero, statement, ilist, panels, cta, split, head } from '../components/blocks.js'

const find = (arr, slug) => arr.find((x) => x.slug === slug)

const hub = () => `
${innerHero({ eyebrow: 'Core areas', title: 'Core Areas', lead: 'Our core areas define where S4D delivers the greatest impact, translating technology into measurable outcomes across public and private sectors.', crumbs: [['core-areas', 'Core Areas']] })}
<section class="section white">
  <div class="wrap reveal">${panels(AREAS.map((x) => ({ img: x.img, tab: x.name, title: x.name, text: x.short, route: x.slug, cta: x.cta })))}</div>
</section>
${statement('Each area reflects deep domain expertise, local insight and a commitment to data-driven systems that enable smarter decisions, stronger institutions and sustainable growth.', { label: 'Our approach', cls: 'paper' })}
${cta()}`

function detail(x) {
  const products = x.products.map((s) => find(PRODUCTS, s))
  const stories = x.stories.map((s) => find(STORIES, s))
  return () => `
${innerHero({ eyebrow: 'Core area', title: x.name, lead: x.short, img: x.img, crumbs: [['core-areas', 'Core Areas'], [x.slug, x.name]], actions: btn('contact', x.cta, 'btn--light') })}
<section class="section paper">
  <div class="wrap">
    <div class="two two--stmt">
      <div>
        <p class="label reveal" style="margin-bottom:18px">What we do</p>
        <p class="stmt-sm" data-lit>${x.what[0]}</p>
        ${x.what[1] ? `<p class="reveal" style="margin-top:24px;color:var(--muted);max-width:56ch">${x.what[1]}</p>` : ''}
      </div>
      <div class="reveal" style="--d:.1s"><p class="label" style="margin-bottom:16px">Solutions</p>${list(x.solutions, 'rows')}</div>
    </div>
  </div>
</section>
${products.length ? `
<section class="section white">
  <div class="wrap">
    ${head('Platforms', 'Built for this area.', '')}
    <div class="rgrid">
      ${products.map((p, i) => `
      <a class="rcard ${i === 0 ? 'rcard--dark' : ''} reveal" style="--d:${i * 0.08}s" href="${href(p.slug)}">
        <div class="rcard__img"><img src="${p.img}" alt="" loading="lazy" style="${p.slug === 'product-edunexus' ? 'object-fit:contain;background:#050608' : ''}${p.slug === 'product-nyumba-pms' ? 'object-position:50% 72%' : ''}" /></div>
        <div class="rcard__txt"><span class="label">${p.kind}</span><h3>${p.name}</h3><p>${p.summary}</p><span class="link-arrow">Explore ${p.name.replace('™', '')}</span></div>
      </a>`).join('')}
    </div>
  </div>
</section>` : ''}
<section class="section dark">
  <div class="wrap">
    ${head('Success stories', 'Where we have done it.', '')}
    ${ilist(stories.slice(0, 5).map((s) => ({ route: s.slug, title: s.title, meta: `${s.country}<br>${s.area}`, img: s.img })))}
  </div>
</section>
<section class="section white">
  <div class="wrap">
    ${head('Capabilities', 'How we deliver.', '')}
    <div class="chips reveal">${x.caps.map((c) => a(c, find(CAPS, c).name, 'chip')).join('')}</div>
  </div>
</section>
${cta({ title: `Talk to us about ${x.name.toLowerCase()}.` })}`
}

export const routes = {
  'core-areas': { title: 'Core Areas', desc: 'S4D core areas: Digital Health, Digital Education, Property Management and Technology Capability Assessment.', render: hub },
  ...Object.fromEntries(AREAS.map((x) => [x.slug, { title: x.name, desc: x.short, render: detail(x) }])),
}
