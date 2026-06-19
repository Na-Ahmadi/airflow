'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/shared/Container';
import ProjectCard from '@/components/shared/ProjectCard';
import Breadcrumb from '@/components/shared/Breadcrumb';
import type { BreadcrumbItem } from '@/components/shared/Breadcrumb';
import type { Project } from '@/types';
import styles from './ProjectsPageClient.module.css';

interface Tab { id: string; label: string; }

interface Props {
  breadcrumb: BreadcrumbItem[];
  pageTitle: string;
  tabs: Tab[];
  items: Project[];
}

export default function ProjectsPageClient({ breadcrumb, pageTitle, tabs, items }: Props) {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? items
    : items.filter((p) => p.category === activeTab);

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
          <div className={styles.tabs} role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={[styles.tab, activeTab === tab.id ? styles.tabActive : ''].filter(Boolean).join(' ')}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div className={styles.grid} layout>
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <p className={styles.empty}>پروژه‌ای در این دسته‌بندی یافت نشد.</p>
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

