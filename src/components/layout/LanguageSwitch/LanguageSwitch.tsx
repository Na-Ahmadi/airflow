'use client';

import { useLanguage, type Lang } from '@/context/LanguageContext';
import styles from './LanguageSwitch.module.css';

const languages: { code: Lang; label: string }[] = [
  { code: 'fa', label: 'FA' },
  { code: 'en', label: 'EN' },
];

interface LanguageSwitchProps {
  scrolled?: boolean;
  isHome?: boolean;
}

export default function LanguageSwitch({ scrolled, isHome = false }: LanguageSwitchProps) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={styles.langSwitch}
      {...(scrolled !== undefined ? { 'data-scrolled': String(scrolled) } : {})}
      data-home={String(isHome)}
    >
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={[styles.langBtn, lang === l.code ? styles.langActive : ''].filter(Boolean).join(' ')}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
