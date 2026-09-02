"use client";

import Button from "@/components/shared/Button/Button";
import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import Image from "next/image";
import styles from "./AboutHero.module.css";

interface Stat {
  id: string;
  icon: string;
  value: string;
  label: string;
}
interface Props {
  title: string;
  paragraphs: string[];
  button: { label: string; href: string };
  image: string;
  imageAlt: string;
  stats: Stat[];
}

export default function AboutHero({
  title,
  paragraphs,
  button,
  image,
  imageAlt,
  stats,
}: Props) {
  return (
    <>
      {/* Hero — DOM order: [image | text | stats]
          With direction:rtl renders as: stats(LEFT) · text(CENTER) · image(RIGHT) */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.grid}>
            {/* RIGHT column: building image */}
            <div className={`${styles.imgWrap} ${styles.animSlideRight}`}>
              <Image
                src={image}
                alt={imageAlt}
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
                <p key={i} className={styles.para}>
                  {p}
                </p>
              ))}
              <Button href={button.href} className={styles.btn}>
                {button.label}
              </Button>
            </div>
            {/* LEFT column: 2×2 stats grid */}
            <div className={`${styles.statsGrid} ${styles.animSlideLeft}`}>
              {stats.map((s) => (
                <div key={s.id} className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <div className={styles.iconSvg}>
                      <Icon name={s.icon} />
                    </div>
                  </div>
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
