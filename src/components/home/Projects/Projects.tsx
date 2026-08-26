'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { ProjectsData } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle/SectionTitle';
import Container from '@/components/shared/Container/Container';
import ProjectCard from '@/components/shared/ProjectCard/ProjectCard';
import Icon from '@/components/shared/Icon/Icon';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Projects.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectsProps { data: ProjectsData; }

export default function Projects({ data }: ProjectsProps) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.section} ref={ref} aria-label={data.section.title}>
      <Container>
        <div className={styles.sectionHeader}>
          <SectionTitle
            title={data.section.title}
            subtitle={data.section.subtitle}
            align="start"
          />
          <Link href={data.section.viewAll.href} className={styles.viewAll}>
            {data.section.viewAll.label}
            <Icon name={lang === 'fa' ? 'arrow-left' : 'arrow-right'} size={14} />
          </Link>
        </div>
      </Container>

      <motion.div
        className={styles.sliderWrap}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          centeredSlides={false}
          navigation={{
            nextEl: '.projects-next',
            prevEl: '.projects-prev',
          }}
          pagination={{ clickable: true, el: '.projects-pagination' }}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          breakpoints={{
            480:  { slidesPerView: 1.8, spaceBetween: 14 },
            640:  { slidesPerView: 2.3, spaceBetween: 16 },
            1024: { slidesPerView: 3.3, spaceBetween: 18 },
            1280: { slidesPerView: 4.2, spaceBetween: 18 },
          }}
          className={styles.swiper}
        >
          {data.items.map((project) => (
            <SwiperSlide key={project.id} className={styles.slide}>
              <ProjectCard project={project} variant="carousel" />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={`${styles.navBtn} ${styles.navPrev} projects-prev`} aria-label={data.nav.prev}>
          <Icon name="chevron-right" size={20} />
        </button>
        <button className={`${styles.navBtn} ${styles.navNext} projects-next`} aria-label={data.nav.next}>
          <Icon name="chevron-left" size={20} />
        </button>

        <div className={`projects-pagination ${styles.pagination}`} />
      </motion.div>
    </section>
  );
}

