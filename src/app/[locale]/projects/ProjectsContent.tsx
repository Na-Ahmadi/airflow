'use client';

import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/pickLocale';
import ProjectsPageClient from '@/components/projects/ProjectsPageClient/ProjectsPageClient';
import type { Project } from '@/types';
import projectsRaw from '@/data/projects.json';
import pageRaw from '@/data/projects-page.json';

type ProjectsData = typeof projectsRaw.fa;
type BillingualProjects = { fa: ProjectsData; en: ProjectsData };
type PageData = typeof pageRaw.fa;
type BillingualPage = { fa: PageData; en: PageData };

export default function ProjectsContent() {
  const locale = useLocale() as Locale;

  const projects = pickLocale(projectsRaw as unknown as BillingualProjects, locale);
  const page = pickLocale(pageRaw as unknown as BillingualPage, locale);

  return (
    <main>
      <ProjectsPageClient
        breadcrumb={page.header.breadcrumb}
        pageTitle={page.header.title}
        pageLabel={page.header.label}
        pageDescription={page.header.description}
        tabs={page.tabs}
        items={projects.items as unknown as Project[]}
      />
    </main>
  );
}
