import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContactHero } from "@/components/sections/contact-hero";

const defaultProps = {
  headline: "Get in Touch",
  subheadline: "We'd love to hear from you.",
};

describe("ContactHero", () => {
  it("renders headline as h1", () => {
    render(<ContactHero {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Get in Touch"
    );
  });

  it("renders subheadline", () => {
    render(<ContactHero {...defaultProps} />);
    expect(
      screen.getByText(/We'd love to hear from you/)
    ).toBeInTheDocument();
  });

  it("renders within a section element", () => {
    const { container } = render(<ContactHero {...defaultProps} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
