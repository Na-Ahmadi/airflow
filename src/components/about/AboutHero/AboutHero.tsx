'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/shared/Container';
import Icon from '@/components/shared/Icon';
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
                  <div className={styles.statIcon}><div className={styles.iconSvg}><Icon name={s.icon} /></div></div>
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
