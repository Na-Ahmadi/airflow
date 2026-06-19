export const SITE_CONFIG = {
  name: 'ایرفلو سیستم',
  tagline: 'راهکارهای توزیع هوای هوشمند',
  description: 'تولیدکننده تخصصی دریچه‌ها، دمپرها و تجهیزات توزیع هوا با بیش از ۱۸ سال تجربه',
  url: 'https://airflowsystem.ir',
  locale: 'fa_IR',
  direction: 'rtl' as const,
  phone: '۰۲۱-۳۳۵۸۵۷۸',
  email: 'info@airflowsystem.ir',
  address: 'تهران، شهران، خیابان مطهری، خیابان ستارخان، پلاک ۱۲۳',
};

export const ANIMATION_CONFIG = {
  duration: { fast: 0.15, base: 0.3, slow: 0.5, verySlow: 0.8 },
  ease: {
    smooth: [0.4, 0, 0.2, 1] as const,
    spring: [0.34, 1.56, 0.64, 1] as const,
    out: [0, 0, 0.2, 1] as const,
  },
  stagger: 0.1,
};

export const BREAKPOINTS = {
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const SCROLL_THRESHOLD = 50;

export const PRODUCT_CATEGORIES = {
  all: 'همه محصولات',
  linear: 'دریچه‌های خطی',
  ceiling: 'دریچه‌های سقفی',
  damper: 'دمپرها',
  multiway: 'ملتیواها',
  accessory: 'مانتوعات',
} as const;
