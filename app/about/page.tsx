import type { Metadata } from "next";
import { AboutPageClient } from "./about-page-client";

/**
 * SEO metadata for the About Us page.
 */
export const metadata: Metadata = {
  title: "About Us | Scalenty",
  description:
    "Learn about our team and our honest, results-driven approach to Amazon and Etsy seller consulting. 5+ years of experience helping 100+ clients succeed.",
  openGraph: {
    title: "About Us | Scalenty",
    description:
      "Meet our team of marketplace experts dedicated to helping sellers succeed.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Scalenty",
    description:
      "Meet our team of marketplace experts dedicated to helping sellers succeed.",
  },
};

/**
 * About Us page.
 * Renders client component that handles locale-aware content loading.
 */
export default function AboutPage(): React.ReactElement {
  return <AboutPageClient />;
}
