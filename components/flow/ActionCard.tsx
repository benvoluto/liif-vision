'use client'

import { useState } from 'react'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ConfidenceChip } from '@/components/trust/ConfidenceChip'
import { ScopeBadge } from './ScopeBadge'
import type { Action } from '@/lib/ontology/types'

interface ActionCardProps {
  action: Action
  onExecute?: () => void
  className?: string
}

export function ActionCard({ action, onExecute, className }: ActionCardProps) {
  const [state, setState] = useState<'idle' | 'previewing' | 'done'>('idle')

  function handleClick() {
    if (state === 'idle') {
      setState('previewing')
    } else if (state === 'previewing') {
      setState('done')
      onExecute?.()
    }
  }

  return (
    <div className={cn('rounded-xl border border-border bg-surface overflow-hidden', className)}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-1">
              Agent action · {action.kind.replace(/-/g, ' ')}
            </p>
            <h4 className="font-semibold text-[15px] text-ink">{action.label}</h4>
          </div>
          {state === 'done' ? (
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <ConfidenceChip
              confidence={action.confidence}
              note={action.confidenceNote}
              className="flex-shrink-0"
            />
          )}
        </div>

        {/* Scope */}
        <ScopeBadge
          label={action.scope.label}
          count={action.scope.count}
          countUnit={action.scope.countUnit}
          className="mb-3"
        />

        {/* Preview text */}
        <p className="text-sm text-ink-muted mb-4">{action.preview}</p>

        {/* Approvals required */}
        {action.requiredApprovals.length > 0 && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
              Requires:
            </span>
            {action.requiredApprovals.map((a) => (
              <span
                key={a}
                className="text-[11px] bg-gray-100 text-ink-muted rounded-full px-2 py-0.5"
              >
                {a}
              </span>
            ))}
          </div>
        )}

        {/* Policy / program-rule refs */}
        {action.policyRefs.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {action.policyRefs.map((ref) => (
              <span
                key={ref.id}
                className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 rounded-full px-2 py-0.5"
              >
                {ref.label}
              </span>
            ))}
          </div>
        )}

        {/* Action button */}
        {state !== 'done' ? (
          <button
            onClick={handleClick}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all',
              state === 'idle'
                ? 'bg-gray-100 text-ink hover:bg-gray-200'
                : 'bg-employee-accent text-surface hover:bg-employee-accent/90'
            )}
          >
            {state === 'idle' ? (
              <>Preview action <ChevronRight size={14} /></>
            ) : (
              <>Confirm & apply</>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-2 text-sm text-green-700 font-semibold">
            <CheckCircle size={16} />
            Applied — audit entry created
          </div>
        )}
      </div>
    </div>
  )
}
