'use client';

import LanguageSwitch from '@/components/layout/LanguageSwitch/LanguageSwitch';
import ThemeToggle from '@/components/layout/ThemeToggle/ThemeToggle';
import styles from './HeaderActions.module.css';

interface HeaderActionsProps {
  cta: { label: string; href: string };
  mobileOpen: boolean;
  onHamburgerClick: () => void;
  onCtaClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function HeaderActions({
  cta,
  mobileOpen,
  onHamburgerClick,
  onCtaClick,
}: HeaderActionsProps) {
  return (
    <div className={styles.actions}>
      <LanguageSwitch />

      <ThemeToggle />

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
