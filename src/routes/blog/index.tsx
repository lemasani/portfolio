import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import BlogLayout from '@/components/BlogLayout'
import { getAllPosts } from '@/lib/blog'

export const Route = createFileRoute('/blog/')({
  loader: () => getAllPosts(),
  component: BlogIndex,
})

function BlogIndex() {
  const posts = Route.useLoaderData()

  return (
    <BlogLayout showBack={false}>
      <div className="mb-12">
        <p className="mb-3 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs tracking-[0.32em] text-white/70 uppercase backdrop-blur inline-block">
          Writing
        </p>
        <h1 className="font-mono text-3xl font-bold text-white sm:text-4xl">Blog</h1>
        <p className="mt-3 text-sm text-white/50">Notes on engineering, design, and process.</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-white/40">No posts yet. Check back soon.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
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
                  <time className="shrink-0 text-xs text-white/35">
                    {format(new Date(post.frontmatter.date), 'MMM d, yyyy')}
                  </time>
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
