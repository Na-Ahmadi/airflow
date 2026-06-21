'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Container from '@/components/shared/Container/Container';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import type { BreadcrumbItem } from '@/components/shared/Breadcrumb/Breadcrumb';
import Icon from '@/components/shared/Icon/Icon';
import Button from '@/components/shared/Button/Button';
import styles from './ProductDetailClient.module.css';


/* ─── Types ───────────────────────────────────────────────── */
interface Feature { icon: string; label: string; }
interface CtaConfig { label: string; href: string; }
interface Tab { id: string; label: string; }
interface SpecItem { label: string; value: string; }
interface FaqItem { question: string; answer: string; }
interface ImageItem { src: string; alt: string; }

interface Props {
  breadcrumb: BreadcrumbItem[];
  name: string;
  model: string;
  description: string;
  features: Feature[];
  images: ImageItem[];
  cta: { inquiry: CtaConfig; catalog: CtaConfig };
  tabs: Tab[];
  specs: SpecItem[];
  faq: FaqItem[];
}

export default function ProductDetailClient({
  breadcrumb, name, model, description, features, images, cta, tabs, specs, faq,
}: Props) {
  const [activeTab, setActiveTab] = useState('specs');
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const half = Math.ceil(specs.length / 2);
  const specsLeft = specs.slice(0, half);
  const specsRight = specs.slice(half);

  return (
    <>
      {/* ─── Breadcrumb ──────────────────────────────────────── */}
      <div className={styles.breadcrumbBar}>
        <Container>
          <Breadcrumb items={breadcrumb} />
        </Container>
      </div>

      {/* ─── Product Hero ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroGrid}>

            {/* Info Column */}
            <div className={styles.infoCol}>
              <h1 className={styles.productName}>{name}</h1>
              <div className={styles.modelTag}>{model}</div>
              <p className={styles.description}>{description}</p>

              {/* Features Grid */}
              <div className={styles.featuresGrid}>
                {features.map((f) => (
                  <div key={f.label} className={styles.featureItem}>
                    <span className={styles.featureIcon}><Icon name={f.icon} size={20} /></span>
                    <span className={styles.featureLabel}>{f.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className={styles.ctaButtons}>
                <Button href={cta.inquiry.href} variant="primary" size="lg" iconStart={<span>›</span>}>
                  {cta.inquiry.label}
                </Button>
                <Button href={cta.catalog.href} variant="outline" size="lg" iconStart={<Icon name="download" size={18} />}>
                  {cta.catalog.label}
                </Button>
              </div>
            </div>

            {/* Image Column */}
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
                    <Image src="/images/product-detail-placeholder.svg" alt="" fill unoptimized className={styles.productSvg} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              <div className={styles.thumbnails}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={[styles.thumb, activeImage === i ? styles.thumbActive : ''].filter(Boolean).join(' ')}
                    onClick={() => setActiveImage(i)}
                    aria-label={img.alt}
                  >
                    <Image src="/images/product-thumbnail-placeholder.svg" alt="" fill unoptimized />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Tabs Section ─────────────────────────────────────── */}
      <section className={styles.tabsSection}>
        <Container>
          {/* Tab Bar */}
          <div className={styles.tabBar} role="tablist">
            {tabs.map((tab) => (
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

          {/* Tab Panels */}
          <div className={styles.tabContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'specs' && (
                  <div className={styles.specsGrid}>
                    <SpecTable rows={specsLeft} />
                    <SpecTable rows={specsRight} />
                  </div>
                )}

                {activeTab === 'dimensions' && (
                  <div className={styles.dimensionsPane}>
                    <div className={styles.dimPlaceholder}>
                      <Image src="/images/dimensions-diagram.svg" alt="" fill unoptimized className={styles.dimSvg} />
                    </div>
                    <p className={styles.dimNote}>نقشه‌های فنی دقیق در کاتالوگ محصول موجود است.</p>
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div className={styles.documentsPane}>
                    {[
                      { name: 'کاتالوگ محصول LS-300', size: '2.4 MB', type: 'PDF' },
                      { name: 'دفترچه نصب و راه‌اندازی', size: '1.1 MB', type: 'PDF' },
                      { name: 'جدول مشخصات فنی', size: '0.6 MB', type: 'PDF' },
                    ].map((doc) => (
                      <div key={doc.name} className={styles.docItem}>
                        <span className={styles.docIcon}><Icon name="file-pdf" /></span>
                        <div className={styles.docInfo}>
                          <span className={styles.docName}>{doc.name}</span>
                          <span className={styles.docMeta}>{doc.type} · {doc.size}</span>
                        </div>
                        <button className={styles.docDownload} aria-label={`دانلود ${doc.name}`}>
                          <Icon name="download" size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className={styles.faqPane}>
                    {faq.map((item, i) => (
                      <div key={i} className={styles.faqItem}>
                        <button
                          className={[styles.faqQuestion, openFaq === i ? styles.faqOpen : ''].filter(Boolean).join(' ')}
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        >
                          <span>{item.question}</span>
                          <span className={styles.faqChevron}><Icon name="chevron-down" size={18} /></span>
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <p className={styles.faqAnswer}>{item.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
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

function SpecTable({ rows }: { rows: SpecItem[] }) {
  return (
    <table className={styles.specTable}>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className={styles.specRow}>
            <td className={styles.specLabel}>{row.label}</td>
            <td className={styles.specValue}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
