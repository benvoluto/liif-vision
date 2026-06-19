'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LiifSeal } from '@/components/surface/LiifMark'
import type { FlowStepDef } from '@/lib/flows/types'

export interface FlowTabDef {
  id: string
  label: string
  steps: FlowStepDef[]
  renderStep: (stepId: string, next: () => void, prev: () => void) => React.ReactNode
}

interface FlowShellProps {
  title: string
  persona: string
  backHref: string
  tabs: FlowTabDef[]
}

export function FlowShell({ title, persona, backHref, tabs }: FlowShellProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id)
  const [indexByTab, setIndexByTab] = useState<Record<string, number>>(
    Object.fromEntries(tabs.map((t) => [t.id, 0])),
  )

  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0]
  const steps = activeTab.steps
  const currentIndex = indexByTab[activeTab.id] ?? 0
  const currentStep = steps[currentIndex]

  function setIndex(idx: number) {
    setIndexByTab((prev) => ({ ...prev, [activeTab.id]: idx }))
  }
  function next() {
    if (currentIndex < steps.length - 1) setIndex(currentIndex + 1)
  }
  function prev() {
    if (currentIndex > 0) setIndex(currentIndex - 1)
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Fixed home tab — attached to left window edge */}
      <Link
        href="/"
        aria-label="Return home"
        className="group fixed left-0 top-1/2 -translate-y-1/2 z-40
                   flex items-center gap-2 bg-ink text-surface
                   pl-2.5 pr-3 py-2.5 rounded-r-lg shadow-lg
                   hover:pl-3.5 hover:pr-4 transition-all"
      >
        <Home size={14} />
        <span className="text-[11px] font-semibold tracking-wide uppercase
                         max-w-0 overflow-hidden whitespace-nowrap
                         group-hover:max-w-[80px] transition-all">
          Home
        </span>
      </Link>

      {/* Top bar */}
      <header className="bg-surface border-b border-border px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 sm:gap-4 flex-wrap">
        <LiifSeal size={44} />
        <Link
          href={backHref}
          className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <div className="h-4 w-px bg-border" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">{persona}</p>
          <h1 className="font-semibold text-sm text-ink">{title}</h1>
        </div>
        <div className="ml-auto text-[11px] text-ink-muted">
          Step {currentIndex + 1} of {steps.length}
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8 gap-6 lg:gap-8">
        {/* Left column — tabs */}
        <nav className="w-full lg:w-56 lg:flex-shrink-0">
          <div className="sticky top-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-3">
              {tabs.length > 1 ? 'Sections' : 'Section'}
            </p>
            <ul className="space-y-1.5">
              {tabs.map((tab) => {
                const active = tab.id === activeTab.id
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTabId(tab.id)}
                      className={cn(
                        'w-full text-left px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-colors',
                        active
                          ? 'bg-ink text-surface'
                          : 'text-ink-muted hover:bg-gray-100 hover:text-ink',
                      )}
                    >
                      {tab.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Right column — horizontal stepper + content */}
        <div className="flex-1 min-w-0 pb-16">
          {/* Horizontal stepper */}
          <ol className="flex items-start gap-0 mb-8 overflow-x-auto pb-2">
            {steps.map((step, i) => {
              const done = i < currentIndex
              const active = i === currentIndex
              return (
                <li
                  key={step.id}
                  className="flex-1 min-w-[92px] flex flex-col items-center relative"
                >
                  {/* Connector */}
                  {i < steps.length - 1 && (
                    <div
                      className={cn(
                        'absolute top-3 left-1/2 w-full h-0.5 transition-colors',
                        done ? 'bg-employee-accent' : 'bg-border',
                      )}
                    />
                  )}
                  {/* Node */}
                  <button
                    onClick={() => setIndex(i)}
                    className={cn(
                      'relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all',
                      done
                        ? 'bg-employee-accent text-surface'
                        : active
                        ? 'bg-ink text-surface ring-4 ring-ink/10'
                        : 'bg-border text-ink-muted hover:bg-gray-300',
                    )}
                  >
                    {done ? <Check size={12} /> : i + 1}
                  </button>
                  {/* Label */}
                  <p
                    className={cn(
                      'mt-2 text-[11px] text-center leading-tight px-1 transition-colors',
                      active
                        ? 'text-ink font-semibold'
                        : done
                        ? 'text-ink-muted'
                        : 'text-ink-muted',
                    )}
                  >
                    {step.shortLabel}
                  </p>
                </li>
              )
            })}
          </ol>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab.id}:${currentStep.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-ink mb-1">{currentStep.label}</h2>
              <p className="text-sm text-ink-muted mb-6">{currentStep.description}</p>
              {activeTab.renderStep(currentStep.id, next, prev)}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex gap-3 mt-8">
            {currentIndex > 0 && (
              <button
                onClick={prev}
                className="px-4 py-2 text-sm font-medium text-ink-muted border border-border rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
            )}
            {currentIndex < steps.length - 1 && (
              <button
                onClick={next}
                className="px-4 py-2 text-sm font-semibold bg-ink text-surface rounded-lg hover:bg-ink/80 transition-colors"
              >
                Continue →
              </button>
            )}
            <Link
              href={backHref}
              className="ml-auto px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
