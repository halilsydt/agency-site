import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AboutHero } from "@/components/sections/about-hero";

const defaultProps = {
  eyebrow: "About Us",
  title: {
    pre: "Marketplace experts who keep it ",
    mark: "honest",
    post: ".",
  },
  subheadline: "We help marketplace sellers succeed.",
};

describe("AboutHero", () => {
  it("renders the Atlas headline as h1 composed from the title triple", () => {
    render(<AboutHero {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Marketplace experts who keep it honest."
    );
  });

  it("renders the green .mark emphasis span", () => {
    const { container } = render(<AboutHero {...defaultProps} />);
    const mark = container.querySelector("h1 span");
    expect(mark).toHaveTextContent("honest");
    expect(mark?.className).toContain("text-green");
  });

  it("renders the eyebrow", () => {
    render(<AboutHero {...defaultProps} />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
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
