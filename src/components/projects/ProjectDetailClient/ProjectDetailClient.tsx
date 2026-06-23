"use client";

import Badge from "@/components/shared/Badge/Badge";
import type { BreadcrumbItem } from "@/components/shared/Breadcrumb/Breadcrumb";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import Button from "@/components/shared/Button/Button";
import Container from "@/components/shared/Container/Container";
import ImageGallery from "@/components/shared/ImageGallery/ImageGallery";
import Icon from "@/components/shared/Icon/Icon";
import Tabs from "@/components/shared/Tabs/Tabs";
import Link from "next/link";
import styles from "./ProjectDetailClient.module.css";

/* ─── Types ───────────────────────────────────────────────── */
interface StatItem {
  label: string;
  value: string;
}

interface Props {
  breadcrumb: BreadcrumbItem[];
  title: string;
  category: string;
  location: string;
  year: string;
  client: string;
  area: string;
  duration: string;
  description: string;
  scope: string;
  products: string[];
  stats: StatItem[];
  highlights: string[];
  imageCount: number;
}

/* ─── Component ───────────────────────────────────────────── */
export default function ProjectDetailClient({
  breadcrumb,
  title,
  category,
  location,
  year,
  client,
  area,
  duration,
  description,
  scope,
  products,
  stats,
  highlights,
  imageCount,
}: Props) {
  const TABS = [
    { id: "info", label: "اطلاعات پروژه" },
    { id: "scope", label: "حوزه اجرا" },
    { id: "products", label: "محصولات استفاده‌شده" },
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
                <span className={styles.metaItem}>
                  <Icon name="location" size={14} />
                  {location}
                </span>
                <span className={styles.metaDot} />
                <span className={styles.metaItem}>
                  <Icon name="calendar" size={14} />
                  {year}
                </span>
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
                <Button
                  href="#contact"
                  variant="primary"
                  size="lg"
                  textColor="white"
                >
                  درخواست استعلام
                </Button>
                <Button
                  href="#contact"
                  variant="outline"
                  size="lg"
                  textColor="white"
                >
                  درخواست طراحی اختصاصی
                </Button>
              </div>
            </div>

            {/* Image column */}
            <div className={styles.imageCol}>
              <ImageGallery
                images={Array.from({ length: imageCount }, (_, i) => ({
                  src: "/images/project-placeholder.svg",
                  alt: `تصویر ${i + 1}`,
                }))}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Tabs Section ───────────────────────────────────── */}
      <section className={styles.tabsSection}>
        <Container>
          <Tabs tabs={TABS} defaultTab="info">
            {(activeTab) => (
              <>
                {activeTab === "info" && (
                  <div className={styles.infoPane}>
                    <div className={styles.infoGrid}>
                      {[
                        { label: "کارفرما", value: client },
                        { label: "موقعیت", value: location },
                        { label: "سال اجرا", value: year },
                        { label: "مساحت", value: area },
                        { label: "مدت اجرا", value: duration },
                        { label: "دسته‌بندی", value: category },
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

                {activeTab === "scope" && (
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

                {activeTab === "products" && (
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
              </>
            )}
          </Tabs>
        </Container>
      </section>
    </>
  );
}

/* ─── Icons ───────────────────────────────────────────────── */
