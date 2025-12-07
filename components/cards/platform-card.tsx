import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Props for the PlatformCard component.
 */
export interface PlatformCardProps {
  /** Platform identifier for styling */
  platform: "amazon" | "etsy";
  /** Card title */
  title: string;
  /** Brief description of platform services */
  description: string;
  /** Link to platform services page */
  href: string;
  /** CTA button text */
  ctaText: string;
}

/**
 * Platform-specific styling based on platform type.
 */
const platformStyles: Record<"amazon" | "etsy", string> = {
  amazon: "border-primary/20 hover:border-primary/40 bg-primary/5",
  etsy: "border-accent/20 hover:border-accent/40 bg-accent/5",
};

/**
 * Displays a platform service card with icon, title, description, and CTA.
 * Used on the homepage services overview section to link to platform-specific
 * service pages (Amazon and Etsy).
 *
 * @param props - Component props
 * @param props.platform - Platform identifier for visual styling (amazon or etsy)
 * @param props.title - Card title displayed prominently
 * @param props.description - Brief description of services offered
 * @param props.href - Destination URL for the CTA button
 * @param props.ctaText - Text displayed on the CTA button
 *
 * @example
 * ```tsx
 * <PlatformCard
 *   platform="amazon"
 *   title="Amazon Services"
 *   description="Expert guidance for Amazon sellers."
 *   href="/services/amazon"
 *   ctaText="Explore Amazon Services"
 * />
 * ```
 */
export function PlatformCard({
  platform,
  title,
  description,
  href,
  ctaText,
}: PlatformCardProps): React.ReactElement {
  return (
    <Card
      className={cn(
        "h-full flex flex-col transition-colors",
        platformStyles[platform]
      )}
    >
      <CardHeader className="text-center">
        {/* Platform Icon Placeholder */}
        <div
          data-testid="platform-icon"
          className="mx-auto mb-4 w-16 h-16 rounded-full bg-muted flex items-center justify-center"
        >
          <span className="text-2xl text-muted-foreground">
            {platform === "amazon" ? "📦" : "🛍️"}
          </span>
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="text-center text-base">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-center">
        <Button asChild size="lg">
          <Link href={href}>{ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
