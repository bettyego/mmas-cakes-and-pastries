export default function Logo({ light = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className={`grid size-10 shrink-0 place-items-center rounded-full border ${
          light ? 'border-white/50 text-white' : 'border-royal-600/40 text-royal-700'
        }`}
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20h16M5 20v-6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6" />
          <path d="M7 13v-2.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1V13" />
          <path d="M5 16.5c1.2.9 2.3.9 3.5 0s2.3-.9 3.5 0 2.3.9 3.5 0 2.3-.9 3.5 0" />
          <path d="M12 9.5V7.5M12 5.8c-.5-.6-1.4-.4-1.4.3 0 .6 1.4 1.4 1.4 1.4s1.4-.8 1.4-1.4c0-.7-.9-.9-1.4-.3Z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[1.55rem] font-semibold tracking-tight ${light ? 'text-white' : 'text-royal-800'}`}>
          MMA’s
        </span>
        <span className={`mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] ${light ? 'text-white/70' : 'text-muted'}`}>
          Cakes &amp; Pastries
        </span>
      </span>
    </span>
  )
}
