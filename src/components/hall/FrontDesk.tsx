import { Suspense, lazy, useRef, useState } from 'react'
import { ClientOnly } from '@tanstack/react-router'
import { ArrowUpRight, BellRing, Github, Linkedin } from 'lucide-react'
import { useInView, useReducedMotion } from '@/lib/use-reduced-motion'

const BellScene = lazy(() => import('./BellScene'))

const EMAIL = 'brianlemasan@gmail.com'

export default function FrontDesk() {
  const [ring, setRing] = useState(0)
  const [status, setStatus] = useState('')
  const reduced = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const near = useInView(stageRef, '400px')
  const active = useInView(stageRef, '0px')

  async function ringBell() {
    setRing((value) => value + 1)
    try {
      await navigator.clipboard.writeText(EMAIL)
      setStatus(`Ding. ${EMAIL} is copied and ready to paste.`)
    } catch {
      setStatus(`Ding. The address is ${EMAIL}.`)
    }
  }

  return (
    <section id="front-desk" aria-labelledby="front-desk-title" className="scroll-mt-20 pt-20 sm:pt-28">
      <div className="mx-auto grid max-w-[var(--hall-max)] items-center gap-10 px-[var(--gutter)] lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <h2 id="front-desk-title" className="type-display text-[clamp(2.4rem,4.6vw,4rem)]">
            Front desk
          </h2>
          <p className="mt-4 max-w-[46ch] text-[1.125rem] leading-relaxed">
            Open to new opportunities, collaborations, or just a good conversation about tech. Drop me a line and I'll
            get back to you.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-8 inline-block break-all text-[clamp(1.35rem,2.6vw,2.1rem)] font-extrabold text-ink underline decoration-orange decoration-[4px] underline-offset-[6px] [font-stretch:108%] hover:decoration-ink"
          >
            {EMAIL}
          </a>
          <ul className="mt-8 flex flex-wrap gap-3">
            <li>
              <a
                href="https://github.com/lemasani"
                target="_blank"
                rel="noopener noreferrer"
                className="type-label inline-flex h-12 items-center gap-2 rounded-md bg-ink px-5 text-[1rem] text-placard no-underline transition-colors hover:bg-orange hover:text-ink"
              >
                <Github size={18} strokeWidth={2.25} aria-hidden /> GitHub
                <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/lemasani"
                target="_blank"
                rel="noopener noreferrer"
                className="type-label inline-flex h-12 items-center gap-2 rounded-md bg-ink px-5 text-[1rem] text-placard no-underline transition-colors hover:bg-orange hover:text-ink"
              >
                <Linkedin size={18} strokeWidth={2.25} aria-hidden /> LinkedIn
                <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="ply-frame">
          <div ref={stageRef} className="relative h-[260px] overflow-hidden rounded-t-[3px] bg-placard sm:h-[320px]">
            {near && (
              <ClientOnly fallback={null}>
                <Suspense fallback={null}>
                  <div className="absolute inset-0">
                    <BellScene ring={ring} active={active} reduced={reduced} onRing={ringBell} />
                  </div>
                </Suspense>
              </ClientOnly>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-b-[3px] border-t-[3px] border-ink bg-placard p-4 sm:px-5">
            <button
              type="button"
              onClick={ringBell}
              className="type-label inline-flex h-11 items-center gap-2 rounded-md bg-orange px-4 text-[1rem] text-ink shadow-[0_4px_0_0_var(--enamel-orange-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_0_var(--enamel-orange-deep)]"
            >
              <BellRing size={18} strokeWidth={2.5} aria-hidden />
              Ring for service
            </button>
            <span className="text-[0.95rem] text-ink-soft">Ringing copies my email address.</span>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-[var(--hall-max)] px-[var(--gutter)] text-right text-[0.98rem] font-semibold lg:text-right" aria-live="polite">
        {status}
      </p>

      <footer className="mt-16 border-t-[3px] border-ink">
        <div className="mx-auto flex max-w-[var(--hall-max)] flex-wrap items-center justify-between gap-4 px-[var(--gutter)] py-6 text-[0.95rem]">
          <span className="type-name text-[1.15rem]">LEMASANI</span>
          <span className="text-ink-soft">
            Built with <span className="whitespace-nowrap">TanStack Start</span> ·{' '}
            <span className="whitespace-nowrap">Cloudflare Workers</span> · <span className="whitespace-nowrap">React 19</span>
          </span>
        </div>
      </footer>
    </section>
  )
}
