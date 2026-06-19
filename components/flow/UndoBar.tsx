'use client'

import { useState } from 'react'
import { Undo2, X } from 'lucide-react'

interface UndoBarProps {
  actionLabel: string
}

export function UndoBar({ actionLabel }: UndoBarProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-ink text-surface py-3 px-6 z-30 flex items-center justify-between">
      <div className="flex items-center gap-3 text-sm">
        <Undo2 size={15} />
        <span>
          <span className="font-semibold">{actionLabel}</span> applied.{' '}
          <span className="text-surface/70">Undo available for 24 hours.</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDismissed(true)}
          className="text-sm font-semibold text-surface/70 hover:text-surface transition-colors underline"
        >
          Undo
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
