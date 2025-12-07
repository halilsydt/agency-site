import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";

/**
 * Props for the ApproachSection component.
 */
export interface ApproachSectionProps {
  /** Section headline */
  headline: string;
  /** Introductory description text */
  description: string;
  /** List of approach points */
  points: string[];
}

/**
 * Displays the agency approach with a headline, description, and key points.
 * Uses checkmark icons to emphasize each approach point.
 *
 * @param props - ApproachSection component props
 * @param props.headline - Section headline (e.g., "Our Approach")
 * @param props.description - Introductory paragraph text
 * @param props.points - Array of approach points to display
 *
 * @example
 * ```tsx
 * <ApproachSection
 *   headline="Our Approach"
 *   description="We believe in transparency."
 *   points={["Honest assessments", "Data-driven strategies"]}
 * />
 * ```
 */
export function ApproachSection({
  headline,
  description,
  points,
}: ApproachSectionProps): React.ReactElement {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <Container size="md">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <ul className="grid gap-4 md:gap-6 max-w-2xl mx-auto">
          {points.map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-4 bg-background rounded-lg p-4 shadow-sm"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
