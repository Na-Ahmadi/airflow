'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import styles from './LanguageSwitch.module.css';

const languages: { code: Locale; label: string }[] = [
  { code: 'fa', label: 'FA' },
  { code: 'en', label: 'EN' },
];

interface LanguageSwitchProps {
  scrolled?: boolean;
  isHome?: boolean;
}

export default function LanguageSwitch({ scrolled, isHome = false }: LanguageSwitchProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={styles.langSwitch}
      {...(scrolled !== undefined ? { 'data-scrolled': String(scrolled) } : {})}
      data-home={String(isHome)}
    >
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => router.replace(pathname, { locale: l.code })}
          className={[styles.langBtn, locale === l.code ? styles.langActive : ''].filter(Boolean).join(' ')}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
