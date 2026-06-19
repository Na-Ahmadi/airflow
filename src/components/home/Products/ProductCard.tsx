import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import Badge from '@/components/shared/Badge/Badge';
import styles from './Products.module.css';

export default function ProductCard({ product }: { product: Product }) {
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
        <div className={styles.placeholder} aria-hidden>
          <Image src="/images/product-card-placeholder.svg" alt="" fill unoptimized />
        </div>
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
