import { useEffect, useRef, useState, type ReactNode } from 'react'
import { thumb, type Item } from '../data'

const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

/** One observer for every .reveal / .line-mask, re-scanned when `dep` changes (e.g. tab switches). */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.1, rootMargin: '0px 0px -6% 0px' })
    document.querySelectorAll('.reveal:not(.in), .line-mask:not(.in), .reveal-media:not(.in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

/** Single rAF-throttled scroll loop for [data-speed] parallax; only visible elements are updated. */
export function useParallax() {
  useEffect(() => {
    if (reduced()) return
    const visible = new Set<HTMLElement>()
    const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? visible.add(e.target as HTMLElement) : visible.delete(e.target as HTMLElement))), { rootMargin: '20% 0px' })
    document.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => io.observe(el))
    let ticking = false
    const update = () => {
      ticking = false
      const vh = innerHeight
      visible.forEach((el) => {
        const r = el.getBoundingClientRect()
        const p = (r.top + r.height / 2 - vh / 2) / vh
        el.style.transform = `translate3d(0, ${(p * Number(el.dataset.speed) * 100).toFixed(1)}px, 0)`
      })
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    addEventListener('scroll', onScroll, { passive: true }); update()
    return () => { removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])
}

/** Cursor runs entirely outside React: no re-renders on move, rAF only while catching up. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLSpanElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!fine()) return
    setOn(true)
    document.body.classList.add('has-cursor')
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0, last = ''
    const loop = () => {
      cx += (x - cx) * 0.25; cy += (y - cy) * 0.25
      dot.current!.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0
    }
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY
      if (!raf) raf = requestAnimationFrame(loop)
      const label = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? ''
      if (label !== last) { last = label; text.current!.textContent = label; dot.current!.dataset.active = label ? '1' : '' }
    }
    addEventListener('pointermove', move, { passive: true })
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); document.body.classList.remove('has-cursor') }
  }, [])
  if (!on) return null
  return (
    <div ref={dot} className="group/c pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference will-change-transform">
      <div className="flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 scale-[.1] items-center justify-center rounded-full bg-bone text-ink transition-transform duration-500 ease-[var(--ease-liquid)] group-data-[active=1]/c:scale-100">
        <span ref={text} className="label !text-[10px] opacity-0 transition-opacity group-data-[active=1]/c:opacity-100" />
      </div>
    </div>
  )
}

/** Sets --sx/--sy on the element for the .sheen highlight. */
export const sheen = (e: React.PointerEvent<HTMLElement>) => {
  const el = e.currentTarget, r = el.getBoundingClientRect()
  el.style.setProperty('--sx', `${e.clientX - r.left}px`); el.style.setProperty('--sy', `${e.clientY - r.top}px`)
}

export function Magnetic({ children, className = '', href, onClick, cursor }: { children: ReactNode; className?: string; href?: string; onClick?: () => void; cursor?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const move = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!fine()) return
    const r = ref.current!.getBoundingClientRect()
    ref.current!.style.transform = `translate3d(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px, 0)`
    sheen(e)
  }
  return (
    <a ref={ref} href={href} onClick={onClick && ((e) => { e.preventDefault(); onClick() })} data-cursor={cursor} onPointerMove={move} onPointerLeave={() => (ref.current!.style.transform = '')}
      target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
      className={`btn-liquid sheen relative inline-flex items-center gap-3 overflow-hidden rounded-full ${className}`}>
      {children}
    </a>
  )
}

export function SectionHead({ index, title, kicker, children }: { index: string; title: string[]; kicker: string; children?: ReactNode }) {
  return (
    <header className="grid grid-cols-12 gap-x-6 gap-y-6 pb-12 md:pb-20">
      <div className="reveal col-span-12 flex items-center gap-3 md:col-span-3">
        <span className="label rounded-[var(--radius-chip)] border border-line px-2 py-1 text-bone">{index}</span>
        <span className="label text-mute">{kicker}</span>
      </div>
      <h2 className="col-span-12 text-[clamp(3rem,9vw,9.5rem)] font-semibold uppercase leading-[0.84] tracking-[-0.055em] md:col-span-9">
        {title.map((t, i) => <span key={t} className="line-mask"><span style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>{t}</span></span>)}
      </h2>
      {children && <div className="reveal col-span-12 max-w-md text-[15px] leading-relaxed text-mute md:col-span-5 md:col-start-4" style={{ '--d': '150ms' } as React.CSSProperties}>{children}</div>}
    </header>
  )
}

export function Media({ item, onOpen, className = '', ratio, w = 1000, showMeta = true, delay = 0 }: { item: Item; onOpen: (i: Item) => void; className?: string; ratio?: string; w?: number; showMeta?: boolean; delay?: number }) {
  const r = ratio ?? (item.format === 'vertical' ? 'aspect-[9/16]' : 'aspect-video')
  return (
    <button onClick={() => onOpen(item)} onPointerMove={sheen} data-cursor={item.kind === 'video' ? 'Play' : 'View'}
      className={`reveal group block w-full text-left ${className}`} style={{ '--d': `${delay}ms` } as React.CSSProperties}>
      <div className={`reveal-media sheen relative overflow-hidden rounded-[var(--radius-media)] bg-coal ring-1 ring-inset ring-white/5 transition-transform duration-700 ease-[var(--ease-out-soft)] [transform:translateZ(0)] group-hover:scale-[.985] ${r}`}>
        <img src={thumb(item.id, w)} alt={`${item.title} — ${item.file}`} loading="lazy" decoding="async" referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover opacity-85 group-hover:opacity-100 [.group:hover_&]:!scale-[1.06] [.group:hover_&]:![transition-duration:1.1s]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        {item.kind === 'video' && (
          <span className="liquid label absolute left-3 top-3 flex items-center gap-2 rounded-full px-2.5 py-1.5 !text-[10px] text-bone/90 [backdrop-filter:none] [background:rgb(5_5_5/.55)]">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Video
          </span>
        )}
        <span className="label absolute bottom-3 right-3 flex h-9 translate-y-3 items-center rounded-full bg-bone px-3.5 text-ink opacity-0 transition duration-500 ease-[var(--ease-liquid)] group-hover:translate-y-0 group-hover:opacity-100">
          {item.kind === 'video' ? 'Play ▸' : 'Open ↗'}
        </span>
      </div>
      {showMeta && (
        <div className="mt-3 flex items-baseline justify-between gap-4 px-1">
          <h3 className="text-[15px] font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1">{item.title}</h3>
          <p className="label shrink-0 text-mute">{item.tags.slice(0, 2).join(' / ')}</p>
        </div>
      )}
    </button>
  )
}
