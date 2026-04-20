import type { ComponentType } from 'react'
import type { Post, PostFrontmatter } from '@/types'

interface MdxModule {
  default: ComponentType<any>
  frontmatter: PostFrontmatter
}

const modules = import.meta.glob<MdxModule>('/src/content/blog/*.mdx', { eager: true })

function slugFromPath(path: string): string {
  return path.replace(/^.*\/(.+)\.mdx$/, '$1')
}

function readingTime(text: string): number {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200))
}

export function getAllPosts(): Post[] {
  return Object.entries(modules)
    .filter(([, mod]) => mod.frontmatter?.published)
    .map(([path, mod]) => ({
      slug: slugFromPath(path),
      frontmatter: mod.frontmatter,
      readingTime: readingTime(String(mod.default)),
    }))
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

export function getPostBySlug(slug: string): { frontmatter: PostFrontmatter; Component: ComponentType<any> } | null {
  const entry = Object.entries(modules).find(([path]) => slugFromPath(path) === slug)
  if (!entry) return null
  const [, mod] = entry
  return { frontmatter: mod.frontmatter, Component: mod.default }
}
