import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { MDXProvider } from '@mdx-js/react'
import { format } from 'date-fns'
import { ArrowLeft, ArrowRight, Clock, Link2, Linkedin, Mail, Share2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import BlogLayout from '@/components/BlogLayout'
import { MdxComponents } from '@/components/mdx/MdxComponents'
import { getAdjacentPosts, getPostBySlug, getPostComponentBySlug, slugifyHeading } from '@/lib/blog'
import { seoHead } from '@/lib/seo'
import type { TocHeading } from '@/types'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) throw notFound()
    return {
      post,
      adjacent: getAdjacentPosts(params.slug),
    }
  },
  head: ({ params }) => {
    const post = getPostBySlug(params.slug)

    return seoHead({
      title: `${post?.frontmatter.title ?? 'Blog'} | Brian Lemasani`,
      description: post?.frontmatter.excerpt,
      path: `/blog/${params.slug}`,
      type: 'article',
    })
  },
  component: BlogPost,
})

function BlogPost() {
  const {
    post,
    adjacent: { previous, next },
  } = Route.useLoaderData()
  const [toc, setToc] = useState<TocHeading[]>([])
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(`https://lemasani.com/blog/${post.slug}`)
  const Component = getPostComponentBySlug(post.slug)
  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(post.frontmatter.title)

  const shareLinks = useMemo(
    () => ({
      x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    }),
    [encodedTitle, encodedUrl],
  )

  useEffect(() => {
    setCurrentUrl(window.location.href)

    const headings = Array.from(document.querySelectorAll<HTMLElement>('article .prose h2, article .prose h3'))
    const nextToc = headings.map((heading) => {
      if (!heading.id) {
        heading.id = slugifyHeading(heading.textContent ?? '')
      }

      return {
        id: heading.id,
        text: heading.textContent ?? '',
        level: heading.tagName === 'H3' ? 3 : 2,
      } satisfies TocHeading
    })

    setToc(nextToc.filter((heading) => heading.id && heading.text))
  }, [post.slug])

  async function copyCurrentUrl() {
    if (!navigator.clipboard) return

    await navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  if (!Component) throw notFound()

  return (
    <BlogLayout>
      <article className="mx-auto max-w-5xl">
        <header className="mb-10 max-w-3xl">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#27d0ab]/25 bg-[#008b6b]/10 px-2 py-0.5 text-[10px] text-[#a9ffea]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-mono text-3xl font-bold leading-tight text-white sm:text-4xl">
            {post.frontmatter.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/40">
            <time>{format(new Date(post.frontmatter.date), 'MMMM d, yyyy')}</time>
            <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} />
              {post.readingTime} min read
            </span>
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="min-w-0">
            <MDXProvider components={MdxComponents}>
              <div className="prose">
                <Component />
              </div>
            </MDXProvider>

            <section className="mt-10 lg:hidden" aria-label="Share this post">
              <p className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                <Share2 size={13} />
                Share
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={shareLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-white/10 px-4 text-xs text-white/45 transition hover:text-white"
                >
                  X
                </a>
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-white/10 px-3 text-white/45 transition hover:text-white"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href={shareLinks.email}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-white/10 px-3 text-white/45 transition hover:text-white"
                  aria-label="Share by email"
                >
                  <Mail size={14} />
                </a>
                <button
                  type="button"
                  onClick={copyCurrentUrl}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-white/10 px-3 text-white/45 transition hover:text-white"
                  aria-label={copied ? 'Link copied' : 'Copy post link'}
                >
                  <Link2 size={14} />
                </button>
              </div>
              {copied && <p className="mt-2 text-xs text-[#a9ffea]">Link copied</p>}
            </section>

            <footer className="mt-14 space-y-8 border-t border-white/10 pt-8">
              <section className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="font-mono text-sm font-semibold text-white">Brian Lemasani</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Software engineer writing about engineering, design, tools, and the decisions behind shipped work.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  <a
                    href="https://github.com/lemasani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#27d0ab] transition hover:text-[#a9ffea]"
                  >
                    GitHub
                  </a>
                  <a
                    href="mailto:hello@lemasani.com"
                    className="text-[#27d0ab] transition hover:text-[#a9ffea]"
                  >
                    Email
                  </a>
                </div>
              </section>

              <nav className="grid gap-3 sm:grid-cols-2" aria-label="Post navigation">
                {previous ? (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: previous.slug }}
                    preload="intent"
                    className="group rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-[#27d0ab]/35"
                  >
                    <span className="mb-2 flex items-center gap-1 text-xs text-white/35">
                      <ArrowLeft size={13} />
                      Previous post
                    </span>
                    <span className="text-sm font-medium text-white/75 transition group-hover:text-[#a9ffea]">
                      {previous.frontmatter.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {next && (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: next.slug }}
                    preload="intent"
                    className="group rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-[#27d0ab]/35 sm:text-right"
                  >
                    <span className="mb-2 flex items-center gap-1 text-xs text-white/35 sm:justify-end">
                      Next post
                      <ArrowRight size={13} />
                    </span>
                    <span className="text-sm font-medium text-white/75 transition group-hover:text-[#a9ffea]">
                      {next.frontmatter.title}
                    </span>
                  </Link>
                )}
              </nav>
            </footer>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {toc.length > 0 && (
                <nav aria-label="Table of contents">
                  <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                    Contents
                  </p>
                  <ol className="space-y-2">
                    {toc.map((heading) => (
                      <li key={heading.id} className={heading.level === 3 ? 'pl-4' : undefined}>
                        <a
                          href={`#${heading.id}`}
                          className="block text-xs leading-relaxed text-white/40 transition hover:text-[#a9ffea]"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div aria-label="Share this post">
                <p className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                  <Share2 size={13} />
                  Share
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={shareLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-white/10 text-xs text-white/45 transition hover:text-white"
                  >
                    X
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-white/10 text-white/45 transition hover:text-white"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={14} />
                  </a>
                  <a
                    href={shareLinks.email}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-white/10 text-white/45 transition hover:text-white"
                    aria-label="Share by email"
                  >
                    <Mail size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={copyCurrentUrl}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-white/10 text-white/45 transition hover:text-white"
                    aria-label={copied ? 'Link copied' : 'Copy post link'}
                  >
                    <Link2 size={14} />
                  </button>
                </div>
                {copied && <p className="mt-2 text-xs text-[#a9ffea]">Link copied</p>}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </BlogLayout>
  )
}
