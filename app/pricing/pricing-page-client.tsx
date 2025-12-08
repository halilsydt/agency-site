"use client";

import Link from "next/link";
import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingSection } from "@/components/sections/pricing-section";
import { BundleHighlight } from "@/components/sections/bundle-highlight";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { PricingPageTracker } from "@/components/analytics/pricing-page-tracker";
import {
  getAmazonPricingPackages,
  getEtsyPricingPackages,
} from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Client component for the Pricing page.
 * Handles locale-aware content loading for all pricing sections.
 */
export function PricingPageClient(): React.ReactElement {
  const { locale } = useLanguage();
  const amazonPackages = getAmazonPricingPackages(locale);
  const etsyPackages = getEtsyPricingPackages(locale);
  const t = getTranslations(locale);

  return (
    <main>
      <PricingPageTracker />
      <PricingHero
        headline={t.pricingPage.heroHeadline}
        subheadline={t.pricingPage.heroSubheadline}
      />

      <PricingSection
        headline={t.pricingPage.amazonPackagesHeadline}
        packages={amazonPackages}
        platform="amazon"
      />

      <BundleHighlight />

      <PricingSection
        headline={t.pricingPage.etsyPackagesHeadline}
        packages={etsyPackages}
        platform="etsy"
      />

      {/* Bottom CTA Section */}
      <section className="py-16 bg-muted/50">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t.pricingPage.ctaHeadline}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.pricingPage.ctaDescription}
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">{t.common.bookFreeConsultation}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
