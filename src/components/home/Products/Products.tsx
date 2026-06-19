'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { ProductsData } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle';
import Container from '@/components/shared/Container';
import Icon from '@/components/shared/Icon';
import ProductCard from './ProductCard';
import styles from './Products.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductsProps { data: ProductsData; }

export default function Products({ data }: ProductsProps) {
  const [activeTab, setActiveTab] = useState('all');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const filtered = activeTab === 'all'
    ? data.items
    : data.items.filter((p) => p.category === activeTab);

  return (
    <section className={styles.section} ref={ref} aria-label={data.section.title}>
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

        {/* Tabs */}
        <motion.div
          className={styles.tabs}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          {data.tabs.map((tab) => (
            <button
              key={tab.id}
              className={[styles.tab, activeTab === tab.id ? styles.tabActive : ''].filter(Boolean).join(' ')}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Swiper */}
        <motion.div
          className={styles.sliderWrap}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
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
            loop={filtered.length > 4}
            breakpoints={{
              480:  { slidesPerView: 2,   spaceBetween: 16 },
              768:  { slidesPerView: 3,   spaceBetween: 20 },
              1024: { slidesPerView: 4,   spaceBetween: 20 },
              1280: { slidesPerView: 5,   spaceBetween: 20 },
            }}
            className={styles.swiper}
          >
            {filtered.map((product) => (
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
  );
}
