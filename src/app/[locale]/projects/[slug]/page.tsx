import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectDetailContent, { type Slug } from './ProjectDetailContent';
import projectsDetail from '@/data/projects-detail.json';

export function generateStaticParams() {
  return (Object.keys(projectsDetail.fa) as Slug[]).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsDetail.fa[slug as Slug];
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

  if (!projectsDetail.fa[slug as Slug]) notFound();

  return <ProjectDetailContent slug={slug as Slug} />;
}
