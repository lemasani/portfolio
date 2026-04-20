import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    description:
      'This site. Built with TanStack Start, React 19, Tailwind CSS v4, and deployed on Cloudflare Workers. Features MDX-powered blog and 3D shader animations.',
    tags: ['React', 'TanStack Start', 'Tailwind CSS', 'Cloudflare Workers', 'Three.js'],
    githubUrl: 'https://github.com/lemasani/portfolio',
    liveUrl: 'https://lemasani.dev',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Project Two',
    description:
      'A full-stack application built with modern tooling. Replace this with a real project description.',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/lemasani',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Project Three',
    description:
      'Another project showcasing your engineering skills. Replace this with a real project description.',
    tags: ['React', 'API', 'UI/UX'],
    githubUrl: 'https://github.com/lemasani',
    featured: true,
  },
  {
    id: 'project-4',
    title: 'Project Four',
    description:
      'A side project or open-source contribution. Replace this with a real project description.',
    tags: ['Open Source', 'Tooling'],
    githubUrl: 'https://github.com/lemasani',
    featured: false,
  },
]
