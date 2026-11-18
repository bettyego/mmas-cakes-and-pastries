import { useMemo, useState } from 'react'
import { Info } from 'lucide-react'
import { categories, products } from '../../data/products'
import { useCart } from '../../context/CartContext'
import SectionHeading from '../ui/SectionHeading'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'

const ALL = 'all'
const hasSamples = products.some((p) => p.isSample)

export default function Menu({ onEnquire, active = ALL, setActive }) {
  const { addItem } = useCart()
  const [selected, setSelected] = useState(null)

  const visible = useMemo(() => (active === ALL ? products : products.filter((p) => p.category === active)), [active])
  const countFor = (id) => (id === ALL ? products.length : products.filter((p) => p.category === id).length)

  // Quick add uses the first choice of each option; customers can pick other options in View Details.
  const quickAdd = (product) => {
    const opts = Object.fromEntries(
      (product.options ?? []).map((o) => [o.name, typeof o.choices[0] === 'string' ? o.choices[0] : o.choices[0].label]),
    )
    addItem(product, 1, opts)
  }

  const filters = [{ id: ALL, name: 'All Treats', image: '/images/cakes/layer-slice.webp' }, ...categories]

  return (
    <section id="menu" aria-labelledby="menu-title" className="relative bg-white py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-ivory-100 to-white" />
      <div className="container-x relative">
        <SectionHeading
          id="menu-title"
          eyebrow="Our Menu"
          title="Sweet, savoury"
          script="& simply irresistible"
          intro="Browse our favourites, add them to your order and send it to us on WhatsApp in a few taps. Custom cakes are made to order — just tell us your ideas."
        />

        {/* Category filters */}
        <div className="reveal mt-12 -mx-4 sm:mx-0">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="no-scrollbar flex gap-2.5 overflow-x-auto px-4 pb-2 sm:flex-wrap sm:justify-center sm:px-0"
          >
            {filters.map((f) => {
              const isActive = active === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="menu-grid"
                  onClick={() => setActive(f.id)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-1.5 text-sm font-semibold transition ${
                    isActive
                      ? 'border-royal-600 bg-royal-600 text-white shadow-[0_10px_22px_-12px_rgb(36_67_196/0.8)]'
                      : 'border-line bg-white text-ink hover:border-royal-300 hover:text-royal-700'
                  }`}
                >
                  <img src={f.image} alt="" className="size-8 rounded-full object-cover" loading="lazy" />
                  {f.name}
                  <span className={`text-xs tabular-nums ${isActive ? 'text-white/70' : 'text-muted'}`}>{countFor(f.id)}</span>
                </button>
              )
            })}
          </div>
        </div>

        {active !== ALL && (
          <p className="mt-6 text-center font-serif text-xl text-muted italic" aria-live="polite">
            {categories.find((c) => c.id === active)?.blurb}
          </p>
        )}

        <div id="menu-grid" role="tabpanel" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onView={setSelected} onAdd={quickAdd} onEnquire={onEnquire} />
          ))}
        </div>

        {hasSamples && (
          <p className="mx-auto mt-12 flex max-w-2xl items-start justify-center gap-2.5 rounded-2xl bg-ivory-100 px-5 py-4 text-sm leading-relaxed text-muted">
            <Info className="mt-0.5 size-4 shrink-0 text-royal-600" />
            <span>
              Menu items and photos are a representative selection. Availability, flavours and prices are confirmed with
              you on WhatsApp before any order is finalised.
            </span>
          </p>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} onEnquire={onEnquire} />
    </section>
  )
}
