import { cn } from '@/lib/utils'

interface ScopeBadgeProps {
  label: string
  count?: number
  countUnit?: string
  className?: string
}

export function ScopeBadge({ label, count, countUnit = 'records', className }: ScopeBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1',
        'text-[11px] font-semibold bg-audit/10 text-audit border border-audit/20',
        className
      )}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-audit" />
      Scope: {label}
      {count !== undefined && (
        <span className="font-bold">({count.toLocaleString()} {countUnit})</span>
      )}
    </span>
  )
}
