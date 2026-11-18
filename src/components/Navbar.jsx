import { useEffect, useState } from 'react'
import { Menu, Phone, ShoppingBag, X } from 'lucide-react'
import { business, navLinks } from '../data/business'
import { useCart } from '../context/CartContext'
import Logo from './ui/Logo'
import Overlay from './ui/Overlay'
import { scrollToSection } from '../utils/scroll'

function useActiveSection() {
  const [active, setActive] = useState('#home')
  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return active
}

export default function Navbar() {
  const { count, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled
  const linkBase = 'relative py-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'border-b border-line/70 bg-ivory-50/92 py-2.5 shadow-soft backdrop-blur-md' : 'py-4 sm:py-5'
      }`}
    >
      <nav className="container-x flex items-center justify-between gap-4" aria-label="Main">
        <a href="#home" className="shrink-0" aria-label={`${business.name} — home`}>
          <Logo light={!solid} />
        </a>

        <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navLinks.map((l) => {
            const isActive = active === l.href
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`${linkBase} ${
                    solid
                      ? isActive ? 'text-royal-700' : 'text-ink/75 hover:text-royal-700'
                      : isActive ? 'text-white' : 'text-white/75 hover:text-white'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-300 ${
                      solid ? 'bg-royal-600' : 'bg-white'
                    } ${isActive ? 'w-full' : 'w-0'}`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openCart}
            className={`relative grid size-11 place-items-center rounded-full border transition ${
              solid ? 'border-line bg-white text-royal-800 hover:border-royal-300' : 'border-white/40 text-white hover:bg-white/10'
            }`}
            aria-label={`View your order (${count} item${count === 1 ? '' : 's'})`}
          >
            <ShoppingBag className="size-[1.15rem]" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-royal-600 px-1 text-[0.68rem] font-bold text-white ring-2 ring-white">
                {count}
              </span>
            )}
          </button>
          <button type="button" onClick={openCart} className={`${solid ? 'btn-primary' : 'btn-light'} hidden !min-h-11 sm:inline-flex`}>
            Order Now
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={`grid size-11 place-items-center rounded-full lg:hidden ${
              solid ? 'bg-royal-600 text-white' : 'bg-white/15 text-white backdrop-blur'
            }`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      <Overlay open={menuOpen} onClose={() => setMenuOpen(false)} variant="menu" label="Site menu">
        <div className="flex items-center justify-between px-6 pt-5">
          <Logo light />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="grid size-11 place-items-center rounded-full border border-white/25 hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>
        <ul className="mt-10 flex flex-col px-6">
          {navLinks.map((l, i) => (
            <li key={l.href} className="animate-fade-up" style={{ animationDelay: `${80 + i * 50}ms` }}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault()
                  setMenuOpen(false)
                  scrollToSection(l.href)
                }}
                className={`flex items-baseline justify-between border-b border-white/10 py-4 font-serif text-3xl transition hover:text-royal-200 ${
                  active === l.href ? 'text-white' : 'text-white/80'
                }`}
              >
                {l.label}
                <span className="font-sans text-xs tracking-widest text-white/40">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto space-y-3 px-6 pb-8">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false)
              openCart()
            }}
            className="btn-light w-full"
          >
            Order Now
          </button>
          <div className="grid grid-cols-2 gap-2">
            {business.phones.map((p) => (
              <a key={p.id} href={`tel:${p.tel}`} className="btn-ghost-light !min-h-11 !px-3 !text-xs">
                <Phone className="size-3.5" /> {p.display}
              </a>
            ))}
          </div>
          <p className="pt-2 text-center font-script text-2xl text-royal-200">{business.tagline} ♡</p>
        </div>
      </Overlay>
    </header>
  )
}
