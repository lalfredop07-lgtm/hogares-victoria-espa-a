import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Headline } from "@/components/ui/Headline";
import { Arrow } from "@/components/ui/Arrow";
import { VideoEmbed } from "@/components/media/VideoEmbed";
import { featuredStories } from "@/content/stories";
import { photos } from "@/content/images";

export async function StoriesHome() {
  const [t, tStories, tVideo, tCta, tAlt] = await Promise.all([
    getTranslations("home.stories"),
    getTranslations("stories"),
    getTranslations("video"),
    getTranslations("cta"),
    getTranslations("alt"),
  ]);

  const [main, second] = featuredStories;

  const labels = (title: string) => ({
    play: tVideo("play", { title }),
    hint: tVideo("playHint"),
    openOnYouTube: tVideo("openOnYouTube"),
    loading: tVideo("loading"),
  });

  return (
    <Section tone="paper" labelledBy="historias-titulo">
      <div className="container-hv">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="05">{t("label")}</SectionLabel>
            <Headline
              id="historias-titulo"
              text={t("title")}
              className="display-l mt-7 uppercase"
            />
          </div>
          <p className="lead self-end text-ink-80 lg:col-span-5 lg:pb-2">
            {t("lead")}
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          {main ? (
            <article className="lg:col-span-7" data-reveal>
              <VideoEmbed
                youtubeId={main.youtubeId}
                title={tStories(`items.${main.id}.title`)}
                poster={{
                  ...photos[main.poster],
                  alt: tAlt(main.poster),
                }}
                labels={labels(tStories(`items.${main.id}.title`))}
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
              <h3 className="display-s mt-6">
                {tStories(`items.${main.id}.title`)}
              </h3>
              <p className="measure-wide mt-3 text-ink-80">
                {tStories(`items.${main.id}.description`)}
              </p>
            </article>
          ) : null}

          {second ? (
            <article className="lg:col-span-5 lg:pt-16" data-reveal>
              <VideoEmbed
                youtubeId={second.youtubeId}
                title={tStories(`items.${second.id}.title`)}
                poster={{
                  ...photos[second.poster],
                  alt: tAlt(second.poster),
                }}
                labels={labels(tStories(`items.${second.id}.title`))}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <h3 className="display-s mt-6">
                {tStories(`items.${second.id}.title`)}
              </h3>
              <p className="mt-3 text-ink-80">
                {tStories(`items.${second.id}.description`)}
              </p>
            </article>
          ) : null}
        </div>

        <div className="mt-14 border-t border-hair-strong pt-8">
          <Link href="/historias" className="link-arrow">
            {tCta("ourStories")}
            <Arrow />
          </Link>
        </div>
      </div>
    </Section>
  );
}
