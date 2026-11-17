import { useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Signage from '@/components/hall/Signage'
import ExhibitOne from '@/components/hall/ExhibitOne'
import Exhibit from '@/components/hall/Exhibit'
import FoundingPlacard from '@/components/hall/FoundingPlacard'
import ComingToHall from '@/components/hall/ComingToHall'
import ReadingRack from '@/components/hall/ReadingRack'
import FrontDesk from '@/components/hall/FrontDesk'
import { useHallReveals } from '@/components/hall/useHallReveals'
import { projects } from '@/lib/data/projects'
import { getAllPosts } from '@/lib/blog'
import { seoHead } from '@/lib/seo'

export const Route = createFileRoute('/')({
  loader: () => ({ posts: getAllPosts().slice(0, 3) }),
  head: () => seoHead({ path: '/' }),
  component: Hall,
})

function Hall() {
  const { posts } = Route.useLoaderData()
  const mainRef = useRef<HTMLElement>(null)
  useHallReveals(mainRef)

  // Hall order is the data order. Exhibit 01 is the live sync demo, so the hall starts at 02.
  // Projects still waiting on a store launch live in "Coming to the hall" as crates.
  const exhibits = projects.filter((project) => project.status !== 'launching')

  return (
    <div id="top" className="min-h-screen bg-wall">
      <a
        href="#main"
        className="type-label sr-only z-[var(--z-toast)] rounded-md bg-ink px-4 py-3 text-placard focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to the exhibits
      </a>
      <Signage intro />
      <main id="main" ref={mainRef}>
        <ExhibitOne />

        <section id="exhibits" aria-labelledby="exhibits-title" className="scroll-mt-20 pt-16 sm:pt-24">
          <div className="mx-auto max-w-[var(--hall-max)] px-[var(--gutter)]">
            <div className="flex flex-wrap items-end justify-between gap-4 pb-10">
              <h2 id="exhibits-title" className="type-display text-[clamp(2.4rem,4.6vw,4rem)]">
                The hall
              </h2>
              <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-soft">
                Shipped work, client work and experiments. Each exhibit has a placard, a note on how it was built, and the thing itself where it can be shown.
              </p>
            </div>
            <div className="flex flex-col gap-16 sm:gap-24">
              {exhibits.map((project, index) => (
                <Exhibit key={project.id} project={project} number={index + 2} flip={index % 2 === 1} />
              ))}
            </div>
          </div>
        </section>

        <FoundingPlacard />
        <ComingToHall />
        <ReadingRack posts={posts} />
        <FrontDesk />
      </main>
    </div>
  )
}
