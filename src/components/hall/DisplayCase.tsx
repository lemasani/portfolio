import { useState } from 'react'
import { Monitor, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

type Screens = NonNullable<Project['screens']>

/**
 * An exhibit's display case: the real thing on a plywood-framed stage.
 * The visitor pushes the button to swap which device is at the front.
 */
export default function DisplayCase({ screens, title, caption }: { screens: Screens; title: string; caption: string }) {
  const [front, setFront] = useState<'desktop' | 'phone'>('desktop')
  const phoneFront = front === 'phone'

  return (
    <figure className="ply-frame">
      <div className="relative overflow-hidden rounded-[3px] bg-blue px-4 pb-6 pt-14 sm:px-10 sm:pb-12 sm:pt-16">
        <span className="type-label absolute left-4 top-4 text-[0.9rem] text-placard sm:left-6 sm:top-5">
          The real thing: {title}
        </span>

        <div className="relative mx-auto max-w-[920px]">
          {/* Desktop browser */}
          <div
            className={cn(
              'relative overflow-hidden rounded-md border-[3px] border-ink bg-placard shadow-[0_24px_40px_-24px_oklch(0.1_0.05_265/0.8)] transition-[transform,filter] duration-500 ease-[var(--ease-out-expo)]',
              screens.phone ? 'sm:mr-[18%]' : 'mx-auto max-w-[820px]',
              phoneFront ? 'z-[1] scale-[0.96] brightness-[0.82]' : 'z-[2]',
            )}
          >
            <div className="flex h-7 items-center gap-1.5 border-b-[3px] border-ink bg-wall-deep px-3" aria-hidden>
              <span className="size-2.5 rounded-full bg-ink/70" />
              <span className="size-2.5 rounded-full bg-ink/70" />
              <span className="size-2.5 rounded-full bg-ink/70" />
            </div>
            <img
              src={screens.desktop.src}
              alt={screens.desktop.alt}
              width={screens.desktop.width}
              height={screens.desktop.height}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>

          {/* Phone */}
          {screens.phone && (
            <div
              className={cn(
                'absolute -bottom-3 right-0 w-[30%] max-w-[230px] overflow-hidden rounded-[18px] border-[5px] border-ink bg-ink shadow-[0_24px_36px_-18px_oklch(0.1_0.05_265/0.85)] transition-[transform,filter] duration-500 ease-[var(--ease-out-expo)] sm:-bottom-6',
                phoneFront ? 'z-[3] -translate-y-3 scale-[1.06]' : 'z-[3] brightness-[0.9]',
              )}
            >
              <img
                src={screens.phone.src}
                alt={screens.phone.alt}
                width={screens.phone.width}
                height={screens.phone.height}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full rounded-[12px]"
              />
            </div>
          )}
        </div>
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 rounded-b-[3px] border-t-[3px] border-ink bg-placard p-4 sm:px-5">
        {screens.phone && (
          <button
            type="button"
            onClick={() => setFront(phoneFront ? 'desktop' : 'phone')}
            aria-pressed={phoneFront}
            className="type-label inline-flex h-11 items-center gap-2 rounded-md bg-orange px-4 text-[1rem] text-ink shadow-[0_4px_0_0_var(--enamel-orange-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_0_var(--enamel-orange-deep)]"
          >
            {phoneFront ? <Monitor size={18} strokeWidth={2.5} aria-hidden /> : <Smartphone size={18} strokeWidth={2.5} aria-hidden />}
            {phoneFront ? 'Bring the desktop forward' : 'Bring the phone forward'}
          </button>
        )}
        <span className="text-[0.95rem] text-ink-soft">{caption}</span>
      </figcaption>
    </figure>
  )
}
