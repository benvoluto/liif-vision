'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  WarningIcon as Warning,
  DotsThreeCircleIcon as DotsThreeCircle,
  LightbulbIcon as Lightbulb,
  LightningIcon as Lightning,
  ArrowElbowDownRightIcon as ArrowElbowDownRight,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { ExplainDrawer } from '@/components/trust/ExplainDrawer'
import type { BriefingCardDef, PriorityKind } from '@/lib/ontology/types'

export type CardTint = 'blue' | 'green' | 'amber' | 'rose' | 'peach' | 'gray'

// White card with a thick border in the tint's semantic color. The color
// carries the same meaning the background tint used to: warm = delayed/deadline,
// blue = in-progress, teal = opportunity, neutral = everything else.
const tintStyles: Record<CardTint, string> = {
  blue: 'bg-surface border-[3px] border-priority-process/25',
  green: 'bg-surface border-[3px] border-priority-opportunity/25',
  amber: 'bg-surface border-[3px] border-priority-storm/25',
  rose: 'bg-surface border-[3px] border-priority-high/25',
  peach: 'bg-surface border-[3px] border-priority-high/25',
  gray: 'bg-surface border-[3px] border-border-strong/25',
}

// Background tint by importance: delays/deadlines read warm (peach), in-progress
// work reads cool (blue), opportunities read green, everything else stays neutral.
const priorityTint: Record<PriorityKind, CardTint> = {
  high: 'peach',
  storm: 'peach',
  process: 'blue',
  opportunity: 'green',
}

const priorityStyles: Record<
  PriorityKind,
  { color: string; Icon: PhosphorIcon }
> = {
  high: { color: 'text-priority-high', Icon: Warning },
  process: { color: 'text-priority-process', Icon: DotsThreeCircle },
  opportunity: { color: 'text-priority-opportunity', Icon: Lightbulb },
  storm: { color: 'text-priority-storm', Icon: Lightning },
}

type ActionAccent = 'blue' | 'green' | 'orange'

const accentClass: Record<ActionAccent, string> = {
  blue: 'text-employee-accent',
  green: 'text-manager-accent',
  orange: 'text-priority-high',
}

interface BriefingCardProps {
  card: BriefingCardDef
  /** Optional override; by default the tint is derived from card.priority. */
  tint?: CardTint
  actionAccent?: ActionAccent
  flowCue?: string
  className?: string
}

export function BriefingCard({
  card,
  tint,
  actionAccent = 'blue',
  flowCue,
  className,
}: BriefingCardProps) {
  const [explainOpen, setExplainOpen] = useState(false)
  const p = priorityStyles[card.priority]
  const accent = accentClass[actionAccent]
  const resolvedTint = tint ?? priorityTint[card.priority] ?? 'gray'

  return (
    <>
      <div
        className={cn(
          'rounded-3xl p-5 flex flex-col min-h-[200px]',
          tintStyles[resolvedTint],
          className,
        )}
      >
        {/* Priority badge */}
        <div
          className={cn(
            'flex items-center gap-2 text-[16px] tracking-tight font-bold mb-3',
            p.color,
          )}
        >
          <p.Icon size={22} weight="fill" />
          <span>{card.priorityLabel}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[19px] text-ink leading-snug mb-2">
          {card.title}
        </h3>

        {/* Context */}
        <p className="text-[13px] text-ink leading-relaxed mb-4">
          {card.context}
        </p>

        {/* Actions + sources row */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-4 flex-wrap">
            <ActionLink accent={accent} onClick={() => setExplainOpen(true)}>
              Explain
            </ActionLink>
            {card.ctaHref ? (
              <ActionLink accent={accent} href={card.ctaHref} cue={flowCue}>
                {card.ctaLabel}
              </ActionLink>
            ) : (
              <ActionLink accent={accent}>{card.ctaLabel}</ActionLink>
            )}
            {card.secondaryAction && (
              <ActionLink
                accent={accent}
                href={card.secondaryAction.href}
              >
                {card.secondaryAction.label}
              </ActionLink>
            )}
          </div>
          <p className="text-[11px] text-ink-muted leading-snug">
            {card.sources.map((s, i) => (
              <span key={s.id}>
                {i > 0 && <span className="mx-1.5 opacity-60">·</span>}
                {s.label}
              </span>
            ))}
            <span className="mx-2 opacity-60">·</span>
            <button className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-ink transition-colors">
              <ArrowElbowDownRight size={16} weight="bold" />
              Show sources
            </button>
          </p>
        </div>
      </div>

      <ExplainDrawer
        open={explainOpen}
        onClose={() => setExplainOpen(false)}
        title={card.title}
        content={card.explain}
      />
    </>
  )
}

function ActionLink({
  children,
  onClick,
  href,
  accent,
  cue,
}: {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  accent: string
  cue?: string
}) {
  const classes = cn(
    'relative inline-flex items-center gap-1.5 text-xs font-semibold hover:underline underline-offset-2 transition-colors',
    accent,
  )
  const inner = (
    <>
      <span className="inline-block w-[9px] h-[9px] rounded-[2px] bg-current opacity-90" />
      {children}
      {cue && (
        <span
          className={cn(
            'absolute left-1/2 -translate-x-1/2 -top-5 whitespace-nowrap',
            'text-[10px] font-bold tracking-wide uppercase text-white bg-ink',
            'px-2 py-0.5 rounded-md shadow-md',
          )}
        >
          {cue}
          <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-ink" />
        </span>
      )}
    </>
  )
  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    )
  }
  return (
    <button onClick={onClick} className={classes}>
      {inner}
    </button>
  )
}
