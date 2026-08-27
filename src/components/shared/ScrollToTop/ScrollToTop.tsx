'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/shared/Icon/Icon';
import { useTranslations } from 'next-intl';
import styles from './ScrollToTop.module.css';

export default function ScrollToTop() {
  const t = useTranslations('scrollToTop');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      onClick={scrollUp}
      aria-label={t('label')}
    >
      <Icon name="chevron-up" size={20} />
    </button>
  );
}
