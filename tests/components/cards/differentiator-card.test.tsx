import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DifferentiatorCard } from "@/components/cards/differentiator-card";

const defaultProps = {
  icon: "🤝",
  title: "Honest Approach",
  description: "No hype, no empty promises.",
};

describe("DifferentiatorCard", () => {
  it("renders the icon", () => {
    render(<DifferentiatorCard {...defaultProps} />);
    expect(screen.getByText("🤝")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<DifferentiatorCard {...defaultProps} />);
    expect(screen.getByText("Honest Approach")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<DifferentiatorCard {...defaultProps} />);
    expect(screen.getByText(/no hype, no empty promises/i)).toBeInTheDocument();
  });

  it("renders title as h3 heading", () => {
    render(<DifferentiatorCard {...defaultProps} />);
    expect(
      screen.getByRole("heading", { level: 3 })
    ).toHaveTextContent("Honest Approach");
  });
});
