import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Homepage", () => {
  it("renders the hero headline", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(
      "Grow Your Amazon & Etsy Business with Honest Expertise"
    );
  });

  it("renders the subheadline about results-driven consulting", () => {
    render(<Home />);
    expect(
      screen.getByText(/results-driven consulting/i)
    ).toBeInTheDocument();
  });

  it("renders primary CTA button linking to contact", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /book free consultation/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders secondary CTA button linking to pricing", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /view pricing/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/pricing");
  });

  it("renders content within a section with responsive padding", () => {
    render(<Home />);
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-16", "md:py-24", "lg:py-32");
  });

  it("renders hero with text-center alignment on mobile", () => {
    render(<Home />);
    const textDiv = document.querySelector(".text-center");
    expect(textDiv).toBeInTheDocument();
    expect(textDiv).toHaveClass("lg:text-left");
  });
});
