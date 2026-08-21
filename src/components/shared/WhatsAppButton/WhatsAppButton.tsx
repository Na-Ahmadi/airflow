'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/shared/Icon/Icon';
import { SITE_CONFIG } from '@/constants';
import styles from './WhatsAppButton.module.css';

const SHOW_INTERVAL_MS = 6000;
const SHOW_DURATION_MS = 3000;

export default function WhatsAppButton() {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBubble(true);
      const hideTimeout = setTimeout(() => setShowBubble(false), SHOW_DURATION_MS);
      return () => clearTimeout(hideTimeout);
    }, SHOW_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <a
        className={`${styles.bubble} ${showBubble ? styles.bubbleVisible : ''}`}
        href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        استعلام سریع در واتساپ
      </a>
      <a
        className={styles.btn}
        href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="گفتگو در واتساپ"
      >
        <Icon name="whatsapp" size={26} />
      </a>
    </div>
  );
}
