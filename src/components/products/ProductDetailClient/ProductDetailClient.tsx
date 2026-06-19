'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/shared/Container';
import Breadcrumb from '@/components/shared/Breadcrumb';
import type { BreadcrumbItem } from '@/components/shared/Breadcrumb';
import styles from './ProductDetailClient.module.css';

/* ─── SVG icons for features ──────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  air: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12H6M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  install: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  ceiling: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="4" rx="1"/><path d="M7 7v10M12 7v10M17 7v10"/><rect x="3" y="17" width="18" height="4" rx="1"/>
    </svg>
  ),
  energy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  material: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
};

/* ─── Product image placeholder SVG ──────────────────────── */
function ProductPlaceholder({ active = false }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.productSvg}>
      {/* Background glow */}
      {active && (
        <ellipse cx="200" cy="130" rx="160" ry="80" fill="rgba(30,111,207,0.08)"/>
      )}
      {/* Main body */}
      <rect x="40" y="80" width="320" height="100" rx="6" fill="rgba(180,190,210,0.12)" stroke="rgba(180,190,210,0.35)" strokeWidth="1.5"/>
      {/* Slots */}
      {[0,1,2,3,4,5,6,7].map((i) => (
        <rect key={i} x={50 + i * 38} y="88" width="22" height="84" rx="3"
          fill={active ? 'rgba(30,111,207,0.15)' : 'rgba(180,190,210,0.08)'}
          stroke={active ? 'rgba(30,111,207,0.5)' : 'rgba(180,190,210,0.25)'}
          strokeWidth="1"/>
      ))}
      {/* Top rail */}
      <rect x="40" y="74" width="320" height="10" rx="3" fill="rgba(200,210,230,0.25)" stroke="rgba(200,210,230,0.4)" strokeWidth="1"/>
      {/* Bottom rail */}
      <rect x="40" y="176" width="320" height="10" rx="3" fill="rgba(200,210,230,0.25)" stroke="rgba(200,210,230,0.4)" strokeWidth="1"/>
      {/* Highlight line */}
      <line x1="40" y1="84" x2="360" y2="84" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
      {/* Blue accent glow at center */}
      {active && (
        <>
          <line x1="190" y1="88" x2="190" y2="172" stroke="rgba(0,212,255,0.6)" strokeWidth="1.5"/>
          <ellipse cx="200" cy="130" rx="10" ry="42" fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.2)" strokeWidth="1"/>
        </>
      )}
    </svg>
  );
}

function ThumbnailPlaceholder({ index }: { index: number }) {
  const colors = [
    'rgba(30,111,207,0.2)', 'rgba(0,212,255,0.15)', 'rgba(30,111,207,0.25)',
    'rgba(0,212,255,0.1)', 'rgba(30,111,207,0.18)', 'rgba(0,212,255,0.2)',
  ];
  return (
    <svg viewBox="0 0 80 55" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="4" y="10" width="72" height="35" rx="3" fill={colors[index % colors.length]} stroke="rgba(180,190,210,0.3)" strokeWidth="1"/>
      {[0,1,2].map((i) => (
        <rect key={i} x={8 + i * 23} y="14" width="16" height="27" rx="2"
          fill="rgba(180,190,210,0.08)" stroke="rgba(180,190,210,0.2)" strokeWidth="0.8"/>
      ))}
      <rect x="4" y="8" width="72" height="4" rx="2" fill="rgba(200,210,230,0.2)"/>
      <rect x="4" y="41" width="72" height="4" rx="2" fill="rgba(200,210,230,0.2)"/>
    </svg>
  );
}

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
                    <span className={styles.featureIcon}>{ICONS[f.icon]}</span>
                    <span className={styles.featureLabel}>{f.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className={styles.ctaButtons}>
                <Link href={cta.inquiry.href} className={styles.btnPrimary}>
                  <span>›</span> {cta.inquiry.label}
                </Link>
                <Link href={cta.catalog.href} className={styles.btnOutline}>
                  <span className={styles.downloadIcon}>
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 3v10M6 9l4 4 4-4"/><path d="M4 15h12"/>
                    </svg>
                  </span>
                  {cta.catalog.label}
                </Link>
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
                    <ProductPlaceholder active />
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
                    <ThumbnailPlaceholder index={i} />
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
                      <svg viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.dimSvg}>
                        <rect x="50" y="80" width="400" height="140" rx="4" stroke="rgba(30,111,207,0.6)" strokeWidth="1.5" strokeDasharray="6 3"/>
                        {[0,1,2,3,4,5,6,7,8,9].map((i) => (
                          <rect key={i} x={58 + i * 39} y="88" width="24" height="124" rx="2"
                            fill="rgba(30,111,207,0.06)" stroke="rgba(30,111,207,0.35)" strokeWidth="1"/>
                        ))}
                        {/* Dimension lines */}
                        <line x1="50" y1="240" x2="450" y2="240" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
                        <line x1="50" y1="235" x2="50" y2="245" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
                        <line x1="450" y1="235" x2="450" y2="245" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
                        <text x="250" y="258" textAnchor="middle" fill="rgba(0,212,255,0.8)" fontSize="11" fontFamily="monospace">2000 mm</text>
                        <line x1="20" y1="80" x2="20" y2="220" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
                        <line x1="15" y1="80" x2="25" y2="80" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
                        <line x1="15" y1="220" x2="25" y2="220" stroke="rgba(0,212,255,0.5)" strokeWidth="1"/>
                        <text x="12" y="155" textAnchor="middle" fill="rgba(0,212,255,0.8)" fontSize="11" fontFamily="monospace" transform="rotate(-90,12,155)">45 mm</text>
                      </svg>
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
                        <span className={styles.docIcon}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10 9 9 9 8 9"/>
                          </svg>
                        </span>
                        <div className={styles.docInfo}>
                          <span className={styles.docName}>{doc.name}</span>
                          <span className={styles.docMeta}>{doc.type} · {doc.size}</span>
                        </div>
                        <button className={styles.docDownload} aria-label={`دانلود ${doc.name}`}>
                          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 3v10M6 9l4 4 4-4"/><path d="M4 15h12"/>
                          </svg>
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
                          <span className={styles.faqChevron}>
                            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="5 8 10 13 15 8"/>
                            </svg>
                          </span>
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
