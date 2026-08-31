"use client";

import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { useLanguage } from "@/context/LanguageContext";
import type { ProductCategoriesData } from "@/types";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./Products.module.css";

interface ProductCategoriesProps {
  data: ProductCategoriesData;
  categoryHref?: (categoryId: string) => string;
  visibleCount?: number;
}

const DEFAULT_VISIBLE_COUNT = 6;

const SHOW_MORE_LABEL: Record<"fa" | "en", { more: string; less: string }> = {
  fa: { more: "نمایش بیشتر", less: "نمایش کمتر" },
  en: { more: "Show More", less: "Show Less" },
};

export default function ProductCategories({
  data,
  categoryHref = (id) => `/products?category=${id}`,
  visibleCount = DEFAULT_VISIBLE_COUNT,
}: ProductCategoriesProps) {
  const { lang } = useLanguage();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categoriesRef = useRef<HTMLElement>(null);
  const categoriesInView = useInView(categoriesRef, {
    once: true,
    margin: "-100px",
  });

  const categories = showAllCategories
    ? data.categories
    : data.categories.slice(0, visibleCount);
  const hasMoreCategories = data.categories.length > visibleCount;

  return (
    <section
      className={styles.section}
      ref={categoriesRef}
      aria-label={data.section.title}
    >
      <Container>
        <div className={styles.header}>
          <SectionTitle
            title={data.section.title}
            subtitle={data.section.subtitle}
            align="start"
          />
          <Link href={data.section.viewAll.href} className={styles.viewAll}>
            {data.section.viewAll.label}
            <Icon
              name={lang === "fa" ? "arrow-left" : "arrow-right"}
              size={14}
            />
          </Link>
        </div>

        {/* Category Showcase */}
        <div className={styles.categoryGrid}>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className={styles.categoryGridItem}
              initial={{ opacity: 0, y: 24 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Link
                href={categoryHref(category.id)}
                className={styles.categoryCard}
              >
                <div className={styles.categoryImgWrap}>
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.label}
                      fill
                      className={styles.categoryImg}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 620px"
                      priority={index < 2}
                    />
                  )}
                  <div className={styles.categoryOverlay} aria-hidden />
                </div>
                <div className={styles.categoryContent}>
                  <h3 className={styles.categoryTitle}>{category.label}</h3>
                  <span className={styles.categoryCta}>
                    {data.categoryCta}
                    <Icon
                      name={lang === "fa" ? "arrow-left" : "arrow-right"}
                      size={16}
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {hasMoreCategories && (
          <div className={styles.showMoreWrap}>
            <button
              type="button"
              className={styles.showMoreBtn}
              onClick={() => setShowAllCategories((prev) => !prev)}
              aria-expanded={showAllCategories}
            >
              {showAllCategories
                ? SHOW_MORE_LABEL[lang].less
                : SHOW_MORE_LABEL[lang].more}
              <Icon
                name="chevron-down"
                size={18}
                className={
                  showAllCategories ? styles.showMoreIconOpen : undefined
                }
              />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
