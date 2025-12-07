import { Container } from "@/components/layout/container";
import { DifferentiatorCard } from "@/components/cards/differentiator-card";

/**
 * A single differentiator point.
 */
export interface Differentiator {
  /** Icon identifier (emoji or icon character) */
  icon: string;
  /** Differentiator title */
  title: string;
  /** Brief supporting description */
  description: string;
}

/**
 * Props for the WhyChooseUs component.
 */
export interface WhyChooseUsProps {
  /** Section headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
  /** Array of differentiators to display (defaults to 4 core values) */
  differentiators?: Differentiator[];
}

/**
 * Default differentiators highlighting agency values.
 */
const defaultDifferentiators: Differentiator[] = [
  {
    icon: "🤝",
    title: "Honest Approach",
    description:
      "No hype, no empty promises. Just real strategies that work for your business.",
  },
  {
    icon: "📈",
    title: "Real Results",
    description:
      "Track record of measurable growth for Amazon and Etsy sellers.",
  },
  {
    icon: "💰",
    title: "Transparent Pricing",
    description:
      "Clear pricing with no hidden fees or surprises. Know exactly what you pay for.",
  },
  {
    icon: "🎯",
    title: "Platform Expertise",
    description: "Deep specialization in both Amazon and Etsy ecosystems.",
  },
];

/**
 * Homepage "Why Choose Us" section displaying the agency's key differentiators.
 * Features a grid of cards highlighting honest approach, real results,
 * transparent pricing, and platform expertise.
 * Responsive layout: 1 column mobile, 2 columns tablet, 4 columns desktop.
 *
 * @param props - Component props
 * @param props.headline - Section headline displayed as h2
 * @param props.subheadline - Optional supporting text below headline
 * @param props.differentiators - Array of differentiators to display. Defaults to 4 core values.
 *
 * @example
 * ```tsx
 * <WhyChooseUs
 *   headline="Why Choose Us"
 *   subheadline="What sets us apart from the competition"
 * />
 * ```
 */
export function WhyChooseUs({
  headline,
  subheadline,
  differentiators = defaultDifferentiators,
}: WhyChooseUsProps): React.ReactElement {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
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

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {differentiators.map((differentiator) => (
            <DifferentiatorCard
              key={differentiator.title}
              icon={differentiator.icon}
              title={differentiator.title}
              description={differentiator.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
