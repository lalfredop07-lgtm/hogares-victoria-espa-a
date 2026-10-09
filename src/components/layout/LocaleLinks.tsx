"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Selector de idioma que mantiene a la persona en la pagina equivalente.
 * `usePathname` de next-intl devuelve la ruta interna, de modo que el enlace
 * se reconstruye con el slug propio de cada idioma.
 */
export function LocaleLinks({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          hrefLang={loc}
          aria-current={loc === locale ? "true" : undefined}
          className={`label-hv rounded-sm border px-3 py-2 transition-colors ${
            loc === locale
              ? "border-paper bg-paper text-ink"
              : "border-hair-inv-strong text-paper/70 hover:border-paper hover:text-paper"
          }`}
        >
          {loc === "es" ? t("spanish") : t("english")}
        </Link>
      ))}
    </div>
  );
}
