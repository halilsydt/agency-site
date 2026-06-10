import { Card, CardContent } from "@/components/ui/card";
import { PlatformBadge } from "@/components/ui/platform-badge";

/**
 * Props for the TestimonialCard component.
 */
export interface TestimonialCardProps {
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
 * Displays a client testimonial in a card format with quote, attribution,
 * and platform indicator.
 * Used in the TestimonialsSection to showcase client feedback.
 *
 * @param props - Component props
 * @param props.quote - The testimonial quote text
 * @param props.clientName - Client name (can be anonymized)
 * @param props.businessType - Type of business or role
 * @param props.platform - Platform indicator (amazon or etsy)
 *
 * @example
 * ```tsx
 * <TestimonialCard
 *   quote="Working with this team transformed our Amazon business."
 *   clientName="Sarah M."
 *   businessType="Amazon Seller"
 *   platform="amazon"
 * />
 * ```
 */
export function TestimonialCard({
  quote,
  clientName,
  businessType,
  platform,
}: TestimonialCardProps): React.ReactElement {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Quote */}
        <blockquote className="flex-1 text-lg italic text-foreground mb-4">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Attribution */}
        <footer className="mt-auto">
          <cite className="not-italic block">
            <span className="font-semibold text-foreground">{clientName}</span>
            <span className="text-muted-foreground"> — {businessType}</span>
          </cite>

          {/* Platform Badge */}
          <PlatformBadge platform={platform} className="mt-2" />
        </footer>
      </CardContent>
    </Card>
  );
}
