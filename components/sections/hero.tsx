import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

/**
 * CTA button configuration.
 */
interface CtaConfig {
  /** Button display text */
  text: string;
  /** Link destination */
  href: string;
}

/**
 * Props for the Hero component.
 */
export interface HeroProps {
  /** Main headline text */
  headline: string;
  /** Supporting subheadline text */
  subheadline: string;
  /** Primary call-to-action configuration */
  primaryCta: CtaConfig;
  /** Optional secondary call-to-action configuration */
  secondaryCta?: CtaConfig;
  /** Optional illustration image URL */
  imageUrl?: string;
  /** Optional alt text for illustration */
  imageAlt?: string;
  /** Optional illustration placeholder text */
  illustrationPlaceholder?: string;
}

/**
 * Homepage hero section with headline, subheadline, CTAs, and illustration.
 * Displays a two-column layout on desktop with text on the left and
 * illustration on the right. Stacks vertically on mobile.
 *
 * @param props - Hero component props
 * @param props.headline - Main headline text displayed as h1
 * @param props.subheadline - Supporting text below the headline
 * @param props.primaryCta - Primary CTA button configuration
 * @param props.secondaryCta - Optional secondary CTA button configuration
 * @param props.imageUrl - Optional illustration image URL (placeholder shown if not provided)
 * @param props.imageAlt - Alt text for illustration image
 *
 * @example
 * ```tsx
 * <Hero
 *   headline="Grow Your Business"
 *   subheadline="Expert consulting for e-commerce sellers"
 *   primaryCta={{ text: "Book Consultation", href: "/contact" }}
 *   secondaryCta={{ text: "View Pricing", href: "/pricing" }}
 * />
 * ```
 */
export function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  imageUrl,
  imageAlt = "Hero illustration",
  illustrationPlaceholder = "Illustration Placeholder",
}: HeroProps): React.ReactElement {
  return (
    <section className="py-16 md:py-24 lg:py-32">
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
                <Link href={primaryCta.href}>{primaryCta.text}</Link>
              </Button>
              {secondaryCta && (
                <Button asChild variant="outline" size="lg">
                  <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Illustration */}
          <div
            data-testid="hero-illustration"
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
