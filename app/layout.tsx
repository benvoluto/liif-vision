import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'A Vision for a LIIF "Grant Operating System"',
  description:
    'An agent-enabled way to administer early-childhood-education facilities grants — and get money to providers faster, without giving up a single control.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg">{children}</body>
    </html>
  )
}
