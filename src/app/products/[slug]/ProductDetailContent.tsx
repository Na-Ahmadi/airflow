"use client";

import ProductDetailClient from "@/components/products/ProductDetailClient/ProductDetailClient";
import { useLanguage } from "@/context/LanguageContext";
import productsDetailRaw from "@/data/products-detail.json";
import productsPageRaw from "@/data/products-page.json";

type ProductDetail = (typeof productsDetailRaw)["fa"][keyof (typeof productsDetailRaw)["fa"]];
type Slug = keyof (typeof productsDetailRaw)["fa"];

interface Props {
  slug: Slug;
}

export default function ProductDetailContent({ slug }: Props) {
  const { lang } = useLanguage();

  const productsDetail = productsDetailRaw[lang] as Record<Slug, ProductDetail>;
  const product = productsDetail[slug];

  const pageData = productsPageRaw[lang];
  const t = pageData.detail;

  const breadcrumb = [
    { label: t.breadcrumb.home, href: "/" },
    { label: t.breadcrumb.products, href: "/products" },
    { label: `${product.name} ${product.model}`, href: `/products/${slug}` },
  ];

  const tabs = [
    { id: "specs", label: t.tabs.specs },
    { id: "dimensions", label: t.tabs.dimensions },
    { id: "documents", label: t.tabs.documents },
    { id: "faq", label: t.tabs.faq },
  ];

  return (
    <main>
      <ProductDetailClient
        breadcrumb={breadcrumb}
        name={product.name}
        model={product.model}
        description={product.description}
        features={product.features}
        images={product.images}
        cta={{
          inquiry: { label: t.cta.inquiry, href: "#contact" },
          catalog: { label: t.cta.catalog, href: "#catalog" },
        }}
        tabs={tabs}
        specs={product.specs}
        faq={product.faq}
        dimensionsNote={t.dimensionsNote}
        documents={t.documents}
        downloadLabel={t.downloadLabel}
      />
    </main>
  );
}
