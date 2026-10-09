import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { org } from "@/content/organization";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Arrow } from "@/components/ui/Arrow";
import { ContactForm } from "@/components/forms/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, href: "/contacto", page: "contact" });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tCommon, tCta] = await Promise.all([
    getTranslations("contact"),
    getTranslations("common"),
    getTranslations("cta"),
  ]);

  return (
    <>
      <PageHeader
        label={t("hero.label")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        aside={
          <div className="border-t-2 border-red pt-6">
            <p className="label-hv text-ink-40">{tCommon("phone")}</p>
            <a
              href={org.phone.href}
              className="tnum mt-3 block font-display text-[clamp(1.5rem,1.1rem+1.4vw,2rem)] font-bold tracking-tight transition-colors hover:text-red"
            >
              {org.phone.display}
            </a>
            <p className="label-hv mt-6 text-ink-40">{tCommon("email")}</p>
            <a
              href={org.email.href}
              className="mt-2 block break-words underline decoration-red underline-offset-4 transition-colors hover:text-red"
            >
              {org.email.display}
            </a>
          </div>
        }
      />

      {/* --- Aviso para quien busca ayuda --- */}
      <Section tone="paper" className="!pt-0">
        <div className="container-hv">
          <div className="flex flex-col gap-5 border-l-2 border-red bg-paper-2 px-6 py-7 sm:px-8 lg:flex-row lg:items-center lg:gap-10">
            <div>
              <h2 className="display-s">{t("helpBannerTitle")}</h2>
              <p className="measure-wide mt-2 text-ink-80">
                {t("helpBannerBody")}
              </p>
            </div>
            <Link
              href="/necesito-ayuda"
              className="btn btn-primary shrink-0 lg:ml-auto"
            >
              {tCta("help")}
              <Arrow />
            </Link>
          </div>
        </div>
      </Section>

      {/* --- Formulario y sedes --- */}
      <Section tone="bone" labelledBy="contacto-formulario">
        <div className="container-hv grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionLabel index="01">{tCta("writeUs")}</SectionLabel>
            <h2 id="contacto-formulario" className="display-m mt-7">
              {t("formTitle")}
            </h2>
            <p className="mt-4 text-ink-80">{t("formBody")}</p>
            <div className="mt-9">
              <ContactForm variant="contact" locale={locale} />
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <SectionLabel index="02">{t("locationsTitle")}</SectionLabel>

            <div className="mt-7 space-y-8">
              {org.locations.map((location) => (
                <div
                  key={location.id}
                  className="border-t border-hair-strong pt-5"
                >
                  <p className="label-hv text-red">
                    {location.kind === "home"
                      ? t("homeLabel")
                      : t("officeLabel")}
                  </p>
                  <address className="mt-3 not-italic">
                    <span className="display-s block">{location.street}</span>
                    <span className="mt-1 block text-ink-80">
                      {location.town}, {location.region}
                    </span>
                  </address>
                  <a
                    href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(location.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow mt-5 inline-flex"
                  >
                    {tCommon("address")}
                    <Arrow />
                  </a>
                </div>
              ))}
            </div>

            <p className="caption-hv mt-8 flex items-start gap-3">
              <span
                className="mt-[0.55em] h-px w-5 shrink-0 bg-red"
                aria-hidden="true"
              />
              {t("locationsNote")}
            </p>

            {/* --- Datos identificativos --- */}
            <div className="mt-14">
              <SectionLabel index="03">{t("legalTitle")}</SectionLabel>
              <dl className="mt-6 border-t border-hair-strong">
                {[
                  { k: t("legalName"), v: org.legalName },
                  { k: t("legalNif"), v: org.nif },
                  { k: t("legalRegistry"), v: t("legalRegistryValue") },
                  { k: t("legalDirector"), v: org.director },
                ].map((item) => (
                  <div key={item.k} className="border-b border-hair py-4">
                    <dt className="label-hv text-ink-40">{item.k}</dt>
                    <dd className="mt-1.5 text-[0.9375rem]">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
