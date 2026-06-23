'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavData } from '@/types';
import styles from './Header.module.css';
import { SCROLL_THRESHOLD } from '@/constants';
import HeaderActions from '@/components/layout/HeaderActions/HeaderActions';
import Navigation from '@/components/layout/Navigation/Navigation';
import Button from '@/components/shared/Button/Button';
import NavItemMobile from '@/components/layout/NavItemMobile/NavItemMobile';
import TopBar from '@/components/layout/TopBar/TopBar';
import Logo from '@/components/layout/Logo/Logo';
import { useLanguage } from '@/context/LanguageContext';
import navRaw from '@/data/navigation.json';

type BillingualNav = { fa: NavData; en: NavData };

export default function Header() {
  const { lang } = useLanguage();
  const data = (navRaw as unknown as BillingualNav)[lang];
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

  const scrollToCta: React.MouseEventHandler<HTMLElement> = (e) => {
    const target = document.querySelector(data.cta.href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileCta: React.MouseEventHandler<HTMLElement> = (e) => {
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
    <header className={[styles.header, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')} data-home={pathname === '/' ? 'true' : 'false'}>
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
          <Logo
            name={data.logo.text}
            subtitle={data.logo.tagline}
            href={data.logo.href}
            scrolled={scrolled}
            isHome={pathname === '/'}
          />

          {/* Navigation */}
          <Navigation
            items={data.items}
            activeDropdown={activeDropdown}
            onDropdownEnter={setActiveDropdown}
            onDropdownLeave={() => setActiveDropdown(null)}
            isActive={isActive}
          />

          <HeaderActions
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
                <Button href={data.cta.href} variant="primary" size="md" fullWidth onClick={handleMobileCta} className={styles.mobileCta}>
                  {data.cta.label}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
