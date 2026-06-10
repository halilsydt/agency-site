"use client";

import {
  CalendarCheck,
  ClipboardList,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Icon mapping for step icons.
 * Maps icon names to Lucide React components.
 */
const iconMap: Record<string, LucideIcon> = {
  "calendar-check": CalendarCheck,
  "clipboard-list": ClipboardList,
  rocket: Rocket,
};

/**
 * Props for the StepCard component.
 */
export interface StepCardProps {
  /** Step number for display */
  stepNumber: number;
  /** Step title */
  title: string;
  /** Brief description of what happens in this step */
  description: string;
  /** Optional icon name that maps to a Lucide icon */
  icon?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Displays a single step in a process flow with number badge, title, and description.
 * Used within the HowItWorks section to visualize the consulting process.
 *
 * @param props - Component props
 * @param props.stepNumber - The step number displayed in a circular badge
 * @param props.title - Step title displayed as h3
 * @param props.description - Brief description of this step
 * @param props.icon - Optional icon name (calendar-check, clipboard-list, rocket)
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <StepCard
 *   stepNumber={1}
 *   title="Book Consultation"
 *   description="Schedule a free discovery call."
 *   icon="calendar-check"
 * />
 * ```
 */
export function StepCard({
  stepNumber,
  title,
  description,
  icon,
  className,
}: StepCardProps): React.ReactElement {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center text-center",
        className
      )}
    >
      {/* Step Number Badge */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
        {stepNumber}
      </div>

      {/* Icon */}
      {IconComponent && (
        <div className="mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-primary" aria-hidden="true" />
        </div>
      )}

      {/* Step Title */}
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>

      {/* Step Description */}
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
