import type { Lang } from "@/context/LanguageContext";
import productsDetailRaw from "@/data/products-detail.json";
import productsRaw from "@/data/products.json";

export interface ProductCardInfoRow {
  id: "dimensions" | "application" | "material";
  icon: string;
  text: string;
}

/**
 * Spec labels that can carry a product's size, in priority order. Products use
 * different labels depending on their shape (round, linear, chimney base…), so
 * the first match wins.
 */
const DIMENSION_LABELS: Record<Lang, string[]> = {
  fa: [
    "ابعاد",
    "قطر یا ابعاد",
    "ابعاد پایه",
    "قطر اتصال",
    "قطر",
    "سایز اتصال",
    "طول",
    "ارتفاع",
  ],
  en: [
    "Dimensions",
    "Diameter or dimensions",
    "Base dimensions",
    "Connection diameter",
    "Diameter",
    "Connection size",
    "Length",
    "Height",
  ],
};

const APPLICATION_LABELS: Record<Lang, string> = { fa: "کاربرد", en: "Application" };
const MATERIAL_LABELS: Record<Lang, string> = { fa: "جنس", en: "Material" };

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

function toAsciiDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)));
}

/**
 * Pulls the smallest listed size out of a spec value such as
 * "۱۰۰×۱۰۰ تا ۱۰۰۰×۶۰۰ mm" or "Custom (100×100 to 1200×1200 mm)".
 * Returns null when the value carries no millimeter figure (e.g. a CFM rating
 * or "Custom, based on duct"), so the raw value is shown instead of an
 * invented measurement.
 */
function extractStartingMillimeters(value: string): string | null {
  if (!/mm/i.test(value)) return null;
  const match = toAsciiDigits(value).match(/\d+(?:[.,]\d+)?/);
  return match ? match[0] : null;
}

function findSpec(
  specs: { label: string; value: string }[],
  labels: string[],
): string | null {
  for (const label of labels) {
    const spec = specs.find((entry) => entry.label === label);
    if (spec?.value) return spec.value;
  }
  return null;
}

type DetailBySlug = Record<string, { specs: { label: string; value: string }[] } | undefined>;

/**
 * Builds the three info rows shown under a product card's series name, reading
 * every value from the product database (products-detail.json) and every label
 * from products.json. Rows without data are omitted rather than guessed.
 */
export function getProductCardInfo(productId: string, lang: Lang): ProductCardInfoRow[] {
  const detail = (productsDetailRaw[lang] as DetailBySlug)[productId];
  if (!detail?.specs) return [];

  const labels = productsRaw[lang].cardInfo;
  const rows: ProductCardInfoRow[] = [];

  const dimensions = findSpec(detail.specs, DIMENSION_LABELS[lang]);
  if (dimensions) {
    const from = extractStartingMillimeters(dimensions);
    const template = from ? labels.dimensionsFrom : labels.dimensionsFallback;
    rows.push({
      id: "dimensions",
      icon: "box",
      text: template.replace("{value}", from ?? dimensions),
    });
  }

  const application = findSpec(detail.specs, [APPLICATION_LABELS[lang]]);
  if (application) {
    rows.push({ id: "application", icon: "building", text: application });
  }

  const material = findSpec(detail.specs, [MATERIAL_LABELS[lang]]);
  if (material) {
    rows.push({ id: "material", icon: "material", text: material });
  }

  return rows;
}
