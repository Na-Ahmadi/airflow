'use client';

import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import type { NavData, FooterData } from '@/types';
import navRaw from '@/data/navigation.json';
import footerRaw from '@/data/footer.json';

type Bilingual<T> = { fa: T; en: T };

export default function LanguageAwareShell({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();

  const nav    = (navRaw    as unknown as Bilingual<NavData>)[lang];
  const footer = (footerRaw as unknown as Bilingual<FooterData>)[lang];

  return (
    <>
      <Header data={nav} />
      <main>{children}</main>
      <Footer data={footer} />
    </>
  );
}
