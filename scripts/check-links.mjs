// Vérifie que chaque lien interne mène à une page existante et que chaque image locale existe.
import { existsSync } from 'node:fs'
const mods = ['home', 'about', 'areas', 'products', 'capabilities', 'industries', 'stories', 'insights', 'contact', 'legal']
const ROUTES = {}
for (const m of mods) Object.assign(ROUTES, (await import(`../src/pages/${m}.js`)).routes)
const { Header } = await import('../src/components/header.js')
const { Footer } = await import('../src/components/footer.js')
let bad = 0
const check = (where, html) => {
  for (const [, h] of html.matchAll(/href="#([^"]*)"/g)) {
    if (h === 'main' || h === 'open-roles' || h === 'top') continue
    if (!ROUTES[h]) { console.log('BROKEN LINK', where, '#' + h); bad++ }
  }
  for (const [, s] of html.matchAll(/src="(\/img\/[^"]+)"/g)) if (!existsSync('public' + s)) { console.log('MISSING IMG', where, s); bad++ }
}
check('header', Header()); check('footer', Footer())
for (const [slug, r] of Object.entries(ROUTES)) {
  const html = r.render()
  check(slug, html)
  if (!/<h1/.test(html)) { console.log('NO H1', slug); bad++ }
  if ((html.match(/<h1/g) || []).length > 1) { console.log('MULTI H1', slug); bad++ }
}
console.log(Object.keys(ROUTES).length, 'routes checked,', bad, 'problems')
process.exit(bad ? 1 : 0)
