import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import PricingPage from "@/app/pricing/page";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Switch the pricing page platform toggle to Amazon.
 * The page defaults to showing Etsy packages; Amazon packages render
 * only after activating the Amazon pill toggle.
 */
async function switchToAmazon() {
  await userEvent.click(screen.getByRole("button", { name: "Amazon" }));
}

/**
 * Render PricingPage with LanguageProvider wrapper
 */
function renderPricingPage() {
  return render(
    <LanguageProvider>
      <PricingPage />
    </LanguageProvider>
  );
}

describe("Pricing Page", () => {
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

  it("renders the pricing hero with headline", () => {
    renderPricingPage();
    expect(
      screen.getByRole("heading", { level: 1, name: /pricing/i })
    ).toBeInTheDocument();
  });

  it("renders transparent pricing message in hero", () => {
    renderPricingPage();
    // "No hidden fees" also appears in the FAQ answer, so scope to the hero
    // subheadline's unique "No surprise charges" phrasing.
    expect(screen.getByText(/no surprise charges/i)).toBeInTheDocument();
  });

  it("renders Amazon packages section", async () => {
    renderPricingPage();
    await switchToAmazon();
    expect(
      screen.getByRole("heading", { name: /amazon packages/i })
    ).toBeInTheDocument();
  });

  it("renders Etsy packages section", () => {
    renderPricingPage();
    // Etsy is the default selected platform
    expect(
      screen.getByRole("heading", { name: /etsy packages/i })
    ).toBeInTheDocument();
  });

  it("renders bundle discount highlight", () => {
    renderPricingPage();
    expect(screen.getByText(/bundle & save/i)).toBeInTheDocument();
  });

  it("renders bundle CTA linking to contact", () => {
    renderPricingPage();
    expect(
      screen.getByRole("link", { name: /get bundle quote/i })
    ).toHaveAttribute("href", "/contact");
  });

  it("renders bottom CTA section", () => {
    renderPricingPage();
    expect(
      screen.getByRole("heading", { name: /not sure which package/i })
    ).toBeInTheDocument();
  });

  it("renders consultation CTA opening the booking dialog", () => {
    renderPricingPage();
    // The bottom consultation CTA now opens a booking dialog (button trigger)
    // rather than linking directly to /contact.
    expect(
      screen.getByRole("button", { name: /book free consultation/i })
    ).toBeInTheDocument();
  });

  it("highlights the popular package with a badge", () => {
    renderPricingPage();
    // Only the active platform's packages render at a time (Etsy by default),
    // so a single "Most Popular" badge is shown for the Growth tier.
    const popularBadges = screen.getAllByText(/most popular/i);
    expect(popularBadges.length).toBeGreaterThanOrEqual(1);
  });

  it("renders Amazon pricing packages from content", async () => {
    renderPricingPage();
    await switchToAmazon();
    // Amazon Starter tier is $299
    const starterPrices = screen.getAllByText("$299");
    expect(starterPrices.length).toBeGreaterThanOrEqual(1);
  });

  it("renders Etsy pricing packages from content", () => {
    renderPricingPage();
    // Check for Etsy package tiers (Etsy Starter is $199)
    const etsyStarterPrices = screen.getAllByText("$199");
    expect(etsyStarterPrices.length).toBeGreaterThanOrEqual(1);
  });

  it("has proper heading hierarchy", () => {
    renderPricingPage();
    // h1 for page title
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    // h2 for sections (active platform packages + bottom CTA)
    const h2Headings = screen.getAllByRole("heading", { level: 2 });
    expect(h2Headings.length).toBeGreaterThanOrEqual(2);
  });

  it("all package CTAs link to contact", () => {
    renderPricingPage();
    const getStartedLinks = screen.getAllByRole("link", { name: /get started/i });
    getStartedLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/contact");
    });
  });
});
