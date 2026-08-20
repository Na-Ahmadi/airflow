"use client";

import { useState } from "react";
import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import SearchOverlay from "@/components/shared/SearchOverlay/SearchOverlay";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./CompactSearchBar.module.css";

const COPY = {
  fa: { placeholder: "جستجوی محصول یا کد محصول…" },
  en: { placeholder: "Search product or product code…" },
} as const;

export default function CompactSearchBar() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.section} aria-label={COPY[lang].placeholder}>
      <Container>
        <button
          type="button"
          className={styles.bar}
          onClick={() => setIsOpen(true)}
        >
          <Icon name="search" size={18} className={styles.icon} />
          <span className={styles.placeholder}>{COPY[lang].placeholder}</span>
        </button>
      </Container>

      <SearchOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
