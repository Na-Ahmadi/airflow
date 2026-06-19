import styles from './LanguageSwitch.module.css';

export interface Language {
  code: string;
  label: string;
  active: boolean;
}

interface LanguageSwitchProps {
  languages: Language[];
}

export default function LanguageSwitch({ languages }: LanguageSwitchProps) {
  return (
    <div className={styles.langSwitch}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={[styles.langBtn, lang.active ? styles.langActive : ''].filter(Boolean).join(' ')}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
