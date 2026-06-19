"use client";

import type { PartnersData } from "@/types";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./Partners.module.css";

interface PartnersProps {
  data: PartnersData;
}

export default function Partners({ data }: PartnersProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  // Duplicate items for infinite loop
  const items = [...data.items, ...data.items];

  return (
    <section className={styles.section} ref={ref} aria-label="شرکای تجاری">
      <div className={styles.inner}>
        <motion.p
          className={styles.label}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {data.title}
        </motion.p>
        <div className={styles.track} aria-hidden>
          <div className={styles.marquee}>
            {items.map((partner, i) => (
              <div key={`${partner.id}-${i}`} className={styles.partnerItem}>
                <PartnerLogo name={partner.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerLogo({ name }: { name: string }) {
  return (
    <div className={styles.logoBox}>
      <span className={styles.logoText}>{name}</span>
    </div>
  );
}
