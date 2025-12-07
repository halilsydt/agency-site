import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AboutHero } from "@/components/sections/about-hero";

const defaultProps = {
  headline: "About Us",
  subheadline: "We help marketplace sellers succeed.",
};

describe("AboutHero", () => {
  it("renders headline as h1", () => {
    render(<AboutHero {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "About Us"
    );
  });

  it("renders subheadline", () => {
    render(<AboutHero {...defaultProps} />);
    expect(
      screen.getByText(/We help marketplace sellers succeed/)
    ).toBeInTheDocument();
  });

  it("renders within a section element", () => {
    const { container } = render(<AboutHero {...defaultProps} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
