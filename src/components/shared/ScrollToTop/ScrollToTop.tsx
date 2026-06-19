'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/shared/Icon';
import styles from './ScrollToTop.module.css';

export default function ScrollToTop() {
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
      aria-label="بازگشت به بالا"
    >
      <Icon name="chevron-up" size={20} />
    </button>
  );
}
