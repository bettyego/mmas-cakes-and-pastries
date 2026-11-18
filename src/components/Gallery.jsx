import { useCallback, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { gallery, galleryIsIllustrative } from '../data/gallery'
import SectionHeading from './ui/SectionHeading'
import Overlay from './ui/Overlay'

export default function Gallery() {
  const tags = useMemo(() => ['All', ...new Set(gallery.map((g) => g.tag))], [])
  const [tag, setTag] = useState('All')
  const [index, setIndex] = useState(null)

  const items = useMemo(() => (tag === 'All' ? gallery : gallery.filter((g) => g.tag === tag)), [tag])

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-ivory-50 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title="A feast"
          script="for the eyes"
          intro="Cakes, cupcakes, pastries and party treats — a little inspiration for your next order or celebration."
        />

        <div className="reveal no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0" role="group" aria-label="Filter gallery">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              aria-pressed={tag === t}
              className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition ${
                tag === t ? 'bg-royal-950 text-white' : 'bg-white text-muted ring-1 ring-line hover:text-royal-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <ul className="mt-10 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          {items.map((img, i) => (
            <li key={img.src} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-ivory-200"
                aria-label={`Open image: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                    i % 5 === 0 ? 'aspect-[3/4]' : i % 3 === 0 ? 'aspect-square' : 'aspect-[4/5]'
                  }`}
                />
                <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-royal-950/70 via-transparent to-transparent p-3 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4">
                  <span className="text-left text-xs font-semibold tracking-wide text-white">{img.tag}</span>
                  <Expand className="size-4 text-white" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {galleryIsIllustrative && (
          <p className="mt-8 text-center text-xs text-muted">
            Photos shown are for illustration and inspiration. Ask us on WhatsApp for pictures of our recent bakes.
          </p>
        )}
      </div>

      <Lightbox items={items} index={index} setIndex={setIndex} />
    </section>
  )
}

function Lightbox({ items, index, setIndex }) {
  const open = index !== null
  const touch = useRef(null)
  const go = useCallback((d) => setIndex((i) => (i + d + items.length) % items.length), [items.length, setIndex])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }
  const item = open ? items[index] : null

  return (
    <Overlay open={open} onClose={() => setIndex(null)} onKeyDown={onKeyDown} variant="full" label="Image viewer">
      {item && (
        <div
          className="relative flex h-full w-full flex-col"
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current == null) return
            const dx = e.changedTouches[0].clientX - touch.current
            if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1)
            touch.current = null
          }}
        >
          <div className="flex items-center justify-between p-4 text-white sm:p-6">
            <p className="text-sm text-white/70 tabular-nums">
              {index + 1} / {items.length}
            </p>
            <button
              type="button"
              data-autofocus
              onClick={() => setIndex(null)}
              className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Close image viewer"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && setIndex(null)}>
            <img key={item.src} src={item.src} alt={item.alt} className="animate-fade-up max-h-full max-w-full rounded-xl object-contain shadow-lift" />
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/25 sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/25 sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
          <div className="p-5 text-center text-white sm:p-8">
            <p className="eyebrow justify-center !text-royal-200">{item.tag}</p>
            <p className="mt-2 font-serif text-xl">{item.alt}</p>
          </div>
        </div>
      )}
    </Overlay>
  )
}
