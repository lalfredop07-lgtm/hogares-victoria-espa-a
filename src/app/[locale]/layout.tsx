import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Archivo, Newsreader } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import "@/styles/globals.css";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealEngine } from "@/components/ui/Reveal";
import { org, SITE_URL } from "@/content/organization";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#19140f" },
  ],
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("pages.home.title"),
      template: t("titleTemplate", { page: "%s" }),
    },
    description: t("pages.home.description"),
    applicationName: t("siteName"),
    authors: [{ name: t("legalName") }],
    creator: t("legalName"),
    publisher: t("legalName"),
    formatDetection: { telephone: true, email: true, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  /* Datos estructurados: solo informacion verificable y publicada. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: org.legalName,
    alternateName: org.shortName,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/brand/logo-hogares-victoria.png`,
    description: tMeta("pages.home.description"),
    foundingDate: org.foundedPeruDate,
    email: org.email.display,
    telephone: org.phone.display,
    identifier: org.nif,
    areaServed: { "@type": "AdministrativeArea", name: "Comunidad de Madrid" },
    address: org.locations.map((l) => ({
      "@type": "PostalAddress",
      streetAddress: l.street,
      addressLocality: l.town,
      addressRegion: l.region,
      addressCountry: "ES",
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: org.phone.display,
      email: org.email.display,
      contactType: "customer support",
      availableLanguage: ["es", "en"],
    },
  };

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${newsreader.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <a href="#contenido" className="skip-link">
            {t("skip")}
          </a>
          <Header locale={locale} />
          <main id="contenido">{children}</main>
          <Footer locale={locale} />
          <RevealEngine />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
