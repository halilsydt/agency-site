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
    expect(
      screen.getByRole("heading", { name: "Amazon Services" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Etsy Services" })
    ).toBeInTheDocument();
  });

  it("renders $999 for both cards (confirmed decision)", () => {
    renderPricingPreview({ headline: "Transparent Pricing" });
    const prices = screen.getAllByText(/\$999/);
    expect(prices.length).toBe(2);
  });

  it("renders the Atlas bundle bar", () => {
    renderPricingPreview({ headline: "Transparent Pricing" });
    expect(screen.getByText(/Bundle & Save 15%/i)).toBeInTheDocument();
    const bundleLink = screen.getByRole("link", { name: /Get Bundle Quote/i });
    expect(bundleLink).toHaveAttribute("href", "/contact");
  });

  it("renders the View Full Pricing buttons linking to the pricing page", () => {
    renderPricingPreview({ headline: "Transparent Pricing" });
    const links = screen.getAllByRole("link", { name: /View Full Pricing/i });
    expect(links.length).toBe(2);
    links.forEach((link) => expect(link).toHaveAttribute("href", "/pricing"));
  });

  it("renders the section eyebrow and from line", () => {
    renderPricingPreview({ headline: "Transparent Pricing" });
    expect(screen.getByText("Transparent pricing")).toBeInTheDocument();
    expect(
      screen.getAllByText(/Starting at · cancel anytime/i).length
    ).toBe(2);
  });
});
