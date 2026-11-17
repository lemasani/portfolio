import { ArrowUp, ArrowUpRight, Github } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'
import ExplodedBuilding from './ExplodedBuilding'
import DisplayCase from './DisplayCase'

interface ExhibitProps {
  project: Project
  number: number
  flip?: boolean
}

export default function Exhibit({ project, number, flip = false }: ExhibitProps) {
  const isThisSite = project.id === 'portfolio'
  const isSyncApp = project.id === 'watchlist'
  const numeral = String(number).padStart(2, '0')

  return (
    <article
      id={`exhibit-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      aria-labelledby={`exhibit-${project.id}-title`}
      className="scroll-mt-24 border-t-[3px] border-ink pt-10 sm:pt-14"
    >
      <div className={cn('grid gap-8 lg:grid-cols-12 lg:gap-10', flip && 'lg:[&>*:first-child]:order-2')}>
        {/* Numeral + spec slot */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          <span
            className="type-stencil text-[clamp(6rem,13vw,11rem)] text-ink"
            aria-hidden
            data-reveal="stamp"
          >
            {numeral}
          </span>
          <dl className="spec-slot" data-reveal="print">
            <dt>Stack</dt>
            <dd>{project.tags.join(' · ')}</dd>
            <dt>Status</dt>
            <dd className="flex items-center gap-2">
              <span className={cn('size-2.5 rounded-full', project.liveUrl ? 'bg-green' : 'bg-orange')} aria-hidden />
              {project.liveUrl ? 'Live' : 'In the workshop'}
            </dd>
          </dl>
        </div>

        {/* Placard */}
        <div className="placard flex flex-col gap-5 p-5 sm:p-8 lg:col-span-8" data-reveal="hinge">
          <h3 id={`exhibit-${project.id}-title`} className="type-display text-[clamp(2.1rem,4vw,3.4rem)]">
            {isThisSite ? 'This building' : project.title}
          </h3>
          {isThisSite && <p className="-mt-3 text-[1.05rem] font-semibold text-ink-soft">The portfolio you're standing in</p>}
          <p className="max-w-[60ch] text-[1.0625rem] leading-relaxed">{project.description}</p>

          {project.howItWorks && (
            <div className="rounded-md bg-wall-deep p-4 sm:p-5">
              <h4 className="type-display text-[1.2rem]">What's going on?</h4>
              <p className="mt-1.5 max-w-[60ch] text-[1rem] leading-relaxed">{project.howItWorks}</p>
            </div>
          )}

          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.liveUrl && !isThisSite && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="type-label inline-flex h-12 items-center gap-2 rounded-md border-[3px] border-ink bg-orange px-5 text-[1.05rem] text-ink no-underline transition-colors hover:bg-ink hover:text-placard"
              >
                Visit {project.title}
                <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {isSyncApp && (
              <a href="#top" className="inline-flex items-center gap-1.5 font-semibold text-blue underline">
                <ArrowUp size={16} strokeWidth={2.5} aria-hidden />
                Push the sync exhibit again
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-ink underline"
              >
                <Github size={16} strokeWidth={2.5} aria-hidden />
                Source on GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {project.screens && (
        <div className="mt-10">
          <DisplayCase screens={project.screens} title={project.title} />
        </div>
      )}

      {isThisSite && (
        <div className="mt-10">
          <ExplodedBuilding />
        </div>
      )}
    </article>
  )
}
