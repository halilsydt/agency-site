"use client";

import { Container } from "@/components/layout/container";
import { DifferentiatorCard } from "@/components/cards/differentiator-card";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

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
}

/**
 * Homepage "Why Choose Us" section displaying the agency's key differentiators.
 * Features a grid of cards highlighting honest approach, real results,
 * transparent pricing, and platform expertise.
 * Responsive layout: 1 column mobile, 2 columns tablet, 4 columns desktop.
 * Supports internationalization through the language context.
 *
 * @param props - Component props
 * @param props.headline - Section headline displayed as h2
 * @param props.subheadline - Optional supporting text below headline
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
}: WhyChooseUsProps): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  const differentiators: Differentiator[] = [
    {
      icon: "🤝",
      title: t.whyChooseUs.honestTitle,
      description: t.whyChooseUs.honestDescription,
    },
    {
      icon: "📈",
      title: t.whyChooseUs.resultsTitle,
      description: t.whyChooseUs.resultsDescription,
    },
    {
      icon: "💰",
      title: t.whyChooseUs.pricingTitle,
      description: t.whyChooseUs.pricingDescription,
    },
    {
      icon: "🎯",
      title: t.whyChooseUs.expertiseTitle,
      description: t.whyChooseUs.expertiseDescription,
    },
  ];

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
