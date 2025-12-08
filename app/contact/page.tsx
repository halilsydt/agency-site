import type { Metadata } from "next";
import { ContactPageClient } from "./contact-page-client";

/**
 * SEO metadata for the Contact page.
 */
export const metadata: Metadata = {
  title: "Contact Us | Scalenty",
  description:
    "Get in touch with our team. Ask questions about Amazon or Etsy consulting services, or book a free consultation.",
  openGraph: {
    title: "Contact Us | Scalenty",
    description:
      "Have questions? Reach out to our marketplace consulting experts.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Scalenty",
    description:
      "Have questions? Reach out to our marketplace consulting experts.",
  },
};

/**
 * Contact page.
 * Renders client component that handles locale-aware content loading.
 */
export default function ContactPage(): React.ReactElement {
  return <ContactPageClient />;
}
