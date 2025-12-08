import type { Metadata } from "next";
import { AmazonServicesPageClient } from "./amazon-page-client";

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
 * Renders client component that handles locale-aware content loading.
 */
export default function AmazonServicesPage(): React.ReactElement {
  return <AmazonServicesPageClient />;
}
