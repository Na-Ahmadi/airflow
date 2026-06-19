'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { StatisticsData } from '@/types';
import Container from '@/components/shared/Container';
import styles from './Statistics.module.css';
import Icon from '@/components/shared/Icon';

interface StatisticsProps { data: StatisticsData; }

export default function Statistics({ data }: StatisticsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

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
                <div className={styles.svgWrap}><Icon name={item.icon} /></div>
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

function AnimatedCounter({ value, active }: { value: number; active: boolean }) {
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
      {display >= 1000 ? `${(display / 1000).toFixed(display % 1000 === 0 ? 0 : 1)}K` : display.toLocaleString('fa-IR')}
    </span>
  );
}
