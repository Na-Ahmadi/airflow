'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { ProductsData, Product } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle';
import Container from '@/components/shared/Container';
import Badge from '@/components/shared/Badge';
import Icon from '@/components/shared/Icon';
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

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={product.href} className={styles.card}>
      <div className={styles.cardImgWrap}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={styles.cardImg}
          sizes="220px"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <ProductPlaceholderImg />
        {product.badge && (
          <div className={styles.cardBadge}>
            <Badge variant="accent">{product.badge}</Badge>
          </div>
        )}
        <div className={styles.cardOverlay} aria-hidden />
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardSeries}>{product.series}</span>
        <h3 className={styles.cardName}>{product.name}</h3>
        <span className={styles.cardLink}>مشاهده جزئیات →</span>
      </div>
    </Link>
  );
}

function ProductPlaceholderImg() {
  return (
    <div className={styles.placeholder} aria-hidden>
      <svg viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
        <rect x="10" y="35" width="160" height="60" rx="4" fill="rgba(30,111,207,0.1)" stroke="rgba(30,111,207,0.3)" strokeWidth="1"/>
        {[0,1,2,3,4,5,6].map((i) => (
          <rect key={i} x={15 + i*22} y="40" width="15" height="50" rx="2" fill="rgba(30,111,207,0.15)" stroke="rgba(30,111,207,0.4)" strokeWidth="0.8"/>
        ))}
        <rect x="10" y="30" width="160" height="7" rx="2" fill="rgba(30,111,207,0.2)"/>
        <rect x="10" y="93" width="160" height="7" rx="2" fill="rgba(30,111,207,0.2)"/>
      </svg>
    </div>
  );
}
