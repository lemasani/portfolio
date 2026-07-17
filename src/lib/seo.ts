import type { DetailedHTMLProps, LinkHTMLAttributes, MetaHTMLAttributes } from 'react'

const SITE_URL = 'https://lemasani.com'
const DEFAULT_TITLE = 'Brian Lemasani'
const DEFAULT_DESCRIPTION = 'Software engineer. Portfolio of projects, writing, and skills.'
const OG_IMAGE = `${SITE_URL}/og-image.png`

interface SeoOptions {
  title?: string
  description?: string
  path: string
  type?: 'website' | 'article'
}

type HeadMeta = DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>
type HeadLink = DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>

export function seoHead({ title, description, path, type = 'website' }: SeoOptions): {
  meta: HeadMeta[]
  links: HeadLink[]
} {
  const resolvedTitle = title ?? DEFAULT_TITLE
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION
  const url = `${SITE_URL}${path}`

  return {
    meta: [
      { title: resolvedTitle },
      { name: 'description', content: resolvedDescription },
      { property: 'og:title', content: resolvedTitle },
      { property: 'og:description', content: resolvedDescription },
      { property: 'og:url', content: url },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:type', content: type },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: resolvedTitle },
      { name: 'twitter:description', content: resolvedDescription },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
