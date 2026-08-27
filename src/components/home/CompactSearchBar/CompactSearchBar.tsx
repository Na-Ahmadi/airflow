"use client";

import { useState } from "react";
import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import SearchOverlay from "@/components/shared/SearchOverlay/SearchOverlay";
import { useTranslations } from "next-intl";
import styles from "./CompactSearchBar.module.css";

export default function CompactSearchBar() {
  const t = useTranslations("compactSearchBar");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.section} aria-label={t("placeholder")}>
      <Container>
        <button
          type="button"
          className={styles.bar}
          onClick={() => setIsOpen(true)}
        >
          <Icon name="search" size={18} className={styles.icon} />
          <span className={styles.placeholder}>{t("placeholder")}</span>
        </button>
      </Container>

      <SearchOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
