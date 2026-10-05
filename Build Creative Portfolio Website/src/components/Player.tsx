import { useEffect, useState } from 'react'
import { preview, thumb, view, type Item } from '../data'

export default function Player({ list, index, onClose, onIndex }: { list: Item[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const item = list[index]
  const [loaded, setLoaded] = useState(false)
  const go = (d: number) => { setLoaded(false); onIndex((index + d + list.length) % list.length) }

  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    addEventListener('keydown', key)
    document.documentElement.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', key); document.documentElement.style.overflow = '' }
  })

  const vertical = item.format === 'vertical'
  const kindLabel = item.kind === 'video' ? 'Video' : item.kind === 'pdf' ? 'PDF document' : 'Image'

  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-ink/90 backdrop-blur-md [animation:fade-up_.45s_var(--ease-out-soft)_both]" role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="flex items-center justify-between border-b border-line px-5 py-4 md:px-10">
        <p className="label text-mute">{String(index + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</p>
        <button onClick={onClose} data-cursor="Close" className="liquid btn-liquid label flex h-11 items-center gap-3 rounded-full px-5 text-bone hover:text-signal">Close <span className="text-lg leading-none">×</span></button>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto p-5 md:grid-cols-12 md:gap-10 md:p-10">
        <div className="flex min-h-0 items-center justify-center md:col-span-8 lg:col-span-9">
          <div className={`relative w-full overflow-hidden rounded-[var(--radius-media)] bg-coal ring-1 ring-white/10 [animation:modal-in_.6s_var(--ease-out-soft)_both] ${vertical ? 'aspect-[9/16] max-h-[78vh] max-w-[min(100%,44vh)]' : item.kind === 'video' ? 'aspect-video max-h-[78vh]' : 'aspect-[3/4] max-h-[78vh] max-w-[min(100%,58vh)]'}`}>
            <img src={thumb(item.id, 1600)} alt="" referrerPolicy="no-referrer" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-40 blur-sm'}`} />
            {!loaded && <span className="label absolute inset-0 flex items-center justify-center text-mute">Loading {kindLabel.toLowerCase()}…</span>}
            <iframe key={item.id} src={preview(item.id)} title={item.title} allow="autoplay; fullscreen" allowFullScreen onLoad={() => setLoaded(true)} className="absolute inset-0 h-full w-full border-0" />
          </div>
        </div>

        <aside className="liquid-flat flex flex-col justify-between gap-8 rounded-[var(--radius-panel)] p-6 md:col-span-4 lg:col-span-3 [animation:modal-in_.7s_.08s_var(--ease-out-soft)_both]">
          <div>
            <p className="label text-signal">{item.client ?? kindLabel}</p>
            <h3 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-5xl">{item.title}</h3>
            <dl className="mt-10 grid grid-cols-[88px_1fr] gap-y-3 text-sm">
              <dt className="label pt-0.5 text-mute">Type</dt><dd>{item.tags.join(' · ')}</dd>
              {item.kind === 'video' && <><dt className="label pt-0.5 text-mute">Role</dt><dd>Video Editor</dd></>}
              <dt className="label pt-0.5 text-mute">Format</dt><dd>{item.kind === 'video' ? (vertical ? '9:16 vertical' : '16:9 horizontal') : kindLabel}</dd>
              <dt className="label pt-0.5 text-mute">Source</dt><dd className="break-all text-mute">{item.file}</dd>
            </dl>
            <a href={view(item.id)} target="_blank" rel="noreferrer" data-cursor="Open" className="label mt-8 inline-flex h-10 items-center rounded-full border border-line px-4 text-mute hover:text-bone">Open in Google Drive ↗</a>
          </div>
          <div className="flex gap-2">
            <button onClick={() => go(-1)} className="btn-liquid label h-12 flex-1 rounded-[var(--radius-control)] border border-line hover:bg-bone hover:text-ink">← Prev</button>
            <button onClick={() => go(1)} className="btn-liquid label h-12 flex-1 rounded-[var(--radius-control)] border border-line hover:bg-bone hover:text-ink">Next →</button>
          </div>
        </aside>
      </div>
    </div>
  )
}
