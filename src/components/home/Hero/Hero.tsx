"use client";

import AnimatedCounter from "@/components/shared/AnimatedCounter/AnimatedCounter";
import Button from "@/components/shared/Button/Button";
import Icon from "@/components/shared/Icon/Icon";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import type { HeroData } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

interface HeroProps {
  data: HeroData;
}

function formatStatValue(display: number, sample: string) {
  if (sample.includes("M")) {
    return `${(display / 1000000).toLocaleString("fa-IR", { maximumFractionDigits: 1 })}M`;
  }
  return display.toLocaleString("fa-IR");
}

export default function Hero({ data }: HeroProps) {
  const { ref: statsRef, inView: statsInView } = useInViewOnce<HTMLDivElement>();

  return (
    <section className={styles.hero} aria-label="بخش اصلی">
      {/* ── Full-screen background image ── */}
      <div className={styles.bgWrap} aria-hidden>
        <Image
          src="/images/banners/hero-bg.webp"
          alt=""
          fill
          priority
          quality={90}
          className={styles.bgImg}
          sizes="100vw"
        />
        {/* dark overlay so text stays readable */}
        <div className={styles.bgOverlay} />
        {/* subtle blue gradient on the left where text lives */}
        <div className={styles.bgGradLeft} />
        {/* glow at bottom */}
        <div className={styles.bgGlow} />
      </div>

      {/* ── Content ── */}
      <div className={styles.inner}>
        <div className={styles.content}>
          <motion.span className={styles.badge} {...fadeUp(0.15)}>
            <span className={styles.badgeDot} />
            {data.badge}
          </motion.span>

          <motion.h1 className={styles.title} {...fadeUp(0.25)}>
            {data.title.main}
            <br />
            <span className={styles.titleHighlight}>
              {data.title.highlight}
            </span>
          </motion.h1>

          <motion.p className={styles.subtitle} {...fadeUp(0.35)}>
            {data.subtitle}
          </motion.p>

          <motion.div className={styles.buttons} {...fadeUp(0.45)}>
            {data.buttons.map((btn) => (
              <Button
                key={btn.id}
                href={btn.href}
                variant={btn.variant}
                size="lg"
                iconStart={
                  btn.variant === "outline" ? (
                    <Icon name="play" size={18} />
                  ) : undefined
                }
                iconEnd={
                  btn.variant === "primary" ? (
                    <Icon name="arrow-left" size={18} />
                  ) : undefined
                }
              >
                {btn.label}
              </Button>
            ))}
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <motion.div className={styles.statsRow} ref={statsRef} {...fadeUp(0.6)}>
          {data.stats.map((stat, i) => (
            <div key={stat.id} className={styles.stat}>
              {i > 0 && <div className={styles.statDivider} />}
              <span className={styles.statValueRow}>
                <AnimatedCounter
                  value={stat.numericValue}
                  active={statsInView}
                  className={styles.statValue}
                  formatValue={(display) => formatStatValue(display, stat.value)}
                />
                <span className={styles.statSuffix}>{stat.suffix}</span>
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Product badge – floats over the image area (left in RTL) ── */}
      <motion.div className={styles.productBadge} {...fadeUp(0.55)}>
        <Link href={data.productCard.href} className={styles.productBadgeInner}>
          <span className={styles.productBadgeCategory}>
            {data.productCard.category}
          </span>
          <span className={styles.productBadgeName}>
            {data.productCard.name}
          </span>
          <span className={styles.productBadgeLink}>مشاهده جزئیات →</span>
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden>
        <div className={styles.scrollDot} />
      </div>
    </section>
  );
}
