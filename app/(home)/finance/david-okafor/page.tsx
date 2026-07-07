import { FlagIcon as Flag } from '@phosphor-icons/react/dist/ssr'
import { HomeShell } from '@/components/surface/HomeShell'
import { BriefingCard } from '@/components/surface/BriefingCard'
import { david } from '@/lib/ontology/liif'
import { davidCards, davidQuickActions, davidInProgress } from '@/lib/agent/suggestions'
import { sortByPriority } from '@/lib/agent/priority'

const metaLines = [
  'Release authority · LIIF Delegation of Authority',
  'FY26 ECE portfolio · $478M active across 22 sources',
  'First approver · CFO co-signs above $15,000',
]
const badges = ['Approvals', 'Disbursements', 'Audit']

export default function DavidPage() {
  return (
    <HomeShell
      persona={david}
      metaLines={metaLines}
      badges={badges}
      quickActions={davidQuickActions}
      inProgress={davidInProgress}
      accentColor="#E26A2C"
    >
      {/* Briefing */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-priority-high text-sm">▲</span>
          <h2 className="text-[17px] font-semibold text-ink">Today&apos;s Briefing</h2>
        </div>
        <div className="flex items-center gap-1">
          <FilterTab label="All" active />
          <FilterTab label="1 Critical" />
          <FilterTab label="2 Opportunities" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {sortByPriority(davidCards).map((card) => (
          <BriefingCard
            key={card.id}
            card={card}
            actionAccent="orange"
            flowCue={card.ctaHref === '/flows/payment-release' ? 'Clear queue' : undefined}
          />
        ))}
      </div>

      {/* Disbursement at a glance */}
      <div className="flex items-center gap-3 mb-4">
        <Flag className="text-priority-high" size={22} weight="fill" />
        <h2 className="text-[17px] font-semibold text-ink">Disbursement at a glance</h2>
        <span className="inline-flex items-center text-[11px] font-semibold text-priority-high bg-white border border-[#F2D3C2] rounded-full px-2.5 py-0.5">
          Controls protected
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#FBF1DC] rounded-3xl p-5">
          <p className="text-[12px] font-bold uppercase tracking-wider text-ink-muted mb-2">
            What the agent will never do
          </p>
          <p className="text-[13px] text-ink leading-relaxed mb-3">
            Release a payment over $15,000 without the CFO&apos;s second approval; let the
            reviewer who initiated a request approve its release; or move funds without a
            timestamped audit entry. The controls live <em>inside</em> the action, not in a person&apos;s memory.
          </p>
          <p className="text-[11px] text-ink-muted">Source: LIIF Delegation of Authority · segregation of duties</p>
        </div>
        <div className="bg-[#FBF1DC] rounded-3xl p-5 space-y-3">
          <Metric label="FY26 ECE deployed vs. target" value="$30.5M of $94.4M" note="32% deployed · 75% of year elapsed" tone="text-priority-high" />
          <Metric label="Median time-to-payment" value="7.2 weeks" note="no shared target · no owner today" tone="text-priority-storm" />
          <Metric label="Payments aging > 30 days" value="14 · $612K" note="11 releasable now · 3 need CFO co-sign" tone="text-priority-process" />
          <Metric label="First-pass approval rate" value="61%" note="rises with compliance-complete handoff" tone="text-priority-opportunity" />
        </div>
      </div>
    </HomeShell>
  )
}

function Metric({ label, value, note, tone }: { label: string; value: string; note: string; tone: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">{label}</p>
      <p className="text-[14px] font-semibold text-ink">
        {value} <span className={`text-xs font-normal ${tone}`}>· {note}</span>
      </p>
    </div>
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
