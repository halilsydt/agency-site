import { Container } from "@/components/layout/container";
import { CalendarEmbed } from "@/components/forms/calendar-embed";

/**
 * Props for the BookingSection component.
 */
export interface BookingSectionProps {
  /** Section headline */
  headline: string;
  /** Supporting description text */
  subheadline: string;
}

/**
 * Booking section with Cal.com calendar embed.
 * Displays consultation scheduling widget with introductory text.
 *
 * @example
 * ```tsx
 * <BookingSection
 *   headline="Book Your Free Consultation"
 *   subheadline="Schedule a call to discuss your goals."
 * />
 * ```
 */
export function BookingSection({
  headline,
  subheadline,
}: BookingSectionProps): React.ReactElement {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subheadline}</p>
        </div>
        <div className="max-w-4xl mx-auto min-h-[500px]">
          <CalendarEmbed />
        </div>
      </Container>
    </section>
  );
}
