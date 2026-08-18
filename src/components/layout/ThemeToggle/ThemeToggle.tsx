'use client';

import { useTheme } from '@/context/ThemeContext';
import Icon from '@/components/shared/Icon/Icon';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  scrolled?: boolean;
  isHome?: boolean;
}

export default function ThemeToggle({ scrolled, isHome = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'}
      title={theme === 'dark' ? 'حالت روشن' : 'حالت تاریک'}
      {...(scrolled !== undefined ? { 'data-scrolled': String(scrolled) } : {})}
      data-home={String(isHome)}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
    </button>
  );
}
