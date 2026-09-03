"use client";

import { useState } from "react";
import Badge from "@/components/shared/Badge/Badge";
import { useLanguage } from "@/context/LanguageContext";
import productsRaw from "@/data/products.json";
import { getProductCardInfo } from "@/lib/productCardInfo";
import Icon from "@/components/shared/Icon/Icon";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductsPageClient.module.css";

export interface ProductItem {
  id: string;
  category: string;
  image: string;
  name: string;
  series: string;
  model: string;
  href: string;
  badge: string | null;
}

export default function ProductCard({ product }: { product: ProductItem }) {
  const { lang } = useLanguage();
  const viewDetails = productsRaw[lang].viewDetailsPlain;
  const [imgError, setImgError] = useState(false);
  const infoRows = getProductCardInfo(product.id, lang);

  const showPlaceholder = !product.image || imgError;

  return (
    <Link href={product.href} className={styles.card}>
      <div className={styles.cardImgWrap}>
        {showPlaceholder ? (
          <div className={styles.placeholder} aria-hidden>
            <Image
              src="/images/product-card-placeholder.svg"
              alt=""
              fill
              unoptimized
            />
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={styles.cardImg}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        )}
        {product.badge && (
          <div className={styles.cardBadge}>
            <Badge variant="accent">{product.badge}</Badge>
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{product.name}</h3>
        <span className={styles.cardSeries}>{product.series}</span>
        {infoRows.length > 0 && (
          <ul className={styles.cardInfo}>
            {infoRows.map((row) => (
              <li key={row.id} className={styles.cardInfoRow}>
                <Icon name={row.icon} size={14} className={styles.cardInfoIcon} />
                <span className={styles.cardInfoText}>{row.text}</span>
              </li>
            ))}
          </ul>
        )}
        <span className={styles.cardBtn}>{viewDetails}</span>
      </div>
    </Link>
  );
}
