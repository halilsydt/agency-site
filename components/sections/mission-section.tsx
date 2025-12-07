import { Container } from "@/components/layout/container";

/**
 * Props for the MissionSection component.
 */
export interface MissionSectionProps {
  /** Section headline */
  headline: string;
  /** Mission statement text */
  text: string;
}

/**
 * Displays the agency mission statement.
 * Features a prominent headline and descriptive text in a visually engaging layout.
 *
 * @param props - MissionSection component props
 * @param props.headline - Section headline (e.g., "Our Mission")
 * @param props.text - Full mission statement text
 *
 * @example
 * ```tsx
 * <MissionSection
 *   headline="Our Mission"
 *   text="We help sellers succeed through honest consulting."
 * />
 * ```
 */
export function MissionSection({
  headline,
  text,
}: MissionSectionProps): React.ReactElement {
  return (
    <section className="py-16 md:py-20">
      <Container size="md">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {headline}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {text}
          </p>
        </div>
      </Container>
    </section>
  );
}
