import { Container } from "@/components/layout/container";
import { ServiceCard } from "@/components/cards/service-card";
import type { Service } from "@/lib/types";

/**
 * Props for the ServiceListSection component.
 */
export interface ServiceListSectionProps {
  /** Section headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
  /** Array of services to display */
  services: Service[];
}

/**
 * Displays a grid of service cards with a section headline.
 * Used on platform service pages to list all available services.
 *
 * @param props - Component props
 * @param props.headline - Section headline displayed above the grid
 * @param props.subheadline - Optional subheadline for additional context
 * @param props.services - Array of services to display as cards
 *
 * @example
 * ```tsx
 * <ServiceListSection
 *   headline="Our Amazon Services"
 *   subheadline="Everything you need to succeed on Amazon"
 *   services={amazonServices}
 * />
 * ```
 */
export function ServiceListSection({
  headline,
  subheadline,
  services,
}: ServiceListSectionProps): React.ReactElement {
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
