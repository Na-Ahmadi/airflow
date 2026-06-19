'use client';

import type { NavItem } from '@/types';
import styles from './Navigation.module.css';
import NavItemDesktop from '@/components/layout/NavItemDesktop';

interface NavigationProps {
  items: NavItem[];
  activeDropdown: string | null;
  onDropdownEnter: (id: string) => void;
  onDropdownLeave: () => void;
  isActive: (href: string) => boolean;
}

export default function Navigation({
  items,
  activeDropdown,
  onDropdownEnter,
  onDropdownLeave,
  isActive,
}: NavigationProps) {
  return (
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
  );
}
