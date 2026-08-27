"use client";

import Resources from "@/components/home/Resources/Resources";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import Container from "@/components/shared/Container/Container";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { LOCALE_DIR } from "@/i18n/direction";
import { pickLocale } from "@/lib/pickLocale";
import resourcesRaw from "@/data/resources.json";
import type { ResourcesData } from "@/types";

type BillingualResources = { fa: ResourcesData; en: ResourcesData };

export default function ResourcesContent() {
  const locale = useLocale() as Locale;
  const dir = LOCALE_DIR[locale];
  const t = useTranslations("resources");

  const resources = pickLocale(resourcesRaw as unknown as BillingualResources, locale);

  return (
    <main>
      <div
        style={{
          background: "var(--color-bg-secondary)",
          paddingTop: "calc(var(--header-height) + var(--space-10))",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--color-border)",
          direction: dir,
        }}
      >
        <Container>
          <h1
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: "var(--font-bold)",
              color: "var(--color-text-primary)",
              margin: "0 0 0.75rem",
            }}
          >
            {t("title")}
          </h1>
          <Breadcrumb
            items={[
              { label: t("home"), href: "/" },
              { label: t("title"), href: "/resources" },
            ]}
          />
        </Container>
      </div>
      <Resources data={resources} />
    </main>
  );
}
