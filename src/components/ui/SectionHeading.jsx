export default function SectionHeading({ eyebrow, title, script, intro, align = 'center', light = false, id }) {
  const centered = align === 'center'
  return (
    <div className={`reveal ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}`}>
      {eyebrow && <p className={`eyebrow ${centered ? 'justify-center' : ''} ${light ? '!text-royal-200' : ''}`}>{eyebrow}</p>}
      <h2
        id={id}
        className={`mt-4 text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-[3.4rem] ${light ? 'text-white' : 'text-royal-950'}`}
      >
        {title}
        {script && (
          <span className={`block font-script text-[0.8em] font-normal ${light ? 'text-royal-200' : 'text-royal-600'}`}>
            {script}
          </span>
        )}
      </h2>
      {intro && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-white/75' : 'text-muted'}`}>{intro}</p>}
    </div>
  )
}
