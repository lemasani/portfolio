import { describe, expect, test } from 'vitest'
import { seoHead } from '@/lib/seo'

describe('seoHead', () => {
  test('uses provided title and description', () => {
    const result = seoHead({ title: 'Blog', description: 'My blog', path: '/blog/' })
    const meta = result.meta
    expect(meta).toContainEqual({ title: 'Blog' })
    expect(meta).toContainEqual({ name: 'description', content: 'My blog' })
    expect(meta).toContainEqual({ property: 'og:title', content: 'Blog' })
    expect(meta).toContainEqual({ property: 'og:description', content: 'My blog' })
  })

  test('falls back to defaults when title and description are omitted', () => {
    const result = seoHead({ path: '/' })
    const meta = result.meta
    expect(meta).toContainEqual({ title: 'Brian Lemasani' })
    expect(meta).toContainEqual({
      name: 'description',
      content: 'Software engineer. Portfolio of projects, writing, and skills.',
    })
  })

  test('falls back to defaults when title and description are undefined', () => {
    const result = seoHead({ title: undefined, description: undefined, path: '/' })
    const meta = result.meta
    expect(meta).toContainEqual({ title: 'Brian Lemasani' })
  })

  test('sets og:url and canonical link from path', () => {
    const result = seoHead({ path: '/blog/my-post' })
    expect(result.meta).toContainEqual({
      property: 'og:url',
      content: 'https://lemasani.com/blog/my-post',
    })
    expect(result.links).toContainEqual({
      rel: 'canonical',
      href: 'https://lemasani.com/blog/my-post',
    })
  })

  test('sets og:image to static placeholder', () => {
    const result = seoHead({ path: '/' })
    expect(result.meta).toContainEqual({
      property: 'og:image',
      content: 'https://lemasani.com/og-image.png',
    })
  })

  test('defaults og:type to website', () => {
    const result = seoHead({ path: '/' })
    expect(result.meta).toContainEqual({ property: 'og:type', content: 'website' })
  })

  test('sets og:type to article when specified', () => {
    const result = seoHead({ path: '/blog/foo', type: 'article' })
    expect(result.meta).toContainEqual({ property: 'og:type', content: 'article' })
  })

  test('sets twitter card tags', () => {
    const result = seoHead({ title: 'Post', description: 'Desc', path: '/blog/foo' })
    const meta = result.meta
    expect(meta).toContainEqual({ name: 'twitter:card', content: 'summary_large_image' })
    expect(meta).toContainEqual({ name: 'twitter:title', content: 'Post' })
    expect(meta).toContainEqual({ name: 'twitter:description', content: 'Desc' })
  })
})
