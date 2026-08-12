import Icon from '@/components/shared/Icon/Icon';
import { SITE_CONFIG } from '@/constants';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  return (
    <a
      className={styles.btn}
      href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="گفتگو در واتساپ"
    >
      <Icon name="whatsapp" size={26} />
    </a>
  );
}
