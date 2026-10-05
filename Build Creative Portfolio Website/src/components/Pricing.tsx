import { useEffect, useRef, useState } from 'react'
import { addOns, fromPrice, priced, retainers, three, ui, waLink, type Cat, type Pkg, type Preset } from '../pricing'
import { Magnetic, SectionHead, sheen } from './ui'

const d = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties
const inr = (n: number) => '₹' + n.toLocaleString('en-IN')

/** Counts up once when scrolled into view; static under reduced motion. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current!
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.textContent = inr(0)
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / 900)
        el.textContent = inr(Math.round(to * (1 - Math.pow(1 - k, 3))))
        if (k < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{inr(to)}</span>
}

function Row({ pkg, open, onToggle, onBook, note }: { pkg: Pkg; open: boolean; onToggle: () => void; onBook: () => void; note?: string }) {
  return (
    <li className={`rounded-[var(--radius-control)] transition-colors duration-300 ${open ? 'liquid-flat' : 'hover:bg-white/[.03]'}`}>
      <button onClick={onToggle} aria-expanded={open} className="flex min-h-16 w-full items-center gap-4 px-4 py-3 text-left md:px-5">
        <span className="flex-1">
          <span className="block text-[17px] font-medium tracking-tight md:text-lg">{pkg.name}</span>
          {pkg.scope && <span className="label mt-0.5 block !text-[10px] text-mute">{pkg.scope}</span>}
        </span>
        <span className="text-right text-[15px] tabular-nums tracking-tight text-bone md:text-lg">{pkg.range}</span>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-mute transition-transform duration-500 ease-[var(--ease-liquid)] ${open ? 'rotate-45 bg-bone text-ink' : ''}`}>+</span>
      </button>
      {/* grid-rows trick: animates height without measuring */}
      <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-soft)] ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="flex flex-col gap-5 px-4 pb-5 md:flex-row md:items-end md:justify-between md:px-5">
            <div>
              {pkg.includes ? (
                <ul className="grid gap-x-8 gap-y-1.5 text-sm text-mute sm:grid-cols-2">
                  {pkg.includes.map((x) => <li key={x} className="flex gap-2"><span className="text-signal">—</span>{x}</li>)}
                </ul>
              ) : <p className="max-w-sm text-sm text-mute">{note ?? 'Scope confirmed after a short brief.'}</p>}
              <p className="label mt-4 text-mute">Starting from <span className="text-bone">{inr(pkg.from)}</span></p>
            </div>
            <button onClick={onBook} className="btn-liquid label h-12 shrink-0 rounded-full bg-bone px-6 text-ink">Book this service →</button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Pricing({ book }: { book: (p?: Preset) => void }) {
  const [active, setActive] = useState(0)
  const [openRow, setOpenRow] = useState<string | null>(null)
  const detail = useRef<HTMLDivElement>(null)
  const cat: Cat = priced[active]
  const view = (i: number) => { setActive(i); setOpenRow(null); detail.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  const blurbs = ['Short-form, long-form, events and brand films.', 'Type, logos, ads, explainers and VFX.', 'Social, branding, print and advertising.', 'Product, restaurant and event shoots.']

  return (
    <section id="pricing" className="relative mx-3 rounded-[var(--radius-panel)] bg-coal py-24 ring-1 ring-inset ring-white/5 md:mx-4 md:py-36">
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <SectionHead index="09" kicker="Pricing / Services" title={['Pricing']}>
          <span className="text-bone">Transparent pricing. Flexible scope. Custom solutions.</span> Starting ranges for every service. Open a category to see exactly what's included.
        </SectionHead>

        {/* Overview — progressive disclosure: price first, detail on demand */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {priced.map((c, i) => (
            <button key={c.id} onClick={() => view(i)} onPointerMove={sheen}
              className={`reveal sheen group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[var(--radius-media)] p-6 text-left transition-transform duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 ${['lg:col-span-5 lg:row-span-2 lg:min-h-[460px]', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-7'][i]} ${active === i ? 'liquid-flat' : 'border border-line'}`}
              style={d(i * 80)}>
              <div className="flex items-start justify-between gap-4">
                <span className="label text-mute">0{i + 1}</span>
                <span className={`label rounded-full px-2.5 py-1 !text-[10px] ${active === i ? 'bg-bone text-ink' : 'text-mute'}`}>{active === i ? 'Viewing' : `${c.groups.reduce((n, g) => n + g.pkgs.length, 0)} services`}</span>
              </div>
              <div>
                <h3 className={`font-semibold uppercase leading-[0.9] tracking-[-0.05em] ${i === 0 ? 'text-5xl md:text-7xl' : 'text-3xl md:text-4xl'}`}>{c.title}</h3>
                <p className="mt-3 max-w-xs text-sm text-mute">{blurbs[i]}</p>
                <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-4">
                  <div><p className="label text-mute">Starting from</p><p className="mt-1 text-3xl font-medium tabular-nums tracking-tight md:text-4xl"><CountUp to={fromPrice(c)} /></p></div>
                  <span className="label text-bone transition-transform duration-500 ease-[var(--ease-liquid)] group-hover:translate-x-1">View pricing →</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div ref={detail} className="scroll-mt-24 pt-20">
          <div role="tablist" className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {priced.map((c, i) => (
              <button key={c.id} role="tab" aria-selected={active === i} onClick={() => { setActive(i); setOpenRow(null) }}
                className={`btn-liquid label h-11 shrink-0 rounded-full px-5 ${active === i ? 'bg-bone text-ink' : 'border border-line text-mute hover:text-bone'}`}>{c.title}</button>
            ))}
          </div>
          <div key={cat.id} className="mt-10 grid grid-cols-12 gap-x-6 gap-y-12 [animation:fade-up_.5s_var(--ease-out-soft)_both]">
            <div className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h3 className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em]">{cat.title}</h3>
                <p className="mt-4 max-w-sm text-mute">{cat.blurb}</p>
                {cat.note && <p className="mt-6 max-w-sm rounded-[var(--radius-control)] border border-line p-4 text-sm text-mute"><span className="label mb-1 block text-signal">Note</span>{cat.note}</p>}
              </div>
            </div>
            <div className="col-span-12 space-y-12 lg:col-span-8">
              {cat.groups.map((g) => (
                <div key={g.title}>
                  {cat.groups.length > 1 && <p className="label mb-3 px-1 text-mute">{g.title}</p>}
                  <ul className="space-y-1 border-t border-line pt-2">
                    {g.pkgs.map((pkg) => (
                      <Row key={pkg.name} pkg={pkg} note={cat.note} open={openRow === pkg.name} onToggle={() => setOpenRow(openRow === pkg.name ? null : pkg.name)}
                        onBook={() => book({ cat: cat.id === 'design' && g.title === 'Branding' ? 'branding' : cat.id === 'photo' && /Videography/.test(pkg.name) ? 'videography' : cat.id, pkg: pkg.name })} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Retainers */}
        <div className="mt-28">
          <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="label text-mute">Social Media</p><h3 className="mt-2 text-4xl font-semibold uppercase tracking-[-0.05em] md:text-6xl">Monthly Retainers</h3></div>
            <p className="max-w-xs text-sm text-mute">Consistent content, one point of contact, planned month by month.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {retainers.map((r, i) => (
              <article key={r.tier} onPointerMove={sheen} className={`reveal sheen relative flex flex-col rounded-[var(--radius-media)] p-6 md:p-7 ${i === 2 ? 'liquid-flat ring-1 ring-signal/20' : 'border border-line'}`} style={d(i * 90)}>
                <div className="flex items-center justify-between"><p className="label text-mute">0{i + 1} / {r.tier}</p>{i === 2 && <span className="label !text-[10px] text-signal">Most complete</span>}</div>
                <p className="mt-10 text-4xl font-medium tabular-nums tracking-[-0.03em] md:text-5xl">{r.range}</p>
                <p className="label mt-1 text-mute">/ month</p>
                <ul className="mt-8 flex-1 space-y-2.5 border-t border-line pt-6 text-sm">
                  {r.includes!.map((x) => <li key={x} className="flex gap-3"><span className="text-signal">—</span><span className="text-bone/85">{x}</span></li>)}
                </ul>
                <button onClick={() => book({ cat: 'social', pkg: r.name })} className={`btn-liquid label mt-8 h-12 rounded-full ${i === 2 ? 'bg-bone text-ink' : 'border border-line hover:bg-bone hover:text-ink'}`}>Book {r.tier} →</button>
              </article>
            ))}
          </div>
        </div>

        {/* Custom quote categories */}
        <div className="mt-28 grid gap-3 md:grid-cols-2">
          {[ui, three].map((c, i) => (
            <article key={c.id} className="reveal flex flex-col rounded-[var(--radius-media)] border border-line p-6 md:p-8" style={d(i * 90)}>
              <div className="flex items-center justify-between"><p className="label text-mute">{c.title}</p><span className="label rounded-full border border-line px-2.5 py-1 !text-[10px]">Custom quote</span></div>
              <h3 className="mt-8 text-3xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] md:text-5xl">{c.title}</h3>
              <ul className="mt-6 flex flex-wrap gap-2">{c.custom!.services.map((s) => <li key={s} className="rounded-[var(--radius-chip)] bg-white/[.05] px-3 py-1.5 text-sm text-bone/85">{s}</li>)}</ul>
              <p className="mt-8 flex-1 text-lg font-medium tracking-tight">{c.custom!.line}</p>
              <button onClick={() => book({ cat: c.id })} className="btn-liquid label mt-8 h-12 self-start rounded-full border border-line px-6 hover:bg-bone hover:text-ink">{c.custom!.cta} →</button>
            </article>
          ))}
        </div>

        {/* Add-ons */}
        <details className="reveal group mt-3 rounded-[var(--radius-media)] border border-line open:liquid-flat">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between px-6 py-4 [&::-webkit-details-marker]:hidden">
            <span><span className="label text-mute">Extras</span><span className="ml-4 text-2xl font-semibold uppercase tracking-[-0.04em]">Add-ons</span></span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition-transform duration-500 ease-[var(--ease-liquid)] group-open:rotate-45">+</span>
          </summary>
          <ul className="grid gap-x-10 px-6 pb-6 sm:grid-cols-2 lg:grid-cols-3">
            {addOns.map(([n, r]) => <li key={n} className="flex items-baseline justify-between gap-4 border-t border-line py-3 text-sm"><span className="text-bone/85">{n}</span><span className="tabular-nums text-mute">{r}</span></li>)}
          </ul>
        </details>

        {/* Disclaimer */}
        <div className="reveal mt-20 grid grid-cols-12 gap-6 border-t border-line pt-8">
          <p className="col-span-12 text-sm leading-relaxed text-mute md:col-span-6"><span className="text-bone">All prices are starting ranges.</span> Final quotations depend on project scope, footage quality, duration, complexity, number of deliverables, revisions, turnaround time and production requirements.</p>
          <div className="col-span-12 flex flex-wrap items-center gap-4 md:col-span-5 md:col-start-8 md:justify-end">
            <p className="text-lg font-medium tracking-tight">Need something custom? Let's discuss your project.</p>
            <button onClick={() => book()} className="btn-liquid label h-12 rounded-full border border-line px-6 hover:bg-bone hover:text-ink">Get a Custom Quote</button>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="reveal mt-28 rounded-[var(--radius-panel)] border border-line bg-[radial-gradient(80%_120%_at_50%_120%,#13213d,transparent_70%)] px-6 py-16 text-center md:py-24">
          <p className="label text-mute">Have a project in mind?</p>
          <h3 className="mx-auto mt-6 max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">Let's turn the idea into something worth watching.</h3>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Magnetic href="#book" onClick={() => book()} cursor="Book" className="label h-14 bg-bone px-7 text-ink">Book a Project →</Magnetic>
            <Magnetic href={waLink('Hi Aryan, I found your portfolio and would like to discuss a project.')} cursor="Open" className="liquid label h-14 px-7">Discuss on WhatsApp</Magnetic>
          </div>
          <p className="label mt-6 text-mute">WhatsApp · +91 78277 00407</p>
        </div>
      </div>

      {/* Mobile sticky CTA — lives inside the section so it only shows while pricing is on screen */}
      <div className="pointer-events-none sticky bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 mt-10 flex pl-4 pr-20 md:hidden">
        <button onClick={() => book()} className="liquid pointer-events-auto label h-14 flex-1 rounded-full text-bone">Book a Project →</button>
      </div>
    </section>
  )
}
