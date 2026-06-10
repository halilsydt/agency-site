"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { BookingDialog } from "@/components/forms/booking-dialog";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/** Right-arrow icon used on the primary CTA. */
function ArrowIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Homepage closing Atlas CTA section (atlas.css:342–346). A centered block with
 * a large headline, a supporting paragraph, and a CTA row (green BookingDialog
 * trigger + ghost "View Pricing" link). All copy is routed through i18n.
 */
export function CtaSection(): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  return (
    <section className="py-[92px]">
      <div className="wrap">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 className="font-disp text-[clamp(38px,5vw,60px)] font-bold leading-[1.02] tracking-[-.03em]">
            {t.homePage.ctaHeadline}
          </h2>
          <p className="mx-auto mt-[18px] max-w-[44em] text-[18px] text-soft">
            {t.homePage.ctaSubheadline}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-[14px]">
            <BookingDialog
              size="lg"
              buttonText={t.common.bookFreeConsultation}
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-transparent bg-green px-8 py-[14px] font-disp text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(14,140,90,.6)] transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-0.5 hover:bg-green-d hover:shadow-[0_16px_30px_-10px_rgba(14,140,90,.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 [&_svg]:size-[17px] [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-[3px]"
                >
                  {t.common.bookFreeConsultation}
                  <ArrowIcon />
                </button>
              }
            />
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
  );
}
