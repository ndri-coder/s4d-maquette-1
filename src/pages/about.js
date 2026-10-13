import { VALUES, IMG, AREAS } from '../data/site.js'
import { btn, a, media, href } from '../components/ui.js'
import { innerHero, statement, facts, ilist, cta, split, head, floatCard } from '../components/blocks.js'

const TABS = [['about', 'Who we are'], ['about-values', 'Purpose & values'], ['about-people', 'Our people'], ['about-governance', 'Governance & ethics'], ['newsroom', 'Newsroom']]
const sub = (cur) => `
  <nav class="subnav" aria-label="About S4D"><div class="wrap" style="display:flex;gap:6px 28px;flex-wrap:wrap">
    ${TABS.map(([r, l]) => `<a href="${href(r)}" ${r === cur ? 'aria-current="page"' : ''}>${l}</a>`).join('')}
  </div></nav>`

const about = () => `
${innerHero({ eyebrow: 'About us', title: 'Who we are', lead: 'We are a purpose-driven digital transformation partner, blending global expertise with local innovation to empower governments, donors and enterprises.', img: IMG.teamSmile, crumbs: [['about', 'About S4D']] })}
${sub('about')}
${statement('At Systems for Development, we transform how organizations operate by using data, intelligence and technology to drive sustainable impact across Africa and beyond.', {
  label: 'Our positioning',
  foot: facts([['2020', 'Year S4D was founded'], ['USA', 'Incorporated in the United States'], ['Ghana', 'Fully operational branch'], ['Uganda', 'Fully operational branch']]),
})}
<section class="section white">
  <div class="wrap">
    ${split({
      body: `<p class="label">What we do</p><h2 data-split>A technology partner that builds, owns and operates.</h2><p class="lead">S4D is a global technology company specializing in IT consulting, digital transformation and AI-driven solutions. Founded in 2020 as a small, minority-owned business.</p><p>We design the systems institutions rely on, from national health supply chains to school and property management platforms, and we own the platforms we deliver.</p>${btn('capabilities', 'Our capabilities', 'btn--ghost')}`,
      mediaHtml: media(IMG.team, 'S4D team members collaborating at a screen') + floatCard('Systems for Development', 'S4D', 'IT consulting, digital transformation and AI-driven solutions.'),
    })}
  </div>
</section>
<section class="section paper">
  <div class="wrap">
    ${head('Three markets', 'Where S4D works.', '')}
    ${ilist(AREAS.slice(0, 3).map((x) => ({ route: x.slug, title: x.name, meta: 'Core area', text: x.short, img: x.img })))}
  </div>
</section>
${cta()}`

const values = () => `
${innerHero({ eyebrow: 'About S4D', title: 'Purpose &amp; values', lead: 'We exist to empower progress through technology, guided by integrity, inclusion, innovation and measurable impact.', crumbs: [['about', 'About S4D'], ['about-values', 'Purpose & values']] })}
${sub('about-values')}
<section class="section paper">
  <div class="wrap">
    <ul class="vals">
      ${VALUES.map((v, i) => `<li class="reveal" style="--d:${i * 0.05}s"><h2>${v.name}</h2><p>${v.text}</p></li>`).join('')}
    </ul>
  </div>
</section>
${cta()}`

const people = () => `
${innerHero({ eyebrow: 'About S4D', title: 'Our people', lead: 'A multidisciplinary team of technologists, data scientists and innovators united by a shared mission to redefine Africa’s digital future.', img: IMG.life, crumbs: [['about', 'About S4D'], ['about-people', 'Our people']] })}
${sub('about-people')}
<section class="section paper">
  <div class="wrap">
    ${split({
      body: `<p class="label">Teams across four countries</p><h2 data-split>Built across borders.</h2><p class="lead">Our teams work across countries and disciplines: AI engineering in Zambia, product design in Ghana, business analysis in Uganda and client engagement in the USA.</p><p>We value diversity, integrity and curiosity, and we invest in our people to grow as fast as we do.</p>${btn('careers', 'Careers at S4D', 'btn--ghost')}`,
      mediaHtml: media(IMG.teamSmile, 'Three S4D team members smiling'),
    })}
  </div>
</section>
${cta()}`

const governance = () => `
${innerHero({ eyebrow: 'About S4D', title: 'Governance &amp; ethics', lead: 'Integrity is at the heart of everything we do, guiding how we transform systems, empower progress and build trust through transparency and accountability in every engagement.', crumbs: [['about', 'About S4D'], ['about-governance', 'Governance & ethics']] })}
${sub('about-governance')}
<section class="section paper">
  <div class="wrap">
    <div class="prose reveal">
      <h2>Our policies</h2>
      <p>Published policies: ${a('privacy', 'Privacy Policy')}, ${a('terms', 'Terms of Use')}, ${a('cookies', 'Cookie Policy')} and ${a('accessibility', 'Accessibility Statement')}.</p>
    </div>
  </div>
</section>
${cta()}`

const newsroom = () => `
${innerHero({ eyebrow: 'About S4D', title: 'Newsroom', lead: 'News from S4D and its work with partners and governments.', crumbs: [['about', 'About S4D'], ['newsroom', 'Newsroom']] })}
${sub('newsroom')}
<section class="section paper">
  <div class="wrap">
    <div class="prose reveal">
      <h2>Latest news</h2>
      <p>News and press releases from S4D will be published here.</p>
    </div>
  </div>
</section>
${cta()}`

export const routes = {
  about: { title: 'About S4D', desc: 'Who S4D is: a purpose-driven digital transformation partner with offices in the USA, Ghana and Uganda.', render: about },
  'about-values': { title: 'Purpose & values', desc: 'S4D’s purpose and values: integrity, inclusion, innovation and measurable impact.', render: values },
  'about-people': { title: 'Our people', desc: 'The multidisciplinary S4D team across the USA, Ghana, Uganda and Zambia.', render: people },
  'about-governance': { title: 'Governance & ethics', desc: 'Integrity, transparency and accountability at S4D.', render: governance },
  newsroom: { title: 'Newsroom', desc: 'News from S4D.', render: newsroom },
}
