import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowDown, ArrowRight, Github, Map as MapIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const signs = [
  { label: 'Exhibits', href: '/#exhibits', icon: ArrowDown },
  { label: 'Now', href: '/#now', icon: ArrowDown },
  { label: 'Contact', href: '/#front-desk', icon: ArrowDown },
] as const

/**
 * Museum wayfinding: the wordmark on the wall, directional signs on a black strip.
 * Used on every page of the site.
 */
export default function Signage({ intro = false }: { intro?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--z-sticky)] w-full border-b-[3px] bg-wall transition-colors duration-300',
        scrolled ? 'border-ink' : 'border-transparent',
      )}
      data-hall-intro={intro ? '' : undefined}
      data-intro-part="signage"
    >
      <nav
        aria-label="Site"
        className="mx-auto flex max-w-[var(--hall-max)] items-center justify-between gap-6 px-[var(--gutter)] py-3"
      >
        <Link to="/" className="type-name text-[1.35rem] text-ink no-underline sm:text-[1.6rem]" aria-label="Lemasani, home">
          LEMASANI
        </Link>

        <ul className="hidden items-stretch overflow-hidden rounded-md bg-ink text-placard md:flex">
          {signs.map(({ label, href, icon: Icon }) => (
            <li key={label} className="border-r border-placard/20">
              <a
                href={href}
                className="type-label flex h-11 items-center gap-2 px-4 text-[0.95rem] text-placard no-underline transition-colors hover:bg-orange hover:text-ink"
              >
                <Icon size={16} strokeWidth={2.5} aria-hidden />
                {label}
              </a>
            </li>
          ))}
          <li className="border-r border-placard/20">
            <Link
              to="/blog"
              className="type-label flex h-11 items-center gap-2 px-4 text-[0.95rem] text-placard no-underline transition-colors hover:bg-orange hover:text-ink"
              activeProps={{ className: 'bg-orange !text-ink' }}
            >
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
              Writing
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/lemasani"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center px-4 text-placard transition-colors hover:bg-orange hover:text-ink"
              aria-label="GitHub profile"
            >
              <Github size={18} strokeWidth={2.25} aria-hidden />
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="type-label flex h-11 items-center gap-2 rounded-md bg-ink px-4 text-[0.95rem] text-placard md:hidden"
          aria-expanded={open}
          aria-controls="hall-map"
        >
          {open ? <X size={16} strokeWidth={2.5} aria-hidden /> : <MapIcon size={16} strokeWidth={2.5} aria-hidden />}
          {open ? 'Close' : 'Map'}
        </button>
      </nav>

      {open && (
        <div id="hall-map" className="border-t-[3px] border-ink bg-ink md:hidden">
          <ul className="mx-auto flex max-w-[var(--hall-max)] flex-col px-[var(--gutter)] py-2">
            {signs.map(({ label, href, icon: Icon }) => (
              <li key={label} className="border-b border-placard/15">
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="type-label flex h-14 items-center gap-3 text-[1.15rem] text-placard no-underline"
                >
                  <Icon size={18} strokeWidth={2.5} aria-hidden />
                  {label}
                </a>
              </li>
            ))}
            <li className="border-b border-placard/15">
              <Link
                to="/blog"
                onClick={() => setOpen(false)}
                className="type-label flex h-14 items-center gap-3 text-[1.15rem] text-placard no-underline"
              >
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
                Writing
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/lemasani"
                target="_blank"
                rel="noopener noreferrer"
                className="type-label flex h-14 items-center gap-3 text-[1.15rem] text-placard no-underline"
              >
                <Github size={18} strokeWidth={2.25} aria-hidden />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
