import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PlatformCard } from "@/components/cards/platform-card";

const defaultProps = {
  platform: "amazon" as const,
  title: "Amazon Services",
  description: "Expert guidance for Amazon sellers.",
  href: "/services/amazon",
  ctaText: "Explore Amazon Services",
};

describe("PlatformCard", () => {
  it("renders the platform title", () => {
    render(<PlatformCard {...defaultProps} />);
    expect(screen.getByText("Amazon Services")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<PlatformCard {...defaultProps} />);
    expect(screen.getByText(/Expert guidance/)).toBeInTheDocument();
  });

  it("renders CTA link with correct href", () => {
    render(<PlatformCard {...defaultProps} />);
    expect(
      screen.getByRole("link", { name: /explore amazon/i })
    ).toHaveAttribute("href", "/services/amazon");
  });

  it("renders icon placeholder", () => {
    render(<PlatformCard {...defaultProps} />);
    expect(screen.getByTestId("platform-icon")).toBeInTheDocument();
  });

  it("renders Etsy card with correct content", () => {
    render(
      <PlatformCard
        platform="etsy"
        title="Etsy Services"
        description="Specialized support for Etsy shops."
        href="/services/etsy"
        ctaText="Explore Etsy Services"
      />
    );
    expect(screen.getByText("Etsy Services")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /explore etsy/i })
    ).toHaveAttribute("href", "/services/etsy");
  });
});
