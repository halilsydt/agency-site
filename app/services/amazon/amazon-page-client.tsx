"use client";

import Link from "next/link";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServiceListSection } from "@/components/sections/service-list";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getAmazonServices } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Client component for the Amazon Services page.
 * Handles locale-aware content loading for all Amazon services sections.
 */
export function AmazonServicesPageClient(): React.ReactElement {
  const { locale } = useLanguage();
  const services = getAmazonServices(locale);
  const t = getTranslations(locale);

  return (
    <main>
      <ServiceHero
        headline={t.amazonPage.heroHeadline}
        subheadline={t.amazonPage.heroSubheadline}
        platform="amazon"
        primaryCtaText={t.common.bookFreeConsultation}
        secondaryCtaText={t.common.viewPricing}
        illustrationPlaceholder={t.common.illustrationPlaceholder}
      />

      <ServiceListSection
        headline={t.amazonPage.servicesHeadline}
        subheadline={t.amazonPage.servicesSubheadline}
        services={services}
      />

      {/* Bottom CTA Section */}
      <section className="py-16 bg-muted/50">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t.amazonPage.ctaHeadline}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.amazonPage.ctaDescription}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">{t.common.bookFreeConsultation}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">{t.common.viewPricing}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
