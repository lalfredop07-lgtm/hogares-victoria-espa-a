import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { org } from "@/content/organization";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Figure } from "@/components/ui/Figure";
import { ContactForm } from "@/components/forms/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, href: "/voluntariado", page: "volunteer" });
}

export default async function VolunteerPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tCommon, tCta] = await Promise.all([
    getTranslations("volunteer"),
    getTranslations("common"),
    getTranslations("cta"),
  ]);

  const expect = t.raw("expect") as string[];

  return (
    <>
      <PageHeader
        label={t("hero.label")}
        title={t("hero.title")}
        lead={t("hero.lead")}
      />

      <div className="container-hv" data-reveal="clip">
        <Figure
          id="calle-acercamiento-parque"
          ratio="16/9"
          sizes="100vw"
        />
      </div>

      {/* --- Que significa participar --- */}
      <Section tone="paper" labelledBy="voluntariado-que">
        <div className="container-hv grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionLabel index="01">{t("hero.label")}</SectionLabel>
            <h2 id="voluntariado-que" className="display-m mt-7">
              {t("whatTitle")}
            </h2>
            <p className="lead mt-6 text-ink-80">{t("whatBody")}</p>

            <h3 className="display-s mt-12">{t("whyTitle")}</h3>
            <p className="mt-4 text-ink-80">{t("whyBody")}</p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="label-hv text-ink-60">{t("expectTitle")}</h3>
            <ul className="mt-5 border-t border-hair-strong">
              {expect.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-5 border-b border-hair py-4"
                  data-reveal
                >
                  <span
                    className="label-hv mt-[0.35em] shrink-0 text-red tabular-nums"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink-80">{item}</span>
                </li>
              ))}
            </ul>
            <p className="caption-hv mt-6">{t("areasNote")}</p>
          </div>
        </div>
      </Section>

      {/* --- Formulario --- */}
      <Section tone="bone" labelledBy="voluntariado-formulario">
        <div className="container-hv grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel index="02">{tCta("writeUs")}</SectionLabel>
            <h2 id="voluntariado-formulario" className="display-m mt-7">
              {t("formTitle")}
            </h2>
            <p className="mt-5 text-ink-80">{t("formBody")}</p>

            <div className="mt-10 border-t border-hair-strong pt-6">
              <p className="label-hv text-ink-40">{tCommon("phone")}</p>
              <a
                href={org.phone.href}
                className="tnum mt-2 block font-display text-[1.25rem] font-bold tracking-tight transition-colors hover:text-red"
              >
                {org.phone.display}
              </a>
              <p className="label-hv mt-5 text-ink-40">{tCommon("email")}</p>
              <a
                href={org.email.href}
                className="mt-2 block break-words text-[0.9375rem] underline decoration-red underline-offset-4 transition-colors hover:text-red"
              >
                {org.email.display}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm variant="volunteer" locale={locale} />
          </div>
        </div>
      </Section>
    </>
  );
}
