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
    renderServicesOverview({ headline: "Services for Amazon & Etsy Sellers" });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Services for Amazon & Etsy Sellers"
    );
  });

  it("renders Amazon platform card", () => {
    renderServicesOverview({ headline: "Services" });
    expect(screen.getByText("Amazon Services")).toBeInTheDocument();
  });

  it("renders Etsy platform card", () => {
    renderServicesOverview({ headline: "Services" });
    expect(screen.getByText("Etsy Services")).toBeInTheDocument();
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

  it("renders subheadline when provided", () => {
    renderServicesOverview({
      headline: "Services",
      subheadline: "Choose your marketplace",
    });
    expect(screen.getByText("Choose your marketplace")).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    renderServicesOverview({ headline: "Services" });
    expect(
      screen.queryByText("Choose your marketplace")
    ).not.toBeInTheDocument();
  });
});
