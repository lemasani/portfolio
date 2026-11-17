import { Fragment } from 'react'
import { skillCategories } from '@/lib/data/skills'

const shelves = [
  { level: 'core', name: 'Daily on the bench' },
  { level: 'proficient', name: 'On the shelf, well used' },
  { level: 'familiar', name: 'Taken down a few times' },
] as const

/** About Brian, as the hall's founding placard, beside the workshop inventory. */
export default function FoundingPlacard() {
  const tools = skillCategories
    .filter((category) => category.name !== 'Currently Exploring')
    .flatMap((category) => category.skills)

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-[var(--hall-max)] gap-10 px-[var(--gutter)] lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="placard self-start p-6 sm:p-10" data-reveal="hinge">
          <h2 id="about-title" className="type-display text-[clamp(2.2rem,4vw,3.4rem)]">
            Who built the hall
          </h2>
          <div className="mt-5 max-w-[58ch] space-y-4 text-[1.0625rem] leading-relaxed">
            <p>
              I'm Brian Lemasani, an engineer who cares about the full picture: from the architecture decisions that
              shape a product's future to the micro-interactions that make users smile.
            </p>
            <p>
              I specialize in building reliable, fast web applications with a sharp eye for design. I work across the
              stack, comfortable in TypeScript on both client and server, and confident deploying to edge runtimes
              like Cloudflare Workers.
            </p>
            <p>
              When I'm not shipping, I'm exploring new technologies, writing in the reading room, or contributing to
              open source.
            </p>
          </div>
          <p className="mt-6 border-t-[3px] border-ink pt-4 text-[1.0625rem] font-semibold">
            Three-plus years building, ten-plus projects shipped. Most aren't in the hall yet.
          </p>
        </div>

        <div className="lg:pt-4">
          <h3 className="type-display text-[clamp(1.6rem,2.6vw,2.2rem)]">Workshop inventory</h3>
          <p className="mt-2 max-w-[48ch] text-[1rem] leading-relaxed text-ink-soft">
            The tools on the bench, sorted by how often they come down.
          </p>
          <dl className="mt-7 flex flex-col gap-6" data-reveal="print">
            {shelves.map((shelf) => {
              const onShelf = tools.filter((tool) => (tool.level ?? 'familiar') === shelf.level)
              if (onShelf.length === 0) return null
              return (
                <div key={shelf.level} className="border-t-[3px] border-ink pt-3">
                  <dt className="type-label text-[0.95rem]">{shelf.name}</dt>
                  <dd className="mt-2 max-w-[60ch] text-[1.125rem] leading-relaxed">
                    {onShelf.map((tool, i) => (
                      <Fragment key={tool.name}>
                        <span className="whitespace-nowrap">
                          {tool.name}
                          {i < onShelf.length - 1 && <span className="ml-2 mr-1 text-ink-soft" aria-hidden>·</span>}
                        </span>
                        {i < onShelf.length - 1 && ' '}
                      </Fragment>
                    ))}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </section>
  )
}
