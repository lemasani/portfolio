import { Suspense, lazy, useCallback, useRef, useState } from 'react'
import { ClientOnly } from '@tanstack/react-router'
import { ArrowDown } from 'lucide-react'
import { EASE, getGsap, useIsomorphicLayoutEffect } from '@/lib/motion'
import { useInView, useReducedMotion } from '@/lib/use-reduced-motion'
import type { SyncStats } from './SyncScene'

const SyncScene = lazy(() => import('./SyncScene'))

export default function ExhibitOne() {
  const [online, setOnline] = useState(true)
  const [stats, setStats] = useState<SyncStats>({ queued: 0, synced: 0 })
  const [jolt, setJolt] = useState(0)
  const [pressed, setPressed] = useState(false)
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const active = useInView(stageRef, '0px')

  const onStats = useCallback((next: SyncStats) => setStats(next), [])

  function push() {
    setOnline((value) => !value)
    setJolt((value) => value + 1)
    setPressed(true)
    window.setTimeout(() => setPressed(false), 120)
  }

  // Hall lights on: one orchestrated entrance for the first viewport.
  useIsomorphicLayoutEffect(() => {
    if (document.documentElement.dataset.motion !== 'on') return
    const { gsap } = getGsap()
    const root = sectionRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const signage = document.querySelector('[data-intro-part="signage"]')
      const tl = gsap.timeline({ defaults: { ease: EASE.out } })
      if (signage) tl.fromTo(signage, { autoAlpha: 0, yPercent: -100 }, { autoAlpha: 1, yPercent: 0, duration: 0.7 }, 0)
      tl.fromTo(
        '[data-intro-part="stage"]',
        { autoAlpha: 0, clipPath: 'inset(46% 46% 46% 46% round 6px)' },
        { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0% round 6px)', duration: 1.0 },
        0.1,
      )
        .fromTo(
          '[data-intro-part="lights"]',
          { filter: 'brightness(0.25)' },
          {
            keyframes: { filter: ['brightness(0.25)', 'brightness(0.95)', 'brightness(0.45)', 'brightness(1.05)', 'brightness(1)'] },
            duration: 0.75,
            ease: 'none',
          },
          0.35,
        )
        .fromTo(
          '[data-intro-part="numeral"]',
          { autoAlpha: 0, scale: 1.9, rotate: -10 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.5, ease: EASE.stamp },
          0.75,
        )
        .fromTo(
          '[data-intro-part="placard"]',
          { autoAlpha: 0, rotateX: -78, transformPerspective: 1100, transformOrigin: '50% 0%' },
          { autoAlpha: 1, rotateX: 0, duration: 1.1 },
          0.3,
        )
        .from('[data-intro-line]', { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.07 }, 0.65)
        .fromTo(
          '[data-intro-part="push"]',
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, duration: 0.6, ease: EASE.quart },
          1.05,
        )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="exhibit-01-title"
      className="mx-auto grid max-w-[var(--hall-max)] gap-5 px-[var(--gutter)] pb-16 pt-4 lg:min-h-[calc(100svh-68px)] lg:grid-cols-[1.45fr_1fr] lg:gap-7 lg:pb-10"
    >
      {/* Stage */}
      <div className="ply-frame flex min-h-[340px] flex-col sm:min-h-[460px] lg:min-h-0" data-hall-intro="" data-intro-part="stage">
        <div
          ref={stageRef}
          data-intro-part="lights"
          className="relative min-h-[324px] flex-1 overflow-hidden rounded-[3px] bg-blue sm:min-h-[440px]"
        >
          <ClientOnly fallback={null}>
            <Suspense fallback={null}>
              <div className="absolute inset-0">
                <SyncScene online={online} active={active} reduced={reduced} jolt={jolt} onStats={onStats} />
              </div>
            </Suspense>
          </ClientOnly>

          <span
            className="type-stencil pointer-events-none absolute left-4 top-3 text-[clamp(4.5rem,9vw,8rem)] text-placard sm:left-6 sm:top-5"
            aria-hidden
            data-hall-intro=""
            data-intro-part="numeral"
          >
            01
          </span>
          <span className="type-label pointer-events-none absolute bottom-4 left-4 text-[0.9rem] text-placard sm:bottom-6 sm:left-6">
            Your device
          </span>
          <span className="type-label pointer-events-none absolute right-4 top-4 text-right text-[0.9rem] text-placard sm:right-6 sm:top-6">
            Cloud · Supabase
          </span>
          <span className="type-label pointer-events-none absolute bottom-4 right-4 hidden text-[0.8rem] text-on-blue-soft sm:bottom-6 sm:right-6 sm:block">
            Click a block to nudge it
          </span>
        </div>
      </div>

      {/* Placard */}
      <div
        className="placard relative flex flex-col gap-5 p-5 sm:p-8"
        data-hall-intro=""
        data-intro-part="placard"
      >
        <div className="max-lg:order-3">
          <h1 className="type-name text-[clamp(2.6rem,4.3vw,4.15rem)]" data-intro-line>
            Brian
            <br />
            Lemasani
          </h1>
          <p className="mt-4 max-w-[38ch] text-[1.125rem] leading-snug" data-intro-line>
            Engineer with a designer's eye. I build reliable software end to end and sweat the interface details.
            This hall is my lab: everything in it works, so push things.
          </p>
        </div>

        <div data-intro-line className="max-lg:order-4">
          <h2 id="exhibit-01-title" className="type-display text-[1.5rem]">
            What's going on?
          </h2>
          <p className="mt-2 max-w-[44ch] text-[0.98rem] leading-relaxed text-ink-soft">
            This is how Yournextepisode keeps working offline. Each block is an episode marked as watched. It's
            written on your device first, then synced up to the cloud. Cut the network and changes wait in a local
            queue; bring it back and the queue syncs up.
          </p>
        </div>

        <dl className="spec-slot max-lg:order-2" data-intro-line>
          <dt>Network</dt>
          <dd className="flex items-center gap-2">
            <span
              className={online ? 'size-2.5 rounded-full bg-green' : 'size-2.5 rounded-full bg-orange'}
              aria-hidden
            />
            {online ? 'Online' : 'Offline'}
          </dd>
          <dt>Queued</dt>
          <dd>{stats.queued} {stats.queued === 1 ? 'change' : 'changes'} on the device</dd>
          <dt>Synced</dt>
          <dd>{stats.synced} to the cloud</dd>
        </dl>
        <p className="sr-only" aria-live="polite">
          {online ? 'Network restored. Queued changes are syncing.' : 'Network cut. New changes will queue on the device.'}
        </p>

        <div className="mt-auto flex items-center gap-5 pt-2 max-lg:order-1 max-lg:mt-0 max-lg:pt-0">
          <button
            type="button"
            className="push-button"
            onClick={push}
            aria-pressed={!online}
            data-pressed={pressed}
            data-hall-intro=""
            data-intro-part="push"
          >
            <span className="push-button__cap">PUSH</span>
            <span className="sr-only">{online ? 'to cut the network' : 'to restore the network'}</span>
          </button>
          <div>
            <p className="type-display text-[1.35rem] leading-tight" aria-hidden>
              {online ? 'to cut the network' : 'to bring it back'}
            </p>
            <a
              href="#exhibit-yournextepisode"
              className="mt-1.5 inline-block text-[0.95rem] font-semibold text-blue underline"
            >
              The full app is Exhibit&nbsp;02
              <ArrowDown size={15} strokeWidth={2.5} aria-hidden className="ml-1 inline align-[-2px]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
