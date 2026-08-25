"use client";

import Badge from "@/components/shared/Badge/Badge";
import { useLanguage } from "@/context/LanguageContext";
import productsRaw from "@/data/products.json";
import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Products.module.css";

export default function ProductCard({ product }: { product: Product }) {
  const { lang } = useLanguage();
  const viewDetails = productsRaw[lang].viewDetails;
  const [imgError, setImgError] = useState(false);
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
            sizes="220px"
            onError={() => setImgError(true)}
          />
        )}
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
        <span className={styles.cardLink}>{viewDetails}</span>
      </div>
    </Link>
  );
}
