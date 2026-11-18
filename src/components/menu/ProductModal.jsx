import { useState } from 'react'
import { MessageCircle, ShoppingBag, Sparkles, X } from 'lucide-react'
import Overlay from '../ui/Overlay'
import QuantityStepper from '../ui/QuantityStepper'
import { getCategory, isEnquiryProduct } from '../../data/products'
import { resolvePrice, useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/whatsapp'

const choiceLabel = (c) => (typeof c === 'string' ? c : c.label)

function defaultOptions(product) {
  return Object.fromEntries((product?.options ?? []).map((o) => [o.name, choiceLabel(o.choices[0])]))
}

export default function ProductModal({ product, onClose, onEnquire }) {
  return (
    <Overlay open={!!product} onClose={onClose} labelledBy="product-modal-title">
      {product && <ProductDetails key={product.id} product={product} onClose={onClose} onEnquire={onEnquire} />}
    </Overlay>
  )
}

function ProductDetails({ product, onClose, onEnquire }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [options, setOptions] = useState(() => defaultOptions(product))

  const enquiry = isEnquiryProduct(product)
  const category = getCategory(product.category)
  const unitPrice = resolvePrice(product, options)

  const handleAdd = () => {
    addItem(product, quantity, options)
    onClose()
  }

  return (
    <div className="grid md:grid-cols-2">
      <div className="relative aspect-[4/3] bg-ivory-200 md:aspect-auto md:min-h-[34rem]">
        <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover md:rounded-l-3xl" />
      </div>

      <div className="flex flex-col p-6 sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow">{category?.name}</p>
          <button
            type="button"
            onClick={onClose}
            className="-mt-2 -mr-2 grid size-11 shrink-0 place-items-center rounded-full text-muted transition hover:bg-royal-50 hover:text-royal-800"
            aria-label="Close product details"
          >
            <X className="size-5" />
          </button>
        </div>
        <h2 id="product-modal-title" className="mt-3 text-4xl leading-tight font-medium text-royal-950">
          {product.name}
        </h2>
        <p className="mt-4 leading-relaxed text-muted">{product.details || product.description}</p>

        {enquiry ? (
          <>
            <div className="mt-7 rounded-2xl border border-royal-100 bg-royal-50/70 p-5">
              <p className="flex items-center gap-2 font-semibold text-royal-900">
                <Sparkles className="size-4" /> Every custom cake is made to order
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Size, flavour, design and price are agreed with you directly. Send us your ideas through our custom
                cake enquiry form and we will reply on WhatsApp to confirm details.
              </p>
            </div>
            <div className="mt-auto pt-8">
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  onClose()
                  onEnquire(product)
                }}
                className="btn-primary w-full"
              >
                <MessageCircle className="size-4" /> Start a Custom Cake Enquiry
              </button>
            </div>
          </>
        ) : (
          <>
            {product.options?.map((opt) => (
              <fieldset key={opt.name} className="mt-7">
                <legend className="field-label">{opt.name}</legend>
                <div className="flex flex-wrap gap-2">
                  {opt.choices.map((c) => {
                    const label = choiceLabel(c)
                    const active = options[opt.name] === label
                    return (
                      <label
                        key={label}
                        className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-royal-200 ${
                          active ? 'border-royal-600 bg-royal-600 text-white' : 'border-line bg-white text-ink hover:border-royal-300'
                        }`}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          name={`opt-${opt.name}`}
                          checked={active}
                          onChange={() => setOptions((o) => ({ ...o, [opt.name]: label }))}
                        />
                        {label}
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            ))}

            <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6">
              <div>
                <span className="field-label">Quantity</span>
                <QuantityStepper value={quantity} onChange={setQuantity} />
              </div>
              <div className="text-right">
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted">Price</span>
                {unitPrice != null ? (
                  <span className="font-serif text-3xl font-semibold text-royal-800">{formatPrice(unitPrice * quantity)}</span>
                ) : (
                  <span className="mt-1 block font-semibold text-ink">Confirmed on WhatsApp</span>
                )}
              </div>
            </div>

            <div className="mt-auto pt-8">
              <button type="button" data-autofocus onClick={handleAdd} className="btn-primary w-full">
                <ShoppingBag className="size-4" /> Add to Order
              </button>
              <p className="mt-3 text-center text-xs text-muted">
                Availability and final price are confirmed when you send your order on WhatsApp.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
