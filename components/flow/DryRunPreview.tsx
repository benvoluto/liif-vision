import { cn } from '@/lib/utils'
import type { DryRunData } from '@/lib/ontology/types'

interface DryRunPreviewProps {
  data: DryRunData
  className?: string
}

export function DryRunPreview({ data, className }: DryRunPreviewProps) {
  return (
    <div className={cn('rounded-xl border border-border overflow-hidden', className)}>
      <div className="bg-gray-50 px-4 py-2 border-b border-border">
        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
          Dry-run preview · no changes applied
        </p>
      </div>

      {/* Line-by-line diff */}
      {data.lines && data.lines.length > 0 && (
        <div className="divide-y divide-border">
          {data.lines.map((line, i) => (
            <div key={i} className="flex items-start px-4 py-2.5 gap-4 text-sm">
              <span className="w-40 flex-shrink-0 text-[11px] font-semibold text-ink-muted uppercase tracking-wide">
                {line.field}
              </span>
              <span className="flex-1 text-red-600 line-through text-[12px]">{line.before}</span>
              <span className="text-[11px] text-ink-muted mx-2">→</span>
              <span className="flex-1 text-green-700 font-medium text-[12px]">{line.after}</span>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {data.table && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                {data.table.columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2 text-left font-bold text-[10px] uppercase tracking-wider text-ink-muted"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.table.rows.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    'hover:bg-gray-50 transition-colors',
                    row[0].startsWith('**') && 'bg-gray-50 font-bold'
                  )}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={cn(
                        'px-4 py-2 text-ink',
                        row[0].startsWith('**') && 'font-bold'
                      )}
                    >
                      {cell.replace(/\*\*/g, '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.table.summary && (
            <p className="px-4 py-2 text-[11px] text-ink-muted border-t border-border bg-gray-50">
              {data.table.summary}
            </p>
          )}
        </div>
      )}

      {/* Impact + note */}
      {(data.impact || data.note) && (
        <div className="px-4 py-3 bg-amber-50 border-t border-amber-100 space-y-1">
          {data.impact && (
            <p className="text-[12px] text-amber-800 font-medium">{data.impact}</p>
          )}
          {data.note && (
            <p className="text-[11px] text-amber-700">{data.note}</p>
          )}
        </div>
      )}
    </div>
  )
}
