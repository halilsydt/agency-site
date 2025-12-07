import type { Metadata } from "next";

/**
 * Metadata for the FAQ page.
 * Defined in layout to support client component page.
 */
export const metadata: Metadata = {
  title: "FAQ | Scalenty",
  description:
    "Find answers to common questions about our Amazon and Etsy consulting services, pricing, and how we work with clients.",
  openGraph: {
    title: "FAQ | Scalenty",
    description:
      "Answers to frequently asked questions about marketplace consulting.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Scalenty",
    description:
      "Answers to frequently asked questions about marketplace consulting.",
  },
};

/**
 * FAQ page layout wrapper.
 * Provides metadata for SEO while allowing client component page.
 */
export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <>{children}</>;
}
