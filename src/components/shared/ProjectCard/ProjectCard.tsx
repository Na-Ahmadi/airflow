'use client';

import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/shared/Badge';
import Icon from '@/components/shared/Icon';
import type { Project } from '@/types';
import styles from './ProjectCard.module.css';

interface Props {
  project: Project;
  variant?: 'carousel' | 'grid';
}

const PLACEHOLDER_COLORS = ['#0a1e3d', '#0d2444', '#081528', '#0e2040'];

export default function ProjectCard({ project, variant = 'grid' }: Props) {
  const isCarousel = variant === 'carousel';

  return (
    <Link href={project.href} className={`${styles.card} ${isCarousel ? styles.carousel : styles.grid}`}>
      <div className={styles.imgWrap}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={styles.img}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div
          className={styles.placeholder}
          style={{ background: PLACEHOLDER_COLORS[project.title.length % PLACEHOLDER_COLORS.length] }}
          aria-hidden
        >
          <Icon name="building" size={isCarousel ? 48 : 56} style={{ color: 'rgba(30,111,207,0.4)' }} />
          {isCarousel && <span>{project.title}</span>}
        </div>
        <div className={styles.overlay} aria-hidden />
        {isCarousel ? (
          <div className={styles.overlayContent}>
            <Badge variant="accent">{project.category}</Badge>
            <div className={styles.overlayMeta}>
              <Icon name="location" size={14} />
              <span>{project.location}</span>
            </div>
          </div>
        ) : (
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <div className={styles.cardMeta}>
              <Icon name="location" size={13} />
              <span>{project.location}</span>
            </div>
            <span className={styles.cardLink}>
              <Icon name="arrow-right" size={14} />
              مشاهده جزئیات
            </span>
          </div>
        )}
      </div>
      {isCarousel && (
        <div className={styles.cardBody}>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={styles.link}>مشاهده مطالعه موردی →</span>
        </div>
      )}
    </Link>
  );
}
