import { FlagIcon as Flag } from '@phosphor-icons/react/dist/ssr'
import { HomeShell } from '@/components/surface/HomeShell'
import { BriefingCard } from '@/components/surface/BriefingCard'
import { maria } from '@/lib/ontology/liif'
import { mariaCards, mariaQuickActions, mariaInProgress } from '@/lib/agent/suggestions'
import { sortByPriority } from '@/lib/agent/priority'

const metaLines = [
  'Family Child Care · San Francisco, CA',
  'CCFF grantee since FY24 · 2 grants closed',
  'License #384012345 · Active',
]
const badges = ['My Applications', 'Payments', 'Reports']

const myGrants = [
  { name: 'CCFF FY26 — Facilities & safety', amount: '$48,500', status: 'Awarded · payment delayed', tone: 'text-priority-high' },
  { name: 'CCFF FY25 — Outdoor play area', amount: '$31,200', status: 'Use-of-Funds report due Nov 30', tone: 'text-priority-storm' },
  { name: 'CCFF FY24 — Licensing upgrades', amount: '$22,750', status: 'Closed · in good standing', tone: 'text-priority-opportunity' },
]

export default function MariaPage() {
  return (
    <HomeShell
      persona={maria}
      metaLines={metaLines}
      badges={badges}
      quickActions={mariaQuickActions}
      inProgress={mariaInProgress}
      accentColor="#0E7C7B"
    >
      {/* Suggested Actions */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-manager-accent text-sm">▲</span>
          <h2 className="text-[17px] font-semibold text-ink">Suggested Actions</h2>
        </div>
        <div className="flex items-center gap-1">
          <FilterTab label="All" active />
          <FilterTab label="1 Delayed" />
          <FilterTab label="2 Opportunities" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {sortByPriority(mariaCards).map((card) => (
          <BriefingCard
            key={card.id}
            card={card}
            actionAccent="green"
            flowCue={card.ctaHref === '/flows/grant-application' ? 'Start flow' : undefined}
          />
        ))}
      </div>

      {/* My Grants */}
      <div className="flex items-center gap-3 mb-4">
        <Flag className="text-priority-high" size={22} weight="fill" />
        <h2 className="text-[17px] font-semibold text-ink">My Grants</h2>
        <span className="text-[12px] text-ink-muted">3 across CCFF</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {myGrants.map((g) => (
          <div key={g.name} className="bg-[#E8F2EB] rounded-3xl px-5 py-4">
            <p className="text-[13px] font-semibold text-ink leading-snug mb-1">{g.name}</p>
            <p className="text-[18px] font-semibold text-ink mb-1">{g.amount}</p>
            <p className={`text-[11px] font-semibold ${g.tone}`}>{g.status}</p>
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
