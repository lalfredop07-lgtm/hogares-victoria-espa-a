import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";

type LegalSection = { heading: string; body: string };

/**
 * Documento legal. La estructura es profesional, pero el texto esta pendiente
 * de revision juridica y asi se indica de forma visible: no se presenta como
 * aprobado.
 */
export async function LegalPage({
  docKey,
  locale,
  updated,
}: {
  docKey: "notice" | "privacy" | "cookies";
  locale: Locale;
  updated: string;
}) {
  const t = await getTranslations("legal");
  const sections = t.raw(`${docKey}.sections`) as LegalSection[];

  const formatted = new Intl.DateTimeFormat(
    locale === "es" ? "es-ES" : "en-GB",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
  ).format(new Date(`${updated}T00:00:00Z`));

  return (
    <>
      <PageHeader
        label={t("lastUpdated") + " · " + formatted}
        title={t(`${docKey}.title`)}
      />

      <Section tone="paper" className="!pt-0">
        <div className="container-hv">
          <div
            role="note"
            className="measure-wide border-l-2 border-red bg-paper-2 px-6 py-5"
          >
            <p className="label-hv text-red-deep">{t("reviewNoticeTitle")}</p>
            <p className="mt-2 text-[0.9375rem] text-ink-80">
              {t("reviewNoticeBody")}
            </p>
          </div>

          <div className="measure-wide mt-14">
            <ol className="border-t border-hair-strong">
              {sections.map((section, i) => (
                <li key={section.heading} className="border-b border-hair py-9">
                  <div className="flex gap-6">
                    <span
                      className="label-hv mt-[0.4em] shrink-0 text-red tabular-nums"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="display-s">{section.heading}</h2>
                      <p className="mt-3 text-ink-80">{section.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </>
  );
}
