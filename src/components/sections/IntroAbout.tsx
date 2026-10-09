import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Headline } from "@/components/ui/Headline";
import { Figure } from "@/components/ui/Figure";
import { Arrow } from "@/components/ui/Arrow";
import { delay } from "@/lib/reveal";

export async function IntroAbout() {
  const [t, tCta] = await Promise.all([
    getTranslations("home.intro"),
    getTranslations("cta"),
  ]);

  const facts = [
    { k: t("facts.founded"), v: t("facts.foundedValue") },
    { k: t("facts.spain"), v: t("facts.spainValue") },
    { k: t("facts.cost"), v: t("facts.costValue") },
    { k: t("facts.registry"), v: t("facts.registryValue") },
  ];

  return (
    <Section tone="bone" labelledBy="intro-titulo">
      <div className="container-hv grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div data-reveal="clip">
            <Figure
              id="mesa-hogar-comida"
              ratio="4/5"
              sizes="(min-width: 1024px) 40vw, 100vw"
              position="50% 45%"
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-4">
          <SectionLabel index="02">{t("label")}</SectionLabel>

          <Headline
            id="intro-titulo"
            text={t("title")}
            className="display-l mt-7 uppercase"
          />

          <div className="measure-wide mt-8 space-y-5">
            <p className="lead" data-reveal>
              {t("body1")}
            </p>
            <p className="text-ink-80" data-reveal style={delay(70)}>
              {t("body2")}
            </p>
            <p className="text-ink-80" data-reveal style={delay(140)}>
              {t("body3")}
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 border-t border-hair-strong sm:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.k}
                className={`border-b border-hair py-5 pr-4 ${
                  i % 2 === 1 ? "pl-5 sm:pl-5" : ""
                } ${i > 0 ? "sm:border-l sm:border-hair sm:pl-5" : ""}`}
                data-reveal
                style={delay(i * 70)}
              >
                <dt className="label-hv text-ink-40">{f.k}</dt>
                <dd className="mt-2 font-display text-[0.9375rem] font-semibold tracking-tight">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>

          <Link href="/quienes-somos" className="link-arrow mt-10 inline-flex">
            {tCta("knowUs")}
            <Arrow />
          </Link>
        </div>
      </div>
    </Section>
  );
}
