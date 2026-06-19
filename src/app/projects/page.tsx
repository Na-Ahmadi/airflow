import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectsPageClient from '@/components/projects/ProjectsPageClient';
import type { NavData, FooterData, Project } from '@/types';
import navDataRaw from '@/data/navigation.json';
import footerDataRaw from '@/data/footer.json';
import projectsDataRaw from '@/data/projects.json';
import pageDataRaw from '@/data/projects-page.json';

const navData = navDataRaw as unknown as NavData;
const footerData = footerDataRaw as unknown as FooterData;

export const metadata: Metadata = {
  title: 'پروژه‌ها',
  description: 'نمونه‌ای از پروژه‌های موفق ابرفلو سیستم در سراسر ایران',
};

export default function ProjectsPage() {
  return (
    <>
      <Header data={navData} />
      <main>
        <ProjectsPageClient
          breadcrumb={pageDataRaw.header.breadcrumb}
          pageTitle={pageDataRaw.header.title}
          tabs={pageDataRaw.tabs}
          items={projectsDataRaw.items as unknown as Project[]}
        />
      </main>
      <Footer data={footerData} />
    </>
  );
}
