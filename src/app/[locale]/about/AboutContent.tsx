"use client";

import AboutHero from "@/components/about/AboutHero/AboutHero";
import AboutValues from "@/components/about/AboutValues/AboutValues";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { pickLocale } from "@/lib/pickLocale";
import aboutRaw from "@/data/about.json";

type AboutData = typeof aboutRaw.fa;
type BillingualAbout = { fa: AboutData; en: AboutData };

export default function AboutContent() {
  const locale = useLocale() as Locale;

  const about = pickLocale(aboutRaw as unknown as BillingualAbout, locale);

  return (
    <main>
      <AboutHero
        breadcrumb={about.breadcrumb}
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
