import { skillCategories } from '@/lib/data/skills'

/** Exhibits still in their crates: what Brian is exploring before it becomes an exhibit. */
export default function ComingToHall() {
  const exploring = skillCategories.find((category) => category.name === 'Currently Exploring')?.skills ?? []
  if (exploring.length === 0) return null

  return (
    <section id="now" aria-labelledby="now-title" className="scroll-mt-20 bg-ink py-20 text-placard sm:py-28">
      <div className="mx-auto grid max-w-[var(--hall-max)] gap-10 px-[var(--gutter)] lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 id="now-title" className="type-display text-[clamp(2.4rem,4.6vw,4rem)] text-placard">
            Coming to the hall
          </h2>
          <p className="mt-4 max-w-[36ch] text-[1.0625rem] leading-relaxed text-placard/80">
            What I'm learning and building next. Still in the crate; when one is ready, it gets a number.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2" data-reveal="flip">
          {exploring.map((item) => (
            <li
              key={item.name}
              className="crate flex min-h-[132px] flex-col justify-between gap-4 rounded-[4px] p-4 text-ink sm:p-5"
            >
              <span
                className="type-stencil grid h-12 w-16 place-items-center self-end rounded-[3px] border-2 border-dashed border-ink/60 text-[1.6rem] text-ink/60"
                aria-hidden
              >
                ??
              </span>
              <span className="type-display text-[clamp(1.35rem,2.2vw,1.85rem)] leading-tight">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
