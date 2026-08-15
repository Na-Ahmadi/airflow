'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { ProductsData } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle/SectionTitle';
import Container from '@/components/shared/Container/Container';
import Icon from '@/components/shared/Icon/Icon';
import ProductCard from './ProductCard';
import styles from './Products.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductsProps { data: ProductsData; }

// Homepage category ids map to the broader tabs on the /products page.
const CATEGORY_TO_PRODUCTS_TAB: Record<string, string> = {
  linear: 'vents',
  ceiling: 'vents',
  multiway: 'vents',
  damper: 'dampers',
  accessory: 'accessories',
};

export default function Products({ data }: ProductsProps) {
  const categoriesRef = useRef<HTMLElement>(null);
  const categoriesInView = useInView(categoriesRef, { once: true, margin: '-100px' });

  const bestSellersRef = useRef<HTMLElement>(null);
  const bestSellersInView = useInView(bestSellersRef, { once: true, margin: '-100px' });

  const categories = data.tabs.filter((tab) => tab.id !== 'all');

  return (
    <>
      <section className={styles.section} ref={categoriesRef} aria-label={data.section.title}>
        <Container>
          <div className={styles.header}>
            <SectionTitle
              tag={data.section.tag}
              title={data.section.title}
              subtitle={data.section.subtitle}
            />
            <Link href={data.section.viewAll.href} className={styles.viewAll}>
              {data.section.viewAll.label} →
            </Link>
          </div>

          {/* Category Cards */}
          <motion.div
            className={styles.categorySliderWrap}
            initial={{ opacity: 0, y: 20 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={2.2}
              navigation={{
                nextEl: '.categories-next',
                prevEl: '.categories-prev',
              }}
              breakpoints={{
                480:  { slidesPerView: 2.5, spaceBetween: 16 },
                768:  { slidesPerView: 3,   spaceBetween: 16 },
                1024: { slidesPerView: 4,   spaceBetween: 16 },
                1280: { slidesPerView: 5,   spaceBetween: 16 },
              }}
              className={styles.categorySwiper}
            >
              {categories.map((category) => {
                const image = data.items.find((p) => p.category === category.id)?.image;
                const productsTab = CATEGORY_TO_PRODUCTS_TAB[category.id] ?? 'all';

                return (
                  <SwiperSlide key={category.id}>
                    <Link
                      href={`/products?category=${productsTab}`}
                      className={styles.categoryCard}
                    >
                      <div className={styles.categoryImgWrap}>
                        {image && (
                          <Image
                            src={image}
                            alt={category.label}
                            fill
                            className={styles.categoryImg}
                            sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 220px"
                          />
                        )}
                      </div>
                      <span className={styles.categoryLabel}>{category.label}</span>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <button className={`${styles.navBtn} ${styles.navPrev} categories-prev`} aria-label="قبلی">
              <Icon name="chevron-right" size={20} />
            </button>
            <button className={`${styles.navBtn} ${styles.navNext} categories-next`} aria-label="بعدی">
              <Icon name="chevron-left" size={20} />
            </button>
          </motion.div>
        </Container>
      </section>

      <section className={styles.section} ref={bestSellersRef} aria-label={data.bestSellers.title}>
        <Container>
          <div className={styles.header}>
            <SectionTitle
              tag={data.bestSellers.tag}
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
                nextEl: '.products-next',
                prevEl: '.products-prev',
              }}
              pagination={{ clickable: true, el: '.products-pagination' }}
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop={data.items.length > 4}
              breakpoints={{
                480:  { slidesPerView: 2,   spaceBetween: 16 },
                768:  { slidesPerView: 3,   spaceBetween: 20 },
                1024: { slidesPerView: 4,   spaceBetween: 20 },
                1280: { slidesPerView: 5,   spaceBetween: 20 },
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
            <button className={`${styles.navBtn} ${styles.navPrev} products-prev`} aria-label="قبلی">
              <Icon name="chevron-right" size={20} />
            </button>
            <button className={`${styles.navBtn} ${styles.navNext} products-next`} aria-label="بعدی">
              <Icon name="chevron-left" size={20} />
            </button>

            <div className={`products-pagination ${styles.pagination}`} />
          </motion.div>
        </Container>
      </section>
    </>
  );
}
