import Image from 'next/image'
import Link from 'next/link'
import { LiifMark } from './LiifMark'
import type { Person } from '@/lib/ontology/types'

interface HeaderNavProps {
  persona: Person
  metaLines: string[]
  badges: string[]
  activeTab?: 'briefing' | 'grants' | 'help'
}

const tabs = [
  { id: 'briefing', label: "Today's Briefing", href: '#' },
  { id: 'grants', label: 'My Grants', href: '#' },
  { id: 'help', label: 'Get Help', href: '#' },
]

export function HeaderNav({
  persona,
  metaLines,
  badges,
  activeTab = 'briefing',
}: HeaderNavProps) {
  const [firstName, ...rest] = persona.legalName.split(' ')
  const lastName = rest.join(' ')

  return (
    <header className="bg-surface border-b border-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-5 pb-3">
        {/* Top row: LIIF seal + persona block + nav + wordmark */}
        <div className="flex items-start gap-4 lg:gap-6 flex-wrap">
          {/* Left mark — LIIF seal */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 flex items-center justify-center">
              <span className="scale-[1.45] origin-center">
                {/* seal scaled up to fill the slot */}
                <LiifSealLarge />
              </span>
            </div>
          </div>

          {/* Persona */}
          <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1 lg:flex-shrink-0 lg:flex-none">
            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-border flex-shrink-0 bg-white">
              <Image
                src={persona.photo}
                alt={persona.legalName}
                fill
                unoptimized
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex items-start gap-3 sm:gap-5 flex-wrap min-w-0">
              <h1 className="font-display text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.05] font-semibold text-ink tracking-tight">
                {firstName}
                <br />
                {lastName}
              </h1>
              <div className="pt-2 space-y-0.5">
                <p className="text-[12px] text-ink leading-snug">
                  <span className="font-medium">{persona.title}</span>
                  <span className="mx-1.5 text-ink-muted">·</span>
                  <span>{persona.organization}</span>
                </p>
                {metaLines.map((line) => (
                  <p key={line} className="text-[11px] text-ink-muted">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Nav tabs */}
          <nav className="hidden md:flex items-center gap-5 ml-auto pt-2">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                className={`text-[13px] font-medium transition-colors ${
                  tab.id === activeTab
                    ? 'text-ink border-b-2 border-ink pb-0.5'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {tab.label}
              </Link>
            ))}
            <Link href="/" className="ml-2">
              <LiifMark />
            </Link>
          </nav>
        </div>

        {/* Persona badge row */}
        <div className="flex items-center gap-3 mt-2 ml-0 sm:ml-[88px] flex-wrap">
          {badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-employee-accent"
            >
              <span className="inline-block w-[9px] h-[9px] rounded-[2px] bg-current opacity-90" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}

// local helper: the seal at the header size
function LiifSealLarge() {
  return (
    <span
      className="inline-flex items-center justify-center rounded-xl"
      style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #0E7C7B 0%, #1F9E8F 100%)' }}
      aria-hidden
    >
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 11 L12 4 L21 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5 10.5 V19 H18.5 V10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="14.5" r="1.7" fill="white" />
      </svg>
    </span>
  )
}
