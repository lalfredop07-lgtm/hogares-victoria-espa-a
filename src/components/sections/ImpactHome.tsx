import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Headline } from "@/components/ui/Headline";
import { Counter } from "@/components/ui/Counter";
import { Arrow } from "@/components/ui/Arrow";
import { getMetric, homeMetricIds, latestYear } from "@/content/impact";
import { formatNumber } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { delay } from "@/lib/reveal";

export async function ImpactHome() {
  const locale = (await getLocale()) as Locale;
  const [t, tMetrics, tCta] = await Promise.all([
    getTranslations("home.impact"),
    getTranslations("metrics"),
    getTranslations("cta"),
  ]);

  const metrics = homeMetricIds
    .map((id) => getMetric(latestYear, id))
    .filter((m) => m !== undefined);

  return (
    <Section tone="ink" labelledBy="impacto-titulo">
      <div className="container-hv">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="04" tone="paper">
              {t("label")}
            </SectionLabel>
            <Headline
              id="impacto-titulo"
              text={t("title")}
              className="display-l mt-7 uppercase text-paper"
            />
          </div>
          <p className="lead self-end text-paper/70 lg:col-span-5 lg:pb-2">
            {t("lead")}
          </p>
        </div>

        <dl className="mt-16 grid border-t border-hair-inv-strong sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <div
              key={metric.id}
              className={`border-b border-hair-inv py-10 lg:py-12 ${
                i > 0 ? "lg:border-l lg:border-hair-inv lg:pl-7" : "lg:pr-7"
              } ${i % 2 === 1 ? "sm:border-l sm:border-hair-inv sm:pl-7" : ""} ${
                i > 0 && i % 2 === 0 ? "sm:pl-0 lg:pl-7" : ""
              }`}
              data-reveal
              style={delay(i * 90)}
            >
              <dd className="stat text-paper">
                <Counter
                  value={metric.value}
                  prefix={metric.prefix}
                  formatted={formatNumber(metric.value, locale)}
                />
              </dd>
              <dt className="mt-5 max-w-[22ch] font-display text-[0.9375rem] font-semibold leading-snug tracking-tight text-paper">
                {tMetrics(`${metric.id}.label`)}
              </dt>
              {metric.breakdown ? (
                <p className="caption-hv mt-3 max-w-[24ch] !text-paper/60">
                  {tMetrics(`${metric.id}.note`, {
                    group: metric.breakdown.group,
                    individual: metric.breakdown.individual,
                  })}
                </p>
              ) : (
                <p className="caption-hv mt-3 max-w-[24ch] !text-paper/60">
                  {tMetrics(`${metric.id}.note`)}
                </p>
              )}
            </div>
          ))}
        </dl>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="flex max-w-[44rem] items-start gap-4 text-[0.9375rem] text-paper/55">
            <span
              className="mt-[0.6em] h-px w-6 shrink-0 bg-red"
              aria-hidden="true"
            />
            {t("note")}
          </p>
          <Link href="/impacto" className="link-arrow shrink-0">
            {tCta("ourImpact")}
            <Arrow />
          </Link>
        </div>
      </div>
    </Section>
  );
}
