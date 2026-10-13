// Carte de points de l'Afrique : l'image signature de la page d'accueil.
// Les repères sont des lieux documentés : bureaux (Ghana, Ouganda) et projets nommés dans le dossier client (Zambie, Rwanda).
const AFRICA = [
  [-5.9, 35.8], [-2.2, 35.1], [0, 35.9], [3, 36.8], [6.5, 37], [9.8, 37.3], [10.9, 36.9], [11.1, 35.2], [10.1, 34], [11.2, 33.2],
  [13.2, 32.9], [15.2, 32.4], [16, 31.2], [19.1, 30.3], [20.1, 31.4], [20.1, 32.2], [22.5, 32.9], [25, 31.8], [28, 31.1], [30.4, 31.5],
  [32.3, 31.3], [32.5, 30], [32.8, 28.6], [33.8, 27.1], [34.6, 25.9], [35.5, 24], [36.6, 22], [37.2, 21], [37.3, 19], [38.3, 18],
  [38.8, 16.5], [39.6, 15.4], [41, 14.5], [42.4, 13.2], [43.3, 12.5], [43.1, 11.5], [44.2, 10.5], [45.8, 10.7], [47.5, 11.2], [49, 11.3],
  [51.2, 11.8], [50.8, 10.2], [49.8, 7.5], [48.5, 5], [46.5, 3], [44, 1], [42, -1], [40.9, -2], [39.9, -3.5], [39.2, -5],
  [38.9, -6.6], [39.3, -8.2], [40, -10.3], [40.6, -11], [40.5, -14], [39.4, -16], [36.5, -18], [35, -20], [35.4, -22], [35.5, -24],
  [33, -25.5], [32.9, -27], [32.4, -28.8], [30.8, -30.5], [28.5, -32.5], [26.4, -33.7], [24, -34.1], [22, -34.1], [20, -34.8], [18.5, -34.3],
  [18, -32], [17, -29], [15.3, -27], [14.5, -23], [14, -20], [12.2, -18], [11.8, -15.5], [12.5, -13.5], [13.6, -11], [12.8, -7],
  [12.2, -5.8], [11.1, -4.4], [9.6, -2.5], [9, -0.5], [9.5, 1], [9.8, 2.5], [9.5, 3.8], [8.6, 4.6], [7, 4.4], [5.5, 4.3],
  [4.3, 6], [3, 6.3], [1, 6], [-1, 5], [-2.8, 4.6], [-5, 5.1], [-7.5, 4.4], [-9, 5], [-11.4, 6.9], [-13.2, 8.6],
  [-14.6, 10], [-15.8, 11.5], [-16.7, 12.5], [-17.5, 14.7], [-16.6, 16.5], [-16.3, 19], [-17, 21], [-15.5, 23.5], [-13.8, 26], [-12.5, 28],
  [-9.8, 29.8], [-9.4, 31.5], [-8, 33.5], [-6.5, 34.3],
]
const MADAGASCAR = [[49.3, -12], [50.4, -15], [49.5, -17.5], [48, -22], [45, -25.5], [43.5, -24], [43.3, -21], [44.3, -18], [44, -16], [47, -14]]

export const NODES = [
  { id: 'gh', side: 'left', name: 'Ghana', note: 'Office in Accra. GhiLMIS, health data exchange and analytics.', lon: -0.19, lat: 5.6 },
  { id: 'ug', name: 'Uganda', note: 'Office in Kampala. Education and property readiness assessments.', lon: 32.58, lat: 0.35 },
  { id: 'zm', name: 'Zambia', note: 'PSIE demand-planning dashboards.', lon: 28.28, lat: -15.39 },
  { id: 'rw', side: 'left', name: 'Rwanda', note: 'RMS AI platform.', lon: 30.06, lat: -1.95 },
]
const LINKS = [['gh', 'ug'], ['ug', 'rw'], ['rw', 'zm'], ['gh', 'zm'], ['gh', 'rw']]

const B = { lon0: -19.5, lon1: 53.5, lat0: -37, lat1: 39 } // cadre de la carte
export const ASPECT = (B.lon1 - B.lon0) / (B.lat1 - B.lat0)
const norm = (lon, lat) => [(lon - B.lon0) / (B.lon1 - B.lon0), 1 - (lat - B.lat0) / (B.lat1 - B.lat0)]

function inside(poly, x, y) {
  let c = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c
  }
  return c
}

function makeDots(step) {
  const dots = []
  for (let lat = B.lat0; lat <= B.lat1; lat += step)
    for (let lon = B.lon0; lon <= B.lon1; lon += step * 1.0) {
      if (inside(AFRICA, lon, lat) || inside(MADAGASCAR, lon, lat)) {
        const [nx, ny] = norm(lon, lat)
        dots.push({ nx, ny, ph: Math.random() * 6.28 })
      }
    }
  return dots
}

