'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { XIcon as X, CheckIcon as Check } from '@phosphor-icons/react/dist/ssr'
import { ConfidenceChip } from './ConfidenceChip'
import type { ExplainContent, OntologyRef } from '@/lib/ontology/types'

const kindColors: Record<string, string> = {
  Funder: 'bg-amber-100 text-amber-800',
  Program: 'bg-indigo-100 text-indigo-800',
  Provider: 'bg-violet-100 text-violet-800',
  Application: 'bg-sky-100 text-sky-800',
  Agreement: 'bg-teal-100 text-teal-800',
  Award: 'bg-green-100 text-green-800',
  PaymentRequest: 'bg-blue-100 text-blue-800',
  Disbursement: 'bg-emerald-100 text-emerald-800',
  ComplianceItem: 'bg-orange-100 text-orange-800',
  Report: 'bg-slate-100 text-slate-700',
  Event: 'bg-red-100 text-red-800',
  Policy: 'bg-gray-100 text-gray-700',
  System: 'bg-zinc-100 text-zinc-700',
}

function OntologyChip({ item }: { item: OntologyRef }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${kindColors[item.kind] ?? 'bg-gray-100 text-gray-700'}`}
    >
      <span className="font-bold">{item.kind}:</span> {item.label.replace(/^.*?:\s*/, '')}
    </span>
  )
}

interface ExplainDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  content: ExplainContent | null
}

export function ExplainDrawer({ open, onClose, title, content }: ExplainDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />
          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[480px] max-w-full bg-surface shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-ink-muted mb-1">
                  Explain
                </p>
                <h2 className="text-base font-semibold text-ink leading-snug">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-1.5 rounded-md hover:bg-muted transition-colors text-ink-muted"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {content ? (
                <>
                  {/* Why this surfaced */}
                  <section>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-2">
                      Why this surfaced
                    </h3>
                    <p className="text-sm text-ink leading-relaxed">{content.whySurfaced}</p>
                  </section>

                  {/* What I looked at */}
                  <section>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-2">
                      What I looked at
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {content.whatLooked.map((ref) => (
                        <OntologyChip key={ref.id} item={ref} />
                      ))}
                    </div>
                  </section>

                  {/* Confidence */}
                  <section>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-2">
                      Confidence
                    </h3>
                    <ConfidenceChip
                      confidence={content.confidence}
                      note={content.confidenceNote}
                    />
                  </section>

                  {/* What I will and won't do */}
                  <section>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-3">
                      What I will and won&apos;t do
                    </h3>
                    <div className="space-y-2">
                      <div className="flex gap-2.5 text-sm">
                        <Check className="text-green-600 mt-0.5 flex-shrink-0" size={19} weight="bold" />
                        <p className="text-ink leading-relaxed">{content.willDo}</p>
                      </div>
                      <div className="flex gap-2.5 text-sm">
                        <X className="text-red-500 mt-0.5 flex-shrink-0" size={19} weight="bold" />
                        <p className="text-ink leading-relaxed">{content.wontDo}</p>
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                // Canned response for AskAnything
                <div className="rounded-xl bg-muted border border-border p-5">
                  <p className="text-sm text-ink-muted leading-relaxed italic">
                    I don&apos;t actually run in this prototype — try one of the suggested actions
                    on the left to see the real Explain drawer.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <p className="text-[10px] text-ink-muted text-center">
                LIIF Grant Agent · reasoning over the grant ontology · prototype — no live data
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
