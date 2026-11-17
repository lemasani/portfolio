import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Portfolio',
    description:
      'This site. Built with TanStack Start, React 19, Tailwind CSS v4, and deployed on Cloudflare Workers. Features an MDX-powered blog and hands-on Three.js exhibits.',
    tags: ['React', 'TanStack Start', 'Tailwind CSS', 'Cloudflare Workers', 'Three.js'],
    githubUrl: 'https://github.com/lemasani/portfolio',
    liveUrl: 'https://lemasani.com',
    featured: false,
    howItWorks:
      'TanStack Start renders every page on a Cloudflare Worker, close to whoever is visiting. Posts are MDX files in the repo. The 3D exhibits and scroll choreography (Three.js, GSAP) load only in the browser, so the server stays lean.',
  },
  {
    id: 'watchlist',
    title: 'Yournextepisode',
    description:
      'A Progressive Web App (PWA) for tracking movies, series, and anime with a local-first architecture and optional Supabase sync. Built with React + TypeScript + Vite and designed to work smoothly offline while synchronizing to the cloud when online.',
    tags: ['TypeScript', 'React', 'PWA', 'Cloudflare Workers', 'Supabase'],
    githubUrl: 'https://github.com/lemasani/yournextepisode',
    liveUrl: 'https://yournextepisode.com',
    featured: true,
    screens: {
      desktop: {
        src: '/hall/yournextepisode-desktop.webp',
        alt: 'Yournextepisode on a desktop browser: the landing page headline "Track Your Next Episode, Never Miss a Beat" with Get Started Free and Learn More buttons.',
        width: 1280,
        height: 800,
      },
      phone: {
        src: '/hall/yournextepisode-phone.webp',
        alt: 'Yournextepisode on a phone: the same landing page, stacked for a narrow screen.',
        width: 585,
        height: 1266,
      },
    },
    howItWorks:
      'Local-first: your watchlist lives on your device and works with no connection at all. Supabase sync is optional, so the cloud is a backup and a bridge between devices, not a dependency. It installs like an app because it is a PWA.',
  },
]
