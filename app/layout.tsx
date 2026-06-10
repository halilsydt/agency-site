import type { Metadata } from "next";
import { Space_Grotesk, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { PlausibleProvider } from "@/components/analytics/plausible-provider";
import { CookieConsentProvider } from "@/components/analytics/cookie-consent-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Toaster } from "@/components/ui/toaster";

// Atlas display font — used for headings, buttons, eyebrows.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Atlas text font — used for body copy and UI text.
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scalenty.net"),
  title: {
    default: "Scalenty | E-commerce Consulting for Etsy & Amazon Sellers",
    template: "%s | Scalenty",
  },
  description:
    "Honest, results-driven consulting to help Etsy and Amazon sellers grow their businesses. Transparent pricing, real expertise.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Scalenty",
    title: "Scalenty | E-commerce Consulting for Etsy & Amazon Sellers",
    description:
      "Honest, results-driven consulting to help Etsy and Amazon sellers grow their businesses.",
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
    "Honest, results-driven consulting to help Etsy and Amazon sellers grow their businesses. Transparent pricing, real expertise.",
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
    "E-commerce consulting services for Etsy and Amazon sellers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('scalenty-locale');
                  var locale = stored;
                  if (!locale || (locale !== 'en' && locale !== 'tr')) {
                    var browserLang = navigator.language.toLowerCase();
                    locale = browserLang.startsWith('tr') ? 'tr' : 'en';
                  }
                  document.documentElement.lang = locale;
                } catch (e) {}
              })();
            `,
          }}
        />
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
        className={`${spaceGrotesk.variable} ${hankenGrotesk.variable} antialiased min-h-screen flex flex-col`}
      >
        <LanguageProvider>
          <CookieConsentProvider>
            <PlausibleProvider>
              <ScrollProgress />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
            </PlausibleProvider>
          </CookieConsentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
