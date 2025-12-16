import type { Locale } from '../config'

const dictionaries = {
  en: () => import('./en').then((module) => module.default),
  ar: () => import('./ar').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en()
