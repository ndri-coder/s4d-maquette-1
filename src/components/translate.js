// Bouton FR : traduit la page avec Google Traduction (le moteur de traduction de Chrome) lorsque le script est
// accessible. Un site ne peut pas déclencher directement la traduction intégrée du navigateur ; si le script est
// bloqué (hors ligne, extension, environnement restreint), un petit panneau explique comment utiliser celle du navigateur.
const WIDGET = 'https://translate.google.com/translate_a/element.js?cb=__s4dTranslateInit'

let ready = null
function loadWidget() {
  if (ready) return ready
  ready = new Promise((resolve) => {
    const done = (ok) => resolve(ok)
    window.__s4dTranslateInit = () => {
      try {
        new window.google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'fr', autoDisplay: false }, 'gt-el')
        done(true)
      } catch { done(false) }
    }
    const s = document.createElement('script')
    s.src = WIDGET
    s.async = true
    s.onerror = () => done(false)
    document.head.appendChild(s)
    setTimeout(() => done(false), 6000)
  })
  return ready
}

const combo = () => document.querySelector('#gt-el select.goog-te-combo')
async function waitCombo(ms = 4000) {
  const t0 = Date.now()
  while (Date.now() - t0 < ms) { if (combo()) return combo(); await new Promise((r) => setTimeout(r, 100)) }
  return null
}
async function waitFor(test, ms) {
  const t0 = Date.now()
  while (Date.now() - t0 < ms) { if (test()) return true; await new Promise((r) => setTimeout(r, 150)) }
  return false
}
function setLang(value) {
  const c = combo()
  if (!c) return false
  c.value = value
  c.dispatchEvent(new Event('change'))
  return true
}

export function initTranslate() {
  const btn = document.getElementById('lang-toggle')
  const pop = document.getElementById('lang-pop')
  if (!btn || !pop) return
  let fr = false
  const showPop = (on) => { pop.hidden = !on }
  pop.querySelector('.langpop__close').addEventListener('click', () => { showPop(false); btn.focus() })
  document.addEventListener('keydown', (e) => e.key === 'Escape' && showPop(false))
  document.addEventListener('click', (e) => !e.target.closest('.langwrap') && showPop(false))

  btn.addEventListener('click', async () => {
    if (fr) {
      setLang('')
      fr = false
      btn.textContent = 'FR'
      btn.setAttribute('aria-pressed', 'false')
      btn.setAttribute('aria-label', 'Translate this site to French')
      return
    }
    btn.disabled = true
    const ok = await loadWidget()
    const c = ok && (await waitCombo())
    btn.disabled = false
    // la traduction n'est considérée active que si Google l'a réellement appliquée à la page
    const applied = c && setLang('fr') && (await waitFor(() => /translated-/.test(document.documentElement.className), 5000))
    if (c && !applied) setLang('')
    if (applied) {
      fr = true
      btn.textContent = 'EN'
      btn.setAttribute('aria-pressed', 'true')
      btn.setAttribute('aria-label', 'Show this site in English')
      showPop(false)
    } else {
      showPop(true)
    }
  })
}
