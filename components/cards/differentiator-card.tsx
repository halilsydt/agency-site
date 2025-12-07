import { cn } from "@/lib/utils";

/**
 * Props for the DifferentiatorCard component.
 */
export interface DifferentiatorCardProps {
  /** Icon for visual enhancement (emoji or icon character) */
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
 * @param props.icon - Emoji or icon character displayed at top
 * @param props.title - Differentiator title displayed as h3
 * @param props.description - Brief description text
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <DifferentiatorCard
 *   icon="🤝"
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
  return (
    <div
      className={cn("flex flex-col items-center text-center", className)}
    >
      {/* Icon */}
      <div className="mb-4 text-4xl" aria-hidden="true">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>

      {/* Description */}
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
