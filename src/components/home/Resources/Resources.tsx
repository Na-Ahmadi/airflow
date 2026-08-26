"use client";

import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import ResourceCard from "@/components/shared/ResourceCard/ResourceCard";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { useLanguage } from "@/context/LanguageContext";
import type { ResourcesData } from "@/types";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import styles from "./Resources.module.css";

interface ResourcesProps {
  data: ResourcesData;
}

export default function Resources({ data }: ResourcesProps) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className={styles.section}
      ref={ref}
      aria-label={data.section.title}
    >
      <Container>
        <div className={styles.sectionHeader}>
          <SectionTitle
            title={data.section.title}
            subtitle={data.section.subtitle}
            align="start"
          />
          <Link href={data.section.viewAll.href} className={styles.viewAll}>
            {data.section.viewAll.label}
            <Icon name={lang === "fa" ? "arrow-left" : "arrow-right"} size={14} />
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
