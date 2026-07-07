import { FlagIcon as Flag } from '@phosphor-icons/react/dist/ssr'
import { HomeShell } from '@/components/surface/HomeShell'
import { BriefingCard } from '@/components/surface/BriefingCard'
import { tasha } from '@/lib/ontology/liif'
import { tashaCards, tashaQuickActions, tashaInProgress } from '@/lib/agent/suggestions'
import { sortByPriority } from '@/lib/agent/priority'

const metaLines = [
  'CCFF FY26 portfolio · 38 active grantees',
  'San Francisco & Bay Area',
  '$3.5M of $12M deployed · 29% of target',
]
const badges = ['Pipeline', 'Reviews', 'Monitoring']

const pipeline = [
  { name: 'Sunrise Family Child Care', stage: 'Payment-ready', detail: '6/6 compliance · ready to hand off', alert: 'Hand off', tone: 'text-priority-high' },
  { name: 'Bright Beginnings Center', stage: 'In review', detail: 'Application review · 1 doc outstanding', alert: 'Request doc', tone: 'text-priority-process' },
  { name: 'Little Acorns FCC', stage: 'Use-of-Funds overdue', detail: 'Report 18 days past deadline', alert: 'Reminder due', tone: 'text-priority-storm' },
  { name: 'Mission Kids Co-op', stage: 'Unresponsive', detail: 'Past 3-week escalation window', alert: 'Default notice', tone: 'text-priority-high' },
  { name: 'Cedar Lane Center', stage: 'Awarded', detail: 'Agreement executed · payee onboarding', alert: 'On track', tone: 'text-priority-opportunity' },
  { name: 'Alameda program (new)', stage: 'Program setup', detail: 'Composing from CCFF template', alert: 'Draft', tone: 'text-priority-process' },
]

export default function TashaPage() {
  return (
    <HomeShell
      persona={tasha}
      metaLines={metaLines}
      badges={badges}
      quickActions={tashaQuickActions}
      inProgress={tashaInProgress}
      accentColor="#0A6EDB"
    >
      {/* Briefing */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-priority-process text-sm">▲</span>
          <h2 className="text-[17px] font-semibold text-ink">Today&apos;s Briefing</h2>
        </div>
        <div className="flex items-center gap-1">
          <FilterTab label="All" active />
          <FilterTab label="2 Critical" />
          <FilterTab label="1 Opportunity" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {sortByPriority(tashaCards).map((card) => (
          <BriefingCard
            key={card.id}
            card={card}
            actionAccent="blue"
            flowCue={
              card.ctaHref === '/flows/payment-readiness'
                ? 'Start flow'
                : card.ctaHref === '/flows/payment-release'
                ? 'View queue'
                : undefined
            }
          />
        ))}
      </div>

      {/* Pipeline */}
      <div className="flex items-center gap-3 mb-4">
        <Flag className="text-priority-high" size={22} weight="fill" />
        <h2 className="text-[17px] font-semibold text-ink">Portfolio</h2>
        <span className="inline-flex items-center text-[11px] font-semibold text-priority-high bg-white border border-[#F2D3C2] rounded-full px-2.5 py-0.5">
          4 need action
        </span>
        <span className="text-[12px] text-ink-muted">38 active grantees</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pipeline.map((p) => (
          <div key={p.name} className="bg-[#E8F0FB] rounded-3xl px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-ink leading-tight">{p.name}</p>
              <p className="text-[11px] text-ink-muted">{p.detail}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[11px] text-ink-muted leading-tight">{p.stage}</p>
              <p className={`text-[11px] font-semibold ${p.tone}`}>{p.alert}</p>
            </div>
          </div>
        ))}
      </div>
    </HomeShell>
  )
}

function FilterTab({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-3 py-1 text-[12px] font-medium rounded-full transition-colors ${
        active
          ? 'bg-white border border-border text-ink shadow-sm'
          : 'text-ink-muted hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
}
