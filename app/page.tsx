import type { Metadata } from "next";
import { HomePageClient } from "./home-page-client";

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
 * Renders client component that handles locale-aware content loading.
 */
export default function Home(): React.ReactElement {
  return <HomePageClient />;
}
