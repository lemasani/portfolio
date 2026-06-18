import { createFileRoute } from '@tanstack/react-router'
import { getSitemapXml } from '@/lib/blog'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(getSitemapXml(), {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        }),
    },
  },
})
