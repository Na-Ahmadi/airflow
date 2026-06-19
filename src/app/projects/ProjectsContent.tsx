'use client';

import { useLanguage } from '@/context/LanguageContext';
import ProjectsPageClient from '@/components/projects/ProjectsPageClient/ProjectsPageClient';
import type { Project } from '@/types';
import projectsRaw from '@/data/projects.json';
import pageRaw from '@/data/projects-page.json';

type ProjectsData = typeof projectsRaw.fa;
type BillingualProjects = { fa: ProjectsData; en: ProjectsData };
type PageData = typeof pageRaw.fa;
type BillingualPage = { fa: PageData; en: PageData };

export default function ProjectsContent() {
  const { lang } = useLanguage();

  const projects = (projectsRaw as unknown as BillingualProjects)[lang];
  const page     = (pageRaw     as unknown as BillingualPage)[lang];

  return (
    <main>
      <ProjectsPageClient
        breadcrumb={page.header.breadcrumb}
        pageTitle={page.header.title}
        tabs={page.tabs}
        items={projects.items as unknown as Project[]}
      />
    </main>
  );
}
