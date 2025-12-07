import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ExperienceHighlights } from "@/components/sections/experience-highlights";

const mockHighlights = [
  { id: "years", label: "Years Experience", value: "5+", icon: "calendar" },
  { id: "clients", label: "Clients Helped", value: "100+", icon: "users" },
  { id: "revenue", label: "Revenue Generated", value: "$1M+", icon: "trending-up" },
  { id: "platforms", label: "Platforms", value: "2", icon: "store" },
];

describe("ExperienceHighlights", () => {
  it("renders all highlight values", () => {
    render(<ExperienceHighlights highlights={mockHighlights} />);
    expect(screen.getByText("5+")).toBeInTheDocument();
    expect(screen.getByText("100+")).toBeInTheDocument();
    expect(screen.getByText("$1M+")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders all highlight labels", () => {
    render(<ExperienceHighlights highlights={mockHighlights} />);
    expect(screen.getByText("Years Experience")).toBeInTheDocument();
    expect(screen.getByText("Clients Helped")).toBeInTheDocument();
    expect(screen.getByText("Revenue Generated")).toBeInTheDocument();
    expect(screen.getByText("Platforms")).toBeInTheDocument();
  });

  it("renders within a section element", () => {
    const { container } = render(
      <ExperienceHighlights highlights={mockHighlights} />
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders correct number of highlights", () => {
    const { container } = render(
      <ExperienceHighlights highlights={mockHighlights} />
    );
    const grid = container.querySelector(".grid");
    expect(grid?.children).toHaveLength(4);
  });
});
