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

  const shareButtonClass =
    'inline-flex h-10 items-center justify-center rounded-sm border-2 border-ink px-3 text-ink transition-colors hover:bg-ink hover:text-placard'

  return (
    <BlogLayout>
      <article>
        <header className="placard overflow-hidden">
          <span className="block h-4 bg-orange" aria-hidden />
          <div className="p-6 sm:p-10">
            <h1 className="type-display max-w-[24ch] text-[clamp(1.8rem,4.6vw,3.75rem)]">
              {post.frontmatter.title}
            </h1>
            {post.frontmatter.excerpt && (
              <p className="mt-5 max-w-[60ch] text-[1.125rem] leading-relaxed text-ink-soft">{post.frontmatter.excerpt}</p>
            )}
            <p className="type-label mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t-[3px] border-ink pt-4 text-[0.95rem]">
              <time dateTime={post.frontmatter.date}>{format(new Date(post.frontmatter.date), 'MMMM d, yyyy')}</time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} strokeWidth={2.5} aria-hidden />
                {post.readingTime} min read
              </span>
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1" aria-label="Tags">
              {post.frontmatter.tags.map((tag) => (
                <li key={tag} className="type-label text-[0.85rem]">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
          <div className="min-w-0">
            <MDXProvider components={MdxComponents}>
              <div className="prose">
                <Component />
              </div>
            </MDXProvider>

            <section className="mt-12 lg:hidden" aria-label="Share this post">
              <p className="type-label mb-3 flex items-center gap-2 text-[0.9rem]">
                <Share2 size={15} strokeWidth={2.5} aria-hidden />
                Share
              </p>
              <div className="flex flex-wrap gap-2">
                <a href={shareLinks.x} target="_blank" rel="noopener noreferrer" className={`${shareButtonClass} type-label px-4 text-[0.9rem]`}>
                  X
                </a>
                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className={shareButtonClass} aria-label="Share on LinkedIn">
                  <Linkedin size={16} strokeWidth={2.25} />
                </a>
                <a href={shareLinks.email} className={shareButtonClass} aria-label="Share by email">
                  <Mail size={16} strokeWidth={2.25} />
                </a>
                <button type="button" onClick={copyCurrentUrl} className={shareButtonClass} aria-label={copied ? 'Link copied' : 'Copy post link'}>
                  <Link2 size={16} strokeWidth={2.25} />
                </button>
              </div>
              {copied && <p className="mt-2 text-[0.95rem] font-semibold" aria-live="polite">Link copied</p>}
            </section>

            <footer className="mt-16 space-y-8">
              <section className="placard p-6">
                <p className="type-display text-[1.25rem]">Brian Lemasani</p>
                <p className="mt-2 max-w-[56ch] text-[1rem] leading-relaxed text-ink-soft">
                  Software engineer writing about engineering, design, tools, and the decisions behind shipped work.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-semibold">
                  <a href="https://github.com/lemasani" target="_blank" rel="noopener noreferrer" className="text-blue underline">
                    GitHub
                  </a>
                  <a href="mailto:hello@lemasani.com" className="text-blue underline">
                    Email
                  </a>
                  <Link to="/" className="text-blue underline">
                    Walk the hall
                  </Link>
                </div>
              </section>

              <nav className="grid gap-3 sm:grid-cols-2" aria-label="Post navigation">
                {previous ? (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: previous.slug }}
                    preload="intent"
                    className="group flex flex-col gap-2 rounded-md bg-ink p-5 text-placard no-underline transition-colors hover:bg-blue"
                  >
                    <span className="type-label flex items-center gap-1.5 text-[0.85rem] text-placard/80">
                      <ArrowLeft size={15} strokeWidth={2.5} aria-hidden />
                      Previous guide
                    </span>
                    <span className="text-[1.05rem] font-bold leading-snug">{previous.frontmatter.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {next && (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: next.slug }}
                    preload="intent"
                    className="group flex flex-col gap-2 rounded-md bg-ink p-5 text-placard no-underline transition-colors hover:bg-blue sm:items-end sm:text-right"
                  >
                    <span className="type-label flex items-center gap-1.5 text-[0.85rem] text-placard/80">
                      Next guide
                      <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
                    </span>
                    <span className="text-[1.05rem] font-bold leading-snug">{next.frontmatter.title}</span>
                  </Link>
                )}
              </nav>
            </footer>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-10">
              {toc.length > 0 && (
                <nav aria-label="Table of contents">
                  <p className="type-label border-b-[3px] border-ink pb-2 text-[0.9rem]">In this guide</p>
                  <ol className="mt-3 space-y-2.5">
                    {toc.map((heading) => (
                      <li key={heading.id} className={heading.level === 3 ? 'pl-4' : undefined}>
                        <a
                          href={`#${heading.id}`}
                          className="block text-[0.92rem] leading-snug text-ink-soft no-underline hover:text-ink hover:underline"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div aria-label="Share this post">
                <p className="type-label mb-3 flex items-center gap-2 border-b-[3px] border-ink pb-2 text-[0.9rem]">
                  <Share2 size={15} strokeWidth={2.5} aria-hidden />
                  Share
                </p>
                <div className="grid grid-cols-4 gap-2">
                  <a href={shareLinks.x} target="_blank" rel="noopener noreferrer" className={`${shareButtonClass} type-label px-0 text-[0.9rem]`}>
                    X
                  </a>
                  <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className={`${shareButtonClass} px-0`} aria-label="Share on LinkedIn">
                    <Linkedin size={16} strokeWidth={2.25} />
                  </a>
                  <a href={shareLinks.email} className={`${shareButtonClass} px-0`} aria-label="Share by email">
                    <Mail size={16} strokeWidth={2.25} />
                  </a>
                  <button type="button" onClick={copyCurrentUrl} className={`${shareButtonClass} px-0`} aria-label={copied ? 'Link copied' : 'Copy post link'}>
                    <Link2 size={16} strokeWidth={2.25} />
                  </button>
                </div>
                {copied && <p className="mt-2 text-[0.95rem] font-semibold" aria-live="polite">Link copied</p>}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </BlogLayout>
  )
}
