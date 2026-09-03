"use client";

import Badge from "@/components/shared/Badge/Badge";
import type { BreadcrumbItem } from "@/components/shared/Breadcrumb/Breadcrumb";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import Button from "@/components/shared/Button/Button";
import Icon from "@/components/shared/Icon/Icon";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./PageBanner.module.css";

export interface BannerMetaItem {
  icon: string;
  value: string;
}

/**
 * Layout presets:
 *  - "default" balanced text column, taller banner (project & about photos)
 *  - "wide"    narrow text column, shorter banner, lighter scrim (product shots)
 */
export type PageBannerVariant = "default" | "wide";

interface Props {
  breadcrumb: BreadcrumbItem[];
  title: string;
  label?: string;
  description?: string;
  image: string;
  imageAlt?: string;
  badge?: string;
  meta?: BannerMetaItem[];
  button?: { label: string; href: string };
  variant?: PageBannerVariant;
}

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.52, ease: EASE, delay },
});

export default function PageBanner({
  breadcrumb,
  title,
  label,
  description,
  image,
  imageAlt = "",
  badge,
  meta,
  button,
  variant = "default",
}: Props) {
  return (
    <section className={`${styles.banner} ${styles[variant]}`} data-theme="light">
      <div className={styles.content}>
        <motion.div className={styles.breadcrumbRow} {...fadeUp(0)}>
          <Breadcrumb items={breadcrumb} />
        </motion.div>

        <div className={styles.main}>
          {badge && (
            <motion.div className={styles.badgeRow} {...fadeUp(0.05)}>
              <Badge variant="accent">{badge}</Badge>
            </motion.div>
          )}
          {label && (
            <motion.p className={styles.label} {...fadeUp(0.1)}>
              {label}
            </motion.p>
          )}
          <motion.h1 className={styles.title} {...fadeUp(0.18)}>
            {title}
          </motion.h1>
          {description && (
            <motion.p className={styles.description} {...fadeUp(0.28)}>
              {description}
            </motion.p>
          )}

          {meta && meta.length > 0 && (
            <motion.div className={styles.metaRow} {...fadeUp(0.34)}>
              {meta.map((m, i) => (
                <div key={m.value} className={styles.metaItemGroup}>
                  {i > 0 && <span className={styles.metaDot} />}
                  <span className={styles.metaItem}>
                    <Icon name={m.icon} size={14} />
                    {m.value}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {button && (
            <motion.div className={styles.buttonRow} {...fadeUp(0.34)}>
              <Button href={button.href}>{button.label}</Button>
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        className={styles.imageWrap}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <Image src={image} alt={imageAlt} fill priority className={styles.image} />
        <div className={styles.imageEdge} />
      </motion.div>
    </section>
  );
}
