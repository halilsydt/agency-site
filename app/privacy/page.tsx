import type { Metadata } from "next";
import { PrivacyPageClient } from "./privacy-page-client";

export const metadata: Metadata = {
  title: "Privacy Policy | Scalenty",
  description:
    "Learn how Scalenty collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | Scalenty",
    description:
      "Learn how Scalenty collects, uses, and protects your personal information.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Scalenty",
    description:
      "Learn how Scalenty collects, uses, and protects your personal information.",
  },
};

/**
 * Privacy Policy page.
 * Renders client component that handles locale-aware content loading.
 */
export default function PrivacyPage(): React.ReactElement {
  return <PrivacyPageClient />;
}
