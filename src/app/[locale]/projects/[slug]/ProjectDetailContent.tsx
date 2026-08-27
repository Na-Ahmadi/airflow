"use client";

import ProjectDetailClient from "@/components/projects/ProjectDetailClient/ProjectDetailClient";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import productsCatalogRaw from "@/data/products.json";
import projectsDetailRaw from "@/data/projects-detail.json";
import projectsPageRaw from "@/data/projects-page.json";

type ProjectDetail = (typeof projectsDetailRaw)["fa"][keyof (typeof projectsDetailRaw)["fa"]];
export type Slug = keyof (typeof projectsDetailRaw)["fa"];

const FALLBACK_PRODUCT_IMAGE = "/images/product-detail-placeholder.svg";

function resolveProduct(label: string, locale: Locale, fallbackDescription: string) {
  const seriesMatch = label.match(/[A-Z]{2,3}(?:-\d+)?/);
  const series = seriesMatch?.[0];
  const catalogItem = series
    ? productsCatalogRaw[locale].items.find((item) =>
        item.series.toUpperCase().includes(series.split("-")[0]),
      )
    : undefined;

  return {
    name: label,
    model: series ?? label,
    description: catalogItem ? catalogItem.name : fallbackDescription,
    image: catalogItem?.image ?? FALLBACK_PRODUCT_IMAGE,
    href: catalogItem ? `/products/${catalogItem.id}` : "/products",
  };
}

interface Props {
  slug: Slug;
}

export default function ProjectDetailContent({ slug }: Props) {
  const locale = useLocale() as Locale;
  const tFallback = useTranslations("projectDetail");

  const projectsDetail = projectsDetailRaw[locale] as Record<Slug, ProjectDetail>;
  const project = projectsDetail[slug];

  const pageData = projectsPageRaw[locale];
  const t = pageData.detail;

  const breadcrumb = [
    { label: t.breadcrumb.home, href: "/" },
    { label: t.breadcrumb.projects, href: "/projects" },
    { label: project.title, href: `/projects/${slug}` },
  ];

  const meta = [
    { icon: "building", label: t.meta.area, value: project.area },
    { icon: "location", label: t.meta.location, value: project.location },
    { icon: "calendar", label: t.meta.year, value: project.year },
    { icon: "design", label: t.meta.category, value: project.category },
    { icon: "award", label: t.meta.status, value: project.status },
  ];

  return (
    <main>
      <ProjectDetailClient
        breadcrumb={breadcrumb}
        title={project.title}
        category={project.category}
        location={project.location}
        year={project.year}
        heroImage={project.image}
        meta={meta}
        description={project.description}
        scope={project.scope}
        products={project.products.map((p) => resolveProduct(p, locale, tFallback("fallbackDescription")))}
        highlights={project.highlights}
        sectionLabels={t.sections}
        serviceItems={t.serviceItems}
        modelLabel={t.modelLabel}
      />
    </main>
  );
}
