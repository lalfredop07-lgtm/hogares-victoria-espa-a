import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { org } from "@/content/organization";
import { timeline, recognitions } from "@/content/timeline";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTABand } from "@/components/layout/CTABand";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Headline } from "@/components/ui/Headline";
import { Figure } from "@/components/ui/Figure";
import { Arrow } from "@/components/ui/Arrow";
import { delay } from "@/lib/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, href: "/quienes-somos", page: "about" });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tTimeline, tRec, tCta] = await Promise.all([
    getTranslations("about"),
    getTranslations("timeline"),
    getTranslations("recognitions"),
    getTranslations("cta"),
  ]);

  const values = t.raw("values") as { name: string; body: string }[];

  return (
    <>
      <PageHeader
        label={t("hero.label")}
        title={t("hero.title")}
        lead={t("hero.lead")}
      />

      {/* --- Fotografia a sangre como respiracion tras la cabecera --- */}
      <div data-reveal="clip">
        <Figure
          id="bautismo-lago"
          ratio="16/9"
          sizes="100vw"
          position="50% 45%"
          className="w-full"
        />
      </div>

      {/* --- Identidad --- */}
      <Section tone="paper" labelledBy="sobre-identidad">
        <div className="container-hv grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel index="01">{t("identity.label")}</SectionLabel>
            <h2 id="sobre-identidad" className="display-m mt-7">
              {t("identity.title")}
            </h2>
          </div>
          <div className="measure-wide space-y-5 lg:col-span-7 lg:col-start-6">
            <p className="lead">{t("identity.body1")}</p>
            <p className="text-ink-80">{t("identity.body2")}</p>
          </div>
        </div>

        {/* Ficha institucional */}
        <div className="container-hv mt-14">
          <dl className="grid grid-cols-2 border-t border-hair-strong sm:grid-cols-4">
            {[
              { k: "NIF", v: org.nif },
              { k: "Registro Nacional", v: `Nº ${org.registry.number}` },
              { k: "Sección", v: org.registry.section },
              { k: locale === "es" ? "Sedes" : "Sites", v: "Quijorna · Madrid" },
            ].map((item, i) => (
              <div
                key={item.k}
                className={`border-b border-hair py-5 pr-4 ${
                  i > 0 ? "sm:border-l sm:border-hair sm:pl-5" : ""
                }`}
              >
                <dt className="label-hv text-ink-40">{item.k}</dt>
                <dd className="tnum mt-2 font-display text-[0.9375rem] font-semibold tracking-tight">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* --- Origen en Peru --- */}
      <Section tone="bone" labelledBy="sobre-origen">
        <div className="container-hv grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionLabel index="02">{t("origin.label")}</SectionLabel>
            <Headline
              id="sobre-origen"
              text={t("origin.title")}
              className="display-l mt-7 uppercase"
            />
            <div className="measure mt-8 space-y-5">
              <p className="lead">{t("origin.body1")}</p>
              <p className="text-ink-80">{t("origin.body2")}</p>
            </div>

            <div className="mt-12 border-t border-hair-strong pt-8">
              <h3 className="display-s">{t("foundersTitle")}</h3>
              <p className="measure mt-3 text-ink-80">{t("foundersBody")}</p>
            </div>
          </div>

          <div className="grid gap-6 lg:col-span-5 lg:col-start-8">
            <div data-reveal="clip">
              <Figure
                id="congreso-peru-grupo"
                ratio="4/3"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div data-reveal style={delay(120)}>
              <Figure
                id="fundadores-salazar"
                ratio="4/5"
                sizes="(min-width: 1024px) 40vw, 100vw"
                position="50% 25%"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* --- Cronologia --- */}
      <Section tone="paper" labelledBy="sobre-cronologia">
        <div className="container-hv">
          <SectionLabel index="03">{t("timelineLabel")}</SectionLabel>
          <h2 id="sobre-cronologia" className="display-l mt-7 uppercase">
            {t("timelineTitle")}
          </h2>

          <ol className="mt-14 border-t border-hair-strong">
            {timeline.map((item, i) => (
              <li
                key={item.id}
                className="grid gap-5 border-b border-hair py-9 lg:grid-cols-12 lg:gap-10"
                data-reveal
                style={delay(i * 60)}
              >
                <p className="stat !text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] text-red lg:col-span-2">
                  {item.year}
                </p>
                <h3 className="display-s self-center lg:col-span-4">
                  {tTimeline(`${item.id}.title`)}
                </h3>
                <p className="self-center text-ink-80 lg:col-span-5 lg:col-start-8">
                  {tTimeline(`${item.id}.body`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* --- Espana --- */}
      <Section tone="bone" labelledBy="sobre-espana">
        <div className="container-hv grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6" data-reveal="clip">
            <Figure
              id="hogar-patio-encuentro"
              ratio="4/3"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionLabel index="04">{t("spain.label")}</SectionLabel>
            <Headline
              id="sobre-espana"
              text={t("spain.title")}
              className="display-m mt-7 uppercase"
            />
            <div className="mt-7 space-y-5">
              <p className="lead">{t("spain.body1")}</p>
              <p className="text-ink-80">{t("spain.body2")}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* --- Mision, vision, expectativa --- */}
      <Section tone="ink" labelledBy="sobre-mision">
        <div className="container-hv">
          <SectionLabel index="05" tone="paper">
            {t("missionLabel")}
          </SectionLabel>

          <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-10">
            {[
              { id: "sobre-mision", label: t("missionLabel"), body: t("mission") },
              { id: "sobre-vision", label: t("visionLabel"), body: t("vision") },
              {
                id: "sobre-expectativa",
                label: t("expectationLabel"),
                body: t("expectation"),
                note: t("expectationNote"),
              },
            ].map((block, i) => (
              <div
                key={block.id}
                className="border-t border-hair-inv-strong pt-7"
                data-reveal
                style={delay(i * 100)}
              >
                <h2 id={block.id} className="display-s text-paper">
                  {block.label}
                </h2>
                <p className="mt-5 text-paper/80">{block.body}</p>
                {block.note ? (
                  <p className="caption-hv mt-5">{block.note}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* --- Valores --- */}
      <Section tone="paper" labelledBy="sobre-valores">
        <div className="container-hv">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel index="06">{t("valuesLabel")}</SectionLabel>
              <h2 id="sobre-valores" className="display-l mt-7 uppercase">
                {t("valuesTitle")}
              </h2>
            </div>
          </div>

          <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <li
                key={value.name}
                className="border-t border-hair-strong pt-6"
                data-reveal
                style={delay((i % 3) * 80)}
              >
                <p
                  className="label-hv text-red tabular-nums"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="display-s mt-4">{value.name}</h3>
                <p className="mt-3 text-ink-80">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* --- Fe --- */}
      <Section tone="bone" labelledBy="sobre-fe">
        <div className="container-hv grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="07">{t("faithLabel")}</SectionLabel>
            <Headline
              id="sobre-fe"
              text={t("faithTitle")}
              className="display-m mt-7 uppercase"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="lead">{t("faithBody")}</p>
            <p className="caption-hv mt-6">{t("faithNote")}</p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {org.scripture.map((reference) => (
                <li
                  key={reference}
                  className="label-hv rounded-sm border border-hair-strong px-4 py-2.5 text-ink-80"
                >
                  {reference}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* --- Reconocimientos --- */}
      <Section tone="paper" labelledBy="sobre-reconocimientos">
        <div className="container-hv">
          <SectionLabel index="08">{t("recognitionsLabel")}</SectionLabel>
          <h2 id="sobre-reconocimientos" className="display-l mt-7 uppercase">
            {t("recognitionsTitle")}
          </h2>

          <div className="mt-14 grid gap-12 md:grid-cols-2 lg:gap-16">
            {recognitions.map((item, i) => (
              <article key={item.id} data-reveal style={delay(i * 100)}>
                <Figure
                  id={item.photo}
                  ratio="3/2"
                  sizes="(min-width: 768px) 46vw, 100vw"
                />
                <h3 className="display-s mt-6">{tRec(`${item.id}.title`)}</h3>
                <p className="mt-3 text-ink-80">{tRec(`${item.id}.body`)}</p>
              </article>
            ))}
          </div>

          <p className="measure-wide mt-12 flex items-start gap-4 border-t border-hair pt-6 text-[0.9375rem] text-ink-60">
            <span
              className="mt-[0.6em] h-px w-6 shrink-0 bg-red"
              aria-hidden="true"
            />
            {tRec("note")}
          </p>
        </div>
      </Section>

      {/* --- Equipo --- */}
      <Section tone="bone" labelledBy="sobre-equipo">
        <div className="container-hv grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="09">{t("teamLabel")}</SectionLabel>
            <h2 id="sobre-equipo" className="display-m mt-7">
              {t("teamTitle")}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="lead">{t("teamBody")}</p>
            <dl className="mt-8 border-t border-hair-strong">
              <div className="flex flex-wrap items-baseline gap-x-6 border-b border-hair py-4">
                <dt className="label-hv w-32 shrink-0 text-ink-40">
                  {locale === "es" ? "Dirección" : "Director"}
                </dt>
                <dd className="font-display font-semibold">{org.director}</dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-6 border-b border-hair py-4">
                <dt className="label-hv w-32 shrink-0 text-ink-40">
                  {locale === "es" ? "Secretaría" : "Secretary"}
                </dt>
                <dd className="font-display font-semibold">{org.secretary}</dd>
              </div>
            </dl>
            <p className="caption-hv mt-6">{t("teamNote")}</p>
          </div>
        </div>
      </Section>

      <CTABand title={t("ctaTitle")} body={t("ctaBody")}>
        <Link href="/nuestra-labor" className="btn btn-primary">
          {tCta("ourWork")}
          <Arrow />
        </Link>
        <Link href="/impacto" className="btn btn-outline-inv">
          {tCta("ourImpact")}
        </Link>
      </CTABand>
    </>
  );
}
