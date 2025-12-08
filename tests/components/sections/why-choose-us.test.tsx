import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render WhyChooseUs with LanguageProvider wrapper
 */
function renderWhyChooseUs(props: { headline: string; subheadline?: string }) {
  return render(
    <LanguageProvider>
      <WhyChooseUs {...props} />
    </LanguageProvider>
  );
}

describe("WhyChooseUs", () => {
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
    renderWhyChooseUs({ headline: "Why Choose Us" });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Why Choose Us"
    );
  });

  it("renders all default differentiator cards", () => {
    renderWhyChooseUs({ headline: "Why Choose Us" });
    expect(screen.getByText("Honest Approach")).toBeInTheDocument();
    expect(screen.getByText("Real Results")).toBeInTheDocument();
    expect(screen.getByText("Transparent Pricing")).toBeInTheDocument();
    expect(screen.getByText("Platform Expertise")).toBeInTheDocument();
  });

  it("renders differentiator icons", () => {
    renderWhyChooseUs({ headline: "Why Choose Us" });
    expect(screen.getByText("🤝")).toBeInTheDocument();
    expect(screen.getByText("📈")).toBeInTheDocument();
    expect(screen.getByText("💰")).toBeInTheDocument();
    expect(screen.getByText("🎯")).toBeInTheDocument();
  });

  it("renders differentiator descriptions", () => {
    renderWhyChooseUs({ headline: "Why Choose Us" });
    expect(
      screen.getByText(/no hype, no empty promises/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/measurable growth/i)).toBeInTheDocument();
    expect(screen.getByText(/no hidden fees/i)).toBeInTheDocument();
    expect(screen.getByText(/deep specialization/i)).toBeInTheDocument();
  });

  it("renders subheadline when provided", () => {
    renderWhyChooseUs({
      headline: "Why Choose Us",
      subheadline: "What sets us apart",
    });
    expect(screen.getByText("What sets us apart")).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    renderWhyChooseUs({ headline: "Why Choose Us" });
    expect(screen.queryByText("What sets us apart")).not.toBeInTheDocument();
  });

  it("renders 4 differentiator cards", () => {
    renderWhyChooseUs({ headline: "Our Values" });
    expect(screen.getByText("Honest Approach")).toBeInTheDocument();
    expect(screen.getByText("Real Results")).toBeInTheDocument();
    expect(screen.getByText("Transparent Pricing")).toBeInTheDocument();
    expect(screen.getByText("Platform Expertise")).toBeInTheDocument();
  });
});
