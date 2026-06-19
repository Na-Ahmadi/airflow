'use client';

import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ProjectsPageClient from '@/components/projects/ProjectsPageClient/ProjectsPageClient';
import type { NavData, FooterData, Project } from '@/types';
import navRaw from '@/data/navigation.json';
import footerRaw from '@/data/footer.json';
import projectsRaw from '@/data/projects.json';
import pageRaw from '@/data/projects-page.json';

type BillingualNav      = { fa: NavData;    en: NavData    };
type BillingualFooter   = { fa: FooterData; en: FooterData };
type ProjectsData = typeof projectsRaw.fa;
type BillingualProjects = { fa: ProjectsData; en: ProjectsData };
type PageData = typeof pageRaw.fa;
type BillingualPage = { fa: PageData; en: PageData };

export default function ProjectsContent() {
  const { lang } = useLanguage();

  const nav      = (navRaw      as unknown as BillingualNav)[lang];
  const footer   = (footerRaw   as unknown as BillingualFooter)[lang];
  const projects = (projectsRaw as unknown as BillingualProjects)[lang];
  const page     = (pageRaw     as unknown as BillingualPage)[lang];

  return (
    <>
      <Header data={nav} />
      <main>
        <ProjectsPageClient
          breadcrumb={page.header.breadcrumb}
          pageTitle={page.header.title}
          tabs={page.tabs}
          items={projects.items as unknown as Project[]}
        />
      </main>
      <Footer data={footer} />
    </>
  );
}
