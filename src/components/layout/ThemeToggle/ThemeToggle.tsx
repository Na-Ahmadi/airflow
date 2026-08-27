'use client';

import { useTheme } from '@/context/ThemeContext';
import Icon from '@/components/shared/Icon/Icon';
import { useTranslations } from 'next-intl';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  scrolled?: boolean;
  isHome?: boolean;
}

export default function ThemeToggle({ scrolled, isHome = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('themeToggle');

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? t('toLight') : t('toDark')}
      title={theme === 'dark' ? t('light') : t('dark')}
      {...(scrolled !== undefined ? { 'data-scrolled': String(scrolled) } : {})}
      data-home={String(isHome)}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
    </button>
  );
}
