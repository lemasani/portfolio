import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full border-b border-white/10 transition-colors duration-300',
        scrolled ? 'bg-[#120f17]/95 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        {/* Logo */}
        <a
          href="#"
          className="font-mono text-sm font-bold tracking-[0.2em] text-white uppercase transition hover:text-[#27d0ab]"
        >
          LEMASANI
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs tracking-widest text-white/60 uppercase transition hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/blog"
              className="text-xs tracking-widest text-white/60 uppercase transition hover:text-white"
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden rounded-full border border-[#27d0ab]/40 bg-[#008b6b]/20 px-5 py-2 text-xs font-semibold tracking-[0.2em] text-[#a9ffea] uppercase transition hover:border-[#27d0ab] hover:bg-[#008b6b]/35 md:block"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white/70 transition hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="animate-in slide-in-from-top-2 border-t border-white/10 bg-[#120f17]/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm tracking-widest text-white/70 uppercase transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/blog"
                onClick={() => setOpen(false)}
                className="block text-sm tracking-widest text-white/70 uppercase transition hover:text-white"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
