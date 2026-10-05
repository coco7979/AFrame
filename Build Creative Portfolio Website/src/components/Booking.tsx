import { useEffect, useMemo, useRef, useState } from 'react'
import { bookCats, CUSTOM, waLink, type Preset } from '../pricing'

const STEPS = ['What do you need?', 'Select service', 'Project details', 'Summary']
const BUDGETS = ['₹1,000–5,000', '₹5,000–10,000', '₹10,000–20,000', '₹20,000–50,000', '₹50,000+', 'Not Sure']
const NOT_SURE = 'Not sure yet — help me choose'
type Form = { name: string; email: string; wa: string; company: string; desc: string; deliverables: string; deadline: string; budget: string; link: string }
const empty: Form = { name: '', email: '', wa: '', company: '', desc: '', deliverables: '', deadline: '', budget: '', link: '' }

const fmtDate = (v: string) => (v ? new Date(v + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '')

export default function Booking({ preset, onClose }: { preset?: Preset; onClose: () => void }) {
  const initCat = bookCats.find((c) => c.id === preset?.cat)
  const [step, setStep] = useState(preset?.pkg ? 2 : initCat ? 1 : 0)
  const [catId, setCatId] = useState(initCat?.id ?? '')
  const [type, setType] = useState('')
  const [pkg, setPkg] = useState(preset?.pkg ?? (initCat?.custom ? CUSTOM : ''))
  const [f, setF] = useState<Form>(empty)
  const [err, setErr] = useState<Partial<Record<keyof Form | 'cat' | 'pkg', string>>>({})
  const [sent, setSent] = useState(false)
  const body = useRef<HTMLDivElement>(null)

  const cat = bookCats.find((c) => c.id === catId)
  const pkgObj = cat?.pkgs.find((x) => x.name === pkg)
  const estimate = pkgObj ? pkgObj.range : cat?.custom ? 'Custom quote' : pkg ? 'To be discussed' : '—'

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    addEventListener('keydown', k)
    document.documentElement.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.documentElement.style.overflow = '' }
  }, [onClose])
  useEffect(() => { body.current?.scrollTo({ top: 0 }) ; body.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true }) }, [step])

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { setF({ ...f, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: undefined }) }

  const validate = (s: number) => {
    const e: typeof err = {}
    if (s === 0 && !catId) e.cat = 'Pick a category to continue.'
    if (s === 1 && !pkg) e.pkg = 'Choose a package, or "Not sure yet".'
    if (s === 2) {
      if (f.name.trim().length < 2) e.name = 'Please enter your name.'
      if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
      if (f.wa.replace(/\D/g, '').length < 10) e.wa = 'Enter a WhatsApp number with at least 10 digits.'
      if (f.desc.trim().length < 10) e.desc = 'Tell Aryan a little about the project (10+ characters).'
      if (!f.budget) e.budget = 'Select a budget range.'
    }
    setErr(e)
    if (Object.keys(e).length) { body.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(); return false }
    return true
  }
  const next = () => validate(step) && setStep(step + 1)

  const message = useMemo(() => {
    const L = (k: string, v: string) => (v.trim() ? `*${k}:* ${v.trim()}\n` : '')
    return `Hi Aryan,\n\nI'd like to book a project through your portfolio.\n\n` +
      L('Name', f.name) + L('Company', f.company) + L('Email', f.email) + L('WhatsApp', f.wa) +
      L('Service', cat?.label ?? '') + L('Project type', type) + L('Package', pkg) + L('Estimated range', estimate === '—' ? '' : estimate) +
      L('Budget', f.budget) + L('Deadline', fmtDate(f.deadline)) + L('Deliverables', f.deliverables) + L('Reference', f.link) +
      `\n*Project Details:*\n${f.desc.trim()}\n\nLooking forward to discussing the project.`
  }, [f, cat, type, pkg, estimate])

  const send = () => {
    if (!validate(2)) { setStep(2); return }
    window.open(waLink(message), '_blank', 'noopener')
    setSent(true)
  }

  const summary: [string, string][] = [
    ['Service', cat?.label ?? '—'], ['Package', pkg || '—'], ['Estimate', estimate],
    ['Deadline', fmtDate(f.deadline) || '—'], ['Deliverables', f.deliverables || '—'], ['Client', f.name || '—'], ['Contact', [f.email, f.wa].filter(Boolean).join(' · ') || '—'],
  ]

  const input = 'h-13 w-full rounded-[var(--radius-control)] border border-line bg-white/[.03] px-4 py-3.5 text-[15px] text-bone outline-none transition-colors placeholder:text-mute/60 focus:border-signal/60 focus:bg-white/[.05] aria-[invalid=true]:border-red-400/60'
  const Field = ({ k, label, req, children }: { k: keyof Form; label: string; req?: boolean; children: React.ReactNode }) => (
    <label className="block">
      <span className="label mb-2 flex justify-between text-mute"><span>{label}{req && <span className="text-signal"> *</span>}</span>{!req && <span className="opacity-60">Optional</span>}</span>
      {children}
      {err[k] && <span role="alert" className="mt-1.5 block text-xs text-red-300">{err[k]}</span>}
    </label>
  )

  return (
    <div className="fixed inset-0 z-[95] flex items-end justify-center bg-ink/80 backdrop-blur-sm [animation:fade-up_.3s_both] md:items-center md:p-6" role="dialog" aria-modal="true" aria-label="Book a project" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="liquid-flat flex max-h-[94svh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[30px] [animation:modal-in_.5s_var(--ease-out-soft)_both] md:max-h-[90vh] md:rounded-[var(--radius-panel)]">
        {/* Header + progress */}
        <div className="border-b border-line px-5 pb-4 pt-5 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div><p className="label text-mute">Book a project · Step {step + 1} of 4</p><h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{STEPS[step]}</h2></div>
            <button onClick={onClose} className="btn-liquid label h-10 rounded-full border border-line px-4 hover:bg-bone hover:text-ink">Close ×</button>
          </div>
          <ol className="mt-5 grid grid-cols-4 gap-1.5">
            {STEPS.map((s, i) => (
              <li key={s}>
                <button disabled={i > step} onClick={() => setStep(i)} className="block w-full text-left disabled:cursor-default" aria-label={`Step ${i + 1}: ${s}`}>
                  <span className="block h-1 overflow-hidden rounded-full bg-white/10"><span className="block h-full origin-left rounded-full bg-bone transition-transform duration-500 ease-[var(--ease-out-soft)]" style={{ transform: `scaleX(${i <= step ? 1 : 0})` }} /></span>
                  <span className={`label mt-2 hidden !text-[10px] md:block ${i <= step ? 'text-bone' : 'text-mute'}`}>0{i + 1} {s}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid min-h-0 flex-1 md:grid-cols-[1fr_300px]">
          <div ref={body} className="min-h-0 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
            <div key={step} className="[animation:fade-up_.4s_var(--ease-out-soft)_both]">
              {step === 0 && (
                <>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {bookCats.map((c, i) => (
                      <button key={c.id} {...(i === 0 ? { 'data-autofocus': true } : {})} onClick={() => { setCatId(c.id); setType(''); setPkg(c.custom ? CUSTOM : ''); setErr({}); setStep(1) }}
                        className={`btn-liquid flex min-h-[116px] flex-col justify-between rounded-[var(--radius-control)] border p-4 text-left ${catId === c.id ? 'border-bone bg-bone text-ink' : 'border-line hover:border-white/25 hover:bg-white/[.03]'}`}>
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"><path d={c.icon} /></svg>
                        <span className="text-[15px] font-medium leading-tight tracking-tight">{c.label}</span>
                      </button>
                    ))}
                  </div>
                  {err.cat && <p role="alert" className="mt-3 text-sm text-red-300">{err.cat}</p>}
                </>
              )}

              {step === 1 && cat && (
                <div className="space-y-8">
                  {cat.types.length > 0 && (
                    <div>
                      <p className="label mb-3 text-mute">{cat.custom ? 'What are you looking for?' : 'Project type'} <span className="opacity-60">· Optional</span></p>
                      <div className="flex flex-wrap gap-2">
                        {cat.types.map((t) => <button key={t} onClick={() => setType(type === t ? '' : t)} className={`btn-liquid h-11 rounded-[var(--radius-control)] border px-4 text-sm ${type === t ? 'border-bone bg-bone text-ink' : 'border-line text-bone/85 hover:bg-white/[.04]'}`}>{t}</button>)}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="label mb-3 text-mute">Package</p>
                    {cat.custom ? (
                      <div className="rounded-[var(--radius-control)] border border-bone/40 bg-white/[.04] p-5">
                        <p className="text-lg font-medium tracking-tight">{CUSTOM}</p>
                        <p className="mt-1 text-sm text-mute">No fixed price. Aryan will quote after understanding scope, deliverables and timeline.</p>
                      </div>
                    ) : (
                      <div className="grid gap-2 sm:grid-cols-2">
                        {[...cat.pkgs, { name: NOT_SURE, range: '' }].map((x, i) => (
                          <button key={x.name} {...(i === 0 ? { 'data-autofocus': true } : {})} onClick={() => { setPkg(x.name); setErr({}) }}
                            className={`btn-liquid flex min-h-16 items-center justify-between gap-3 rounded-[var(--radius-control)] border px-4 py-3 text-left ${pkg === x.name ? 'border-bone bg-bone text-ink' : 'border-line hover:bg-white/[.04]'}`}>
                            <span className="text-[15px] font-medium leading-tight tracking-tight">{x.name}</span>
                            <span className={`shrink-0 text-sm tabular-nums ${pkg === x.name ? 'text-ink/70' : 'text-mute'}`}>{x.range}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {err.pkg && <p role="alert" className="mt-3 text-sm text-red-300">{err.pkg}</p>}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  {Field({ k: 'name', label: 'Client name', req: true, children: <input data-autofocus autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={!!err.name} className={input} placeholder="Your name" /> })}
                  {Field({ k: 'company', label: 'Company / Brand', children: <input autoComplete="organization" value={f.company} onChange={set('company')} className={input} placeholder="Brand or studio" /> })}
                  {Field({ k: 'email', label: 'Email', req: true, children: <input type="email" inputMode="email" autoComplete="email" value={f.email} onChange={set('email')} aria-invalid={!!err.email} className={input} placeholder="you@brand.com" /> })}
                  {Field({ k: 'wa', label: 'WhatsApp number', req: true, children: <input type="tel" inputMode="tel" autoComplete="tel" value={f.wa} onChange={set('wa')} aria-invalid={!!err.wa} className={input} placeholder="+91 98765 43210" /> })}
                  <div className="sm:col-span-2">{Field({ k: 'desc', label: 'Project description', req: true, children: <textarea rows={4} value={f.desc} onChange={set('desc')} aria-invalid={!!err.desc} className={`${input} resize-none`} placeholder="What's the project, who is it for, and what should it feel like?" /> })}</div>
                  {Field({ k: 'deliverables', label: 'Expected deliverables', children: <input value={f.deliverables} onChange={set('deliverables')} className={input} placeholder="e.g. 3 reels, 9:16" /> })}
                  {Field({ k: 'deadline', label: 'Preferred deadline', children: <input type="date" min={new Date().toISOString().slice(0, 10)} value={f.deadline} onChange={set('deadline')} className={`${input} [color-scheme:dark]`} /> })}
                  <div className="sm:col-span-2">
                    <span className="label mb-2 block text-mute">Budget range <span className="text-signal">*</span></span>
                    <div role="radiogroup" aria-invalid={!!err.budget} tabIndex={-1} className="grid grid-cols-2 gap-2 outline-none sm:grid-cols-3">
                      {BUDGETS.map((b) => <button key={b} role="radio" aria-checked={f.budget === b} onClick={() => { setF({ ...f, budget: b }); setErr({ ...err, budget: undefined }) }} className={`btn-liquid h-12 rounded-[var(--radius-control)] border text-sm tabular-nums ${f.budget === b ? 'border-bone bg-bone text-ink' : 'border-line hover:bg-white/[.04]'}`}>{b}</button>)}
                    </div>
                    {err.budget && <span role="alert" className="mt-1.5 block text-xs text-red-300">{err.budget}</span>}
                  </div>
                  <div className="sm:col-span-2">{Field({ k: 'link', label: 'Reference / Drive / Brief link', children: <input type="url" inputMode="url" value={f.link} onChange={set('link')} className={input} placeholder="https://" /> })}</div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="max-w-lg text-xl font-medium leading-snug tracking-tight">{sent ? 'WhatsApp should now be open with your request filled in. Press send there to deliver it to Aryan.' : 'Your project request is ready. Continue to WhatsApp to send it directly to Aryan.'}</p>
                  <dl className="mt-8 divide-y divide-line rounded-[var(--radius-control)] border border-line">
                    {summary.map(([k, v]) => <div key={k} className="grid grid-cols-[110px_1fr] gap-4 px-4 py-3 text-sm"><dt className="label pt-0.5 text-mute">{k}</dt><dd className="break-words">{v}</dd></div>)}
                  </dl>
                  <details className="mt-4 rounded-[var(--radius-control)] border border-line">
                    <summary className="label cursor-pointer list-none px-4 py-3 text-mute">Preview WhatsApp message ↓</summary>
                    <pre className="whitespace-pre-wrap px-4 pb-4 font-sans text-sm text-bone/80">{message}</pre>
                  </details>
                  <p className="mt-4 text-xs text-mute">Your details are only placed in the WhatsApp message. Nothing is stored on this site. Sending it is an enquiry, not a confirmed booking.</p>
                </div>
              )}
            </div>
          </div>

          {/* Persistent summary (desktop) */}
          <aside className="hidden border-l border-line p-6 md:block">
            <p className="label text-mute">Project summary</p>
            <dl className="mt-5 space-y-4 text-sm">
              {summary.slice(0, 4).map(([k, v]) => <div key={k}><dt className="label !text-[10px] text-mute">{k}</dt><dd className="mt-1 text-bone">{v}</dd></div>)}
            </dl>
            <p className="mt-8 text-xs leading-relaxed text-mute">All prices are starting ranges. The final quote depends on scope, duration, deliverables and turnaround.</p>
          </aside>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-8">
          {step > 0 ? <button onClick={() => setStep(step === 3 ? 2 : step - 1)} className="btn-liquid label h-12 rounded-full border border-line px-5 hover:bg-white/[.05]">{step === 3 ? 'Edit details' : '← Back'}</button> : <span className="label hidden text-mute sm:block">Portfolio → Service → Details → WhatsApp</span>}
          <div className="flex min-w-0 items-center gap-3">
            <span className="label hidden truncate text-mute sm:block md:hidden">{estimate !== '—' && estimate}</span>
            {step < 3
              ? <button onClick={next} className="btn-liquid label h-12 rounded-full bg-bone px-6 text-ink">{step === 2 ? 'Review summary →' : 'Next →'}</button>
              : <button onClick={send} className="btn-liquid label flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 text-ink"><WaIcon /> {sent ? 'Open WhatsApp again' : 'Continue to WhatsApp'}</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export const WaIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.1-.2-.2-.5-.3z" /></svg>
)
