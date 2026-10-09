import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Headline } from "@/components/ui/Headline";
import { Figure } from "@/components/ui/Figure";
import { Arrow } from "@/components/ui/Arrow";
import { homePrograms } from "@/content/programs";

/**
 * Los programas se presentan como un sumario editorial, no como tarjetas:
 * filas alternadas con indice, titulo, entradilla y fotografia propia.
 */
export async function ProgramsHome() {
  const [t, tProg, tCta] = await Promise.all([
    getTranslations("home.programs"),
    getTranslations("programs"),
    getTranslations("cta"),
  ]);

  return (
    <Section tone="paper" labelledBy="programas-titulo">
      <div className="container-hv">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="03">{t("label")}</SectionLabel>
            <Headline
              id="programas-titulo"
              text={t("title")}
              className="display-l mt-7 uppercase"
            />
          </div>
          <p className="lead self-end text-ink-80 lg:col-span-5 lg:pb-2">
            {t("lead")}
          </p>
        </div>

        <ol className="mt-16 lg:mt-20">
          {homePrograms.map((program, i) => {
            const reversed = i % 2 === 1;
            return (
              <li
                key={program.id}
                className="grid items-stretch gap-8 border-t border-hair py-10 lg:grid-cols-12 lg:gap-10 lg:py-16"
              >
                <div
                  className={`lg:col-span-7 ${
                    reversed ? "lg:order-2 lg:col-start-6" : "lg:col-start-1"
                  }`}
                  data-reveal="clip"
                >
                  <Figure
                    id={program.photo}
                    ratio="3/2"
                    sizes="(min-width: 1024px) 55vw, 100vw"
                  />
                </div>

                <div
                  className={`flex flex-col lg:col-span-4 lg:pb-2 ${
                    reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"
                  }`}
                  data-reveal
                >
                  <p
                    className="label-hv text-red tabular-nums"
                    aria-hidden="true"
                  >
                    {program.index}
                  </p>
                  {/* Filete que une el indice con el titulo y da estructura al aire */}
                  <span
                    className="my-6 hidden w-px flex-1 bg-hair lg:block"
                    aria-hidden="true"
                  />
                  <h3 className="display-m mt-4 lg:mt-0">
                    {tProg(`${program.id}.name`)}
                  </h3>
                  <p className="lead mt-4 text-ink-80">
                    {tProg(`${program.id}.short`)}
                  </p>
                  <Link
                    href={{
                      pathname: "/nuestra-labor",
                      hash: program.id,
                    }}
                    aria-label={`${tCta("seeProgram")}: ${tProg(`${program.id}.name`)}`}
                    className="link-arrow mt-7 inline-flex"
                  >
                    {tCta("seeProgram")}
                    <Arrow />
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 border-t border-hair-strong pt-10">
          <Link href="/nuestra-labor" className="btn btn-ink">
            {tCta("ourWork")}
            <Arrow />
          </Link>
        </div>
      </div>
    </Section>
  );
}
