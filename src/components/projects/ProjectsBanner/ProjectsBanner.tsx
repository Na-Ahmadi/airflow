"use client";

import Badge from "@/components/shared/Badge/Badge";
import type { BreadcrumbItem } from "@/components/shared/Breadcrumb/Breadcrumb";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import Icon from "@/components/shared/Icon/Icon";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./ProjectsBanner.module.css";

interface MetaItem {
  icon: string;
  value: string;
}

interface Props {
  breadcrumb: BreadcrumbItem[];
  label?: string;
  title: string;
  description: string;
  image?: string;
  badge?: string;
  meta?: MetaItem[];
}

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.52, ease: EASE, delay },
});

export default function ProjectsBanner({
  breadcrumb,
  label,
  title,
  description,
  image = "/images/banners/hero-projects.webp",
  badge,
  meta,
}: Props) {
  return (
    <section className={styles.banner} data-theme="light">
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
          <motion.p className={styles.description} {...fadeUp(0.28)}>
            {description}
          </motion.p>

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
        </div>
      </div>

      <motion.div
        className={styles.imageWrap}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <Image
          src={image}
          alt=""
          fill
          priority
          className={styles.image}
        />
        <div className={styles.imageEdge} />
      </motion.div>
    </section>
  );
}
