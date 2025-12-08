import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PricingPreviewSection } from "@/components/sections/pricing-preview";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render PricingPreviewSection with LanguageProvider wrapper
 */
function renderPricingPreview(props: {
  headline: string;
  subheadline?: string;
}) {
  return render(
    <LanguageProvider>
      <PricingPreviewSection {...props} />
    </LanguageProvider>
  );
}

describe("PricingPreviewSection", () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    localStorageMock = {};
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key];
      }),
    });

    Object.defineProperty(navigator, "language", {
      get: () => "en-US",
      configurable: true,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the section headline", () => {
    renderPricingPreview({ headline: "Transparent Pricing" });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Transparent Pricing"
    );
  });

  it("renders optional subheadline when provided", () => {
    renderPricingPreview({
      headline: "Transparent Pricing",
      subheadline: "No hidden costs.",
    });
    expect(screen.getByText(/No hidden costs/i)).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    renderPricingPreview({ headline: "Transparent Pricing" });
    expect(screen.queryByText(/No hidden costs/i)).not.toBeInTheDocument();
  });

  it("renders both pricing preview cards", () => {
    renderPricingPreview({ headline: "Transparent Pricing" });
    expect(screen.getByText("Amazon Services")).toBeInTheDocument();
    expect(screen.getByText("Etsy Services")).toBeInTheDocument();
  });

  it("renders Amazon starting price", () => {
    renderPricingPreview({ headline: "Transparent Pricing" });
    expect(screen.getByText(/\$499/)).toBeInTheDocument();
  });

  it("renders Etsy starting price", () => {
    renderPricingPreview({ headline: "Transparent Pricing" });
    expect(screen.getByText(/\$399/)).toBeInTheDocument();
  });

  it("renders the bundle discount message", () => {
    renderPricingPreview({ headline: "Transparent Pricing" });
    expect(screen.getByText(/Bundle & Save/i)).toBeInTheDocument();
  });

  it("renders the CTA button with link to pricing page", () => {
    renderPricingPreview({ headline: "Transparent Pricing" });
    const link = screen.getByRole("link", { name: /View Full Pricing/i });
    expect(link).toHaveAttribute("href", "/pricing");
  });

  it("renders platform badges for both cards", () => {
    renderPricingPreview({ headline: "Transparent Pricing" });
    expect(screen.getByText("amazon")).toBeInTheDocument();
    expect(screen.getByText("etsy")).toBeInTheDocument();
  });

  it("renders 2 pricing cards", () => {
    renderPricingPreview({ headline: "Pricing" });
    expect(screen.getByText("Amazon Services")).toBeInTheDocument();
    expect(screen.getByText("Etsy Services")).toBeInTheDocument();
  });
});
