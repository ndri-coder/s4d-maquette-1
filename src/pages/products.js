import { PRODUCTS, STORIES } from '../data/site.js'
import { btn, list } from '../components/ui.js'
import { innerHero, ilist, cta } from '../components/blocks.js'
import { hub, initProductSearch } from './products-hub.js'

const POS = { 'product-nyumba-pms': '50% 72%' }

function detail(p) {
  const rel = STORIES.filter((s) => (p.slug === 'product-learn-hub' && s.slug === 'story-learn-hub') || (p.slug === 'product-nyumba-pms' && ['story-lakeview', 'story-uganda'].includes(s.slug)) || (p.slug === 'product-cognivo' && ['story-ghilmis-helpdesk', 'story-family-health'].includes(s.slug)) || (p.slug === 'product-nhic-hub' && ['story-moh-hie', 'story-data-exchange'].includes(s.slug)) || (['product-edunexus', 'product-edunexus-ai'].includes(p.slug) && s.slug === 'story-uganda'))
  const dark = p.slug === 'product-cognivo'
  const contain = p.slug === 'product-edunexus'
  const aside = `<div class="mask" style="--d:.1s"><div class="ph px"><img src="${p.img}" alt="${p.name}" loading="eager" ${contain ? 'style="object-fit:contain;background:#050608;top:0;height:100%"' : `data-parallax="0.05" style="object-position:${POS[p.slug] || '50% 50%'}"`} /></div></div>`
  return () => `
${innerHero({ eyebrow: p.kind, title: p.name, lead: p.summary, crumbs: [['products', 'Products'], [p.slug, p.name]], actions: btn('contact', p.cta, 'btn--light', 'data-magnet'), aside })}
<section class="section ${dark ? 'dark' : 'paper'}">
  <div class="wrap">
    <div class="two">
      <div>
        <p class="label reveal" style="margin-bottom:18px">The problem it addresses</p>
        <h2 data-split>${p.problem}</h2>
        <div class="audience reveal" style="--d:.2s"><span class="label">Who it is for</span><b>${p.audience}</b></div>
      </div>
      <div class="reveal" style="--d:.1s">
        ${p.features.length ? `<p class="label" style="margin-bottom:16px">What it does</p>${list(p.features, 'rows')}` : ''}
      </div>
    </div>
  </div>
</section>
${rel.length ? `
<section class="section ${dark ? 'white' : 'mist'}">
  <div class="wrap">
    <p class="label reveal" style="margin-bottom:20px">In practice</p>
    ${ilist(rel.map((s) => ({ route: s.slug, title: s.title, meta: `${s.country}<br>${s.area}`, img: s.img })))}
  </div>
</section>` : ''}
${cta({ title: `Interested in ${p.name.replace('™', '')}?`, text: 'Request a consultation or schedule a demo with the S4D team.', label: p.cta })}`
}

export const routes = {
  products: { title: 'Products & Platforms', desc: 'S4D platforms: S4D Cognivo, EduNexus, EduNexus AI, NHIC Hub, Nyumba PMS and S4D Learn Hub.', render: hub, init: initProductSearch },
  ...Object.fromEntries(PRODUCTS.map((p) => [p.slug, { title: p.name, desc: p.summary, render: detail(p) }])),
}
