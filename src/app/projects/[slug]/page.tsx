import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient/ProjectDetailClient';
import projectsDetail from '@/data/projects-detail.json';
import productsCatalog from '@/data/products.json';

type ProjectsDetail = typeof projectsDetail;
type Slug = keyof ProjectsDetail;

const FALLBACK_PRODUCT_IMAGE = '/images/product-detail-placeholder.svg';

function resolveProduct(label: string) {
  const seriesMatch = label.match(/[A-Z]{2,3}(?:-\d+)?/);
  const series = seriesMatch?.[0];
  const catalogItem = series
    ? productsCatalog.fa.items.find((item) =>
        item.series.toUpperCase().includes(series.split('-')[0]),
      )
    : undefined;

  return {
    name: label,
    model: series ?? label,
    description: catalogItem
      ? catalogItem.name
      : 'یکی از محصولات استاندارد استفاده‌شده در این پروژه، مطابق مشخصات فنی مورد نیاز طرح.',
    image: catalogItem?.image ?? FALLBACK_PRODUCT_IMAGE,
    href: catalogItem ? `/products/${catalogItem.id}` : '/products',
  };
}

export function generateStaticParams() {
  return (Object.keys(projectsDetail) as Slug[]).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsDetail[slug as Slug];
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = projectsDetail[slug as Slug];

  if (!project) notFound();

  const breadcrumb = [
    { label: 'خانه',       href: '/' },
    { label: 'پروژه‌ها',   href: '/projects' },
    { label: project.title, href: `/projects/${slug}` },
  ];

  const meta = [
    { icon: 'building', label: 'متراژ پروژه', value: project.area },
    { icon: 'location', label: 'مکان پروژه',  value: project.location },
    { icon: 'calendar', label: 'سال اجرا',     value: project.year },
    { icon: 'design',   label: 'کاربری پروژه', value: project.category },
    { icon: 'award',    label: 'وضعیت پروژه',  value: project.status },
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
        products={project.products.map(resolveProduct)}
        highlights={project.highlights}
      />
    </main>
  );
}
