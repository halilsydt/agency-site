import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PlausibleProvider } from "@/components/analytics/plausible-provider";
import { CookieConsentProvider } from "@/components/analytics/cookie-consent-provider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scalenty.net"),
  title: {
    default: "Scalenty | E-commerce Consulting for Amazon & Etsy Sellers",
    template: "%s | Scalenty",
  },
  description:
    "Honest, results-driven consulting to help Amazon and Etsy sellers grow their businesses. Transparent pricing, real expertise.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Scalenty",
    title: "Scalenty | E-commerce Consulting for Amazon & Etsy Sellers",
    description:
      "Honest, results-driven consulting to help Amazon and Etsy sellers grow their businesses.",
  },
  verification: {
    google: "r_PDR1rHDF6dUI0uh8L1ax1DyTUUXg-YVn06qEkWuoE",
  },
};

/**
 * JSON-LD structured data for Organization schema.
 * Provides search engines with information about the business.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Scalenty",
  url: "https://scalenty.net",
  description:
    "Honest, results-driven consulting to help Amazon and Etsy sellers grow their businesses. Transparent pricing, real expertise.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://scalenty.net/contact",
  },
};

/**
 * JSON-LD structured data for WebSite schema.
 * Provides search engines with information about the website structure.
 */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Scalenty",
  url: "https://scalenty.net",
  description:
    "E-commerce consulting services for Amazon and Etsy sellers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${nunito.variable} antialiased min-h-screen flex flex-col`}
      >
        <CookieConsentProvider>
          <PlausibleProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </PlausibleProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
