import { Container } from "@/components/layout/container";
import { PlatformCard } from "@/components/cards/platform-card";

/**
 * Props for the ServicesOverview component.
 */
export interface ServicesOverviewProps {
  /** Section headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
}

/**
 * Platform card configuration data.
 */
const platformCards = [
  {
    platform: "amazon" as const,
    title: "Amazon Services",
    description:
      "Expert guidance for Amazon sellers—from account setup to advertising and store optimization.",
    href: "/services/amazon",
    ctaText: "Explore Amazon Services",
  },
  {
    platform: "etsy" as const,
    title: "Etsy Services",
    description:
      "Specialized support for Etsy shops—SEO, marketing, listings, and growth strategies.",
    href: "/services/etsy",
    ctaText: "Explore Etsy Services",
  },
];

/**
 * Homepage services overview section displaying platform cards for Amazon and Etsy.
 * Features a headline and two prominent cards linking to platform-specific service pages.
 * Uses responsive grid layout: stacks on mobile, side-by-side on tablet/desktop.
 *
 * @param props - Component props
 * @param props.headline - Section headline displayed as h2
 * @param props.subheadline - Optional supporting text below headline
 *
 * @example
 * ```tsx
 * <ServicesOverview
 *   headline="Services for Amazon & Etsy Sellers"
 *   subheadline="Choose your marketplace to explore our specialized services."
 * />
 * ```
 */
export function ServicesOverview({
  headline,
  subheadline,
}: ServicesOverviewProps): React.ReactElement {
  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {headline}
          </h2>
          {subheadline && (
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {subheadline}
            </p>
          )}
        </div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {platformCards.map((card) => (
            <PlatformCard key={card.platform} {...card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
