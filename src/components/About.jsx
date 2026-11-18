import { Check } from 'lucide-react'
import { business } from '../data/business'

const values = [
  { title: 'Quality ingredients', text: 'Good baking starts with good ingredients, chosen with care.' },
  { title: 'Freshness, always', text: 'Treats prepared fresh, so they taste the way they should.' },
  { title: 'Attention to detail', text: 'From the first layer to the last swirl of frosting.' },
  { title: 'Beautiful presentation', text: 'Bakes that look as wonderful as they taste.' },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-ivory-50 py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        {/* Image composition */}
        <div className="reveal relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-[2rem] shadow-lift">
            <img
              src="/images/cakes/piping-detail.webp"
              alt="Baker piping ombré frosting onto a cake"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-[-6%] left-0 aspect-square w-[46%] overflow-hidden rounded-[1.6rem] border-[6px] border-ivory-50 shadow-lift">
            <img
              src="/images/cupcakes/vanilla-sprinkle.webp"
              alt="Vanilla cupcakes with sprinkles"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute top-[8%] left-[2%] grid size-28 place-items-center rounded-full bg-royal-600 text-center text-white shadow-lift sm:size-32">
            <span className="px-3 font-script text-[1.35rem] leading-tight sm:text-2xl">
              Baked
              <br />
              with Love
            </span>
          </div>
          <span aria-hidden="true" className="absolute -right-4 -bottom-10 -z-10 size-48 rounded-full border border-royal-200" />
        </div>

        {/* Text */}
        <div>
          <p className="eyebrow reveal">About Us</p>
          <h2 id="about-title" className="reveal mt-4 text-4xl leading-[1.05] font-medium text-royal-950 sm:text-5xl lg:text-[3.4rem]">
            Every bake made
            <span className="block font-script font-normal text-royal-600">with love &amp; care</span>
          </h2>
          <div className="reveal mt-7 space-y-4 text-[1.02rem] leading-relaxed text-muted">
            <p>
              At <strong className="font-semibold text-ink">{business.name}</strong>, we believe the best moments in life
              deserve something sweet. Whether it’s a simple treat to brighten an ordinary day or a stunning cake for
              a birthday, wedding or anniversary, everything we make is{' '}
              <em className="font-serif text-lg text-royal-700">freshly baked with love</em>.
            </p>
            <p>
              Based in {business.location}, we bake custom celebration cakes, cupcakes, pies and pastries, doughnuts,
              puff-puff and small chops for families, friends, offices and events — with a personal touch in every order.
            </p>
          </div>

          <ul className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <li key={v.title} className="reveal flex gap-3.5" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-royal-100 text-royal-700">
                  <Check className="size-4" strokeWidth={2.5} />
                </span>
                <span>
                  <span className="block font-semibold text-ink">{v.title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted">{v.text}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="reveal mt-10 flex flex-wrap items-center gap-5 border-t border-line pt-8">
            <p className="font-serif text-2xl text-royal-900 italic">“{business.supportingMessage}”</p>
            <a href="#menu" className="btn-outline">See what we bake</a>
          </div>
        </div>
      </div>
    </section>
  )
}
