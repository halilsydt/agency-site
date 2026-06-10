"use client";

import { CtaSection } from "@/components/sections/cta-section";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Marquee } from "@/components/sections/marquee";
import { PricingPreviewSection } from "@/components/sections/pricing-preview";
import { ResultsGallery } from "@/components/sections/results-gallery";
import { ServicesOverview } from "@/components/sections/services-overview";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Client component for the Homepage.
 * Handles locale-aware content loading for all homepage sections.
 *
 * Atlas section order (Confirmed Decisions):
 * Hero → Marquee → Services → Results showcase → Process → Pricing+Bundle → CTA.
 * `WhyChooseUs` and `FAQPreviewSection` are intentionally not rendered here
 * (Atlas home has neither); both components remain in the repo for reuse.
 */
export function HomePageClient(): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  return (
    <>
      <Hero
        eyebrow={t.homePage.heroEyebrow}
        line1={t.homePage.heroLine1}
        line2={t.homePage.heroLine2}
        mark={t.homePage.heroMark}
        subheadline={t.homePage.heroSubheadline}
        primaryCta={{ text: t.common.bookFreeConsultation, href: "/contact", useDialog: true }}
        secondaryCta={{ text: t.common.viewPricing, href: "/pricing" }}
        stats={t.homePage.heroStats}
        viz={t.homeViz}
      />
      <Marquee items={t.homeMarquee.items} />
      <ServicesOverview headline={t.homePage.servicesHeadline} />
      <ResultsGallery headline={t.homePage.resultsHeadline} />
      <HowItWorks headline={t.homePage.howItWorksHeadline} />
      <PricingPreviewSection
        headline={t.homePage.pricingHeadline}
        subheadline={t.homePage.pricingSubheadline}
      />
      <CtaSection />
    </>
  );
}
