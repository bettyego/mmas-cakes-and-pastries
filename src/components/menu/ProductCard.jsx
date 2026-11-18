import { Eye, Plus, Sparkles } from 'lucide-react'
import { getCategory, isEnquiryProduct } from '../../data/products'
import { formatPrice } from '../../utils/whatsapp'

export default function ProductCard({ product, onView, onAdd, onEnquire }) {
  const category = getCategory(product.category)
  const enquiry = isEnquiryProduct(product)
  const price = formatPrice(product.price)

  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-line/80 bg-white shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-lift">
      <button
        type="button"
        onClick={() => onView(product)}
        className="relative block aspect-[4/3.6] overflow-hidden bg-ivory-200"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/92 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-royal-800 backdrop-blur">
          {category?.name}
        </span>
        <span className="absolute inset-0 grid place-items-center bg-royal-950/0 opacity-0 transition duration-500 group-hover:bg-royal-950/25 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-royal-800">
            <Eye className="size-4" /> Quick view
          </span>
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[1.55rem] leading-tight font-semibold text-royal-950">{product.name}</h3>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.description}</p>
        <p className="mt-4 text-sm font-semibold">
          {enquiry ? (
            <span className="inline-flex items-center gap-1.5 text-royal-700">
              <Sparkles className="size-3.5" /> Made to order · quote on enquiry
            </span>
          ) : price ? (
            <span className="text-lg text-royal-800">{price}</span>
          ) : (
            <span className="text-muted">Price on request</span>
          )}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onView(product)} className="btn-outline !min-h-11 !px-3 !text-[0.8rem]">
            View Details
          </button>
          {enquiry ? (
            <button type="button" onClick={() => onEnquire(product)} className="btn-primary !min-h-11 !px-3 !text-[0.8rem]">
              Enquire
            </button>
          ) : (
            <button type="button" onClick={() => onAdd(product)} className="btn-primary !min-h-11 !px-3 !text-[0.8rem]">
              <Plus className="size-4" /> Add to Order
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
