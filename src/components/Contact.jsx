import { useState } from 'react'
import { CheckCircle2, MapPin, MessageCircle, Phone } from 'lucide-react'
import { business } from '../data/business'
import { buildContactMessage, buildWhatsAppUrl, getPhone, openWhatsApp } from '../utils/whatsapp'
import SectionHeading from './ui/SectionHeading'
import Field from './ui/Field'
import LinePicker from './ui/LinePicker'

const initial = { name: '', phone: '', message: '', line: business.phones[0].id }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => {
    const value = e?.target ? e.target.value : e
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (form.name.trim().length < 2) er.name = 'Please enter your name.'
    if (form.message.trim().length < 5) er.message = 'Please write a short message.'
    setErrors(er)
    if (Object.keys(er).length) {
      document.getElementById(er.name ? 'ct-name' : 'ct-message')?.focus()
      return
    }
    openWhatsApp(getPhone(form.line), buildContactMessage(form))
    setSent(true)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Let’s make something"
          script="sweet together"
          intro="Call or WhatsApp us on either line — we’re happy to help with orders, custom cakes and event treats."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          {/* Contact cards */}
          <div className="grid gap-5">
            {business.phones.map((p) => (
              <div key={p.id} className="reveal rounded-[1.75rem] border border-line bg-ivory-50 p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-royal-600">{p.label}</p>
                <a href={`tel:${p.tel}`} className="mt-2 block font-serif text-4xl font-medium text-royal-950 tabular-nums hover:text-royal-700">
                  {p.display}
                </a>
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <a href={`tel:${p.tel}`} className="btn-outline !min-h-11 !px-3">
                    <Phone className="size-4" /> Call
                  </a>
                  <a
                    href={buildWhatsAppUrl(p, `Hello ${business.name}! `)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp !min-h-11 !px-3"
                  >
                    <MessageCircle className="size-4" /> WhatsApp
                  </a>
                </div>
              </div>
            ))}

            <div className="reveal relative overflow-hidden rounded-[1.75rem] bg-royal-950 p-7 text-white">
              <img src="/images/pastries/bakery-display.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
              <div className="relative">
                <MapPin className="size-6 text-royal-200" />
                <p className="mt-4 font-serif text-3xl">{business.name}</p>
                <p className="mt-1 text-white/75">{business.location}</p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                  Pick-up and delivery arrangements within Abuja are confirmed with you when you order.
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="reveal rounded-[1.75rem] border border-line bg-ivory-50 p-6 sm:p-9">
            {sent ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center" role="status">
                <CheckCircle2 className="size-12 text-[#1faa53]" />
                <h3 className="mt-4 text-3xl font-medium text-royal-950">Your message is ready in WhatsApp</h3>
                <p className="mt-2 max-w-sm text-muted">Press send in WhatsApp and we’ll get back to you as soon as we can.</p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initial)
                    setSent(false)
                  }}
                  className="btn-outline mt-7"
                >
                  Write another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5">
                <div>
                  <h3 className="text-3xl font-medium text-royal-950">Send us a message</h3>
                  <p className="mt-1 text-sm text-muted">Your message opens in WhatsApp, ready to send.</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name" required id="ct-name" error={errors.name}>
                    <input id="ct-name" className="field" autoComplete="name" value={form.name} onChange={update('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'ct-name-err' : undefined} />
                  </Field>
                  <Field label="Phone number" hint="optional" id="ct-phone">
                    <input id="ct-phone" type="tel" inputMode="tel" autoComplete="tel" className="field" value={form.phone} onChange={update('phone')} />
                  </Field>
                </div>
                <Field label="Message" required id="ct-message" error={errors.message}>
                  <textarea id="ct-message" rows={5} className="field resize-none" placeholder="How can we help?" value={form.message} onChange={update('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'ct-message-err' : undefined} />
                </Field>
                <LinePicker name="ct-line" value={form.line} onChange={update('line')} />
                <button type="submit" className="btn-primary w-full">
                  <MessageCircle className="size-4" /> Send via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
