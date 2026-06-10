"use client";

import Link from "next/link";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServiceListSection } from "@/components/sections/service-list";
import { Reveal } from "@/components/ui/reveal";
import { getEtsyServices } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/** Right-arrow icon that nudges on primary-CTA hover. */
function ArrowIcon(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      className="size-[17px] transition-transform duration-200 group-hover/cta:translate-x-[3px]"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Client component for the Etsy Services page.
 * Handles locale-aware content loading for all Etsy services sections.
 */
export function EtsyServicesPageClient(): React.ReactElement {
  const { locale } = useLanguage();
  const services = getEtsyServices(locale);
  const t = getTranslations(locale);

  return (
    <main>
      <ServiceHero
        eyebrow={t.etsyPage.heroHeadline}
        title={t.etsyPage.heroTitle}
        subheadline={t.etsyPage.heroSubheadline}
        platform="etsy"
        primaryCtaText={t.common.bookFreeConsultation}
        secondaryCtaText={t.common.viewPricing}
      />

      <ServiceListSection
        eyebrow={t.etsyPage.servicesHeadline}
        headline={t.etsyPage.servicesHeadline}
        subheadline={t.etsyPage.servicesSubheadline}
        services={services}
        platform="etsy"
      />

      {/* Bottom CTA section (Atlas `.cta`) */}
      <section className="pb-[92px]">
        <div className="wrap">
          <Reveal className="mx-auto max-w-[760px] text-center">
            <h2 className="font-disp text-[clamp(38px,5vw,60px)] font-bold leading-[1.02] tracking-[-.03em]">
              {t.etsyPage.ctaHeadline}
            </h2>
            <p className="mx-auto mt-[18px] max-w-[44em] text-[18px] text-soft">
              {t.etsyPage.ctaDescription}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-[14px]">
              <Link
                href="/contact"
                className="group/cta inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-transparent bg-green px-8 py-[14px] font-disp text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(14,140,90,.6)] transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-0.5 hover:bg-green-d hover:text-white hover:no-underline hover:shadow-[0_16px_30px_-10px_rgba(14,140,90,.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
              >
                {t.common.bookFreeConsultation}
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
