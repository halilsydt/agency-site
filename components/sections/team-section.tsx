import { Container } from "@/components/layout/container";
import { TeamCard } from "@/components/cards/team-card";
import type { TeamMember } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Props for the TeamSection component.
 */
export interface TeamSectionProps {
  /** Section headline */
  headline: string;
  /** Array of team members to display */
  team: TeamMember[];
}

/**
 * Displays team members in a responsive grid layout.
 * Handles single founder scenario with centered layout.
 *
 * @param props - TeamSection component props
 * @param props.headline - Section headline (e.g., "Meet Our Team")
 * @param props.team - Array of team members to display
 *
 * @example
 * ```tsx
 * <TeamSection
 *   headline="Meet Our Team"
 *   team={[{ id: "1", name: "Jane", role: "CEO", bio: "..." }]}
 * />
 * ```
 */
export function TeamSection({
  headline,
  team,
}: TeamSectionProps): React.ReactElement {
  const isSingleMember = team.length === 1;

  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {headline}
          </h2>
        </div>
        <div
          className={cn(
            "grid gap-6 lg:gap-8",
            isSingleMember
              ? "max-w-md mx-auto"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
