import { cn } from '@/lib/utils'
import SectionHeader from '@/components/SectionHeader'
import { skillCategories } from '@/lib/data/skills'

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="Stack"
          title="Technologies"
          subtitle="Tools I reach for and technologies I know well."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category) => (
            <div key={category.name}>
              <p className="mb-3 text-xs tracking-[0.2em] text-[#27d0ab] uppercase">
                {category.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs transition',
                      skill.level === 'core'
                        ? 'border-[#27d0ab]/35 bg-[#008b6b]/15 text-[#a9ffea]'
                        : 'border-white/15 bg-white/5 text-white/70',
                    )}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
