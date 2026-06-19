import { cn } from '@/lib/utils'

export type AuditEntry = {
  timestamp: string
  actor: string
  action: string
  detail?: string
}

interface AuditTrailProps {
  entries: AuditEntry[]
  className?: string
}

export function AuditTrail({ entries, className }: AuditTrailProps) {
  return (
    <div className={cn('rounded-xl border border-border overflow-hidden', className)}>
      <div className="bg-gray-50 px-4 py-2 border-b border-border flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
          Audit trail
        </p>
      </div>
      <div className="divide-y divide-border font-mono">
        {entries.map((entry, i) => (
          <div key={i} className="px-4 py-2.5 text-xs flex items-start gap-3">
            <span className="text-ink-muted whitespace-nowrap flex-shrink-0">{entry.timestamp}</span>
            <div>
              <span className="text-audit font-semibold">[{entry.actor}]</span>{' '}
              <span className="text-ink">{entry.action}</span>
              {entry.detail && (
                <p className="text-ink-muted text-[11px] mt-0.5">{entry.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
