import { AREAS, PRODUCTS, CAPS, STORIES, INSIGHTS, INDUSTRIES, IMG } from '../data/site.js'
import { btn, a, href, media } from '../components/ui.js'
import { statement, facts, panels, constellation, rail, ilist, marquee, cta, split, head, storyFeature, floatCard } from '../components/blocks.js'
import { initAtlas, ASPECT } from '../lib/atlas.js'

const P = (slug) => PRODUCTS.find((p) => p.slug === slug)
const POS = { 'product-nyumba-pms': '50% 72%' }

function render() {
  const stories = ['story-supply-chain', 'story-ghilmis-helpdesk', 'story-learn-hub', 'story-uganda', 'story-data-exchange', 'story-data-strategy'].map((slug) => STORIES.find((s) => s.slug === slug))
  return `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__mesh" aria-hidden="true"></div>
  <div class="atlas" id="atlas" style="--ar:${ASPECT.toFixed(3)}" aria-label="Map of Africa showing S4D offices and projects">
    <canvas aria-hidden="true"></canvas>
    <ul class="atlas__nodes"></ul>
  </div>
  <div class="wrap hero__in">
    <div class="hero__copy">
      <p class="label hero__kicker reveal">Where technology meets transformation</p>
      <h1 class="hero__h" id="hero-title" data-split>Systems for <em>development.</em></h1>
      <p class="hero__lead reveal" style="--d:.5s">End-to-end digital transformation, from design to intelligence.</p>
      <div class="hero__ctas reveal" style="--d:.65s">
        ${btn('contact', 'Discuss your project', 'btn--light', 'data-magnet')}
        ${a('stories', 'See our work', 'link-arrow')}
      </div>
    </div>
    <div class="hero__meta reveal" style="--d:.8s">
      <p class="label">Systems for Development (S4D) is a global technology company specializing in IT consulting, digital transformation and AI-driven solutions.</p>
      <a class="hero__scroll label" href="#about" data-scroll="intro"><i></i>Scroll</a>
    </div>
  </div>
  ${marquee(['Digital Health', 'Digital Education', 'Property Management', 'Technology Capability Assessment', 'AI & Data', 'System Integration', 'Business Process Re-engineering'])}
</section>

<div id="intro">
${statement('We build AI-driven digital systems for Health, Education and Property, connecting people, data and decisions at national scale.', {
  label: 'What S4D does',
  foot: facts([['2020', 'Founded as a small, minority-owned business'], ['USA', 'Incorporated in the United States'], ['2', 'Operational branches: Ghana and Uganda'], ['3', 'Core markets: Health, Education, Property']]),
})}
</div>

<section class="section white" aria-labelledby="areas-title">
  <div class="wrap">
    ${head('Core areas', 'Where we build.', 'Three markets where digital systems change how institutions serve people, and an assessment practice that gets them ready.')}
    <div class="reveal">${panels(AREAS.map((x) => ({ img: x.img, tab: x.name, title: x.name, text: x.short, route: x.slug, cta: x.cta })))}</div>
  </div>
</section>

<section class="section dark cut-b" aria-labelledby="caps-title">
  <div class="wrap">
    ${head('Capabilities', 'Strategy, design and engineering, powered by AI.', 'Four capabilities that work as one network: our strength lies in AI, data science and interoperability.')}
    ${constellation(CAPS)}
  </div>
</section>

<section class="section paper" aria-labelledby="products-title">
  <div class="wrap">
    ${head('Products & platforms', 'Platforms S4D builds and owns.', 'Intelligent, data-driven platforms that simplify operations, power decision-making and unlock growth.')}
  </div>
  ${rail(
    ['product-cognivo', 'product-edunexus', 'product-edunexus-ai', 'product-nyumba-pms', 'product-nhic-hub', 'product-learn-hub'].map((s, i) => {
      const p = P(s)
      return { route: s, img: p.img, pos: POS[s], contain: s === 'product-edunexus', kind: p.kind, title: p.name, text: p.summary, dark: i === 0, cta: 'Explore ' + p.name.replace('™', '') }
    })
  )}
  <div class="wrap center-row reveal">${btn('products', 'All products', 'btn--ghost')}</div>
</section>

<section class="section dark cut-a" aria-labelledby="stories-title">
  <div class="wrap">
    ${head('Success stories', 'Delivered, not promised.', 'Documented engagements across Africa: health supply chains, data exchange, analytics and AI-powered training.')}
    ${storyFeature(
      { route: stories[0].slug, img: stories[0].img, meta: `${stories[0].country} · ${stories[0].area}`, title: stories[0].title, text: stories[0].summary },
      stories.slice(1).map((s) => ({ route: s.slug, title: s.title, meta: `${s.country} · ${s.area}`, img: s.img }))
    )}
    <p class="more reveal">${btn('stories', 'All success stories', 'btn--light')}</p>
  </div>
</section>

<section class="section white" aria-labelledby="ind-title">
  <div class="wrap">
    ${head('Industries', 'Who we serve.', 'We work with governments, development partners and private organizations across Africa and beyond.')}
    <p class="biglinks reveal">${INDUSTRIES.map((x) => `<span class="bl"><a href="${href(x.link)}">${x.name}</a></span>`).join(' ')}</p>
  </div>
</section>

<section class="section paper" aria-labelledby="insights-title">
  <div class="wrap">
    ${head('Insights & knowledge hub', 'Ideas from the field.', 'Thought leadership, research and real-world experience from Africa’s digital frontier.')}
    ${ilist(INSIGHTS.map((p) => ({ route: p.slug, title: p.title, meta: p.type, text: p.text, img: p.img })))}
  </div>
</section>

<section class="section mist" aria-labelledby="careers-title">
  <div class="wrap">
    ${split({
      body: `<p class="label">Careers</p><h2 data-split>Be the future. Build Africa’s digital transformation with us.</h2><p class="lead">Join a diverse team of thinkers, creators and innovators driving digital transformation across health, education and governance systems in Africa and beyond.</p>${btn('careers', 'Life at S4D', 'btn--ghost')}`,
      mediaHtml: media(IMG.life, 'S4D team members looking at a tablet together', { parallax: 0.08 }) + floatCard('Teams in four countries', 'Zambia · Ghana · Uganda · USA'),
      flip: true,
    })}
  </div>
</section>

${cta({ title: 'Let’s build the next system together.', text: 'Tell us about your institution and the problem to solve. We aim to reply within one to two business days.', label: 'Start a conversation' })}`
}

function init() {
  const el = document.getElementById('atlas')
  return el ? initAtlas(el) : undefined
}

export const routes = {
  home: { title: 'S4D Consulting | Systems for Development', desc: 'S4D Consulting builds AI-driven digital systems for Health, Education and Property across Africa and beyond.', render, init },
}
