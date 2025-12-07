import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PricingPreviewSection } from "@/components/sections/pricing-preview";

describe("PricingPreviewSection", () => {
  it("renders the section headline", () => {
    render(<PricingPreviewSection headline="Transparent Pricing" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Transparent Pricing"
    );
  });

  it("renders optional subheadline when provided", () => {
    render(
      <PricingPreviewSection
        headline="Transparent Pricing"
        subheadline="No hidden costs."
      />
    );
    expect(screen.getByText(/No hidden costs/i)).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    render(<PricingPreviewSection headline="Transparent Pricing" />);
    expect(screen.queryByText(/No hidden costs/i)).not.toBeInTheDocument();
  });

  it("renders both pricing preview cards", () => {
    render(<PricingPreviewSection headline="Transparent Pricing" />);
    expect(screen.getByText("Amazon Services")).toBeInTheDocument();
    expect(screen.getByText("Etsy Services")).toBeInTheDocument();
  });

  it("renders Amazon starting price", () => {
    render(<PricingPreviewSection headline="Transparent Pricing" />);
    expect(screen.getByText(/\$499/)).toBeInTheDocument();
  });

  it("renders Etsy starting price", () => {
    render(<PricingPreviewSection headline="Transparent Pricing" />);
    expect(screen.getByText(/\$399/)).toBeInTheDocument();
  });

  it("renders the bundle discount message", () => {
    render(<PricingPreviewSection headline="Transparent Pricing" />);
    expect(screen.getByText(/Bundle & Save/i)).toBeInTheDocument();
  });

  it("renders the CTA button with link to pricing page", () => {
    render(<PricingPreviewSection headline="Transparent Pricing" />);
    const link = screen.getByRole("link", { name: /View Full Pricing/i });
    expect(link).toHaveAttribute("href", "/pricing");
  });

  it("renders custom bundle text when provided", () => {
    render(
      <PricingPreviewSection
        headline="Transparent Pricing"
        bundleText="Custom bundle offer"
      />
    );
    expect(screen.getByText(/Custom bundle offer/i)).toBeInTheDocument();
  });

  it("renders custom pricing previews when provided", () => {
    const customPreviews = [
      {
        id: "custom-1",
        platform: "amazon" as const,
        title: "Custom Amazon Package",
        startingPrice: 599,
        features: ["Custom feature"],
      },
    ];
    render(
      <PricingPreviewSection
        headline="Transparent Pricing"
        pricingPreviews={customPreviews}
      />
    );
    expect(screen.getByText("Custom Amazon Package")).toBeInTheDocument();
    expect(screen.getByText(/\$599/)).toBeInTheDocument();
  });

  it("renders platform badges for both cards", () => {
    render(<PricingPreviewSection headline="Transparent Pricing" />);
    expect(screen.getByText("amazon")).toBeInTheDocument();
    expect(screen.getByText("etsy")).toBeInTheDocument();
  });
});
