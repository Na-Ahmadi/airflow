'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavItem } from '@/types';
import styles from './Navigation.module.css';

interface NavigationProps {
  items: NavItem[];
  activeDropdown: string | null;
  onDropdownEnter: (id: string) => void;
  onDropdownLeave: () => void;
  isActive: (href: string) => boolean;
  mobileOpen: boolean;
  onClose: () => void;
  cta: { label: string; href: string };
}

export default function Navigation({
  items,
  activeDropdown,
  onDropdownEnter,
  onDropdownLeave,
  isActive,
  mobileOpen,
  onClose,
  cta,
}: NavigationProps) {
  return (
    <>
      {/* Desktop Menu */}
      <div className={styles.desktopMenu}>
        {items.map((item) => (
          <NavItemDesktop
            key={item.id}
            item={item}
            isActive={isActive(item.href)}
            dropdownOpen={activeDropdown === item.id}
            onMouseEnter={() => item.children && onDropdownEnter(item.id)}
            onMouseLeave={onDropdownLeave}
          />
        ))}
      </div>

      {/* Mobile Menu */}
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
              {items.map((item, i) => (
                <NavItemMobile key={item.id} item={item} index={i} isActive={isActive(item.href)} onClose={onClose} />
              ))}
              <Link href={cta.href} className={styles.mobileCta} onClick={onClose}>
                {cta.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface NavItemDesktopProps {
  item: NavItem;
  isActive: boolean;
  dropdownOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function NavItemDesktop({ item, isActive, dropdownOpen, onMouseEnter, onMouseLeave }: NavItemDesktopProps) {
  return (
    <div className={styles.menuItem} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Link
        href={item.href}
        className={[styles.menuLink, isActive ? styles.active : ''].filter(Boolean).join(' ')}
      >
        {item.label}
        {item.children && <ChevronIcon />}
      </Link>
      <AnimatePresence>
        {item.children && dropdownOpen && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            {item.children.map((child) => (
              <Link key={child.href} href={child.href} className={styles.dropdownItem}>
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface NavItemMobileProps {
  item: NavItem;
  index: number;
  isActive: boolean;
  onClose: () => void;
}

function NavItemMobile({ item, index, isActive, onClose }: NavItemMobileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Link
        href={item.href}
        className={[styles.mobileLink, isActive ? styles.mobileLinkActive : ''].filter(Boolean).join(' ')}
        onClick={onClose}
      >
        {item.label}
      </Link>
      {item.children && (
        <div className={styles.mobileSubMenu}>
          {item.children.map((child) => (
            <Link key={child.href} href={child.href} className={styles.mobileSubLink} onClick={onClose}>
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
