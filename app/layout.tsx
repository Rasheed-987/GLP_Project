import './globals.css'
 import type { Locale } from "../lib/i18n/config"
  import { getDictionary } from '../lib/i18n/dictionaries'
   import localFont from 'next/font/local' 
   import ToasterProvider from './components/ToasterProvider'
    import Providers from './[lang]/providers'
    
const frutiger = localFont({
  src: [
    { path: '../fonts/FrutigerLTArabic45Light.ttf', weight: '300' },
    { path: '../fonts/FrutigerLTArabic55Roman.ttf', weight: '400' },
    { path: '../fonts/FrutigerLTArabic65Bold.ttf', weight: '700' },
    { path: '../fonts/frutigerltarabic75black.ttf', weight: '900' },
  ],
  variable: '--font-frutiger-arabic',
})

/* ✅ generateMetadata — params is NOT a Promise */
export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}) {
  const locale = params.lang as Locale
  const dict = await getDictionary(locale)

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  }
}

/* ✅ layout — params is NOT a Promise */
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const locale = params.lang as Locale
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <div
      lang={locale}
      dir={dir}
      className={`${frutiger.variable} font-sans antialiased`}
    >
      <ToasterProvider />
      <Providers>{children}</Providers>
    </div>
  )
}
