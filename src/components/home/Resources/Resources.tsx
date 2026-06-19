'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import type { ResourcesData, Resource } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle/SectionTitle';
import Container from '@/components/shared/Container/Container';
import Icon from '@/components/shared/Icon/Icon';
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
          <div className={styles.svgWrap}><Icon name={resource.icon} /></div>
        </div>
        <span className={styles.typeBadge}>{resource.type}</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{resource.title}</h3>
        <p className={styles.cardDesc}>{resource.description}</p>
      </div>
      {resource.size && <span className={styles.size}>{resource.size}</span>}
      <div className={styles.downloadIcon}><Icon name="download" size={18} /></div>
    </Link>
  );
}
