import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Headline } from "@/components/ui/Headline";
import { Arrow } from "@/components/ui/Arrow";

const LINKS: { href: AppPathname; key: string }[] = [
  { href: "/necesito-ayuda", key: "help" },
  { href: "/quienes-somos", key: "about" },
  { href: "/nuestra-labor", key: "work" },
  { href: "/impacto", key: "impact" },
  { href: "/colabora", key: "give" },
  { href: "/contacto", key: "contact" },
];

export default async function NotFound() {
  const [t, tNav, tCta] = await Promise.all([
    getTranslations("notFound"),
    getTranslations("nav"),
    getTranslations("cta"),
  ]);

  return (
    <Section tone="paper" className="!pt-40 lg:!pt-52">
      <div className="container-hv grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionLabel>{t("label")}</SectionLabel>
          <Headline as="h1" text={t("title")} className="display-l mt-7 uppercase" />
          <p className="lead measure mt-7 text-ink-80">{t("body")}</p>
          <Link href="/" className="btn btn-ink mt-10">
            {tCta("backHome")}
            <Arrow />
          </Link>
        </div>

        <nav aria-label={t("helpful")} className="lg:col-span-5 lg:col-start-8">
          <p className="label-hv border-b border-hair-strong pb-3 text-ink-60">
            {t("helpful")}
          </p>
          <ul>
            {LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-baseline gap-4 border-b border-hair py-4 transition-colors hover:text-red"
                >
                  <span className="label-hv text-red tabular-nums" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.key === "help" ? tCta("help") : tNav(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Section>
  );
}
