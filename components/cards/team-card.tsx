import Image from "next/image";
import { User } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import type { TeamMember } from "@/lib/types";

/**
 * Props for the TeamCard component.
 */
export interface TeamCardProps {
  /** The team member to display */
  member: TeamMember;
}

/**
 * Displays a team member in a card format with photo, name, role, and bio.
 * Shows a placeholder icon when no image is provided.
 *
 * @param props - TeamCard component props
 * @param props.member - The team member data to display
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
export function TeamCard({ member }: TeamCardProps): React.ReactElement {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center overflow-hidden relative">
          {member.imageUrl ? (
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              sizes="96px"
              className="object-cover"
              unoptimized={member.imageUrl.startsWith("http")}
            />
          ) : (
            <User
              className="w-12 h-12 text-muted-foreground"
              data-testid="team-card-placeholder"
            />
          )}
        </div>
        <CardTitle>{member.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{member.bio}</p>
      </CardContent>
    </Card>
  );
}
