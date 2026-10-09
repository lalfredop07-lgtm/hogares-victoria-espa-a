import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppPathname, Locale } from "@/i18n/routing";
import { org } from "@/content/organization";
import { Logo } from "./Logo";
import { LocaleLinks } from "./LocaleLinks";
import { Arrow } from "@/components/ui/Arrow";

const NAV: { href: AppPathname; key: string }[] = [
  { href: "/", key: "home" },
  { href: "/quienes-somos", key: "about" },
  { href: "/nuestra-labor", key: "work" },
  { href: "/historias", key: "stories" },
  { href: "/impacto", key: "impact" },
  { href: "/colabora", key: "give" },
];

export async function Footer({ locale }: { locale: Locale }) {
  const [t, tNav, tCta, tCommon] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
    getTranslations("cta"),
    getTranslations("common"),
  ]);

  return (
    <footer className="on-ink bg-ink text-paper">
      {/* --- Banda de ayuda: siempre accesible, incluso al final de todo --- */}
      <div className="border-b border-hair-inv">
        <div className="container-hv flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <p className="display-s max-w-xl text-paper">
            {tCta("help")} —{" "}
            <a
              href={org.phone.href}
              className="inline-block py-1 text-red-bright underline decoration-1 underline-offset-[6px] transition-colors hover:text-paper"
            >
              {org.phone.display}
            </a>
          </p>
          <Link href="/necesito-ayuda" className="btn btn-primary shrink-0">
            {tCta("help")}
            <Arrow />
          </Link>
        </div>
      </div>

      <div className="container-hv grid gap-12 py-16 md:grid-cols-12 md:py-20">
        {/* --- Identidad --- */}
        <div className="md:col-span-5 lg:col-span-4">
          <Logo height={72} />
          <p className="measure mt-6 text-[0.9375rem] leading-relaxed text-paper/70">
            {t("tagline")}
          </p>
          <p className="caption-hv mt-6 !text-paper/60">{t("registry")}</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 md:col-span-7 lg:col-span-8 lg:gap-8">
          {/* --- Navegacion --- */}
          <nav aria-label={t("navTitle")}>
            <h2 className="label-hv text-paper/60">{t("navTitle")}</h2>
            <ul className="mt-4 space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1.5 text-[0.9375rem] text-paper/80 transition-colors hover:text-red-bright"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* --- Ayuda y contacto --- */}
          <div>
            <h2 className="label-hv text-paper/60">{t("helpTitle")}</h2>
            <ul className="mt-4 space-y-1 text-[0.9375rem]">
              <li>
                <Link
                  href="/necesito-ayuda"
                  className="inline-block py-1.5 text-paper/80 transition-colors hover:text-red-bright"
                >
                  {tCta("help")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="inline-block py-1.5 text-paper/80 transition-colors hover:text-red-bright"
                >
                  {tNav("contact")}
                </Link>
              </li>
              <li>
                <a
                  href={org.phone.href}
                  className="tnum inline-block py-1.5 text-paper/80 transition-colors hover:text-red-bright"
                >
                  {org.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={org.email.href}
                  className="inline-block break-words py-1.5 text-paper/80 transition-colors hover:text-red-bright"
                >
                  {org.email.display}
                </a>
              </li>
            </ul>
          </div>

          {/* --- Colabora y legal --- */}
          <div>
            <h2 className="label-hv text-paper/60">{t("giveTitle")}</h2>
            <ul className="mt-4 space-y-1 text-[0.9375rem]">
              <li>
                <Link
                  href="/colabora"
                  className="inline-block py-1.5 text-paper/80 transition-colors hover:text-red-bright"
                >
                  {tCta("donateLong")}
                </Link>
              </li>
              <li>
                <Link
                  href="/voluntariado"
                  className="inline-block py-1.5 text-paper/80 transition-colors hover:text-red-bright"
                >
                  {tNav("volunteer")}
                </Link>
              </li>
              <li>
                <Link
                  href="/impacto"
                  className="inline-block py-1.5 text-paper/80 transition-colors hover:text-red-bright"
                >
                  {t("transparency")}
                </Link>
              </li>
            </ul>

            <h2 className="label-hv mt-10 text-paper/60">{t("legalTitle")}</h2>
            <ul className="mt-4 space-y-1 text-[0.9375rem]">
              <li>
                <Link
                  href="/aviso-legal"
                  className="inline-block py-1.5 text-paper/80 transition-colors hover:text-red-bright"
                >
                  {t("legalNotice")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="inline-block py-1.5 text-paper/80 transition-colors hover:text-red-bright"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="inline-block py-1.5 text-paper/80 transition-colors hover:text-red-bright"
                >
                  {t("cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- Pie legal --- */}
      <div className="border-t border-hair-inv">
        <div className="container-hv flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="caption-hv !text-paper/55">
              {t("rights", { year: new Date().getFullYear() })}
            </p>
            <p className="caption-hv !text-paper/55">{t("credit")}</p>
            <p className="caption-hv !text-paper/55">
              {tCommon("privacyNoteShort")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="label-hv text-paper/60">{tNav("language")}</span>
            <LocaleLinks locale={locale} />
          </div>
        </div>
      </div>
    </footer>
  );
}
