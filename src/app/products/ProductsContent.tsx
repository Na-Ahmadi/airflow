'use client';

import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ProductsPageClient from '@/components/products/ProductsPageClient/ProductsPageClient';
import type { NavData, FooterData } from '@/types';
import navRaw from '@/data/navigation.json';
import footerRaw from '@/data/footer.json';
import pageRaw from '@/data/products-page.json';

type BillingualNav    = { fa: NavData;    en: NavData    };
type BillingualFooter = { fa: FooterData; en: FooterData };
type PageData = typeof pageRaw.fa;
type BillingualPage = { fa: PageData; en: PageData };

export default function ProductsContent() {
  const { lang } = useLanguage();

  const nav    = (navRaw    as unknown as BillingualNav)[lang];
  const footer = (footerRaw as unknown as BillingualFooter)[lang];
  const page   = (pageRaw   as unknown as BillingualPage)[lang];

  return (
    <>
      <Header data={nav} />
      <main>
        <ProductsPageClient
          breadcrumb={page.header.breadcrumb}
          pageTitle={page.header.title}
          tabs={page.tabs}
          items={page.items}
          cta={page.cta}
        />
      </main>
      <Footer data={footer} />
    </>
  );
}
