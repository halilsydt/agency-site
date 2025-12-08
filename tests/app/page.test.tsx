import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Home from "@/app/page";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render Home page with LanguageProvider wrapper
 */
function renderHomePage() {
  return render(
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  );
}

describe("Homepage", () => {
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

  it("renders the hero headline", () => {
    renderHomePage();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(
      "Grow Your Amazon & Etsy Business with Honest Expertise"
    );
  });

  it("renders the subheadline about results-driven consulting", () => {
    renderHomePage();
    expect(
      screen.getByText(/results-driven consulting/i)
    ).toBeInTheDocument();
  });

  it("renders primary CTA button linking to contact", () => {
    renderHomePage();
    const link = screen.getByRole("link", { name: /book free consultation/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders secondary CTA button linking to pricing", () => {
    renderHomePage();
    const link = screen.getByRole("link", { name: /view pricing/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/pricing");
  });

  it("renders content within a section with responsive padding", () => {
    renderHomePage();
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-16", "md:py-24", "lg:py-32");
  });

  it("renders hero with text-center alignment on mobile", () => {
    renderHomePage();
    const textDiv = document.querySelector(".text-center");
    expect(textDiv).toBeInTheDocument();
    expect(textDiv).toHaveClass("lg:text-left");
  });
});
