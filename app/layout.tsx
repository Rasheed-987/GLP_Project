import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UAEGLP',
  description: 'UAE Global Leadership Program',
}

// Minimal root layout: just returns children
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
