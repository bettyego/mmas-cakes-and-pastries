import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, ImagePlus, MessageCircle, X } from 'lucide-react'
import { business } from '../data/business'
import { buildCustomCakeMessage, getPhone, openWhatsApp } from '../utils/whatsapp'
import Field from './ui/Field'
import LinePicker from './ui/LinePicker'

/** Suggestions only — customers can type anything. Edit freely. */
const OCCASIONS = ['Birthday', 'Wedding', 'Anniversary', 'Baby shower / Gender reveal', 'Graduation', 'Corporate event', 'Just because']
const FLAVOURS = ['Vanilla', 'Chocolate', 'Red velvet', 'Strawberry', 'Lemon', 'Fruit cake', 'Not sure yet — please advise']
const SIZES = ['6 inch', '8 inch', '10 inch', '12 inch', '2 tiers', '3 tiers', 'Not sure — please advise']

const steps = [
  { title: 'Share your ideas', text: 'Tell us the occasion, flavour, size and the look you love.' },
  { title: 'We confirm on WhatsApp', text: 'We discuss the details, timing and a price with you.' },
  { title: 'Freshly baked for you', text: 'Your cake is made with love, ready for your celebration.' },
]

const initial = {
  name: '', phone: '', occasion: '', style: '', flavour: '', size: '', design: '', servings: '',
  inscription: '', date: '', fulfilment: 'pickup', address: '', notes: '', line: business.phones[0].id,
}

