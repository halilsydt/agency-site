import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContactHero } from "@/components/sections/contact-hero";

const defaultProps = {
  eyebrow: "Contact",
  title: {
    pre: "Let's talk about your ",
    mark: "growth",
    post: ".",
  },
  subheadline: "We'd love to hear from you.",
};

describe("ContactHero", () => {
  it("renders the composed title as h1 with the marked word", () => {
    render(<ContactHero {...defaultProps} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Let's talk about your growth.");
  });

  it("renders the eyebrow", () => {
    render(<ContactHero {...defaultProps} />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
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
