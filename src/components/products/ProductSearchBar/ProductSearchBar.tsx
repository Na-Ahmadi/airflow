"use client";

import Icon from "@/components/shared/Icon/Icon";
import { useTranslations } from "next-intl";
import styles from "./ProductSearchBar.module.css";

interface ProductSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearchBar({ value, onChange }: ProductSearchBarProps) {
  const t = useTranslations("productSearchBar");

  return (
    <div className={styles.wrap}>
      <Icon name="search" size={22} className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("placeholder")}
        className={styles.input}
        aria-label={t("placeholder")}
      />
      {value && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={() => onChange("")}
          aria-label={t("clear")}
        >
          <Icon name="x" size={18} />
        </button>
      )}
    </div>
  );
}
