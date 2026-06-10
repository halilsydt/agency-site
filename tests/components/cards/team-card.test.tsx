import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TeamCard } from "@/components/cards/team-card";

const mockMember = {
  id: "founder",
  name: "Jane Doe",
  role: "Founder & CEO",
  bio: "Passionate about helping sellers succeed.",
  imageUrl: undefined,
};

describe("TeamCard", () => {
  it("renders team member name", () => {
    render(<TeamCard member={mockMember} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders team member role", () => {
    render(<TeamCard member={mockMember} />);
    expect(screen.getByText("Founder & CEO")).toBeInTheDocument();
  });

  it("renders team member bio", () => {
    render(<TeamCard member={mockMember} />);
    expect(
      screen.getByText(/Passionate about helping sellers succeed/)
    ).toBeInTheDocument();
  });

  it("renders a gradient initials avatar derived from the name", () => {
    render(<TeamCard member={mockMember} />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("derives initials from the first two words of a multi-word name", () => {
    const member = { ...mockMember, name: "Mehmet Ali Sabaz" };
    render(<TeamCard member={member} />);
    expect(screen.getByText("MA")).toBeInTheDocument();
  });
});
