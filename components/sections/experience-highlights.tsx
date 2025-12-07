import { Calendar, Users, TrendingUp, Store } from "lucide-react";
import { Container } from "@/components/layout/container";
import type { ExperienceHighlight } from "@/lib/types";

/**
 * Props for the ExperienceHighlights component.
 */
export interface ExperienceHighlightsProps {
  /** Array of experience highlights to display */
  highlights: ExperienceHighlight[];
}

/**
 * Icon mapping for highlight icons.
 */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  calendar: Calendar,
  users: Users,
  "trending-up": TrendingUp,
  store: Store,
};

/**
 * Displays experience metrics in a visually prominent grid.
 * Shows icons, values, and labels for each highlight.
 *
 * @param props - ExperienceHighlights component props
 * @param props.highlights - Array of experience highlights to display
 *
 * @example
 * ```tsx
 * <ExperienceHighlights
 *   highlights={[
 *     { id: "years", label: "Years Experience", value: "5+", icon: "calendar" }
 *   ]}
 * />
 * ```
 */
export function ExperienceHighlights({
  highlights,
}: ExperienceHighlightsProps): React.ReactElement {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {highlights.map((highlight) => {
            const IconComponent = iconMap[highlight.icon || "users"] || Users;
            return (
              <div key={highlight.id} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {highlight.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {highlight.label}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
