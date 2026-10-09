import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Headline } from "@/components/ui/Headline";
import { Figure } from "@/components/ui/Figure";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Banda de donacion. La fotografia muestra a donde van los recursos
 * (alimentos cargados en la furgoneta) en lugar del rostro de una persona
 * atendida: la peticion de fondos no se apoya en la vulnerabilidad de nadie.
 */
export async function DonateHome() {
  const [t, tCta] = await Promise.all([
    getTranslations("home.donate"),
    getTranslations("cta"),
  ]);

  return (
    <section
      aria-labelledby="donar-titulo"
      className="on-ink bg-claret text-paper"
    >
      <div className="container-hv grid items-center gap-12 py-(--spacing-section) lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionLabel index="07" tone="paper">
            {t("label")}
          </SectionLabel>
          <Headline
            id="donar-titulo"
            text={t("title")}
            className="display-l mt-7 uppercase text-paper"
          />
          <p className="lead measure-wide mt-7 text-paper/80">{t("body")}</p>

          <p className="measure-wide mt-8 flex items-start gap-4 border-t border-hair-inv pt-6 text-[0.9375rem] text-paper/60">
            <span
              className="mt-[0.6em] h-px w-6 shrink-0 bg-paper/50"
              aria-hidden="true"
            />
            {t("transparency")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/colabora" className="btn bg-paper text-claret hover:bg-red hover:text-paper">
              {tCta("donateLong")}
              <Arrow />
            </Link>
            <Link href="/voluntariado" className="btn btn-outline-inv">
              {tCta("otherWays")}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6" data-reveal="clip">
          <Figure
            id="donacion-furgoneta-alimentos"
            ratio="4/3"
            sizes="(min-width: 1024px) 46vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
