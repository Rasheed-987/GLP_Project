'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n/config'

export default function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathName = usePathname()

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return `/${locale}`
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const toggleLocale = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en'
    return redirectedPathName(newLocale)
  }

  return (
    <Link
      href={toggleLocale()}
      className="hidden sm:inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-700 hover:bg-black/5 transition-colors"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M2.5 12H21.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 2C14.5 5 16 8.5 16 12C16 15.5 14.5 19 12 22C9.5 19 8 15.5 8 12C8 8.5 9.5 5 12 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      {currentLocale === 'en' ? 'AR' : 'EN'}
    </Link>
  )
}
