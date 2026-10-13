import '@fontsource-variable/bricolage-grotesque/wdth.css'
import '@fontsource-variable/instrument-sans'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/pages.css'
import { Header, initHeader, markActive } from './components/header.js'
import { Footer } from './components/footer.js'
import { splitWords, initScrollFx, initPreview, initPanels, initConstellation, initRail, initMagnet } from './lib/motion.js'
import { routes as home } from './pages/home.js'
import { routes as about } from './pages/about.js'
import { routes as areas } from './pages/areas.js'
import { routes as products } from './pages/products.js'
import { routes as caps } from './pages/capabilities.js'
import { routes as industries } from './pages/industries.js'
import { routes as stories } from './pages/stories.js'
import { routes as insights } from './pages/insights.js'
import { routes as contact } from './pages/contact.js'
import { routes as legal } from './pages/legal.js'

// Routage par hash « #slug » : fonctionne sur tout hébergement statique, y compris en lien direct,
// et le bouton précédent/suivant du navigateur fonctionne via hashchange.
const ROUTES = { ...home, ...about, ...areas, ...products, ...caps, ...industries, ...stories, ...insights, ...contact, ...legal }
const SITE = 'S4D Consulting'
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches

document.getElementById('app').innerHTML = `
  <a class="skip" href="#main" data-scroll="main">Skip to content</a>
  <div class="loadbar" id="loadbar" aria-hidden="true"></div>
  ${Header()}
  <main id="main" tabindex="-1"></main>
  ${Footer()}`
initHeader()

const main = document.getElementById('main')
const loadbar = document.getElementById('loadbar')
const metaDesc = (() => {
  let m = document.querySelector('meta[name="description"]')
  if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m) }
  return m
})()

// Révélation au défilement : tout élément situé dans l'écran ou au-dessus du bas de l'écran est révélé,
// y compris après un saut rapide ou une ancre. Rien ne reste masqué derrière soi.
let pending = []
let ticking = false
function reveal() {
  ticking = false
  const limit = window.innerHeight * 0.92
  pending = pending.filter((el) => (el.getBoundingClientRect().top < limit ? (el.classList.add('in'), false) : true))
}
function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(reveal) } }
window.addEventListener('scroll', schedule, { passive: true })
window.addEventListener('resize', schedule)

function current() {
  const slug = decodeURIComponent(location.hash.replace(/^#/, '')) || 'home'
  return ROUTES[slug] ? slug : 'not-found'
}

let cleanups = []
let last
function render() {
  cleanups.forEach((fn) => fn && fn())
  cleanups = []
  const slug = current()
  const r = ROUTES[slug]
  main.innerHTML = r.render()
  document.title = slug === 'home' ? r.title : `${r.title} | ${SITE}`
  metaDesc.content = r.desc
  document.documentElement.dataset.route = slug
  // l'en-tête s'adapte au fond de la première section : sombre ou clair
  document.documentElement.dataset.hero = main.querySelector('.hero, .ihero--dark') ? 'dark' : 'light'
  markActive(slug)
  splitWords(main)
  cleanups.push(initScrollFx(main), initPreview(main), initMagnet(main))
  initPanels(main); initConstellation(main); initRail(main)
  cleanups.push(r.init?.())
  pending = [...main.querySelectorAll('.reveal, .mask, .sp, .draw, .line')]
  if (last !== slug) { window.scrollTo({ top: 0, behavior: 'instant' }); main.focus({ preventScroll: true }) }
  last = slug
  document.dispatchEvent(new Event('s4d:rendered'))
  requestAnimationFrame(() => requestAnimationFrame(reveal))
}

// transition entre pages : fondu rapide, barre de progression
let busy = false
function go() {
  if (!last || reduce() || busy) return render()
  busy = true
  main.classList.add('is-leaving')
  loadbar.classList.remove('run'); void loadbar.offsetWidth; loadbar.classList.add('run')
  setTimeout(() => { render(); main.classList.remove('is-leaving'); busy = false }, 200)
}
window.addEventListener('hashchange', go)

// Défilement vers une zone de la page courante sans changer de route
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-scroll]')
  if (!t) return
  e.preventDefault()
  document.getElementById(t.dataset.scroll)?.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth' })
})
// Clic sur la page courante : remonter en haut plutôt que ne rien faire
document.addEventListener('click', (e) => {
  const l = e.target.closest('a[href^="#"]')
  if (l && !l.dataset.scroll && l.getAttribute('href') === location.hash) window.scrollTo({ top: 0 })
})

render()
