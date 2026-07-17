import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    description:
      'This site. Built with TanStack Start, React 19, Tailwind CSS v4, and deployed on Cloudflare Workers. Features MDX-powered blog and 3D shader animations.',
    tags: ['React', 'TanStack Start', 'Tailwind CSS', 'Cloudflare Workers', 'Three.js'],
    githubUrl: 'https://github.com/lemasani/portfolio',
    liveUrl: 'https://lemasani.com',
    featured: false,
  },
  {
    id: 'watchlist',
    title: 'Yournextepisode',
    description:
      'A Progressive Web App (PWA) for tracking movies, series, and anime with a local-first offline-first architecture and optional Supabase sync. Built with React + TypeScript + Vite and designed to work smoothly offline while synchronizing to the cloud when online.',
    tags: ['TypeScript', 'React', 'PWA', 'Cloudflare Workers', 'Supabase'],
    githubUrl: 'https://github.com/lemasani/yournextepisode',
    liveUrl: 'https://yournextepisode.com',
    featured: true,
  },
]
