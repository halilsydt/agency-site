import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { HowItWorks } from "@/components/sections/how-it-works";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render HowItWorks with LanguageProvider wrapper
 */
function renderHowItWorks(props: { headline: string; subheadline?: string }) {
  return render(
    <LanguageProvider>
      <HowItWorks {...props} />
    </LanguageProvider>
  );
}

describe("HowItWorks", () => {
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
    renderHowItWorks({ headline: "How It Works" });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "How It Works"
    );
  });

  it("renders all default step cards", () => {
    renderHowItWorks({ headline: "How It Works" });
    expect(screen.getByText("Book Consultation")).toBeInTheDocument();
    expect(screen.getByText("Get Custom Strategy")).toBeInTheDocument();
    expect(screen.getByText("Implement & Grow")).toBeInTheDocument();
  });

  it("renders step numbers", () => {
    renderHowItWorks({ headline: "How It Works" });
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    renderHowItWorks({ headline: "How It Works" });
    expect(screen.getByText(/free discovery call/i)).toBeInTheDocument();
    expect(screen.getByText(/tailored action plan/i)).toBeInTheDocument();
    expect(
      screen.getByText(/watch your business thrive/i)
    ).toBeInTheDocument();
  });

  it("renders subheadline when provided", () => {
    renderHowItWorks({
      headline: "How It Works",
      subheadline: "Our simple process",
    });
    expect(screen.getByText("Our simple process")).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    renderHowItWorks({ headline: "How It Works" });
    expect(screen.queryByText("Our simple process")).not.toBeInTheDocument();
  });

  it("renders 3 step cards", () => {
    renderHowItWorks({ headline: "Process" });
    // Each step card has a step number - verify we have 3 steps
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
