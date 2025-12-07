import type { Metadata } from "next";
import Link from "next/link";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServiceListSection } from "@/components/sections/service-list";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getAmazonServices } from "@/lib/content";

/**
 * SEO metadata for the Amazon Services page.
 * Optimized for Amazon seller search queries.
 */
export const metadata: Metadata = {
  title: "Amazon Services | E-commerce Agency",
  description:
    "Expert Amazon consulting services including account setup, listing optimization, PPC advertising, store design, and account health management for Amazon sellers.",
  openGraph: {
    title: "Amazon Services | E-commerce Agency",
    description:
      "Expert Amazon consulting services for sellers. Account setup, listing optimization, PPC, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon Services | E-commerce Agency",
    description:
      "Expert Amazon consulting services for sellers. Account setup, listing optimization, PPC, and more.",
  },
};

/**
 * Amazon Services page component.
 * Displays all Amazon-specific services offered by the agency.
 *
 * @returns The Amazon services page
 */
export default function AmazonServicesPage(): React.ReactElement {
  const services = getAmazonServices();

  return (
    <main>
      <ServiceHero
        headline="Amazon Services"
        subheadline="Expert consulting and management services to help your Amazon business thrive. From account setup to advertising optimization, we've got you covered."
        platform="amazon"
      />

      <ServiceListSection
        headline="Our Amazon Services"
        subheadline="Comprehensive solutions for every aspect of your Amazon selling journey"
        services={services}
      />

      {/* Bottom CTA Section */}
      <section className="py-16 bg-muted/50">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Ready to Grow Your Amazon Business?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule a free consultation to discuss how we can help you
              achieve your Amazon selling goals.
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
