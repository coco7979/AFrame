// Inventory built from the public Google Drive sources. Every id below is a real Drive file.
export type Kind = 'video' | 'image' | 'pdf'
export type Format = 'vertical' | 'wide'
export type Item = {
  id: string
  title: string
  file: string
  kind: Kind
  format: Format
  tags: string[]
  group?: string
  client?: string
  note?: string
}

export const thumb = (id: string, w = 1200) => `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`
export const preview = (id: string) => `https://drive.google.com/file/d/${id}/preview`
export const view = (id: string) => `https://drive.google.com/file/d/${id}/view`

const v = (id: string, title: string, file: string, format: Format, tags: string[], extra: Partial<Item> = {}): Item => ({ id, title, file, kind: 'video', format, tags, ...extra })

export const featured = {
  tamala: v('1KSqVZ_TxZ2vPjQX7ztYkvoRuoYXDQwIX', 'Tamala Leaf', 'Tamala Leaf Highlight video.mp4', 'wide', ['Event', 'Highlight', 'Video Editing'], { client: 'Tamala Leaf', note: 'Highlight film' }),
  ys: v('1l-JqooY9Y9DXSQeRLFhcoZySDhu83OED', 'Y&S India — Office Tour', 'Y&S India Office Tour Video.mp4', 'wide', ['Long Form', 'Corporate', 'Video Editing'], { client: 'Y&S India' }),
  cyber: v('1QbNa65wUZgO1a0tT1jos81gxkEU4yHsE', 'Cyberpunk Teaser', 'CYBERPUNK .Teaser. video.for youtube.mp4', 'wide', ['Cinematic', 'Teaser', 'YouTube']),
  amar: v('1aPuXHMBxCGSYJG8k4WODVjHgEPo-hUXS', 'Amar & Isha — Teaser', 'TEASER Amar & Isha.mp4', 'vertical', ['Wedding', 'Teaser', 'Cinematic']),
  render: v('1r4R6Pg8mV8-opTirDrXfEt4MmRQ_ZM9w', 'Personal 3D Project', '0001-0250.mp4', 'wide', ['3D', 'Render', 'Personal']),
}

export const shortForm: Item[] = [
  v('1ONNcgba_GwWWLOTQLMAaMD9r12MfKTFR', 'Amar & Isha Tyagi', 'Amar & isha Tyagi highlight.mp4', 'vertical', ['Wedding', 'Highlight'], { group: 'Events' }),
  featured.amar,
  v('1VXLbguZnOSYGdV4zBchdaGQBd-P4vzz5', 'AI University', 'ai university reel.mp4', 'vertical', ['Reel', 'Promo'], { group: 'Brand' }),
  v('11PYyrz8kuQTy_0D4TMm2bSHAaz8hU7e2', 'Anytime Fitness', 'Anytime fitness reel 1-1.mp4', 'vertical', ['Gym', 'Reel'], { group: 'Fitness', client: 'Anytime Fitness' }),
  v('14f3jLpPzF5vO0wZmJIjow2i5DAqI_SmR', 'Gym Reel 01', 'gym reel 1.mp4', 'vertical', ['Gym', 'Reel'], { group: 'Fitness' }),
  v('1tlbD-gzyDKBtmLQVMTxFeyevnbDK49dJ', 'Gym R1', 'GYM r1.mp4', 'vertical', ['Gym', 'Reel'], { group: 'Fitness' }),
  v('1dijcyrcFrtk0SNS5NC2XUzb63V8Fwfqu', 'Ayush — Reel 03', 'ayush reel 3.mp4', 'vertical', ['Gym', 'Reel'], { group: 'Fitness' }),
  v('1Gt8Fk4FuIW07l71myBOFse9WmR_pH3Xv', 'G&B Salon — 7 March', '7 MARCH reel 1.mp4', 'vertical', ['Salon', 'Offer'], { group: 'Beauty', client: 'G&B Salon' }),
  v('1NjkEnQOktOfOmjRT6xmMHuF9RfnAErHV', 'G&B Salon — March Mix', 'MARCH MIX OFFER reel 5.mp4', 'vertical', ['Salon', 'Offer'], { group: 'Beauty', client: 'G&B Salon' }),
  v('1Tp1s5E09EKyh9HiaO-nNRLuB8SdMDriv', 'Makeup Reel 01', 'makeup reel 1.mp4', 'vertical', ['Beauty', 'Reel'], { group: 'Beauty' }),
  v('1DhL2u5V8eKbwDDoQOi-pYPYS7_8INVxe', 'Hidden Cake', 'hidden cake.mp4', 'vertical', ['Bakery', 'Reel'], { group: 'Food' }),
  v('1NS2NMOeHiPm8JVB0txN6B78rZL3-IMbJ', 'Cake Stick', 'cake stick.mp4', 'vertical', ['Bakery', 'Reel'], { group: 'Food' }),
  v('1e0WjSShgwtPTVnx31DXZO6pZCqFpxrP6', 'Friendship Day', '2_8 FriendshipDay.mp4', 'vertical', ['Bakery', 'Seasonal'], { group: 'Food' }),
  v('13CZacyDzLmtZDi6BtNnMXIdgxTqlsJ7z', 'Bakeasso — Review', 'bakeasso review reel.mp4', 'vertical', ['Subtitles', 'Review'], { group: 'Food', client: 'Bakeasso' }),
  v('1WTx1Scj1GUUuz69Hg8x-l-kGcj2rxJrX', 'Rakhi Box Hampers', 'Rakhi Box Hampers-.mp4', 'vertical', ['Subtitles', 'Promo'], { group: 'Food' }),
  v('17-BHJ6lGLf6a1d5thlEYJLTXziq5vkt7', 'Story Reel 01', 'Story reel 1.mp4', 'vertical', ['Story'], { group: 'Story' }),
  v('1ZeQaQDWUr9YOxZmFuQbfUo-QkHT6OgGX', 'GE6 — Reel 02', 'GE6 reel 2.mp4', 'vertical', ['Reel'], { group: 'Brand' }),
  v('1uhLniWWnhR32rCDLNLypUPcWWVPnUDJQ', 'Y&S — Sam Reel 01', 'Y&S sam reel 1.mp4', 'vertical', ['Podcast cut'], { group: 'Podcast', client: 'Y&S India' }),
  v('1slO-bS8jN5AW678bCUusR_SmifZGpw9-', 'Rule of Thirds', 'Rule of third reel 1 (1).mp4', 'vertical', ['Podcast cut'], { group: 'Podcast' }),
  v('1Z8ZWT8U0ta47TFmqAIQD_LUpk8MMKjSV', 'BTS Reel', 'BTS reel.mp4', 'vertical', ['Behind the scenes'], { group: 'Brand', client: 'Y&S India' }),
]

