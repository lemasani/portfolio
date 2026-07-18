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
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          themeVariables: {
            background: 'transparent',
            primaryColor: 'rgba(39,208,171,0.08)',
            primaryBorderColor: '#27d0ab',
            primaryTextColor: '#e6fff8',
            secondaryColor: 'rgba(255,255,255,0.04)',
            secondaryBorderColor: 'rgba(255,255,255,0.18)',
            tertiaryColor: 'rgba(255,255,255,0.02)',
            tertiaryBorderColor: 'rgba(255,255,255,0.12)',
            lineColor: '#27d0ab',
            textColor: 'rgba(255,255,255,0.75)',
            fontSize: '15px',
            clusterBkg: 'rgba(255,255,255,0.02)',
            clusterBorder: 'rgba(255,255,255,0.12)',
            noteBkgColor: 'rgba(0,139,107,0.15)',
            noteBorderColor: 'rgba(39,208,171,0.4)',
            noteTextColor: '#a9ffea',
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
      <pre className="mb-6 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-5 text-xs text-white/50">
        {chart.trim()}
      </pre>
    )
  }

  return (
    <div
      className={cn(
        'mermaid-diagram mb-6 flex min-h-[80px] w-full justify-center overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-4 sm:p-6',
        className,
      )}
      aria-label="Diagram"
      role="img"
    >
      {svg ? (
        <div className="w-full min-w-0 [&_svg]:!w-full [&_svg]:!max-w-full [&_svg]:h-auto" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <span className="self-center font-mono text-xs text-white/30">Rendering diagram…</span>
      )}
    </div>
  )
}
