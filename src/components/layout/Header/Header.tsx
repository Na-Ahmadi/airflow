'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavData } from '@/types';
import styles from './Header.module.css';
import { SCROLL_THRESHOLD } from '@/constants';
import HeaderActions from '@/components/layout/HeaderActions';
import Navigation from '@/components/layout/Navigation';
import NavItemMobile from '@/components/layout/NavItemMobile';
import TopBar from '@/components/layout/TopBar';

interface HeaderProps {
  data: NavData;
}

export default function Header({ data }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const closeMobileMenu = () => {
    document.body.style.overflow = '';
    setMobileOpen(false);
  };

  const scrollToCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.querySelector(data.cta.href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMobileMenu();
    setTimeout(() => {
      document.querySelector(data.cta.href)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

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
      <TopBar
        phone={data.topbar.phone}
        email={data.topbar.email}
        address={data.topbar.address}
        scrolled={scrolled}
      />

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
          />

          <HeaderActions
            languages={data.languages}
            cta={data.cta}
            mobileOpen={mobileOpen}
            onHamburgerClick={() => setMobileOpen(!mobileOpen)}
            onCtaClick={scrollToCta}
          />
        </div>

        {/* Mobile Menu — outside navInner so it expands below the nav bar */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.mobileMenuInner}>
                {data.items.map((item, i) => (
                  <NavItemMobile
                    key={item.id}
                    item={item}
                    index={i}
                    isActive={isActive(item.href)}
                    onClose={closeMobileMenu}
                  />
                ))}
                <a href={data.cta.href} className={styles.mobileCta} onClick={handleMobileCta}>
                  {data.cta.label}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
