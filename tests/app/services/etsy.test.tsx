import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import EtsyServicesPage from "@/app/services/etsy/page";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render EtsyServicesPage with LanguageProvider wrapper
 */
function renderEtsyServicesPage() {
  return render(
    <LanguageProvider>
      <EtsyServicesPage />
    </LanguageProvider>
  );
}

describe("Etsy Services Page", () => {
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

  it("renders ServiceHero with Etsy headline", () => {
    renderEtsyServicesPage();
    expect(
      screen.getByRole("heading", { level: 1, name: /etsy services/i })
    ).toBeInTheDocument();
  });

  it("renders ServiceHero subheadline", () => {
    renderEtsyServicesPage();
    expect(
      screen.getByText(/expert consulting and management services/i)
    ).toBeInTheDocument();
  });

  it("renders all 5 Etsy services", () => {
    renderEtsyServicesPage();
    expect(screen.getByText("Shop Setup & Configuration")).toBeInTheDocument();
    expect(screen.getByText("SEO & Search Optimization")).toBeInTheDocument();
    expect(screen.getByText("Etsy Marketing & Promotion")).toBeInTheDocument();
    expect(screen.getByText("Listing Optimization")).toBeInTheDocument();
    expect(screen.getByText("Shop Management & Growth")).toBeInTheDocument();
  });

  it("renders 5 service cards with icons", () => {
    renderEtsyServicesPage();
    const serviceIcons = screen.getAllByTestId("service-icon");
    expect(serviceIcons).toHaveLength(5);
  });

  it("renders CTA links in hero section pointing to contact", () => {
    renderEtsyServicesPage();
    const consultationLinks = screen.getAllByRole("link", {
      name: /book free consultation/i,
    });
    expect(consultationLinks.length).toBeGreaterThan(0);
    expect(consultationLinks[0]).toHaveAttribute("href", "/contact");
  });

  it("renders CTA links in hero section pointing to pricing", () => {
    renderEtsyServicesPage();
    const pricingLinks = screen.getAllByRole("link", {
      name: /view pricing/i,
    });
    expect(pricingLinks.length).toBeGreaterThan(0);
    expect(pricingLinks[0]).toHaveAttribute("href", "/pricing");
  });

  it("renders bottom CTA section", () => {
    renderEtsyServicesPage();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /ready to grow your etsy shop/i,
      })
    ).toBeInTheDocument();
  });

  it("renders services list section headline", () => {
    renderEtsyServicesPage();
    expect(
      screen.getByRole("heading", { level: 2, name: /our etsy services/i })
    ).toBeInTheDocument();
  });

  it("applies Etsy platform styling via ServiceHero", () => {
    const { container } = renderEtsyServicesPage();
    // Etsy platform uses accent color gradient (from-accent/10)
    const heroSection = container.querySelector("section");
    expect(heroSection).toHaveClass("from-accent/10");
  });
});
