'use client';

import { useLanguage } from '@/context/LanguageContext';
import ProductsPageClient from '@/components/products/ProductsPageClient/ProductsPageClient';
import pageRaw from '@/data/products-page.json';

type PageData = typeof pageRaw.fa;
type BillingualPage = { fa: PageData; en: PageData };

export default function ProductsContent() {
  const { lang } = useLanguage();

  const page = (pageRaw as unknown as BillingualPage)[lang];

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
