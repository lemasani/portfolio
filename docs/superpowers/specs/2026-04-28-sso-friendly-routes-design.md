# SSO-Friendly Routes — Per-Page Meta & Open Graph

**Date:** 2026-04-28
**Status:** Approved

## Goal

Every route on `lemasani.com` should expose correct `<title>`, `<meta description>`, Open Graph, and Twitter Card tags so pages render correctly when shared through SSO portals, link previews, and social platforms.

## Scope

Three routes:
- `/` — home / portfolio
- `/blog/` — blog index
- `/blog/$slug` — individual blog post

## Architecture

### `src/lib/seo.ts` — shared utility

A single exported function:

```ts
seoHead(options: {
  title?: string
  description?: string
  path: string
  type?: 'website' | 'article'
}): { meta: MetaDescriptor[]; links: LinkDescriptor[] }
```

**Defaults:**
- `title` → `"Brian Lemasani"`
- `description` → `"Software engineer. Portfolio of projects, writing, and skills."`
- `type` → `"website"`

**Tags produced:**
- `<title>` and `og:title`
- `<meta name="description">` and `og:description`
- `og:url` = `https://lemasani.com{path}`
- `og:image` = `https://lemasani.com/og-image.png` (placeholder — replace with real asset)
- `og:type` = `"website"` or `"article"`
- `twitter:card` = `"summary_large_image"`
- `twitter:title` and `twitter:description`
- `<link rel="canonical" href="https://lemasani.com{path}">`

### Route changes

**`__root.tsx`** — remove the bare `title: 'Brian Lemasani'` from the root `head()` so per-route titles are not overridden.

**`src/routes/index.tsx`** — add `head()` calling `seoHead({ path: '/' })` (uses all defaults).

**`src/routes/blog/index.tsx`** — add `head()` calling:
```ts
seoHead({
  title: 'Blog',
  description: 'Notes on engineering, design, and process.',
  path: '/blog/',
})
```

**`src/routes/blog/$slug.tsx`** — add `head()` with access to loader data:
```ts
head: ({ loaderData }) => seoHead({
  title: loaderData?.frontmatter.title,
  description: loaderData?.frontmatter.excerpt,
  path: `/blog/${params.slug}`,
  type: 'article',
})
```

## Edge Cases

- If `loaderData` is undefined in the slug `head()`, `seoHead` falls back to defaults — no crash.
- `og:type` is `"article"` only for blog posts; all other routes use `"website"`.
- `routeTree.gen.ts` is auto-generated and never edited manually.
- No new dependencies — TanStack Router's native `head()` API handles everything.

## Out of Scope

- Dynamic OG image generation per post
- Authentication / Cloudflare Access
- Twitter/X account meta (`twitter:site`, `twitter:creator`) — add once handles are confirmed
