/**
 * Smoothly scroll to a section (e.g. '#menu') and update the URL hash.
 * Used after closing an overlay, once the page scroll lock has been released.
 */
export function scrollToSection(hash, delay = 40) {
  setTimeout(() => {
    const el = document.querySelector(hash)
    if (!el) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    if (window.location.hash !== hash) history.replaceState(null, '', hash)
  }, delay)
}
