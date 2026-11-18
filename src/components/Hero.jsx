import { ArrowRight, MapPin } from 'lucide-react'
import { business } from '../data/business'
import { categories } from '../data/products'
import { useCart } from '../context/CartContext'

const highlights = [
  { src: '/images/cupcakes/red-velvet.webp', alt: 'Red velvet cupcake' },
  { src: '/images/doughnuts/puff-puff-sugar.webp', alt: 'Puff-puff' },
  { src: '/images/pastries/meat-pie-closeup.webp', alt: 'Meat pies' },
]

export default function Hero() {
  const { openCart } = useCart()
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-royal-950 text-white">
      {/* Photograph */}
      <div className="absolute inset-0 -z-10 lg:left-[44%]">
        <img
          src="/images/hero.webp"
          alt="White tiered celebration cake topped with fresh strawberries and blueberries"
          className="h-full w-full object-cover object-[50%_30%]"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-950 via-royal-950/75 to-royal-950/40 lg:bg-gradient-to-r lg:from-royal-950 lg:via-royal-950/10 lg:to-transparent" />
      </div>
      {/* Subtle decorative glow */}
      <div aria-hidden="true" className="absolute -left-40 top-1/3 -z-10 size-[34rem] rounded-full bg-royal-600/25 blur-[120px]" />

      <div className="container-x flex min-h-[100svh] flex-col justify-end pt-32 pb-14 lg:min-h-[52rem] lg:justify-center lg:py-36">
        <div className="max-w-xl lg:max-w-[34rem]">
          <p className="eyebrow animate-fade-up !text-royal-200">
            <MapPin className="size-3.5" /> Cakes &amp; Pastries · {business.city}
          </p>
          <h1
            id="hero-title"
            className="animate-fade-up mt-6 text-[3.2rem] leading-[0.95] font-medium tracking-tight sm:text-7xl lg:text-[5.4rem]"
            style={{ animationDelay: '80ms' }}
          >
            Freshly Baked
            <span className="mt-1 block font-script text-[0.82em] font-normal text-royal-200">with Love ♡</span>
          </h1>
          <p
            className="animate-fade-up mt-7 font-serif text-xl leading-snug text-white sm:text-2xl"
            style={{ animationDelay: '160ms' }}
          >
            Making your everyday moments sweeter and your celebrations unforgettable.
          </p>
          <p
            className="animate-fade-up mt-4 max-w-md text-[0.97rem] leading-relaxed text-white/70"
            style={{ animationDelay: '220ms' }}
          >
            From beautifully customised cakes to delicious pastries and sweet treats, we bring your favourite moments to
            life with freshly baked goodness.
          </p>
          <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '300ms' }}>
            <a href="#menu" className="btn-light group">
              Explore Our Menu
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>
            <button type="button" onClick={openCart} className="btn-ghost-light">
              Order Now
            </button>
          </div>

          <div className="animate-fade-up mt-10 flex items-center gap-4" style={{ animationDelay: '380ms' }}>
            <div className="flex -space-x-3">
              {highlights.map((h) => (
                <img
                  key={h.src}
                  src={h.src}
                  alt={h.alt}
                  className="size-11 rounded-full border-2 border-royal-950 object-cover"
                  width="44"
                  height="44"
                />
              ))}
            </div>
            <p className="text-sm leading-snug text-white/70">
              {business.supportingMessage}
              <span className="block text-white/50">Order easily on WhatsApp.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Category ribbon */}
      <div className="relative border-t border-white/10 bg-royal-900/70 backdrop-blur" aria-hidden="true">
        <div className="flex overflow-hidden py-4">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 whitespace-nowrap">
            {[...categories, ...categories, ...categories, ...categories].map((c, i) => (
              <span key={i} className="flex items-center gap-10 font-serif text-xl text-white/80 italic">
                {c.name}
                <span className="text-sm not-italic text-royal-300">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
