import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Resources from '@/components/home/Resources';
import Container from '@/components/shared/Container';
import type { NavData, FooterData, ResourcesData } from '@/types';
import navDataRaw from '@/data/navigation.json';
import footerDataRaw from '@/data/footer.json';
import resourcesDataRaw from '@/data/resources.json';

const navData = navDataRaw as unknown as NavData;
const footerData = footerDataRaw as unknown as FooterData;
const resourcesData = resourcesDataRaw as unknown as ResourcesData;

export const metadata: Metadata = {
  title: 'منابع فنی',
  description: 'دسترسی آسان به کاتالوگ‌ها، فایل‌های فنی و منابع آموزشی ایرفلو سیستم',
};

export default function ResourcesPage() {
  return (
    <>
      <Header data={navData} />
      <main>
        <div style={{
          background: 'var(--color-bg-secondary)',
          paddingTop: 'calc(var(--header-height) + 2.5rem)',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--color-border)',
          direction: 'rtl',
        }}>
          <Container>
            <h1 style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-text-primary)',
              margin: '0 0 0.75rem',
            }}>
              منابع فنی
            </h1>
            <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>خانه</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span>منابع فنی</span>
            </nav>
          </Container>
        </div>
        <Resources data={resourcesData} />
      </main>
      <Footer data={footerData} />
    </>
  );
}
