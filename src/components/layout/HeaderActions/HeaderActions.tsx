"use client";

import LanguageSwitch from "@/components/layout/LanguageSwitch/LanguageSwitch";
import ThemeToggle from "@/components/layout/ThemeToggle/ThemeToggle";
import Button from "@/components/shared/Button/Button";
import styles from "./HeaderActions.module.css";

interface HeaderActionsProps {
  cta: { label: string; href: string };
  mobileOpen: boolean;
  onHamburgerClick: () => void;
  onCtaClick: React.MouseEventHandler<HTMLElement>;
  hamburgerLabel: string;
}

export default function HeaderActions({
  cta,
  mobileOpen,
  onHamburgerClick,
  onCtaClick,
  hamburgerLabel,
}: HeaderActionsProps) {
  return (
    <div className={styles.actions}>
      <LanguageSwitch />

      <ThemeToggle />

      <Button
        href={cta.href}
        variant="primary"
        size="sm"
        onClick={onCtaClick}
        className={styles.ctaBtn}
      >
        {cta.label}
      </Button>

      <button
        className={styles.hamburger}
        onClick={onHamburgerClick}
        aria-label={hamburgerLabel}
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
      >
        <span
          className={[styles.bar, mobileOpen ? styles.barOpen1 : ""]
            .filter(Boolean)
            .join(" ")}
        />
        <span
          className={[styles.bar, mobileOpen ? styles.barOpen2 : ""]
            .filter(Boolean)
            .join(" ")}
        />
        <span
          className={[styles.bar, mobileOpen ? styles.barOpen3 : ""]
            .filter(Boolean)
            .join(" ")}
        />
      </button>
    </div>
  );
}
