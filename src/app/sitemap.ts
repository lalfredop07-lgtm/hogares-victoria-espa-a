import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { SITE_URL } from "@/content/organization";

const PAGES: { href: AppPathname; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { href: "/", priority: 1, changeFrequency: "monthly" },
  { href: "/necesito-ayuda", priority: 0.9, changeFrequency: "monthly" },
  { href: "/quienes-somos", priority: 0.8, changeFrequency: "monthly" },
  { href: "/nuestra-labor", priority: 0.8, changeFrequency: "monthly" },
  { href: "/impacto", priority: 0.8, changeFrequency: "monthly" },
  { href: "/colabora", priority: 0.8, changeFrequency: "monthly" },
  { href: "/historias", priority: 0.7, changeFrequency: "monthly" },
  { href: "/voluntariado", priority: 0.7, changeFrequency: "monthly" },
  { href: "/contacto", priority: 0.7, changeFrequency: "monthly" },
  { href: "/aviso-legal", priority: 0.2, changeFrequency: "yearly" },
  { href: "/privacidad", priority: 0.2, changeFrequency: "yearly" },
  { href: "/cookies", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGES.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: SITE_URL + getPathname({ href: page.href, locale }),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [
            loc,
            SITE_URL + getPathname({ href: page.href, locale: loc }),
          ]),
        ),
      },
    })),
  );
}
