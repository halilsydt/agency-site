import {
  Handshake,
  TrendingUp,
  DollarSign,
  Target,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Icon mapping for differentiator icons.
 * Maps icon names to Lucide React components.
 */
const iconMap: Record<string, LucideIcon> = {
  handshake: Handshake,
  "trending-up": TrendingUp,
  "dollar-sign": DollarSign,
  target: Target,
};

/**
 * Props for the DifferentiatorCard component.
 */
export interface DifferentiatorCardProps {
  /** Icon name that maps to a Lucide icon */
  icon: string;
  /** Differentiator title */
  title: string;
  /** Brief description of this differentiator */
  description: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Displays a single differentiator point with icon, title, and description.
 * Used within the WhyChooseUs section to highlight agency values.
 *
 * @param props - Component props
 * @param props.icon - Icon name (handshake, trending-up, dollar-sign, target)
 * @param props.title - Differentiator title displayed as h3
 * @param props.description - Brief description text
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <DifferentiatorCard
 *   icon="handshake"
 *   title="Honest Approach"
 *   description="No hype, no empty promises."
 * />
 * ```
 */
export function DifferentiatorCard({
  icon,
  title,
  description,
  className,
}: DifferentiatorCardProps): React.ReactElement {
  const IconComponent = iconMap[icon] || Target;

  return (
    <div
      className={cn("flex flex-col items-center text-center", className)}
    >
      {/* Icon */}
      <div className="mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <IconComponent className="w-8 h-8 text-primary" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>

      {/* Description */}
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
