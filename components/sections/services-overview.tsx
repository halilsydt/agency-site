"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Props for the ServicesOverview component.
 */
export interface ServicesOverviewProps {
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

/** Arrow icon used on the "Explore …" link. */
function ArrowIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="size-4 transition-transform duration-200 group-hover/panel:translate-x-1" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Amazon house/box tag icon. */
function AmazonIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} className="size-[17px]" aria-hidden="true">
      <path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

/** Etsy storefront tag icon. */
function EtsyIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-[17px]" aria-hidden="true">
      <path d="M6 2h12l1 6a4 4 0 0 1-8 0 4 4 0 0 1-8 0z" />
      <path d="M5 9v11h14V9" />
    </svg>
  );
}

/**
 * Homepage Atlas services section: a left-aligned section head plus two
 * hover-lift split panels (Amazon `.amz`, Etsy `.ets`). Each panel shows a
 * platform tag pill, a faint ghost number, a title, a description, a checklist,
 * and an "Explore …" link whose arrow nudges on hover.
 *
 * All copy (titles, descriptions, bullets, CTA labels) is routed through i18n.
 * Panels stack to a single column below 820px (`max-md:` ≈ Atlas breakpoint).
 *
 * @param props - {@link ServicesOverviewProps}
 */
export function ServicesOverview({
  headline,
  subheadline,
}: ServicesOverviewProps): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);
  const s = t.servicesOverview;

  return (
    <section className="py-[92px]">
      <div className="wrap">
        {/* Section head */}
        <Reveal className="mb-12 max-w-[680px]">
          <span className="eyebrow">{s.eyebrow}</span>
          <h2 className="mt-5 font-disp text-[clamp(34px,4.4vw,52px)] font-bold leading-[1.02] tracking-[-.03em]">
            {headline}
          </h2>
          <p className="mt-[18px] text-[18px] text-soft">{subheadline ?? s.supporting}</p>
        </Reveal>

        {/* Split panels */}
        <div className="grid grid-cols-1 gap-7 min-[821px]:grid-cols-2">
          {/* Amazon panel */}
          <Reveal
            pop
            as="div"
            className="group/panel relative overflow-hidden rounded-[24px] border border-line bg-surface p-10 transition-all duration-300 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-[6px] hover:border-transparent hover:shadow-sh-md"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-[9px] rounded-full bg-ink px-[15px] py-2 font-disp text-[14px] font-semibold text-white">
                <AmazonIcon />
                Amazon
              </span>
              <span className="font-disp text-[32px] font-bold leading-none tracking-[-.03em] text-ink opacity-[.16] tnum">
                01
              </span>
            </div>
            <h3 className="mb-3 mt-6 font-disp text-[30px] font-bold tracking-[-.02em]">
              {s.amazonTitle}
            </h3>
            <p className="max-w-[30em] text-[16px] text-soft">{s.amazonDescription}</p>
            <ul className="my-[22px] mb-[26px] flex flex-col gap-3">
              {s.amazonBullets.map((b) => (
                <li key={b} className="flex items-center gap-[10px] text-[14.5px] font-medium text-green">
                  <CheckIcon />
                  <span className="text-ink">{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/services/amazon"
              className="inline-flex items-center gap-2 whitespace-nowrap font-disp text-[15px] font-semibold text-green-d no-underline hover:no-underline"
            >
              {s.amazonCta}
              <ArrowIcon />
            </Link>
          </Reveal>

          {/* Etsy panel */}
          <Reveal
            pop
            delay={1}
            as="div"
            className="group/panel relative overflow-hidden rounded-[24px] border border-line bg-surface p-10 transition-all duration-300 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-[6px] hover:border-transparent hover:shadow-sh-md"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-[9px] rounded-full bg-clay-soft px-[15px] py-2 font-disp text-[14px] font-semibold text-clay">
                <EtsyIcon />
                Etsy
              </span>
              <span className="font-disp text-[32px] font-bold leading-none tracking-[-.03em] text-ink opacity-[.16] tnum">
                02
              </span>
            </div>
            <h3 className="mb-3 mt-6 font-disp text-[30px] font-bold tracking-[-.02em]">
              {s.etsyTitle}
            </h3>
            <p className="max-w-[30em] text-[16px] text-soft">{s.etsyDescription}</p>
            <ul className="my-[22px] mb-[26px] flex flex-col gap-3">
              {s.etsyBullets.map((b) => (
                <li key={b} className="flex items-center gap-[10px] text-[14.5px] font-medium text-clay">
                  <CheckIcon />
                  <span className="text-ink">{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/services/etsy"
              className="inline-flex items-center gap-2 whitespace-nowrap font-disp text-[15px] font-semibold text-clay no-underline hover:no-underline"
            >
              {s.etsyCta}
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
