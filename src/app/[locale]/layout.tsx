import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Vazirmatn } from 'next/font/google';
import Script from 'next/script';
import '../globals.css';
import { SITE_CONFIG } from '@/constants';
import { ThemeProvider } from '@/context/ThemeContext';
import { routing, type Locale } from '@/i18n/routing';
import { LOCALE_DIR } from '@/i18n/direction';
import ScrollToTop from '@/components/shared/ScrollToTop/ScrollToTop';
import WhatsAppButton from '@/components/shared/WhatsAppButton/WhatsAppButton';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

const vazir = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazir',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['HVAC', 'دریچه هوا', 'دمپر', 'تهویه مطبوع', 'ایرفلو سیستم', 'توزیع هوا', 'سیستم تهویه'],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={LOCALE_DIR[locale as Locale]}
      className={vazir.variable}
      suppressHydrationWarning
    >
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <Script
          id="image-protect"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              document.addEventListener('contextmenu', function(e){ if(e.target && e.target.tagName === 'IMG') e.preventDefault(); });
              document.addEventListener('dragstart', function(e){ if(e.target && e.target.tagName === 'IMG') e.preventDefault(); });
              document.addEventListener('keydown', function(e){
                var k = e.key;
                if (k === 'F12') { e.preventDefault(); return; }
                if (e.ctrlKey && e.shiftKey && (k === 'I' || k === 'i' || k === 'J' || k === 'j' || k === 'C' || k === 'c')) { e.preventDefault(); return; }
                if (e.ctrlKey && (k === 'u' || k === 'U')) { e.preventDefault(); return; }
              });
            })();`,
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
            <WhatsAppButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
