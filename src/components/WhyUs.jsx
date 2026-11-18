import { CalendarHeart, Gem, Heart, ScanSearch, Smile } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'

const reasons = [
  { icon: Heart, title: 'Freshly Baked with Love', text: 'Every order is prepared fresh, with the same care we’d give our own family’s table.' },
  { icon: Gem, title: 'Beautifully Presented Treats', text: 'Thoughtful finishing and neat packaging that make every bake a pleasure to give and receive.' },
  { icon: CalendarHeart, title: 'Everyday Moments & Big Celebrations', text: 'From a single box of puff-puff to the centrepiece cake for your special day.' },
  { icon: ScanSearch, title: 'Attention to Detail', text: 'We listen closely to your ideas and get the little things right — colours, flavours and timing.' },
  { icon: Smile, title: 'Customer Satisfaction', text: 'Your satisfaction is our priority. We keep you updated and make ordering simple.' },
]

export default function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="relative overflow-hidden bg-ivory-100 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="why-title"
          eyebrow="Why Choose Us"
          title="Made the way"
          script="baking should be"
          intro="Simple promises we bake into every order — whether it’s an everyday treat or a once-in-a-lifetime cake."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-6 lg:gap-6">
          {/* Feature image tile */}
          <div className="reveal relative min-h-[22rem] overflow-hidden rounded-[1.75rem] md:col-span-3 md:row-span-2 lg:col-span-2">
            <img src="/images/cupcakes/strawberry.webp" alt="Strawberry cupcakes with pink frosting" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-royal-950/85 via-royal-950/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <p className="font-script text-4xl text-royal-100">Your satisfaction</p>
              <p className="font-serif text-2xl">is our priority.</p>
            </div>
          </div>

          {reasons.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className={`reveal group rounded-[1.75rem] border border-line/80 bg-white p-7 shadow-soft transition duration-500 hover:-translate-y-1 hover:border-royal-200 hover:shadow-lift md:col-span-3 lg:col-span-2 ${
                i === 0 ? 'lg:bg-royal-600 lg:text-white lg:border-royal-600' : ''
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span
                className={`grid size-13 place-items-center rounded-2xl transition ${
                  i === 0 ? 'bg-royal-50 text-royal-700 lg:bg-white/15 lg:text-white' : 'bg-royal-50 text-royal-700 group-hover:bg-royal-600 group-hover:text-white'
                }`}
              >
                <Icon className="size-6" strokeWidth={1.6} />
              </span>
              <h3 className={`mt-6 text-2xl leading-tight font-semibold ${i === 0 ? 'text-royal-950 lg:text-white' : 'text-royal-950'}`}>{title}</h3>
              <p className={`mt-2.5 text-sm leading-relaxed ${i === 0 ? 'text-muted lg:text-white/75' : 'text-muted'}`}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
