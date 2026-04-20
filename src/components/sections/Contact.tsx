import { Github, Linkedin, Mail } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'

const EMAIL = 'brianlemasan@gmail.com'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/lemasani',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/lemasani',
    icon: Linkedin,
  },
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-6 py-24 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <SectionHeader label="Say Hello" title="Let's build something." />

        <p className="mb-10 max-w-xl text-sm leading-relaxed text-white/60">
          Open to new opportunities, collaborations, or just a good conversation about tech. Drop me
          a line and I&apos;ll get back to you.
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="mb-10 rounded-full border border-[#27d0ab]/40 bg-[#008b6b]/20 px-8 py-3 text-xs font-semibold tracking-[0.2em] text-[#a9ffea] uppercase transition hover:border-[#27d0ab] hover:bg-[#008b6b]/35"
        >
          {EMAIL}
        </a>

        <div className="flex items-center gap-5">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-white/40 transition hover:text-[#27d0ab]"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        <p className="mt-20 text-xs text-white/25">
          Built with TanStack Start · Cloudflare Workers · React 19
        </p>
      </div>
    </section>
  )
}
