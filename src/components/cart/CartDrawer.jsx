import { useState } from 'react'
import { ArrowLeft, CakeSlice, CheckCircle2, MessageCircle, ShoppingBag, Trash2, X } from 'lucide-react'
import Overlay from '../ui/Overlay'
import QuantityStepper from '../ui/QuantityStepper'
import LinePicker from '../ui/LinePicker'
import Field from '../ui/Field'
import { scrollToSection } from '../../utils/scroll'
import { useCart } from '../../context/CartContext'
import { business } from '../../data/business'
import { buildOrderMessage, buildWhatsAppUrl, formatPrice, getPhone, openWhatsApp } from '../../utils/whatsapp'

const DETAILS_KEY = 'mmas-cakes:checkout-details:v1'
const emptyDetails = { name: '', phone: '', fulfilment: 'pickup', address: '', date: '', time: '', notes: '', line: business.phones[0].id }

function loadDetails() {
  try {
    return { ...emptyDetails, ...JSON.parse(localStorage.getItem(DETAILS_KEY) || '{}') }
  } catch {
    return emptyDetails
  }
}

const today = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export default function CartDrawer() {
  const { isOpen, closeCart } = useCart()
  return (
    <Overlay open={isOpen} onClose={closeCart} variant="drawer" labelledBy="cart-title">
      <CartContents />
    </Overlay>
  )
}

