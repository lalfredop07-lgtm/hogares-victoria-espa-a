import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/content/organization";

/** URL absoluta de una ruta interna en un idioma concreto. */
export function absoluteUrl(href: AppPathname, locale: Locale): string {
  return SITE_URL + getPathname({ href, locale });
}

/**
 * Canonical + hreflang para cada pagina. `x-default` apunta al espanol, que es
 * el idioma por defecto del sitio.
 */
export function buildAlternates(href: AppPathname, locale: Locale) {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = absoluteUrl(href, loc);
  }
  languages["x-default"] = absoluteUrl(href, routing.defaultLocale);

  return { canonical: absoluteUrl(href, locale), languages };
}

type PageMetaOptions = {
  locale: Locale;
  href: AppPathname;
  /** Clave dentro de `meta.pages` en messages/*.json. */
  page: string;
  /** Si es true, el titulo se usa tal cual, sin plantilla. */
  standaloneTitle?: boolean;
};

export async function buildPageMetadata({
  locale,
  href,
  page,
  standaloneTitle = false,
}: PageMetaOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`pages.${page}.title`);
  const description = t(`pages.${page}.description`);
  const url = absoluteUrl(href, locale);

  return {
    title: standaloneTitle ? { absolute: title } : title,
    description,
    alternates: buildAlternates(href, locale),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale: locale === "es" ? "es_ES" : "en_GB",
      alternateLocale: locale === "es" ? "en_GB" : "es_ES",
      url,
      title: standaloneTitle ? title : `${title} · ${t("siteName")}`,
      description,
      images: [
        {
          url: `/og/og-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: t("legalName"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: standaloneTitle ? title : `${title} · ${t("siteName")}`,
      description,
      images: [`/og/og-${locale}.jpg`],
    },
  };
}
