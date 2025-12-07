import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PricingSection } from "@/components/sections/pricing-section";
import type { PricingPackage } from "@/lib/types";

const mockPackages: PricingPackage[] = [
  {
    id: "amazon-starter",
    platform: "amazon",
    tier: "starter",
    name: "Starter",
    price: 299,
    priceUnit: "/month",
    description: "Perfect for new sellers",
    features: ["Account audit", "Basic optimization"],
    isPopular: false,
    ctaText: "Get Started",
    ctaHref: "/contact",
  },
  {
    id: "amazon-growth",
    platform: "amazon",
    tier: "growth",
    name: "Growth",
    price: 499,
    priceUnit: "/month",
    description: "Perfect for growing sellers",
    features: ["PPC management", "Weekly reports"],
    isPopular: true,
    ctaText: "Get Started",
    ctaHref: "/contact",
  },
  {
    id: "amazon-premium",
    platform: "amazon",
    tier: "premium",
    name: "Premium",
    price: 799,
    priceUnit: "/month",
    description: "Complete solution",
    features: ["Full account management", "Priority support"],
    isPopular: false,
    ctaText: "Get Started",
    ctaHref: "/contact",
  },
];

describe("PricingSection", () => {
  it("renders the section headline", () => {
    render(
      <PricingSection
        headline="Amazon Packages"
        packages={mockPackages}
        platform="amazon"
      />
    );
    expect(
      screen.getByRole("heading", { level: 2, name: /amazon packages/i })
    ).toBeInTheDocument();
  });

  it("renders all packages passed as props", () => {
    render(
      <PricingSection
        headline="Amazon Packages"
        packages={mockPackages}
        platform="amazon"
      />
    );
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("Growth")).toBeInTheDocument();
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });

  it("renders pricing for all packages", () => {
    render(
      <PricingSection
        headline="Amazon Packages"
        packages={mockPackages}
        platform="amazon"
      />
    );
    expect(screen.getByText("$299")).toBeInTheDocument();
    expect(screen.getByText("$499")).toBeInTheDocument();
    expect(screen.getByText("$799")).toBeInTheDocument();
  });

  it("shows popular badge for popular package", () => {
    render(
      <PricingSection
        headline="Amazon Packages"
        packages={mockPackages}
        platform="amazon"
      />
    );
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });

  it("has correct platform data attribute", () => {
    const { container } = render(
      <PricingSection
        headline="Amazon Packages"
        packages={mockPackages}
        platform="amazon"
      />
    );
    expect(container.querySelector('[data-platform="amazon"]')).toBeInTheDocument();
  });

  it("renders CTA buttons for all packages", () => {
    render(
      <PricingSection
        headline="Amazon Packages"
        packages={mockPackages}
        platform="amazon"
      />
    );
    const ctaButtons = screen.getAllByRole("link", { name: /get started/i });
    expect(ctaButtons).toHaveLength(3);
  });

  it("renders with different platform", () => {
    const etsyPackages = mockPackages.map((pkg) => ({
      ...pkg,
      platform: "etsy" as const,
    }));

    const { container } = render(
      <PricingSection
        headline="Etsy Packages"
        packages={etsyPackages}
        platform="etsy"
      />
    );
    expect(
      screen.getByRole("heading", { name: /etsy packages/i })
    ).toBeInTheDocument();
    expect(container.querySelector('[data-platform="etsy"]')).toBeInTheDocument();
  });
});
