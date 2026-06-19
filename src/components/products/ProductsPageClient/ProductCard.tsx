import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/shared/Badge';
import styles from './ProductsPageClient.module.css';

export interface ProductItem {
  id: string;
  category: string;
  image: string;
  name: string;
  series: string;
  href: string;
  badge: string | null;
}


export default function ProductCard({ product }: { product: ProductItem }) {
  return (
    <Link href={product.href} className={styles.card}>
      <div className={styles.cardImgWrap}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={styles.cardImg}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
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
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{product.name}</h3>
        <span className={styles.cardSeries}>{product.series}</span>
        <span className={styles.cardBtn}>مشاهده جزئیات</span>
      </div>
    </Link>
  );
}
