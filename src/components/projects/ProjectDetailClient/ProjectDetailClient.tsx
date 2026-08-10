"use client";

import { useState } from "react";
import Image from "next/image";
import Badge from "@/components/shared/Badge/Badge";
import type { BreadcrumbItem } from "@/components/shared/Breadcrumb/Breadcrumb";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import Button from "@/components/shared/Button/Button";
import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import Link from "next/link";
import styles from "./ProjectDetailClient.module.css";

/* ─── Types ───────────────────────────────────────────────── */
interface MetaItem {
  icon: string;
  label: string;
  value: string;
}

interface ProductItem {
  name: string;
  model: string;
  description: string;
  image: string;
  href: string;
}

interface Props {
  breadcrumb: BreadcrumbItem[];
  title: string;
  category: string;
  location: string;
  year: string;
  meta: MetaItem[];
  description: string;
  scope: string;
  products: ProductItem[];
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
  meta,
  description,
  scope,
  products,
  highlights,
  imageCount,
}: Props) {
  const infoCards = [
    { icon: "cog", title: "حوزه اجرای پروژه", items: highlights },
    {
      icon: "briefcase",
      title: "حوزه خدمات",
      items: ["مشاوره فنی", "طراحی مهندسی", "تأمین تجهیزات", "اجرا و نصب", "راه‌اندازی و تست نهایی"],
    },
    { icon: "file-check", title: "جزئیات اجرا", items: [scope, ...highlights] },
  ];

  const images = Array.from({ length: imageCount }, (_, i) => ({
    src: "/images/project-placeholder.svg",
    alt: `${title} - تصویر ${i + 1}`,
  }));
  const [active, setActive] = useState(0);
  const goTo = (i: number) => setActive((i + images.length) % images.length);

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
            </div>

            {/* Image column */}
            <div className={styles.imageCol}>
              <div className={styles.slider}>
                <div className={styles.sliderFrame}>
                  <Image
                    key={active}
                    src={images[active].src}
                    alt={images[active].alt}
                    fill
                    unoptimized
                    className={styles.sliderImg}
                  />

                  <div className={styles.sliderControls}>
                    <span className={styles.sliderCount}>
                      {String(active + 1).padStart(2, "0")}
                      <span className={styles.sliderTrack}>
                        <span
                          className={styles.sliderProgress}
                          style={{ width: `${((active + 1) / images.length) * 100}%` }}
                        />
                      </span>
                      {String(images.length).padStart(2, "0")}
                    </span>

                    <div className={styles.sliderArrows}>
                      <button
                        type="button"
                        className={styles.sliderArrow}
                        onClick={() => goTo(active - 1)}
                        aria-label="تصویر قبلی"
                      >
                        <Icon name="arrow-right" size={16} />
                      </button>
                      <button
                        type="button"
                        className={styles.sliderArrow}
                        onClick={() => goTo(active + 1)}
                        aria-label="تصویر بعدی"
                      >
                        <Icon name="arrow-left" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Meta Bar ───────────────────────────────────────── */}
      <section className={styles.metaBar}>
        <Container>
          <div className={styles.metaGrid}>
            {meta.map((m) => (
              <div key={m.label} className={styles.metaCell}>
                <Icon name={m.icon} size={18} className={styles.metaIcon} />
                <div className={styles.metaText}>
                  <span className={styles.metaLabel}>{m.label}</span>
                  <span className={styles.metaValue}>{m.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── About ──────────────────────────────────────────── */}
      <section className={styles.about}>
        <Container>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h2 className={styles.sectionTitle}>درباره پروژه</h2>
              <p className={styles.aboutDescription}>{description}</p>

              <div className={styles.ctaRow}>
                <Button href="#contact" variant="primary" size="lg" textColor="white">
                  درخواست استعلام
                </Button>
                <Button href="#contact" variant="outline" size="lg">
                  درخواست طراحی اختصاصی
                </Button>
              </div>
            </div>

            <div className={styles.aboutImage}>
              <Image
                src="/images/project-placeholder.svg"
                alt={title}
                fill
                unoptimized
                className={styles.aboutImg}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Info Cards ─────────────────────────────────────── */}
      <section className={styles.infoSection}>
        <Container>
          <div className={styles.infoCardsGrid}>
            {infoCards.map((card) => (
              <div key={card.title} className={styles.infoCard}>
                <div className={styles.infoCardHeader}>
                  <span className={styles.infoCardIconWrap}>
                    <Icon name={card.icon} size={18} />
                  </span>
                  <h3 className={styles.infoCardTitle}>{card.title}</h3>
                </div>
                <ul className={styles.infoCardList}>
                  {card.items.map((item) => (
                    <li key={item} className={styles.infoCardItem}>
                      <Icon name="chevron-left" size={14} className={styles.infoCardBullet} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Products Section ───────────────────────────────── */}
      <section className={styles.productsSection}>
        <Container>
          <h2 className={styles.sectionTitle}>محصولات استفاده شده</h2>

          <div className={styles.productsGrid}>
            {products.map((p) => (
              <Link key={p.model} href={p.href} className={styles.productCard}>
                <div className={styles.productImageWrap}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    unoptimized
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productBody}>
                  <h3 className={styles.productName}>{p.name}</h3>
                  <span className={styles.productModel}>مدل: {p.model}</span>
                  <p className={styles.productDescription}>{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

/* ─── Icons ───────────────────────────────────────────────── */
