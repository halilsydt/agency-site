"use client";

import { useState } from "react";
import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingSection } from "@/components/sections/pricing-section";
import { BundleHighlight } from "@/components/sections/bundle-highlight";
import { Container } from "@/components/layout/container";
import { PillToggle } from "@/components/ui/pill-toggle";
import { BookingDialog } from "@/components/forms/booking-dialog";
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
  const [platform, setPlatform] = useState<"etsy" | "amazon">("etsy");
  const amazonPackages = getAmazonPricingPackages(locale);
  const etsyPackages = getEtsyPricingPackages(locale);
  const t = getTranslations(locale);

  const platformOptions = [
    { value: "etsy", label: "Etsy" },
    { value: "amazon", label: "Amazon" },
  ];

  return (
    <main>
      <PricingPageTracker />
      <PricingHero
        headline={t.pricingPage.heroHeadline}
        subheadline={t.pricingPage.heroSubheadline}
      />

      <Container>
        <div className="flex justify-center py-8 md:py-10">
          <PillToggle
            options={platformOptions}
            value={platform}
            onChange={(val) => setPlatform(val as "etsy" | "amazon")}
          />
        </div>

        <div className="transition-opacity duration-300">
          {platform === "etsy" ? (
            <PricingSection
              headline={t.pricingPage.etsyPackagesHeadline}
              packages={etsyPackages}
              platform="etsy"
            />
          ) : (
            <PricingSection
              headline={t.pricingPage.amazonPackagesHeadline}
              packages={amazonPackages}
              platform="amazon"
            />
          )}
        </div>
      </Container>

      <BundleHighlight />

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
              <BookingDialog size="lg" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
