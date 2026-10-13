// Système de mouvement : titres découpés en mots, texte qui s'éclaire au défilement,
// parallaxe légère, aperçu d'image qui suit le curseur, panneaux et carrousel.
// Tout est désactivé ou figé quand l'utilisateur demande moins de mouvement.
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export function splitWords(root) {
  root.querySelectorAll('[data-split]').forEach((el) => {
    if (el.dataset.done) return
    el.setAttribute('aria-label', el.textContent.trim().replace(/\s+/g, ' '))
    let i = 0
    // chaque mot est enveloppé ; les éléments en ligne (em, strong) sont conservés autour de leurs mots
    const build = (src, dst) => {
      src.childNodes.forEach((n) => {
        if (n.nodeType === 3) {
          n.textContent.split(/\s+/).filter(Boolean).forEach((word) => {
            const w = document.createElement('span')
            w.className = 'w'
            w.setAttribute('aria-hidden', 'true')
            const wi = document.createElement('span')
            wi.className = 'wi'
            wi.style.setProperty('--i', i++)
            wi.textContent = word
            w.appendChild(wi)
            dst.appendChild(w)
            dst.appendChild(document.createTextNode(' '))
          })
        } else if (n.nodeType === 1) {
          const c = n.cloneNode(false)
          dst.appendChild(c)
          build(n, c)
        }
      })
    }
    const out = document.createDocumentFragment()
    build(el, out)
    el.textContent = ''
    el.appendChild(out)
    el.classList.add('sp')
    el.dataset.done = '1'
  })
  root.querySelectorAll('[data-lit]').forEach((el) => {
    if (el.dataset.done) return
    const text = el.textContent.trim().replace(/\s+/g, ' ')
    el.setAttribute('aria-label', text)
    el.textContent = ''
    text.split(' ').forEach((word, i, all) => {
      const s = document.createElement('span')
      s.className = 'lw'
      s.setAttribute('aria-hidden', 'true')
      s.textContent = word
      el.appendChild(s)
      if (i < all.length - 1) el.appendChild(document.createTextNode(' '))
    })
    el.dataset.done = '1'
  })
}

/** Effets liés au défilement : texte qui s'éclaire, parallaxe. Retourne une fonction de nettoyage. */
export function initScrollFx(root) {
  const lits = [...root.querySelectorAll('[data-lit]')]
  const pars = [...root.querySelectorAll('[data-parallax]')]
  if (!lits.length && !pars.length) return () => {}
  if (reduce()) { lits.forEach((el) => el.querySelectorAll('.lw').forEach((w) => w.classList.add('on'))); return () => {} }
  let ticking = false
  const update = () => {
    ticking = false
    const vh = window.innerHeight
    for (const el of lits) {
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (r.height + vh * 0.25)))
      const words = el.children
      const n = Math.max(el._n || 0, Math.round(p * words.length))
      if (el._n !== n) {
        for (let i = 0; i < words.length; i++) words[i].classList.toggle('on', i < n)
        el._n = n
      }
    }
    for (const el of pars) {
      const r = el.getBoundingClientRect()
      if (r.bottom < -100 || r.top > vh + 100) continue
      const k = parseFloat(el.dataset.parallax) || 0.1
      const lim = Math.max(0, (el.parentElement?.clientHeight || r.height) * 0.1 - 1)
      const d = Math.max(-lim, Math.min(lim, (r.top + r.height / 2 - vh / 2) * -k))
      el.style.transform = `translate3d(0, ${d.toFixed(1)}px, 0)`
    }
  }
  const on = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
  window.addEventListener('scroll', on, { passive: true })
  window.addEventListener('resize', on)
  update()
  return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
}

