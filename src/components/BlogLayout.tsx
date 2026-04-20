import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

interface BlogLayoutProps {
  children: React.ReactNode
  showBack?: boolean
}

export default function BlogLayout({ children, showBack = true }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-[#120f17]">
      <header className="border-b border-white/10 bg-[#120f17]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
          <Link
            to="/"
            className="font-mono text-sm font-bold tracking-[0.2em] text-white uppercase transition hover:text-[#27d0ab]"
          >
            LEMASANI
          </Link>
          {showBack && (
            <Link
              to="/blog"
              className="flex items-center gap-1.5 text-xs text-white/50 transition hover:text-white"
            >
              <ArrowLeft size={13} />
              All posts
            </Link>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-16 sm:px-8">{children}</main>
    </div>
  )
}
