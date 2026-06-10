"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookingDialog } from "@/components/forms/booking-dialog";
import { useCountUp } from "@/hooks/use-count-up";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * CTA button configuration.
 */
interface CtaConfig {
  /** Button display text */
  text: string;
  /** Link destination */
  href: string;
  /** Whether to open a booking dialog instead of navigating */
  useDialog?: boolean;
}

/**
 * A single animated hero statistic.
 */
export interface HeroStatItem {
  /** Numeric target the figure counts up to. */
  value: number;
  /** Optional prefix (e.g. "$"). */
  prefix?: string;
  /** Optional suffix (e.g. "+", "M+"). */
  suffix?: string;
  /** Label shown beneath the figure. */
  label: string;
}

/**
 * Viz-card label content (figures are illustrative constants routed via i18n).
 */
export interface HeroVizContent {
  totalSalesLabel: string;
  totalSalesValue: string;
  pill: string;
  roasValue: string;
  roasLabel: string;
  convValue: string;
  convLabel: string;
  floatValue: string;
  floatLabel: string;
}

/**
 * Props for the Hero component.
 */
export interface HeroProps {
  /** Eyebrow label above the headline */
  eyebrow: string;
  /** Headline line 1 */
  line1: string;
  /** Headline line 2 */
  line2: string;
  /** Emphasized `.mark` word (headline line 3, green) */
  mark: string;
  /** Supporting subheadline (lead) text */
  subheadline: string;
  /** Primary call-to-action configuration */
  primaryCta: CtaConfig;
  /** Optional secondary call-to-action configuration */
  secondaryCta?: CtaConfig;
  /** Three animated hero stats */
  stats: [HeroStatItem, HeroStatItem, HeroStatItem];
  /** Viz-card label content */
  viz: HeroVizContent;
}

/** Right-arrow icon used on the primary CTA. */
function ArrowIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** A single hero stat with count-up animation. */
function HeroStat({ stat }: { stat: HeroStatItem }): React.ReactElement {
  const { ref, value } = useCountUp<HTMLDivElement>({
    to: stat.value,
    prefix: stat.prefix,
    suffix: stat.suffix,
  });
  return (
    <div>
      <div ref={ref} className="font-disp text-[32px] font-bold leading-none tnum">
        {value}
      </div>
      <div className="mt-[7px] text-[13px] text-soft-2">{stat.label}</div>
    </div>
  );
}

/**
 * Homepage Atlas hero: a two-column animated layout with an eyebrow, a
 * clip-revealed three-line headline (last word emphasized in green), a lead
 * paragraph, primary (BookingDialog) + ghost CTAs, three count-up stats, and a
 * presentational "viz card" with a static sparkline plus a floating chip.
 *
 * The entrance animation is driven by a `go` state set on mount (rAF +
 * 260ms fallback). Under `prefers-reduced-motion` everything shows immediately.
 *
 * @param props - {@link HeroProps}
 */
