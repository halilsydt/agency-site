import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PricingPage from "@/app/pricing/page";

describe("Pricing Page", () => {
  it("renders the pricing hero with headline", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /pricing/i })
    ).toBeInTheDocument();
  });

  it("renders transparent pricing message in hero", () => {
    render(<PricingPage />);
    expect(screen.getByText(/no hidden fees/i)).toBeInTheDocument();
  });

  it("renders Amazon packages section", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { name: /amazon packages/i })
    ).toBeInTheDocument();
  });

  it("renders Etsy packages section", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { name: /etsy packages/i })
    ).toBeInTheDocument();
  });

  it("renders bundle discount highlight", () => {
    render(<PricingPage />);
    expect(screen.getByText(/bundle & save/i)).toBeInTheDocument();
  });

  it("renders bundle CTA linking to contact", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("link", { name: /get bundle quote/i })
    ).toHaveAttribute("href", "/contact");
  });

  it("renders bottom CTA section", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { name: /not sure which package/i })
    ).toBeInTheDocument();
  });

  it("renders consultation CTA linking to contact", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("link", { name: /book free consultation/i })
    ).toHaveAttribute("href", "/contact");
  });

  it("highlights popular packages with badges", () => {
    render(<PricingPage />);
    const popularBadges = screen.getAllByText(/most popular/i);
    // One for Amazon Growth, one for Etsy Growth
    expect(popularBadges.length).toBeGreaterThanOrEqual(2);
  });

  it("renders Amazon pricing packages from content", () => {
    render(<PricingPage />);
    // Check for Amazon package tiers
    const starterPrices = screen.getAllByText("$299");
    expect(starterPrices.length).toBeGreaterThanOrEqual(1);
  });

  it("renders Etsy pricing packages from content", () => {
    render(<PricingPage />);
    // Check for Etsy package tiers (Etsy Starter is $199)
    const etsyStarterPrices = screen.getAllByText("$199");
    expect(etsyStarterPrices.length).toBeGreaterThanOrEqual(1);
  });

  it("has proper heading hierarchy", () => {
    render(<PricingPage />);
    // h1 for page title
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    // h2 for sections
    const h2Headings = screen.getAllByRole("heading", { level: 2 });
    expect(h2Headings.length).toBeGreaterThanOrEqual(3);
  });

  it("all package CTAs link to contact", () => {
    render(<PricingPage />);
    const getStartedLinks = screen.getAllByRole("link", { name: /get started/i });
    getStartedLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/contact");
    });
  });
});
