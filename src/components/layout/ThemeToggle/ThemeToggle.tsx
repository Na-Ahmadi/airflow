'use client';

import { useTheme } from '@/context/ThemeContext';
import Icon from '@/components/shared/Icon/Icon';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  scrolled?: boolean;
  isHome?: boolean;
}

const LABELS = {
  fa: { toLight: 'تغییر به حالت روشن', toDark: 'تغییر به حالت تاریک', light: 'حالت روشن', dark: 'حالت تاریک' },
  en: { toLight: 'Switch to light mode', toDark: 'Switch to dark mode', light: 'Light mode', dark: 'Dark mode' },
};

export default function ThemeToggle({ scrolled, isHome = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();
  const t = LABELS[lang];

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? t.toLight : t.toDark}
      title={theme === 'dark' ? t.light : t.dark}
      {...(scrolled !== undefined ? { 'data-scrolled': String(scrolled) } : {})}
      data-home={String(isHome)}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
    </button>
  );
}
