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

  it("renders placeholder when no image provided", () => {
    render(<TeamCard member={mockMember} />);
    expect(screen.getByTestId("team-card-placeholder")).toBeInTheDocument();
  });

  it("renders image when imageUrl provided", () => {
    const memberWithImage = { ...mockMember, imageUrl: "/images/team/jane.jpg" };
    render(<TeamCard member={memberWithImage} />);
    expect(screen.getByRole("img", { name: "Jane Doe" })).toBeInTheDocument();
  });

  it("sets correct src when imageUrl provided", () => {
    const memberWithImage = { ...mockMember, imageUrl: "/images/team/jane.jpg" };
    render(<TeamCard member={memberWithImage} />);
    const img = screen.getByRole("img", { name: "Jane Doe" });
    expect(img.getAttribute("src")).toContain("jane.jpg");
  });
});
