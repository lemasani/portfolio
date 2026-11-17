import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import type { Post } from '@/types'

const bands = ['bg-orange', 'bg-blue', 'bg-green'] as const
const tilts = ['-rotate-[1.5deg]', 'rotate-[1deg]', '-rotate-[0.5deg]'] as const

/** The latest exhibit guides, standing in the literature rack. */
export default function ReadingRack({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null

  return (
    <section id="writing" aria-labelledby="writing-title" className="scroll-mt-20 bg-wall-deep py-20 sm:py-28">
      <div className="mx-auto max-w-[var(--hall-max)] px-[var(--gutter)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="writing-title" className="type-display text-[clamp(2.4rem,4.6vw,4rem)]">
              Reading room
            </h2>
            <p className="mt-3 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink-soft">
              Notes on engineering, design, and process. Take a guide.
            </p>
          </div>
          <Link
            to="/blog"
            className="type-label inline-flex h-12 items-center gap-2 rounded-md bg-ink px-5 text-[1.05rem] text-placard no-underline transition-colors hover:bg-orange hover:text-ink"
          >
            All guides <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
          </Link>
        </div>

        <div className="mt-12">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal="rack">
            {posts.map((post, i) => (
              <li key={post.slug} className={`transition-transform duration-300 ease-[var(--ease-out-expo)] hover:rotate-0 hover:-translate-y-2 ${tilts[i % tilts.length]}`}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="placard group flex h-full min-h-[300px] flex-col overflow-hidden text-ink no-underline"
                >
                  <span className={`block h-4 ${bands[i % bands.length]}`} aria-hidden />
                  <span className="flex flex-1 flex-col p-5 sm:p-6">
                    <span className="type-display block text-[1.5rem] leading-[1.08] group-hover:underline group-hover:decoration-orange group-hover:decoration-[3px] group-hover:underline-offset-4">
                      {post.frontmatter.title}
                    </span>
                    <span className="mt-3 line-clamp-3 block text-[0.98rem] leading-relaxed text-ink-soft">
                      {post.frontmatter.excerpt}
                    </span>
                    <span className="type-label mt-4 block text-[0.85rem] text-ink-soft">
                      <time dateTime={post.frontmatter.date}>{format(new Date(post.frontmatter.date), 'MMM d, yyyy')}</time>
                      {' · '}
                      {post.readingTime} min read
                    </span>
                    <span className="type-label mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.95rem]">
                      Read the guide <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {/* The rack's plywood shelf */}
          <div className="ply-ledge mt-[-6px]" aria-hidden />
        </div>
      </div>
    </section>
  )
}
