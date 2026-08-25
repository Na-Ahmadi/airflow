"use client";

import Icon from "@/components/shared/Icon/Icon";
import type { NavItem } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import styles from "./NavItemDesktop.module.css";

interface NavItemDesktopProps {
  item: NavItem;
  isActive: boolean;
  dropdownOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHome?: boolean;
  scrolled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export default function NavItemDesktop({
  item,
  isActive,
  dropdownOpen,
  onMouseEnter,
  onMouseLeave,
  isHome = false,
  scrolled = false,
  onClick,
}: NavItemDesktopProps) {
  return (
    <div
      className={[
        styles.menuItem,
        isHome && !scrolled ? styles.onHome : styles.onInner,
      ].join(" ")}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={item.href}
        onClick={onClick}
        className={[styles.menuLink, isActive ? styles.active : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {item.label}
        {item.children && <Icon name="chevron-down" size={14} />}
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
              <Link
                key={child.href}
                href={child.href}
                className={styles.dropdownItem}
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