export function Hero({
  eyebrow,
  line1,
  line2,
  mark,
  subheadline,
  primaryCta,
  secondaryCta,
  stats,
  viz,
}: HeroProps): React.ReactElement {
  const reducedMotion = useReducedMotion();
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setGo(true);
      return;
    }
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setGo(true));
    });
    // Fallback so content always reveals even if rAF is throttled.
    const timer = setTimeout(() => setGo(true), 260);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timer);
    };
  }, [reducedMotion]);

  return (
    <section className={cn("hero relative pt-16", go && "hero-go")}>
      <div className="wrap grid grid-cols-1 items-center gap-16 min-[861px]:grid-cols-[1.08fr_.92fr] min-[861px]:gap-[60px]">
        {/* Left column */}
        <div>
          <span className="eyebrow hero-fade d1">{eyebrow}</span>
          <h1 className="mt-[22px] font-disp font-bold text-[clamp(46px,6.4vw,80px)] leading-[.98] tracking-[-.035em]">
            <span className="hero-ln">
              <span>{line1}</span>
            </span>
            <span className="hero-ln">
              <span>{line2}</span>
            </span>
            <span className="hero-ln">
              <span>
                <span className="relative whitespace-nowrap text-green">{mark}</span>
              </span>
            </span>
          </h1>
          <p className="hero-fade d2 mt-[26px] max-w-[30em] text-[19.5px] text-soft">
            {subheadline}
          </p>
          <div className="hero-fade d3 mt-[34px] flex flex-wrap gap-[14px] min-[561px]:flex-nowrap">
            {primaryCta.useDialog ? (
              <BookingDialog
                size="lg"
                buttonText={primaryCta.text}
                trigger={
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-transparent bg-green px-8 py-[14px] font-disp text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(14,140,90,.6)] transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-0.5 hover:bg-green-d hover:shadow-[0_16px_30px_-10px_rgba(14,140,90,.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 [&_svg]:size-[17px] [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-[3px]"
                  >
                    {primaryCta.text}
                    <ArrowIcon />
                  </button>
                }
              />
            ) : (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-transparent bg-green px-8 py-[14px] font-disp text-base font-semibold text-white no-underline shadow-[0_10px_24px_-10px_rgba(14,140,90,.6)] transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-0.5 hover:bg-green-d hover:text-white hover:no-underline hover:shadow-[0_16px_30px_-10px_rgba(14,140,90,.65)] [&_svg]:size-[17px] [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-[3px]"
              >
                {primaryCta.text}
                <ArrowIcon />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-line bg-transparent px-8 py-[14px] font-disp text-base font-semibold text-ink no-underline transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:border-ink hover:bg-surface hover:text-ink hover:no-underline"
              >
                {secondaryCta.text}
              </Link>
            )}
          </div>
          <div className="hero-fade d3 mt-[46px] flex gap-10">
            {stats.map((stat) => (
              <HeroStat key={stat.label} stat={stat} />
            ))}
          </div>
        </div>

        {/* Right column — viz card + floating chip */}
        <div className="relative">
          <div className="hero-viz-card rounded-[22px] border border-line bg-surface p-[26px] shadow-sh-lg">
            <div className="mb-1 flex items-start justify-between">
              <div>
                <div className="text-[13px] text-soft">{viz.totalSalesLabel}</div>
                <div className="mt-[6px] font-disp text-[46px] font-bold leading-none tracking-[-.02em] tnum">
                  {viz.totalSalesValue}
                </div>
              </div>
              <span className="inline-flex items-center gap-[5px] rounded-full bg-green-soft px-[11px] py-[5px] font-disp text-[13px] font-semibold text-green-d">
                {viz.pill}
              </span>
            </div>
            <svg
              viewBox="0 0 440 130"
              preserveAspectRatio="none"
              className="mt-3 h-[120px] w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0E8C5A" stopOpacity=".28" />
                  <stop offset="1" stopColor="#0E8C5A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,112 L48,104 L96,108 L144,84 L192,88 L240,60 L288,52 L336,32 L384,24 L440,8 L440,130 L0,130 Z"
                fill="url(#hg)"
              />
              <path
                d="M0,112 L48,104 L96,108 L144,84 L192,88 L240,60 L288,52 L336,32 L384,24 L440,8"
                fill="none"
                stroke="#0E8C5A"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: go || reducedMotion ? 0 : 1,
                  transition: reducedMotion ? "none" : "stroke-dashoffset 1.6s ease 1s",
                }}
              />
              <circle cx={440} cy={8} r={4.5} fill="#0E8C5A" />
            </svg>
            <div className="mt-[18px] grid grid-cols-2 gap-[11px]">
              <div className="rounded-[13px] border border-line bg-bg p-[14px]">
                <div className="font-disp text-[21px] font-bold text-green">{viz.roasValue}</div>
                <div className="mt-[3px] text-[12px] text-soft-2">{viz.roasLabel}</div>
              </div>
              <div className="rounded-[13px] border border-line bg-bg p-[14px]">
                <div className="font-disp text-[21px] font-bold">{viz.convValue}</div>
                <div className="mt-[3px] text-[12px] text-soft-2">{viz.convLabel}</div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-[22px] left-[-26px] flex items-center gap-3 rounded-[16px] bg-ink px-[18px] py-[15px] text-white shadow-sh-md min-[861px]:left-auto min-[861px]:right-0">
            <div className="flex size-10 items-center justify-center rounded-[11px] bg-white/[.12] text-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="size-[22px]" aria-hidden="true">
                <path d="M3 17l6-6 4 4 8-8M21 7h-4M21 7v4" />
              </svg>
            </div>
            <div>
              <div className="font-disp text-[19px] font-bold leading-none">{viz.floatValue}</div>
              <div className="mt-[3px] text-[11.5px] text-white/60">{viz.floatLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
