'use client';

import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import AboutHero from '@/components/about/AboutHero/AboutHero';
import AboutValues from '@/components/about/AboutValues/AboutValues';
import type { NavData, FooterData } from '@/types';
import navRaw from '@/data/navigation.json';
import footerRaw from '@/data/footer.json';
import aboutRaw from '@/data/about.json';

type BillingualNav    = { fa: NavData;    en: NavData    };
type BillingualFooter = { fa: FooterData; en: FooterData };

type AboutData = typeof aboutRaw.fa;
type BillingualAbout = { fa: AboutData; en: AboutData };

export default function AboutContent() {
  const { lang } = useLanguage();

  const nav    = (navRaw    as unknown as BillingualNav)[lang];
  const footer = (footerRaw as unknown as BillingualFooter)[lang];
  const about  = (aboutRaw  as unknown as BillingualAbout)[lang];

  return (
    <>
      <Header data={nav} />
      <main>
        <AboutHero
          breadcrumb={about.breadcrumb}
          title={about.hero.title}
          paragraphs={about.hero.paragraphs}
          button={about.hero.button}
          image={about.hero.image}
          stats={about.hero.stats}
        />
        <AboutValues
          title={about.values.title}
          items={about.values.items}
        />
      </main>
      <Footer data={footer} />
    </>
  );
}
