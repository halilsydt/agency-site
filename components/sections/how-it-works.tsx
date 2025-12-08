"use client";

import { Container } from "@/components/layout/container";
import { StepCard } from "@/components/cards/step-card";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * A single step in the "How It Works" process.
 */
export interface Step {
  /** Step number (1, 2, 3, etc.) */
  stepNumber: number;
  /** Step title */
  title: string;
  /** Brief description of this step */
  description: string;
  /** Optional icon identifier */
  icon?: string;
}

/**
 * Props for the HowItWorks component.
 */
export interface HowItWorksProps {
  /** Section headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
}

/**
 * Homepage "How It Works" section displaying the consulting process as a step-by-step flow.
 * Features numbered steps with icons, titles, and descriptions connected by visual flow lines.
 * Responsive layout: horizontal on desktop, vertical stack on mobile.
 * Supports internationalization through the language context.
 *
 * @param props - Component props
 * @param props.headline - Section headline displayed as h2
 * @param props.subheadline - Optional supporting text below headline
 *
 * @example
 * ```tsx
 * <HowItWorks
 *   headline="How It Works"
 *   subheadline="Our simple process to help you succeed"
 * />
 * ```
 */
export function HowItWorks({
  headline,
  subheadline,
}: HowItWorksProps): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  const steps: Step[] = [
    {
      stepNumber: 1,
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Description,
      icon: "📅",
    },
    {
      stepNumber: 2,
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Description,
      icon: "📋",
    },
    {
      stepNumber: 3,
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Description,
      icon: "🚀",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
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

        {/* Steps Grid with Visual Connectors */}
        <div className="relative">
          {/* Horizontal connector line - desktop only */}
          <div
            className="hidden md:block absolute top-6 left-1/2 -translate-x-1/2 h-0.5 bg-border"
            style={{ width: "60%" }}
            aria-hidden="true"
          />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.stepNumber} className="relative">
                {/* Vertical connector line - mobile only (between steps) */}
                {index < steps.length - 1 && (
                  <div
                    className="md:hidden absolute left-1/2 -translate-x-1/2 top-full h-8 w-0.5 bg-border"
                    aria-hidden="true"
                  />
                )}
                <StepCard
                  stepNumber={step.stepNumber}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
