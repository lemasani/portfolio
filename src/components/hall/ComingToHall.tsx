import { projects } from '@/lib/data/projects'
import { skillCategories } from '@/lib/data/skills'

function NumberSlot() {
  return (
    <span
      className="type-stencil grid h-12 w-16 shrink-0 place-items-center self-end rounded-[3px] border-2 border-dashed border-ink/60 text-[1.6rem] text-ink/60"
      aria-hidden
    >
      ??
    </span>
  )
}

/**
 * Exhibits still in their crates: apps waiting on a store launch, then what
 * Brian is exploring. Each gets a number when it opens in the hall.
 */
export default function ComingToHall() {
  const launching = projects.filter((project) => project.status === 'launching')
  const exploring = skillCategories.find((category) => category.name === 'Currently Exploring')?.skills ?? []
  if (launching.length === 0 && exploring.length === 0) return null

  return (
    <section id="now" aria-labelledby="now-title" className="scroll-mt-20 bg-ink py-20 text-placard sm:py-28">
      <div className="mx-auto grid max-w-[var(--hall-max)] gap-10 px-[var(--gutter)] lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 id="now-title" className="type-display text-[clamp(2.4rem,4.6vw,4rem)] text-placard">
            Coming to the hall
          </h2>
          <p className="mt-4 max-w-[36ch] text-[1.0625rem] leading-relaxed text-placard/80">
            What I'm building and learning next. Still in the crate; when one is ready, it gets a number.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {launching.length > 0 && (
            <ul className="grid gap-3 sm:grid-cols-2" data-reveal="flip" aria-label="Apps launching soon">
              {launching.map((project) => (
                <li
                  key={project.id}
                  className="crate flex min-h-[188px] flex-col justify-between gap-4 rounded-[4px] p-4 text-ink sm:p-5"
                >
                  <NumberSlot />
                  <span>
                    <span className="type-display block text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight">
                      {project.title}
                    </span>
                    {project.tagline && (
                      <span className="mt-1.5 block max-w-[34ch] text-[1rem] leading-snug">{project.tagline}</span>
                    )}
                    <span className="type-label mt-3 block text-[0.85rem]">
                      Store launch soon · {project.tags[0]}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {exploring.length > 0 && (
            <ul className="grid gap-3 sm:grid-cols-2" data-reveal="flip" aria-label="Currently exploring">
              {exploring.map((item) => (
                <li
                  key={item.name}
                  className="crate flex min-h-[132px] flex-col justify-between gap-4 rounded-[4px] p-4 text-ink sm:p-5"
                >
                  <NumberSlot />
                  <span className="type-display text-[clamp(1.35rem,2.2vw,1.85rem)] leading-tight">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
