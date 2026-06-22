import ProductDetailClient from "@/components/products/ProductDetailClient/ProductDetailClient";
import productsDetail from "@/data/products-detail.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProductsDetail = typeof productsDetail;
type Slug = keyof ProductsDetail;

const TABS = [
  { id: "specs", label: "مشخصات فنی" },
  { id: "dimensions", label: "نقشه و ابعاد" },
  { id: "documents", label: "مستندات" },
  { id: "faq", label: "سوالات متداول" },
];

export function generateStaticParams() {
  return (Object.keys(productsDetail) as Slug[]).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productsDetail[slug as Slug];
  if (!product) return {};
  return {
    title: `${product.name} ${product.model}`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productsDetail[slug as Slug];

  if (!product) notFound();

  const breadcrumb = [
    { label: "خانه", href: "/" },
    { label: "محصولات", href: "/products" },
    { label: `${product.name} ${product.model}`, href: `/products/${slug}` },
  ];

  const images = product.images;

  console.log("image: ", images);
  return (
    <main>
      <ProductDetailClient
        breadcrumb={breadcrumb}
        name={product.name}
        model={product.model}
        description={product.description}
        features={product.features}
        images={images}
        cta={{
          inquiry: { label: "درخواست استعلام", href: "#contact" },
          catalog: { label: "دانلود کاتالوگ", href: "#catalog" },
        }}
        tabs={TABS}
        specs={product.specs}
        faq={product.faq}
      />
    </main>
  );
}
