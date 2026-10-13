import { INSIGHTS, INSIGHT_TYPES } from '../data/site.js'
import { a, href } from '../components/ui.js'
import { innerHero, ilist, cta, head } from '../components/blocks.js'

const hub = () => `
${innerHero({ eyebrow: 'Insights', title: 'Insights &amp; Knowledge Hub', lead: 'Transformation thrives on shared knowledge. S4D brings together thought leadership, research and real-world experience from across Africa’s digital ecosystem.', crumbs: [['insights', 'Insights']] })}
<section class="section paper">
  <div class="wrap">
    ${head('Featured resources', 'From S4D’s own work.', '')}
    ${ilist(INSIGHTS.map((p) => ({ route: p.slug, title: p.title, meta: p.type, text: p.text, img: p.img })))}
  </div>
</section>
<section class="section white">
  <div class="wrap">
    ${head('Browse by type', 'Five ways to explore.', '')}
    <ul class="types">
      ${INSIGHT_TYPES.map((t, i) => `<li class="reveal" style="--d:${i * 0.06}s"><h3>${t.name}</h3><p>${t.text}</p>${t.link ? a(t.link, 'Open', 'link-arrow') : '<span class="soon">Coming soon</span>'}</li>`).join('')}
    </ul>
  </div>
</section>
${cta({ title: 'Want to contribute or collaborate?', text: 'Share an idea, a field story or a research question with the S4D team.' })}`

const detail = (p) => () => `
${innerHero({ eyebrow: p.type, title: p.title, lead: p.text, img: p.img, crumbs: [['insights', 'Insights'], [p.slug, p.title]] })}
<section class="section paper">
  <div class="wrap story-layout">
    <aside class="sticky"><ul class="facts facts--side"><li><span class="label">Type</span><b>${p.type}</b></li><li><span class="label">Topic</span><b>Knowledge hub</b></li></ul></aside>
    <div class="story-body">
      <p class="big reveal">${p.text}</p>
      <p class="reveal">The full document will be published here soon.</p>
      <p class="reveal" style="margin-top:36px">${a('insights', 'All insights', 'link-arrow')}</p>
    </div>
  </div>
</section>
<section class="section white">
  <div class="wrap">
    ${head('Keep reading', 'More from the Knowledge Hub.', '')}
    ${ilist(INSIGHTS.filter((x) => x.slug !== p.slug).map((x) => ({ route: x.slug, title: x.title, meta: x.type, img: x.img })))}
  </div>
</section>
${cta()}`

export const routes = {
  insights: { title: 'Insights & Knowledge Hub', desc: 'Thought leadership, research and field experience from S4D.', render: hub },
  ...Object.fromEntries(INSIGHTS.map((p) => [p.slug, { title: p.title, desc: p.text, render: detail(p) }])),
}
