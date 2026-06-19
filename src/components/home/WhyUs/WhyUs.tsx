'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { WhyUsData } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle';
import Container from '@/components/shared/Container';
import styles from './WhyUs.module.css';
import Icon from '@/components/shared/Icon';

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
                <div className={styles.svgWrap}><Icon name={item.icon} /></div>
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
