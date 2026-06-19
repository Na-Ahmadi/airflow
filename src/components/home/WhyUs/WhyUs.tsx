'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { WhyUsData } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle';
import Container from '@/components/shared/Container';
import styles from './WhyUs.module.css';

interface WhyUsProps { data: WhyUsData; }

export default function WhyUs({ data }: WhyUsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.section} ref={ref} aria-label={data.section.title}>
      <Container>
        <SectionTitle
          tag={data.section.tag}
          title={data.section.title}
          subtitle={data.section.subtitle}
        />
        <div className={styles.grid}>
          {data.items.map((item, i) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className={styles.cardGlow} aria-hidden />
              <div className={styles.iconWrap}>
                <WhyIcon name={item.icon} />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
              <div className={styles.cardBorder} aria-hidden />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WhyIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactElement> = {
    'shield-check': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
    'cog':          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14M19.07 4.93L12 12m7.07 7.07L12 12M4.93 4.93L12 12m-7.07 7.07L12 12"/><circle cx="12" cy="12" r="10"/></svg>,
    'factory':      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20v-8l-7-5v5l-7-5v5L2 7v13z"/><path d="M12 20v-5h4v5"/></svg>,
    'truck':        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    'headset':      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>,
  };
  return <div className={styles.svgWrap}>{icons[name] ?? null}</div>;
}
