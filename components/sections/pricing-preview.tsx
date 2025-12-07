import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PricingPreviewCard } from "@/components/cards/pricing-preview-card";
import { Button } from "@/components/ui/button";

/**
 * A pricing package preview for the homepage.
 */
export interface PricingPreview {
  /** Unique identifier */
  id: string;
  /** Platform name (Amazon or Etsy) */
  platform: "amazon" | "etsy";
  /** Package display title */
  title: string;
  /** Starting price (monthly) */
  startingPrice: number;
  /** 3-4 key feature highlights */
  features: string[];
}

/**
 * Props for the PricingPreviewSection component.
 */
export interface PricingPreviewSectionProps {
  /** Section headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
  /** Array of pricing previews to display (defaults to Amazon and Etsy) */
  pricingPreviews?: PricingPreview[];
  /** Bundle discount text */
  bundleText?: string;
}

/**
 * Default pricing previews for Amazon and Etsy services.
 */
const defaultPricingPreviews: PricingPreview[] = [
  {
    id: "amazon-preview",
    platform: "amazon",
    title: "Amazon Services",
    startingPrice: 499,
    features: [
      "Account setup & optimization",
      "Product listing optimization",
      "PPC advertising management",
      "Monthly performance reports",
    ],
  },
  {
    id: "etsy-preview",
    platform: "etsy",
    title: "Etsy Services",
    startingPrice: 399,
    features: [
      "Shop setup & configuration",
      "SEO & search optimization",
      "Listing optimization",
      "Marketing strategy",
    ],
  },
];

/**
 * Default bundle discount message.
 */
const defaultBundleText =
  "Bundle & Save: Get both Amazon + Etsy services at a discount";

/**
 * Homepage pricing preview section displaying transparent pricing teasers.
 * Features pricing cards for Amazon and Etsy, a bundle discount highlight,
 * and a CTA to the full pricing page.
 * Responsive layout: 1 column mobile, 2 columns tablet and desktop.
 *
 * @param props - Component props
 * @param props.headline - Section headline displayed as h2
 * @param props.subheadline - Optional supporting text below headline
 * @param props.pricingPreviews - Array of pricing previews. Defaults to Amazon and Etsy.
 * @param props.bundleText - Bundle discount message. Defaults to standard message.
 *
 * @example
 * ```tsx
 * <PricingPreviewSection
 *   headline="Transparent Pricing"
 *   subheadline="No hidden costs. No surprises."
 * />
 * ```
 */
export function PricingPreviewSection({
  headline,
  subheadline,
  pricingPreviews = defaultPricingPreviews,
  bundleText = defaultBundleText,
}: PricingPreviewSectionProps): React.ReactElement {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
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

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {pricingPreviews.map((preview) => (
            <PricingPreviewCard
              key={preview.id}
              platform={preview.platform}
              title={preview.title}
              startingPrice={preview.startingPrice}
              features={preview.features}
            />
          ))}
        </div>

        {/* Bundle Discount Highlight */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
            <span aria-hidden="true">🎁</span>
            {bundleText}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 text-center">
          <Button asChild size="lg">
            <Link href="/pricing">View Full Pricing</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
