import { useEffect, useId, useState } from 'react'
import { cn } from '@/lib/utils'

interface MermaidProps {
  chart: string
  className?: string
}

/**
 * Renders a mermaid diagram from its source. Mermaid is browser-only, so the
 * library is dynamically imported inside an effect — nothing runs during SSR,
 * and the ~1MB bundle only loads on pages that actually contain a diagram.
 */
export function Mermaid({ chart, className }: MermaidProps) {
  const rawId = useId()
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`
  const [svg, setSvg] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true

    import('mermaid')
      .then(async ({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'strict',
          fontFamily: "'Archivo Variable', ui-sans-serif, sans-serif",
          themeVariables: {
            background: 'transparent',
            primaryColor: '#ffffff',
            primaryBorderColor: '#16181d',
            primaryTextColor: '#16181d',
            secondaryColor: '#e7e9ee',
            secondaryBorderColor: '#16181d',
            tertiaryColor: '#f1f2f5',
            tertiaryBorderColor: '#16181d',
            lineColor: '#16181d',
            textColor: '#16181d',
            fontSize: '16px',
            clusterBkg: '#f1f2f5',
            clusterBorder: '#16181d',
            noteBkgColor: '#fde68a',
            noteBorderColor: '#16181d',
            noteTextColor: '#16181d',
          },
        })

        const { svg: rendered } = await mermaid.render(id, chart.trim())
        // Mermaid caps each SVG at its natural pixel width, so narrow diagrams
        // render small. Drop that cap so every diagram scales up to fill the column.
        const filled = rendered.replace(/max-width:\s*[\d.]+px/gi, 'max-width: 100%')
        if (active) setSvg(filled)
      })
      .catch(() => {
        if (active) setFailed(true)
      })

    return () => {
      active = false
    }
  }, [chart, id])

  if (failed) {
    return (
      <pre className="mb-6 overflow-x-auto rounded-md border-2 border-ink bg-placard p-5 text-[0.85rem] text-ink">
        {chart.trim()}
      </pre>
    )
  }

  return (
    <div
      className={cn(
        'mermaid-diagram mb-6 flex min-h-[80px] w-full justify-center overflow-x-auto rounded-md border-2 border-ink bg-placard p-4 sm:p-6',
        className,
      )}
      aria-label="Diagram"
      role="img"
    >
      {svg ? (
        <div className="w-full min-w-0 [&_svg]:!w-full [&_svg]:!max-w-full [&_svg]:h-auto" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <span className="type-label self-center text-[0.85rem] text-ink-soft">Drawing the diagram…</span>
      )}
    </div>
  )
}
