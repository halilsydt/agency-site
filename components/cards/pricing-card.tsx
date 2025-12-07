import Link from "next/link";
import { Check } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PricingPackage } from "@/lib/types";

/**
 * Props for the PricingCard component.
 */
export interface PricingCardProps {
  /** The pricing package to display */
  package: PricingPackage;
}

/**
 * Displays a pricing package in a card format with features and CTA.
 * Shows a "Most Popular" badge for recommended packages.
 *
 * @param props - Component props
 * @param props.package - The pricing package data to display
 *
 * @example
 * ```tsx
 * <PricingCard package={amazonGrowthPackage} />
 * ```
 */
export function PricingCard({ package: pkg }: PricingCardProps): React.ReactElement {
  return (
    <Card
      className={cn(
        "relative h-full flex flex-col",
        pkg.isPopular && "border-primary ring-2 ring-primary"
      )}
    >
      {pkg.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader className={cn(pkg.isPopular && "pt-8")}>
        <CardTitle className="text-xl">{pkg.name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">${pkg.price}</span>
          <span className="text-muted-foreground">{pkg.priceUnit}</span>
        </div>
        <p className="mt-2 text-muted-foreground">{pkg.description}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="w-full"
          variant={pkg.isPopular ? "default" : "outline"}
        >
          <Link href={pkg.ctaHref}>{pkg.ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
