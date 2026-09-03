"use client";

import ContactForm from "@/components/home/ContactForm/ContactForm";
import Hero from "@/components/home/Hero/Hero";
import Partners from "@/components/home/Partners/Partners";
import BestSellers from "@/components/home/Products/BestSellers";
import ProductCategories from "@/components/home/Products/ProductCategories";
import Projects from "@/components/home/Projects/Projects";
import Resources from "@/components/home/Resources/Resources";
import Statistics from "@/components/home/Statistics/Statistics";
import WhyUs from "@/components/home/WhyUs/WhyUs";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { pickLocale } from "@/lib/pickLocale";

import type {
  BestSellersData,
  HeroData,
  PartnersData,
  ProductCategoriesData,
  ProductsData,
  ProjectsData,
  ResourcesData,
  StatisticsData,
  WhyUsData,
} from "@/types";

import contactRaw from "@/data/contact.json";
import heroRaw from "@/data/hero.json";
import partnersRaw from "@/data/partners.json";
import productsRaw from "@/data/products.json";
import productsPageRaw from "@/data/products-page.json";
import projectsRaw from "@/data/projects.json";
import resourcesRaw from "@/data/resources.json";
import statisticsRaw from "@/data/statistics.json";
import whyUsRaw from "@/data/whyus.json";

type BillingualHero = { fa: HeroData; en: HeroData };
type BillingualPartners = { fa: PartnersData; en: PartnersData };
type BillingualWhyUs = { fa: WhyUsData; en: WhyUsData };
type BillingualProducts = { fa: ProductsData; en: ProductsData };
type BillingualProjects = { fa: ProjectsData; en: ProjectsData };
type BillingualStatistics = { fa: StatisticsData; en: StatisticsData };
type BillingualResources = { fa: ResourcesData; en: ResourcesData };

type ContactField = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
};

type ContactDetail = {
  icon: string;
  label: string;
  value: string;
  href?: string;
};

type ContactData = {
  section: { tag: string; title: string; subtitle: string };
  contactDetails: ContactDetail[];
  fields: ContactField[];
  projectTypes: string[];
  fileInfo: { label: string; hint: string };
  submit: {
    label: string;
    loading: string;
    success: string;
    error: string;
    newMessage: string;
  };
};
type BillingualContact = { fa: ContactData; en: ContactData };

export default function HomeContent() {
  const locale = useLocale() as Locale;

  const hero = pickLocale(heroRaw as unknown as BillingualHero, locale);
  const partners = pickLocale(partnersRaw as unknown as BillingualPartners, locale);
  const whyUs = pickLocale(whyUsRaw as unknown as BillingualWhyUs, locale);
  const products = pickLocale(productsRaw as unknown as BillingualProducts, locale);
  const productsPage = productsPageRaw[locale];
  const projects = pickLocale(projectsRaw as unknown as BillingualProjects, locale);
  const statistics = pickLocale(statisticsRaw as unknown as BillingualStatistics, locale);
  const resources = pickLocale(resourcesRaw as unknown as BillingualResources, locale);
  const contact = pickLocale(contactRaw as unknown as BillingualContact, locale);

  const productCategories: ProductCategoriesData = {
    section: products.section,
    categoryCta: products.categoryCta,
    categories: productsPage.tabs
      .filter((tab) => tab.id !== "all")
      .map((tab) => ({
        id: tab.id,
        label: tab.label,
        image: productsPage.items.find((item) => item.category === tab.id)
          ?.image,
      })),
  };

  const bestSellers: BestSellersData = {
    section: products.bestSellers,
    nav: products.nav,
    items: products.items,
  };

  return (
    <main>
      <Hero data={hero} />
      <Partners data={partners} />
      <ProductCategories data={productCategories} />
      <WhyUs data={whyUs} />
      <BestSellers data={bestSellers} />
      <Projects data={projects} />
      <Statistics data={statistics} />
      <Resources data={resources} />
      <ContactForm data={contact} />
    </main>
  );
}
