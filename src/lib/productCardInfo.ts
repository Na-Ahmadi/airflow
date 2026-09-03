import type { Lang } from "@/context/LanguageContext";
import productsDetailRaw from "@/data/products-detail.json";
import productsRaw from "@/data/products.json";

export interface ProductCardTile {
  id: "dimensions" | "application" | "material";
  icon: string;
  /** Bold first line, e.g. "ساخت سفارشی" */
  title: string;
  /** Muted second line, e.g. "در طول‌های بالای 1000 میلی‌متر" */
  detail: string;
}

export interface ProductCardInfo {
  tiles: ProductCardTile[];
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

/** Size labels that measure a length rather than a width×height footprint. */
const LINEAR_LABELS: Record<Lang, string[]> = {
  fa: ["طول"],
  en: ["Length"],
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

interface Spec {
  label: string;
  value: string;
}

function findSpec(specs: Spec[], labels: string[]): Spec | null {
  for (const label of labels) {
    const spec = specs.find((entry) => entry.label === label);
    if (spec?.value) return spec;
  }
  return null;
}

/**
 * Splits a spec value on its own separators so a tile gets a short headline
 * plus a supporting line: "اداری / تجاری / رستوران" becomes "اداری" +
 * "تجاری / رستوران". Values without a separator are kept whole — splitting
 * mid-phrase strands words like "شده" on their own line.
 */
function splitValue(value: string): { title: string; detail: string } {
  const parts = value
    .split(/\s*[/،,]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length > 1) {
    return { title: parts[0], detail: parts.slice(1).join(" / ") };
  }
  return { title: value.trim(), detail: "" };
}

type DetailEntry = { specs?: Spec[] };
type DetailBySlug = Record<string, DetailEntry | undefined>;

/**
 * Builds the info tiles shown under a product card's series name. Every value
 * comes from the product database (products-detail.json) and every label
 * template from products.json, so cards adapt per product automatically.
 * Missing data yields fewer tiles rather than guessed content.
 */
export function getProductCardInfo(productId: string, lang: Lang): ProductCardInfo {
  const specs = (productsDetailRaw[lang] as DetailBySlug)[productId]?.specs;
  if (!specs) return { tiles: [] };

  const labels = productsRaw[lang].cardInfo;
  const tiles: ProductCardTile[] = [];

  const dimensions = findSpec(specs, DIMENSION_LABELS[lang]);
  if (dimensions) {
    const from = extractStartingMillimeters(dimensions.value);
    let detailText: string;
    if (from) {
      const isLinear = LINEAR_LABELS[lang].includes(dimensions.label);
      const template = isLinear ? labels.sizeFromLength : labels.sizeFrom;
      detailText = template.replace("{value}", from);
    } else {
      detailText = dimensions.value;
    }
    tiles.push({
      id: "dimensions",
      icon: "box",
      title: labels.sizeTitle,
      detail: detailText,
    });
  }

  const application = findSpec(specs, [APPLICATION_LABELS[lang]]);
  if (application) {
    const { title, detail: rest } = splitValue(application.value);
    tiles.push({
      id: "application",
      icon: "file-text",
      title: labels.applicationTitle.replace("{value}", title),
      detail: rest,
    });
  }

  const material = findSpec(specs, [MATERIAL_LABELS[lang]]);
  if (material) {
    const { title, detail: rest } = splitValue(material.value);
    tiles.push({
      id: "material",
      icon: "shield",
      title: labels.materialTitle.replace("{value}", title),
      detail: rest,
    });
  }

  return { tiles };
}
