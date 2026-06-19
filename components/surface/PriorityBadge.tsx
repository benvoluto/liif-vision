import BoltOutlined from '@mui/icons-material/BoltOutlined'
import { cn } from '@/lib/utils'
import type { PriorityKind } from '@/lib/ontology/types'

const styles: Record<PriorityKind, string> = {
  high: 'bg-orange-50 text-priority-high border border-orange-200',
  process: 'bg-blue-50 text-priority-process border border-blue-200',
  opportunity: 'bg-teal-50 text-priority-opportunity border border-teal-200',
  storm: 'bg-amber-50 text-priority-storm border border-amber-200',
}

interface PriorityBadgeProps {
  kind: PriorityKind
  label: string
  className?: string
}

export function PriorityBadge({ kind, label, className }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5',
        'text-[10px] font-bold tracking-widest uppercase whitespace-nowrap',
        styles[kind],
        className,
      )}
    >
      {kind === 'high' && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-priority-high" />
      )}
      {kind === 'storm' && <BoltOutlined sx={{ fontSize: 11 }} />}
      {label}
    </span>
  )
}