export const longForm: Item[] = [
  featured.ys,
  featured.tamala,
  v('1r09Kl6VsMOWdUKCekN8Nl9vVBrn7dYNh', 'Toyshi — Birthday Event', 'Toyshi Full birthday event.mp4', 'wide', ['Event', 'Full film']),
  v('17GRYlrZGRSEVMc4EvlanrYiAKMPhV4kE', 'Sample Podcast 01', 'sample podcast 1.mp4', 'wide', ['Podcast', 'Long form']),
  v('1jITqBh-i7GTaKCaEVzubPw7SJCsQaSE9', 'Introducing', 'INTRODUCING video.mp4', 'wide', ['Brand film']),
]

export const cinematic: Item[] = [
  featured.cyber,
  v('1GPsQnVM2J_CfHlM9RSANAdeViFBHUVqw', 'Teaser', 'TEASER.mp4', 'vertical', ['Teaser']),
  v('1Q_HOcYpQjiFirs1HxE7Izsb2RLwaB_iR', 'Kridha — H.B.D', 'kridha H.B.D.mp4', 'vertical', ['Celebration'], { client: 'Kridha Production' }),
  v('1nnhvWQJQOiHa4IB20dbqK8hp5y-P4rxk', 'Card Reel', 'Card reel.mp4', 'vertical', ['Cinematic']),
  v('1gu-IK4xPeQQjPJoaEWMmdU6HAKg2iCOd', 'Event Reel', 'event reel.mp4', 'vertical', ['Event']),
  v('1df0tCLWtRlokaBYMOHPMVEec239LUHrQ', 'Haldi — Reel 02', 'haldi reel 2.mp4', 'vertical', ['Wedding']),
  v('1_cBSMRxJx4gbKyf6kQUdVwpnUfESRBrj', 'Red — Reel 01', 'red reel 1.mp4', 'vertical', ['Cinematic']),
  v('1nSqFt6ojCnAk0iFYkcxDCJUIesvy87QR', 'Vidaan — Reel 02', 'vidaan reel 2.mp4', 'vertical', ['Cinematic']),
  v('1ekG3tPHEvGQ6vrSjVd6qT-Mxo_bfGOlg', 'Scene', 'scean.mp4', 'vertical', ['Cinematic']),
]

export const motion: Item[] = [
  v('1EAC3UV1caEHsJDok9fanZNC2JEqg9Lhk', 'GU School of Design', 'GU (SOD) logo a with sound.mp4', 'wide', ['Logo animation', 'Sound']),
  v('1kaDPwfWsr7msyYHNO8LpfGwH9hAV7bMr', 'Sharp Pencil', 'Sharp pencil Design.mp4', 'wide', ['Logo animation']),
  v('1SMEGywEYV3eXqI1_nWgpuEgGiHK6XaJY', 'W — Mark', 'W {BG} 1920x1080.mp4', 'wide', ['Logo animation']),
  v('1oVnGTXs_psoKRWOcfRxDzZPOK5kkIAei', 'P — Mark', 'P {BG}1902x1080.mp4', 'wide', ['Logo animation']),
  v('1WG2wkYQnJN3PPLn_Y9UbM21HAri6_Llt', 'Render', 'render.mp4', 'wide', ['Motion', 'Render']),
]

