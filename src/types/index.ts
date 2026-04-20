export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  tags: string[]
  published: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  readingTime: number
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface Skill {
  name: string
  level?: 'core' | 'proficient' | 'familiar'
}
