import '../globals.css'
import type { Locale } from "../../lib/i18n/config"
import { getDictionary } from "../../lib/i18n/dictionaries"
import localFont from 'next/font/local'
import { Toaster } from 'react-hot-toast'
import Providers from './providers'

const frutiger = localFont({
  src: [
    {
      path: '../fonts/FrutigerLTArabic45Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/FrutigerLTArabic55Roman.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/FrutigerLTArabic65Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/frutigerltarabic75black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-frutiger-arabic',
})

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
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  
  return (
    <html lang={locale} dir={dir}>
      <body className={`${frutiger.variable} font-sans antialiased`}>
        <Toaster position="top-center" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
