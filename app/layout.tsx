import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agency-site.vercel.app"),
  title: {
    default: "Agency Site | E-commerce Consulting for Amazon & Etsy Sellers",
    template: "%s | Agency Site",
  },
  description:
    "Honest, results-driven consulting to help Amazon and Etsy sellers grow their businesses. Transparent pricing, real expertise.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Agency Site",
    title: "Agency Site | E-commerce Consulting for Amazon & Etsy Sellers",
    description:
      "Honest, results-driven consulting to help Amazon and Etsy sellers grow their businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
