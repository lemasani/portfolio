import { describe, expect, test } from 'vitest'
import { getPostBySlug, getPostComponentBySlug } from '@/lib/blog'

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
})

describe('getPostComponentBySlug', () => {
  test('returns the mdx component separately from loader data', () => {
    expect(getPostComponentBySlug('hello-world')).toEqual(expect.any(Function))
  })
})
