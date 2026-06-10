import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ResultsGallery } from "@/components/sections/results-gallery";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render ResultsGallery (Atlas results showcase) with LanguageProvider wrapper
 */
function renderResultsGallery(props: { headline: string; subheadline?: string }) {
  return render(
    <LanguageProvider>
      <ResultsGallery {...props} />
    </LanguageProvider>
  );
}

describe("ResultsGallery (Atlas results showcase)", () => {
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

  it("renders one tab per client dataset (4 tabs)", () => {
    renderResultsGallery({ headline: "Results" });
    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBe(4);
  });

  it("marks the first tab active by default and shows its content", () => {
    renderResultsGallery({ headline: "Results" });
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    // Default dataset = Amazon full year
    expect(
      screen.getByText(/A stalled catalog, scaled to seven figures/i)
    ).toBeInTheDocument();
  });

  it("switches content when a different tab is clicked", () => {
    renderResultsGallery({ headline: "Results" });
    const etsyTab = screen.getByRole("tab", { name: /Etsy · 5 years/i });
    fireEvent.click(etsyTab);
    expect(etsyTab).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByText(/Five years of compounding growth/i)
    ).toBeInTheDocument();
  });

  it("renders the chart SVG", () => {
    const { container } = renderResultsGallery({ headline: "Results" });
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the default dataset stats", () => {
    renderResultsGallery({ headline: "Results" });
    const panel = screen.getByRole("tabpanel");
    expect(within(panel).getByText("+212%")).toBeInTheDocument();
    expect(within(panel).getByText("Revenue")).toBeInTheDocument();
  });
});
