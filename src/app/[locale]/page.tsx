import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

import { HeroHome } from "@/components/sections/HeroHome";
import { Manifesto } from "@/components/sections/Manifesto";
import { IntroAbout } from "@/components/sections/IntroAbout";
import { ProgramsHome } from "@/components/sections/ProgramsHome";
import { ImpactHome } from "@/components/sections/ImpactHome";
import { StoriesHome } from "@/components/sections/StoriesHome";
import { HistoryHome } from "@/components/sections/HistoryHome";
import { DonateHome } from "@/components/sections/DonateHome";
import { ClosingHome } from "@/components/sections/ClosingHome";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    href: "/",
    page: "home",
    standaloneTitle: true,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroHome />
      <Manifesto />
      <IntroAbout />
      <ProgramsHome />
      <ImpactHome />
      <StoriesHome />
      <HistoryHome />
      <DonateHome />
      <ClosingHome />
    </>
  );
}
