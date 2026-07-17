# SSO-Friendly Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add per-page `<title>`, `<meta description>`, Open Graph, and Twitter Card tags to every route on lemasani.com.

**Architecture:** A single `seoHead()` utility in `src/lib/seo.ts` returns a TanStack Router `{ meta, links }` object. Each route's `head()` function calls it with route-specific values; the blog slug route reads title/excerpt from its already-loaded frontmatter. The root route's hardcoded `<title>` is removed so per-route titles aren't overridden.

**Tech Stack:** TanStack Router `head()` API, TypeScript, Vitest

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/lib/seo.ts` | `seoHead()` utility — builds full meta + links array |
| Create | `src/lib/seo.test.ts` | Unit tests for `seoHead()` |
| Modify | `src/routes/__root.tsx` | Remove hardcoded title from root `head()` |
| Modify | `src/routes/index.tsx` | Add `head()` using `seoHead()` defaults |
| Modify | `src/routes/blog/index.tsx` | Add `head()` with blog title/description |
| Modify | `src/routes/blog/$slug.tsx` | Add `head()` reading from loader frontmatter |

---

### Task 1: Write failing tests for `seoHead()`

**Files:**
- Create: `src/lib/seo.test.ts`

- [ ] **Step 1: Create the test file**

```ts
// src/lib/seo.test.ts
import { describe, expect, test } from 'vitest'
import { seoHead } from '#/lib/seo'

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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm test
```

Expected: All tests in `seo.test.ts` fail with `Cannot find module '#/lib/seo'`.

---

### Task 2: Implement `seoHead()` utility

**Files:**
- Create: `src/lib/seo.ts`

- [ ] **Step 1: Create the utility**

```ts
// src/lib/seo.ts
import type { MetaDescriptor, LinkDescriptor } from '@tanstack/react-router'

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

export function seoHead({ title, description, path, type = 'website' }: SeoOptions): {
  meta: MetaDescriptor[]
  links: LinkDescriptor[]
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
```

- [ ] **Step 2: Run tests to verify they pass**

```bash
pnpm test
```

Expected: All tests in `seo.test.ts` pass.

- [ ] **Step 3: Commit**

```bash
git add src/lib/seo.ts src/lib/seo.test.ts
git commit -m "feat: add seoHead() utility with tests"
```

---

### Task 3: Remove hardcoded title from root route

**Files:**
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Remove the title meta from `__root.tsx`'s `head()`**

In `src/routes/__root.tsx`, the `head()` currently returns:

```ts
head: () => ({
  meta: [
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { title: 'Brian Lemasani' },
  ],
  links: [{ rel: 'stylesheet', href: appCss }],
}),
```

Change it to:

```ts
head: () => ({
  meta: [
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  links: [{ rel: 'stylesheet', href: appCss }],
}),
```

- [ ] **Step 2: Verify tests still pass**

```bash
pnpm test
```

Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/routes/__root.tsx
git commit -m "feat: remove hardcoded title from root route"
```

---

### Task 4: Add `head()` to the home route

**Files:**
- Modify: `src/routes/index.tsx`

- [ ] **Step 1: Add the import and `head()` to the home route**

In `src/routes/index.tsx`, change:

```ts
import { createFileRoute } from '@tanstack/react-router'
```

to:

```ts
import { createFileRoute } from '@tanstack/react-router'
import { seoHead } from '#/lib/seo'
```

And change the route definition from:

```ts
export const Route = createFileRoute('/')({ component: App })
```

to:

```ts
export const Route = createFileRoute('/')({
  head: () => seoHead({ path: '/' }),
  component: App,
})
```

- [ ] **Step 2: Run tests**

```bash
pnpm test
```

Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: add seo head to home route"
```

---

### Task 5: Add `head()` to the blog index route

**Files:**
- Modify: `src/routes/blog/index.tsx`

- [ ] **Step 1: Add the import and `head()` to the blog index route**

In `src/routes/blog/index.tsx`, add the import after the existing imports:

```ts
import { seoHead } from '#/lib/seo'
```

And change the route definition from:

```ts
export const Route = createFileRoute('/blog/')({
  loader: () => getAllPosts(),
  component: BlogIndex,
})
```

to:

```ts
export const Route = createFileRoute('/blog/')({
  head: () =>
    seoHead({
      title: 'Blog',
      description: 'Notes on engineering, design, and process.',
      path: '/blog/',
    }),
  loader: () => getAllPosts(),
  component: BlogIndex,
})
```

- [ ] **Step 2: Run tests**

```bash
pnpm test
```

Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/routes/blog/index.tsx
git commit -m "feat: add seo head to blog index route"
```

---

### Task 6: Add `head()` to the blog post route

**Files:**
- Modify: `src/routes/blog/$slug.tsx`

- [ ] **Step 1: Add the import and `head()` to the blog post route**

In `src/routes/blog/$slug.tsx`, add the import after the existing imports:

```ts
import { seoHead } from '#/lib/seo'
```

And change the route definition from:

```ts
export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) throw notFound()
    return post
  },
  component: BlogPost,
})
```

to:

```ts
export const Route = createFileRoute('/blog/$slug')({
  head: ({ loaderData, params }) =>
    seoHead({
      title: loaderData?.frontmatter.title,
      description: loaderData?.frontmatter.excerpt,
      path: `/blog/${params.slug}`,
      type: 'article',
    }),
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) throw notFound()
    return post
  },
  component: BlogPost,
})
```

- [ ] **Step 2: Run tests**

```bash
pnpm test
```

Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/routes/blog/$slug.tsx
git commit -m "feat: add seo head to blog post route"
```

---

### Task 7: Manual smoke test in dev server

- [ ] **Step 1: Start the dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Check the home page**

Open `http://localhost:3000` in a browser. Open DevTools → Elements. In `<head>`, verify:
- `<title>Brian Lemasani</title>`
- `<meta name="description" content="Software engineer. Portfolio of projects, writing, and skills.">`
- `<meta property="og:title" content="Brian Lemasani">`
- `<meta property="og:url" content="https://lemasani.com/">`
- `<link rel="canonical" href="https://lemasani.com/">`

- [ ] **Step 3: Check the blog index**

Open `http://localhost:3000/blog/`. Verify in `<head>`:
- `<title>Blog</title>`
- `<meta name="description" content="Notes on engineering, design, and process.">`
- `<link rel="canonical" href="https://lemasani.com/blog/">`

- [ ] **Step 4: Check a blog post**

Open any blog post (e.g., `http://localhost:3000/blog/hello-world`). Verify in `<head>`:
- `<title>` matches the post's frontmatter title
- `<meta name="description">` matches the post's excerpt
- `<meta property="og:type" content="article">`
- `<link rel="canonical" href="https://lemasani.com/blog/hello-world">`

- [ ] **Step 5: Final commit if any fixes were needed**

```bash
git add -p
git commit -m "fix: seo smoke test corrections"
```
