'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/shared/Container';
import styles from './AboutHero.module.css';

interface Stat { id: string; icon: string; value: string; label: string; }
interface Props {
  breadcrumb: { label: string; href: string }[];
  title: string;
  paragraphs: string[];
  button: { label: string; href: string };
  image: string;
  stats: Stat[];
}

export default function AboutHero({ breadcrumb, title, paragraphs, button, image, stats }: Props) {
  return (
    <>
      {/* Breadcrumb */}
      <div className={styles.pageHeader}>
        <Container>
          <nav className={styles.breadcrumb} aria-label="breadcrumb">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} style={{ display: 'contents' }}>
                {i > 0 && <span className={styles.sep}>/</span>}
                {i < breadcrumb.length - 1
                  ? <Link href={crumb.href}>{crumb.label}</Link>
                  : <span>{crumb.label}</span>}
              </span>
            ))}
          </nav>
        </Container>
      </div>

      {/* Hero — DOM order: [image | text | stats]
          With direction:rtl renders as: stats(LEFT) · text(CENTER) · image(RIGHT) */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.grid}>

            {/* RIGHT column: building image */}
            <div className={`${styles.imgWrap} ${styles.animSlideRight}`}>
              <Image
                src={image}
                alt="ابرفلو سیستم"
                fill
                className={styles.img}
                sizes="(max-width: 1024px) 100vw, 340px"
                priority
              />
            </div>

            {/* CENTER column: title + text + button */}
            <div className={`${styles.content} ${styles.animFadeUp}`}>
              <h1 className={styles.title}>{title}</h1>
              {paragraphs.map((p, i) => (
                <p key={i} className={styles.para}>{p}</p>
              ))}
              <Link href={button.href} className={styles.btn}>{button.label}</Link>
            </div>

            {/* LEFT column: 2×2 stats grid */}
            <div className={`${styles.statsGrid} ${styles.animSlideLeft}`}>
              {stats.map((s) => (
                <div key={s.id} className={styles.statCard}>
                  <div className={styles.statIcon}><StatIcon name={s.icon} /></div>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}

function StatIcon({ name }: { name: string }) {
  const map: Record<string, React.ReactElement> = {
    gear: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    ),
    cog: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    diamond: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 9 12 22 22 9"/>
        <polyline points="2 9 12 13 22 9"/>
        <line x1="12" y1="2" x2="12" y2="13"/>
      </svg>
    ),
  };
  return <div className={styles.iconSvg}>{map[name] ?? null}</div>;
}
