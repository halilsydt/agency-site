import { Container } from "@/components/layout/container";
import { TestimonialCard } from "@/components/cards/testimonial-card";

/**
 * A single testimonial/review from a client.
 */
export interface Testimonial {
  /** Unique identifier */
  id: string;
  /** The testimonial quote text */
  quote: string;
  /** Client name (can be anonymized, e.g., "Sarah M.") */
  clientName: string;
  /** Type of business or role (e.g., "Amazon Seller", "Etsy Shop Owner") */
  businessType: string;
  /** Platform where client operates */
  platform: "amazon" | "etsy";
}

/**
 * Props for the TestimonialsSection component.
 */
export interface TestimonialsSectionProps {
  /** Section headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
  /** Array of testimonials to display (defaults to 4 placeholder testimonials) */
  testimonials?: Testimonial[];
}

/**
 * Default testimonials showcasing placeholder client feedback.
 * NOTE: This section is not currently used in production. The default testimonials
 * contain placeholder data in English only. If this component is added to the site,
 * testimonials should be passed as props from a client component with translated content.
 */
const defaultTestimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "Working with this team transformed our Amazon business. Their honest approach and data-driven strategies helped us triple our sales in just six months.",
    clientName: "Sarah M.",
    businessType: "Amazon Seller",
    platform: "amazon",
  },
  {
    id: "testimonial-2",
    quote:
      "Finally, a consulting agency that doesn't overpromise. They helped optimize our Etsy shop and we saw a 200% increase in traffic within three months.",
    clientName: "Michael R.",
    businessType: "Etsy Shop Owner",
    platform: "etsy",
  },
  {
    id: "testimonial-3",
    quote:
      "Their expertise in Amazon PPC saved us thousands in wasted ad spend. Transparent pricing and real results - exactly what we needed.",
    clientName: "Jennifer L.",
    businessType: "Amazon Brand Owner",
    platform: "amazon",
  },
  {
    id: "testimonial-4",
    quote:
      "Professional, knowledgeable, and genuinely invested in our success. Our Etsy shop is now consistently ranking in search results.",
    clientName: "David K.",
    businessType: "Etsy Seller",
    platform: "etsy",
  },
];

/**
 * Homepage "Reviews" section displaying client testimonials.
 * Features a 2x2 grid of testimonial cards with quotes, client names,
 * business types, and platform indicators.
 * Responsive layout: 1 column mobile, 2 columns tablet and desktop.
 *
 * @param props - Component props
 * @param props.headline - Section headline displayed as h2
 * @param props.subheadline - Optional supporting text below headline
 * @param props.testimonials - Array of testimonials to display. Defaults to 4 placeholder testimonials.
 *
 * @example
 * ```tsx
 * <TestimonialsSection
 *   headline="What Our Clients Say"
 *   subheadline="Real feedback from real sellers"
 * />
 * ```
 */
export function TestimonialsSection({
  headline,
  subheadline,
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps): React.ReactElement {
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

        {/* Testimonials Grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              clientName={testimonial.clientName}
              businessType={testimonial.businessType}
              platform={testimonial.platform}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
