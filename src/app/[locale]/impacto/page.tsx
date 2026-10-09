import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { documents, type OrgDocument } from "@/content/organization";
import { reports, latestYear } from "@/content/impact";
import { formatCurrency, formatNumber } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTABand } from "@/components/layout/CTABand";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Headline } from "@/components/ui/Headline";
import { Counter } from "@/components/ui/Counter";
import { Arrow } from "@/components/ui/Arrow";
import { delay } from "@/lib/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, href: "/impacto", page: "impact" });
}

export default async function ImpactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tMetrics, tCta, tCommon] = await Promise.all([
    getTranslations("impact"),
    getTranslations("metrics"),
    getTranslations("cta"),
    getTranslations("common"),
  ]);

  const current = reports[latestYear];
  const previous = reports[2024];

  const docsByYear = [2025, 2024].map((year) => ({
    year,
    items: documents.filter((d) => d.year === year) as unknown as OrgDocument[],
  }));

  return (
    <>
      <PageHeader
        label={t("hero.label")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        aside={
          <div className="border-t-2 border-red pt-6">
            <p className="label-hv text-ink-60">{t("financeLabel")} · 2025</p>
            <p className="stat mt-4 !text-[clamp(2rem,1.4rem+2.2vw,3rem)]">
              {formatCurrency(current.totals.expenses, locale)}
            </p>
            <p className="caption-hv mt-3">{t("totalExpenses")}</p>
          </div>
        }
      />

      {/* --- Resultados del ejercicio --- */}
      <Section tone="ink" labelledBy="impacto-resultados">
        <div className="container-hv">
          <SectionLabel index="01" tone="paper">
            {t("resultsLabel")}
          </SectionLabel>
          <Headline
            id="impacto-resultados"
            text={t("resultsTitle", { year: latestYear })}
            className="display-l mt-7 uppercase text-paper"
            accent={false}
          />

          <dl className="mt-14 grid border-t border-hair-inv-strong sm:grid-cols-2 lg:grid-cols-4">
            {current.metrics.map((metric, i) => (
              <div
                key={metric.id}
                className={`border-b border-hair-inv py-9 ${
                  i % 2 === 1 ? "sm:border-l sm:border-hair-inv sm:pl-7" : ""
                } lg:border-l lg:border-hair-inv lg:pl-7 ${
                  i % 4 === 0 ? "lg:border-l-0 lg:pl-0" : ""
                }`}
                data-reveal
                style={delay((i % 4) * 70)}
              >
                <dd className="stat !text-[clamp(2.5rem,1.6rem+3vw,4rem)] text-paper">
                  <Counter
                    value={metric.value}
                    prefix={metric.prefix}
                    formatted={formatNumber(metric.value, locale)}
                  />
                </dd>
                <dt className="mt-4 max-w-[24ch] font-display text-[0.875rem] font-semibold leading-snug text-paper">
                  {tMetrics(`${metric.id}.label`)}
                </dt>
                <p className="caption-hv mt-2 max-w-[26ch]">
                  {metric.breakdown
                    ? tMetrics(`${metric.id}.note`, {
                        group: metric.breakdown.group,
                        individual: metric.breakdown.individual,
                      })
                    : tMetrics(`${metric.id}.note`)}
                </p>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <h3 className="display-s text-paper">
                {t("noAggregationTitle")}
              </h3>
              <p className="mt-3 text-paper/75">{t("noAggregationBody")}</p>
            </div>
            <p className="self-end text-[0.9375rem] text-paper/60 lg:col-span-5 lg:col-start-8">
              {t("note2025")}
            </p>
          </div>
        </div>
      </Section>

      {/* --- Comparacion entre ejercicios --- */}
      <Section tone="paper" labelledBy="impacto-comparacion">
        <div className="container-hv">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel index="02">{t("comparisonLabel")}</SectionLabel>
              <h2 id="impacto-comparacion" className="display-l mt-7 uppercase">
                {t("comparisonTitle")}
              </h2>
            </div>
            <p className="lead self-end text-ink-80 lg:col-span-5 lg:col-start-8">
              {t("comparisonBody")}
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[17rem] border-collapse text-left">
              <caption className="sr-only-hv">{t("comparisonTitle")}</caption>
              <thead>
                <tr className="border-y border-hair-strong">
                  <th scope="col" className="label-hv py-4 pr-6 text-ink-60">
                    {t("activityLabel")}
                  </th>
                  <th scope="col" className="label-hv py-4 pr-6 text-right text-ink-60">
                    2024
                  </th>
                  <th scope="col" className="label-hv py-4 text-right text-red">
                    2025
                  </th>
                </tr>
              </thead>
              <tbody>
                {current.metrics.map((metric) => {
                  const before = previous.metrics.find(
                    (m) => m.id === metric.id,
                  );
                  return (
                    <tr key={metric.id} className="border-b border-hair">
                      <th
                        scope="row"
                        className="py-4 pr-5 text-left text-[0.9375rem] font-normal text-ink-80"
                      >
                        {tMetrics(`${metric.id}.label`)}
                      </th>
                      <td className="tnum py-4 pr-6 text-right font-display font-semibold text-ink-60">
                        {before
                          ? `${before.prefix ?? ""}${formatNumber(before.value, locale)}`
                          : "—"}
                      </td>
                      <td className="tnum py-4 text-right font-display text-[1.125rem] font-bold">
                        {metric.prefix ?? ""}
                        {formatNumber(metric.value, locale)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Discrepancia documentada del ejercicio 2024 */}
          <div className="mt-12 border-l-2 border-red bg-paper-2 px-6 py-6 sm:px-8">
            <h3 className="display-s">{t("discrepancyTitle")}</h3>
            <p className="measure-wide mt-3 text-ink-80">
              {t("discrepancyBody")}
            </p>
          </div>
        </div>
      </Section>

      {/* --- Economia --- */}
      <Section tone="bone" labelledBy="impacto-economia">
        <div className="container-hv">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel index="03">{t("financeLabel")}</SectionLabel>
              <Headline
                id="impacto-economia"
                text={t("financeTitle")}
                className="display-l mt-7 uppercase"
                accent={false}
              />
            </div>
            <p className="lead self-end text-ink-80 lg:col-span-5 lg:col-start-8">
              {t("financeBody", {
                year: latestYear,
                income: formatCurrency(current.totals.income, locale),
                expenses: formatCurrency(current.totals.expenses, locale),
                surplus: formatCurrency(current.totals.surplus, locale),
              })}
            </p>
          </div>

          {/* Totales */}
          <dl className="mt-12 grid border-t border-hair-strong sm:grid-cols-3">
            {[
              { k: t("totalIncome"), v: current.totals.income },
              { k: t("totalExpenses"), v: current.totals.expenses },
              { k: t("surplus"), v: current.totals.surplus },
            ].map((item, i) => (
              <div
                key={item.k}
                className={`border-b border-hair py-6 ${
                  i > 0 ? "sm:border-l sm:border-hair sm:pl-7" : ""
                }`}
              >
                <dt className="label-hv text-ink-60">{item.k}</dt>
                <dd className="tnum mt-3 font-display text-[clamp(1.375rem,1.1rem+1.1vw,1.875rem)] font-bold tracking-tight">
                  {formatCurrency(item.v, locale)}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 grid gap-8 border-t border-hair-strong pt-10 lg:grid-cols-12 lg:gap-16">
            <h3 className="display-s lg:col-span-4">{t("fundingTitle")}</h3>
            <p className="text-ink-80 lg:col-span-7 lg:col-start-6">
              {t("fundingBody")}
            </p>
          </div>
        </div>
      </Section>

      {/* --- Documentos --- */}
      <Section tone="paper" labelledBy="impacto-documentos">
        <div className="container-hv">
          <SectionLabel index="04">{t("docsLabel")}</SectionLabel>
          <h2 id="impacto-documentos" className="display-l mt-7 uppercase">
            {t("docsTitle")}
          </h2>
          <p className="measure-wide lead mt-7 text-ink-80">{t("docsBody")}</p>

          <div className="mt-12 space-y-12">
            {docsByYear.map((group) => (
              <div key={group.year}>
                <p className="label-hv border-b border-hair-strong pb-3 text-ink-60">
                  {tCommon("year")} {group.year}
                </p>
                <ul className="grid gap-x-10 md:grid-cols-2">
                  {group.items.map((doc) => (
                    <li key={doc.id} className="border-b border-hair">
                      <a
                        href={doc.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-6 py-6 transition-colors hover:text-red"
                      >
                        <span>
                          <span className="display-s block">
                            {t(`docTypes.${doc.type}`)} {doc.year}
                          </span>
                          <span className="caption-hv mt-1 block">
                            {tCommon("pdfSize", { size: doc.sizeLabel })} ·{" "}
                            {tCommon("openInNewTab")}
                          </span>
                        </span>
                        <span className="label-hv flex shrink-0 items-center gap-2 rounded-sm border border-hair-strong px-3 py-2.5 transition-colors group-hover:border-red">
                          PDF
                          <svg
                            width="12"
                            height="14"
                            viewBox="0 0 12 14"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M6 0v10m0 0 4-4m-4 4L2 6M0 13h12"
                              stroke="currentColor"
                              strokeWidth="1.4"
                            />
                          </svg>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTABand title={t("ctaTitle")} body={t("ctaBody")} tone="claret">
        <Link
          href="/colabora"
          className="btn bg-paper text-claret hover:bg-red hover:text-paper"
        >
          {tCta("donateLong")}
          <Arrow />
        </Link>
        <Link href="/quienes-somos" className="btn btn-outline-inv">
          {tCta("knowUs")}
        </Link>
      </CTABand>
    </>
  );
}
