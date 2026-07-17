import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({ label, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 flex flex-col items-center text-center', className)}>
      <p className="mb-4 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs tracking-[0.32em] text-white/70 uppercase backdrop-blur">
        {label}
      </p>
      <h2 className="font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">{subtitle}</p>
      )}
    </div>
  )
}
