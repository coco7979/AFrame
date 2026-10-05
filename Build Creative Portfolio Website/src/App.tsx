import { useEffect, useRef, useState } from 'react'
import { cinematic, clients, documents, featured, longForm, montage, motion, posters, shortForm, thumb, type Item } from './data'
import { Cursor, Magnetic, Media, SectionHead, sheen, useParallax, useReveal } from './components/ui'
import Player from './components/Player'
import portrait from './assets/profile.jpg'
import Pricing from './components/Pricing'
import Booking, { WaIcon } from './components/Booking'
import { waLink, type Preset } from './pricing'

const NAV = [['Work', '#work'], ['Video', '#video'], ['Design', '#design'], ['Motion', '#motion'], ['3D', '#3d'], ['About', '#about'], ['Pricing', '#pricing'], ['Contact', '#contact']]
const EMAIL = 'aryankumarx666@gmail.com'
const IG = 'https://instagram.com/ary_x666'
const d = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties
// Face sits right of centre in the source photo; keep it in frame at every crop.
const FACE = 'object-[62%_38%]'

export default function App() {
  const [player, setPlayer] = useState<{ list: Item[]; index: number } | null>(null)
  const [booking, setBooking] = useState<{ preset?: Preset } | null>(null)
  const open = (list: Item[]) => (item: Item) => setPlayer({ list, index: Math.max(0, list.indexOf(item)) })
  const book = (preset?: Preset) => setBooking({ preset })
  useParallax()

  return (
    <div className="grain relative min-h-screen bg-ink">
      <Cursor />
      <Nav book={book} />
      <Hero book={book} onOpen={open([featured.tamala, featured.ys, featured.cyber, featured.amar, featured.render])} />
      <main className="relative z-10 space-y-3 bg-ink pb-3 md:space-y-4 md:pb-4">
        <Intro />
        <Selected open={open} />
        <Video open={open} />
        <Design open={open} />
        <Motion open={open} />
        <ThreeD open={open} />
        <Digital />
        <Clients open={open} />
        <About />
        <Pricing book={book} />
        <Contact book={book} />
      </main>
      <a href={waLink('Hi Aryan, I found your portfolio and would like to discuss a project.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" data-cursor="Open"
        className="liquid group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 items-center rounded-full pl-[17px] pr-[17px] text-[#25D366] transition-[padding] duration-500 ease-[var(--ease-out-soft)] md:bottom-6 md:right-6 md:hover:pr-5">
        <WaIcon className="h-5 w-5 shrink-0 transition-transform duration-500 ease-[var(--ease-liquid)] group-hover:scale-110" />
        <span className="label grid grid-cols-[0fr] text-bone transition-[grid-template-columns] duration-500 ease-[var(--ease-out-soft)] md:group-hover:grid-cols-[1fr]"><span className="overflow-hidden whitespace-nowrap md:group-hover:pl-3">Chat on WhatsApp</span></span>
      </a>
      {booking && <Booking preset={booking.preset} onClose={() => setBooking(null)} />}
      {player && <Player list={player.list} index={player.index} onIndex={(index) => setPlayer({ ...player, index })} onClose={() => setPlayer(null)} />}
    </div>
  )
}

const wrap = 'mx-auto w-full max-w-[1600px] px-5 md:px-10'
// Inset rounded panel that separates major sections.
const panel = 'mx-3 overflow-hidden rounded-[var(--radius-panel)] md:mx-4'

function Nav({ book }: { book: (p?: Preset) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(scrollY > 40)
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-4">
        <div className={`flex w-full max-w-[1600px] items-center justify-between rounded-full py-2 pl-2 pr-2 transition-[background-color,box-shadow,max-width,padding] duration-500 ease-[var(--ease-out-soft)] md:pr-6 ${scrolled ? 'liquid !max-w-[980px]' : ''}`}>
          <a href="#top" className="flex items-center gap-3">
            <img src={portrait} alt="Aryan Kumar" className={`h-9 w-9 rounded-[11px] object-cover ${FACE} ring-1 ring-white/15`} />
            <span className="text-[13px] font-semibold uppercase tracking-[0.02em]">Aryan Kumar</span>
          </a>
          <ul className="hidden items-center gap-5 xl:gap-6 lg:flex">
            {NAV.map(([l, h]) => <li key={l}><a href={h} className="label text-mute transition-colors hover:text-bone">{l}</a></li>)}
          </ul>
          <div className="flex items-center gap-2">
            <button onClick={() => book()} className="btn-liquid label hidden h-10 rounded-full bg-bone px-4 text-ink sm:block">Book a Project</button>
            <button onClick={() => setMenu(true)} className="liquid btn-liquid label h-10 rounded-full px-4 lg:hidden">Menu</button>
          </div>
        </div>
      </nav>
      <div className={`fixed inset-0 z-[80] flex flex-col bg-ink/95 p-5 backdrop-blur-md transition-opacity duration-400 lg:hidden ${menu ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className="flex items-center justify-between py-1"><span className="text-[13px] font-semibold uppercase">Aryan Kumar</span><button onClick={() => setMenu(false)} className="liquid label h-10 rounded-full px-4">Close ×</button></div>
        <ul className="mt-auto space-y-1">
          {NAV.map(([l, h], i) => (
            <li key={l} className={`flex items-baseline gap-4 border-t border-line py-2 transition duration-500 ease-[var(--ease-out-soft)] ${menu ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: menu ? `${80 + i * 40}ms` : '0ms' }}>
              <span className="label text-mute">0{i + 1}</span>
              <a href={h} onClick={() => setMenu(false)} className="text-5xl font-semibold uppercase tracking-[-0.05em]">{l}</a>
            </li>
          ))}
        </ul>
        <p className="label mt-8 text-mute">{EMAIL}</p>
      </div>
    </>
  )
}

