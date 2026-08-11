"use client";

import AnimatedCounter from "@/components/shared/AnimatedCounter/AnimatedCounter";
import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import type { StatisticsData } from "@/types";
import { motion } from "framer-motion";
import styles from "./Statistics.module.css";

interface StatisticsProps {
  data: StatisticsData;
}

export default function Statistics({ data }: StatisticsProps) {
  const { ref, inView } = useInViewOnce<HTMLElement>();

  return (
    <section className={styles.section} ref={ref} aria-label="آمار و ارقام">
      <div className={styles.bgDecor} aria-hidden />
      <Container>
        <div className={styles.grid}>
          {data.items.map((item, i) => (
            <motion.div
              key={item.id}
              className={styles.item}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.iconWrap}>
                <div className={styles.svgWrap}>
                  <Icon name={item.icon} />
                </div>
              </div>
              <div className={styles.itemContent}>
                <div className={styles.valueWrap}>
                  <AnimatedCounter value={item.numericValue} active={inView} />
                  <span className={styles.suffix}>{item.suffix}</span>
                </div>
                <span className={styles.label}>{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
