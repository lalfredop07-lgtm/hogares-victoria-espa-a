import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { photos } from "@/content/images";
import { Headline } from "@/components/ui/Headline";
import { Arrow } from "@/components/ui/Arrow";

export async function ClosingHome() {
  const [t, tCta, tAlt] = await Promise.all([
    getTranslations("home.closing"),
    getTranslations("cta"),
    getTranslations("alt"),
  ]);

  const img = photos["orilla-manos-alzadas"];

  return (
    <section
      aria-labelledby="cierre-titulo"
      className="on-ink relative isolate flex min-h-[62svh] items-center overflow-hidden bg-ink py-24 text-paper lg:min-h-[70svh]"
    >
      <Image
        src={img.src}
        alt={tAlt("orilla-manos-alzadas")}
        width={img.width}
        height={img.height}
        sizes="100vw"
        loading="lazy"
        placeholder="blur"
        blurDataURL={img.blurDataURL}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_40%]"
      />
      <div
        className="absolute inset-0 -z-10 bg-ink/72"
        aria-hidden="true"
      />

      <div className="container-hv">
        <div data-reveal>
          <Headline
            id="cierre-titulo"
            text={t("title")}
            className="display-l uppercase text-paper sm:max-w-[30rem] lg:max-w-[46rem]"
          />
        </div>
        <p className="measure-wide lead mt-7 text-paper/80">{t("body")}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href="/necesito-ayuda" className="btn btn-primary">
            {tCta("help")}
            <Arrow />
          </Link>
          <Link href="/colabora" className="btn btn-outline-inv">
            {tCta("collaborate")}
          </Link>
        </div>
      </div>
    </section>
  );
}
