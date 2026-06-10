"use client";

import { useState } from "react";
import Link from "next/link";
import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingSection } from "@/components/sections/pricing-section";
import { BundleHighlight } from "@/components/sections/bundle-highlight";
import { Reveal } from "@/components/ui/reveal";
import { PillToggle } from "@/components/ui/pill-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookingDialog } from "@/components/forms/booking-dialog";
import { Button } from "@/components/ui/button";
import { PricingPageTracker } from "@/components/analytics/pricing-page-tracker";
import {
  getAmazonPricingPackages,
  getEtsyPricingPackages,
} from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/** Amazon house/box glyph for the `.seg` toggle (Pricing.html:26). */
function AmazonGlyph(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="size-[18px]"
      aria-hidden="true"
    >
      <path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

/** Etsy storefront glyph for the `.seg` toggle (Pricing.html:27). */
function EtsyGlyph(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="size-[18px]"
      aria-hidden="true"
    >
      <path d="M6 2h12l1 6a4 4 0 0 1-8 0 4 4 0 0 1-8 0z" />
      <path d="M5 9v11h14V9" />
    </svg>
  );
}

/** Right-arrow icon nudged on the booking-CTA hover (Atlas `.btn-green`). */
function ArrowIcon(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      className="size-[17px]"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Client component for the Pricing page. Composes the Atlas centered hero, the
 * segmented Amazon/Etsy `.seg` toggle (Etsy default), the active platform's
 * `.tiers` cards, the green `.bundle` bar, an inline FAQ accordion, and the
 * bottom `.cta` (green booking-dialog primary + ghost FAQ secondary). All copy
 * is locale-aware; only the active platform's packages render at a time.
 */
export function PricingPageClient(): React.ReactElement {
  const { locale } = useLanguage();
  const [platform, setPlatform] = useState<"etsy" | "amazon">("etsy");
  const amazonPackages = getAmazonPricingPackages(locale);
  const etsyPackages = getEtsyPricingPackages(locale);
  const t = getTranslations(locale);

  const platformOptions = [
    { value: "etsy", label: "Etsy", icon: <EtsyGlyph /> },
    { value: "amazon", label: "Amazon", icon: <AmazonGlyph /> },
  ];

  return (
    <main>
      <PricingPageTracker />

      <PricingHero
        eyebrow={t.pricingPage.heroEyebrow}
        title={t.pricingPage.heroTitle}
        subheadline={t.pricingPage.heroSubheadline}
      />

      {/* Segmented platform toggle */}
      <Reveal className="mb-[18px] flex justify-center">
        <PillToggle
          options={platformOptions}
          value={platform}
          onChange={(val) => setPlatform(val as "etsy" | "amazon")}
        />
      </Reveal>

      {/* Active platform tiers */}
      {platform === "etsy" ? (
        <PricingSection
          headline={t.pricingPage.etsyPackagesHeadline}
          packages={etsyPackages}
          platform="etsy"
        />
      ) : (
        <PricingSection
          headline={t.pricingPage.amazonPackagesHeadline}
          packages={amazonPackages}
          platform="amazon"
        />
      )}

      <BundleHighlight />

      {/* FAQ */}
      <section className="bg-bg-2 py-[92px]">
        <div className="wrap">
          <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
            <span className="eyebrow cc">{t.pricingPage.faqEyebrow}</span>
            <h2 className="mt-5 font-disp text-[clamp(30px,4vw,44px)] font-bold leading-[1.02] tracking-[-.03em]">
              {t.pricingPage.faqHeadline}
            </h2>
          </Reveal>
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="mx-auto flex max-w-[760px] flex-col gap-[14px]"
          >
            {t.pricingPage.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-[92px]">
        <div className="wrap">
          <Reveal className="mx-auto max-w-[760px] text-center">
            <h2 className="font-disp text-[clamp(38px,5vw,60px)] font-bold leading-[1.02] tracking-[-.03em]">
              {t.pricingPage.ctaHeadline}
            </h2>
            <p className="mx-auto mt-[18px] max-w-[46em] text-[18px] text-soft">
              {t.pricingPage.ctaDescription}
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-[14px]">
              <BookingDialog
                trigger={
                  <Button>
                    {t.common.bookFreeConsultation}
                    <ArrowIcon />
                  </Button>
                }
              />
              <Button asChild variant="outline">
                <Link href="/faq">{t.common.readTheFaq}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
