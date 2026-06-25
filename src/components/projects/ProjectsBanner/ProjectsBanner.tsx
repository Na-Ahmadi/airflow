"use client";

import type { BreadcrumbItem } from "@/components/shared/Breadcrumb/Breadcrumb";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./ProjectsBanner.module.css";

interface Props {
  breadcrumb: BreadcrumbItem[];
  label: string;
  title: string;
  description: string;
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
}: Props) {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <motion.div {...fadeUp(0)}>
          <Breadcrumb items={breadcrumb} />
        </motion.div>
        <motion.p className={styles.label} {...fadeUp(0.1)}>
          {label}
        </motion.p>
        <motion.h1 className={styles.title} {...fadeUp(0.18)}>
          {title}
        </motion.h1>
        <motion.p className={styles.description} {...fadeUp(0.28)}>
          {description}
        </motion.p>
      </div>

      <motion.div
        className={styles.imageWrap}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <Image
          src="/images/banners/hero-projects.webp"
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
