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

export default function Products({ data }: ProductsProps) {
  const categoriesRef = useRef<HTMLElement>(null);
  const categoriesInView = useInView(categoriesRef, { once: true, margin: '-100px' });

  const bestSellersRef = useRef<HTMLElement>(null);
  const bestSellersInView = useInView(bestSellersRef, { once: true, margin: '-100px' });

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

          {/* Category Showcase */}
          <div className={styles.categoryGrid}>
            {data.categories.map((category, index) => (
              <motion.div
                key={category.id}
                className={styles.categoryGridItem}
                initial={{ opacity: 0, y: 24 }}
                animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <Link href={category.href} className={styles.categoryCard}>
                  <div className={styles.categoryImgWrap}>
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className={styles.categoryImg}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 620px"
                      priority={index < 2}
                    />
                    <div className={styles.categoryOverlay} aria-hidden />
                  </div>
                  <div className={styles.categoryContent}>
                    <span className={styles.categoryIcon} aria-hidden>
                      <Icon name={category.icon} size={22} />
                    </span>
                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                    <p className={styles.categorySubtitle}>{category.subtitle}</p>
                    <span className={styles.categoryCta}>
                      {data.categoryCta}
                      <Icon name="arrow-left" size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.sectionAlt} ref={bestSellersRef} aria-label={data.bestSellers.title}>
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
