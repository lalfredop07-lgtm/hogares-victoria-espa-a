import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import { stories } from "@/content/stories";
import { photos } from "@/content/images";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTABand } from "@/components/layout/CTABand";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Arrow } from "@/components/ui/Arrow";
import { VideoEmbed } from "@/components/media/VideoEmbed";
import { delay } from "@/lib/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, href: "/historias", page: "stories" });
}

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tVideo, tCta, tAlt] = await Promise.all([
    getTranslations("stories"),
    getTranslations("video"),
    getTranslations("cta"),
    getTranslations("alt"),
  ]);

  const labels = (title: string) => ({
    play: tVideo("play", { title }),
    hint: tVideo("playHint"),
    openOnYouTube: tVideo("openOnYouTube"),
    loading: tVideo("loading"),
  });

  const [featured, ...rest] = stories;
  const dateFormat = (value: string) =>
    new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${value}-01T00:00:00Z`));

  return (
    <>
      <PageHeader
        label={t("hero.label")}
        title={t("hero.title")}
        lead={t("hero.lead")}
      />

      {/* --- Historia destacada --- */}
      {featured ? (
        <Section tone="paper" className="!pt-0" labelledBy="historia-destacada">
          <div className="container-hv">
            <div data-reveal>
              <VideoEmbed
                youtubeId={featured.youtubeId}
                title={t(`items.${featured.id}.title`)}
                poster={{ ...photos[featured.poster], alt: tAlt(featured.poster) }}
                labels={labels(t(`items.${featured.id}.title`))}
                sizes="100vw"
              />
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <SectionLabel>{t("featuredLabel")}</SectionLabel>
                <h2 id="historia-destacada" className="display-m mt-5">
                  {t(`items.${featured.id}.title`)}
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-ink-80">
                  {t(`items.${featured.id}.description`)}
                </p>
                <p className="caption-hv mt-5">
                  {tVideo("channel")}: {featured.channel}
                </p>
              </div>
            </div>
          </div>
        </Section>
      ) : null}

      {/* --- Resto del material --- */}
      <Section tone="bone" labelledBy="historias-todas">
        <div className="container-hv">
          <SectionLabel index="02">{t("hero.label")}</SectionLabel>
          <h2 id="historias-todas" className="display-l mt-7 uppercase">
            {t("allLabel")}
          </h2>

          <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {rest.map((story, i) => (
              <article key={story.id} data-reveal style={delay((i % 2) * 90)}>
                <VideoEmbed
                  youtubeId={story.youtubeId}
                  title={t(`items.${story.id}.title`)}
                  poster={{ ...photos[story.poster], alt: tAlt(story.poster) }}
                  labels={labels(t(`items.${story.id}.title`))}
                  sizes="(min-width: 768px) 46vw, 100vw"
                />
                <p className="caption-hv mt-5">
                  {story.date ? dateFormat(story.date) : tVideo("dateUnknown")}
                </p>
                <h3 className="display-s mt-2">
                  {t(`items.${story.id}.title`)}
                </h3>
                <p className="mt-3 text-ink-80">
                  {t(`items.${story.id}.description`)}
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${story.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow mt-6 inline-flex"
                >
                  {tVideo("openOnYouTube")}
                  <Arrow />
                </a>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* --- Procedencia y privacidad --- */}
      <Section tone="paper" labelledBy="historias-nota">
        <div className="container-hv grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="03">{t("noteTitle")}</SectionLabel>
            <h2 id="historias-nota" className="display-s mt-6">
              {t("noteTitle")}
            </h2>
            <p className="mt-4 text-ink-80">{t("noteBody")}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-7">
            <h2 className="display-s mt-6 lg:mt-[2.6rem]">
              {t("privacyTitle")}
            </h2>
            <p className="mt-4 text-ink-80">{t("privacyBody")}</p>
          </div>
        </div>
      </Section>

      <CTABand title={t("ctaTitle")} body={t("ctaBody")}>
        <Link href="/necesito-ayuda" className="btn btn-primary">
          {tCta("help")}
          <Arrow />
        </Link>
        <Link href="/colabora" className="btn btn-outline-inv">
          {tCta("collaborate")}
        </Link>
      </CTABand>
    </>
  );
}
