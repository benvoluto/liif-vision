'use client'

import { useState, useRef, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import type { CardSource } from '@/lib/ontology/types'

interface SourcesPopoverProps {
  sources: CardSource[]
}

export function SourcesPopover({ sources }: SourcesPopoverProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-[11px] text-ink-muted hover:text-ink transition-colors underline underline-offset-2"
      >
        Show sources
      </button>
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-72 rounded-xl bg-surface border border-border shadow-xl z-30 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-2.5">
            Ontology objects referenced
          </p>
          <ul className="space-y-1.5">
            {sources.map((s) => (
              <li key={s.id} className="flex items-start gap-2">
                <ExternalLink size={10} className="mt-1 text-ink-muted flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wide">
                    {s.kind}
                  </span>
                  <p className="text-xs text-ink">{s.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
