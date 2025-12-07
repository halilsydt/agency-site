import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PricingCard } from "@/components/cards/pricing-card";
import type { PricingPackage } from "@/lib/types";

const mockPackage: PricingPackage = {
  id: "amazon-growth",
  platform: "amazon",
  tier: "growth",
  name: "Growth",
  price: 499,
  priceUnit: "/month",
  description: "Perfect for growing sellers",
  features: ["PPC management", "Weekly reports", "A+ Content"],
  isPopular: true,
  ctaText: "Get Started",
  ctaHref: "/contact",
};

describe("PricingCard", () => {
  it("renders package name", () => {
    render(<PricingCard package={mockPackage} />);
    expect(screen.getByText("Growth")).toBeInTheDocument();
  });

  it("renders package price", () => {
    render(<PricingCard package={mockPackage} />);
    expect(screen.getByText("$499")).toBeInTheDocument();
    expect(screen.getByText("/month")).toBeInTheDocument();
  });

  it("renders package description", () => {
    render(<PricingCard package={mockPackage} />);
    expect(screen.getByText("Perfect for growing sellers")).toBeInTheDocument();
  });

  it("renders all features", () => {
    render(<PricingCard package={mockPackage} />);
    expect(screen.getByText("PPC management")).toBeInTheDocument();
    expect(screen.getByText("Weekly reports")).toBeInTheDocument();
    expect(screen.getByText("A+ Content")).toBeInTheDocument();
  });

  it("shows popular badge when isPopular is true", () => {
    render(<PricingCard package={mockPackage} />);
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });

  it("does not show popular badge when isPopular is false", () => {
    const basicPackage = { ...mockPackage, isPopular: false };
    render(<PricingCard package={basicPackage} />);
    expect(screen.queryByText("Most Popular")).not.toBeInTheDocument();
  });

  it("renders CTA button with correct text", () => {
    render(<PricingCard package={mockPackage} />);
    expect(
      screen.getByRole("link", { name: /get started/i })
    ).toBeInTheDocument();
  });

  it("renders CTA with correct href", () => {
    render(<PricingCard package={mockPackage} />);
    expect(screen.getByRole("link", { name: /get started/i })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("applies highlight styling for popular package", () => {
    const { container } = render(<PricingCard package={mockPackage} />);
    const card = container.querySelector('[class*="ring-primary"]');
    expect(card).toBeInTheDocument();
  });

  it("renders different package correctly", () => {
    const starterPackage: PricingPackage = {
      id: "amazon-starter",
      platform: "amazon",
      tier: "starter",
      name: "Starter",
      price: 299,
      priceUnit: "/month",
      description: "Perfect for new sellers",
      features: ["Account audit", "Basic optimization"],
      isPopular: false,
      ctaText: "Choose Starter",
      ctaHref: "/contact?plan=starter",
    };

    render(<PricingCard package={starterPackage} />);
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("$299")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /choose starter/i })
    ).toBeInTheDocument();
  });
});
