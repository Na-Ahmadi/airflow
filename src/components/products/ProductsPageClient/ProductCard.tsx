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

function PlaceholderImg() {
  return (
    <div className={styles.placeholder} aria-hidden>
      <svg viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="10" y="35" width="160" height="60" rx="4" fill="rgba(30,111,207,0.1)" stroke="rgba(30,111,207,0.3)" strokeWidth="1"/>
        {[0,1,2,3,4,5,6].map((i) => (
          <rect key={i} x={15 + i * 22} y="40" width="15" height="50" rx="2" fill="rgba(30,111,207,0.15)" stroke="rgba(30,111,207,0.4)" strokeWidth="0.8"/>
        ))}
        <rect x="10" y="30" width="160" height="7" rx="2" fill="rgba(30,111,207,0.2)"/>
        <rect x="10" y="93" width="160" height="7" rx="2" fill="rgba(30,111,207,0.2)"/>
      </svg>
    </div>
  );
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
        <PlaceholderImg />
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
