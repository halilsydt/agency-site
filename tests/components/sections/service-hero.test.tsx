import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceHero } from "@/components/sections/service-hero";

const defaultProps = {
  eyebrow: "Amazon Services",
  title: { pre: "Make Amazon your ", mark: "growth engine", post: "." },
  subheadline: "Expert consulting for Amazon sellers",
  platform: "amazon" as const,
  primaryCtaText: "Book Free Consultation",
  secondaryCtaText: "View Pricing",
};

describe("ServiceHero", () => {
  it("renders the Atlas headline as h1 (with the marked phrase)", () => {
    render(<ServiceHero {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Make Amazon your growth engine."
    );
  });

  it("renders the eyebrow label", () => {
    render(<ServiceHero {...defaultProps} />);
    expect(screen.getByText("Amazon Services")).toBeInTheDocument();
  });

  it("renders subheadline", () => {
    render(<ServiceHero {...defaultProps} />);
    expect(screen.getByText(/Expert consulting/)).toBeInTheDocument();
  });

  it("renders CTA buttons with correct hrefs", () => {
    render(<ServiceHero {...defaultProps} />);
    expect(
      screen.getByRole("link", { name: /book.*consultation/i })
    ).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /view pricing/i })).toHaveAttribute(
      "href",
      "/pricing"
    );
  });

  it("colors the marked phrase green for Amazon", () => {
    render(<ServiceHero {...defaultProps} />);
    expect(screen.getByText("growth engine").className).toContain("text-green");
  });

  it("uses the clay eyebrow + clay mark for Etsy", () => {
    render(
      <ServiceHero
        {...defaultProps}
        eyebrow="Etsy Services"
        title={{ pre: "Help your Etsy shop ", mark: "get found", post: "." }}
        platform="etsy"
      />
    );
    expect(screen.getByText("Etsy Services").className).toContain("clay");
    expect(screen.getByText("get found").className).toContain("text-clay");
  });
});
