import { useState } from 'react'
import { MapPin, MessageCircle, Phone, X } from 'lucide-react'
import { business, navLinks } from '../data/business'
import { categories } from '../data/products'
import { commonsCredits, creditsNote } from '../data/credits'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import Logo from './ui/Logo'
import Overlay from './ui/Overlay'

const year = new Date().getFullYear()

export default function Footer({ onSelectCategory }) {
  const [creditsOpen, setCreditsOpen] = useState(false)


  return (
    <footer className="relative overflow-hidden bg-royal-950 text-white">
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col items-center gap-6 py-14 text-center sm:py-16">
          <p className="font-script text-5xl text-royal-200 sm:text-6xl">{business.tagline} ♡</p>
          <p className="max-w-lg text-white/65">{business.supportingMessage} Order your favourites today on WhatsApp.</p>
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{business.shortDescription}</p>
          <p className="mt-5 flex items-center gap-2 text-sm text-white/75">
            <MapPin className="size-4 text-royal-300" /> {business.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-royal-300">Explore</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-white/70 transition hover:text-white">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-royal-300">Our Treats</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <a
                  href={c.orderType === 'enquiry' ? '#custom-cakes' : '#menu'}
                  onClick={() => c.orderType !== 'enquiry' && onSelectCategory?.(c.id)}
                  className="text-white/70 transition hover:text-white"
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-royal-300">Call or WhatsApp</h2>
          <ul className="mt-5 space-y-4">
            {business.phones.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 px-4 py-3">
                <a href={`tel:${p.tel}`} className="flex items-center gap-2.5 text-sm font-semibold tabular-nums hover:text-royal-200">
                  <Phone className="size-4 text-royal-300" /> {p.display}
                </a>
                <a
                  href={buildWhatsAppUrl(p, `Hello ${business.name}! `)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-10 place-items-center rounded-full bg-[#1faa53] hover:bg-[#178a43]"
                  aria-label={`WhatsApp ${p.display}`}
                >
                  <MessageCircle className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {year} {business.name}. All rights reserved.</p>
          <button type="button" onClick={() => setCreditsOpen(true)} className="underline-offset-4 hover:text-white hover:underline">
            Photo credits
          </button>
        </div>
      </div>

      <Overlay open={creditsOpen} onClose={() => setCreditsOpen(false)} labelledBy="credits-title" className="!max-w-2xl">
        <div className="p-6 text-ink sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <h2 id="credits-title" className="text-3xl font-medium text-royal-950">Photo credits</h2>
            <button type="button" onClick={() => setCreditsOpen(false)} className="grid size-11 place-items-center rounded-full hover:bg-royal-50" aria-label="Close photo credits">
              <X className="size-5" />
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{creditsNote}</p>
          <ul className="mt-6 divide-y divide-line text-sm">
            {commonsCredits.map((c) => (
              <li key={c.url} className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-royal-700 hover:underline">
                  {c.image}
                </a>
                <span className="text-muted">
                  {c.author} ·{' '}
                  <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{c.license}</a>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Overlay>
    </footer>
  )
}
