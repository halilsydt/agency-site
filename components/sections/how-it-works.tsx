import { Container } from "@/components/layout/container";
import { StepCard } from "@/components/cards/step-card";

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
  /** Array of steps to display. Uses default steps if not provided. */
  steps?: Step[];
}

/**
 * Default steps for the consulting process.
 */
const defaultSteps: Step[] = [
  {
    stepNumber: 1,
    title: "Book Consultation",
    description:
      "Schedule a free discovery call to discuss your marketplace goals and challenges.",
    icon: "📅",
  },
  {
    stepNumber: 2,
    title: "Get Custom Strategy",
    description:
      "Receive a tailored action plan designed specifically for your Amazon or Etsy business.",
    icon: "📋",
  },
  {
    stepNumber: 3,
    title: "Implement & Grow",
    description:
      "Execute the strategy with our guidance and watch your business thrive.",
    icon: "🚀",
  },
];

/**
 * Homepage "How It Works" section displaying the consulting process as a step-by-step flow.
 * Features numbered steps with icons, titles, and descriptions connected by visual flow lines.
 * Responsive layout: horizontal on desktop, vertical stack on mobile.
 *
 * @param props - Component props
 * @param props.headline - Section headline displayed as h2
 * @param props.subheadline - Optional supporting text below headline
 * @param props.steps - Array of steps to display. Defaults to standard 3-step process.
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
  steps = defaultSteps,
}: HowItWorksProps): React.ReactElement {
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
