'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ConfidenceChipProps {
  confidence: number
  note: string
  className?: string
}

function confidenceLabel(n: number) {
  if (n >= 90) return 'High'
  if (n >= 75) return 'Medium-high'
  if (n >= 60) return 'Medium'
  return 'Low'
}

function confidenceColor(n: number) {
  if (n >= 90) return 'text-green-700 bg-green-50 border-green-200'
  if (n >= 75) return 'text-blue-700 bg-blue-50 border-blue-200'
  if (n >= 60) return 'text-amber-700 bg-amber-50 border-amber-200'
  return 'text-red-700 bg-red-50 border-red-200'
}

export function ConfidenceChip({ confidence, note, className }: ConfidenceChipProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={cn('relative inline-block', className)}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border',
          'cursor-pointer hover:opacity-80 transition-opacity',
          confidenceColor(confidence)
        )}
      >
        <span className="inline-block w-2 h-2 rounded-full bg-current opacity-70" />
        {confidenceLabel(confidence)} · {confidence}%
      </button>
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg bg-ink text-surface text-xs p-3 shadow-xl z-50 leading-relaxed">
          {note}
          <div className="absolute bottom-0 left-4 translate-y-full">
            <div className="border-4 border-transparent border-t-ink w-0 h-0" />
          </div>
        </div>
      )}
    </div>
  )
}
