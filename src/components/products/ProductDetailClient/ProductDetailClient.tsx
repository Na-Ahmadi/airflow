"use client";

import type { BreadcrumbItem } from "@/components/shared/Breadcrumb/Breadcrumb";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import Button from "@/components/shared/Button/Button";
import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import ImageGallery from "@/components/shared/ImageGallery/ImageGallery";
import Tabs from "@/components/shared/Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import styles from "./ProductDetailClient.module.css";

/* ─── Types ───────────────────────────────────────────────── */
interface Feature {
  icon: string;
  label: string;
}
interface CtaConfig {
  label: string;
  href: string;
}
interface Tab {
  id: string;
  label: string;
}
interface SpecItem {
  label: string;
  value: string;
}
interface FaqItem {
  question: string;
  answer: string;
}
interface ImageItem {
  src: string;
  alt: string;
}

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
  breadcrumb,
  name,
  model,
  description,
  features,
  images,
  cta,
  tabs,
  specs,
  faq,
}: Props) {
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
                    <span className={styles.featureIcon}>
                      <Icon name={f.icon} size={20} />
                    </span>
                    <span className={styles.featureLabel}>{f.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className={styles.ctaButtons}>
                <Button
                  href={cta.inquiry.href}
                  variant="primary"
                  size="lg"
                  iconStart={<span>›</span>}
                >
                  {cta.inquiry.label}
                </Button>
                <Button
                  href={cta.catalog.href}
                  variant="outline"
                  size="lg"
                  iconStart={<Icon name="download" size={18} />}
                >
                  {cta.catalog.label}
                </Button>
              </div>
            </div>

            {/* Image Column */}
            <div className={styles.imageCol}>
              <ImageGallery images={images} />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Tabs Section ─────────────────────────────────────── */}
      <section className={styles.tabsSection}>
        <Container>
          <Tabs tabs={tabs} defaultTab="specs">
            {(activeTab) => (
              <>
                {activeTab === "specs" && (
                  <div className={styles.specsGrid}>
                    <SpecTable rows={specsLeft} />
                    <SpecTable rows={specsRight} />
                  </div>
                )}

                {activeTab === "dimensions" && (
                  <div className={styles.dimensionsPane}>
                    <div className={styles.dimPlaceholder}>
                      <Image
                        src="/images/dimensions-diagram.svg"
                        alt=""
                        fill
                        unoptimized
                        className={styles.dimSvg}
                      />
                    </div>
                    <p className={styles.dimNote}>
                      نقشه‌های فنی دقیق در کاتالوگ محصول موجود است.
                    </p>
                  </div>
                )}

                {activeTab === "documents" && (
                  <div className={styles.documentsPane}>
                    {[
                      {
                        name: "کاتالوگ محصول LS-300",
                        size: "2.4 MB",
                        type: "PDF",
                      },
                      {
                        name: "دفترچه نصب و راه‌اندازی",
                        size: "1.1 MB",
                        type: "PDF",
                      },
                      { name: "جدول مشخصات فنی", size: "0.6 MB", type: "PDF" },
                    ].map((doc) => (
                      <div key={doc.name} className={styles.docItem}>
                        <span className={styles.docIcon}>
                          <Icon name="file-pdf" />
                        </span>
                        <div className={styles.docInfo}>
                          <span className={styles.docName}>{doc.name}</span>
                          <span className={styles.docMeta}>
                            {doc.type} · {doc.size}
                          </span>
                        </div>
                        <button
                          className={styles.docDownload}
                          aria-label={`دانلود ${doc.name}`}
                        >
                          <Icon name="download" size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "faq" && (
                  <div className={styles.faqPane}>
                    {faq.map((item, i) => (
                      <div key={i} className={styles.faqItem}>
                        <button
                          className={[
                            styles.faqQuestion,
                            openFaq === i ? styles.faqOpen : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        >
                          <span>{item.question}</span>
                          <span className={styles.faqChevron}>
                            <Icon name="chevron-down" size={18} />
                          </span>
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              style={{ overflow: "hidden" }}
                            >
                              <p className={styles.faqAnswer}>{item.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </Tabs>
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
