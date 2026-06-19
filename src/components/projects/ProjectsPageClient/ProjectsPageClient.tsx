'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/shared/Container';
import Icon from '@/components/shared/Icon';
import styles from './ProjectsPageClient.module.css';

interface Tab { id: string; label: string; }
interface BreadcrumbItem { label: string; href: string; }
interface ProjectItem {
  id: string;
  image: string;
  category: string;
  title: string;
  location: string;
  href: string;
  featured: boolean;
}

interface Props {
  breadcrumb: BreadcrumbItem[];
  pageTitle: string;
  tabs: Tab[];
  items: ProjectItem[];
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
          <nav className={styles.breadcrumb} aria-label="breadcrumb">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} style={{ display: 'contents' }}>
                {i > 0 && <span className={styles.breadcrumbSep}>/</span>}
                {i < breadcrumb.length - 1 ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
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
                    <ProjectCard project={project} />
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

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <Link href={project.href} className={styles.card}>
      <div className={styles.imgWrap}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={styles.img}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <Placeholder title={project.title} />
        <div className={styles.overlay} aria-hidden />
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <div className={styles.cardMeta}>
            <Icon name="location" size={13} />
            <span>{project.location}</span>
          </div>
          <span className={styles.cardLink}>
            <Icon name="arrow-right" size={14} />
            مشاهده جزئیات
          </span>
        </div>
      </div>
    </Link>
  );
}

function Placeholder({ title }: { title: string }) {
  const colors = ['#0a1e3d', '#0d2444', '#081528', '#0e2040'];
  const idx = title.length % colors.length;
  return (
    <div className={styles.placeholder} style={{ background: colors[idx] }} aria-hidden>
      <Icon name="building" size={56} style={{ color: 'rgba(30,111,207,0.35)' }} />
    </div>
  );
}
