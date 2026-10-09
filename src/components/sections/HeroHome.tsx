import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { photos } from "@/content/images";
import { Headline } from "@/components/ui/Headline";
import { Arrow } from "@/components/ui/Arrow";
import { delay } from "@/lib/reveal";

export async function HeroHome() {
  const [t, tCta, tAlt] = await Promise.all([
    getTranslations("home.hero"),
    getTranslations("cta"),
    getTranslations("alt"),
  ]);

  const hero = photos["comunidad-campo-atardecer"];

  return (
    <section className="relative isolate flex min-h-[90svh] flex-col justify-end overflow-hidden bg-ink lg:min-h-[94svh]">
      <Image
        src={hero.src}
        alt={tAlt("comunidad-campo-atardecer")}
        width={hero.width}
        height={hero.height}
        sizes="100vw"
        priority
        fetchPriority="high"
        placeholder="blur"
        blurDataURL={hero.blurDataURL}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[62%_38%] lg:object-[center_42%]"
      />

      {/* Veladuras: una vertical para el texto y otra lateral en escritorio. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/88 via-ink/42 to-ink/12"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink/35 via-transparent to-transparent lg:block"
        aria-hidden="true"
      />
      {/* Velo superior: mantiene legible la cabecera cuando la fotografia es clara. */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/55 to-transparent"
        aria-hidden="true"
      />

      <div className="container-hv on-ink relative pb-14 pt-32 lg:pb-20 lg:pt-40">
        <div className="space-y-6">
          <p
            className="label-hv flex items-center gap-3 text-paper/70"
            data-reveal
            style={delay(80)}
          >
            <span className="h-px w-8 bg-red" aria-hidden="true" />
            {t("eyebrow")}
          </p>

          <div data-reveal style={delay(150)}>
            <Headline
              as="h1"
              text={t("title")}
              className="display-xl uppercase text-paper sm:max-w-[34rem] lg:max-w-[52rem]"
            />
          </div>
        </div>

        <p
          className="measure-wide lead mt-7 text-paper/85"
          data-reveal
          style={delay(220)}
        >
          {t("lead")}
        </p>

        <div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          data-reveal
          style={delay(320)}
        >
          <Link href="/necesito-ayuda" className="btn btn-primary">
            {tCta("help")}
            <Arrow />
          </Link>
          <Link href="/quienes-somos" className="btn btn-outline-inv">
            {tCta("ourStory")}
          </Link>
        </div>

        <div className="mt-14 hidden justify-end border-t border-hair-inv pt-5 sm:flex">
          <p
            className="label-hv flex items-center gap-3 text-paper/60"
            aria-hidden="true"
          >
            {t("scroll")}
            <span className="block h-8 w-px bg-paper/30" />
          </p>
        </div>
      </div>
    </section>
  );
}
