"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Props for the PricingPreviewSection component.
 */
export interface PricingPreviewSectionProps {
  /** Section headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
}

/** Check-mark bullet icon. */
function CheckIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="size-[18px] flex-none" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/** Amazon house/box title icon. */
function AmazonIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-[22px] text-green" aria-hidden="true">
      <path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

/** Etsy storefront title icon. */
function EtsyIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-[22px] text-clay" aria-hidden="true">
      <path d="M6 2h12l1 6a4 4 0 0 1-8 0 4 4 0 0 1-8 0z" />
      <path d="M5 9v11h14V9" />
    </svg>
  );
}

/**
 * Homepage Atlas pricing preview (atlas.css:238–257). A centered section head,
 * two hover-lift `.pcard` cards (Amazon + Etsy, both $999/mo per the confirmed
 * decision), each with an icon title, a big price, a "starting at" line, a
 * feature checklist, and a full-width "View Full Pricing" button linking to
 * `/pricing`. Below the cards is the green `.bundle` highlight bar with an ink
 * "Get Bundle Quote" button to `/contact`.
 *
 * @param props - {@link PricingPreviewSectionProps}
 */
export function PricingPreviewSection({
  headline,
  subheadline,
}: PricingPreviewSectionProps): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);
  const p = t.pricingPreview;

  const cards = [
    {
      platform: "amazon" as const,
      title: p.amazonTitle,
      price: 999,
      features: [p.amazonFeature1, p.amazonFeature2, p.amazonFeature3, p.amazonFeature4],
      icon: <AmazonIcon />,
      checkClass: "text-green",
      buttonClass:
        "bg-green text-white shadow-[0_10px_24px_-10px_rgba(14,140,90,.6)] hover:-translate-y-0.5 hover:bg-green-d hover:text-white hover:shadow-[0_16px_30px_-10px_rgba(14,140,90,.65)]",
    },
    {
      platform: "etsy" as const,
      title: p.etsyTitle,
      price: 999,
      features: [p.etsyFeature1, p.etsyFeature2, p.etsyFeature3, p.etsyFeature4],
      icon: <EtsyIcon />,
      checkClass: "text-clay",
      buttonClass:
        "border-line bg-transparent text-ink hover:border-ink hover:bg-surface hover:text-ink",
    },
  ];

  return (
    <section className="bg-bg-2 py-[92px]">
      <div className="wrap">
        {/* Centered section head */}
        <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
          <span className="eyebrow cc">{p.eyebrow}</span>
          <h2 className="mt-5 font-disp text-[clamp(34px,4.4vw,52px)] font-bold leading-[1.02] tracking-[-.03em]">
            {headline}
          </h2>
          {subheadline && (
            <p className="mx-auto mt-[18px] text-[18px] text-soft">{subheadline}</p>
          )}
        </Reveal>

        {/* Pricing cards */}
        <div className="mx-auto grid max-w-[880px] grid-cols-1 gap-6 min-[821px]:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal
              key={card.platform}
              pop
              as="div"
              delay={(i || undefined) as 1 | undefined}
              className="rounded-[24px] border border-line bg-surface p-9 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-sh-md"
            >
              <h3 className="flex items-center gap-[11px] font-disp text-[21px] font-bold">
                {card.icon}
                {card.title}
              </h3>
              <div className="mt-[22px] font-disp text-[48px] font-bold leading-none tracking-[-.02em] tnum">
                ${card.price}
                <span className="font-sans text-[16px] font-medium text-soft"> {t.common.perMonth}</span>
              </div>
              <div className="mt-[14px] text-[13px] text-soft-2">{p.fromLine}</div>
              <ul className="my-6 mb-7 flex flex-col gap-3">
                {card.features.map((f) => (
                  <li key={f} className={`flex items-center gap-[10px] text-[14.5px] ${card.checkClass}`}>
                    <CheckIcon />
                    <span className="text-ink">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className={`inline-flex w-full items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-transparent px-6 py-[14px] font-disp text-[15px] font-semibold no-underline transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:no-underline ${card.buttonClass}`}
              >
                {p.viewFullPricing}
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Bundle bar */}
        <Reveal
          as="div"
          className="mx-auto mt-[22px] flex max-w-[880px] items-center justify-between gap-5 rounded-[20px] border border-[#CBE5D6] bg-green-soft px-8 py-6 max-[820px]:flex-col max-[820px]:items-start"
        >
          <div>
            <h4 className="font-disp text-[20px] font-bold text-green-d">{t.bundle.title}</h4>
            <p className="text-[14.5px] text-green-d opacity-80">{t.bundle.description}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-transparent bg-ink px-6 py-[14px] font-disp text-[15px] font-semibold text-white no-underline transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-0.5 hover:bg-ink-2 hover:text-white hover:no-underline"
          >
            {t.bundle.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
