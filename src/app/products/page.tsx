import type { Metadata } from 'next';
import ProductsContent from './ProductsContent';

export const metadata: Metadata = {
  title: 'Products | محصولات',
  description: 'A complete range of air distribution products — diffusers, dampers, control equipment and accessories.',
};

export default function ProductsPage() {
  return <ProductsContent />;
}
