import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

/**
 * Props for the PricingPreviewCard component.
 */
export interface PricingPreviewCardProps {
  /** Platform name (Amazon or Etsy) */
  platform: "amazon" | "etsy";
  /** Package display title */
  title: string;
  /** Starting price (monthly) in dollars */
  startingPrice: number;
  /** 3-4 key feature highlights */
  features: string[];
}

/**
 * Platform-specific header styling.
 */
const platformStyles: Record<"amazon" | "etsy", string> = {
  amazon: "bg-orange-100 text-orange-800",
  etsy: "bg-orange-50 text-orange-700",
};

/**
 * Formats a price as USD currency without decimals.
 *
 * @param price - The price in dollars
 * @returns Formatted price string (e.g., "$499")
 */
function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Displays a pricing package preview in a card format.
 * Shows platform name, starting price, and feature highlights.
 * Used on the homepage pricing preview section.
 *
 * @param props - Component props
 * @param props.platform - Platform identifier (amazon or etsy)
 * @param props.title - Package display title
 * @param props.startingPrice - Starting monthly price in dollars
 * @param props.features - List of 3-4 feature highlights
 *
 * @example
 * ```tsx
 * <PricingPreviewCard
 *   platform="amazon"
 *   title="Amazon Services"
 *   startingPrice={499}
 *   features={["Account setup", "PPC management", "Monthly reports"]}
 * />
 * ```
 */
export function PricingPreviewCard({
  platform,
  title,
  startingPrice,
  features,
}: PricingPreviewCardProps): React.ReactElement {
  return (
    <Card className="h-full">
      <CardHeader className="text-center pb-4">
        {/* Platform Badge */}
        <span
          className={cn(
            "inline-block self-center px-3 py-1 text-xs font-medium rounded-full uppercase tracking-wide mb-3",
            platformStyles[platform]
          )}
        >
          {platform}
        </span>

        {/* Title */}
        <CardTitle className="text-xl font-bold text-foreground">
          {title}
        </CardTitle>

        {/* Pricing */}
        <div className="mt-4">
          <span className="text-sm text-muted-foreground">Starting at</span>
          <div className="text-3xl font-bold text-foreground">
            {formatPrice(startingPrice)}
            <span className="text-base font-normal text-muted-foreground">
              /month
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Features List */}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check
                className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
