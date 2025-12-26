import '../globals.css'
import type { Locale } from "../../lib/i18n/config"
import { getDictionary } from "../../lib/i18n/dictionaries"
import DirectionProvider from '../components/DirectionProvider'
import Providers from './providers'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  return (
    <Providers>
      <DirectionProvider lang={locale}>
        {children}
      </DirectionProvider>
    </Providers>
  )
}
