import { Github, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  className?: string
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        'flex flex-col rounded-xl border-white/10 bg-white/5 transition-colors duration-200 hover:border-[#27d0ab]/40',
        className,
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-mono text-sm font-semibold text-white">
            {project.title}
          </CardTitle>
          {project.featured && (
            <span className="shrink-0 rounded-full border border-[#27d0ab]/30 bg-[#008b6b]/10 px-2 py-0.5 text-[10px] tracking-widest text-[#a9ffea] uppercase">
              Featured
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-xs leading-relaxed text-white/60">{project.description}</p>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-3 pt-0">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#27d0ab]/25 bg-[#008b6b]/10 px-2 py-0.5 text-[10px] text-[#a9ffea]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 transition hover:text-[#27d0ab]"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 transition hover:text-[#27d0ab]"
              aria-label="Live site"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
