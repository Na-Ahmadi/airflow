"use client";

import ContactForm from "@/components/home/ContactForm/ContactForm";
import Hero from "@/components/home/Hero/Hero";
import Partners from "@/components/home/Partners/Partners";
import Products from "@/components/home/Products/Products";
import Projects from "@/components/home/Projects/Projects";
import Resources from "@/components/home/Resources/Resources";
import Statistics from "@/components/home/Statistics/Statistics";
import WhyUs from "@/components/home/WhyUs/WhyUs";
import { useLanguage } from "@/context/LanguageContext";

import type {
  HeroData,
  PartnersData,
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
  const { lang } = useLanguage();

  const hero = (heroRaw as unknown as BillingualHero)[lang];
  const partners = (partnersRaw as unknown as BillingualPartners)[lang];
  const whyUs = (whyUsRaw as unknown as BillingualWhyUs)[lang];
  const products = (productsRaw as unknown as BillingualProducts)[lang];
  const projects = (projectsRaw as unknown as BillingualProjects)[lang];
  const statistics = (statisticsRaw as unknown as BillingualStatistics)[lang];
  const resources = (resourcesRaw as unknown as BillingualResources)[lang];
  const contact = (contactRaw as unknown as BillingualContact)[lang];

  return (
    <main>
      <Hero data={hero} />
      <Partners data={partners} />
      <Products data={products} />
      <Projects data={projects} />
      <Statistics data={statistics} />
      <WhyUs data={whyUs} />
      <Resources data={resources} />
      <ContactForm data={contact} />
    </main>
  );
}
