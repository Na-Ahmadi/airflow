import type { Metadata } from 'next';
import ResourcesContent from './ResourcesContent';

export const metadata: Metadata = {
  title: 'Resources | منابع فنی',
  description: 'Easy access to catalogs, technical files, and educational resources from Airflow System.',
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
