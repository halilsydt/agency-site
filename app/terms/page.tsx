import type { Metadata } from "next";
import { TermsPageClient } from "./terms-page-client";

export const metadata: Metadata = {
  title: "Terms of Service | Scalenty",
  description:
    "Read our terms of service and conditions for using our consulting services.",
  openGraph: {
    title: "Terms of Service | Scalenty",
    description:
      "Read our terms of service and conditions for using our consulting services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Scalenty",
    description:
      "Read our terms of service and conditions for using our consulting services.",
  },
};

/**
 * Terms of Service page.
 * Renders client component that handles locale-aware content loading.
 */
export default function TermsPage(): React.ReactElement {
  return <TermsPageClient />;
}
