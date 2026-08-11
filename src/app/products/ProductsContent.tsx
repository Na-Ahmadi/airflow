'use client';

import { useLanguage } from '@/context/LanguageContext';
import ProductsPageClient from '@/components/products/ProductsPageClient/ProductsPageClient';
import pageRaw from '@/data/products-page.json';
import { useSearchParams } from 'next/navigation';

type PageData = typeof pageRaw.fa;
type BillingualPage = { fa: PageData; en: PageData };

export default function ProductsContent() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const page = (pageRaw as unknown as BillingualPage)[lang];

  return (
    <main>
      <ProductsPageClient
        key={category}
        breadcrumb={page.header.breadcrumb}
        pageTitle={page.header.title}
        tabs={page.tabs}
        items={page.items}
        cta={page.cta}
      />
    </main>
  );
}
