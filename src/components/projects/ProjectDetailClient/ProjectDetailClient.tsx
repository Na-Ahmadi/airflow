'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/shared/Container/Container';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import type { BreadcrumbItem } from '@/components/shared/Breadcrumb/Breadcrumb';
import Badge from '@/components/shared/Badge/Badge';
import Icon from '@/components/shared/Icon/Icon';
import styles from './ProjectDetailClient.module.css';

/* ─── Types ───────────────────────────────────────────────── */
interface StatItem     { label: string; value: string; }

interface Props {
  breadcrumb:  BreadcrumbItem[];
  title:       string;
  category:    string;
  location:    string;
  year:        string;
  client:      string;
  area:        string;
  duration:    string;
  description: string;
  scope:       string;
  products:    string[];
  stats:       StatItem[];
  highlights:  string[];
  imageCount:  number;
}


/* ─── Component ───────────────────────────────────────────── */
export default function ProjectDetailClient({
  breadcrumb, title, category, location, year, client, area, duration,
  description, scope, products, stats, highlights, imageCount,
}: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab]     = useState('info');

  const TABS = [
    { id: 'info',      label: 'اطلاعات پروژه' },
    { id: 'scope',     label: 'حوزه اجرا' },
    { id: 'products',  label: 'محصولات استفاده‌شده' },
  ];

  return (
    <>
      {/* ─── Breadcrumb ─────────────────────────────────────── */}
      <div className={styles.breadcrumbBar}>
        <Container>
          <Breadcrumb items={breadcrumb} />
        </Container>
      </div>

      {/* ─── Hero ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroGrid}>

            {/* Info column */}
            <div className={styles.infoCol}>
              <div className={styles.badges}>
                <Badge variant="accent">{category}</Badge>
              </div>
              <h1 className={styles.title}>{title}</h1>

              <div className={styles.metaRow}>
                <span className={styles.metaItem}><Icon name="location" size={14} />{location}</span>
                <span className={styles.metaDot} />
                <span className={styles.metaItem}><Icon name="calendar" size={14} />{year}</span>
              </div>

              <p className={styles.description}>{description}</p>

              {/* Stats grid */}
              <div className={styles.statsGrid}>
                {stats.map((s) => (
                  <div key={s.label} className={styles.statCard}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className={styles.ctaRow}>
                <Link href="#contact" className={styles.btnPrimary}>
                  <span>›</span> درخواست مشاوره
                </Link>
                <Link href="/projects" className={styles.btnOutline}>
                  بازگشت به پروژه‌ها
                </Link>
              </div>
            </div>

            {/* Image column */}
            <div className={styles.imageCol}>
              <div className={styles.mainImageWrap}>
                <div className={styles.imageGlow} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    className={styles.mainImage}
                  >
                    <Image src="/images/project-placeholder.svg" alt="" fill unoptimized className={styles.projectSvg} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className={styles.thumbnails}>
                {Array.from({ length: imageCount }, (_, i) => (
                  <button
                    key={i}
                    className={[styles.thumb, activeImage === i ? styles.thumbActive : ''].filter(Boolean).join(' ')}
                    onClick={() => setActiveImage(i)}
                    aria-label={`تصویر ${i + 1}`}
                  >
                    <Image src="/images/project-placeholder.svg" alt="" fill unoptimized />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Tabs Section ───────────────────────────────────── */}
      <section className={styles.tabsSection}>
        <Container>
          <div className={styles.tabBar} role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={[styles.tabBtn, activeTab === tab.id ? styles.tabActive : ''].filter(Boolean).join(' ')}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'info' && (
                  <div className={styles.infoPane}>
                    <div className={styles.infoGrid}>
                      {[
                        { label: 'کارفرما',       value: client },
                        { label: 'موقعیت',        value: location },
                        { label: 'سال اجرا',       value: year },
                        { label: 'مساحت',          value: area },
                        { label: 'مدت اجرا',       value: duration },
                        { label: 'دسته‌بندی',      value: category },
                      ].map((row) => (
                        <div key={row.label} className={styles.infoRow}>
                          <span className={styles.infoLabel}>{row.label}</span>
                          <span className={styles.infoValue}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.highlightsBlock}>
                      <h3 className={styles.blockTitle}>دستاوردهای کلیدی</h3>
                      <ul className={styles.highlightsList}>
                        {highlights.map((h) => (
                          <li key={h} className={styles.highlightItem}>
                            <Icon name="check" size={16} style={{ flexShrink: 0 }} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'scope' && (
                  <div className={styles.scopePane}>
                    <div className={styles.scopeCard}>
                      <h3 className={styles.blockTitle}>حوزه خدمات</h3>
                      <p className={styles.scopeText}>{scope}</p>
                    </div>
                    <div className={styles.highlightsBlock}>
                      <h3 className={styles.blockTitle}>جزئیات اجرا</h3>
                      <ul className={styles.highlightsList}>
                        {highlights.map((h) => (
                          <li key={h} className={styles.highlightItem}>
                            <Icon name="check" size={16} style={{ flexShrink: 0 }} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'products' && (
                  <div className={styles.productsPane}>
                    <p className={styles.productsPreamble}>
                      محصولات و سیستم‌های مورد استفاده در این پروژه:
                    </p>
                    <div className={styles.productsList}>
                      {products.map((p) => (
                        <div key={p} className={styles.productItem}>
                          <Icon name="box" size={16} style={{ flexShrink: 0 }} />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/products" className={styles.productsLink}>
                      مشاهده همه محصولات ›
                    </Link>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ─── Icons ───────────────────────────────────────────────── */