function Hero({ onOpen, book }: { onOpen: (i: Item) => void; book: (p?: Preset) => void }) {
  const stage = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = stage.current
    if (!el || !matchMedia('(hover: hover)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0, px = 0, py = 0
    const f = (e: PointerEvent) => {
      px = e.clientX / innerWidth - 0.5; py = e.clientY / innerHeight - 0.5
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; el.style.setProperty('--px', px.toFixed(3)); el.style.setProperty('--py', py.toFixed(3)) })
    }
    el.addEventListener('pointermove', f, { passive: true })
    return () => { el.removeEventListener('pointermove', f); cancelAnimationFrame(raf) }
  }, [])
  // Work floating around the portrait: [item, left, top, width, depth]
  const layers: [Item, string, string, string, number][] = [
    [featured.tamala, '34%', '12%', 'clamp(200px,20vw,340px)', 30],
    [featured.amar, '86%', '20%', 'clamp(100px,9vw,160px)', 60],
    [featured.cyber, '78%', '64%', 'clamp(170px,17vw,290px)', 44],
    [featured.render, '40%', '58%', 'clamp(120px,11vw,200px)', 22],
  ]
  const depth = (n: number) => ({ transform: `translate3d(calc(var(--px) * ${-n}px), calc(var(--py) * ${-n}px), 0)` })
  return (
    <section id="top" ref={stage} className="relative h-[100svh] min-h-[680px] overflow-hidden [--px:0] [--py:0]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_68%_40%,#13213d_0%,transparent_70%)]" />

      <div className="absolute inset-0 hidden md:block" data-speed="-0.6">
        {/* Portrait: liquid frame + soft depth plate behind */}
        <div className="absolute left-[54%] top-[13%] w-[clamp(260px,24vw,420px)] [animation:fade-up_1.1s_.15s_var(--ease-out-soft)_both]">
          <div className="absolute -inset-6 rounded-[44px] bg-[radial-gradient(closest-side,#1a2a4d,transparent)] opacity-70 transition-transform duration-[1.2s] ease-out" style={depth(-14)} />
          <div className="group liquid relative rounded-[34px] p-2 transition-transform duration-[1s] ease-out" style={depth(12)} onPointerMove={sheen}>
            <div className="sheen relative aspect-[4/5] overflow-hidden rounded-[26px] bg-coal">
              <img src={portrait} alt="Aryan Kumar" fetchPriority="high" className={`h-full w-full object-cover ${FACE} transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]`} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10" />
            </div>
            <div className="flex items-center justify-between px-3 pb-1 pt-3">
              <span className="label text-bone/80">Aryan Kumar</span>
              <span className="label flex items-center gap-2 text-mute"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" /> Available</span>
            </div>
          </div>
        </div>
        {layers.map(([item, l, t, w, n], i) => (
          <button key={item.id} onClick={() => onOpen(item)} data-cursor="Play" aria-label={`Play ${item.title}`}
            style={{ left: l, top: t, width: w, animationDelay: `${0.35 + i * 0.1}s` }}
            className="group absolute [animation:fade-up_1s_var(--ease-out-soft)_both]">
            <div className="overflow-hidden rounded-[18px] bg-coal shadow-[0_30px_60px_-24px_rgba(0,0,0,.9)] ring-1 ring-white/10 transition-transform duration-[900ms] ease-out" style={depth(n)}>
              <img src={thumb(item.id, 640)} alt={item.title} decoding="async" referrerPolicy="no-referrer" className={`w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-100 ${item.format === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'}`} />
            </div>
          </button>
        ))}
      </div>

      {/* Mobile: portrait as a rounded card */}
      <div className="absolute inset-x-5 top-20 md:hidden [animation:fade-up_.9s_.1s_var(--ease-out-soft)_both]">
        <div className="liquid rounded-[30px] p-1.5"><img src={portrait} alt="Aryan Kumar" className={`aspect-[4/4.2] w-full rounded-[24px] object-cover ${FACE}`} /></div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent md:bg-gradient-to-r md:from-ink md:via-ink/50 md:to-transparent" />

      <div className={`${wrap} relative flex h-full flex-col justify-end pb-8 md:pb-14`}>
        <p className="label mb-6 flex items-center gap-3 text-mute [animation:fade-up_.8s_.1s_both]"><span className="h-px w-10 bg-mute" /> Visual Designer · Video Editor · Motion + 3D</p>
        <h1 className="text-[clamp(4.2rem,15vw,15.5rem)] font-semibold uppercase leading-[0.8] tracking-[-0.065em]">
          {['Aryan', 'Kumar'].map((w, i) => (
            <span key={w} className="block overflow-hidden pb-[0.04em]"><span className="block [animation:rise_1.1s_var(--ease-out-soft)_both]" style={{ animationDelay: `${0.05 + i * 0.1}s` }}>{w}</span></span>
          ))}
        </h1>
        <div className="mt-8 grid gap-6 border-t border-line pt-6 md:mt-10 md:grid-cols-12 md:gap-8">
          <p className="max-w-sm text-lg leading-snug text-bone/80 [animation:fade-up_.8s_.4s_both] md:col-span-4">Designing visuals that move, communicate and stay.</p>
          <ul className="label hidden space-y-1.5 text-mute md:col-span-3 md:block">
            {['Video Editing', 'Graphic Design', 'Motion Graphics', '3D'].map((s, i) => <li key={s} className="[animation:fade-up_.7s_both]" style={{ animationDelay: `${0.5 + i * 0.06}s` }}>{s}</li>)}
          </ul>
          <div className="flex flex-wrap items-center gap-3 [animation:fade-up_.8s_.6s_both] md:col-span-5 md:justify-end">
            <Magnetic href="#work" cursor="View" className="label h-14 bg-bone px-7 text-ink">View selected work →</Magnetic>
            <Magnetic href="#book" onClick={() => book()} cursor="Book" className="liquid label h-14 px-7">Book a Project</Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  const words = 'VIDEO → DESIGN → MOTION → 3D → DIGITAL → '
  return (
    <section className={`${panel} liquid-flat py-20 md:py-32`}>
      <div className="overflow-hidden whitespace-nowrap border-b border-line pb-10">
        <div className="marquee inline-block text-[clamp(2.5rem,7vw,6rem)] font-light uppercase tracking-[-0.04em] text-bone/15">{words.repeat(6)}</div>
      </div>
      <div className={`${wrap} mt-16 grid grid-cols-12 gap-6`}>
        <p className="reveal label col-span-12 text-mute md:col-span-3">00 / Profile</p>
        <h2 className="col-span-12 text-[clamp(2rem,4.6vw,4.4rem)] font-medium leading-[1] tracking-[-0.045em] md:col-span-9">
          <span className="line-mask"><span>Designer by education,</span></span>
          <span className="line-mask"><span className="text-mute" style={d(100)}>visual storyteller by practice.</span></span>
        </h2>
        <p className="reveal col-span-12 max-w-xl text-[15px] leading-relaxed text-mute md:col-span-5 md:col-start-4" style={d(120)}>
          Multidisciplinary visual designer working across video editing, graphic design, motion graphics, 3D and digital experiences. Currently studying for a B.Des in Advertising, Graphic & Web Designing at Galgotias University, trained in 3D Animation & Video Editing at RK Films & Media Academy.
        </p>
        <dl className="col-span-12 grid grid-cols-3 gap-3 md:col-span-4 md:col-start-9">
          {[['2+', 'Years practice'], [String(shortForm.length + longForm.length + cinematic.length + motion.length + 1), 'Videos here'], ['6', 'Clients shown']].map(([n, l], i) => (
            <div key={l} className="reveal rounded-[var(--radius-control)] border border-line p-4" style={d(200 + i * 80)}><dt className="text-3xl font-semibold tracking-tight md:text-4xl">{n}</dt><dd className="label mt-2 text-mute">{l}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  )
}

type O = { open: (list: Item[]) => (i: Item) => void }

function Selected({ open }: O) {
  const list = [featured.tamala, featured.ys, featured.amar, featured.cyber, featured.render, motion[0]]
  const o = open(list)
  return (
    <section id="work" className={`${wrap} py-24 md:py-36`}>
      <SectionHead index="01" kicker="Selected Work" title={['Selected', 'Work']} />
      <div>
        <Media item={featured.tamala} onOpen={o} ratio="aspect-[4/5] md:aspect-[21/9]" w={1800} showMeta={false} />
        <div className="reveal mt-5 grid grid-cols-12 gap-6 px-1" style={d(100)}>
          <p className="label col-span-12 text-signal md:col-span-3">Featured · Client</p>
          <h3 className="col-span-12 text-4xl font-semibold uppercase tracking-[-0.05em] md:col-span-5 md:text-6xl">Tamala Leaf</h3>
          <p className="label col-span-12 text-mute md:col-span-4 md:text-right">Event highlight / Videography / Editing</p>
        </div>
      </div>
      <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-16">
        <div className="col-span-12 md:col-span-8"><Media item={featured.ys} onOpen={o} w={1400} /></div>
        <div className="col-span-8 col-start-3 md:col-span-3 md:col-start-10 md:mt-40" data-speed="-0.4"><Media item={featured.amar} onOpen={o} w={640} delay={120} /></div>
        <div className="col-span-12 md:col-span-5 md:col-start-2"><Media item={featured.render} onOpen={o} /></div>
        <div className="col-span-12 md:col-span-6 md:col-start-7 md:-mt-24" data-speed="-0.25"><Media item={featured.cyber} onOpen={o} w={1400} delay={120} /></div>
      </div>
    </section>
  )
}

function Video({ open }: O) {
  const tabs = { 'Short Form': shortForm, 'Long Form': longForm, 'Cinematic': cinematic } as const
  const keys = Object.keys(tabs) as (keyof typeof tabs)[]
  const [tab, setTab] = useState<keyof typeof tabs>('Short Form')
  const list = tabs[tab]
  const o = open(list)
  const strip = useRef<HTMLDivElement>(null)
  useReveal(tab)
  const ti = keys.indexOf(tab)
  return (
    <section id="video" className={`${panel} bg-coal py-24 ring-1 ring-inset ring-white/5 md:py-36`}>
      <div className={wrap}>
        <SectionHead index="02" kicker="Video Editing" title={['Video', 'Editing']}>
          Reels, event films, podcasts and cinematic edits. Every frame below plays the original file, streamed from Google Drive.
        </SectionHead>
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Liquid segmented control with sliding thumb */}
          <div role="tablist" className="liquid-flat relative grid grid-cols-3 rounded-full p-1">
            <span className="absolute inset-y-1 left-1 w-[calc((100%-8px)/3)] rounded-full bg-bone transition-transform duration-500 ease-[var(--ease-liquid)]" style={{ transform: `translateX(${ti * 100}%)` }} />
            {keys.map((k) => (
              <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
                className={`relative z-10 h-11 whitespace-nowrap px-4 text-sm font-medium tracking-tight transition-colors duration-300 md:px-7 md:text-base ${tab === k ? 'text-ink' : 'text-mute hover:text-bone'}`}>
                {k} <span className="label !text-[10px] opacity-60">{tabs[k].length}</span>
              </button>
            ))}
          </div>
          <div className="hidden gap-2 md:flex">
            {[-1, 1].map((n) => <button key={n} onClick={() => strip.current?.scrollBy({ left: n * 600, behavior: 'smooth' })} className="liquid-flat btn-liquid label h-11 w-11 rounded-full hover:bg-bone hover:text-ink">{n < 0 ? '←' : '→'}</button>)}
          </div>
        </div>
      </div>
      {tab === 'Long Form' ? (
        <div key={tab} className={`${wrap} mt-12 grid grid-cols-12 gap-x-6 gap-y-14`}>
          {list.map((it, i) => (
            <div key={it.id} className={i === 0 ? 'col-span-12' : 'col-span-12 md:col-span-6'}><Media item={it} onOpen={o} w={i === 0 ? 1800 : 1000} delay={(i % 2) * 100} ratio={i === 0 ? 'aspect-video md:aspect-[2.2/1]' : undefined} /></div>
          ))}
        </div>
      ) : (
        <div key={tab} ref={strip} className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:gap-6 md:px-10">
          {list.map((it, i) => (
            <div key={it.id} className={`shrink-0 snap-start ${it.format === 'wide' ? 'w-[85vw] md:w-[640px]' : i % 4 === 0 ? 'w-[62vw] md:w-[340px]' : 'w-[52vw] md:w-[260px]'} ${i % 4 === 1 ? 'md:mt-16' : ''}`}>
              <p className="label mb-2 px-1 text-mute">{String(i + 1).padStart(2, '0')}{it.group ? ` — ${it.group}` : ''}</p>
              <Media item={it} onOpen={o} w={560} delay={Math.min(i, 5) * 70} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function Design({ open }: O) {
  const all = [...documents, ...posters, ...montage]
  const o = open(all)
  useReveal()
  return (
    <section id="design" className={`${wrap} py-24 md:py-36`}>
      <SectionHead index="03" kicker="Graphic Design" title={['Graphic', 'Design']}>
        Typographic posters, advertising, print brochures and social design.
      </SectionHead>
      <div className="grid grid-cols-12 gap-x-6 gap-y-16">
        <div className="col-span-12 md:col-span-6"><Media item={documents[0]} onOpen={o} ratio="aspect-[4/3]" w={1400} /></div>
        <div className="col-span-6 md:col-span-3 md:mt-32" data-speed="-0.3"><Media item={documents[1]} onOpen={o} ratio="aspect-[3/4]" w={700} delay={100} /></div>
        <div className="col-span-6 md:col-span-3"><Media item={documents[2]} onOpen={o} ratio="aspect-[3/4]" w={700} delay={200} /></div>
        <div className="col-span-12 grid grid-cols-12 items-end gap-6 border-t border-line pt-8">
          <p className="reveal col-span-12 text-[clamp(2rem,4vw,3.6rem)] font-medium leading-none tracking-[-0.045em] md:col-span-5">Serif / Sans-serif —<br /><span className="text-mute">two studies in type.</span></p>
          <div className="col-span-6 md:col-span-3 md:col-start-7"><Media item={documents[3]} onOpen={o} ratio="aspect-[3/4]" w={700} /></div>
          <div className="col-span-6 md:col-span-3"><Media item={documents[2]} onOpen={o} ratio="aspect-[3/4]" w={700} showMeta={false} delay={100} /></div>
        </div>
      </div>
      <p className="reveal label mt-24 mb-6 text-mute">Social & poster design — {posters.length} pieces</p>
      <div className="columns-2 gap-4 md:columns-4 md:gap-6">
        {posters.map((p, i) => <div key={p.id} className="mb-8 break-inside-avoid"><Media item={p} onOpen={o} ratio="aspect-[4/5]" w={600} delay={(i % 4) * 70} /></div>)}
      </div>
      <p className="reveal label mt-20 mb-6 text-mute">Montage / Composites</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
        {montage.map((m, i) => <Media key={m.id} item={m} onOpen={o} ratio="aspect-square" w={560} delay={i * 60} />)}
      </div>
    </section>
  )
}

function Motion({ open }: O) {
  const o = open(motion)
  const [active, setActive] = useState(0)
  return (
    <section id="motion" className={`${panel} relative bg-navy/50 py-24 ring-1 ring-inset ring-white/5 md:py-36`}>
      <div className="pointer-events-none absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,#16264a_0%,transparent_65%)] opacity-60" />
      <div className={`${wrap} relative`}>
        <SectionHead index="04" kicker="Motion Graphics" title={['Motion']}>Logo animations and motion renders. Hover a title to change the frame, click to play.</SectionHead>
        <div className="grid grid-cols-12 gap-6">
          <ul className="col-span-12 md:col-span-5">
            {motion.map((m, i) => (
              <li key={m.id} className="reveal" style={d(i * 60)}>
                <button onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => o(m)} data-cursor="Play"
                  className={`group flex w-full items-baseline gap-5 rounded-[var(--radius-control)] px-4 py-5 text-left transition-colors duration-300 ${active === i ? 'bg-white/[.04]' : ''}`}>
                  <span className="label text-mute">0{i + 1}</span>
                  <span className={`text-3xl font-medium tracking-[-0.04em] transition duration-500 ease-[var(--ease-out-soft)] md:text-5xl ${active === i ? 'translate-x-2 text-bone' : 'text-bone/30'}`}>{m.title}</span>
                  <span className="label ml-auto hidden text-mute sm:inline">{m.tags[0]}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="col-span-12 md:col-span-7">
            {/* No backdrop-filter here: sticky + blur over scrolling content was the main scroll cost. */}
            <div className="liquid-flat sticky top-24 rounded-[calc(var(--radius-media)+8px)] p-2">
              <div className="relative aspect-video overflow-hidden rounded-[var(--radius-media)] bg-coal">
                {motion.map((m, i) => (
                  <img key={m.id} src={thumb(m.id, 1200)} alt={m.title} loading="lazy" decoding="async" referrerPolicy="no-referrer"
                    className={`absolute inset-0 h-full w-full object-cover transition duration-700 ease-[var(--ease-out-soft)] ${active === i ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`} />
                ))}
                <button onClick={() => o(motion[active])} data-cursor="Play" className="absolute inset-0 flex items-end justify-between p-4 text-bone">
                  <span className="label">{motion[active].file}</span>
                  <span className="label flex h-9 items-center rounded-full bg-bone px-3.5 text-ink">Play ▸</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ThreeD({ open }: O) {
  const o = open([featured.render, motion[4]])
  const box = useRef<HTMLDivElement>(null)
  const raf = useRef(0)
  const tilt = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => (box.current!.style.transform = `rotateY(${x * 10}deg) rotateX(${y * -8}deg)`))
  }
  return (
    <section id="3d" className={`${wrap} py-24 md:py-36`}>
      <SectionHead index="05" kicker="3D" title={['3D']}>A personal 3D project: a 250-frame render sequence (0001–0250).</SectionHead>
      <div className="grid grid-cols-12 items-center gap-6">
        <div className="relative col-span-12 [perspective:1600px] md:col-span-9" onPointerMove={tilt} onPointerLeave={() => (box.current!.style.transform = '')}>
          <div className="pointer-events-none absolute -left-10 -top-16 h-72 w-72 rounded-full border border-signal/20 will-change-transform [animation:spin3d_40s_linear_infinite] [transform:rotateX(62deg)]" />
          <div ref={box} className="relative transition-transform duration-700 ease-out [transform-style:preserve-3d]">
            <Media item={featured.render} onOpen={o} ratio="aspect-video" w={1800} showMeta={false} />
            <div className="liquid-flat absolute -bottom-10 right-4 w-48 rounded-[calc(var(--radius-media)+6px)] p-1.5 [transform:translateZ(60px)] md:-right-16 md:w-72">
              <Media item={motion[4]} onOpen={o} ratio="aspect-video" w={600} showMeta={false} delay={200} />
            </div>
          </div>
        </div>
        <dl className="col-span-12 mt-16 grid grid-cols-2 gap-3 md:col-span-3 md:mt-0 md:grid-cols-1">
          {[['Project', 'Personal 3D'], ['Frames', '0001 — 0250'], ['Output', 'MP4 / MKV render'], ['Training', 'RK Films & Media Academy']].map(([k, val], i) => (
            <div key={k} className="reveal rounded-[var(--radius-control)] border border-line p-4" style={d(i * 70)}><dt className="label text-mute">{k}</dt><dd className="mt-1 text-lg tracking-tight">{val}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Digital() {
  return (
    <section className={`${wrap} pb-24 md:pb-36`}>
      <SectionHead index="06" kicker="Digital Experiences" title={['Digital', 'Experiences']} />
      <div className="reveal liquid-flat overflow-hidden rounded-[var(--radius-panel)]">
        <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
          {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-white/10" />)}
          <span className="label ml-4 rounded-full bg-white/5 px-3 py-1 text-mute">aryankumar.design / ui</span>
        </div>
        <div className="grid min-h-[340px] place-items-center bg-[linear-gradient(rgba(236,235,230,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(236,235,230,.04)_1px,transparent_1px)] bg-[size:48px_48px] p-10 text-center">
          <div>
            <p className="label text-signal">Media needed</p>
            <p className="mx-auto mt-4 max-w-md text-2xl font-medium leading-tight tracking-[-0.03em]">The Drive sources don't include any UI or website screens yet.</p>
            <p className="mx-auto mt-3 max-w-md text-sm text-mute">Share the Figma frames or exports and they'll go into this browser frame. Until then this section stays empty instead of showing placeholder work.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Clients({ open }: O) {
  const [sel, setSel] = useState(0)
  const c = clients[sel]
  const o = open(c.items)
  useReveal(sel)
  return (
    <section className={`${panel} bg-coal py-24 ring-1 ring-inset ring-white/5 md:py-36`}>
      <div className={wrap}>
        <SectionHead index="07" kicker="Client Work" title={['Client', 'Work']}>
          Real deliveries for real brands. Client names are only shown where the source files name them.
        </SectionHead>
        <div className="grid grid-cols-12 gap-6">
          <ul className="col-span-12 space-y-1 md:col-span-4">
            {clients.map((cl, i) => (
              <li key={cl.name} className="reveal" style={d(i * 50)}>
                <button onClick={() => setSel(i)} className={`flex w-full items-baseline justify-between rounded-[var(--radius-control)] px-4 py-4 text-left transition duration-300 ${sel === i ? 'liquid-flat text-bone' : 'text-mute hover:bg-white/[.03] hover:text-bone'}`}>
                  <span className="text-2xl font-medium tracking-[-0.03em]">{cl.name}</span>
                  <span className="label">{String(cl.items.length).padStart(2, '0')}</span>
                </button>
              </li>
            ))}
            <li className="reveal px-4 py-4 text-mute" style={d(320)}>
              <span className="text-2xl font-medium tracking-[-0.03em]">Spiral Studios</span>
              <p className="label mt-1">Founder's studio · media still to be matched</p>
            </li>
          </ul>
          <div key={c.name} className="col-span-12 md:col-span-8 md:pl-8">
            <p className="label text-signal [animation:fade-up_.5s_both]">{c.scope}</p>
            <div className={`mt-6 grid gap-4 ${c.items.length > 2 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'}`}>
              {c.items.map((it, i) => (
                <div key={it.id} className={it.format === 'wide' ? 'col-span-2' : ''}><Media item={it} onOpen={o} w={it.format === 'wide' ? 1200 : 560} delay={i * 70} /></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const timeline = [
    ['Education', 'Bachelor of Design', 'Advertising, Graphic & Web Designing — Galgotias University, School of Design'],
    ['Training', '3D Animation & Video Editing', 'RK Films & Media Academy (RKFMA)'],
    ['Experience', 'Spiral Studios', 'Founder / Creative: direction, production, photography, editing, branding'],
    ['Experience', 'Freelance', 'Video Editor & Graphic Designer: short and long form, motion, social'],
    ['Experience', 'Kridha Production', 'Freelance Video Editor / Creative: post-production'],
    ['Experience', 'Bakeasso', 'Social Media / Video & Content'],
  ]
  const skills: [string, string[], string][] = [
    ['Video', ['Short-form', 'Long-form', 'Cinematic editing', 'Color treatment', 'Sound design', 'Compositing'], 'Premiere Pro · DaVinci Resolve · CapCut'],
    ['Design', ['Graphic design', 'Brand identity', 'Social media', 'Advertising', 'Typography', 'Layout'], 'Photoshop · Illustrator'],
    ['Motion', ['Motion graphics', 'Animation', 'Visual effects', 'Compositing'], 'After Effects'],
    ['3D', ['Modelling', 'Animation', 'Visualisation'], 'Autodesk Maya'],
    ['Digital', ['UI design', 'Digital experiences'], 'Figma'],
  ]
  return (
    <section id="about" className={`${wrap} py-24 md:py-36`}>
      <SectionHead index="08" kicker="About / Experience" title={['About']} />
      <div className="grid grid-cols-12 gap-x-6 gap-y-16">
        {/* Portrait — tall crop, liquid frame, slow parallax */}
        <figure className="col-span-12 sm:col-span-6 md:col-span-4" data-speed="-0.2">
          <div className="reveal liquid rounded-[34px] p-2 [backdrop-filter:none]">
            <div className="reveal-media aspect-[3/4] overflow-hidden rounded-[26px] bg-coal">
              <img src={portrait} alt="Portrait of Aryan Kumar" loading="lazy" decoding="async" className={`h-full w-full object-cover ${FACE}`} />
            </div>
          </div>
          <figcaption className="label mt-3 flex justify-between px-2 text-mute"><span>Aryan Kumar</span><span>Visual Designer · Editor</span></figcaption>
        </figure>
        <ol className="col-span-12 md:col-span-4">
          {timeline.map(([k, t, desc], i) => (
            <li key={i} className="reveal grid grid-cols-[88px_1fr] gap-4 border-t border-line py-5" style={d(i * 60)}>
              <span className="label pt-1.5 text-mute">{k}</span>
              <div><p className="text-xl font-medium tracking-tight">{t}</p><p className="mt-1 text-sm text-mute">{desc}</p></div>
            </li>
          ))}
        </ol>
        <div className="col-span-12 space-y-2 md:col-span-4">
          <p className="label mb-4 text-mute">Skills → Software</p>
          {skills.map(([k, list, sw], i) => (
            <div key={k} className="reveal liquid-flat rounded-[var(--radius-control)] p-5" style={d(i * 60)}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-2xl font-semibold uppercase tracking-[-0.05em]">{k}</h3>
                <span className="label text-signal">{sw}</span>
              </div>
              <p className="mt-2 text-sm text-mute">{list.join(' / ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ book }: { book: (p?: Preset) => void }) {
  return (
    <section id="contact" className={`${panel} relative ring-1 ring-inset ring-white/5`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_100%,#11203d_0%,transparent_70%)]" />
      <div className={`${wrap} relative py-24 md:py-36`}>
        <div className="reveal flex items-center gap-3">
          <img src={portrait} alt="" loading="lazy" className={`h-11 w-11 rounded-[13px] object-cover ${FACE} ring-1 ring-white/15`} />
          <p className="label text-mute">10 / Contact — Aryan Kumar</p>
        </div>
        <h2 className="mt-8 text-[clamp(3.6rem,13vw,13rem)] font-semibold uppercase leading-[0.82] tracking-[-0.065em]">
          <span className="line-mask"><span>Let's make</span></span>
          <span className="line-mask"><span className="text-mute" style={d(100)}>something.</span></span>
        </h2>
        <div className="mt-16 grid gap-10 border-t border-line pt-8 md:grid-cols-12">
          <div className="reveal flex flex-wrap gap-3 md:col-span-5">
            <Magnetic href="#book" onClick={() => book()} cursor="Book" className="label h-16 bg-bone px-8 text-ink">Book a Project →</Magnetic>
            <Magnetic href="#book" onClick={() => book()} className="liquid label h-16 px-8">Get a Custom Quote</Magnetic>
            <Magnetic href={IG} cursor="Open" className="liquid label h-16 px-8">View Instagram ↗</Magnetic>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 md:col-span-7">
            {[['Email', EMAIL, `mailto:${EMAIL}`], ['Phone', '+91 78277 00407', 'tel:+917827700407'], ['Instagram', '@ary_x666', IG]].map(([k, val, h], i) => (
              <a key={k} href={h} data-cursor="Open" onPointerMove={sheen} className="reveal sheen liquid-flat block rounded-[var(--radius-control)] p-4 transition-transform duration-500 ease-[var(--ease-liquid)] hover:-translate-y-1" style={d(i * 70)}>
                <span className="label block text-mute">{k}</span><span className="mt-2 block break-all text-base tracking-tight">{val}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <footer className={`${wrap} relative flex flex-col gap-3 border-t border-line py-6 md:flex-row md:items-center md:justify-between`}>
        <p className="text-[13px] font-semibold uppercase">Aryan Kumar</p>
        <p className="label text-mute">Visual Designer · Video Editor · Motion + 3D</p>
        <p className="label text-mute">© 2026 Aryan Kumar</p>
      </footer>
    </section>
  )
}
