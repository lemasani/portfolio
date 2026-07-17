import type { ComponentType } from 'react'
import type { Post, PostDetails, PostFrontmatter } from '@/types'

interface MdxModule {
  default: ComponentType<any>
  frontmatter: PostFrontmatter
}

const modules = import.meta.glob<MdxModule>('/src/content/blog/*.mdx', { eager: true })

const SITE_URL = 'https://lemasani.com'

interface SitemapEntry {
  loc: string
  lastmod?: string
}

function slugFromPath(path: string): string {
  return path.replace(/^.*\/(.+)\.mdx(?:\?.*)?$/, '$1')
}

function getPostModuleBySlug(slug: string): MdxModule | null {
  const entry = Object.entries(modules).find(([path]) => slugFromPath(path) === slug)
  if (!entry) return null
  return entry[1]
}

function readingTime(text: string): number {
  const words = text
    .replace(/^---[\s\S]*?---/, '')
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  return Math.max(1, Math.ceil(words.length / 200))
}

export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toPost(path: string, mod: MdxModule): Post {
  const slug = slugFromPath(path)

  return {
    slug,
    frontmatter: mod.frontmatter,
    readingTime: readingTime(String(mod.default)),
  }
}

export function getAllPosts(): Post[] {
  return Object.entries(modules)
    .filter(([, mod]) => mod.frontmatter?.published)
    .map(([path, mod]) => toPost(path, mod))
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

export function getAllTags(): string[] {
  return Array.from(new Set(getAllPosts().flatMap((post) => post.frontmatter.tags))).sort((a, b) =>
    a.localeCompare(b),
  )
}

export function getPostBySlug(slug: string): PostDetails | null {
  const mod = getPostModuleBySlug(slug)
  if (!mod) return null

  return {
    slug,
    frontmatter: mod.frontmatter,
    readingTime: readingTime(String(mod.default)),
    toc: [],
  }
}

export function getPostComponentBySlug(slug: string): ComponentType<any> | null {
  return getPostModuleBySlug(slug)?.default ?? null
}

export function getAdjacentPosts(slug: string): { previous: Post | null; next: Post | null } {
  const posts = getAllPosts()
  const index = posts.findIndex((post) => post.slug === slug)

  if (index === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function getRssXml(): string {
  const items = getAllPosts()
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`

      return [
        '<item>',
        `<title>${escapeXml(post.frontmatter.title)}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<description>${escapeXml(post.frontmatter.excerpt)}</description>`,
        `<pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>`,
        post.frontmatter.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join(''),
        '</item>',
      ].join('')
    })
    .join('')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    '<title>Brian Lemasani Blog</title>',
    '<link>https://lemasani.com/blog</link>',
    '<description>Notes on engineering, design, and process.</description>',
    '<language>en-us</language>',
    items,
    '</channel>',
    '</rss>',
  ].join('')
}

export function getSitemapXml(): string {
  const urls: SitemapEntry[] = [
    { loc: `${SITE_URL}/` },
    { loc: `${SITE_URL}/blog/` },
    ...getAllPosts().map((post) => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: post.frontmatter.date,
    })),
  ]

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) =>
      [
        '<url>',
        `<loc>${escapeXml(url.loc)}</loc>`,
        url.lastmod ? `<lastmod>${escapeXml(url.lastmod)}</lastmod>` : '',
        '</url>',
      ].join(''),
    ),
    '</urlset>',
  ].join('')
}
