import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { programs } from "@/content/programs";
import { documentedOutreachAreas, org } from "@/content/organization";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTABand } from "@/components/layout/CTABand";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Figure } from "@/components/ui/Figure";
import { Arrow } from "@/components/ui/Arrow";
import { delay } from "@/lib/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, href: "/nuestra-labor", page: "work" });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tProg, tCta, tCommon] = await Promise.all([
    getTranslations("work"),
    getTranslations("programs"),
    getTranslations("cta"),
    getTranslations("common"),
  ]);

  return (
    <>
      <PageHeader
        label={t("hero.label")}
        title={t("hero.title")}
        lead={t("hero.lead")}
        aside={
          <nav aria-label={t("indexLabel")}>
            <p className="label-hv border-b border-hair-strong pb-3 text-ink-60">
              {t("indexLabel")}
            </p>
            <ol className="mt-1">
              {programs.map((program) => (
                <li key={program.id}>
                  <a
                    href={`#${program.id}`}
                    className="flex items-baseline gap-4 border-b border-hair py-3 text-[0.9375rem] transition-colors hover:text-red"
                  >
                    <span
                      className="label-hv text-red tabular-nums"
                      aria-hidden="true"
                    >
                      {program.index}
                    </span>
                    {tProg(`${program.id}.name`)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      {programs.map((program, i) => {
        const reversed = i % 2 === 1;
        const what = tProg.raw(`${program.id}.what`) as string[];
        const note = tProg(`${program.id}.note`);
        const gallery = program.gallery ?? [];

        return (
          <section
            key={program.id}
            id={program.id}
            aria-labelledby={`${program.id}-titulo`}
            className={`scroll-mt-28 py-(--spacing-section) ${
              i % 2 === 0 ? "bg-paper" : "bg-paper-2"
            }`}
          >
            <div className="container-hv">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                {/* --- Texto --- */}
                <div
                  className={`lg:col-span-5 ${
                    reversed ? "lg:order-2 lg:col-start-8" : ""
                  }`}
                >
                  <SectionLabel index={program.index}>
                    {t("indexLabel")}
                  </SectionLabel>
                  <h2
                    id={`${program.id}-titulo`}
                    className="display-m mt-7 uppercase"
                  >
                    {tProg(`${program.id}.name`)}
                  </h2>
                  <p className="lead mt-7 text-ink-80">
                    {tProg(`${program.id}.intro`)}
                  </p>

                  <h3 className="label-hv mt-12 text-ink-60">
                    {tProg(`${program.id}.whatLabel`)}
                  </h3>
                  <ul className="mt-5 border-t border-hair-strong">
                    {what.map((item) => (
                      <li
                        key={item}
                        className="flex gap-4 border-b border-hair py-3 text-ink-80"
                      >
                        <span
                          className="mt-[0.72em] h-px w-4 shrink-0 bg-red"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <h3 className="label-hv mt-10 text-ink-60">
                    {tProg(`${program.id}.whoLabel`)}
                  </h3>
                  <p className="mt-4 text-ink-80">
                    {tProg(`${program.id}.who`)}
                  </p>

                  {/* Zonas documentadas: solo en el programa de calle */}
                  {program.id === "calle" ? (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {documentedOutreachAreas.map((area) => (
                        <li
                          key={area}
                          className="label-hv rounded-sm border border-hair-strong px-3 py-2 !tracking-[0.08em] text-ink-80"
                        >
                          {area}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {note ? (
                    <p className="mt-10 flex items-start gap-4 border-t border-hair-strong pt-5 text-[0.9375rem] text-ink-60">
                      <span
                        className="mt-[0.55em] h-px w-6 shrink-0 bg-red"
                        aria-hidden="true"
                      />
                      {note}
                    </p>
                  ) : null}
                </div>

                {/* --- Fotografias --- */}
                <div
                  className={`space-y-6 lg:col-span-6 ${
                    reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"
                  }`}
                >
                  <div data-reveal="clip">
                    <Figure
                      id={program.photo}
                      ratio="3/2"
                      sizes="(min-width: 1024px) 48vw, 100vw"
                    />
                  </div>
                  {gallery.length > 0 ? (
                    <div
                      className={`grid gap-4 sm:gap-6 ${
                        gallery.length > 1 ? "grid-cols-2" : ""
                      }`}
                    >
                      {gallery.map((photo, k) => (
                        <div key={photo} data-reveal style={delay(k * 90)}>
                          <Figure
                            id={photo}
                            ratio="4/3"
                            sizes="(min-width: 1024px) 24vw, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Explica por que algunos rostros aparecen cubiertos */}
                  {program.id === "calle" ? (
                    <p className="caption-hv flex items-start gap-3">
                      <span
                        className="mt-[0.55em] h-px w-5 shrink-0 bg-red"
                        aria-hidden="true"
                      />
                      {tCommon("privacyNoteShort")}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CTABand title={t("ctaTitle")} body={t("ctaBody")} tone="claret">
        <Link href="/necesito-ayuda" className="btn bg-paper text-claret hover:bg-red hover:text-paper">
          {tCta("help")}
          <Arrow />
        </Link>
        <a href={org.phone.href} className="btn btn-outline-inv">
          {tCommon("phone")} · {org.phone.display}
        </a>
      </CTABand>
    </>
  );
}
