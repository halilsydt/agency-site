import type { Metadata } from "next";
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

/**
 * SEO metadata for the Pricing page.
 * Emphasizes transparent pricing with no hidden costs.
 */
export const metadata: Metadata = {
  title: "Pricing | E-commerce Agency",
  description:
    "Transparent pricing for Amazon and Etsy seller consulting. No hidden costs. Choose from Starter, Growth, or Premium packages tailored to your business needs.",
  openGraph: {
    title: "Pricing | E-commerce Agency",
    description:
      "Transparent pricing for marketplace seller consulting. Choose the package that fits your needs.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | E-commerce Agency",
    description:
      "Transparent pricing for marketplace seller consulting. Choose the package that fits your needs.",
  },
};

/**
 * Pricing page component.
 * Displays all pricing packages for Amazon and Etsy services
 * with transparent pricing and bundle discounts.
 *
 * @returns The Pricing page
 */
export default function PricingPage(): React.ReactElement {
  const amazonPackages = getAmazonPricingPackages();
  const etsyPackages = getEtsyPricingPackages();

  return (
    <main>
      <PricingPageTracker />
      <PricingHero
        headline="Simple, Transparent Pricing"
        subheadline="No hidden fees. No surprise charges. Choose the package that fits your business needs and budget."
      />

      <PricingSection
        headline="Amazon Packages"
        packages={amazonPackages}
        platform="amazon"
      />

      <BundleHighlight />

      <PricingSection
        headline="Etsy Packages"
        packages={etsyPackages}
        platform="etsy"
      />

      {/* Bottom CTA Section */}
      <section className="py-16 bg-muted/50">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Not Sure Which Package Is Right For You?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule a free consultation and we&apos;ll help you find the
              perfect fit for your business goals.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
