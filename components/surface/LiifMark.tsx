import { cn } from '@/lib/utils'

// A simple, self-contained LIIF brand mark — no external image needed.
// The seal is a rounded square with a stylized roof/home glyph (facilities for
// early childhood education); the wordmark pairs it with "LIIF".

export function LiifSeal({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn('inline-flex items-center justify-center rounded-xl flex-shrink-0', className)}
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #0E7C7B 0%, #1F9E8F 100%)',
      }}
      aria-hidden
    >
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* roof */}
        <path d="M3 11 L12 4 L21 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* house body */}
        <path d="M5.5 10.5 V19 H18.5 V10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* growth / child spark */}
        <circle cx="12" cy="14.5" r="1.7" fill="white" />
      </svg>
    </span>
  )
}

export function LiifMark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <LiifSeal size={24} />
      <span className="font-semibold text-[15px] tracking-tight text-ink">LIIF</span>
    </span>
  )
}
