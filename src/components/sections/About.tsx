import SectionHeader from '@/components/SectionHeader'

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader label="Who I Am" title="About Me" />

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="space-y-4 text-sm leading-relaxed text-white/70">
            <p>
              I&apos;m Brian Lemasani — an engineer who cares about the full picture: from the
              architecture decisions that shape a product&apos;s future to the micro-interactions
              that make users smile.
            </p>
            <p>
              I specialize in building reliable, fast web applications with a sharp eye for design.
              I work across the stack — comfortable in TypeScript on both client and server, and
              confident deploying to edge runtimes like Cloudflare Workers.
            </p>
            <p>
              When I&apos;m not shipping, I&apos;m exploring new technologies, writing on this blog,
              or contributing to open source.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '3+', label: 'Years building' },
              { value: '10+', label: 'Projects shipped' },
              { value: 'Edge', label: 'Deployment target' },
              { value: 'Full', label: 'Stack coverage' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
              >
                <p className="font-mono text-2xl font-bold text-[#27d0ab]">{stat.value}</p>
                <p className="mt-1 text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
