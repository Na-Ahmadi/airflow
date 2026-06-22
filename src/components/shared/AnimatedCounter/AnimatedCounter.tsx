"use client";

import { useEffect, useState } from "react";
import styles from "./AnimatedCounter.module.css";

interface AnimatedCounterProps {
  value: number;
  active: boolean;
}

export default function AnimatedCounter({ value, active }: AnimatedCounterProps) {
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

  return (
    <span className={styles.value}>
      {display >= 1000
        ? `${(display / 1000).toFixed(display % 1000 === 0 ? 0 : 1)}K`
        : display.toLocaleString("fa-IR")}
    </span>
  );
}
