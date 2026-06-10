import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ServicesOverview } from "@/components/sections/services-overview";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render ServicesOverview with LanguageProvider wrapper
 */
function renderServicesOverview(props: {
  headline: string;
  subheadline?: string;
}) {
  return render(
    <LanguageProvider>
      <ServicesOverview {...props} />
    </LanguageProvider>
  );
}

describe("ServicesOverview", () => {
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
    renderServicesOverview({ headline: "Services for Etsy & Amazon Sellers" });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Services for Etsy & Amazon Sellers"
    );
  });

  it("renders the Amazon panel title", () => {
    renderServicesOverview({ headline: "Services" });
    expect(
      screen.getByRole("heading", { name: "Amazon Services" })
    ).toBeInTheDocument();
  });

  it("renders the Etsy panel title", () => {
    renderServicesOverview({ headline: "Services" });
    expect(
      screen.getByRole("heading", { name: "Etsy Services" })
    ).toBeInTheDocument();
  });

  it("renders CTA links with correct hrefs", () => {
    renderServicesOverview({ headline: "Services" });
    expect(
      screen.getByRole("link", { name: /explore amazon/i })
    ).toHaveAttribute("href", "/services/amazon");
    expect(
      screen.getByRole("link", { name: /explore etsy/i })
    ).toHaveAttribute("href", "/services/etsy");
  });

  it("renders the panel checklist bullets", () => {
    renderServicesOverview({ headline: "Services" });
    // Amazon bullets
    expect(screen.getByText("PPC management")).toBeInTheDocument();
    expect(screen.getByText("Performance reports")).toBeInTheDocument();
    // Etsy bullets
    expect(screen.getByText("SEO & search")).toBeInTheDocument();
    expect(screen.getByText("Marketing strategy")).toBeInTheDocument();
  });

  it("renders the section eyebrow", () => {
    renderServicesOverview({ headline: "Services" });
    expect(screen.getByText("What we do")).toBeInTheDocument();
  });

  it("falls back to the i18n supporting text when no subheadline is provided", () => {
    renderServicesOverview({ headline: "Services" });
    expect(
      screen.getByText(/Hands-on support across both ecosystems/i)
    ).toBeInTheDocument();
  });
});
