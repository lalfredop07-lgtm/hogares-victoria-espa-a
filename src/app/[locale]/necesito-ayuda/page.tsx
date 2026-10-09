import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { org } from "@/content/organization";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Headline } from "@/components/ui/Headline";
import { ContactForm } from "@/components/forms/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, href: "/necesito-ayuda", page: "help" });
}

export default async function HelpPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tCommon] = await Promise.all([
    getTranslations("help"),
    getTranslations("common"),
  ]);

  const offer = t.raw("offer") as string[];
  const prepare = t.raw("prepare") as string[];

  return (
    <>
      <PageHeader
        label={t("hero.label")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        aside={
          <div className="border-t-2 border-red bg-white px-6 py-7">
            <p className="label-hv text-ink-60">{t("callTitle")}</p>
            <a
              href={org.phone.href}
              className="tnum mt-4 block font-display text-[clamp(1.5rem,1.1rem+1.5vw,2.125rem)] font-bold tracking-tight text-ink transition-colors hover:text-red"
            >
              {org.phone.display}
            </a>
            <a
              href={org.email.href}
              className="mt-3 block break-words text-[0.9375rem] text-ink-80 underline decoration-red underline-offset-4 transition-colors hover:text-red"
            >
              {org.email.display}
            </a>
            <p className="caption-hv mt-5">{t("callBody")}</p>
          </div>
        }
      />

      {/* --- Urgencias: lo primero que debe ver alguien en riesgo --- */}
      <Section tone="paper" className="!pt-0">
        <div className="container-hv">
          <div className="flex flex-col gap-4 border-l-2 border-red bg-paper-2 px-6 py-7 sm:flex-row sm:items-center sm:gap-10 sm:px-8">
            <p className="display-s shrink-0">{t("emergencyTitle")}</p>
            <p className="measure-wide text-ink-80">{t("emergencyBody")}</p>
            <a
              href="tel:112"
              className="btn btn-ink shrink-0 sm:ml-auto"
              aria-label="112"
            >
              112
            </a>
          </div>
        </div>
      </Section>

      {/* --- Que somos y que ofrecemos --- */}
      <Section tone="bone" labelledBy="ayuda-que-somos">
        <div className="container-hv grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="01">{tCommon("note")}</SectionLabel>
            <h2 id="ayuda-que-somos" className="display-m mt-7">
              {t("whatTitle")}
            </h2>
            <p className="lead mt-6 text-ink-80">{t("whatBody")}</p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="display-m">{t("offerTitle")}</h2>
            <ul className="mt-8">
              {offer.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-5 border-t border-hair py-4"
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
          </div>
        </div>
      </Section>

      {/* --- Limites: honestidad sobre lo que no hacemos --- */}
      <Section tone="ink" labelledBy="ayuda-limites">
        <div className="container-hv grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="02" tone="paper">
              {tCommon("note")}
            </SectionLabel>
            <Headline
              id="ayuda-limites"
              text={t("limitsTitle")}
              className="display-m mt-7 uppercase text-paper"
            />
          </div>
          <p className="lead text-paper/80 lg:col-span-6 lg:col-start-7">
            {t("limitsBody")}
          </p>
        </div>
      </Section>

      {/* --- Formulario --- */}
      <Section tone="paper" labelledBy="ayuda-formulario">
        <div className="container-hv grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="03">{t("prepareTitle")}</SectionLabel>
            <p className="lead mt-7 text-ink-80">{t("prepareBody")}</p>
            <ul className="mt-7 space-y-3">
              {prepare.map((item) => (
                <li key={item} className="flex gap-4 text-ink-80">
                  <span
                    className="mt-[0.7em] h-px w-5 shrink-0 bg-red"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-hair-strong pt-5 text-[0.9375rem] text-ink-60">
              {t("privacyNote")}
            </p>

            <div className="mt-10 border-t border-hair pt-8">
              <h2 className="display-s">{t("processTitle")}</h2>
              <p className="mt-3 text-ink-80">{t("processBody")}</p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="ayuda-formulario" className="display-m">
              {t("formTitle")}
            </h2>
            <div className="mt-8">
              <ContactForm variant="help" locale={locale} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
