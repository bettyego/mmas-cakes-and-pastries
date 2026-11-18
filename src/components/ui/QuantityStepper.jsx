import { Minus, Plus } from 'lucide-react'

export default function QuantityStepper({ value, onChange, min = 1, max = 99, size = 'md', label = 'Quantity' }) {
  const btn = size === 'sm' ? 'size-9' : 'size-11'
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white" role="group" aria-label={label}>
      <button
        type="button"
        className={`${btn} grid place-items-center rounded-full text-royal-800 transition hover:bg-royal-50 disabled:opacity-30`}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </button>
      <span className={`min-w-8 text-center font-semibold tabular-nums ${size === 'sm' ? 'text-sm' : ''}`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={`${btn} grid place-items-center rounded-full text-royal-800 transition hover:bg-royal-50 disabled:opacity-30`}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}
