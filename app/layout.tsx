import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GLP',
  description: 'Global Leadership Program',
}

// Minimal root layout: just returns children
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
