export function pickLocale<T>(bilingual: { fa: T; en: T }, locale: 'fa' | 'en'): T {
  return bilingual[locale];
}
