import { createFileRoute } from '@tanstack/react-router'
import { getRssXml } from '@/lib/blog'

export const Route = createFileRoute('/blog/rss.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(getRssXml(), {
          headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        }),
    },
  },
})
