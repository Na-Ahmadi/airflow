import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient/ProjectDetailClient';
import projectsDetail from '@/data/projects-detail.json';

type ProjectsDetail = typeof projectsDetail;
type Slug = keyof ProjectsDetail;

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
        meta={meta}
        description={project.description}
        scope={project.scope}
        products={project.products}
        highlights={project.highlights}
        imageCount={project.imageCount}
      />
    </main>
  );
}
