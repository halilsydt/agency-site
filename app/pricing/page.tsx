import type { Metadata } from "next";
import { PricingPageClient } from "./pricing-page-client";

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
 * Renders client component that handles locale-aware content loading.
 */
export default function PricingPage(): React.ReactElement {
  return <PricingPageClient />;
}
