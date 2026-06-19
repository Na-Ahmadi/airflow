import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Partners from '@/components/home/Partners';
import WhyUs from '@/components/home/WhyUs';
import Products from '@/components/home/Products';
import Projects from '@/components/home/Projects';
import Statistics from '@/components/home/Statistics';
import Resources from '@/components/home/Resources';
import ContactForm from '@/components/home/ContactForm';

import type {
  NavData, HeroData, PartnersData, WhyUsData, ProductsData,
  ProjectsData, StatisticsData, ResourcesData, FooterData,
} from '@/types';

import navDataRaw from '@/data/navigation.json';
import heroDataRaw from '@/data/hero.json';
import partnersDataRaw from '@/data/partners.json';
import whyUsDataRaw from '@/data/whyus.json';
import productsDataRaw from '@/data/products.json';
import projectsDataRaw from '@/data/projects.json';
import statisticsDataRaw from '@/data/statistics.json';
import resourcesDataRaw from '@/data/resources.json';
import footerDataRaw from '@/data/footer.json';
import contactDataRaw from '@/data/contact.json';

const navData     = navDataRaw     as unknown as NavData;
const heroData    = heroDataRaw    as unknown as HeroData;
const partnersData= partnersDataRaw as unknown as PartnersData;
const whyUsData   = whyUsDataRaw   as unknown as WhyUsData;
const productsData= productsDataRaw as unknown as ProductsData;
const projectsData= projectsDataRaw as unknown as ProjectsData;
const statsData   = statisticsDataRaw as unknown as StatisticsData;
const resourcesData= resourcesDataRaw as unknown as ResourcesData;
const footerData  = footerDataRaw  as unknown as FooterData;

const contactData = contactDataRaw as {
  section: { tag: string; title: string; subtitle: string };
  projectTypes: string[];
  fileInfo: { label: string; hint: string };
  submit: { label: string; loading: string; success: string; error: string };
};

export default function HomePage() {
  return (
    <>
      <Header data={navData} />
      <main>
        <Hero data={heroData} />
        <Partners data={partnersData} />
        <WhyUs data={whyUsData} />
        <Products data={productsData} />
        <Projects data={projectsData} />
        <Statistics data={statsData} />
        <Resources data={resourcesData} />
        <ContactForm data={contactData} />
      </main>
      <Footer data={footerData} />
    </>
  );
}
