import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ArrowRight, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import BlogLayout from '@/components/BlogLayout'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { seoHead } from '@/lib/seo'

export const Route = createFileRoute('/blog/')({
  loader: () => ({
    posts: getAllPosts(),
    tags: getAllTags(),
  }),
  head: () =>
    seoHead({
      title: 'Blog | Brian Lemasani',
      description: 'Notes on engineering, design, and process.',
      path: '/blog/',
    }),
  component: BlogIndex,
})

function BlogIndex() {
  const { posts, tags } = Route.useLoaderData()
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesTag = activeTag ? post.frontmatter.tags.includes(activeTag) : true
      const matchesQuery = normalizedQuery
        ? [post.frontmatter.title, post.frontmatter.excerpt, ...post.frontmatter.tags]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery)
        : true

      return matchesTag && matchesQuery
    })
  }, [activeTag, posts, query])

  const hasFilters = query.trim().length > 0 || activeTag !== null

  return (
    <BlogLayout showBack={false}>
      <div className="mb-12">
        <p className="mb-3 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs tracking-[0.32em] text-white/70 uppercase backdrop-blur inline-block">
          Writing
        </p>
        <h1 className="font-mono text-3xl font-bold text-white sm:text-4xl">Blog</h1>
        <p className="mt-3 text-sm text-white/50">Notes on engineering, design, and process.</p>
      </div>

      {posts.length > 0 && (
        <section className="mb-8 space-y-4" aria-label="Filter posts">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              size={16}
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search posts"
              aria-label="Search posts"
              className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#27d0ab]/60 focus:bg-white/8"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const isActive = activeTag === tag

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(isActive ? null : tag)}
                  className={
                    isActive
                      ? 'rounded-full border border-[#27d0ab]/50 bg-[#008b6b]/20 px-3 py-1 text-xs text-[#a9ffea] transition'
                      : 'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/45 transition hover:border-white/25 hover:text-white/70'
                  }
                  aria-pressed={isActive}
                >
                  {tag}
                </button>
              )
            })}
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setActiveTag(null)
                }}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs text-white/40 transition hover:text-white/70"
              >
                <X size={12} />
                Clear
              </button>
            )}
          </div>
        </section>
      )}

      {posts.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-medium text-white/70">No posts yet.</p>
          <p className="mt-2 text-sm leading-relaxed text-white/40">
            I publish notes here when an idea has earned a little permanence.
          </p>
          <a
            href="https://github.com/lemasani"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-xs text-[#27d0ab] transition hover:text-[#a9ffea]"
          >
            View GitHub <ArrowRight size={13} />
          </a>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-medium text-white/70">No matching posts.</p>
          <p className="mt-2 text-sm text-white/40">Try a different search or clear the active tag.</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {filteredPosts.map((post) => (
            <li key={post.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-[#27d0ab]/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h2 className="font-mono text-base font-semibold text-white group-hover:text-[#27d0ab] transition">
                    {post.frontmatter.title}
                  </h2>
                  <div className="shrink-0 text-right text-xs text-white/35">
                    <time>{format(new Date(post.frontmatter.date), 'MMM d, yyyy')}</time>
                    <span className="mx-2 text-white/20">/</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/55">
                  {post.frontmatter.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-[#27d0ab] opacity-0 transition group-hover:opacity-100">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </BlogLayout>
  )
}
