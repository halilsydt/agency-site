import Image from "next/image";
import { PlatformBadge } from "@/components/ui/platform-badge";

/**
 * Props for the ResultCard component.
 */
export interface ResultCardProps {
  /** Path to the screenshot image */
  imageSrc: string;
  /** Alt text for the image (accessibility) */
  imageAlt: string;
  /** Platform where result was achieved */
  platform: "amazon" | "etsy";
  /** Key metric or highlight (e.g., "2025 Results") */
  metric: string;
}

/**
 * Displays a client result proof with glass morphism design.
 * Features a full-bleed screenshot with a frosted glass overlay
 * showing platform, metric, and caption.
 * Used in the ResultsGallery section to showcase anonymized client success stories.
 *
 * @param props - Component props
 * @param props.imageSrc - Path to the screenshot/dashboard image
 * @param props.imageAlt - Accessible alt text for the image
 * @param props.caption - Brief description of the result achieved
 * @param props.platform - Platform indicator (amazon or etsy)
 * @param props.metric - Highlighted metric (e.g., "+$180k", "3x growth")
 * @param props.metricLabel - Optional label for the metric (e.g., "Revenue Growth")
 *
 * @example
 * ```tsx
 * <ResultCard
 *   imageSrc="/images/results/amazon-dashboard.png"
 *   imageAlt="Amazon seller dashboard showing sales growth"
 *   caption="From $0 to six figures in 14 months"
 *   platform="amazon"
 *   metric="+$180k"
 *   metricLabel="Revenue Growth"
 * />
 * ```
 */
export function ResultCard({
  imageSrc,
  imageAlt,
  platform,
  metric,
}: ResultCardProps): React.ReactElement {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      {/* Full-bleed Image */}
      <div className="relative aspect-[16/6] bg-muted">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Floating Chip - Platform + Metric */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full backdrop-blur-md bg-white/80 border border-white/20 pl-1 pr-4 py-1 shadow-lg transition-all duration-300 group-hover:bg-white/90">
          <PlatformBadge
            platform={platform}
            size="sm"
            className={platform === "amazon" ? "!bg-blue-500/20 !text-blue-600" : ""}
          />
          <span className="text-sm font-medium text-foreground">
            {metric}
          </span>
        </div>
      </div>
    </div>
  );
}
