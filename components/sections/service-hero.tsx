import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Atlas hero headline split around an emphasized `.mark` segment.
 */
export interface HeroTitle {
  /** Text before the marked phrase. */
  pre: string;
  /** The emphasized (platform-colored) phrase. */
  mark: string;
  /** Text after the marked phrase. */
  post: string;
}

/**
 * Props for the ServiceHero component.
 */
export interface ServiceHeroProps {
  /** Eyebrow label above the headline (e.g. "Amazon Services"). */
  eyebrow: string;
  /** Atlas hero `h1` sentence, with a platform-colored `.mark` segment. */
  title: HeroTitle;
  /** Supporting subheadline text. */
  subheadline: string;
  /** Platform for accent styling (amazon = green, etsy = clay). */
  platform: "amazon" | "etsy";
  /** Primary CTA button label (→ /contact). */
  primaryCtaText: string;
  /** Secondary CTA button label (→ /pricing). */
  secondaryCtaText: string;
}

/** Right-arrow icon that nudges on primary-CTA hover (Atlas `.btn-green`). */
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
 * Atlas interior hero (`phero`, atlas.css:148–156) for the platform service
 * pages. A left-aligned, text-only single column inside the `.wrap` container
 * with a soft radial-gradient glow `::before`. Renders an eyebrow (green for
 * Amazon, clay for Etsy), an `h1` whose `.mark` phrase is platform-colored, a
 * lead paragraph, and a CTA row (green `/contact` + ghost `/pricing`).
 *
 * @param props - {@link ServiceHeroProps}
 */
export function ServiceHero({
  eyebrow,
  title,
  subheadline,
  platform,
  primaryCtaText,
  secondaryCtaText,
}: ServiceHeroProps): React.ReactElement {
  const markColor = platform === "amazon" ? "text-green" : "text-clay";

  return (
    <section className="relative overflow-x-clip pt-[76px] pb-6 before:pointer-events-none before:absolute before:-top-[260px] before:left-1/2 before:h-[560px] before:w-[900px] before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(circle,rgba(14,140,90,.10),rgba(194,104,60,.05)_45%,transparent_70%)] before:content-['']">
      <div className="wrap relative z-[1]">
        <span className={cn("eyebrow", platform === "etsy" && "clay")}>
          {eyebrow}
        </span>
        <h1 className="mt-[18px] font-disp text-[clamp(40px,5.4vw,68px)] font-bold leading-[.99] tracking-[-.035em]">
          {title.pre}
          <span className={markColor}>{title.mark}</span>
          {title.post}
        </h1>
        <p className="mt-[22px] max-w-[36em] text-[19px] text-soft">
          {subheadline}
        </p>
        <div className="mt-[30px] flex flex-wrap gap-[14px]">
          <Link
            href="/contact"
            className="group/cta inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-transparent bg-green px-8 py-[14px] font-disp text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(14,140,90,.6)] transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-0.5 hover:bg-green-d hover:text-white hover:no-underline hover:shadow-[0_16px_30px_-10px_rgba(14,140,90,.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
          >
            {primaryCtaText}
            <ArrowIcon />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-line bg-transparent px-8 py-[14px] font-disp text-base font-semibold text-ink no-underline transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:border-ink hover:bg-surface hover:text-ink hover:no-underline"
          >
            {secondaryCtaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
