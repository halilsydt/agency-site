import type { Metadata } from "next";
import { FAQPreviewSection } from "@/components/sections/faq-preview";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PricingPreviewSection } from "@/components/sections/pricing-preview";
import { ResultsGallery } from "@/components/sections/results-gallery";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

/**
 * SEO metadata for the Homepage.
 */
export const metadata: Metadata = {
  title: "E-commerce Consulting for Amazon & Etsy Sellers | Scalenty",
  description:
    "Honest, results-driven consulting to help Amazon and Etsy sellers grow their businesses. Transparent pricing, real expertise, practical strategies.",
  openGraph: {
    title: "E-commerce Consulting for Amazon & Etsy Sellers | Scalenty",
    description:
      "Honest, results-driven consulting to help Amazon and Etsy sellers grow their businesses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Consulting for Amazon & Etsy Sellers | Scalenty",
    description:
      "Honest, results-driven consulting to help Amazon and Etsy sellers grow their businesses.",
  },
};

/**
 * Homepage displaying hero, services overview, how it works, why choose us, results,
 * pricing preview, and FAQ preview sections.
 * Communicates the agency's honest, results-driven approach to e-commerce consulting
 * and provides navigation to platform-specific service pages.
 */
export default function Home(): React.ReactElement {
  return (
    <>
      <Hero
        headline="Grow Your Amazon & Etsy Business with Honest Expertise"
        subheadline="Results-driven consulting that focuses on real growth, not empty promises. Transparent pricing, practical strategies."
        primaryCta={{ text: "Book Free Consultation", href: "/contact" }}
        secondaryCta={{ text: "View Pricing", href: "/pricing" }}
      />
      <ServicesOverview headline="Services for Amazon & Etsy Sellers" />
      <HowItWorks headline="How It Works" />
      <WhyChooseUs headline="Why Choose Us" />
      <ResultsGallery headline="Real Results from Real Clients" />
      <PricingPreviewSection
        headline="Transparent Pricing"
        subheadline="No hidden costs. No surprises. Just honest, results-focused pricing."
      />
      <FAQPreviewSection
        headline="Common Questions"
        subheadline="Quick answers to help you decide"
      />
    </>
  );
}
