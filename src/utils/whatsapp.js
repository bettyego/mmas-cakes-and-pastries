import { business } from '../data/business'

export function formatPrice(amount) {
  if (amount == null || Number.isNaN(Number(amount))) return null
  return `${business.currencySymbol}${Number(amount).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`
}

export function getPhone(id) {
  return business.phones.find((p) => p.id === id) ?? business.phones[0]
}

export function buildWhatsAppUrl(phone, message) {
  const base = `https://wa.me/${phone.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Opens WhatsApp in a new tab, falling back to same-tab navigation if a popup blocker interferes. */
export function openWhatsApp(phone, message) {
  const url = buildWhatsAppUrl(phone, message)
  const win = window.open(url, '_blank')
  if (win) {
    try { win.opener = null } catch { /* cross-origin — ignore */ }
  } else {
    window.location.href = url
  }
  return url
}

const line = (label, value) => (value && String(value).trim() ? `${label}: ${String(value).trim()}` : null)

const formatDate = (value) => {
  if (!value) return ''
  const d = new Date(`${value}T12:00:00`)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
}

/** Order summary built from the cart. */
export function buildOrderMessage(items, details) {
  const out = [`Hello ${business.name}!`, `I'd like to place an order, subject to your confirmation.`, '', '*MY ORDER*']

  let subtotal = 0
  let unpriced = 0
  items.forEach((item, i) => {
    const opts = item.optionsLabel ? ` (${item.optionsLabel})` : ''
    out.push(`${i + 1}. ${item.name}${opts}`)
    if (item.price != null) {
      const total = item.price * item.quantity
      subtotal += total
      out.push(`    Qty: ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(total)}`)
    } else {
      unpriced += 1
      out.push(`    Qty: ${item.quantity} (price to be confirmed)`)
    }
  })

  out.push('')
  if (subtotal > 0) {
    out.push(`*Subtotal:* ${formatPrice(subtotal)}${unpriced ? ' (for priced items only)' : ''}`)
  }
  if (unpriced) {
    out.push(`_Please confirm the price${unpriced > 1 ? 's' : ''} for the item${unpriced > 1 ? 's' : ''} marked above._`)
  }

  out.push('', '*MY DETAILS*')
  ;[
    line('Name', details.name),
    line('Phone', details.phone),
    line('Collection / delivery', details.fulfilment === 'delivery' ? 'Delivery' : 'Pick-up / collection'),
    details.fulfilment === 'delivery' ? line('Delivery address / area', details.address) : null,
    line('Preferred date', formatDate(details.date)),
    line('Preferred time', details.time),
    line('Additional instructions', details.notes),
  ]
    .filter(Boolean)
    .forEach((l) => out.push(l))

  out.push('', 'Please confirm availability, the total and delivery/collection details. Thank you!')
  return out.join('\n')
}

/** Custom cake enquiry. */
export function buildCustomCakeMessage(form) {
  const out = [`Hello ${business.name}!`, `I'd like to enquire about a custom cake.`, '', '*CAKE DETAILS*']
  ;[
    line('Occasion / cake type', form.occasion),
    line('Style I like', form.style),
    line('Flavour', form.flavour),
    line('Size', form.size),
    line('Design / colours', form.design),
    line('Servings', form.servings),
    line('Message on cake', form.inscription),
  ]
    .filter(Boolean)
    .forEach((l) => out.push(l))

  out.push('', '*DATE & DELIVERY*')
  ;[
    line('Needed on', formatDate(form.date)),
    line('Collection / delivery', form.fulfilment === 'delivery' ? 'Delivery' : 'Pick-up / collection'),
    form.fulfilment === 'delivery' ? line('Delivery address / area', form.address) : null,
  ]
    .filter(Boolean)
    .forEach((l) => out.push(l))

  out.push('', '*MY DETAILS*')
  ;[line('Name', form.name), line('Phone', form.phone)].filter(Boolean).forEach((l) => out.push(l))

  if (form.notes?.trim()) out.push('', '*ADDITIONAL INSTRUCTIONS*', form.notes.trim())
  if (form.hasReference) out.push('', `I have a reference/inspiration image — I'll attach it in this chat.`)

  out.push('', 'I understand this is an enquiry and the price and availability will be confirmed. Thank you!')
  return out.join('\n')
}

/** General contact message. */
export function buildContactMessage(form) {
  return [
    `Hello ${business.name}!`,
    '',
    form.message.trim(),
    '',
    [line('Name', form.name), line('Phone', form.phone)].filter(Boolean).join('\n'),
  ]
    .join('\n')
    .trim()
}
