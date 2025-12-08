import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PricingPreviewCard } from "@/components/cards/pricing-preview-card";
import { LanguageProvider } from "@/components/providers/language-provider";

const defaultProps = {
  platform: "amazon" as const,
  title: "Amazon Services",
  startingPrice: 499,
  features: ["Feature 1", "Feature 2", "Feature 3"],
};

/**
 * Render PricingPreviewCard with LanguageProvider wrapper
 */
function renderPricingCard(props: typeof defaultProps) {
  return render(
    <LanguageProvider>
      <PricingPreviewCard {...props} />
    </LanguageProvider>
  );
}

describe("PricingPreviewCard", () => {
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

  it("renders the platform badge", () => {
    renderPricingCard(defaultProps);
    expect(screen.getByText("amazon")).toBeInTheDocument();
  });

  it("renders the title", () => {
    renderPricingCard(defaultProps);
    expect(screen.getByText("Amazon Services")).toBeInTheDocument();
  });

  it("renders the starting price", () => {
    renderPricingCard(defaultProps);
    expect(screen.getByText(/\$499/)).toBeInTheDocument();
  });

  it('renders "Starting at" label', () => {
    renderPricingCard(defaultProps);
    expect(screen.getByText("Starting at")).toBeInTheDocument();
  });

  it("renders all feature highlights", () => {
    renderPricingCard(defaultProps);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
  });

  it("renders etsy platform correctly", () => {
    renderPricingCard({
      platform: "etsy",
      title: "Etsy Services",
      startingPrice: 399,
      features: ["Etsy feature 1", "Etsy feature 2"],
    });
    expect(screen.getByText("etsy")).toBeInTheDocument();
    expect(screen.getByText("Etsy Services")).toBeInTheDocument();
    expect(screen.getByText(/\$399/)).toBeInTheDocument();
  });

  it("renders /month suffix after price", () => {
    renderPricingCard(defaultProps);
    expect(screen.getByText("/month")).toBeInTheDocument();
  });

  it("renders features as list items", () => {
    renderPricingCard(defaultProps);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(3);
  });
});
