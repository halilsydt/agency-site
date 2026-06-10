import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ApproachSection } from "@/components/sections/approach-section";

const defaultProps = {
  eyebrow: "Our Approach",
  headline: "A different kind of consulting.",
  description: "We believe in transparency.",
  points: ["Honest assessments", "Data-driven strategies", "Real results"],
  photoLabel: "Team / workspace photo",
};

describe("ApproachSection", () => {
  it("renders headline as h2", () => {
    render(<ApproachSection {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "A different kind of consulting."
    );
  });

  it("renders the clay eyebrow", () => {
    const { container } = render(<ApproachSection {...defaultProps} />);
    const eyebrow = screen.getByText("Our Approach");
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow.className).toContain("clay");
    expect(container).toBeTruthy();
  });

  it("renders the photo placeholder label", () => {
    render(<ApproachSection {...defaultProps} />);
    expect(screen.getByText("Team / workspace photo")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ApproachSection {...defaultProps} />);
    expect(screen.getByText(/We believe in transparency/)).toBeInTheDocument();
  });

  it("renders all approach points", () => {
    render(<ApproachSection {...defaultProps} />);
    expect(screen.getByText("Honest assessments")).toBeInTheDocument();
    expect(screen.getByText("Data-driven strategies")).toBeInTheDocument();
    expect(screen.getByText("Real results")).toBeInTheDocument();
  });

  it("renders correct number of list items", () => {
    render(<ApproachSection {...defaultProps} />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });
});
