import { describe, expect, test } from 'vitest'
import {
  getAdjacentPosts,
  getAllPosts,
  getAllTags,
  getPostBySlug,
  getPostComponentBySlug,
  getRssXml,
  getSitemapXml,
} from '@/lib/blog'

describe('getPostBySlug', () => {
  test('returns only serializable blog post data', () => {
    const post = getPostBySlug('hello-world')

    expect(post).toBeTruthy()
    expect(post).toMatchObject({
      slug: 'hello-world',
      frontmatter: {
        title: expect.any(String),
        date: expect.any(String),
        excerpt: expect.any(String),
        tags: expect.any(Array),
        published: true,
      },
    })
    expect(post).not.toHaveProperty('Component')
    expect(Object.values(post ?? {}).some((value) => typeof value === 'function')).toBe(false)
  })

  test('includes reading time', () => {
    const post = getPostBySlug('hello-world')

    expect(post?.readingTime).toEqual(expect.any(Number))
    expect(post?.readingTime).toBeGreaterThanOrEqual(1)
  })
})

describe('getPostComponentBySlug', () => {
  test('returns the mdx component separately from loader data', () => {
    expect(getPostComponentBySlug('hello-world')).toEqual(expect.any(Function))
  })
})

describe('getAllTags', () => {
  test('returns unique tags alphabetically', () => {
    expect(getAllTags()).toEqual(expect.arrayContaining(['ai', 'engineering', 'meta', 'tooling']))
    expect(getAllTags()).toEqual([...getAllTags()].sort((a, b) => a.localeCompare(b)))
  })
})

describe('getAdjacentPosts', () => {
  test('returns older and newer neighbors based on published date order', () => {
    const adjacent = getAdjacentPosts('hello-world')

    expect(adjacent.previous).toBeNull()
    expect(adjacent.next).toMatchObject({
      slug: 'superpowers-plugin',
      frontmatter: { title: expect.any(String) },
    })
  })

  test('returns null neighbors for an unknown slug', () => {
    expect(getAdjacentPosts('missing-post')).toEqual({ previous: null, next: null })
  })
})

describe('getRssXml', () => {
  test('renders an rss feed with published posts', () => {
    const xml = getRssXml()
    const posts = getAllPosts()

    expect(xml).toContain('<rss version="2.0"')
    expect(xml).toContain('<channel>')
    for (const post of posts) {
      expect(xml).toContain(`<guid>https://lemasani.com/blog/${post.slug}</guid>`)
      expect(xml).toContain(`<title>${post.frontmatter.title}</title>`)
    }
  })
})

describe('getSitemapXml', () => {
  test('renders static pages and blog posts', () => {
    const xml = getSitemapXml()

    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(xml).toContain('<loc>https://lemasani.com/</loc>')
    expect(xml).toContain('<loc>https://lemasani.com/blog/</loc>')
    expect(xml).toContain('<loc>https://lemasani.com/blog/hello-world</loc>')
    expect(xml).toContain('<lastmod>2025-04-20</lastmod>')
  })
})
