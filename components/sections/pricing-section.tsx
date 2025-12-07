import { Container } from "@/components/layout/container";
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
 * Displays a section of pricing cards for a specific platform.
 * Renders a headline and responsive grid of pricing cards.
 *
 * @param props - Component props
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
    <section className="py-16" data-platform={platform}>
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <PricingCard key={pkg.id} package={pkg} />
          ))}
        </div>
      </Container>
    </section>
  );
}
