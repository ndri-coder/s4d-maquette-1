import { INDUSTRIES } from '../data/site.js'
import { innerHero, statement, ilist, cta } from '../components/blocks.js'

const render = () => `
${innerHero({ eyebrow: 'Industries', title: 'Industries', lead: 'Smart markets, intelligent futures: S4D turns data into decisions across Africa’s most critical sectors.', crumbs: [['industries', 'Industries']] })}
${statement('S4D works in Health, Education and Real Estate, helping governments, development partners and private enterprises harness digital ecosystems that improve efficiency, visibility and impact.', { label: 'Who we serve', cls: 'paper' })}
<section class="section white">
  <div class="wrap">
    ${ilist(INDUSTRIES.map((x) => ({ route: x.link, title: x.name, meta: 'Sector', text: x.text, img: x.img })))}
  </div>
</section>
${cta({ title: 'Tell us about your sector.' })}`

export const routes = {
  industries: { title: 'Industries', desc: 'Sectors S4D serves: health, education, government, real estate, private enterprises and development partners.', render },
}
