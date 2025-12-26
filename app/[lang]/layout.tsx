import '../globals.css'
import type { Locale } from "../../lib/i18n/config"
import { getDictionary } from "../../lib/i18n/dictionaries"
import DirectionProvider from '../components/DirectionProvider'
import Providers from './providers'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)

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
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  return (
    <Providers>
      <DirectionProvider lang={lang}>
        {children}
      </DirectionProvider>
    </Providers>
  )
}
