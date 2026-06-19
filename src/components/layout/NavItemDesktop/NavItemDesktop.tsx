'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavItem } from '@/types';
import styles from './NavItemDesktop.module.css';

interface NavItemDesktopProps {
  item: NavItem;
  isActive: boolean;
  dropdownOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function NavItemDesktop({
  item,
  isActive,
  dropdownOpen,
  onMouseEnter,
  onMouseLeave,
}: NavItemDesktopProps) {
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

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
