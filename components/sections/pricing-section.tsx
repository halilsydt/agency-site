import { Reveal } from "@/components/ui/reveal";
import { PricingCard } from "@/components/cards/pricing-card";
import type { PricingPackage } from "@/lib/types";

/**
 * Props for the PricingSection component.
 */
export interface PricingSectionProps {
  /** Section headline */
  headline: string;
  /** Array of pricing packages to display */
  packages: PricingPackage[];
  /** Platform identifier for styling context */
  platform: "amazon" | "etsy";
}

/**
 * Atlas `.tiers` pricing grid (atlas.css:266–278). Renders a centered headline
 * and the active platform's `.tier` cards in a 3-column grid that collapses to a
 * single column at 860px. Each card is staggered via the Atlas `data-d` reveal
 * delays (1/2 for the 2nd/3rd cards). Keeps the `data-platform` attribute used
 * by analytics/tests.
 *
 * @param props - {@link PricingSectionProps}
 * @param props.headline - Section headline displayed as h2
 * @param props.packages - Array of pricing packages to render
 * @param props.platform - Platform identifier (amazon or etsy)
 *
 * @example
 * ```tsx
 * <PricingSection
 *   headline="Amazon Packages"
 *   packages={amazonPackages}
 *   platform="amazon"
 * />
 * ```
 */
export function PricingSection({
  headline,
  packages,
  platform,
}: PricingSectionProps): React.ReactElement {
  return (
    <section className="pt-2 pb-[68px]" data-platform={platform}>
      <div className="wrap">
        <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
          <h2 className="font-disp text-[clamp(30px,4vw,44px)] font-bold leading-[1.02] tracking-[-.03em]">
            {headline}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-[22px] min-[861px]:grid-cols-3">
          {packages.map((pkg, i) => (
            <PricingCard
              key={pkg.id}
              package={pkg}
              delay={(i || undefined) as 1 | 2 | undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
