import { Reveal } from "@/components/ui/reveal";
import type { TeamMember } from "@/lib/types";

/**
 * Props for the TeamCard component.
 */
export interface TeamCardProps {
  /** The team member to display */
  member: TeamMember;
  /** Stagger delay step (1–3) for the reveal animation. */
  delay?: 1 | 2 | 3;
}

/**
 * Computes a gradient-avatar's initials from the first two words of a name.
 * (e.g. "Mehmet Ali Sabaz" → "MA"; "Halil Saydut" → "HS").
 */
function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();
}

/**
 * Atlas team `.member` card (About.html:92–109). A surface card with a gradient
 * initials `.avatar` (ink→green) and a text column (name `h3`, green `.role`,
 * bio). Lifts on hover. Replaces the former photo / `User` placeholder — Atlas
 * member cards are initials-only.
 *
 * @param props - {@link TeamCardProps}
 * @param props.member - The team member data to display
 * @param props.delay - Optional stagger delay for the reveal
 *
 * @example
 * ```tsx
 * <TeamCard
 *   member={{
 *     id: "founder",
 *     name: "Jane Doe",
 *     role: "Founder & CEO",
 *     bio: "Passionate about helping sellers succeed.",
 *   }}
 * />
 * ```
 */
export function TeamCard({ member, delay }: TeamCardProps): React.ReactElement {
  return (
    <Reveal
      pop
      delay={delay}
      className="flex gap-5 rounded-[22px] border border-line bg-surface p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-sh-md"
    >
      <div className="flex size-16 flex-none items-center justify-center rounded-[17px] bg-[linear-gradient(135deg,var(--ink),var(--green))] font-disp text-[22px] font-bold text-white">
        {getInitials(member.name)}
      </div>
      <div>
        <h3 className="font-disp text-[20px] font-bold">{member.name}</h3>
        <div className="mt-[3px] font-disp text-[13.5px] font-semibold text-green-d">
          {member.role}
        </div>
        <p className="mt-3 text-[14.5px] text-soft">{member.bio}</p>
      </div>
    </Reveal>
  );
}
