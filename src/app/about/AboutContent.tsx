"use client";

import AboutHero from "@/components/about/AboutHero/AboutHero";
import AboutValues from "@/components/about/AboutValues/AboutValues";
import PageBanner from "@/components/shared/PageBanner/PageBanner";
import { useLanguage } from "@/context/LanguageContext";
import aboutRaw from "@/data/about.json";

type AboutData = typeof aboutRaw.fa;
type BillingualAbout = { fa: AboutData; en: AboutData };

export default function AboutContent() {
  const { lang } = useLanguage();

  const about = (aboutRaw as unknown as BillingualAbout)[lang];

  return (
    <main>
      <PageBanner
        breadcrumb={about.breadcrumb}
        label={about.banner.label}
        title={about.banner.title}
        description={about.banner.description}
        image={about.banner.image}
        imageAlt={about.banner.imageAlt}
      />
      <AboutHero
        title={about.hero.title}
        paragraphs={about.hero.paragraphs}
        button={about.hero.button}
        image={about.hero.image}
        imageAlt={about.hero.imageAlt}
        stats={about.hero.stats}
      />
      <AboutValues title={about.values.title} items={about.values.items} />
    </main>
  );
}
