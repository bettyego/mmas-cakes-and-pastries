import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { products } from '../data/products'

const STORAGE_KEY = 'mmas-cakes:order:v1'
const CartContext = createContext(null)

const productById = new Map(products.map((p) => [p.id, p]))

/** Price for a product with the chosen options (option-level prices override the base price). */
export function resolvePrice(product, selected = {}) {
  let price = product.price ?? null
  for (const opt of product.options ?? []) {
    const choice = opt.choices.find((c) => (typeof c === 'string' ? c : c.label) === selected[opt.name])
    if (choice && typeof choice === 'object' && choice.price != null) price = choice.price
  }
  return price
}

const optionsKey = (options = {}) =>
  Object.keys(options)
    .sort()
    .map((k) => `${k}=${options[k]}`)
    .join('|')

const optionsLabel = (options = {}) => Object.values(options).filter(Boolean).join(', ')

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (i) => i && productById.has(i.productId) && Number.isInteger(i.quantity) && i.quantity > 0,
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadStored)
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef()

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable (private mode) — cart still works for this visit */
    }
  }, [lines])

  // Keep multiple open tabs in sync.
  useEffect(() => {
    const onStorage = (e) => e.key === STORAGE_KEY && setLines(loadStored())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const showToast = useCallback((message, action) => {
    clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), message, action })
    toastTimer.current = setTimeout(() => setToast(null), 3800)
  }, [])

  const addItem = useCallback(
    (product, quantity = 1, options = {}) => {
      const key = `${product.id}::${optionsKey(options)}`
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key)
        if (existing) {
          return prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(l.quantity + quantity, 99) } : l))
        }
        return [...prev, { key, productId: product.id, options, quantity: Math.min(quantity, 99) }]
      })
      showToast(`${product.name} added to your order`, 'view-order')
    },
    [showToast],
  )

  const setQuantity = useCallback((key, quantity) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(quantity, 99) } : l)),
    )
  }, [])

  const removeItem = useCallback((key) => setLines((prev) => prev.filter((l) => l.key !== key)), [])
  const clear = useCallback(() => setLines([]), [])

  // Hydrate stored lines with live catalogue data (so price/name edits apply to saved carts).
  const items = useMemo(
    () =>
      lines.map((l) => {
        const product = productById.get(l.productId)
        return {
          ...l,
          product,
          name: product.name,
          image: product.image,
          price: resolvePrice(product, l.options),
          optionsLabel: optionsLabel(l.options),
        }
      }),
    [lines],
  )

  const summary = useMemo(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0)
    const priced = items.filter((i) => i.price != null)
    const subtotal = priced.reduce((s, i) => s + i.price * i.quantity, 0)
    return { count, subtotal, hasUnpriced: priced.length !== items.length, hasPriced: priced.length > 0 }
  }, [items])

  const value = {
    items,
    ...summary,
    addItem,
    setQuantity,
    removeItem,
    clear,
    isOpen,
    openCart: () => {
      clearTimeout(toastTimer.current)
      setToast(null)
      setIsOpen(true)
    },
    closeCart: () => setIsOpen(false),
    toast,
    showToast,
    dismissToast: () => setToast(null),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
