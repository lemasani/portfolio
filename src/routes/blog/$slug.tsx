import { createFileRoute, notFound } from '@tanstack/react-router'
import { MDXProvider } from '@mdx-js/react'
import { format } from 'date-fns'
import BlogLayout from '@/components/BlogLayout'
import { MdxComponents } from '@/components/mdx/MdxComponents'
import { getPostBySlug } from '@/lib/blog'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) throw notFound()
    return post
  },
  component: BlogPost,
})

function BlogPost() {
  const { frontmatter, Component } = Route.useLoaderData()

  return (
    <BlogLayout>
      <article className="mx-auto max-w-2xl">
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#27d0ab]/25 bg-[#008b6b]/10 px-2 py-0.5 text-[10px] text-[#a9ffea]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-mono text-3xl font-bold leading-tight text-white sm:text-4xl">
            {frontmatter.title}
          </h1>
          <time className="mt-3 block text-xs text-white/40">
            {format(new Date(frontmatter.date), 'MMMM d, yyyy')}
          </time>
        </header>

        <MDXProvider components={MdxComponents}>
          <div className="prose">
            <Component />
          </div>
        </MDXProvider>
      </article>
    </BlogLayout>
  )
}
