import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';
import type { NavData, FooterData } from '@/types';
import navDataRaw from '@/data/navigation.json';
import footerDataRaw from '@/data/footer.json';
import projectsDetail from '@/data/projects-detail.json';

const navData = navDataRaw as unknown as NavData;
const footerData = footerDataRaw as unknown as FooterData;

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

  return (
    <>
      <Header data={navData} />
      <main>
        <ProjectDetailClient
          breadcrumb={breadcrumb}
          title={project.title}
          category={project.category}
          location={project.location}
          year={project.year}
          client={project.client}
          area={project.area}
          duration={project.duration}
          description={project.description}
          scope={project.scope}
          products={project.products}
          stats={project.stats}
          highlights={project.highlights}
          imageCount={project.imageCount}
        />
      </main>
      <Footer data={footerData} />
    </>
  );
}
