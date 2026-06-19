import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us | درباره ما',
  description: 'Airflow System — Leading the design & installation of air distribution systems in Iran.',
};

export default function AboutPage() {
  return <AboutContent />;
}
