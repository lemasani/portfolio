import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { slugifyHeading } from '@/lib/blog'
import { cn } from '@/lib/utils'
import { Mermaid } from './Mermaid'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type CodeProps = ComponentPropsWithoutRef<'code'>
type PreProps = ComponentPropsWithoutRef<'pre'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

function getTextContent(value: ReactNode): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value)
  }

  if (Array.isArray(value)) {
    return value.map(getTextContent).join('')
  }

  if (value && typeof value === 'object' && 'props' in value) {
    return getTextContent((value as ReactElement<{ children?: ReactNode }>).props.children)
  }

  return ''
}

const h1 = ({ className, ...props }: HeadingProps) => (
  <h1 className={cn('type-display mb-4 mt-12 text-[2rem]', className)} {...props} />
)
const h2 = ({ className, children, id, ...props }: HeadingProps) => {
  const headingId = id ?? slugifyHeading(getTextContent(children))

  return (
    <h2
      id={headingId}
      className={cn(
        'type-display mb-4 mt-14 scroll-mt-24 border-b-[3px] border-ink pb-2 text-[1.65rem]',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
const h3 = ({ className, children, id, ...props }: HeadingProps) => {
  const headingId = id ?? slugifyHeading(getTextContent(children))

  return (
    <h3
      id={headingId}
      className={cn('mb-2 mt-9 scroll-mt-24 text-[1.3rem] font-extrabold leading-snug [font-stretch:105%]', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

const p = ({ className, ...props }: ParagraphProps) => (
  <p className={cn('mb-5', className)} {...props} />
)

const a = ({ className, ...props }: AnchorProps) => (
  <a
    className={cn('text-blue underline decoration-2 underline-offset-4 hover:decoration-orange', className)}
    target={props.href?.startsWith('http') ? '_blank' : undefined}
    rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    {...props}
  />
)

const code = ({ className, ...props }: CodeProps) => (
  <code
    className={cn(
      'rounded bg-wall-deep px-1.5 py-0.5 font-mono text-[0.86em] text-ink',
      className,
    )}
    {...props}
  />
)

function getPreLanguage(children: ReactNode): string {
  return typeof children === 'object' && children && 'props' in children
    ? String((children as ReactElement<{ className?: string }>).props.className ?? '')
        .replace('language-', '')
        .trim()
    : ''
}

const pre = ({ children, ...props }: PreProps) => {
  if (getPreLanguage(children) === 'mermaid') {
    return <Mermaid chart={getTextContent(children)} />
  }

  return <HighlightedPre {...props}>{children}</HighlightedPre>
}

const HighlightedPre = ({ className, children, ...props }: PreProps) => {
  const [copied, setCopied] = useState(false)
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)
  const code = getTextContent(children)
  const language = getPreLanguage(children)

  useEffect(() => {
    let active = true

    if (!language || code.length === 0) {
      setHighlightedHtml(null)
      return
    }

    highlightCode(code, language)
      .then((html) => {
        if (active) setHighlightedHtml(html)
      })
      .catch(() => {
        if (active) setHighlightedHtml(null)
      })

    return () => {
      active = false
    }
  }, [code, language])

  async function copyCode() {
    if (!navigator.clipboard || code.length === 0) return

    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="group relative mb-6 max-w-full min-w-0">
      <button
        type="button"
        onClick={copyCode}
        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-sm border-2 border-ink bg-placard text-ink opacity-100 transition hover:bg-ink hover:text-placard focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label={copied ? 'Code copied' : 'Copy code'}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      {highlightedHtml ? (
        <div
          className="mdx-code-highlight"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre
          className={cn(
            'overflow-x-auto rounded-md border-2 border-ink bg-placard p-5 pr-14 text-[0.875rem] leading-relaxed text-ink',
            className,
          )}
          {...props}
        >
          {children}
        </pre>
      )}
    </div>
  )
}

const ul = ({ className, ...props }: ListProps) => (
  <ul className={cn('mb-5 list-[square] pl-6', className)} {...props} />
)

const ol = ({ className, ...props }: ComponentPropsWithoutRef<'ol'>) => (
  <ol className={cn('mb-5 list-decimal pl-6', className)} {...props} />
)

const li = ({ className, ...props }: ListItemProps) => (
  <li className={cn('mb-1', className)} {...props} />
)

const blockquote = ({ className, ...props }: BlockquoteProps) => (
  <blockquote
    className={cn(
      'my-6 rounded-md border-2 border-ink bg-wall-deep px-5 py-4 text-ink',
      className,
    )}
    {...props}
  />
)

const hr = ({ className, ...props }: ComponentPropsWithoutRef<'hr'>) => (
  <hr className={cn('my-10 border-0 border-t-[3px] border-ink', className)} {...props} />
)

async function highlightCode(code: string, language: string): Promise<string> {
  const loadedGrammar = await importShikiLanguage(language)
  if (!loadedGrammar) return ''

  const [{ createHighlighterCore }, { createJavaScriptRegexEngine }, theme, grammar] =
    await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
      import('shiki/themes/github-light.mjs'),
      Promise.resolve(loadedGrammar),
    ])
  const grammarInput = grammar.default
  const loadedLangs = Array.isArray(grammarInput) ? grammarInput : [grammarInput]
  const lang = loadedLangs[0]?.name ?? language

  const highlighter = await createHighlighterCore({
    themes: [theme.default],
    langs: loadedLangs,
    engine: createJavaScriptRegexEngine(),
  })

  return highlighter.codeToHtml(code, {
    lang,
    theme: 'github-light',
  })
}

function importShikiLanguage(language: string) {
  switch (language) {
    case 'js':
    case 'javascript':
      return import('shiki/langs/javascript.mjs')
    case 'jsx':
      return import('shiki/langs/jsx.mjs')
    case 'ts':
    case 'typescript':
      return import('shiki/langs/typescript.mjs')
    case 'tsx':
      return import('shiki/langs/tsx.mjs')
    case 'json':
      return import('shiki/langs/json.mjs')
    case 'jsonc':
      return import('shiki/langs/jsonc.mjs')
    case 'md':
    case 'markdown':
      return import('shiki/langs/markdown.mjs')
    case 'mdx':
      return import('shiki/langs/mdx.mjs')
    case 'bash':
    case 'sh':
    case 'shell':
    case 'shellscript':
      return import('shiki/langs/shellscript.mjs')
    default:
      return null
  }
}

export const MdxComponents = { h1, h2, h3, p, a, code, pre, ul, ol, li, blockquote, hr }
