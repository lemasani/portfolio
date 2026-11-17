export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  tags: string[]
  published: boolean
  /** Written at compile time by src/lib/remark-word-count.ts. */
  wordCount?: number
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  readingTime: number
}

export interface TocHeading {
  id: string
  text: string
  level: 2 | 3
}

export interface PostDetails extends Post {
  toc: TocHeading[]
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  /** live: shipped and public · client: a live site for a client · experiment: a working prototype · launching: built, store release pending */
  status: 'live' | 'client' | 'experiment' | 'launching'
  /** Brian's role, when the project isn't solely his own. */
  role?: string
  /** One short line, used where a project shows up as a crate (launching). */
  tagline?: string
  /** The exhibit's "What's going on?" panel: how it was built, in plain words. */
  howItWorks?: string
  /** Real screenshots for the exhibit's display case (paths under /public). */
  screens?: {
    desktop: { src: string; alt: string; width: number; height: number }
    phone?: { src: string; alt: string; width: number; height: number }
  }
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface Skill {
  name: string
  level?: 'core' | 'proficient' | 'familiar'
}
