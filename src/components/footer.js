import { SOCIAL, OFFICES, EMAIL } from '../data/site.js'
import { href } from './ui.js'

const li = (route, label) => `<li><a href="${href(route)}">${label}</a></li>`

export function Footer() {
  return `
  <footer class="footer">
    <div class="wrap footer__grid">
      <div>
        <a class="brand" href="#home"><img src="/img/s4d-logo.png" alt="" width="46" height="46" /><span><b>S4D Consulting</b><small>Systems for Development</small></span></a>
        <p class="footer__about">Systems for Development (S4D) is a global technology company specializing in IT consulting, digital transformation and AI-driven solutions. Founded in 2020 as a small, minority-owned business, incorporated in the United States, with fully operational branches in Ghana and Uganda.</p>
        <ul class="social" aria-label="S4D on social media">
          ${SOCIAL.map((s) => `<li><a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="S4D on ${s.label} (opens in a new tab)">${s.label}</a></li>`).join('')}
        </ul>
      </div>
      <div><h4>Explore</h4><ul>
        ${li('about', 'About S4D')}${li('core-areas', 'Core Areas')}${li('products', 'Products')}${li('capabilities', 'Capabilities')}${li('industries', 'Industries')}${li('insights', 'Insights')}${li('stories', 'Success Stories')}${li('careers', 'Careers')}${li('contact', 'Contact')}
      </ul></div>
      <div><h4>Help</h4><ul>
        ${li('faq', 'FAQ')}${li('contact', 'Support')}${li('sitemap', 'Site map')}
      </ul>
      <h4 style="margin-top:32px">Policies</h4><ul>
        ${li('privacy', 'Privacy Policy')}${li('terms', 'Terms of Use')}${li('cookies', 'Cookie Policy')}${li('accessibility', 'Accessibility Statement')}
      </ul></div>
      <div><h4>Offices</h4><ul class="offices">
        ${OFFICES.map((o) => `<li><b>${o.country}</b><br />${o.phone}</li>`).join('')}
        <li>${EMAIL}</li>
      </ul></div>
    </div>
    <p class="footer__mark" aria-hidden="true">S4D</p>
    <div class="footer__bottom"><div class="wrap" style="display:flex;flex-wrap:wrap;gap:12px 28px;justify-content:space-between;width:100%"><span>© 2026 S4D Consulting</span><span>Systems for Development</span></div></div>
  </footer>`
}
