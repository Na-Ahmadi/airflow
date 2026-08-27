import productsPageRaw from "@/data/products-page.json";
import type { Locale } from "@/i18n/routing";

export interface SearchableProduct {
  id: string;
  category: string;
  categoryLabel: string;
  image: string;
  name: string;
  series: string;
  model: string;
  href: string;
}

function normalize(value: string): string {
  return value
    .toLocaleLowerCase()
    .replace(/[ً-ٰٟ]/g, "") // Arabic/Persian diacritics
    .replace(/[إأآا]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ی/g, "ي")
    .trim();
}

export function getSearchableProducts(locale: Locale): SearchableProduct[] {
  const page = productsPageRaw[locale];
  const categoryLabels = new Map(page.tabs.map((tab) => [tab.id, tab.label]));

  return page.items.map((item) => ({
    id: item.id,
    category: item.category,
    categoryLabel: categoryLabels.get(item.category) ?? item.category,
    image: item.image,
    name: item.name,
    series: item.series,
    model: item.model,
    href: item.href,
  }));
}

export function searchProducts(
  products: SearchableProduct[],
  query: string,
): SearchableProduct[] {
  const q = normalize(query);
  if (!q) return [];

  return products.filter((product) => {
    const haystack = normalize(
      `${product.name} ${product.model} ${product.series} ${product.categoryLabel} ${product.id}`,
    );
    return haystack.includes(q);
  });
}
