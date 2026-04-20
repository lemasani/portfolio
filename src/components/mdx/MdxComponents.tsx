import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type CodeProps = ComponentPropsWithoutRef<'code'>
type PreProps = ComponentPropsWithoutRef<'pre'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

const h1 = ({ className, ...props }: HeadingProps) => (
  <h1 className={cn('mb-4 mt-8 font-mono text-2xl font-bold text-white', className)} {...props} />
)
const h2 = ({ className, ...props }: HeadingProps) => (
  <h2
    className={cn(
      'mb-3 mt-8 border-b border-white/10 pb-2 font-mono text-xl font-bold text-white',
      className,
    )}
    {...props}
  />
)
const h3 = ({ className, ...props }: HeadingProps) => (
  <h3 className={cn('mb-2 mt-6 font-mono text-lg font-bold text-white', className)} {...props} />
)

const p = ({ className, ...props }: ParagraphProps) => (
  <p className={cn('mb-4 text-sm leading-relaxed text-white/70', className)} {...props} />
)

const a = ({ className, ...props }: AnchorProps) => (
  <a
    className={cn('text-[#27d0ab] underline underline-offset-4 hover:text-[#a9ffea]', className)}
    target={props.href?.startsWith('http') ? '_blank' : undefined}
    rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    {...props}
  />
)

const code = ({ className, ...props }: CodeProps) => (
  <code
    className={cn(
      'rounded bg-white/6 px-1.5 py-0.5 font-mono text-[0.875em] text-[#a9ffea]',
      className,
    )}
    {...props}
  />
)

const pre = ({ className, ...props }: PreProps) => (
  <pre
    className={cn(
      'mb-6 overflow-x-auto rounded-xl border border-[#27d0ab]/20 bg-black/40 p-5',
      className,
    )}
    {...props}
  />
)

const ul = ({ className, ...props }: ListProps) => (
  <ul className={cn('mb-4 list-disc pl-6 text-sm text-white/70', className)} {...props} />
)

const ol = ({ className, ...props }: ComponentPropsWithoutRef<'ol'>) => (
  <ol className={cn('mb-4 list-decimal pl-6 text-sm text-white/70', className)} {...props} />
)

const li = ({ className, ...props }: ListItemProps) => (
  <li className={cn('mb-1', className)} {...props} />
)

const blockquote = ({ className, ...props }: BlockquoteProps) => (
  <blockquote
    className={cn(
      'my-4 border-l-2 border-[#008b6b] pl-4 italic text-white/50',
      className,
    )}
    {...props}
  />
)

const hr = ({ className, ...props }: ComponentPropsWithoutRef<'hr'>) => (
  <hr className={cn('my-8 border-white/10', className)} {...props} />
)

export const MdxComponents = { h1, h2, h3, p, a, code, pre, ul, ol, li, blockquote, hr }
