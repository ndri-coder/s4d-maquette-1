import { CAPS, PRODUCTS, STORIES } from '../data/site.js'
import { btn, href, media, list } from '../components/ui.js'
import { innerHero, statement, ilist, constellation, cta, head } from '../components/blocks.js'

const hub = () => `
${innerHero({ eyebrow: 'Capabilities', title: 'Capabilities', lead: 'Strategy, design and engineering: end-to-end solutions built on AI, data science and interoperability, from design to intelligence.', crumbs: [['capabilities', 'Capabilities']] })}
${statement('Our strength lies in strategy, design and engineering, delivering end-to-end solutions powered by AI, data science and interoperability.', { label: 'How we work', cls: 'paper' })}
<section class="section dark">
  <div class="wrap">
    ${head('Four capabilities', 'One connected network.', '')}
    ${constellation(CAPS)}
  </div>
</section>
${cta()}`

function detail(c) {
  const prods = c.products.map((s) => PRODUCTS.find((x) => x.slug === s))
  const stories = c.stories.map((s) => STORIES.find((x) => x.slug === s))
  return () => `
${innerHero({ eyebrow: 'Capability', title: c.name, lead: c.short, crumbs: [['capabilities', 'Capabilities'], [c.slug, c.name]], actions: btn('contact', c.cta, 'btn--light') })}
<section class="section paper">
  <div class="wrap">
    <div class="two">
      <div class="reveal"><p class="label" style="margin-bottom:20px">Our approach</p><h2 data-split>${c.name}.</h2>${c.body.map((p, i) => `<p ${i === 0 ? 'class="lead" style="margin-top:24px"' : 'style="margin-top:16px"'}>${p}</p>`).join('')}</div>
      <div>${media(c.img, c.name, { ratio: '4 / 3.4' })}</div>
    </div>
  </div>
</section>
<section class="section dark">
  <div class="wrap">
    <div class="two">
      <div class="reveal"><p class="label" style="margin-bottom:20px">In S4D’s work</p><h2 data-split>Where you can see it.</h2></div>
      <div class="reveal" style="--d:.1s">${list(c.seen, 'rows')}</div>
    </div>
  </div>
</section>
${prods.length ? `
<section class="section white">
  <div class="wrap">
    ${head('Platforms', 'Products that use it.', '')}
    <div class="rgrid">
      ${prods.map((p, i) => `
      <a class="rcard ${i === 0 ? 'rcard--dark' : ''} reveal" style="--d:${i * 0.08}s" href="${href(p.slug)}">
        <div class="rcard__img"><img src="${p.img}" alt="" loading="lazy" /></div>
        <div class="rcard__txt"><span class="label">${p.kind}</span><h3>${p.name}</h3><p>${p.summary}</p><span class="link-arrow">Explore ${p.name.replace('™', '')}</span></div>
      </a>`).join('')}
    </div>
  </div>
</section>` : ''}
<section class="section ${prods.length ? 'paper' : 'white'}">
  <div class="wrap">
    ${head('Success stories', 'Proof in practice.', '')}
    ${ilist(stories.map((s) => ({ route: s.slug, title: s.title, meta: `${s.country}<br>${s.area}`, img: s.img })))}
  </div>
</section>
${cta({ title: `Talk to us about ${c.name}.` })}`
}

export const routes = {
  capabilities: { title: 'Capabilities', desc: 'S4D capabilities: AI, data and decision intelligence, business process re-engineering and system integration.', render: hub },
  ...Object.fromEntries(CAPS.map((c) => [c.slug, { title: c.name, desc: c.short, render: detail(c) }])),
}
