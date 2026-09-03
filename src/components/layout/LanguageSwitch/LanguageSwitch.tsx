'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import styles from './LanguageSwitch.module.css';

/* nativeName is shown in the roomier menu variant, where a bare "FA" reads as
   a code rather than a language. */
const languages: { code: Locale; label: string; nativeName: string }[] = [
  { code: 'fa', label: 'FA', nativeName: 'فارسی' },
  { code: 'en', label: 'EN', nativeName: 'English' },
];

interface LanguageSwitchProps {
  scrolled?: boolean;
  isHome?: boolean;
  /** "lg" gives full-width, touch-sized buttons for the mobile menu. */
  size?: 'sm' | 'lg';
  /** Fires after a language is picked — lets the mobile menu close itself. */
  onSelect?: () => void;
}

export default function LanguageSwitch({ scrolled, isHome = false, size = 'sm', onSelect }: LanguageSwitchProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={[styles.langSwitch, size === 'lg' ? styles.lg : ''].filter(Boolean).join(' ')}
      {...(scrolled !== undefined ? { 'data-scrolled': String(scrolled) } : {})}
      data-home={String(isHome)}
    >
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          aria-current={locale === l.code}
          onClick={() => {
            router.replace(pathname, { locale: l.code });
            onSelect?.();
          }}
          className={[styles.langBtn, locale === l.code ? styles.langActive : ''].filter(Boolean).join(' ')}
        >
          <span className={styles.code}>{l.label}</span>
          {size === 'lg' && <span className={styles.name}>{l.nativeName}</span>}
        </button>
      ))}
    </div>
  );
}
