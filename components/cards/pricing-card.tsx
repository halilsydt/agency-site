"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { PricingPackage } from "@/lib/types";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Props for the PricingCard component.
 */
export interface PricingCardProps {
  /** The pricing package to display */
  package: PricingPackage;
  /** Reveal stagger step (maps to Atlas `data-d`). */
  delay?: 1 | 2 | 3;
}

/** Green check-mark bullet icon (Atlas `.tier li svg`). */
function CheckIcon(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      className="mt-px size-[18px] flex-none text-green"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/**
 * Atlas `.tier` pricing card (atlas.css:266–278). A surface card with a hover
 * lift; the popular tier (`isPopular`) gets a green border, a green-tinted glow,
 * and an overlapping green `.pop-badge` reading "Most Popular". Renders the tier
 * name, description, price (`$price` + unit), a green-checked feature list, and a
 * full-width CTA (green for the popular tier, ghost otherwise) linking to the
 * package's `ctaHref`.
 *
 * @param props - {@link PricingCardProps}
 * @param props.package - The pricing package data to display
 * @param props.delay - Reveal stagger step for the `.tier.reveal.pop` cards
 *
 * @example
 * ```tsx
 * <PricingCard package={amazonGrowthPackage} delay={1} />
 * ```
 */
export function PricingCard({
  package: pkg,
  delay,
}: PricingCardProps): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  const ctaClass = pkg.isPopular
    ? // .btn-green
      "bg-green text-white shadow-[0_10px_24px_-10px_rgba(14,140,90,.6)] hover:-translate-y-0.5 hover:bg-green-d hover:text-white hover:shadow-[0_16px_30px_-10px_rgba(14,140,90,.65)]"
    : // .btn-ghost
      "border-line bg-transparent text-ink hover:border-ink hover:bg-surface hover:text-ink";

  return (
    <Reveal
      pop
      delay={delay}
      className={cn(
        "relative flex flex-col rounded-[24px] border border-line bg-surface p-[34px] transition-all duration-300 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-[5px] hover:shadow-sh-md",
        pkg.isPopular &&
          "border-green shadow-[0_24px_50px_-28px_rgba(14,140,90,.5)]"
      )}
    >
      {pkg.isPopular && (
        <span className="absolute left-1/2 top-[-13px] -translate-x-1/2 whitespace-nowrap rounded-full bg-green px-[15px] py-[6px] font-disp text-[12px] font-semibold tracking-[.02em] text-white">
          {t.common.mostPopular}
        </span>
      )}

      <h3 className="font-disp text-[20px] font-bold">{pkg.name}</h3>
      <p className="mt-[7px] min-h-[42px] text-[14px] text-soft">
        {pkg.description}
      </p>
      <div className="mb-[4px] mt-[18px] font-disp text-[42px] font-bold leading-none tracking-[-.02em] tnum">
        ${pkg.price}
        <span className="font-sans text-[15px] font-medium text-soft">
          {pkg.priceUnit}
        </span>
      </div>

      <ul className="my-[22px] mb-[28px] flex flex-1 list-none flex-col gap-3">
        {pkg.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-[10px] text-[14.5px]"
          >
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={pkg.ctaHref}
        className={cn(
          "mt-auto inline-flex w-full items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-transparent px-6 py-[14px] font-disp text-[15px] font-semibold no-underline transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:no-underline",
          ctaClass
        )}
      >
        {pkg.ctaText}
      </Link>
    </Reveal>
  );
}
