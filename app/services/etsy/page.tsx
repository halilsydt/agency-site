import type { Metadata } from "next";
import { EtsyServicesPageClient } from "./etsy-page-client";

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
 * Renders client component that handles locale-aware content loading.
 */
export default function EtsyServicesPage(): React.ReactElement {
  return <EtsyServicesPageClient />;
}
