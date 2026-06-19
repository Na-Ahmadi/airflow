import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import AboutHero from '@/components/about/AboutHero/AboutHero';
import AboutValues from '@/components/about/AboutValues/AboutValues';
import type { NavData, FooterData } from '@/types';
import navDataRaw from '@/data/navigation.json';
import footerDataRaw from '@/data/footer.json';
import aboutDataRaw from '@/data/about.json';

const navData = navDataRaw as unknown as NavData;
const footerData = footerDataRaw as unknown as FooterData;

export const metadata: Metadata = {
  title: 'درباره ما',
  description: 'ابرفلو سیستم — پیشرو در طراحی و اجرای سیستم‌های توزیع هوا در ایران',
};

export default function AboutPage() {
  return (
    <>
      <Header data={navData} />
      <main>
        <AboutHero
          breadcrumb={aboutDataRaw.breadcrumb}
          title={aboutDataRaw.hero.title}
          paragraphs={aboutDataRaw.hero.paragraphs}
          button={aboutDataRaw.hero.button}
          image={aboutDataRaw.hero.image}
          stats={aboutDataRaw.hero.stats}
        />
        <AboutValues
          title={aboutDataRaw.values.title}
          items={aboutDataRaw.values.items}
        />
      </main>
      <Footer data={footerData} />
    </>
  );
}
