import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Platform badge variant styles using class-variance-authority.
 * Atlas .panel .tag treatment (atlas.css:163–165): Amazon → ink, Etsy → clay.
 */
const platformBadgeVariants = cva(
  "inline-flex items-center rounded-full px-[15px] py-[8px] font-disp text-sm font-semibold capitalize transition-colors",
  {
    variants: {
      platform: {
        amazon: "bg-ink text-white",
        etsy: "bg-clay-soft text-clay",
      },
      size: {
        sm: "px-[11px] py-[5px] text-[13px]",
        default: "px-[15px] py-[8px] text-sm",
        lg: "px-[18px] py-[9px] text-[15px]",
      },
    },
    defaultVariants: {
      platform: "amazon",
      size: "default",
    },
  }
);

/**
 * Props for the PlatformBadge component.
 */
export interface PlatformBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof platformBadgeVariants> {
  /** The platform to display */
  platform: "amazon" | "etsy";
}

/**
 * Displays a platform indicator badge with consistent styling and dark mode support.
 * Used across testimonial cards, result cards, and other platform-specific UI elements.
 *
 * @param props - Component props
 * @param props.platform - Platform identifier (amazon or etsy)
 * @param props.size - Badge size variant (sm, default, lg)
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <PlatformBadge platform="amazon" />
 * <PlatformBadge platform="etsy" size="lg" />
 * ```
 */
export function PlatformBadge({
  platform,
  size,
  className,
  ...props
}: PlatformBadgeProps) {
  return (
    <span
      className={cn(platformBadgeVariants({ platform, size, className }))}
      {...props}
    >
      {platform}
    </span>
  );
}
