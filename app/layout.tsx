import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GLP',
  description: 'Global Leadership Program',
}

// This layout is required by Next.js but kept minimal
// The actual root layout with html/body is in app/[lang]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
