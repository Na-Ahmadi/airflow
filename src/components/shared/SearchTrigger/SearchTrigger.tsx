"use client";

import { useState } from "react";
import Icon from "@/components/shared/Icon/Icon";
import SearchOverlay from "@/components/shared/SearchOverlay/SearchOverlay";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./SearchTrigger.module.css";

interface SearchTriggerProps {
  scrolled?: boolean;
  isHome?: boolean;
}

export default function SearchTrigger({ scrolled, isHome = false }: SearchTriggerProps) {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const label = lang === "fa" ? "جستجو" : "Search";

  return (
    <>
      <button
        type="button"
        className={styles.searchToggle}
        onClick={() => setIsOpen(true)}
        aria-label={label}
        title={label}
        {...(scrolled !== undefined ? { "data-scrolled": String(scrolled) } : {})}
        data-home={String(isHome)}
      >
        <Icon name="search" size={18} />
      </button>

      <SearchOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
