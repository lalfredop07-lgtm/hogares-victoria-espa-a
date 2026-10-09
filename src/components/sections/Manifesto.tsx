import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Figure } from "@/components/ui/Figure";
import { delay } from "@/lib/reveal";

/**
 * El lema de la asociacion, en escalera tipografica.
 * La fotografia de apoyo muestra el mismo lema impreso en la espalda del
 * equipo: el texto y la imagen dicen literalmente lo mismo.
 */
export async function Manifesto() {
  const t = await getTranslations("home.manifesto");

  const lines = [t("line1"), t("line2"), t("line3")];

  return (
    <Section tone="paper" labelledBy="manifiesto-titulo">
      <div className="container-hv">
        <SectionLabel index="01">{t("label")}</SectionLabel>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="manifiesto-titulo" className="display-l uppercase">
              {lines.map((line, i) => (
                <span
                  key={line}
                  data-reveal
                  style={delay(i * 180)}
                  className={`block ${
                    i === 2 ? "text-red" : "text-ink"
                  } ${i === 1 ? "lg:pl-10" : ""} ${i === 2 ? "lg:pl-20" : ""}`}
                >
                  {line}
                </span>
              ))}
            </h2>

            <div className="mt-12 max-w-[34rem] space-y-5 lg:mt-16">
              <p className="lead" data-reveal>
                {t("body1")}
              </p>
              <p className="text-ink-80" data-reveal style={delay(80)}>
                {t("body2")}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <Figure
              id="lema-camiseta"
              ratio="1/1"
              sizes="(min-width: 1024px) 38vw, 100vw"
              position="50% 42%"
              className="lg:sticky lg:top-28"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
