'use client';

import type { NavItem } from '@/types';
import styles from './Navigation.module.css';
import NavItemDesktop from '@/components/layout/NavItemDesktop/NavItemDesktop';

interface NavigationProps {
  items: NavItem[];
  activeDropdown: string | null;
  onDropdownEnter: (id: string) => void;
  onDropdownLeave: () => void;
  isActive: (href: string) => boolean;
  isHome?: boolean;
}

export default function Navigation({
  items,
  activeDropdown,
  onDropdownEnter,
  onDropdownLeave,
  isActive,
  isHome = false,
}: NavigationProps) {
  return (
    <ul className={styles.desktopMenu} role="list">
      {items.map((item) => (
        <li key={item.id}>
          <NavItemDesktop
            item={item}
            isActive={isActive(item.href)}
            dropdownOpen={activeDropdown === item.id}
            onMouseEnter={() => item.children && onDropdownEnter(item.id)}
            onMouseLeave={onDropdownLeave}
            isHome={isHome}
          />
        </li>
      ))}
    </ul>
  );
}
