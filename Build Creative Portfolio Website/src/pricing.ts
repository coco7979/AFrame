export const WA = '917827700407'
export const waLink = (text: string) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`

export type Pkg = { name: string; range: string; from: number; scope?: string; includes?: string[] }
export type Group = { title: string; pkgs: Pkg[] }
export type Cat = { id: string; title: string; blurb: string; groups: Group[]; note?: string; custom?: { services: string[]; line: string; cta: string } }

const p = (name: string, range: string, includes?: string[], scope?: string): Pkg => ({ name, range, includes, scope, from: Number(range.replace(/[^\d–]/g, '').split('–')[0]) })

export const video: Cat = {
  id: 'video', title: 'Video Editing', blurb: 'Reels, YouTube, events and brand films. Cut, graded and sound-designed.',
  groups: [
    { title: 'Short-Form Content', pkgs: [
      p('Basic Reel', '₹800–1,200', ['Clean cuts', 'Basic color correction', 'Music synchronization', 'Basic transitions'], '15–30 sec'),
      p('Standard Reel', '₹1,500–2,500', ['Advanced editing', 'Color correction', 'Sound design', 'Captions / text', 'B-roll integration'], '30–60 sec'),
      p('Advanced / Cinematic Reel', '₹2,500–4,500', ['Cinematic editing', 'Advanced color grading', 'Sound design', 'B-roll', 'Motion elements', 'Creative transitions']),
      p('Premium Reel', '₹4,000–6,500', ['Advanced motion graphics', 'Cinematic color grading', 'Advanced sound design', 'B-roll', 'VFX / compositing where required', 'High-detail finishing']),
    ] },
    { title: 'Long-Form Content', pkgs: [
      p('YouTube Video', '₹4,000–7,000', ['Professional editing', 'Color correction', 'Sound cleanup', 'Basic graphics', 'B-roll'], '5–10 min'),
      p('YouTube Video + Graphics / B-roll', '₹7,000–12,000', ['Advanced editing', 'Motion graphics', 'B-roll', 'Sound design', 'Color grading', 'Captions where required'], '5–10+ min'),
      p('Cinematic / Storytelling Video', '₹8,000–15,000', ['Narrative editing', 'Cinematic pacing', 'Advanced color', 'Sound design', 'B-roll', 'Motion graphics', 'Creative transitions']),
    ] },
    { title: 'Event & Brand Videos', pkgs: [
      p('Event Highlight', '₹5,000–9,000', ['Cinematic editing', 'Music synchronization', 'Color grading', 'Sound design'], '1–3 min'),
      p('Full Event Video', '₹8,000–15,000', ['Complete event edit', 'Color correction / grading', 'Audio balancing', 'Titles / graphics'], '5–15 min'),
      p('Brand / Promotional Video', '₹5,000–10,000', ['Creative editing', 'Motion graphics', 'Color', 'Sound design', 'B-roll'], '30–60 sec'),
      p('Brand Film', '₹10,000–20,000', ['Storytelling', 'Advanced editing', 'Motion graphics', 'Cinematic color', 'Sound design', 'Compositing where required'], '1–3 min'),
    ] },
  ],
}

export const motionCat: Cat = {
  id: 'motion', title: 'Motion Graphics', blurb: 'Type, logos, ads and explainers that move with intent.',
  note: 'Final pricing depends on complexity and the amount of animation.',
  groups: [{ title: 'Motion', pkgs: [
    p('Basic Text Animation', '₹800–1,500'), p('Kinetic Typography', '₹2,000–5,000'), p('Motion Graphic Reel', '₹2,500–5,000'),
    p('Logo Animation', '₹2,500–5,000'), p('Logo + Brand Motion', '₹5,000–8,000'), p('Animated Social Ad', '₹3,500–7,000'),
    p('Explainer Motion — 30 sec', '₹5,000–9,000'), p('Explainer Motion — 60 sec', '₹8,000–15,000'),
    p('Advanced 2D Motion', '₹8,000–15,000'), p('Compositing / VFX', '₹3,000–10,000+'),
  ] }],
}

export const design: Cat = {
  id: 'design', title: 'Graphic Design', blurb: 'Social, branding and print, built on type and layout.',
  groups: [
    { title: 'Social Media', pkgs: [
      p('Static Social Post', '₹500–800'), p('Premium Creative Post', '₹800–1,500'), p('Instagram Story', '₹400–700'),
      p('Story Set — 5 Stories', '₹1,500–2,500'), p('Carousel — 5 Slides', '₹1,500–2,500'), p('Carousel — 8–10 Slides', '₹2,500–4,000'),
      p('Social Media Ad Creative', '₹800–1,500'), p('YouTube Thumbnail', '₹600–1,200'),
    ] },
    { title: 'Branding', pkgs: [
      p('Basic Logo', '₹3,500–5,000'), p('Professional Logo', '₹5,000–8,000'), p('Logo + Variations', '₹7,000–10,000'),
      p('Mini Brand Identity', '₹10,000–18,000'), p('Complete Brand Identity', '₹18,000–30,000'), p('Brand Guidelines', '₹5,000–10,000'),
    ] },
    { title: 'Print / Advertising', pkgs: [
      p('Flyer', '₹800–1,500'), p('Poster', '₹1,000–2,000'), p('Standee', '₹1,500–3,000'), p('Banner', '₹800–1,500'),
      p('Brochure', '₹2,500–10,000'), p('Menu Design', '₹2,000–5,000'), p('Packaging Design', '₹4,000–8,000'),
      p('Wobbler / Dangler', '₹1,000–2,500'), p('Campaign Creative', '₹3,000–8,000'),
    ] },
  ],
}

export const photo: Cat = {
  id: 'photo', title: 'Photography & Videography', blurb: 'Product, restaurant and event shoots, with edits included where noted.',
  note: 'Final pricing depends on shoot duration, location, equipment requirements, number of deliverables and production complexity.',
  groups: [{ title: 'Shoots', pkgs: [
    p('Basic Product Shoot', '₹2,500–5,000'), p('Product Shoot + Editing', '₹4,000–7,000'), p('Restaurant Shoot', '₹4,000–8,000'),
    p('Event Photography', '₹3,000–6,000', undefined, 'Per event'), p('Event Videography', '₹4,000–8,000', undefined, 'Per event'),
    p('Product Photo + Video Package', '₹7,000–12,000'), p('Shoot + Reels Package', '₹7,000–15,000'),
  ] }],
}

export const retainers: (Pkg & { tier: string })[] = [
  { tier: 'Starter', ...p('Starter Retainer', '₹12,000', ['8 Reels', '4 Static Posts', 'Basic editing', 'Basic captions / text', '1 revision per content'], 'Per month') },
  { tier: 'Growth', ...p('Growth Retainer', '₹20,000', ['12 Reels', '8 Static Posts', '8 Stories', 'Motion graphics where required', 'Content formatting', 'Basic content planning'], 'Per month') },
  { tier: 'Premium', ...p('Premium Retainer', '₹30,000–35,000', ['16 Reels', '8–10 Static Posts', 'Stories', 'Motion graphics', 'Thumbnail / cover design', 'Content planning', 'Basic social media management'], 'Per month') },
]

export const ui: Cat = { id: 'ui', title: 'UI / Digital Design', blurb: '', groups: [], custom: {
  services: ['Website UI', 'Landing Pages', 'Mobile App UI', 'Interactive Prototypes', 'Design Systems', 'Interface Design', 'Digital Visual Systems'],
  line: 'Pricing discussed based on project scope & requirements.', cta: 'Discuss Your UI Project' } }
export const three: Cat = { id: '3d', title: '3D Design & Visualization', blurb: '', groups: [], custom: {
  services: ['3D Modelling', 'Product Visualization', '3D Animation', '3D Motion', 'Product Rendering', '3D + Motion Graphics', 'Experimental 3D'],
  line: 'Custom quotation based on complexity, deliverables & timeline.', cta: 'Discuss Your 3D Project' } }

export const addOns: [string, string][] = [
  ['Extra Revision', '₹500–1,000'], ['Subtitles', '₹500–1,500'], ['Advanced Motion', '₹1,500–5,000'], ['Heavy VFX', '₹2,000+'],
  ['Additional Aspect Ratio', '₹500–1,000'], ['Thumbnail', '₹600–1,200'], ['Rush Delivery', '+25–50%'], ['Raw Project Files', '+20–30%'],
  ['Additional Revision Round', '₹1,000+'], ['Stock Footage Research', '₹500–2,000'], ['Additional Short Cut', '₹1,000–2,000'],
]

export const priced = [video, motionCat, design, photo]
export const fromPrice = (c: Cat) => Math.min(...c.groups.flatMap((g) => g.pkgs.map((x) => x.from)))

/* ---------- Booking ---------- */
export const CUSTOM = 'Custom Project — Discuss Scope'
export type BookCat = { id: string; label: string; icon: string; types: string[]; pkgs: Pkg[]; custom?: boolean }
const grp = (c: Cat, t: string) => c.groups.find((g) => g.title === t)!.pkgs
export const bookCats: BookCat[] = [
  { id: 'video', label: 'Video Editing', icon: 'M4 6h12v12H4zM16 10l4-2v8l-4-2', types: ['Reel', 'YouTube Video', 'Event Video', 'Brand Video', 'Cinematic Video', 'Podcast', 'Other'], pkgs: video.groups.flatMap((g) => g.pkgs) },
  { id: 'motion', label: 'Motion Graphics', icon: 'M4 12c3-6 5 6 8 0s5 6 8 0', types: ['Text / Typography', 'Logo Animation', 'Social Ad', 'Explainer', 'VFX', 'Other'], pkgs: motionCat.groups[0].pkgs },
  { id: 'design', label: 'Graphic Design', icon: 'M5 19l4-12 4 12M6.5 15h5M15 7h4v12h-4z', types: ['Social Post', 'Carousel', 'Poster', 'Packaging', 'Advertisement', 'Other'], pkgs: [...grp(design, 'Social Media'), ...grp(design, 'Print / Advertising')] },
  { id: 'branding', label: 'Branding', icon: 'M12 4l7 4v8l-7 4-7-4V8z', types: ['Logo', 'Brand Identity', 'Brand Guidelines', 'Other'], pkgs: grp(design, 'Branding') },
  { id: 'photo', label: 'Photography', icon: 'M4 8h4l2-2h4l2 2h4v11H4zM12 16a3 3 0 100-6 3 3 0 000 6z', types: ['Product', 'Restaurant', 'Event', 'Other'], pkgs: photo.groups[0].pkgs.filter((x) => !/Videography/.test(x.name)) },
  { id: 'videography', label: 'Videography', icon: 'M3 7h13v10H3zM16 11l5-3v8l-5-3', types: ['Product', 'Event', 'Shoot + Reels', 'Other'], pkgs: photo.groups[0].pkgs.filter((x) => /Video|Reels/.test(x.name)) },
  { id: 'social', label: 'Social Media Content', icon: 'M4 4h16v16H4zM4 9h16M9 9v11', types: ['Monthly Retainer', 'Reels', 'Posts & Stories', 'Other'], pkgs: retainers },
  { id: 'ui', label: 'UI / Digital Design', icon: 'M3 5h18v12H3zM8 21h8M12 17v4', types: ui.custom!.services, pkgs: [], custom: true },
  { id: '3d', label: '3D Design & Visualization', icon: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5', types: three.custom!.services, pkgs: [], custom: true },
  { id: 'other', label: 'Other', icon: 'M6 12h.01M12 12h.01M18 12h.01', types: [], pkgs: [], custom: true },
]
export type Preset = { cat: string; pkg?: string }
