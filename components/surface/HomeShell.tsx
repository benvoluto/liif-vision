import Link from 'next/link'
import { HouseIcon as House } from '@phosphor-icons/react/dist/ssr'
import { HeaderNav } from './HeaderNav'
import { Sidebar } from './Sidebar'
import type { Person, QuickAction, InProgressItem } from '@/lib/ontology/types'

interface HomeShellProps {
  persona: Person
  metaLines: string[]
  badges: string[]
  quickActions: QuickAction[]
  inProgress: InProgressItem[]
  accentColor?: string
  /** Hide the right-hand sidebar and let the main content span full width. */
  hideSidebar?: boolean
  children: React.ReactNode
}

export function HomeShell({
  persona,
  metaLines,
  badges,
  quickActions,
  inProgress,
  accentColor,
  hideSidebar = false,
  children,
}: HomeShellProps) {
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
        <House size={18} weight="bold" />
        <span className="text-[11px] font-semibold tracking-wide uppercase
                         max-w-0 overflow-hidden whitespace-nowrap
                         group-hover:max-w-[80px] transition-all">
          Home
        </span>
      </Link>

      <HeaderNav persona={persona} metaLines={metaLines} badges={badges} />
      <div className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6 flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>

        {/* Sidebar */}
        {!hideSidebar && (
          <Sidebar
            quickActions={quickActions}
            inProgress={inProgress}
            accentColor={accentColor}
          />
        )}
      </div>
    </div>
  )
}
