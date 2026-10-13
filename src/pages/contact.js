import { OFFICES, SOCIAL, EMAIL, IMG } from '../data/site.js'
import { btn, media, list } from '../components/ui.js'
import { innerHero, split, cta } from '../components/blocks.js'

const formHtml = (id, { withInterest = true, submit = 'Send message', ctx = '' } = {}) => `
<form class="form" id="${id}" novalidate data-ctx="${ctx}">
  <div class="field"><label for="${id}-name">Name</label><input id="${id}-name" name="name" required autocomplete="name" aria-describedby="${id}-name-e" /><span class="err" id="${id}-name-e"></span></div>
  <div class="field"><label for="${id}-email">Email</label><input id="${id}-email" name="email" type="email" required autocomplete="email" aria-describedby="${id}-email-e" /><span class="err" id="${id}-email-e"></span></div>
  <div class="field full"><label for="${id}-org">Organisation <span class="opt">Optional</span></label><input id="${id}-org" name="org" autocomplete="organization" /></div>
  ${withInterest ? `<div class="field full"><label for="${id}-area">I am interested in</label>
    <select id="${id}-area" name="area"><option>Digital Health</option><option>Digital Education</option><option>Property Management</option><option>Technology Capability Assessment</option><option>A product demo</option><option>AI &amp; data</option><option>Careers</option><option>Something else</option></select></div>` : ''}
  <div class="field full"><label for="${id}-msg">Message</label><textarea id="${id}-msg" name="message" required placeholder="A few lines about your organisation and what you need" aria-describedby="${id}-msg-e"></textarea><span class="err" id="${id}-msg-e"></span></div>
  <button class="btn" type="submit"><span>${submit}</span><svg class="arr" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9h12M10 4l5 5-5 5"/></svg></button>
  <p class="form__status" role="status" aria-live="polite"></p>
</form>`

const svg = (inner) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`
const ICON = {
  phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
  mail: svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
  pin: svg('<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
}

const contact = () => `
${innerHero({ eyebrow: 'Contact', title: 'Contact us today.', lead: 'Whether you’re exploring digital transformation, looking for tailored solutions or simply have a question, our team is ready to help.', crumbs: [['contact', 'Contact']], center: true })}
<section class="section paper">
  <div class="wrap cpage">
    <div class="formcard formcard--main reveal">
      <h2>Tell us about your project</h2>
      <p class="formcard__intro">We aim to respond to all inquiries within 1–2 business days.</p>
      ${formHtml('cf')}
    </div>
    <div class="cinfo reveal" style="--d:.1s">
      <ul class="cinfo__list">
        <li><span class="cinfo__icon">${ICON.phone}</span><div><b>Phone</b>${OFFICES.map((o) => `<span>${o.country}: ${o.phone}</span>`).join('')}</div></li>
        <li><span class="cinfo__icon">${ICON.mail}</span><div><b>Email</b><span>${EMAIL}</span></div></li>
        <li><span class="cinfo__icon">${ICON.pin}</span><div><b>Offices</b>${OFFICES.map((o) => `<span>${o.country}: ${o.address}</span>`).join('')}</div></li>
      </ul>
      <h2 class="cinfo__h">Follow S4D</h2>
      <ul class="csocial" aria-label="S4D on social media">
        ${SOCIAL.map((s) => `<li><a href="${s.href}" target="_blank" rel="noopener noreferrer"><span>${s.label}</span><span aria-hidden="true">↗</span><span class="sr-only">(opens in a new tab)</span></a></li>`).join('')}
      </ul>
    </div>
  </div>
</section>
${cta({ title: 'Have a question before you write?', text: 'Our FAQ covers services, working with us and how we handle your data.', label: 'Read the FAQ', route: 'faq' })}`

const careers = () => `
${innerHero({ eyebrow: 'Careers', title: 'Be the future. Build Africa’s digital transformation with us.', lead: 'Join a diverse team of thinkers, creators and innovators driving digital transformation across health, education and governance systems in Africa and beyond.', img: IMG.life, crumbs: [['careers', 'Careers']], actions: `<a class="btn btn--light" href="#open-roles" data-scroll="open-roles"><span>Open roles</span></a>` })}
<section class="section paper">
  <div class="wrap">
    ${split({
      body: `<p class="label">Life at S4D</p><h2 data-split>Innovation thrives where purpose meets people.</h2><p class="lead">A culture defined by collaboration, continuous learning and meaningful impact.</p><p>Our teams work across countries and disciplines, from AI engineering in Zambia to product design in Ghana, business analysis in Uganda and client engagement in the USA. We value diversity, integrity and curiosity.</p>`,
      mediaHtml: media(IMG.teamSmile, 'Three S4D team members smiling'),
    })}
    <div style="margin-top:clamp(48px,7vw,96px)" class="reveal">${list(['Hybrid work culture with cross-country collaboration', 'Continuous growth through mentorship and certification programs', 'Exposure to high-impact projects with global partners', 'A shared belief that technology should enable independence, not dependence'], 'rows')}</div>
  </div>
</section>
<section class="section white" id="open-roles">
  <div class="wrap two">
    <div class="reveal"><p class="label" style="margin-bottom:20px">Open roles</p><h2 data-split>Make a difference.</h2>
    <p class="lead" style="margin-top:24px">Whether you’re a data scientist, project manager, developer or strategist, there’s a place for you at S4D.</p></div>
    <div class="reveal" style="--d:.1s">
      <div class="prose" style="margin-bottom:28px"><h3>No open positions right now</h3><p>Send us a short note about your profile and the team will get back to you.</p></div>
      <div class="formcard" style="background:var(--paper)">${formHtml('cr', { withInterest: false, submit: 'Send interest', ctx: 'careers' })}</div>
    </div>
  </div>
</section>`

export const routes = {
  contact: { title: 'Contact', desc: 'Contact S4D Consulting: offices in the USA, Ghana and Uganda.', render: contact, init: initForms },
  careers: { title: 'Careers', desc: 'Careers at S4D: build Africa’s digital transformation with us.', render: careers, init: initForms },
}

export { formHtml }

/** Validation honnête : aucun envoi réel tant qu'aucun backend n'est connecté. */
export function initForms() {
  document.querySelectorAll('form.form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      let first = null
      const check = (name, msg, test) => {
        const el = form.elements[name]
        if (!el) return
        const err = form.querySelector(`#${el.id}-e`)
        const bad = !test(el.value.trim())
        err.textContent = bad ? msg : ''
        el.setAttribute('aria-invalid', bad ? 'true' : 'false')
        if (bad && !first) first = el
      }
      check('name', 'Please enter your name.', (v) => v.length > 1)
      check('email', 'Please enter a valid email address.', (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v))
      check('message', 'Please write a short message.', (v) => v.length > 4)
      const status = form.querySelector('.form__status')
      if (first) { first.focus(); status.textContent = ''; return }
      status.textContent = 'Thank you. This demo form does not send messages yet.'
    })
  })
}
