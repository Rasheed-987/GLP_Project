import '../globals.css'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import DirectionProvider from '../components/DirectionProvider'

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const dict = await getDictionary(lang)
  
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  }
}

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <DirectionProvider lang={lang}>
      {children}
    </DirectionProvider>
  )
}
