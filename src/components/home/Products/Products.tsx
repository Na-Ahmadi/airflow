"use client";

import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { useLanguage } from "@/context/LanguageContext";
import productsPageRaw from "@/data/products-page.json";
import type { ProductsData } from "@/types";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";
import styles from "./Products.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductsProps {
  data: ProductsData;
}

const VISIBLE_CATEGORY_COUNT = 6;

const SHOW_MORE_LABEL: Record<"fa" | "en", { more: string; less: string }> = {
  fa: { more: "نمایش بیشتر", less: "نمایش کمتر" },
  en: { more: "Show More", less: "Show Less" },
};

export default function Products({ data }: ProductsProps) {
  const { lang } = useLanguage();
  const productsPage = productsPageRaw[lang];
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categoriesRef = useRef<HTMLElement>(null);
  const categoriesInView = useInView(categoriesRef, {
    once: true,
    margin: "-100px",
  });

  const bestSellersRef = useRef<HTMLElement>(null);
  const bestSellersInView = useInView(bestSellersRef, {
    once: true,
    margin: "-100px",
  });

  const allCategories = productsPage.tabs.filter((tab) => tab.id !== "all");
  const categories = showAllCategories
    ? allCategories
    : allCategories.slice(0, VISIBLE_CATEGORY_COUNT);
  const hasMoreCategories = allCategories.length > VISIBLE_CATEGORY_COUNT;

  return (
    <>
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
            />
            <Link href={data.section.viewAll.href} className={styles.viewAll}>
              {data.section.viewAll.label} →
            </Link>
          </div>

          {/* Category Showcase */}
          <div className={styles.categoryGrid}>
            {categories.map((category, index) => {
              const image = productsPage.items.find(
                (p) => p.category === category.id,
              )?.image;

              return (
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
                    href={`/products?category=${category.id}`}
                    className={styles.categoryCard}
                  >
                    <div className={styles.categoryImgWrap}>
                      {image && (
                        <Image
                          src={image}
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
                        <Icon name={lang === "fa" ? "arrow-left" : "arrow-right"} size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
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

      {/* CompactSearchBar disabled per request — component kept for potential future use */}

      <section
        className={styles.sectionAlt}
        ref={bestSellersRef}
        aria-label={data.bestSellers.title}
      >
        <Container>
          <div className={styles.header}>
            <SectionTitle
              title={data.bestSellers.title}
              subtitle={data.bestSellers.subtitle}
            />
          </div>

          {/* Swiper */}
          <motion.div
            className={styles.sliderWrap}
            initial={{ opacity: 0 }}
            animate={bestSellersInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1.2}
              centeredSlides={false}
              navigation={{
                nextEl: ".products-next",
                prevEl: ".products-prev",
              }}
              pagination={{ clickable: true, el: ".products-pagination" }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={data.items.length > 4}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
                1280: { slidesPerView: 5, spaceBetween: 20 },
              }}
              className={styles.swiper}
            >
              {data.items.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Nav */}
            <button
              className={`${styles.navBtn} ${styles.navPrev} products-prev`}
              aria-label={data.nav.prev}
            >
              <Icon name="chevron-right" size={20} />
            </button>
            <button
              className={`${styles.navBtn} ${styles.navNext} products-next`}
              aria-label={data.nav.next}
            >
              <Icon name="chevron-left" size={20} />
            </button>

            <div className={`products-pagination ${styles.pagination}`} />
          </motion.div>
        </Container>
      </section>
    </>
  );
}
