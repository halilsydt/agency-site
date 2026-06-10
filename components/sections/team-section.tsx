import { Reveal } from "@/components/ui/reveal";
import { TeamCard } from "@/components/cards/team-card";
import type { TeamMember } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Props for the TeamSection component.
 */
export interface TeamSectionProps {
  /** Centered green eyebrow above the headline (Atlas `.eyebrow.cc`). */
  eyebrow?: string;
  /** Section headline (Atlas `h2`). */
  headline: string;
  /** Array of team members to display */
  team: TeamMember[];
}

/**
 * Atlas team block (About.html:85–111). A centered `.sec-head.cc` (eyebrow +
 * h2) above a `.team-grid` of `.member` cards (gradient initials avatars),
 * collapsing to a single column at 820px. A single member is centered.
 *
 * @param props - {@link TeamSectionProps}
 * @param props.eyebrow - Centered eyebrow above the headline
 * @param props.headline - Section headline
 * @param props.team - Array of team members to display
 *
 * @example
 * ```tsx
 * <TeamSection
 *   eyebrow="Meet the founders"
 *   headline="The people behind Scalenty"
 *   team={[{ id: "1", name: "Jane", role: "CEO", bio: "..." }]}
 * />
 * ```
 */
export function TeamSection({
  eyebrow,
  headline,
  team,
}: TeamSectionProps): React.ReactElement {
  const isSingleMember = team.length === 1;

  return (
    <section className="pt-5">
      <div className="wrap">
        <Reveal className="sec-head cc text-center">
          {eyebrow ? <span className="eyebrow cc">{eyebrow}</span> : null}
          <h2 className="mt-4 font-disp text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.05] tracking-[-.025em]">
            {headline}
          </h2>
        </Reveal>
        <div
          className={cn(
            "team-grid mt-[42px] grid gap-6",
            isSingleMember
              ? "max-w-md mx-auto grid-cols-1"
              : "grid-cols-1 min-[821px]:grid-cols-2"
          )}
        >
          {team.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              delay={index > 0 ? ((index % 3) as 1 | 2 | 3) : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
