import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MissionSection } from "@/components/sections/mission-section";

const defaultProps = {
  headline: "Our Mission",
  text: "We help sellers succeed through honest consulting.",
};

describe("MissionSection", () => {
  it("renders headline as h2", () => {
    render(<MissionSection {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Our Mission"
    );
  });

  it("renders mission text", () => {
    render(<MissionSection {...defaultProps} />);
    expect(
      screen.getByText(/We help sellers succeed through honest consulting/)
    ).toBeInTheDocument();
  });

  it("renders within a section element", () => {
    const { container } = render(<MissionSection {...defaultProps} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
