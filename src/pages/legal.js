import { NAV, LIVE, EMAIL, OFFICES, STORIES, INSIGHTS } from '../data/site.js'
import { a, href, section } from '../components/ui.js'
import { innerHero, cta } from '../components/blocks.js'
const pageHero = (o) => innerHero({ ...o, theme: 'light' })
const ctaBand = (title) => cta({ title })

const FAQ = [
  ['What services does S4D Consulting provide?', 'We provide consulting services in data strategy, analytics, digital transformation, technology modernization and public sector advisory.'],
  ['Who are your typical clients?', 'Our clients include government agencies, nonprofits, healthcare organizations and private-sector companies.'],
  ['Where is S4D Consulting located?', 'We operate internationally, with offices in the United States, Uganda, Zambia and Ghana, and serve clients globally.'],
  ['How can I contact S4D Consulting?', `You can reach us through the contact form on our website or by emailing ${EMAIL}.`],
  ['How quickly do you respond to inquiries?', 'We aim to respond to all inquiries within 1–2 business days.'],
  ['Do you offer customized consulting solutions?', 'Yes. All of our services are tailored to meet each client’s specific needs and goals.'],
  ['Do you work with small organizations or startups?', 'Yes. We work with organizations of all sizes, from startups to large enterprises.'],
  ['How do I request a consultation?', `Complete the contact form on our website or email ${EMAIL}.`],
  ['What industries do you specialize in?', 'Our expertise includes public health, government, technology, data analytics and social impact sectors.'],
  ['Is my personal information secure?', 'Yes. We take data protection seriously and implement reasonable security measures to safeguard your information.'],
  ['Do you share my data with third parties?', 'We do not sell personal data. Information may only be shared with trusted service providers or when legally required.'],
  ['Does your website use cookies?', 'Yes. We use cookies to improve website performance, analyze traffic and enhance user experience.'],
  ['Can I disable cookies?', 'Yes. You can manage or disable cookies through your browser settings.'],
  ['How can I report an accessibility issue?', `Please email ${EMAIL} with details of the issue you experienced.`],
  ['Do you offer ongoing support after a project is completed?', 'Yes. We offer post-engagement support depending on the scope of the project.'],
  ['What is your project onboarding process?', 'Our onboarding process includes discovery, needs assessment, proposal development and project kickoff.'],
  ['Do you provide training or knowledge transfer?', 'Yes. We often include training and documentation as part of our consulting engagements.'],
  ['Are your services available remotely?', 'Yes. We offer both remote and on-site consulting, depending on client needs.'],
  ['How are consulting fees determined?', 'Fees are based on project scope, duration and complexity. We provide transparent pricing in advance.'],
  ['Can I request changes to my personal data?', `Yes. You may request access, correction or deletion of your personal data by contacting ${EMAIL}.`],
  ['Where can I find your legal policies?', 'Our Privacy Policy, Terms of Use, Cookie Policy and Accessibility Statement are available on our website.'],
]

const faq = () => `
${pageHero({ eyebrow: 'Help center', title: 'Frequently asked questions', lead: 'Answers about S4D’s services, working with us, and how we handle your data.', crumbs: [['faq', 'FAQ']] })}
<section class="section paper"><div class="wrap">${`<div class="faq">${FAQ.map(([q, r], i) => `<details class="reveal"><summary>${q}</summary><p>${r}</p></details>`).join('')}</div>`}</div></section>
${ctaBand('Still have a question?')}`

const legalPage = (key, title, live) => () => `
${pageHero({ eyebrow: 'Policies', title, lead: 'How S4D handles this topic, as published on the S4D website.', crumbs: [[key, title]] })}
<section class="section paper"><div class="wrap">
  <div class="prose reveal">
    <h2>${title}</h2>
    <p>Our ${title} is available on the S4D website: <a href="${LIVE}/${live}/" target="_blank" rel="noopener noreferrer">Read the ${title} (opens in a new tab)</a>.</p>
  </div></div></section>`

const privacy = legalPage('privacy', 'Privacy Policy', 's4d-corporate-privacy-policy')
const terms = legalPage('terms', 'Terms of Use', 'terms-of-use')
const cookies = legalPage('cookies', 'Cookie Policy', 'cookie-policy')

const accessibility = () => `
${pageHero({ eyebrow: 'Policies', title: 'Accessibility Statement', lead: 'S4D Consulting is committed to ensuring digital accessibility for all users, including people with disabilities.', crumbs: [['accessibility', 'Accessibility Statement']] })}
<section class="section paper"><div class="wrap">
  <div class="prose reveal">
    <h2>Our commitment</h2>
    <p>We are continually improving the user experience for everyone and applying relevant accessibility standards. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.</p>
    <h2>Measures we take</h2>
    <ul class="ticks"><li>Regularly reviewing and testing our website for accessibility issues</li><li>Providing alternative text for images</li><li>Ensuring sufficient color contrast for readability</li><li>Designing for keyboard navigation and screen reader compatibility</li></ul>
    <h2>Feedback &amp; support</h2>
    <p>If you experience any difficulty accessing content on our site, please contact us at ${EMAIL} or ${OFFICES[1].phone}. We welcome your feedback and will make reasonable efforts to address any accessibility concerns promptly.</p>
    <p class="note">Date of the published statement: 13 January 2026.</p>
  </div></div></section>`

const sitemap = () => {
  const lists = [
    ['Main', [['home', 'Home'], ['contact', 'Contact'], ['careers', 'Careers']]],
    ...NAV.filter((n) => n.children).map((n) => [n.label, n.children.map((c) => [c.route, c.label])]),
    ['Industries & insights', [['industries', 'Industries'], ['insights', 'Insights & Knowledge Hub'], ...INSIGHTS.map((i) => [i.slug, i.title])]],
    ['Success stories', [['stories', 'All success stories'], ...STORIES.map((s) => [s.slug, s.title])]],
    ['Help & policies', [['faq', 'FAQ'], ['privacy', 'Privacy Policy'], ['terms', 'Terms of Use'], ['cookies', 'Cookie Policy'], ['accessibility', 'Accessibility Statement']]],
  ]
  return `
${pageHero({ eyebrow: 'Help center', title: 'Site map', crumbs: [['sitemap', 'Site map']] })}
<section class="section paper"><div class="wrap"><div class="sitemap">${lists.map(([h, items]) => `<div class="reveal"><h3>${h}</h3><ul>${items.map(([r, l]) => `<li><a href="${href(r)}">${l}</a></li>`).join('')}</ul></div>`).join('')}</div></div></section>`
}

const notFound = () => `
${pageHero({ eyebrow: '404', title: 'This page does not exist.', lead: 'The link may be mistyped or the page no longer exists.', crumbs: [] , actions: '<a class="btn" href="#home"><span>Back to home</span></a>' })}`

export const routes = {
  faq: { title: 'FAQ', desc: 'Frequently asked questions about S4D Consulting.', render: faq },
  privacy: { title: 'Privacy Policy', desc: 'S4D privacy policy.', render: privacy },
  terms: { title: 'Terms of Use', desc: 'S4D terms of use.', render: terms },
  cookies: { title: 'Cookie Policy', desc: 'S4D cookie policy.', render: cookies },
  accessibility: { title: 'Accessibility Statement', desc: 'S4D accessibility statement.', render: accessibility },
  sitemap: { title: 'Site map', desc: 'All pages of the S4D website.', render: sitemap },
  'not-found': { title: 'Page not found', desc: 'Page not found.', render: notFound },
}
