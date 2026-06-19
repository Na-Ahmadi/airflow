'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { NavData } from '@/types';
import styles from './Header.module.css';
import { SCROLL_THRESHOLD } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import Navigation from '@/components/layout/Navigation';
import Icon from '@/components/shared/Icon';

interface HeaderProps {
  data: NavData;
}

export default function Header({ data }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarInfo}>
            <span className={styles.topBarItem}>
              <Icon name="phone" size={14} />
              <a href={`tel:${data.topbar.phone}`}>{data.topbar.phone}</a>
            </span>
            <span className={styles.topBarItem}>
              <Icon name="mail" size={14} />
              <a href={`mailto:${data.topbar.email}`}>{data.topbar.email}</a>
            </span>
          </div>
          <div className={styles.topBarAddress}>
            <Icon name="location" size={14} />
            <span>{data.topbar.address}</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          {/* Logo */}
          <Link href={data.logo.href} className={styles.logo}>
            <div className={styles.logoIcon}>
              <Image src="/icons/airflow-logo.svg" width={32} height={32} alt="" aria-hidden />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>{data.logo.text}</span>
              <span className={styles.logoTagline}>{data.logo.tagline}</span>
            </div>
          </Link>

          {/* Navigation */}
          <Navigation
            items={data.items}
            activeDropdown={activeDropdown}
            onDropdownEnter={setActiveDropdown}
            onDropdownLeave={() => setActiveDropdown(null)}
            isActive={isActive}
            mobileOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
            cta={data.cta}
          />

          {/* Actions */}
          <div className={styles.actions}>
            <div className={styles.langSwitch}>
              {data.languages.map((lang) => (
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
            <Link href={data.cta.href} className={styles.ctaBtn}>
              {data.cta.label}
            </Link>
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="منو"
              aria-expanded={mobileOpen}
            >
              <span className={[styles.bar, mobileOpen ? styles.barOpen1 : ''].filter(Boolean).join(' ')} />
              <span className={[styles.bar, mobileOpen ? styles.barOpen2 : ''].filter(Boolean).join(' ')} />
              <span className={[styles.bar, mobileOpen ? styles.barOpen3 : ''].filter(Boolean).join(' ')} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
