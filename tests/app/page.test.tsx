import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Homepage", () => {
  it("renders the hero headline", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Agency Site");
  });

  it("renders the tagline about e-commerce consulting", () => {
    render(<Home />);
    expect(
      screen.getByText(/e-commerce consulting for amazon/i)
    ).toBeInTheDocument();
  });

  it("renders a CTA button", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /coming soon/i });
    expect(button).toBeInTheDocument();
  });

  it("renders the CTA button as disabled", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /coming soon/i });
    expect(button).toBeDisabled();
  });

  it("renders content centered within a section", () => {
    render(<Home />);
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-16", "md:py-24");
  });

  it("renders hero content with proper text-center alignment", () => {
    render(<Home />);
    const centeredDiv = document.querySelector(".text-center");
    expect(centeredDiv).toBeInTheDocument();
    expect(centeredDiv).toHaveClass("max-w-3xl", "mx-auto");
  });
});