const img = (id: string, title: string, file: string, tags: string[], kind: Kind = 'image', extra: Partial<Item> = {}): Item => ({ id, title, file, kind, format: 'vertical', tags, ...extra })

export const documents: Item[] = [
  img('1vrcOb8jnjlnqbwsPZg-qU7Opq2mf0rVG', 'Bugatti Brochure', 'ARYAN KUMAR bugatti brochur.pdf', ['Brochure', 'Print'], 'pdf'),
  img('18cBQgSKWtd2SNc9p-2hPCZZt45xVy3Ol', 'Fogg Poster', 'fogg poster.pdf', ['Advertising', 'Poster'], 'pdf'),
  img('191IlEe_UuULgLCJpJdrjRmTQ07UJRkHu', 'Serif Poster', 'Aryan kumar serif poster.pdf', ['Typography'], 'pdf'),
  img('1SQrkrAMvQ6lTeXmMckP7DQ3NdqPtrK_a', 'Sans-Serif Poster', 'Aryan Kumar sans-serif.pdf', ['Typography'], 'pdf'),
]

export const posters: Item[] = [
  img('1uyDhVa_X-yVl83YojUHsA2SlIBMDfG1q', 'Beauty Post', 'ARYAN KUMAR BEAUTY POST.jpg', ['Social', 'Beauty']),
  img('1nIDtXYQHZ4sO-S7gfgFC3nZ80xZycV91', 'Choco Chip Cupcakes', 'Choco chips cupcakes.jpg', ['Social', 'Food']),
  img('1WhNkfIv7DubXKMdqtKl7O3z2ri8O4ON9', 'Chocolate Slide', 'choclate slide.jpg', ['Social', 'Food']),
  img('1LtlEMOGVWO6UxVNkHRd3rvylIpbr2QaL', 'Grace & Blonda', 'graceandblonda61.jpg', ['Social', 'Salon'], 'image', { client: 'G&B Salon' }),
  img('1aOLMpUp-Kzb9Ps1cIuaZH1ArOmV_-mMb', 'Poster', 'Copy of Poster-min.png', ['Poster']),
  img('1pcFJcXtzekB8gOJLGqYGDgb3Vayfildv', 'Poster 1.2', '1p.2.2.jpg', ['Poster']),
  img('1js6addb1VdqeX2COMKKsBcKYfoP-hC5h', 'Poster P.1', 'p.1.jpg', ['Poster']),
  img('1fpI7-aS4_dVyn1KXhVGmC1LNfndTmmtg', 'Design 01', '1684925097356.jpg', ['Design']),
  img('1Uoer6e8xVQaCDiPV8RbZ7xR4WcfAKIhr', 'Design 02', '1684925410490.jpg', ['Design']),
  img('1lnjG24HpmUKvCI3PLMqo7HWjrytnwBOT', 'Untitled 01', 'Untitled-1.jpg', ['Design']),
  img('15Gmy1apWYh6-NY10nupUkygub5jrANYs', 'Untitled 02', 'Untitled-2.jpg', ['Design']),
  img('163vmpmb-0LsSToIqLcZPxeZQ4oIssWFS', 'Untitled 03', 'Untitled-3.jpg', ['Design']),
]

export const montage: Item[] = [
  ['1bL6cB5VZQYtWNiUGbGzIvWtaD72J91F2', 1], ['1kLoPyYN5fkmgw4mMg-ggZGm3gSuIggcp', 2], ['1k67SBgejiX2Rv105eeQbtidIeiG6o3W_', 3],
  ['18WSV6vjpteAH34JLGTK2TJi29-LhJHQf', 4], ['1JjnWEe2R_YuEiuO2cE8GXNQMrhhBQ51y', 5],
].map(([id, n]) => img(id as string, `Montage ${n}`, `montage ${n}.jpg`, ['Composite']))

export const clients = [
  { name: 'Tamala Leaf', scope: 'Event highlight · Videography · Editing', items: [featured.tamala] },
  { name: 'Y&S India', scope: 'Office tour · Podcast cuts · BTS', items: [featured.ys, ...shortForm.filter((i) => i.client === 'Y&S India')] },
  { name: 'Bakeasso', scope: 'Social video · Subtitled reels', items: shortForm.filter((i) => i.client === 'Bakeasso') },
  { name: 'Kridha Production', scope: 'Freelance editing', items: cinematic.filter((i) => i.client === 'Kridha Production') },
  { name: 'G&B Salon', scope: 'Offer reels · Social posts', items: [...shortForm.filter((i) => i.client === 'G&B Salon'), ...posters.filter((i) => i.client)] },
  { name: 'Anytime Fitness', scope: 'Gym reel', items: shortForm.filter((i) => i.client === 'Anytime Fitness') },
]
