import type { Metadata } from "next";
import Link from "next/link";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServiceListSection } from "@/components/sections/service-list";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getEtsyServices } from "@/lib/content";

/**
 * SEO metadata for the Etsy Services page.
 * Optimized for Etsy seller search queries.
 */
export const metadata: Metadata = {
  title: "Etsy Services | E-commerce Agency",
  description:
    "Expert Etsy consulting services including shop setup, SEO optimization, marketing, listing optimization, and growth strategies for Etsy sellers.",
  openGraph: {
    title: "Etsy Services | E-commerce Agency",
    description:
      "Expert Etsy consulting services for sellers. Shop setup, SEO, marketing, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etsy Services | E-commerce Agency",
    description:
      "Expert Etsy consulting services for sellers. Shop setup, SEO, marketing, and more.",
  },
};

/**
 * Etsy Services page component.
 * Displays all Etsy-specific services offered by the agency.
 *
 * @returns The Etsy services page
 */
export default function EtsyServicesPage(): React.ReactElement {
  const services = getEtsyServices();

  return (
    <main>
      <ServiceHero
        headline="Etsy Services"
        subheadline="Expert consulting and management services to help your Etsy shop thrive. From shop setup to growth strategies, we've got you covered."
        platform="etsy"
      />

      <ServiceListSection
        headline="Our Etsy Services"
        subheadline="Comprehensive solutions for every aspect of your Etsy selling journey"
        services={services}
      />

      {/* Bottom CTA Section */}
      <section className="py-16 bg-muted/50">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Ready to Grow Your Etsy Shop?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule a free consultation to discuss how we can help you
              achieve your Etsy selling goals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
