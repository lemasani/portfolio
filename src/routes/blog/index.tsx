import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ArrowRight, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import BlogLayout from '@/components/BlogLayout'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { seoHead } from '@/lib/seo'
import { cn } from '@/lib/utils'

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

const bands = ['bg-orange', 'bg-blue', 'bg-green'] as const

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
      <header className="grid gap-6 border-b-[3px] border-ink pb-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <h1 className="type-display text-[clamp(2.8rem,6vw,5rem)]">Reading room</h1>
          <p className="mt-4 max-w-[44ch] text-[1.125rem] leading-relaxed">
            Notes on engineering, design, and process. Each one is a guide to something I built or figured out.
          </p>
        </div>
        <p className="type-label text-[1rem] text-ink-soft lg:text-right">
          {posts.length} {posts.length === 1 ? 'guide' : 'guides'} on the rack
        </p>
      </header>

      {posts.length > 0 && (
        <section className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center" aria-label="Filter guides">
          <div className="relative lg:w-[380px]">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink"
              size={18}
              strokeWidth={2.5}
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the guides"
              aria-label="Search the guides"
              className="h-12 w-full rounded-md border-2 border-ink bg-placard pl-11 pr-4 text-[1rem] text-ink outline-none placeholder:text-ink-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue"
            />
          </div>

          <div className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {tags.map((tag) => {
              const isActive = activeTag === tag
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(isActive ? null : tag)}
                  className={cn(
                    'type-label h-9 shrink-0 rounded-sm border-2 border-ink px-3 text-[0.85rem] transition-colors',
                    isActive ? 'bg-ink text-placard' : 'bg-transparent text-ink hover:bg-placard',
                  )}
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
                className="type-label inline-flex h-9 shrink-0 items-center gap-1.5 rounded-sm px-3 text-[0.85rem] text-ink underline"
              >
                <X size={14} strokeWidth={2.5} aria-hidden />
                Clear filters
              </button>
            )}
          </div>
        </section>
      )}

      {posts.length === 0 ? (
        <div className="placard mt-10 p-8">
          <p className="type-display text-[1.4rem]">The rack is empty for now.</p>
          <p className="mt-2 max-w-[50ch] text-[1rem] leading-relaxed text-ink-soft">
            I publish notes here when an idea has earned a little permanence.
          </p>
          <a
            href="https://github.com/lemasani"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-blue underline"
          >
            See what I'm building on GitHub <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
          </a>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="placard mt-10 p-8">
          <p className="type-display text-[1.4rem]">No guides match that.</p>
          <p className="mt-2 text-[1rem] text-ink-soft">Try a different search, or clear the active tag.</p>
        </div>
      ) : (
        <ol className="mt-10">
          {filteredPosts.map((post) => {
            const bandIndex = posts.findIndex((p) => p.slug === post.slug)
            return (
              <li key={post.slug} className="border-t-[3px] border-ink last:border-b-[3px]">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group grid gap-3 py-7 text-ink no-underline transition-colors hover:bg-placard sm:grid-cols-[10rem_1fr_auto] sm:items-start sm:gap-8 sm:px-4"
                >
                  <span className="type-label flex items-center gap-2.5 text-[0.95rem] sm:pt-2">
                    <span className={cn('size-3.5 rounded-[2px]', bands[bandIndex % bands.length])} aria-hidden />
                    <time dateTime={post.frontmatter.date}>{format(new Date(post.frontmatter.date), 'MMM d, yyyy')}</time>
                  </span>
                  <span className="min-w-0">
                    <span className="type-display block text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[1.1] decoration-orange decoration-[3px] underline-offset-[5px] group-hover:underline">
                      {post.frontmatter.title}
                    </span>
                    <span className="mt-2.5 block max-w-[68ch] text-[1rem] leading-relaxed text-ink-soft">
                      {post.frontmatter.excerpt}
                    </span>
                    <span className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                      {post.frontmatter.tags.map((tag) => (
                        <span key={tag} className="type-label text-[0.8rem] text-ink-soft">
                          #{tag}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="type-label flex items-center gap-2 text-[0.95rem] sm:pt-2">
                    {post.readingTime} min read
                    <ArrowRight
                      size={18}
                      strokeWidth={2.5}
                      aria-hidden
                      className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5"
                    />
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      )}
    </BlogLayout>
  )
}
