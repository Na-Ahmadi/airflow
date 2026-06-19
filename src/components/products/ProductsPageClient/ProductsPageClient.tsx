'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/shared/Container';
import Badge from '@/components/shared/Badge';
import styles from './ProductsPageClient.module.css';

interface Tab { id: string; label: string; }
interface ProductItem {
  id: string;
  category: string;
  image: string;
  name: string;
  series: string;
  href: string;
  badge: string | null;
}
interface Cta { title: string; subtitle: string; button: { label: string; href: string }; }
interface BreadcrumbItem { label: string; href: string; }

interface Props {
  breadcrumb: BreadcrumbItem[];
  pageTitle: string;
  tabs: Tab[];
  items: ProductItem[];
  cta: Cta;
}

export default function ProductsPageClient({ breadcrumb, pageTitle, tabs, items, cta }: Props) {
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

      {/* Products Grid */}
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
          <motion.div
            className={styles.grid}
            layout
          >
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <p className={styles.empty}>محصولی در این دسته‌بندی یافت نشد.</p>
              ) : (
                filtered.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* CTA Banner */}
      <div className={styles.cta}>
        <Container>
          <div className={styles.ctaInner}>
            <div className={styles.ctaText}>
              <h2 className={styles.ctaTitle}>{cta.title}</h2>
              <p className={styles.ctaSubtitle}>{cta.subtitle}</p>
            </div>
            <Link href={cta.button.href} className={styles.ctaButton}>
              &#8250; {cta.button.label}
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}

function ProductCard({ product }: { product: ProductItem }) {
  return (
    <Link href={product.href} className={styles.card}>
      <div className={styles.cardImgWrap}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={styles.cardImg}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <PlaceholderImg />
        {product.badge && (
          <div className={styles.cardBadge}>
            <Badge variant="accent">{product.badge}</Badge>
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{product.name}</h3>
        <span className={styles.cardSeries}>{product.series}</span>
        <span className={styles.cardBtn}>مشاهده جزئیات</span>
      </div>
    </Link>
  );
}

function PlaceholderImg() {
  return (
    <div className={styles.placeholder} aria-hidden>
      <svg viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="10" y="35" width="160" height="60" rx="4" fill="rgba(30,111,207,0.1)" stroke="rgba(30,111,207,0.3)" strokeWidth="1"/>
        {[0,1,2,3,4,5,6].map((i) => (
          <rect key={i} x={15 + i * 22} y="40" width="15" height="50" rx="2" fill="rgba(30,111,207,0.15)" stroke="rgba(30,111,207,0.4)" strokeWidth="0.8"/>
        ))}
        <rect x="10" y="30" width="160" height="7" rx="2" fill="rgba(30,111,207,0.2)"/>
        <rect x="10" y="93" width="160" height="7" rx="2" fill="rgba(30,111,207,0.2)"/>
      </svg>
    </div>
  );
}
