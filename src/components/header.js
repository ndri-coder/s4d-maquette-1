import { NAV } from '../data/site.js'
import { href } from './ui.js'
import { initTranslate } from './translate.js'

export function Header() {
  const items = NAV.map((n, i) => {
    if (!n.children) return `<li class="nav__item"><a class="nav__link" href="${href(n.route)}" data-route="${n.route}">${n.label}</a></li>`
    return `
    <li class="nav__item has-sub">
      <a class="nav__link" href="${href(n.route)}" data-route="${n.route}">${n.label}</a>
      <button class="nav__toggle" aria-expanded="false" aria-controls="sub-${i}" aria-label="Show ${n.label} pages"><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button>
      <ul class="sub" id="sub-${i}">${n.children[0].route === n.route ? '' : `<li class="sub__all"><a href="${href(n.route)}"><span>All ${n.label}</span><span aria-hidden="true">→</span></a></li>`}${n.children.map((c) => `<li><a href="${href(c.route)}"><span class="sub__t">${c.label}</span>${c.desc ? `<span class="sub__d">${c.desc}</span>` : ''}</a></li>`).join('')}</ul>
    </li>`
  }).join('')
  return `
  <header class="header" id="top">
    <div class="wrap header__bar">
      <a class="brand" href="#home" aria-label="S4D Consulting, home">
        <img src="/img/s4d-logo.png" alt="" width="48" height="48" />
        <span><b>S4D Consulting</b><small>Systems for Development</small></span>
      </a>
      <nav class="nav" id="nav" aria-label="Main navigation">
        <div class="nav__head">
          <a class="brand" href="#home" aria-label="S4D Consulting, home"><img src="/img/s4d-logo.png" alt="" width="40" height="40" /><span><b>S4D Consulting</b><small>Systems for Development</small></span></a>
          <button class="nav__close" type="button" aria-label="Close menu"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 3l12 12M15 3L3 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
        </div>
        <ul>${items}</ul>
        <div class="nav__foot"><a class="btn btn--primary" href="#contact">Contact us</a><p>Systems for Development</p></div>
      </nav>
      <div class="langwrap">
        <button class="lang" type="button" id="lang-toggle" aria-pressed="false" aria-controls="lang-pop" aria-label="Translate this site to French">FR</button>
        <div class="langpop" id="lang-pop" role="dialog" aria-label="Translate this page" hidden>
          <p><b>Read this site in French</b></p>
          <p>Use your browser’s translation: in Chrome or Edge, right-click the page and choose <i>Translate to French</i>, or use the translate icon in the address bar. In Safari, open the <i>aA</i> menu and choose <i>Translate to French</i>.</p>
          <button type="button" class="langpop__close">Close</button>
        </div>
      </div>
      <div id="gt-el" class="gt-hidden" aria-hidden="true"></div>
      <a class="btn btn--primary header__cta" href="#contact">Contact us</a>
      <button class="burger" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><span></span></button>
    </div>
    <div class="scrim" id="scrim" aria-hidden="true"></div>
  </header>`
}

export function initHeader() {
  const header = document.querySelector('.header')
  const nav = document.getElementById('nav')
  const burger = document.querySelector('.burger')
  // fond plein après le haut de page ; l'en-tête se retire en descendant et revient en remontant
  let lastY = window.scrollY
  const onScroll = () => {
    const y = window.scrollY
    header.classList.toggle('is-solid', y > 40)
    const down = y > lastY && y > 320
    header.classList.toggle('is-hidden', down && !nav.classList.contains('open') && !header.contains(document.activeElement) && !header.querySelector('.has-sub.open'))
    lastY = y
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  const scrim = document.getElementById('scrim')
  const closeBtn = nav.querySelector('.nav__close')
  const inertTargets = () => [document.getElementById('main'), document.querySelector('.footer')].filter(Boolean)
  const collapseSubs = () => nav.querySelectorAll('.has-sub').forEach((li) => { li.classList.remove('open'); li.querySelector('.nav__toggle').setAttribute('aria-expanded', 'false') })
  // tiroir latéral (écrans ≤ 1400 px) : ouverture, fermeture, défilement bloqué, focus
  const setOpen = (open) => {
    nav.classList.toggle('open', open)
    document.documentElement.classList.toggle('nav-open', open)
    burger.setAttribute('aria-expanded', String(open))
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    inertTargets().forEach((el) => (open ? el.setAttribute('inert', '') : el.removeAttribute('inert')))
    if (open) requestAnimationFrame(() => closeBtn.focus({ preventScroll: true }))
    else collapseSubs()
  }
  const closeAll = () => { if (nav.classList.contains('open')) setOpen(false) }
  burger.addEventListener('click', () => setOpen(!nav.classList.contains('open')))
  closeBtn.addEventListener('click', () => { setOpen(false); burger.focus({ preventScroll: true }) })
  scrim.addEventListener('click', () => setOpen(false))
  window.matchMedia('(min-width: 1401px)').addEventListener('change', (e) => e.matches && setOpen(false))
  nav.querySelectorAll('.nav__toggle').forEach((btn) =>
    btn.addEventListener('click', () => {
      const li = btn.parentElement
      const open = !li.classList.contains('open')
      nav.querySelectorAll('.has-sub').forEach((o) => { o.classList.remove('open'); o.querySelector('.nav__toggle').setAttribute('aria-expanded', 'false') })
      li.classList.toggle('open', open)
      btn.setAttribute('aria-expanded', String(open))
    })
  )
  // fermeture : lien choisi, Échap, clic ailleurs
  nav.addEventListener('click', (e) => e.target.closest('.sub a, .nav__link, .nav__foot a') && closeAll())
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); burger.focus({ preventScroll: true }) } })
  document.addEventListener('click', (e) => !e.target.closest('.nav') && collapseSubs())
  window.addEventListener('hashchange', () => { closeAll(); collapseSubs() })
  initTranslate()
}

/** Met en évidence la rubrique courante. */
export function markActive(route) {
  document.querySelectorAll('.sub a').forEach((l) => l.classList.toggle('is-current', l.getAttribute('href') === '#' + route))
  document.querySelectorAll('.nav__link').forEach((l) => {
    const r = l.dataset.route
    const group = NAV.find((n) => n.route === r)
    const on = r === route || (group?.children || []).some((c) => c.route === route)
    l.classList.toggle('active', on)
    on ? l.setAttribute('aria-current', 'page') : l.removeAttribute('aria-current')
  })
}
