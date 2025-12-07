import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Props for the ResultCard component.
 */
export interface ResultCardProps {
  /** Path to the screenshot image */
  imageSrc: string;
  /** Alt text for the image (accessibility) */
  imageAlt: string;
  /** Brief caption describing the result */
  caption: string;
  /** Platform where result was achieved */
  platform: "amazon" | "etsy";
  /** Key metric or highlight (optional) */
  metric?: string;
}

/**
 * Platform badge styling.
 */
const platformStyles: Record<"amazon" | "etsy", string> = {
  amazon: "bg-orange-100 text-orange-800",
  etsy: "bg-orange-50 text-orange-700",
};

/**
 * Displays a client result proof in a card format with screenshot,
 * caption, and platform indicator.
 * Used in the ResultsGallery section to showcase anonymized client success stories.
 *
 * @param props - Component props
 * @param props.imageSrc - Path to the screenshot/dashboard image
 * @param props.imageAlt - Accessible alt text for the image
 * @param props.caption - Brief description of the result achieved
 * @param props.platform - Platform indicator (amazon or etsy)
 * @param props.metric - Optional highlighted metric (e.g., "3x growth")
 *
 * @example
 * ```tsx
 * <ResultCard
 *   imageSrc="/images/results/placeholder-1.svg"
 *   imageAlt="Amazon seller dashboard showing sales growth"
 *   caption="Amazon seller: 3x sales in 6 months"
 *   platform="amazon"
 *   metric="3x growth"
 * />
 * ```
 */
export function ResultCard({
  imageSrc,
  imageAlt,
  caption,
  platform,
  metric,
}: ResultCardProps): React.ReactElement {
  return (
    <Card className="overflow-hidden">
      {/* Image Container with 16:10 aspect ratio */}
      <div className="relative aspect-[16/10] bg-muted">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <CardContent className="p-4">
        {/* Platform Badge */}
        <span
          className={cn(
            "inline-block px-2 py-0.5 text-xs font-medium rounded-full capitalize mb-2",
            platformStyles[platform]
          )}
        >
          {platform}
        </span>

        {/* Caption */}
        <p className="text-muted-foreground text-sm">{caption}</p>

        {/* Optional Metric Highlight */}
        {metric && (
          <p className="mt-2 text-foreground font-semibold">{metric}</p>
        )}
      </CardContent>
    </Card>
  );
}
