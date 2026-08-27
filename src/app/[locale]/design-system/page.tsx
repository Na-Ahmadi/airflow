import type { Metadata } from 'next';
import DesignSystemContent from './DesignSystemContent';

export const metadata: Metadata = {
  title: 'Design System',
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return <DesignSystemContent />;
}
