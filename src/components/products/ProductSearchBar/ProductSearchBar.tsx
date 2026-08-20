"use client";

import Icon from "@/components/shared/Icon/Icon";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ProductSearchBar.module.css";

const COPY = {
  fa: { placeholder: "جستجوی نام محصول یا کد محصول…", clear: "پاک کردن" },
  en: { placeholder: "Search by product name or product code…", clear: "Clear" },
} as const;

interface ProductSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearchBar({ value, onChange }: ProductSearchBarProps) {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <div className={styles.wrap}>
      <Icon name="search" size={22} className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.placeholder}
        className={styles.input}
        aria-label={t.placeholder}
      />
      {value && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={() => onChange("")}
          aria-label={t.clear}
        >
          <Icon name="x" size={18} />
        </button>
      )}
    </div>
  );
}
