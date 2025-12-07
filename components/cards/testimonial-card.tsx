import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
 * Platform badge styling.
 */
const platformStyles: Record<"amazon" | "etsy", string> = {
  amazon: "bg-orange-100 text-orange-800",
  etsy: "bg-orange-50 text-orange-700",
};

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
          <span
            className={cn(
              "inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full capitalize",
              platformStyles[platform]
            )}
          >
            {platform}
          </span>
        </footer>
      </CardContent>
    </Card>
  );
}
