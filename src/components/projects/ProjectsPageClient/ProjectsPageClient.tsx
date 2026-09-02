"use client";

import type { BreadcrumbItem } from "@/components/shared/Breadcrumb/Breadcrumb";
import Container from "@/components/shared/Container/Container";
import FilterTabs from "@/components/shared/FilterTabs/FilterTabs";
import type { TabItem } from "@/components/shared/FilterTabs/FilterTabs";
import ProjectCard from "@/components/shared/ProjectCard/ProjectCard";
import PageBanner from "@/components/shared/PageBanner/PageBanner";
import { useLanguage } from "@/context/LanguageContext";
import type { Project } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "./ProjectsPageClient.module.css";

const EMPTY_COPY = {
  fa: "پروژه‌ای در این دسته‌بندی یافت نشد.",
  en: "No projects found in this category.",
} as const;

interface Props {
  breadcrumb: BreadcrumbItem[];
  pageTitle: string;
  pageLabel: string;
  pageDescription: string;
  tabs: TabItem[];
  items: Project[];
}

export default function ProjectsPageClient({
  breadcrumb,
  pageTitle,
  pageLabel,
  pageDescription,
  tabs,
  items,
}: Props) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all" ? items : items.filter((p) => p.category === activeTab);

  return (
    <>
      <PageBanner
        breadcrumb={breadcrumb}
        label={pageLabel}
        title={pageTitle}
        description={pageDescription}
        image="/images/banners/hero-projects.webp"
      />

      {/* Projects Grid */}
      <section className={styles.section}>
        <Container>
          {/* Tabs */}
          <FilterTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          {/* Grid */}
          <motion.div className={styles.grid} layout>
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <p className={styles.empty}>{EMPTY_COPY[lang]}</p>
              ) : (
                filtered.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProjectCard project={project} variant="grid" />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
