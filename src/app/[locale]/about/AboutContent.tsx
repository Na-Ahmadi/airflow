"use client";

import AboutIntro from "@/components/about/AboutIntro/AboutIntro";
import AboutValues from "@/components/about/AboutValues/AboutValues";
import PageBanner from "@/components/shared/PageBanner/PageBanner";
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
      <PageBanner
        breadcrumb={about.breadcrumb}
        label={about.banner.label}
        title={about.banner.title}
        description={about.banner.description}
        image={about.banner.image}
        imageAlt={about.banner.imageAlt}
      />
      <AboutIntro
        title={about.intro.title}
        paragraphs={about.intro.paragraphs}
        button={about.intro.button}
        image={about.intro.image}
        imageAlt={about.intro.imageAlt}
        stats={about.intro.stats}
      />
      <AboutValues title={about.values.title} items={about.values.items} />
    </main>
  );
}
