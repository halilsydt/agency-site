import { Container } from "@/components/layout/container";

/**
 * Props for the PricingHero component.
 */
export interface PricingHeroProps {
  /** Main headline text */
  headline: string;
  /** Supporting subheadline text */
  subheadline: string;
}

/**
 * Hero section for the pricing page.
 * Displays headline and subheadline with emphasis on transparent pricing.
 *
 * @param props - Component props
 * @param props.headline - Main headline displayed as h1
 * @param props.subheadline - Supporting text below the headline
 *
 * @example
 * ```tsx
 * <PricingHero
 *   headline="Simple, Transparent Pricing"
 *   subheadline="No hidden fees. Choose the plan that's right for your business."
 * />
 * ```
 */
export function PricingHero({
  headline,
  subheadline,
}: PricingHeroProps): React.ReactElement {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-transparent">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {headline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            {subheadline}
          </p>
        </div>
      </Container>
    </section>
  );
}
