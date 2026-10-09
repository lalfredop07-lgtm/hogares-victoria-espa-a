import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Headline } from "@/components/ui/Headline";
import { Figure } from "@/components/ui/Figure";
import { Arrow } from "@/components/ui/Arrow";
import { delay } from "@/lib/reveal";

/**
 * Los origenes, contados en un solo bloque: nada de cronologia extensa en la
 * portada. La composicion fotografica superpone el acto institucional en el
 * Congreso del Peru y el retrato de los fundadores.
 */
export async function HistoryHome() {
  const [t, tCta] = await Promise.all([
    getTranslations("home.history"),
    getTranslations("cta"),
  ]);

  return (
    <Section tone="bone" labelledBy="historia-titulo">
      <div className="container-hv grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:pt-6">
          <SectionLabel index="06">{t("label")}</SectionLabel>
          <Headline
            id="historia-titulo"
            text={t("title")}
            className="display-l mt-7 uppercase"
          />
          <div className="measure mt-8 space-y-5">
            <p className="lead" data-reveal>
              {t("body1")}
            </p>
            <p className="text-ink-80" data-reveal style={delay(80)}>
              {t("body2")}
            </p>
          </div>
          <Link href="/quienes-somos" className="link-arrow mt-10 inline-flex">
            {tCta("knowUs")}
            <Arrow />
          </Link>
        </div>

        <div className="lg:col-span-7">
          <div className="relative pb-20 sm:pb-24 lg:pb-28">
            <div data-reveal="clip">
              <Figure
                id="congreso-peru-hemiciclo"
                ratio="3/2"
                sizes="(min-width: 1024px) 52vw, 100vw"
              />
            </div>
            <div
              className="absolute bottom-0 right-0 w-[42%] max-w-[16rem] border-[6px] border-paper-2 sm:w-[36%] lg:w-[34%]"
              data-reveal
              style={delay(180)}
            >
              <Figure
                id="fundadores-salazar"
                ratio="3/4"
                sizes="(min-width: 1024px) 18vw, 36vw"
                position="50% 30%"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
