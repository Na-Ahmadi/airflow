'use client';

import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/pickLocale';
import ProductsPageClient from '@/components/products/ProductsPageClient/ProductsPageClient';
import pageRaw from '@/data/products-page.json';

type PageData = typeof pageRaw.fa;
type BillingualPage = { fa: PageData; en: PageData };

export default function ProductsContent() {
  const locale = useLocale() as Locale;
  const page = pickLocale(pageRaw as unknown as BillingualPage, locale);

  return (
    <main>
      <ProductsPageClient
        breadcrumb={page.header.breadcrumb}
        pageTitle={page.header.title}
        tabs={page.tabs}
        items={page.items}
        cta={page.cta}
      />
    </main>
  );
}
