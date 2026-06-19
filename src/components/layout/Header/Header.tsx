'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavData } from '@/types';
import styles from './Header.module.css';
import { SCROLL_THRESHOLD } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import Navigation from '@/components/layout/Navigation';

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
              <PhoneIcon />
              <a href={`tel:${data.topbar.phone}`}>{data.topbar.phone}</a>
            </span>
            <span className={styles.topBarItem}>
              <MailIcon />
              <a href={`mailto:${data.topbar.email}`}>{data.topbar.email}</a>
            </span>
          </div>
          <div className={styles.topBarAddress}>
            <LocationIcon />
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
              <AirflowIcon />
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
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
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

function AirflowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="8" fill="url(#lg1)" />
      <path d="M8 16C8 16 10 10 16 10C22 10 24 16 24 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 19C8 19 10 22 16 22C22 22 24 19 24 19" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2" fill="white" />
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#1e6fcf" />
          <stop offset="1" stopColor="#00d4ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PhoneIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016.09 17.9l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>;
}

function MailIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
}

function LocationIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>;
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
