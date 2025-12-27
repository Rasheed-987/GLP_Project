import './globals.css'
import type { Locale } from "../lib/i18n/config"
import { getDictionary } from '../lib/i18n/dictionaries'
import localFont from 'next/font/local'
import ToasterProvider from './components/ToasterProvider' 
import Providers from  './[lang]/providers'


const frutiger = localFont({  
  src: [
    { path: '../app/fonts/FrutigerLTArabic45Light.ttf', weight: '300' },
    { path: '../app/fonts/FrutigerLTArabic55Roman.ttf', weight: '400' },
    { path: '../app/fonts/FrutigerLTArabic65Bold.ttf', weight: '700' },
    { path: '../app/fonts/frutigerltarabic75black.ttf', weight: '900' },
  ],
  variable: '--font-frutiger-arabic',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
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
