'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { ProjectsData, Project } from '@/types';
import SectionTitle from '@/components/shared/SectionTitle';
import Container from '@/components/shared/Container';
import Badge from '@/components/shared/Badge';
import Icon from '@/components/shared/Icon';
import styles from './Projects.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectsProps { data: ProjectsData; }

export default function Projects({ data }: ProjectsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.section} ref={ref} aria-label={data.section.title}>
      <Container>
        <div className={styles.sectionHeader}>
          <SectionTitle
            tag={data.section.tag}
            title={data.section.title}
            subtitle={data.section.subtitle}
            align="start"
          />
          <Link href={data.section.viewAll.href} className={styles.viewAll}>
            {data.section.viewAll.label} →
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
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={`${styles.navBtn} ${styles.navPrev} projects-prev`} aria-label="قبلی">
          <Icon name="chevron-right" size={20} />
        </button>
        <button className={`${styles.navBtn} ${styles.navNext} projects-next`} aria-label="بعدی">
          <Icon name="chevron-left" size={20} />
        </button>

        <div className={`projects-pagination ${styles.pagination}`} />
      </motion.div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.href} className={styles.card}>
      <div className={styles.imgWrap}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={styles.img}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <ProjectPlaceholder title={project.title} />
        <div className={styles.overlay} aria-hidden />
        <div className={styles.overlayContent}>
          <Badge variant="accent">{project.category}</Badge>
          <div className={styles.overlayMeta}>
            <Icon name="location" size={14} />
            <span>{project.location}</span>
          </div>
        </div>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.title}>{project.title}</h3>
        <span className={styles.link}>مشاهده مطالعه موردی →</span>
      </div>
    </Link>
  );
}

function ProjectPlaceholder({ title }: { title: string }) {
  const colors = ['#0a1e3d', '#0d2444', '#081528', '#0e2040'];
  const idx = title.length % colors.length;
  return (
    <div className={styles.placeholder} style={{ background: colors[idx] }} aria-hidden>
      <Icon name="building" size={48} style={{ color: 'rgba(30,111,207,0.4)' }} />
      <span>{title}</span>
    </div>
  );
}
