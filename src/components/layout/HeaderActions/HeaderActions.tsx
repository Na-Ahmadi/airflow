'use client';

import Icon from '@/components/shared/Icon';
import { useTheme } from '@/context/ThemeContext';
import styles from './HeaderActions.module.css';

interface Language {
  code: string;
  label: string;
  active: boolean;
}

interface HeaderActionsProps {
  languages: Language[];
  cta: { label: string; href: string };
  mobileOpen: boolean;
  onHamburgerClick: () => void;
  onCtaClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function HeaderActions({
  languages,
  cta,
  mobileOpen,
  onHamburgerClick,
  onCtaClick,
}: HeaderActionsProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.actions}>
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

      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'}
        title={theme === 'dark' ? 'حالت روشن' : 'حالت تاریک'}
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
      </button>

      <a href={cta.href} className={styles.ctaBtn} onClick={onCtaClick}>
        {cta.label}
      </a>

      <button
        className={styles.hamburger}
        onClick={onHamburgerClick}
        aria-label="منو"
        aria-expanded={mobileOpen}
      >
        <span className={[styles.bar, mobileOpen ? styles.barOpen1 : ''].filter(Boolean).join(' ')} />
        <span className={[styles.bar, mobileOpen ? styles.barOpen2 : ''].filter(Boolean).join(' ')} />
        <span className={[styles.bar, mobileOpen ? styles.barOpen3 : ''].filter(Boolean).join(' ')} />
      </button>
    </div>
  );
}