/** Aperçu d'image qui suit le curseur au-dessus d'une liste (écrans à souris uniquement). */
export function initPreview(root) {
  const lists = root.querySelectorAll('[data-preview]')
  if (!lists.length || reduce() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {}
  const box = document.createElement('div')
  box.className = 'ipreview'
  box.setAttribute('aria-hidden', 'true')
  const img = document.createElement('img')
  img.alt = ''
  box.appendChild(img)
  document.body.appendChild(box)
  let tx = 0, ty = 0, x = 0, y = 0, raf = 0, shown = false
  const loop = () => {
    x += (tx - x) * 0.16
    y += (ty - y) * 0.16
    box.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
    raf = requestAnimationFrame(loop)
  }
  const move = (e) => { tx = e.clientX + 28; ty = e.clientY - 120 }
  lists.forEach((list) => {
    list.addEventListener('mousemove', move)
    list.addEventListener('mouseover', (e) => {
      const row = e.target.closest('[data-img]')
      if (!row) return
      if (img.getAttribute('src') !== row.dataset.img) img.src = row.dataset.img
      if (!shown) { x = tx; y = ty; shown = true; raf = requestAnimationFrame(loop) }
      box.classList.add('show')
    })
    list.addEventListener('mouseleave', () => { box.classList.remove('show'); shown = false; cancelAnimationFrame(raf) })
  })
  return () => { cancelAnimationFrame(raf); box.remove() }
}

/** Panneaux qui s'ouvrent (domaines d'intervention) : survol, focus ou toucher. */
export function initPanels(root) {
  root.querySelectorAll('.panels').forEach((wrap) => {
    const items = [...wrap.querySelectorAll('.panel')]
    const set = (i) => items.forEach((p, k) => p.classList.toggle('is-active', k === i))
    items.forEach((p, i) => {
      p.addEventListener('mouseenter', () => matchMedia('(hover: hover)').matches && set(i))
      p.addEventListener('focusin', () => set(i))
      p.addEventListener('click', (e) => { if (!e.target.closest('a')) set(i) })
    })
    set(0)
  })
}

/** Constellation des capacités : la liste pilote le schéma. */
export function initConstellation(root) {
  root.querySelectorAll('.const').forEach((wrap) => {
    const items = [...wrap.querySelectorAll('.const__item')]
    const set = (i) => {
      wrap.dataset.active = i
      wrap.querySelectorAll('.const__line').forEach((l) => l.classList.toggle('on', l.dataset.n.split(' ').includes(String(i))))
      wrap.querySelectorAll('.const__ring').forEach((r, k) => r.classList.toggle('is-on', k === i))
      wrap.querySelectorAll('.const__dot').forEach((d, k) => d.classList.toggle('is-on', k === i))
      items.forEach((it, k) => { it.classList.toggle('is-active', k === i); it.querySelector('button').setAttribute('aria-expanded', String(k === i)) })
    }
    items.forEach((it, i) => {
      const btn = it.querySelector('button')
      btn.addEventListener('click', () => set(i))
      it.addEventListener('mouseenter', () => matchMedia('(hover: hover)').matches && set(i))
      btn.addEventListener('focus', () => set(i))
    })
    wrap.querySelectorAll('.const__node').forEach((n) => n.addEventListener('click', () => set(+n.dataset.i)))
    set(0)
  })
}

/** Carrousel horizontal : boutons précédent/suivant et barre de progression. */
export function initRail(root) {
  root.querySelectorAll('.rail').forEach((rail) => {
    const track = rail.querySelector('.rail__track')
    const prev = rail.querySelector('[data-rail="prev"]')
    const next = rail.querySelector('[data-rail="next"]')
    const bar = rail.querySelector('.rail__bar i')
    const step = () => (track.querySelector('.rcard')?.getBoundingClientRect().width || 360) + 24
    const upd = () => {
      const max = track.scrollWidth - track.clientWidth
      const p = max > 0 ? track.scrollLeft / max : 1
      if (bar) bar.style.transform = `scaleX(${Math.max(0.12, 0.12 + p * 0.88).toFixed(3)})`
      if (prev) prev.disabled = track.scrollLeft < 8
      if (next) next.disabled = track.scrollLeft > max - 8
    }
    prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduce() ? 'auto' : 'smooth' }))
    next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduce() ? 'auto' : 'smooth' }))
    track.addEventListener('scroll', upd, { passive: true })
    window.addEventListener('resize', upd)
    upd()
  })
}

/** Les boutons marqués data-magnet suivent très légèrement le curseur (souris uniquement). */
export function initMagnet(root) {
  if (reduce() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {}
  const cleanups = []
  root.querySelectorAll('[data-magnet]').forEach((el) => {
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) / r.width
      const y = (e.clientY - (r.top + r.height / 2)) / r.height
      el.style.transform = `translate(${(x * 10).toFixed(1)}px, ${(y * 8).toFixed(1)}px)`
    }
    const leave = () => { el.style.transform = '' }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) })
  })
  return () => cleanups.forEach((fn) => fn())
}
