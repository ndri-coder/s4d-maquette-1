import { STORIES } from '../data/site.js'
import { a, href, media } from '../components/ui.js'
import { innerHero, ilist, cta, head } from '../components/blocks.js'

const FILTERS = [['all', 'All'], ['Health', 'Health'], ['Education', 'Education'], ['Property', 'Property'], ['AI', 'AI']]
const site = STORIES.filter((s) => s.source === 'site')
const soon = STORIES.filter((s) => s.source === 'review')

const hub = () => `
${innerHero({ eyebrow: 'Success stories', title: 'Success Stories', lead: 'How S4D solutions transform systems and strengthen institutions across health, education and property.', crumbs: [['stories', 'Success Stories']] })}
<section class="section dark">
  <div class="wrap">
    <div class="filters reveal" role="group" aria-label="Filter by market">
      ${FILTERS.map(([k, l], i) => `<button type="button" class="chip" data-filter="${k}" aria-pressed="${i === 0}">${l}</button>`).join('')}
    </div>
    <div id="story-list">
      ${ilist(site.map((s) => ({ route: s.slug, title: s.title, meta: `${s.country}<br>${s.area}`, text: s.summary, img: s.img })))}
    </div>
    <p class="soon" id="story-empty" hidden style="margin-top:28px">No story in this market yet.</p>
  </div>
</section>
<section class="section paper">
  <div class="wrap">
    ${head('Coming soon', 'More stories on the way.', 'More engagements are being documented as full case studies.')}
    <ul class="prep">
      ${soon.map((s, i) => `<li class="reveal" style="--d:${i * 0.06}s"><a href="${href(s.slug)}"><span class="label">${s.country}</span><h3>${s.title}</h3><span class="soon">Case study coming soon</span></a></li>`).join('')}
    </ul>
  </div>
</section>
${cta({ title: 'Have a challenge like these?' })}`

function initStories() {
  const wrap = document.getElementById('story-list')
  if (!wrap) return
  const rows = [...wrap.querySelectorAll('li')]
  const btns = [...document.querySelectorAll('[data-filter]')]
  const empty = document.getElementById('story-empty')
  btns.forEach((b) =>
    b.addEventListener('click', () => {
      const k = b.dataset.filter
      btns.forEach((o) => o.setAttribute('aria-pressed', String(o === b)))
      let n = 0
      rows.forEach((li, i) => {
        const area = site[i].area
        const show = k === 'all' || area.includes(k)
        li.hidden = !show
        if (show) n++
      })
      empty.hidden = n > 0
    })
  )
}

function detail(s) {
  const same = STORIES.filter((x) => x.slug !== s.slug && x.source === 'site')
  const more = (same.filter((x) => x.area.split(' ')[0] === s.area.split(' ')[0]).concat(same)).filter((x, i, arr) => arr.indexOf(x) === i).slice(0, 3)
  const facts = [['Market', s.area], ['Country', s.country], ['Client or funder', s.client]].filter(([, v]) => v && !/to be confirmed/i.test(v))
  return () => `
${innerHero({ eyebrow: `Success story · ${s.country}`, title: s.title, crumbs: [['stories', 'Success Stories'], [s.slug, s.title]], img: s.img })}
<section class="section paper">
  <div class="wrap story-layout">
    <aside class="sticky">
      <ul class="facts facts--side">
        ${facts.map(([k, v], i) => `<li class="reveal" style="--d:${i * 0.08}s"><span class="label">${k}</span><b>${v}</b></li>`).join('')}
      </ul>
    </aside>
    <div class="story-body">
      <p class="big reveal">${s.summary}</p>
      ${s.source === 'site' ? '' : '<p class="reveal">The full case study for this project is coming soon.</p>'}
      <p class="reveal" style="margin-top:36px">${a('stories', 'All success stories', 'link-arrow')}</p>
    </div>
  </div>
</section>
<section class="section dark">
  <div class="wrap">
    ${head('More stories', 'Related work.', '')}
    ${ilist(more.map((x) => ({ route: x.slug, title: x.title, meta: `${x.country}<br>${x.area}`, img: x.img })))}
  </div>
</section>
${cta({ title: 'Let’s build your next success story.' })}`
}

export const routes = {
  stories: { title: 'Success Stories', desc: 'Documented S4D engagements across health, education and property.', render: hub, init: initStories },
  ...Object.fromEntries(STORIES.map((s) => [s.slug, { title: s.title, desc: s.summary, render: detail(s) }])),
}
