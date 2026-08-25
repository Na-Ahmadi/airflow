import ProductDetailContent from "./ProductDetailContent";
import productsDetail from "@/data/products-detail.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Slug = keyof (typeof productsDetail)["fa"];

export function generateStaticParams() {
  return (Object.keys(productsDetail.fa) as Slug[]).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productsDetail.fa[slug as Slug];
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

  if (!productsDetail.fa[slug as Slug]) notFound();

  return <ProductDetailContent slug={slug as Slug} />;
}
