'use client'

import { useState, type ComponentType } from 'react'
import Link from 'next/link'
import PriorityHighOutlined from '@mui/icons-material/PriorityHighOutlined'
import PendingOutlined from '@mui/icons-material/PendingOutlined'
import LightbulbOutlined from '@mui/icons-material/LightbulbOutlined'
import BoltOutlined from '@mui/icons-material/BoltOutlined'
import SubdirectoryArrowRightOutlined from '@mui/icons-material/SubdirectoryArrowRightOutlined'
import type { SvgIconProps } from '@mui/material/SvgIcon'
import { cn } from '@/lib/utils'
import { ExplainDrawer } from '@/components/trust/ExplainDrawer'
import type { BriefingCardDef, PriorityKind } from '@/lib/ontology/types'

export type CardTint = 'blue' | 'green' | 'amber' | 'rose'

const tintStyles: Record<CardTint, string> = {
  blue: 'bg-[#E8F0FB] border-[#CFDEF3]',
  green: 'bg-[#E8F2EB] border-[#CFE1D5]',
  amber: 'bg-[#FBF1DC] border-[#EEDFB8]',
  rose: 'bg-[#FBE9E1] border-[#F2D3C2]',
}

const priorityStyles: Record<
  PriorityKind,
  { color: string; Icon: ComponentType<SvgIconProps> }
> = {
  high: { color: 'text-priority-high', Icon: PriorityHighOutlined },
  process: { color: 'text-priority-process', Icon: PendingOutlined },
  opportunity: { color: 'text-priority-opportunity', Icon: LightbulbOutlined },
  storm: { color: 'text-priority-storm', Icon: BoltOutlined },
}

type ActionAccent = 'blue' | 'green' | 'orange'

const accentClass: Record<ActionAccent, string> = {
  blue: 'text-employee-accent',
  green: 'text-manager-accent',
  orange: 'text-priority-high',
}

interface BriefingCardProps {
  card: BriefingCardDef
  tint?: CardTint
  actionAccent?: ActionAccent
  flowCue?: string
  className?: string
}

export function BriefingCard({
  card,
  tint = 'blue',
  actionAccent = 'blue',
  flowCue,
  className,
}: BriefingCardProps) {
  const [explainOpen, setExplainOpen] = useState(false)
  const p = priorityStyles[card.priority]
  const accent = accentClass[actionAccent]

  return (
    <>
      <div
        className={cn(
          'rounded-3xl p-5 flex flex-col min-h-[200px]',
          tintStyles[tint],
          className,
        )}
      >
        {/* Priority badge */}
        <div
          className={cn(
            'flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase mb-3',
            p.color,
          )}
        >
          <p.Icon sx={{ fontSize: 14 }} />
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
              <SubdirectoryArrowRightOutlined sx={{ fontSize: 12 }} />
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
    cue && 'rounded-md px-1.5 py-0.5 -mx-1.5 ring-2 ring-current ring-offset-2 ring-offset-[var(--cue-offset,transparent)]',
  )
  const inner = (
    <>
      <span className="inline-block w-[9px] h-[9px] rounded-[2px] bg-current opacity-90" />
      {children}
      {cue && (
        <span
          className={cn(
            'absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap',
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
