"use client";

import Badge from "@/components/shared/Badge/Badge";
import Icon from "@/components/shared/Icon/Icon";
import { useLanguage } from "@/context/LanguageContext";
import productsRaw from "@/data/products.json";
import { getProductCardInfo } from "@/lib/productCardInfo";
import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Products.module.css";

export default function ProductCard({ product }: { product: Product }) {
  const { lang } = useLanguage();
  const { detailsCta } = productsRaw[lang].cardInfo;
  const [imgError, setImgError] = useState(false);
  const showPlaceholder = !product.image || imgError;
  const { tiles, features } = getProductCardInfo(product.id, lang);

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
        {tiles.length > 0 && (
          <ul className={styles.cardTiles}>
            {tiles.map((tile) => (
              <li key={tile.id} className={styles.cardTile}>
                <Icon name={tile.icon} size={20} className={styles.cardTileIcon} />
                <span className={styles.cardTileTitle}>{tile.title}</span>
                {tile.detail && (
                  <span className={styles.cardTileDetail}>{tile.detail}</span>
                )}
              </li>
            ))}
          </ul>
        )}
        {features.length > 0 && (
          <ul className={styles.cardFeatures}>
            {features.map((feature) => (
              <li key={feature} className={styles.cardFeature}>
                <Icon name="check" size={13} className={styles.cardFeatureIcon} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <span className={styles.cardBtn}>
          {detailsCta}
          <Icon name={lang === "fa" ? "chevron-left" : "chevron-right"} size={15} />
        </span>
      </div>
    </Link>
  );
}
