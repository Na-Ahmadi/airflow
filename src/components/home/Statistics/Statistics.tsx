'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { StatisticsData } from '@/types';
import Container from '@/components/shared/Container';
import styles from './Statistics.module.css';

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
                <StatIcon name={item.icon} />
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

function StatIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactElement> = {
    clock:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    briefcase: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
    factory:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20v-8l-7-5v5l-7-5v5L2 7v13z"/><path d="M12 20v-5h4v5"/></svg>,
    globe:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
    smile:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  };
  return <div className={styles.svgWrap}>{icons[name] ?? null}</div>;
}
