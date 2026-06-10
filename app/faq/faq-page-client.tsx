"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import {
  FAQCategoryFilter,
  type CategoryOption,
} from "@/components/sections/faq-category-filter";
import { useLanguage } from "@/components/providers/language-provider";
import { getFAQPageContent } from "@/lib/content";
import { getTranslations } from "@/lib/translations";

/** Right-arrow icon used on the primary CTA (Atlas nudge-arrow). */
function ArrowIcon(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Client component for the FAQ page (Atlas re-skin).
 * Renders the centered `.phero.cc` hero, the `.faq-cats` pill filter + the
 * `.faq-list` accordion, and the closing centered `.cta` block. Owns the
 * category-filter state and locale-aware content.
 */
export function FAQPageClient(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<CategoryOption>("all");
  const { locale } = useLanguage();
  const { faqs } = getFAQPageContent(locale);
  const t = getTranslations(locale);
  const { heroEyebrow, heroTitle, heroSubheadline } = t.faqPage;

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <main>
      {/* Hero — centered Atlas `.phero.cc` */}
      <section className="pt-[76px] pb-[30px]">
        <div className="wrap">
          <Reveal className="text-center">
            <span className="eyebrow cc">{heroEyebrow}</span>
            <h1 className="mt-[18px] font-disp text-[clamp(40px,5.4vw,68px)] font-bold leading-[.99] tracking-[-.035em]">
              {heroTitle.pre}
              <span className="text-green">{heroTitle.mark}</span>
              {heroTitle.post}
            </h1>
            <p className="mx-auto mt-[22px] max-w-[42em] text-[19px] text-soft">
              {heroSubheadline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ — `.faq-cats` filter + `.faq-list` accordion */}
      <section className="pt-6 pb-[92px]">
        <div className="wrap">
          <FAQCategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <FAQAccordion faqs={filteredFaqs} />
        </div>
      </section>

      {/* Closing centered Atlas `.cta` block */}
      <section className="pb-[92px]">
        <div className="wrap">
          <Reveal className="mx-auto max-w-[760px] text-center">
            <h2 className="font-disp text-[clamp(38px,5vw,60px)] font-bold leading-[1] tracking-[-.03em]">
              {t.common.faqCtaHeadline}
            </h2>
            <p className="mx-auto mt-[18px] max-w-[30em] text-[19px] text-soft">
              {t.common.faqCtaDescription}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-[14px]">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-transparent bg-green px-8 py-[14px] font-disp text-base font-semibold text-white no-underline shadow-[0_10px_24px_-10px_rgba(14,140,90,.6)] transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-0.5 hover:bg-green-d hover:text-white hover:no-underline hover:shadow-[0_16px_30px_-10px_rgba(14,140,90,.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 [&_svg]:size-[17px] [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-[3px]"
              >
                {t.common.contactUs}
                <ArrowIcon />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-line bg-transparent px-8 py-[14px] font-disp text-base font-semibold text-ink no-underline transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:border-ink hover:bg-surface hover:text-ink hover:no-underline"
              >
                {t.common.viewPricing}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