function CartContents() {
  const { items, count, subtotal, hasUnpriced, hasPriced, setQuantity, removeItem, clear, closeCart } = useCart()
  const [step, setStep] = useState('items') // items | details | sent
  const [details, setDetails] = useState(loadDetails)
  const [errors, setErrors] = useState({})
  const [sentUrl, setSentUrl] = useState('')

  const update = (field) => (e) => {
    const value = e?.target ? e.target.value : e
    setDetails((d) => ({ ...d, [field]: value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (details.name.trim().length < 2) er.name = 'Please enter your name.'
    if (details.phone.trim() && !/^[+\d][\d\s-]{6,}$/.test(details.phone.trim())) er.phone = 'Please enter a valid phone number.'
    if (details.fulfilment === 'delivery' && details.address.trim().length < 4)
      er.address = 'Please enter a delivery address or area in Abuja.'
    if (details.date && details.date < today()) er.date = 'Please choose today or a future date.'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) {
      requestAnimationFrame(() => document.querySelector('#cart-form [aria-invalid="true"]')?.focus())
      return
    }
    try {
      localStorage.setItem(DETAILS_KEY, JSON.stringify({ ...details, notes: '', date: '', time: '' }))
    } catch { /* ignore */ }
    const url = openWhatsApp(getPhone(details.line), buildOrderMessage(items, details))
    setSentUrl(url)
    setStep('sent')
  }

  const header = (
    <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
      <div className="flex items-center gap-2">
        {step === 'details' && (
          <button
            type="button"
            onClick={() => setStep('items')}
            className="-ml-2 grid size-10 place-items-center rounded-full text-royal-800 hover:bg-royal-50"
            aria-label="Back to order items"
          >
            <ArrowLeft className="size-5" />
          </button>
        )}
        <div>
          <h2 id="cart-title" className="text-2xl leading-none font-semibold text-royal-950">
            {step === 'details' ? 'Your Details' : step === 'sent' ? 'Almost Done' : 'Your Order'}
          </h2>
          {step === 'items' && count > 0 && (
            <p className="mt-1 text-xs text-muted">
              {count} item{count === 1 ? '' : 's'}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={closeCart}
        className="grid size-11 place-items-center rounded-full text-muted hover:bg-royal-50 hover:text-royal-800"
        aria-label="Close order panel"
      >
        <X className="size-5" />
      </button>
    </div>
  )

  // ------------------------------------------------ SENT
  if (step === 'sent') {
    return (
      <>
        {header}
        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
          <div className="grid size-16 place-items-center rounded-full bg-[#1faa53]/10 text-[#1faa53]">
            <MessageCircle className="size-8" />
          </div>
          <h3 className="mt-5 text-3xl font-medium text-royal-950">Send the message in WhatsApp</h3>
          <p className="mt-3 leading-relaxed text-muted">
            We’ve opened WhatsApp with your order already written out. <strong className="text-ink">Your order is only
            submitted once you press send</strong> in WhatsApp.
          </p>
          <ol className="mt-6 space-y-3 text-sm text-ink">
            {['Check the message and press send in WhatsApp.', 'We’ll confirm availability, total price and delivery or collection.', 'Your order is confirmed once we reply.'].map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-royal-100 text-xs font-bold text-royal-700">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-8">
            <MessageCircle className="size-4" /> WhatsApp didn’t open? Try again
          </a>
          <div className="mt-auto grid gap-2.5 pt-10">
            <button
              type="button"
              onClick={() => {
                clear()
                closeCart()
              }}
              className="btn-primary"
            >
              <CheckCircle2 className="size-4" /> I’ve sent it — clear my order
            </button>
            <button type="button" onClick={() => setStep('items')} className="btn-outline">
              Keep my order and go back
            </button>
          </div>
        </div>
      </>
    )
  }

  // ------------------------------------------------ EMPTY
  if (items.length === 0) {
    const go = (hash) => {
      closeCart()
      scrollToSection(hash)
    }
    return (
      <>
        {header}
        <div className="flex flex-1 flex-col items-center overflow-y-auto px-6 py-12 text-center">
          <div className="grid size-20 place-items-center rounded-full bg-royal-50 text-royal-600">
            <ShoppingBag className="size-9" strokeWidth={1.5} />
          </div>
          <h3 className="mt-6 text-3xl font-medium text-royal-950">Your order is empty</h3>
          <p className="mt-2 max-w-xs text-muted">How would you like to order today?</p>
          <div className="mt-8 grid w-full gap-3">
            <button type="button" onClick={() => go('#menu')} className="btn-primary">
              <ShoppingBag className="size-4" /> Browse the menu
            </button>
            <button type="button" onClick={() => go('#custom-cakes')} className="btn-outline">
              <CakeSlice className="size-4" /> Enquire about a custom cake
            </button>
          </div>
          <div className="mt-10 w-full border-t border-line pt-8">
            <p className="text-sm font-semibold text-ink">Prefer to chat? Message us directly</p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {business.phones.map((p) => (
                <a
                  key={p.id}
                  href={buildWhatsAppUrl(p, `Hello ${business.name}! I'd like to place an order.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp !min-h-11 !px-3 !text-xs"
                >
                  <MessageCircle className="size-4" /> {p.display}
                </a>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  const totals = (
    <div className="space-y-1.5 text-sm">
      {hasPriced && (
        <div className="flex items-baseline justify-between">
          <span className="text-muted">Subtotal{hasUnpriced ? ' (priced items)' : ''}</span>
          <span className="font-serif text-2xl font-semibold text-royal-900">{formatPrice(subtotal)}</span>
        </div>
      )}
      {hasUnpriced && (
        <p className="text-xs leading-relaxed text-muted">
          {hasPriced ? 'Some prices' : 'Prices'} will be confirmed on WhatsApp, along with any delivery fee.
        </p>
      )}
    </div>
  )

  // ------------------------------------------------ ITEMS
  if (step === 'items') {
    return (
      <>
        {header}
        <ul className="flex-1 divide-y divide-line overflow-y-auto px-5 sm:px-6">
          {items.map((item) => (
            <li key={item.key} className="flex gap-4 py-5">
              <img src={item.image} alt="" className="size-20 shrink-0 rounded-2xl object-cover sm:size-24" />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-serif text-lg leading-tight font-semibold text-royal-950">{item.name}</p>
                    {item.optionsLabel && <p className="mt-0.5 text-xs text-muted">{item.optionsLabel}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="-mt-1 -mr-2 grid size-9 shrink-0 place-items-center rounded-full text-muted hover:bg-red-50 hover:text-red-600"
                    aria-label={`Remove ${item.name} from order`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                  <QuantityStepper
                    size="sm"
                    min={1}
                    value={item.quantity}
                    onChange={(q) => setQuantity(item.key, q)}
                    label={`Quantity of ${item.name}`}
                  />
                  <span className="text-sm font-semibold text-ink">
                    {item.price != null ? formatPrice(item.price * item.quantity) : <span className="font-normal text-muted">Price TBC</span>}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-line bg-white px-5 py-5 sm:px-6">
          {totals}
          <button type="button" onClick={() => setStep('details')} className="btn-primary mt-4 w-full">
            Continue to checkout
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Remove all items from your order?')) clear()
            }}
            className="mt-2 w-full py-2 text-xs font-semibold text-muted hover:text-red-600"
          >
            Clear order
          </button>
        </div>
      </>
    )
  }

  // ------------------------------------------------ DETAILS
  return (
    <>
      {header}
      <form id="cart-form" onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-6">
          <Field label="Your name" required error={errors.name} id="co-name">
            <input id="co-name" className="field" autoComplete="name" value={details.name} onChange={update('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'co-name-err' : undefined} />
          </Field>
          <Field label="Phone number" hint="optional" error={errors.phone} id="co-phone">
            <input id="co-phone" type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="e.g. 0803 000 0000" value={details.phone} onChange={update('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'co-phone-err' : undefined} />
          </Field>

          <fieldset>
            <legend className="field-label">Collection or delivery</legend>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['pickup', 'Pick-up'],
                ['delivery', 'Delivery'],
              ].map(([val, label]) => (
                <label
                  key={val}
                  className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border text-sm font-semibold transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-royal-200 ${
                    details.fulfilment === val ? 'border-royal-600 bg-royal-50 text-royal-800' : 'border-line bg-white hover:border-royal-300'
                  }`}
                >
                  <input type="radio" name="fulfilment" value={val} className="sr-only" checked={details.fulfilment === val} onChange={update('fulfilment')} />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          {details.fulfilment === 'delivery' && (
            <Field label="Delivery address / area" required error={errors.address} id="co-address">
              <textarea id="co-address" rows={2} className="field resize-none" autoComplete="street-address" placeholder="e.g. Wuse 2, Abuja" value={details.address} onChange={update('address')} aria-invalid={!!errors.address} aria-describedby={errors.address ? 'co-address-err' : undefined} />
            </Field>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="Preferred date" hint="optional" error={errors.date} id="co-date">
              <input id="co-date" type="date" min={today()} className="field" value={details.date} onChange={update('date')} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'co-date-err' : undefined} />
            </Field>
            <Field label="Preferred time" hint="optional" id="co-time">
              <input id="co-time" type="time" className="field" value={details.time} onChange={update('time')} />
            </Field>
          </div>

          <Field label="Additional instructions" hint="optional" id="co-notes">
            <textarea id="co-notes" rows={3} className="field resize-none" placeholder="Allergies, packaging, message on the box…" value={details.notes} onChange={update('notes')} />
          </Field>

          <LinePicker name="co-line" value={details.line} onChange={update('line')} />
        </div>

        <div className="border-t border-line bg-white px-5 py-5 sm:px-6">
          {totals}
          <button type="submit" className="btn-whatsapp mt-4 w-full">
            <MessageCircle className="size-4" /> Send order via WhatsApp
          </button>
          <p className="mt-2.5 text-center text-[0.72rem] leading-relaxed text-muted">
            Your order is sent to us for confirmation. No payment is taken on this website.
          </p>
        </div>
      </form>
    </>
  )
}

