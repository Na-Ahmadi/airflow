"use client";

import type { BreadcrumbItem } from "@/components/shared/Breadcrumb/Breadcrumb";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import Button from "@/components/shared/Button/Button";
import Container from "@/components/shared/Container/Container";
import FilterTabs from "@/components/shared/FilterTabs/FilterTabs";
import type { TabItem } from "@/components/shared/FilterTabs/FilterTabs";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ProductItem } from "./ProductCard";
import ProductCard from "./ProductCard";
import styles from "./ProductsPageClient.module.css";

interface Cta {
  title: string;
  subtitle: string;
  button: { label: string; href: string };
}

interface Props {
  breadcrumb: BreadcrumbItem[];
  pageTitle: string;
  tabs: TabItem[];
  items: ProductItem[];
  cta: Cta;
}

export default function ProductsPageClient({
  breadcrumb,
  pageTitle,
  tabs,
  items,
  cta,
}: Props) {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all" ? items : items.filter((p) => p.category === activeTab);

  return (
    <>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <Container>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <Breadcrumb items={breadcrumb} />
        </Container>
      </div>

      {/* Products Grid */}
      <section className={styles.section}>
        <Container>
          {/* Tabs */}
          <FilterTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          {/* Grid */}
          <motion.div className={styles.grid} layout>
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <p className={styles.empty}>
                  محصولی در این دسته‌بندی یافت نشد.
                </p>
              ) : (
                filtered.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* CTA Banner */}
      <div className={styles.cta}>
        <Container>
          <div className={styles.ctaInner}>
            <div className={styles.ctaText}>
              <h2 className={styles.ctaTitle}>{cta.title}</h2>
              <p className={styles.ctaSubtitle}>{cta.subtitle}</p>
            </div>
            <Button href={cta.button.href} variant="primary" size="lg">
              {cta.button.label}
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
