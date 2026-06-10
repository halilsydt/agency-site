"use client";

import * as React from "react";
import Link from "next/link";

import { getTranslations } from "@/lib/translations";
import { useLanguage } from "@/components/providers/language-provider";
import { LogoMark } from "@/components/layout/logo-mark";

/**
 * Represents a footer navigation link.
 */
interface FooterLink {
  /** Display label for the link */
  label: string;
  /** URL path for the link (internal route or mailto:) */
  href: string;
}

/** Shared classes for footer column links (Atlas `.foot a`). */
const FOOT_LINK = "block text-[14.5px] text-white/[0.66] transition-colors hover:text-white";

/**
 * Atlas ink footer: deep green-black background, white text, a 4-column grid
 * (brand+tagline, Quick Links, Services, Contact) collapsing to 2 columns below
 * 760px, mint uppercase section headings, an on-dark logo, and a `foot-bot`
 * bottom bar with the copyright + tagline. Ports `atlas.js:61–79`.
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * <Footer />
 * ```
 */
export function Footer(): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  const quickLinks: FooterLink[] = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.pricing, href: "/pricing" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.faq, href: "/faq" },
  ];

  const serviceLinks: FooterLink[] = [
    { label: t.nav.amazonServices, href: "/services/amazon" },
    { label: t.nav.etsyServices, href: "/services/etsy" },
    { label: t.nav.bookCall, href: "/contact" },
  ];

  const headingClass =
    "mb-[18px] font-disp text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[#6FD3A4]";

  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto max-w-wrap px-9 pb-10 pt-20">
        {/* Main Footer Grid (Atlas 1.7fr 1fr 1fr 1fr → 2-col ≤760px) */}
        <div className="mb-[50px] grid grid-cols-[1.7fr_1fr_1fr_1fr] gap-9 max-[760px]:grid-cols-2 max-[760px]:gap-[30px]">
          {/* Brand + tagline */}
          <div>
            <Link
              href="/"
              aria-label="Scalenty"
              className="inline-flex items-center gap-2.5 text-white no-underline hover:text-white"
            >
              <LogoMark onDark className="h-6 w-auto" />
              <span className="font-disp text-[33px] font-bold leading-none tracking-[-0.025em] text-white">
                Scalenty
              </span>
            </Link>
            <p className="mt-4 max-w-[24em] text-[14.5px] text-white/60">{t.footer.tagline}</p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer quick links">
            <h5 className={headingClass}>{t.footer.quickLinks}</h5>
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className={FOOT_LINK}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Services */}
          <nav aria-label="Footer services">
            <h5 className={headingClass}>{t.nav.services}</h5>
            {serviceLinks.map((link) => (
              <Link key={link.href} href={link.href} className={FOOT_LINK}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <nav aria-label="Footer contact">
            <h5 className={headingClass}>{t.footer.contact}</h5>
            <Link href="/contact" className={FOOT_LINK}>
              {t.common.contactUs}
            </Link>
            <a href="mailto:admin@scalenty.net" className={FOOT_LINK}>
              admin@scalenty.net
            </a>
            <Link href="/privacy" className={FOOT_LINK}>
              {t.footer.privacyPolicy}
            </Link>
            <Link href="/terms" className={FOOT_LINK}>
              {t.footer.termsOfService}
            </Link>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap justify-between gap-2.5 border-t border-white/[0.13] pt-7 text-[13.5px] text-white/50">
          <span>{t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}</span>
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