const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export default function CustomCake({ prefill }) {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [reference, setReference] = useState(null) // { name, url }
  const [sent, setSent] = useState(false)
  const formRef = useRef(null)

  // When a customer clicks "Enquire" on a cake in the menu, pre-fill the style.
  useEffect(() => {
    if (prefill?.style) {
      setForm((f) => ({ ...f, style: prefill.style }))
      setSent(false)
    }
  }, [prefill])

  useEffect(() => () => reference && URL.revokeObjectURL(reference.url), [reference])

  const update = (field) => (e) => {
    const value = e?.target ? e.target.value : e
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const onFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors((er) => ({ ...er, reference: 'Please choose an image file.' }))
      return
    }
    setErrors((er) => ({ ...er, reference: undefined }))
    setReference({ name: file.name, url: URL.createObjectURL(file) })
  }

  const validate = () => {
    const er = {}
    if (form.name.trim().length < 2) er.name = 'Please enter your name.'
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) er.phone = 'Please enter a valid phone number.'
    if (!form.occasion.trim()) er.occasion = 'Please tell us the occasion or cake type.'
    if (!form.date) er.date = 'Please choose the date you need the cake.'
    else if (form.date < todayISO()) er.date = 'Please choose today or a future date.'
    if (form.fulfilment === 'delivery' && form.address.trim().length < 4) er.address = 'Please enter a delivery address or area.'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) {
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus())
      return
    }
    openWhatsApp(getPhone(form.line), buildCustomCakeMessage({ ...form, hasReference: !!reference }))
    setSent(true)
  }

  const reset = () => {
    setForm(initial)
    setReference(null)
    setSent(false)
  }

  const err = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `cc-${k}-err` : undefined })

  return (
    <section id="custom-cakes" aria-labelledby="custom-title" className="relative isolate overflow-hidden bg-royal-950 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="absolute -top-40 right-[-10rem] -z-10 size-[40rem] rounded-full bg-royal-600/30 blur-[140px]" />
      <div aria-hidden="true" className="absolute bottom-0 left-[-12rem] -z-10 size-[30rem] rounded-full bg-royal-500/20 blur-[120px]" />

      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow reveal !text-royal-200">Custom Cakes</p>
          <h2 id="custom-title" className="reveal mt-4 text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-[3.4rem]">
            Your celebration,
            <span className="block font-script font-normal text-royal-200">beautifully baked</span>
          </h2>
          <p className="reveal mt-6 max-w-md leading-relaxed text-white/70">
            Birthdays, weddings, anniversaries and every milestone in between. Share what you have in mind and we’ll
            work with you to create a cake that feels made just for you.
          </p>

          <div className="reveal relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-[1.75rem] sm:block">
            <img src="/images/cakes/blackberry-floral.webp" alt="Cream cake topped with blackberries and edible flowers" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-royal-950/60 to-transparent" />
          </div>

          <ol className="mt-10 space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} className="reveal flex gap-4" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/25 font-serif text-lg">{i + 1}</span>
                <span>
                  <span className="block font-semibold">{s.title}</span>
                  <span className="mt-0.5 block text-sm text-white/60">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Form */}
        <div className="reveal rounded-[2rem] bg-ivory-50 p-6 text-ink shadow-lift sm:p-10">
          {sent ? (
            <div className="flex min-h-[30rem] flex-col items-center justify-center text-center" role="status">
              <div className="grid size-16 place-items-center rounded-full bg-[#1faa53]/10 text-[#1faa53]">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="mt-5 text-3xl font-medium text-royal-950">Your enquiry is ready in WhatsApp</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">
                Please <strong className="text-ink">press send in WhatsApp</strong> to submit it
                {reference ? ', and attach your inspiration image in the same chat' : ''}. Your custom cake is subject
                to confirmation — we’ll reply to agree details and price.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={submit} className="btn-whatsapp">
                  <MessageCircle className="size-4" /> Open WhatsApp again
                </button>
                <button type="button" onClick={reset} className="btn-outline">
                  Start a new enquiry
                </button>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <h3 className="text-3xl font-medium text-royal-950">Custom Cake Enquiry</h3>
                <p className="mt-1 text-sm text-muted">
                  Fields marked <span className="text-royal-600">*</span> are required. Everything else helps us
                  understand your vision.
                </p>
              </div>

              <Field label="Your name" required id="cc-name" error={errors.name}>
                <input id="cc-name" className="field" autoComplete="name" value={form.name} onChange={update('name')} {...err('name')} />
              </Field>
              <Field label="Phone number" required id="cc-phone" error={errors.phone}>
                <input id="cc-phone" type="tel" inputMode="tel" autoComplete="tel" className="field" placeholder="e.g. 0803 000 0000" value={form.phone} onChange={update('phone')} {...err('phone')} />
              </Field>

              <Field label="Occasion / cake type" required id="cc-occasion" error={errors.occasion}>
                <input id="cc-occasion" list="cc-occasions" className="field" placeholder="e.g. Birthday" value={form.occasion} onChange={update('occasion')} {...err('occasion')} />
                <datalist id="cc-occasions">{OCCASIONS.map((o) => <option key={o} value={o} />)}</datalist>
              </Field>
              <Field label="Preferred flavour" id="cc-flavour">
                <input id="cc-flavour" list="cc-flavours" className="field" placeholder="e.g. Red velvet" value={form.flavour} onChange={update('flavour')} />
                <datalist id="cc-flavours">{FLAVOURS.map((o) => <option key={o} value={o} />)}</datalist>
              </Field>

              <Field label="Cake size" id="cc-size">
                <select id="cc-size" className="field" value={form.size} onChange={update('size')}>
                  <option value="">Select a size…</option>
                  {SIZES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Number of servings" hint="if known" id="cc-servings">
                <input id="cc-servings" type="number" min="1" inputMode="numeric" className="field" placeholder="e.g. 30" value={form.servings} onChange={update('servings')} />
              </Field>

              {form.style && (
                <Field label="Style you liked" id="cc-style" className="sm:col-span-2">
                  <div className="flex gap-2">
                    <input id="cc-style" className="field" value={form.style} onChange={update('style')} />
                    <button type="button" onClick={() => update('style')('')} className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-white text-muted hover:text-red-600" aria-label="Clear style">
                      <X className="size-4" />
                    </button>
                  </div>
                </Field>
              )}

              <Field label="Preferred design or colours" id="cc-design" className="sm:col-span-2">
                <input id="cc-design" className="field" placeholder="e.g. White and royal blue with gold accents, floral theme" value={form.design} onChange={update('design')} />
              </Field>
              <Field label="Message on the cake" hint="optional" id="cc-inscription" className="sm:col-span-2">
                <input id="cc-inscription" className="field" placeholder="e.g. Happy 30th Birthday, Amaka!" value={form.inscription} onChange={update('inscription')} />
              </Field>

              <Field label="Collection / delivery date" required id="cc-date" error={errors.date}>
                <input id="cc-date" type="date" min={todayISO()} className="field" value={form.date} onChange={update('date')} {...err('date')} />
              </Field>
              <fieldset>
                <legend className="field-label">Collection or delivery</legend>
                <div className="grid grid-cols-2 gap-2">
                  {[['pickup', 'Pick-up'], ['delivery', 'Delivery']].map(([val, label]) => (
                    <label
                      key={val}
                      className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border text-sm font-semibold transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-royal-200 ${
                        form.fulfilment === val ? 'border-royal-600 bg-royal-50 text-royal-800' : 'border-line bg-white hover:border-royal-300'
                      }`}
                    >
                      <input type="radio" name="cc-fulfilment" value={val} className="sr-only" checked={form.fulfilment === val} onChange={update('fulfilment')} />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {form.fulfilment === 'delivery' && (
                <Field label="Delivery address / area" required id="cc-address" error={errors.address} className="sm:col-span-2">
                  <input id="cc-address" className="field" autoComplete="street-address" placeholder="e.g. Gwarinpa, Abuja" value={form.address} onChange={update('address')} {...err('address')} />
                </Field>
              )}

              <Field label="Additional instructions" hint="optional" id="cc-notes" className="sm:col-span-2">
                <textarea id="cc-notes" rows={3} className="field resize-none" placeholder="Dietary needs, theme details, toppers, anything else…" value={form.notes} onChange={update('notes')} />
              </Field>

              {/* Reference image */}
              <div className="sm:col-span-2">
                <span className="field-label">
                  Inspiration image <span className="font-normal text-muted">(optional)</span>
                </span>
                {reference ? (
                  <div className="flex items-center gap-4 rounded-xl border border-line bg-white p-3">
                    <img src={reference.url} alt="Your selected inspiration" className="size-16 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1 text-sm">
                      <p className="truncate font-semibold">{reference.name}</p>
                      <p className="text-xs text-muted">Attach this image in WhatsApp after the message opens.</p>
                    </div>
                    <button type="button" onClick={() => setReference(null)} className="grid size-10 place-items-center rounded-full text-muted hover:bg-red-50 hover:text-red-600" aria-label="Remove inspiration image">
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-royal-300 bg-royal-50/50 px-4 py-4 text-sm transition hover:bg-royal-50 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-royal-200">
                    <ImagePlus className="size-5 text-royal-600" />
                    <span>
                      <span className="font-semibold text-royal-800">Choose a reference photo</span>
                      <span className="block text-xs text-muted">WhatsApp links can’t carry images, so we’ll remind you to attach it in the chat.</span>
                    </span>
                    <input type="file" accept="image/*" className="sr-only" onChange={onFile} />
                  </label>
                )}
                {errors.reference && <p className="field-error" role="alert">{errors.reference}</p>}
              </div>

              <div className="sm:col-span-2">
                <LinePicker name="cc-line" value={form.line} onChange={update('line')} />
              </div>

              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-full">
                  <MessageCircle className="size-4" /> Submit Enquiry via WhatsApp
                </button>
                <p className="mt-3 text-center text-xs leading-relaxed text-muted">
                  This is an enquiry, not a confirmed order. Prices for custom cakes depend on size and design and are
                  confirmed with you directly.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
