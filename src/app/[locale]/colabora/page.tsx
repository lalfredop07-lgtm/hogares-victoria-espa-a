import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { org } from "@/content/organization";
import { formatIban } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTABand } from "@/components/layout/CTABand";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Headline } from "@/components/ui/Headline";
import { Figure } from "@/components/ui/Figure";
import { Arrow } from "@/components/ui/Arrow";
import { CopyButton } from "@/components/ui/CopyButton";
import { delay } from "@/lib/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, href: "/colabora", page: "give" });
}

const WAYS = ["paypal", "transfer", "volunteer", "partner"] as const;

export default async function GivePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tCta, tCommon] = await Promise.all([
    getTranslations("give"),
    getTranslations("cta"),
    getTranslations("common"),
  ]);

  const trustFacts = [
    { k: t("trustFacts.grants"), v: t("trustFacts.grantsValue") },
    { k: t("trustFacts.budget"), v: t("trustFacts.budgetValue") },
    { k: t("trustFacts.home"), v: t("trustFacts.homeValue") },
  ];

  return (
    <>
      <PageHeader
        label={t("hero.label")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        aside={
          <ol className="border-t border-hair-strong">
            {WAYS.map((way, i) => (
              <li
                key={way}
                className="flex items-baseline gap-4 border-b border-hair py-3.5"
              >
                <span
                  className="label-hv text-red tabular-nums"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem]">
                  {t(`ways.${way}.name`)}
                </span>
              </li>
            ))}
          </ol>
        }
      />

      {/* --- Donar ahora: PayPal y transferencia, lado a lado --- */}
      <Section tone="bone" labelledBy="colabora-donar">
        <div className="container-hv">
          <SectionLabel index="01">{t("waysLabel")}</SectionLabel>
          <h2 id="colabora-donar" className="display-l mt-7 uppercase">
            {t("waysTitle")}
          </h2>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            {/* PayPal */}
            <div className="flex flex-col border-t-2 border-red bg-white p-7 sm:p-9" data-reveal>
              <h3 className="display-m">{t("paypalTitle")}</h3>
              <p className="mt-5 text-ink-80">{t("paypalBody")}</p>
              <a
                href={org.donation.paypal}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-8 self-start"
              >
                {tCta("donateLong")}
                <Arrow />
              </a>
              <p className="caption-hv mt-4">{tCommon("openInNewTab")}</p>
              <p className="caption-hv mt-9 border-t border-hair pt-5">
                {t("paypalNote")}
              </p>
            </div>

            {/* Transferencia */}
            <div
              className="flex flex-col border-t-2 border-ink bg-white p-7 sm:p-9"
              data-reveal
              style={delay(110)}
            >
              <h3 className="display-m">{t("transferTitle")}</h3>
              <p className="mt-5 text-ink-80">{t("transferBody")}</p>

              <dl className="mt-8 border-t border-hair">
                <div className="border-b border-hair py-4">
                  <dt className="label-hv text-ink-40">{t("holderLabel")}</dt>
                  <dd className="mt-1.5 font-display text-[0.9375rem] font-semibold">
                    {org.legalName}
                  </dd>
                </div>
                <div className="border-b border-hair py-4">
                  <dt className="label-hv text-ink-40">{t("bankLabel")}</dt>
                  <dd className="mt-1.5 font-display text-[0.9375rem] font-semibold">
                    {org.donation.bank}
                  </dd>
                </div>
                <div className="border-b border-hair py-4">
                  <dt className="label-hv text-ink-40">{t("ibanLabel")}</dt>
                  <dd className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <span className="tnum font-display text-[clamp(1rem,0.9rem+0.45vw,1.25rem)] font-bold tracking-tight">
                      {formatIban(org.donation.iban)}
                    </span>
                    <CopyButton
                      value={org.donation.ibanCompact}
                      label={tCommon("copy")}
                      copiedLabel={tCommon("copied")}
                      announcement={tCommon("ibanCopied")}
                      className="label-hv inline-flex items-center gap-2 rounded-sm border border-hair-strong px-3 py-2 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                    />
                  </dd>
                </div>
                <div className="border-b border-hair py-4">
                  <dt className="label-hv text-ink-40">{t("bicLabel")}</dt>
                  <dd className="tnum mt-1.5 font-display text-[0.9375rem] font-semibold">
                    {org.donation.bic}
                  </dd>
                </div>
              </dl>

              <p className="caption-hv mt-7 pt-1">
                {t("transferNote", { email: org.email.display })}
              </p>
            </div>
          </div>

          {/* Aportaciones periodicas */}
          <div className="mt-10 border-l-2 border-hair-strong bg-paper px-6 py-6 sm:px-8">
            <h3 className="display-s">{t("recurringTitle")}</h3>
            <p className="measure-wide mt-3 text-ink-80">
              {t("recurringBody")}
            </p>
          </div>
        </div>
      </Section>

      {/* --- Confianza --- */}
      <Section tone="paper" labelledBy="colabora-confianza">
        <div className="container-hv grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionLabel index="02">{t("trustLabel")}</SectionLabel>
            <Headline
              id="colabora-confianza"
              text={t("trustTitle")}
              className="display-l mt-7 uppercase"
              accent={false}
            />
            <p className="lead mt-7 text-ink-80">{t("trustBody")}</p>

            <dl className="mt-10 border-t border-hair-strong">
              {trustFacts.map((fact) => (
                <div
                  key={fact.k}
                  className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-hair py-4"
                >
                  <dt className="text-[0.9375rem] text-ink-80">{fact.k}</dt>
                  <dd className="tnum font-display text-[1.125rem] font-bold tracking-tight">
                    {fact.v}
                  </dd>
                </div>
              ))}
            </dl>

            <Link href="/impacto" className="link-arrow mt-9 inline-flex">
              {tCta("ourImpact")}
              <Arrow />
            </Link>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div data-reveal="clip">
              <Figure
                id="reparto-alimentos-mercado"
                ratio="4/5"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* --- Fiscalidad y otras formas --- */}
      <Section tone="bone" labelledBy="colabora-otras">
        <div className="container-hv grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="03">{t("waysLabel")}</SectionLabel>
            <h2 id="colabora-otras" className="display-m mt-7">
              {t("otherTitle")}
            </h2>
            <p className="mt-5 text-ink-80">{t("otherBody")}</p>
            <Link href="/voluntariado" className="link-arrow mt-8 inline-flex">
              {tCta("volunteer")}
              <Arrow />
            </Link>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="display-m lg:mt-[2.1rem]">{t("taxTitle")}</h2>
            <p className="mt-5 text-ink-80">{t("taxBody")}</p>
            <a href={org.email.href} className="link-arrow mt-8 inline-flex">
              {org.email.display}
              <Arrow />
            </a>
          </div>
        </div>
      </Section>

      <CTABand
        title={t("ways.partner.name")}
        body={t("ways.partner.body")}
        tone="ink"
      >
        <Link href="/contacto" className="btn btn-primary">
          {tCta("writeUs")}
          <Arrow />
        </Link>
        <Link href="/impacto" className="btn btn-outline-inv">
          {tCta("allDocs")}
        </Link>
      </CTABand>
    </>
  );
}
