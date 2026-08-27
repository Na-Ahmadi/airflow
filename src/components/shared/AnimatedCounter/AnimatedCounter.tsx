"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { BCP47 } from "@/i18n/bcp47";
import styles from "./AnimatedCounter.module.css";

interface AnimatedCounterProps {
  value: number;
  active: boolean;
  className?: string;
  formatValue?: (display: number) => string;
}

export default function AnimatedCounter({ value, active, className, formatValue }: AnimatedCounterProps) {
  const locale = useLocale() as Locale;
  const [display, setDisplay] = useState(0);
  const duration = 2000;

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, value]);

  const text = formatValue
    ? formatValue(display)
    : display >= 1000
      ? `${(display / 1000).toFixed(display % 1000 === 0 ? 0 : 1)}K`
      : display.toLocaleString(BCP47[locale]);

  return <span className={className ?? styles.value}>{text}</span>;
}
