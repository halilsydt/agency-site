import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

/**
 * Props for the ServiceHero component.
 */
export interface ServiceHeroProps {
  /** Main headline text */
  headline: string;
  /** Supporting subheadline text */
  subheadline: string;
  /** Platform for styling (amazon or etsy) */
  platform: "amazon" | "etsy";
  /** Optional illustration image URL */
  imageUrl?: string;
  /** Optional alt text for illustration */
  imageAlt?: string;
  /** Optional primary CTA button text */
  primaryCtaText?: string;
  /** Optional secondary CTA button text */
  secondaryCtaText?: string;
  /** Optional illustration placeholder text */
  illustrationPlaceholder?: string;
}

/**
 * Platform-specific accent styling.
 */
const platformAccentStyles: Record<"amazon" | "etsy", string> = {
  amazon: "from-primary/10 to-transparent",
  etsy: "from-accent/10 to-transparent",
};

/**
 * Service page hero section with platform-specific styling.
 * Displays headline, subheadline, CTAs to contact and pricing.
 *
 * @param props - ServiceHero component props
 * @param props.headline - Main headline text displayed as h1
 * @param props.subheadline - Supporting text below the headline
 * @param props.platform - Platform identifier for accent styling
 * @param props.imageUrl - Optional illustration image URL
 * @param props.imageAlt - Alt text for illustration image
 *
 * @example
 * ```tsx
 * <ServiceHero
 *   headline="Amazon Services"
 *   subheadline="Expert consulting for Amazon sellers"
 *   platform="amazon"
 * />
 * ```
 */
export function ServiceHero({
  headline,
  subheadline,
  platform,
  imageUrl,
  imageAlt = "Service illustration",
  primaryCtaText = "Book Free Consultation",
  secondaryCtaText = "View Pricing",
  illustrationPlaceholder = "Illustration Placeholder",
}: ServiceHeroProps): React.ReactElement {
  return (
    <section
      className={cn(
        "py-16 md:py-24 bg-gradient-to-b",
        platformAccentStyles[platform]
      )}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              {headline}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              {subheadline}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link href="/contact">{primaryCtaText}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">{secondaryCtaText}</Link>
              </Button>
            </div>
          </div>

          {/* Illustration */}
          <div
            data-testid="service-hero-illustration"
            className="flex items-center justify-center"
          >
            {imageUrl ? (
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3]">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 512px"
                  className="object-contain rounded-xl"
                  priority
                  unoptimized={imageUrl.startsWith("http")}
                />
              </div>
            ) : (
              <div className="w-full max-w-md lg:max-w-lg aspect-[4/3] bg-muted rounded-xl flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  {illustrationPlaceholder}
                </span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
