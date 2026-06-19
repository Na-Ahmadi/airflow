import type { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';

export const metadata: Metadata = {
  title: 'Projects | پروژه‌ها',
  description: 'A selection of successful Airflow System projects across Iran.',
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
