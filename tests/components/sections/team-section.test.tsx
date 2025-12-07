import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TeamSection } from "@/components/sections/team-section";

const mockTeam = [
  {
    id: "founder",
    name: "Jane Doe",
    role: "Founder & CEO",
    bio: "Passionate about helping sellers succeed.",
  },
  {
    id: "consultant",
    name: "John Smith",
    role: "Senior Consultant",
    bio: "Expert in marketplace optimization.",
  },
];

describe("TeamSection", () => {
  it("renders section headline as h2", () => {
    render(<TeamSection headline="Meet Our Team" team={mockTeam} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Meet Our Team"
    );
  });

  it("renders all team members", () => {
    render(<TeamSection headline="Meet Our Team" team={mockTeam} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
  });

  it("renders team member roles", () => {
    render(<TeamSection headline="Meet Our Team" team={mockTeam} />);
    expect(screen.getByText("Founder & CEO")).toBeInTheDocument();
    expect(screen.getByText("Senior Consultant")).toBeInTheDocument();
  });

  it("renders single member centered", () => {
    const singleMember = [mockTeam[0]];
    const { container } = render(
      <TeamSection headline="Meet the Founder" team={singleMember} />
    );
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("max-w-md");
    expect(grid?.className).toContain("mx-auto");
  });

  it("renders multiple members in grid", () => {
    const { container } = render(
      <TeamSection headline="Meet Our Team" team={mockTeam} />
    );
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("md:grid-cols-2");
  });
});
