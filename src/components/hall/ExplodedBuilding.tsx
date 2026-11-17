import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { getGsap, useIsomorphicLayoutEffect } from '@/lib/motion'

const layers = [
  {
    name: 'Cloudflare Worker',
    note: 'Renders every page at the edge, close to whoever is visiting.',
    face: 'bg-ply text-ink',
    edge: 'bg-ply-edge',
  },
  {
    name: 'TanStack Start · React 19',
    note: 'Routes, data loading and components, rendered on the server first.',
    face: 'bg-blue text-placard',
    edge: 'bg-blue-deep',
  },
  {
    name: 'MDX writing',
    note: 'Every post is a file in the repo, with code highlighting and diagrams.',
    face: 'bg-placard text-ink',
    edge: 'bg-wall-deep',
  },
  {
    name: 'Browser only: GSAP · Three.js',
    note: 'The exhibits and motion load here and nowhere else, so the server stays lean.',
    face: 'bg-orange text-ink',
    edge: 'bg-orange-deep',
  },
] as const

/**
 * Exhibit 03's display case: an exploded view of this site.
 * Desktop with motion: the case pins and scrolling pulls the layers apart.
 * Phones and reduced motion: the layers are shown already apart, in order.
 */
export default function ExplodedBuilding() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(layers.length - 1)

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const { gsap } = getGsap()
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      setActive(-1)
      const plates = gsap.utils.toArray<HTMLElement>('[data-plate]', root)
      gsap.set(plates, { z: (i: number) => i * 16 })
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'center center',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const index = Math.min(layers.length - 1, Math.floor(self.progress * (layers.length + 0.4)) - 0)
            setActive(self.progress < 0.04 ? -1 : index)
          },
        },
      })
      tl.to(plates, { z: (i: number) => i * 82, ease: 'none', duration: 1 }, 0)
        .to('[data-iso]', { rotateZ: -32, y: 96, ease: 'none', duration: 1 }, 0)
      return () => setActive(layers.length - 1)
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={rootRef} className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      <div className="ply-frame">
        <div className="relative flex h-[340px] items-center justify-center overflow-hidden rounded-[3px] bg-wall-deep [perspective:1800px] sm:h-[460px] lg:h-[520px]">
          <div
            data-iso
            className="relative h-[150px] w-[210px] translate-y-14 [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-40deg)] sm:h-[190px] sm:w-[270px]"
          >
            {layers.map((layer, i) => (
              <div
                key={layer.name}
                data-plate
                className="absolute inset-0 [transform-style:preserve-3d]"
                style={{ transform: `translateZ(${i * 56}px)` }}
              >
                <div className={cn('absolute inset-0 translate-z-[-12px] rounded-md', layer.edge)} />
                <div
                  className={cn(
                    'absolute inset-0 flex items-end rounded-md border-[3px] border-ink p-3 transition-[filter] duration-300',
                    layer.face,
                    active >= 0 && active !== i && 'brightness-[0.92]',
                  )}
                >
                  <span className="type-label text-[0.8rem] leading-tight sm:text-[0.95rem]">{layer.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ol className="flex flex-col-reverse gap-1" aria-label="Layers of this site, bottom to top">
        {layers.map((layer, i) => (
          <li
            key={layer.name}
            className={cn(
              'grid grid-cols-[3rem_1fr] gap-3 border-t-[3px] py-4 transition-colors duration-300',
              active === i ? 'border-orange' : 'border-ink',
            )}
          >
            <span className="text-[2rem] font-black leading-none text-ink [font-stretch:72%]" aria-hidden>
              {String(i + 1)}
            </span>
            <span>
              <span className="block text-[1.125rem] font-bold leading-snug">{layer.name}</span>
              <span className="mt-1 block text-[0.98rem] leading-relaxed text-ink-soft">{layer.note}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
