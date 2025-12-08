import type { Metadata } from "next";
import { FAQPageClient } from "./faq-page-client";

/**
 * SEO metadata for the FAQ page.
 */
export const metadata: Metadata = {
  title: "FAQ | Scalenty",
  description:
    "Find answers to common questions about our Amazon and Etsy consulting services, pricing, and how we work with clients.",
  openGraph: {
    title: "FAQ | Scalenty",
    description:
      "Find answers to common questions about our marketplace consulting services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Scalenty",
    description:
      "Find answers to common questions about our marketplace consulting services.",
  },
};

/**
 * FAQ page with filterable questions.
 * Renders client component that handles locale-aware content loading.
 */
export default function FAQPage(): React.ReactElement {
  return <FAQPageClient />;
}