export function initAtlas(root) {
  const canvas = root.querySelector('canvas')
  const list = root.querySelector('.atlas__nodes')
  const ctx = canvas.getContext('2d')
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const dots = makeDots(1.55)
  const nodes = NODES.map((n) => ({ ...n, p: norm(n.lon, n.lat) }))
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const origin = byId.gh.p
  dots.forEach((d) => { d.dist = Math.hypot(d.nx - origin[0], d.ny - origin[1]) })
  const maxDist = Math.max(...dots.map((d) => d.dist))

  list.innerHTML = nodes.map((n) => `
    <li class="atlas__node" style="left:${(n.p[0] * 100).toFixed(2)}%;top:${(n.p[1] * 100).toFixed(2)}%" data-id="${n.id}" data-side="${n.side || 'right'}">
      <button type="button" aria-describedby="atlas-${n.id}"><span class="atlas__name">${n.name}</span></button>
      <span class="atlas__note" role="tooltip" id="atlas-${n.id}">${n.note}</span>
    </li>`).join('')

  let w = 0, h = 0, dpr = 1
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    const r = canvas.getBoundingClientRect()
    w = r.width; h = r.height
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
  }
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  const start = performance.now()
  let raf = 0, visible = true

  function draw(now) {
    const t = reduce ? 99 : (now - start) / 1000
    const intro = Math.min(1, t / 2.4)
    const reach = intro * (maxDist + 0.12)
    mouse.x += (mouse.tx - mouse.x) * 0.06
    mouse.y += (mouse.ty - mouse.y) * 0.06
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    const ox = mouse.x * 8, oy = mouse.y * 8
    const r = Math.max(1.5, Math.min(w, h) * 0.0042)
    for (const d of dots) {
      const k = (reach - d.dist) / 0.12
      if (k <= 0) continue
      const a = Math.min(1, k) * (0.3 + 0.28 * Math.sin(t * 1.3 + d.ph))
      ctx.fillStyle = `rgba(159,211,251,${a.toFixed(3)})`
      ctx.beginPath()
      ctx.arc(d.nx * w + ox, d.ny * h + oy, r, 0, 6.2832)
      ctx.fill()
    }
    // liaisons entre les lieux
    const linkT = Math.max(0, Math.min(1, (t - 1.8) / 1.6))
    if (linkT > 0) {
      ctx.lineWidth = 1.2
      LINKS.forEach(([a, b], i) => {
        const A = byId[a].p, Bn = byId[b].p
        const ax = A[0] * w + ox * 1.6, ay = A[1] * h + oy * 1.6, bx = Bn[0] * w + ox * 1.6, by = Bn[1] * h + oy * 1.6
        const mx = (ax + bx) / 2, my = (ay + by) / 2 - Math.hypot(bx - ax, by - ay) * 0.22
        ctx.strokeStyle = 'rgba(159,211,251,0.55)'
        ctx.setLineDash([5, 7])
        ctx.lineDashOffset = -t * 14 - i * 9
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        const steps = Math.max(2, Math.round(40 * linkT))
        for (let s = 1; s <= steps; s++) {
          const u = (s / 40)
          const x = (1 - u) * (1 - u) * ax + 2 * (1 - u) * u * mx + u * u * bx
          const y = (1 - u) * (1 - u) * ay + 2 * (1 - u) * u * my + u * u * by
          ctx.lineTo(x, y)
        }
        ctx.stroke()
      })
      ctx.setLineDash([])
    }
    // repères : halo qui pulse
    nodes.forEach((n, i) => {
      const x = n.p[0] * w + ox * 1.6, y = n.p[1] * h + oy * 1.6
      const appear = Math.max(0, Math.min(1, (t - 0.7 - i * 0.25) / 0.6))
      if (appear <= 0) return
      const pulse = reduce ? 0.5 : (t * 0.7 + i * 0.3) % 1
      ctx.strokeStyle = `rgba(255,184,77,${(0.55 * (1 - pulse) * appear).toFixed(3)})`
      ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(x, y, (6 + pulse * 22) * appear, 0, 6.2832); ctx.stroke()
      ctx.fillStyle = `rgba(255,184,77,${appear})`
      ctx.beginPath(); ctx.arc(x, y, 4.6 * appear, 0, 6.2832); ctx.fill()
      const el = list.children[i]
      if (el) { el.style.setProperty('--x', `${(ox * 1.6).toFixed(1)}px`); el.style.setProperty('--y', `${(oy * 1.6).toFixed(1)}px`); el.style.opacity = appear }
    })
    if (!reduce && visible) raf = requestAnimationFrame(draw)
  }

  resize()
  draw(performance.now())
  const onResize = () => { resize(); if (reduce) draw(performance.now()) }
  window.addEventListener('resize', onResize)
  if (!reduce) {
    root.addEventListener('pointermove', (e) => {
      const r = root.getBoundingClientRect()
      mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2
    })
    root.addEventListener('pointerleave', () => { mouse.tx = 0; mouse.ty = 0 })
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw) } else cancelAnimationFrame(raf)
    })
    io.observe(root)
  }
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
}
