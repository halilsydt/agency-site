"use client";

import { FAQPreviewSection } from "@/components/sections/faq-preview";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PricingPreviewSection } from "@/components/sections/pricing-preview";
import { ResultsGallery } from "@/components/sections/results-gallery";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Client component for the Homepage.
 * Handles locale-aware content loading for all homepage sections.
 */
export function HomePageClient(): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  return (
    <>
      <Hero
        headline={t.homePage.heroHeadline}
        subheadline={t.homePage.heroSubheadline}
        primaryCta={{ text: t.common.bookFreeConsultation, href: "/contact" }}
        secondaryCta={{ text: t.common.viewPricing, href: "/pricing" }}
      />
      <ServicesOverview headline={t.homePage.servicesHeadline} />
      <HowItWorks headline={t.homePage.howItWorksHeadline} />
      <WhyChooseUs headline={t.homePage.whyChooseUsHeadline} />
      <ResultsGallery headline={t.homePage.resultsHeadline} />
      <PricingPreviewSection
        headline={t.homePage.pricingHeadline}
        subheadline={t.homePage.pricingSubheadline}
      />
      <FAQPreviewSection
        headline={t.homePage.faqHeadline}
        subheadline={t.homePage.faqSubheadline}
      />
    </>
  );
}
