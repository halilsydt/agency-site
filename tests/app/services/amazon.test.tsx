import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import AmazonServicesPage from "@/app/services/amazon/page";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render AmazonServicesPage with LanguageProvider wrapper
 */
function renderAmazonServicesPage() {
  return render(
    <LanguageProvider>
      <AmazonServicesPage />
    </LanguageProvider>
  );
}

describe("Amazon Services Page", () => {
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

  it("renders ServiceHero with Amazon headline", () => {
    renderAmazonServicesPage();
    expect(
      screen.getByRole("heading", { level: 1, name: /amazon services/i })
    ).toBeInTheDocument();
  });

  it("renders ServiceHero subheadline", () => {
    renderAmazonServicesPage();
    expect(
      screen.getByText(/expert consulting and management services/i)
    ).toBeInTheDocument();
  });

  it("renders all 5 Amazon services", () => {
    renderAmazonServicesPage();
    expect(screen.getByText("Account Opening & Setup")).toBeInTheDocument();
    expect(screen.getByText("Product Listing Optimization")).toBeInTheDocument();
    expect(screen.getByText("Amazon Advertising (PPC)")).toBeInTheDocument();
    expect(screen.getByText("Store Optimization")).toBeInTheDocument();
    expect(
      screen.getByText("Troubleshooting & Account Health")
    ).toBeInTheDocument();
  });

  it("renders 5 service cards with icons", () => {
    renderAmazonServicesPage();
    const serviceIcons = screen.getAllByTestId("service-icon");
    expect(serviceIcons).toHaveLength(5);
  });

  it("renders CTA links in hero section pointing to contact", () => {
    renderAmazonServicesPage();
    const consultationLinks = screen.getAllByRole("link", {
      name: /book free consultation/i,
    });
    expect(consultationLinks.length).toBeGreaterThan(0);
    expect(consultationLinks[0]).toHaveAttribute("href", "/contact");
  });

  it("renders CTA links in hero section pointing to pricing", () => {
    renderAmazonServicesPage();
    const pricingLinks = screen.getAllByRole("link", {
      name: /view pricing/i,
    });
    expect(pricingLinks.length).toBeGreaterThan(0);
    expect(pricingLinks[0]).toHaveAttribute("href", "/pricing");
  });

  it("renders bottom CTA section", () => {
    renderAmazonServicesPage();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /ready to grow your amazon business/i,
      })
    ).toBeInTheDocument();
  });

  it("renders services list section headline", () => {
    renderAmazonServicesPage();
    expect(
      screen.getByRole("heading", { level: 2, name: /our amazon services/i })
    ).toBeInTheDocument();
  });
});
