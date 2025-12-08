import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ResultsGallery } from "@/components/sections/results-gallery";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render ResultsGallery with LanguageProvider wrapper
 */
function renderResultsGallery(props: {
  headline: string;
  subheadline?: string;
}) {
  return render(
    <LanguageProvider>
      <ResultsGallery {...props} />
    </LanguageProvider>
  );
}

describe("ResultsGallery", () => {
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
    renderResultsGallery({ headline: "Real Results from Real Clients" });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Real Results from Real Clients"
    );
  });

  it("renders all result cards with captions", () => {
    renderResultsGallery({ headline: "Real Results from Real Clients" });
    expect(screen.getByText(/Full year sales growth/i)).toBeInTheDocument();
    expect(
      screen.getByText(/5 years of consistent growth/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Strong yearly performance/i)).toBeInTheDocument();
    expect(screen.getByText(/Rapid growth since launch/i)).toBeInTheDocument();
  });

  it("renders images with proper alt text", () => {
    renderResultsGallery({ headline: "Real Results from Real Clients" });
    expect(
      screen.getByRole("img", {
        name: /Amazon seller dashboard showing yearly/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /all-time sales from 2020/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Etsy shop dashboard showing yearly/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /New Etsy shop growth from May/i })
    ).toBeInTheDocument();
  });

  it("renders optional subheadline when provided", () => {
    renderResultsGallery({
      headline: "Real Results",
      subheadline: "See what we've achieved for our clients",
    });
    expect(
      screen.getByText(/See what we've achieved for our clients/i)
    ).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    renderResultsGallery({ headline: "Real Results" });
    expect(
      screen.queryByText(/See what we've achieved/i)
    ).not.toBeInTheDocument();
  });

  it("renders platform badges for all results", () => {
    renderResultsGallery({ headline: "Real Results from Real Clients" });
    // There is 1 Amazon badge and 3 Etsy badges
    const amazonBadges = screen.getAllByText("amazon");
    const etsyBadges = screen.getAllByText("etsy");
    expect(amazonBadges.length).toBe(1);
    expect(etsyBadges.length).toBe(3);
  });

  it("renders 4 result cards", () => {
    renderResultsGallery({ headline: "Results" });
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(4);
  });
});
