"use client";

import type { BreadcrumbItem } from "@/components/shared/Breadcrumb/Breadcrumb";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import Container from "@/components/shared/Container/Container";
import FilterTabs from "@/components/shared/FilterTabs/FilterTabs";
import type { TabItem } from "@/components/shared/FilterTabs/FilterTabs";
import ProjectCard from "@/components/shared/ProjectCard/ProjectCard";
import type { Project } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "./ProjectsPageClient.module.css";

interface Props {
  breadcrumb: BreadcrumbItem[];
  pageTitle: string;
  tabs: TabItem[];
  items: Project[];
}

export default function ProjectsPageClient({
  breadcrumb,
  pageTitle,
  tabs,
  items,
}: Props) {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all" ? items : items.filter((p) => p.category === activeTab);

  return (
    <>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <Container>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <Breadcrumb items={breadcrumb} />
        </Container>
      </div>

      {/* Projects Grid */}
      <section className={styles.section}>
        <Container>
          {/* Tabs */}
          <FilterTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          {/* Grid */}
          <motion.div className={styles.grid} layout>
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <p className={styles.empty}>
                  پروژه‌ای در این دسته‌بندی یافت نشد.
                </p>
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
