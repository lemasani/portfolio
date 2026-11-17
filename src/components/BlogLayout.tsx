import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import Signage from '@/components/hall/Signage'

interface BlogLayoutProps {
  children: React.ReactNode
  showBack?: boolean
}

/** The reading room: same hall signage, a calmer floor for long reading. */
export default function BlogLayout({ children, showBack = true }: BlogLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-wall">
      <a
        href="#main"
        className="type-label sr-only z-[var(--z-toast)] rounded-md bg-ink px-4 py-3 text-placard focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Signage />
      <main id="main" className="mx-auto w-full max-w-[var(--hall-max)] flex-1 px-[var(--gutter)] pb-24 pt-8 sm:pt-12">
        {showBack && (
          <Link
            to="/blog"
            className="type-label mb-8 inline-flex items-center gap-2 text-[0.95rem] text-ink no-underline hover:text-blue"
          >
            <ArrowLeft size={16} strokeWidth={2.5} aria-hidden />
            Reading room
          </Link>
        )}
        {children}
      </main>
      <footer className="border-t-[3px] border-ink">
        <div className="mx-auto flex max-w-[var(--hall-max)] flex-wrap items-center justify-between gap-4 px-[var(--gutter)] py-6 text-[0.95rem]">
          <Link to="/" className="type-name text-[1.15rem] text-ink no-underline">
            LEMASANI
          </Link>
          <a href="/blog/rss.xml" className="font-semibold text-ink underline">
            RSS feed
          </a>
        </div>
      </footer>
    </div>
  )
}
