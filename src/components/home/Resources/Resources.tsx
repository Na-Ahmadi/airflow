'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import type { ResourcesData, Resource } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle';
import Container from '@/components/shared/Container';
import styles from './Resources.module.css';

interface ResourcesProps { data: ResourcesData; }

export default function Resources({ data }: ResourcesProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.section} ref={ref} aria-label={data.section.title}>
      <Container>
        <div className={styles.sectionHeader}>
          <SectionTitle
            tag={data.section.tag}
            title={data.section.title}
            subtitle={data.section.subtitle}
            align="start"
          />
          <Link href={data.section.viewAll.href} className={styles.viewAll}>
            {data.section.viewAll.label} →
          </Link>
        </div>
        <div className={styles.grid}>
          {data.items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <ResourceCard resource={item} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link href={resource.href} className={styles.card} download={resource.type !== 'آنلاین'}>
      <div className={styles.cardTop}>
        <div className={styles.iconWrap}>
          <ResourceIcon name={resource.icon} />
        </div>
        <span className={styles.typeBadge}>{resource.type}</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{resource.title}</h3>
        <p className={styles.cardDesc}>{resource.description}</p>
      </div>
      {resource.size && <span className={styles.size}>{resource.size}</span>}
      <div className={styles.downloadIcon}><DownloadIcon /></div>
    </Link>
  );
}

function ResourceIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactElement> = {
    'file-pdf':     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    'file-dwg':     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><rect x="8" y="12" width="8" height="6" rx="1"/></svg>,
    'file-3d':      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 12l-4 2.5v5L12 22l4-2.5v-5L12 12z"/><path d="M8 14.5L12 17l4-2.5"/></svg>,
    'file-text':    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    'file-check':   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg>,
    'file-article': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
  };
  return <div className={styles.svgWrap}>{icons[name] ?? null}</div>;
}

function DownloadIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>; }
