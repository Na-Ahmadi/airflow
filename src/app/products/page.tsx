import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import ProductsPageClient from '@/components/products/ProductsPageClient/ProductsPageClient';
import type { NavData, FooterData } from '@/types';
import navDataRaw from '@/data/navigation.json';
import footerDataRaw from '@/data/footer.json';
import pageDataRaw from '@/data/products-page.json';

const navData = navDataRaw as unknown as NavData;
const footerData = footerDataRaw as unknown as FooterData;

export const metadata: Metadata = {
  title: 'محصولات',
  description: 'گستره کاملی از محصولات توزیع هوا — دریچه‌ها، دمپرها، تجهیزات کنترل و ملزومات',
};

export default function ProductsPage() {
  return (
    <>
      <Header data={navData} />
      <main>
        <ProductsPageClient
          breadcrumb={pageDataRaw.header.breadcrumb}
          pageTitle={pageDataRaw.header.title}
          tabs={pageDataRaw.tabs}
          items={pageDataRaw.items}
          cta={pageDataRaw.cta}
        />
      </main>
      <Footer data={footerData} />
    </>
  );
}
