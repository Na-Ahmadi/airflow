'use client';

import { useLanguage, type Lang } from '@/context/LanguageContext';
import styles from './LanguageSwitch.module.css';

const languages: { code: Lang; label: string }[] = [
  { code: 'fa', label: 'FA' },
  { code: 'en', label: 'EN' },
];

export default function LanguageSwitch() {
  const { lang, setLang } = useLanguage();

  return (
    <div className={styles.langSwitch}>
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
