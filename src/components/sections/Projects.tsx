import SectionHeader from '@/components/SectionHeader'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/lib/data/projects'

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="Work"
          title="Selected Projects"
          subtitle="Things I've built and shipped."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
