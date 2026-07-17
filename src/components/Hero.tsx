
import Beams from './Beams.jsx'
import GlitchText from './GlitchText.jsx'


export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#120f17]">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={17}
          lightColor="#008b6b"
          speed={3.1}
          noiseIntensity={2}
          scale={0.25}
          rotation={0}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,139,107,0.18),transparent_42%),linear-gradient(to_bottom,rgba(18,15,23,0.28),rgba(18,15,23,0.86))]" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center sm:px-8">
        <p className="mb-5 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs tracking-[0.32em] text-white/70 uppercase backdrop-blur">
          Engineer • Builder • Designer
        </p>

        <GlitchText
          speed={0.9}
          enableShadows
          enableOnHover={false}
          className="text-[clamp(2.6rem,10vw,7.4rem)] leading-[0.9] tracking-tight text-white"
        >
          LEMASANI
        </GlitchText>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
          I craft reliable digital products with sharp visuals and thoughtful engineering.
          From concept to code, I build experiences that move with intention.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="rounded-full border border-[#27d0ab]/40 bg-[#008b6b]/20 px-6 py-3 text-xs font-semibold tracking-[0.2em] text-[#a9ffea] uppercase transition hover:border-[#27d0ab] hover:bg-[#008b6b]/35"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-xs font-semibold tracking-[0.2em] text-white/85 uppercase backdrop-blur transition hover:border-white/45 hover:bg-white/10"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}
