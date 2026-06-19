'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Resources from '@/components/home/Resources/Resources';
import Container from '@/components/shared/Container/Container';
import type { ResourcesData } from '@/types';
import resourcesRaw from '@/data/resources.json';

type BillingualResources = { fa: ResourcesData; en: ResourcesData };

const labels = {
  fa: { title: 'منابع فنی', home: 'خانه' },
  en: { title: 'Technical Resources', home: 'Home' },
};

export default function ResourcesContent() {
  const { lang, dir } = useLanguage();

  const resources = (resourcesRaw as unknown as BillingualResources)[lang];
  const t = labels[lang];

  return (
    <main>
      <div style={{
        background: 'var(--color-bg-secondary)',
        paddingTop: 'calc(var(--header-height) + 2.5rem)',
        paddingBottom: '2rem',
        borderBottom: '1px solid var(--color-border)',
        direction: dir,
      }}>
        <Container>
          <h1 style={{
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-text-primary)',
            margin: '0 0 0.75rem',
          }}>
            {t.title}
          </h1>
          <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>{t.home}</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{t.title}</span>
          </nav>
        </Container>
      </div>
      <Resources data={resources} />
    </main>
  );
}
