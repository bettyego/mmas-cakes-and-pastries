import { business } from '../../data/business'

/** Lets the customer choose which WhatsApp line to send their message to. */
export default function LinePicker({ value, onChange, name, light = false }) {
  return (
    <fieldset>
      <legend className={`field-label ${light ? '!text-white' : ''}`}>Send to WhatsApp line</legend>
      <div className="grid grid-cols-2 gap-2">
        {business.phones.map((p) => {
          const active = value === p.id
          return (
            <label
              key={p.id}
              className={`flex cursor-pointer flex-col rounded-xl border px-3.5 py-3 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-royal-200 ${
                active
                  ? 'border-royal-600 bg-royal-50 text-royal-900'
                  : 'border-line bg-white text-ink hover:border-royal-300'
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                name={name}
                value={p.id}
                checked={active}
                onChange={() => onChange(p.id)}
              />
              <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
                <span className={`size-2.5 rounded-full border ${active ? 'border-royal-600 bg-royal-600' : 'border-muted/50'}`} />
                {p.label}
              </span>
              <span className="mt-1 text-[0.95rem] font-semibold tabular-nums">{p.display}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
