'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { NavItem } from '@/types';
import styles from './NavItemMobile.module.css';

interface NavItemMobileProps {
  item: NavItem;
  index: number;
  isActive: boolean;
  onClose: () => void;
  onHashClick?: (hash: string) => React.MouseEventHandler<HTMLElement>;
}

export default function NavItemMobile({ item, index, isActive, onClose, onHashClick }: NavItemMobileProps) {
  const isHash = item.href.startsWith('#');
  return (
    <motion.li
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Link
        href={item.href}
        className={[styles.mobileLink, isActive ? styles.mobileLinkActive : ''].filter(Boolean).join(' ')}
        onClick={isHash ? onHashClick?.(item.href) : onClose}
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
    </motion.li>
  );
}
