import CheckOutlined from '@mui/icons-material/CheckOutlined'
import ArrowForwardOutlined from '@mui/icons-material/ArrowForwardOutlined'
import { AskAnything } from './AskAnything'
import type { QuickAction, InProgressItem } from '@/lib/ontology/types'

interface SidebarProps {
  quickActions: QuickAction[]
  inProgress: InProgressItem[]
  accentColor?: string
}

export function Sidebar({ quickActions, inProgress }: SidebarProps) {
  return (
    <aside className="w-full lg:w-80 lg:flex-shrink-0 space-y-6">
      {/* Quick Actions — 2-column grid, no card */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        {quickActions.map((qa) => (
          <button
            key={qa.id}
            className="flex items-center gap-3 text-left group"
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-employee-accent text-white flex-shrink-0 group-hover:scale-105 transition-transform">
              <ArrowForwardOutlined sx={{ fontSize: 16 }} />
            </span>
            <span className="text-[14px] font-bold text-employee-accent truncate group-hover:underline underline-offset-2">
              {qa.label}
            </span>
          </button>
        ))}
      </div>

      {/* Ask anything */}
      <div className="bg-white rounded-2xl shadow-md px-5 py-4 min-h-[120px]">
        <AskAnything />
      </div>

      {/* In Progress */}
      <div>
        <h3 className="text-[13px] font-semibold text-ink mb-4 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-priority-opportunity/15 text-priority-opportunity">
            <CheckOutlined sx={{ fontSize: 11 }} />
          </span>
          <span className="text-priority-opportunity">In Progress</span>
        </h3>
        <div className="space-y-5">
          {inProgress.map((item) => (
            <div key={item.id}>
              <p className="text-[13px] font-semibold text-ink mb-1">
                {item.label}
              </p>
              <p className="text-[11.5px] text-ink-muted leading-relaxed mb-2">
                {item.detail}
              </p>
              <div className="flex items-center gap-4">
                <button className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-employee-accent hover:underline underline-offset-2">
                  <span className="inline-block w-[9px] h-[9px] rounded-[2px] bg-current opacity-90" />
                  Explain
                </button>
                {item.ctaHref ? (
                  <a
                    href={item.ctaHref}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-employee-accent hover:underline underline-offset-2"
                  >
                    <span className="inline-block w-[9px] h-[9px] rounded-[2px] bg-current opacity-90" />
                    {item.ctaLabel}
                  </a>
                ) : (
                  <button className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-employee-accent hover:underline underline-offset-2">
                    <span className="inline-block w-[9px] h-[9px] rounded-[2px] bg-current opacity-90" />
                    {item.ctaLabel}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
