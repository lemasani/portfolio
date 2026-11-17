import type { Project } from '@/types'

// Order is the order of the hall. Yournextepisode stays first: Exhibit 01 links to it as Exhibit 02.
export const projects: Project[] = [
  {
    id: 'watchlist',
    title: 'Yournextepisode',
    description:
      "A progressive web app for tracking movies, series and anime. Offline-first, with optional Supabase sync when you're back online.",
    tags: ['React', 'PWA', 'Supabase', 'Cloudflare'],
    githubUrl: 'https://github.com/lemasani/yournextepisode',
    liveUrl: 'https://yournextepisode.com',
    featured: true,
    status: 'live',
    howItWorks:
      'Local-first: your watchlist lives on your device and works with no connection at all. Supabase sync is optional, so the cloud is a backup and a bridge between devices, not a dependency. It installs like an app because it is a PWA.',
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
  },
  {
    id: 'akilini',
    title: 'Akilini',
    description:
      'A learning platform where instructors build, sell and run courses, and learners track progress, streaks and certificates.',
    tags: ['LMS', 'Payments', 'Live webinars', 'Certificates'],
    liveUrl: 'https://akilini.com',
    featured: true,
    status: 'live',
    role: 'Lead engineer at Helga Digitals',
    howItWorks:
      'A pnpm monorepo: the React 19 learning app (TanStack Router and Query) and a separate marketing site, on a Java 21 / Spring Boot 4 API with PostgreSQL, Redis and Keycloak sign-in. Course videos run through their own Python transcoding service.',
    screens: {
      desktop: {
        src: '/hall/akilini-desktop.webp',
        alt: 'Akilini on a desktop browser: the headline "Where knowledge becomes career" beside a course-progress panel for Advanced JavaScript.',
        width: 1280,
        height: 800,
      },
    },
  },
  {
    id: 'coolex-links',
    title: 'Coolex Links',
    description:
      'Reviewing, approving and shipping improvements to a live company website, from layout and copy to performance.',
    tags: ['Web', 'UX review', 'Performance'],
    liveUrl: 'https://coolex-links.com',
    featured: false,
    status: 'client',
    screens: {
      desktop: {
        src: '/hall/coolex-links-desktop.webp',
        alt: 'Coolex Links on a desktop browser: "Premium imports, direct from Japan" over a photo of a white SUV, with View Products and Get a Quote buttons.',
        width: 1280,
        height: 800,
      },
      phone: {
        src: '/hall/coolex-links-phone.webp',
        alt: 'Coolex Links on a phone: the same hero, stacked, with the featured products heading below.',
        width: 585,
        height: 1266,
      },
    },
  },
  {
    id: 'air-canvas',
    title: 'Air Canvas',
    description:
      'Draw and drag shapes on screen with hand gestures tracked through a webcam. No mouse, no touch.',
    tags: ['Computer vision', 'Hand tracking'],
    featured: false,
    status: 'experiment',
    howItWorks:
      'MediaPipe Hand Landmarker tracks your hands through the webcam, entirely in the browser; nothing is uploaded. Pinch to draw or drag, two fingers to erase, hold a pose to undo. A Present mode turns an open-hand swipe into the next slide.',
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description:
      'This site. Built with TanStack Start, React 19, Tailwind CSS v4, and deployed on Cloudflare Workers. Features an MDX-powered blog and hands-on Three.js exhibits.',
    tags: ['React', 'TanStack Start', 'Tailwind CSS', 'Cloudflare Workers', 'Three.js'],
    githubUrl: 'https://github.com/lemasani/portfolio',
    liveUrl: 'https://lemasani.com',
    featured: false,
    status: 'live',
    howItWorks:
      'TanStack Start renders every page on a Cloudflare Worker, close to whoever is visiting. Posts are MDX files in the repo. The 3D exhibits and scroll choreography (Three.js, GSAP) load only in the browser, so the server stays lean.',
  },
  {
    id: 'mova',
    title: 'Mova',
    description:
      'A local-first personal finance app built with Expo, in final preparation for Google Play and the App Store.',
    tagline: 'Personal finance where your money never leaves your phone.',
    tags: ['Expo', 'React Native', 'TypeScript'],
    featured: false,
    status: 'launching',
    howItWorks:
      'Financial data lives in SQLite on the device and is never sent to the server. The server (Bun, Hono, Better Auth) holds identity only, and a test checks it has no financial endpoint at all.',
  },
  {
    id: 'boda-dash',
    title: 'Boda Dash',
    description:
      'A hyper-casual lane-runner for Android and iOS. Weave a boda boda through traffic for as long as you can.',
    tagline: 'Weave a boda boda through traffic for as long as you can.',
    tags: ['Flutter', 'Flame', 'AdMob'],
    featured: false,
    status: 'launching',
    howItWorks:
      'Flutter with the Flame engine: three lanes of East African street traffic, coins and passengers. Fully playable offline, in English and Kiswahili, and ads never appear mid-run.',
  },
]
