import { useEffect, useState } from 'react'
import { ArrowUp, CheckCircle2, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

/** Toast notifications, floating "view order" button and back-to-top. */
export default function FloatingUI() {
  const { count, openCart, isOpen, toast, dismissToast } = useCart()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Toast */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-[80] flex justify-center px-4 sm:top-24">
        {toast && !isOpen && (
          <div key={toast.id} className="animate-fade-up pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl bg-royal-950 py-3 pr-2 pl-4 text-white shadow-lift">
            <CheckCircle2 className="size-5 shrink-0 text-royal-200" />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            {toast.action === 'view-order' && (
              <button
                type="button"
                onClick={() => {
                  dismissToast()
                  openCart()
                }}
                className="rounded-full bg-white px-3.5 py-2 text-xs font-bold text-royal-800 hover:bg-royal-50"
              >
                View order
              </button>
            )}
            <button type="button" onClick={dismissToast} className="grid size-9 place-items-center rounded-full text-white/60 hover:text-white" aria-label="Dismiss notification">
              <X className="size-4" />
            </button>
          </div>
        )}
      </div>

      <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`grid size-12 place-items-center rounded-full border border-line bg-white text-royal-800 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-royal-300 ${
            showTop ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
          aria-label="Back to top"
          tabIndex={showTop ? 0 : -1}
        >
          <ArrowUp className="size-5" />
        </button>
        {count > 0 && !isOpen && (
          <button
            type="button"
            onClick={openCart}
            className="animate-fade-up flex min-h-14 items-center gap-3 rounded-full bg-royal-600 pr-5 pl-4 text-white shadow-lift transition hover:bg-royal-700"
            aria-label={`View your order, ${count} item${count === 1 ? '' : 's'}`}
          >
            <span className="relative">
              <ShoppingBag className="size-5" />
              <span className="absolute -top-2 -right-2.5 grid min-w-5 place-items-center rounded-full bg-white px-1 text-[0.65rem] font-bold text-royal-700">{count}</span>
            </span>
            <span className="text-sm font-semibold">View order</span>
          </button>
        )}
      </div>
    </>
  )
}
