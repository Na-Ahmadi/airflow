'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavItem } from '@/types';
import styles from './Navigation.module.css';
import NavItemDesktop from '@/components/layout/NavItemDesktop';
import NavItemMobile from '@/components/layout/NavItemMobile';

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
                <NavItemMobile
                  key={item.id}
                  item={item}
                  index={i}
                  isActive={isActive(item.href)}
                  onClose={onClose}
                />
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
