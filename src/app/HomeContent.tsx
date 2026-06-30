'use client';

import { useLanguage } from '@/context/LanguageContext';
import Hero from '@/components/home/Hero/Hero';
import Partners from '@/components/home/Partners/Partners';
import WhyUs from '@/components/home/WhyUs/WhyUs';
import Products from '@/components/home/Products/Products';
import Projects from '@/components/home/Projects/Projects';
import Statistics from '@/components/home/Statistics/Statistics';
import Resources from '@/components/home/Resources/Resources';
import ContactForm from '@/components/home/ContactForm/ContactForm';

import type {
  HeroData, PartnersData, WhyUsData, ProductsData,
  ProjectsData, StatisticsData, ResourcesData,
} from '@/types';

import heroRaw from '@/data/hero.json';
import partnersRaw from '@/data/partners.json';
import whyUsRaw from '@/data/whyus.json';
import productsRaw from '@/data/products.json';
import projectsRaw from '@/data/projects.json';
import statisticsRaw from '@/data/statistics.json';
import resourcesRaw from '@/data/resources.json';
import contactRaw from '@/data/contact.json';

type BillingualHero       = { fa: HeroData;       en: HeroData       };
type BillingualPartners   = { fa: PartnersData;   en: PartnersData   };
type BillingualWhyUs      = { fa: WhyUsData;      en: WhyUsData      };
type BillingualProducts   = { fa: ProductsData;   en: ProductsData   };
type BillingualProjects   = { fa: ProjectsData;   en: ProjectsData   };
type BillingualStatistics = { fa: StatisticsData; en: StatisticsData };
type BillingualResources  = { fa: ResourcesData;  en: ResourcesData  };

type ContactField = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
};

type ContactData = {
  section: { tag: string; title: string; subtitle: string };
  fields: ContactField[];
  projectTypes: string[];
  fileInfo: { label: string; hint: string };
  submit: { label: string; loading: string; success: string; error: string; newMessage: string };
};
type BillingualContact = { fa: ContactData; en: ContactData };

export default function HomeContent() {
  const { lang } = useLanguage();

  const hero       = (heroRaw       as unknown as BillingualHero)[lang];
  const partners   = (partnersRaw   as unknown as BillingualPartners)[lang];
  const whyUs      = (whyUsRaw      as unknown as BillingualWhyUs)[lang];
  const products   = (productsRaw   as unknown as BillingualProducts)[lang];
  const projects   = (projectsRaw   as unknown as BillingualProjects)[lang];
  const statistics = (statisticsRaw as unknown as BillingualStatistics)[lang];
  const resources  = (resourcesRaw  as unknown as BillingualResources)[lang];
  const contact    = (contactRaw    as unknown as BillingualContact)[lang];

  return (
    <main>
      <Hero data={hero} />
      <Partners data={partners} />
      <WhyUs data={whyUs} />
      <Products data={products} />
      <Projects data={projects} />
      <Statistics data={statistics} />
      <Resources data={resources} />
      <ContactForm data={contact} />
    </main>
  );
}
