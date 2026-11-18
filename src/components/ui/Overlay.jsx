import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/** Stack of open overlays — only the top-most one responds to the keyboard. */
const stack = []
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Accessible overlay used by modals, the cart drawer, lightbox and mobile menu.
 * Handles: Escape to close, body scroll lock, focus trap and focus restore.
 * `onKeyDown` receives other key presses while this overlay is on top (e.g. arrow keys).
 */
export default function Overlay({ open, onClose, onKeyDown, labelledBy, label, variant = 'modal', className = '', children }) {
  const panelRef = useRef(null)
  const handlers = useRef({ onClose, onKeyDown })
  useEffect(() => {
    handlers.current = { onClose, onKeyDown }
  })

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement
    const token = {}
    stack.push(token)
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    const panel = panelRef.current
    const first = panel?.querySelector('[data-autofocus]') || panel?.querySelector(FOCUSABLE)
    ;(first || panel)?.focus({ preventScroll: true })

    // Listen on the document so keys still work if focus is lost (e.g. the focused button was removed).
    const onKey = (e) => {
      if (stack[stack.length - 1] !== token || !panel) return
      if (e.key === 'Escape') {
        e.preventDefault()
        handlers.current.onClose?.()
        return
      }
      if (e.key === 'Tab') {
        const nodes = Array.from(panel.querySelectorAll(FOCUSABLE)).filter((n) => n.offsetParent !== null)
        if (!nodes.length) return
        const firstEl = nodes[0]
        const lastEl = nodes[nodes.length - 1]
        const inside = panel.contains(document.activeElement)
        if (!inside) {
          e.preventDefault()
          ;(e.shiftKey ? lastEl : firstEl).focus()
        } else if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
        return
      }
      handlers.current.onKeyDown?.(e)
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      stack.splice(stack.indexOf(token), 1)
      if (stack.length === 0) {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
      if (previouslyFocused && document.contains(previouslyFocused)) previouslyFocused.focus({ preventScroll: true })
    }
  }, [open])

  if (!open) return null

  const layouts = {
    modal: 'items-end justify-center sm:items-center sm:p-6',
    drawer: 'justify-end',
    full: 'items-center justify-center',
    menu: 'justify-end',
  }
  const panels = {
    modal: 'animate-fade-up max-h-[94dvh] w-full overflow-y-auto rounded-t-3xl bg-ivory-50 shadow-lift sm:max-w-4xl sm:rounded-3xl',
    drawer: 'drawer-in flex h-dvh w-full max-w-md flex-col bg-ivory-50 shadow-lift',
    full: 'h-full w-full',
    menu: 'drawer-in flex h-dvh w-full max-w-sm flex-col bg-royal-950 text-white',
  }

  return createPortal(
    <div className={`fixed inset-0 z-[70] flex ${layouts[variant]}`}>
      <div
        className={`absolute inset-0 ${variant === 'full' ? 'bg-royal-950/95' : 'bg-royal-950/55'} backdrop-blur-[2px] fade-in`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-label={labelledBy ? undefined : label}
        tabIndex={-1}
        className={`relative outline-none ${panels[variant]} ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
