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

  it("renders the Atlas hero headline", () => {
    renderHomePage();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    // Lines render as separate display blocks (no joining whitespace in textContent).
    expect(heading).toHaveTextContent("Grow what you");
    expect(heading).toHaveTextContent("honesty");
  });

  it("renders the hero lead about results-driven consulting", () => {
    renderHomePage();
    expect(screen.getByText(/results-driven consulting/i)).toBeInTheDocument();
  });

  it("renders a primary CTA opening the booking dialog", () => {
    renderHomePage();
    // Hero + CTA section both expose a "Book Free Consultation" dialog trigger.
    const buttons = screen.getAllByRole("button", {
      name: /book free consultation/i,
    });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders secondary CTA links to pricing", () => {
    renderHomePage();
    const links = screen.getAllByRole("link", { name: /view pricing/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    links.forEach((link) => expect(link).toHaveAttribute("href", "/pricing"));
  });

  it("renders the marquee with duplicated service items", () => {
    renderHomePage();
    // Marquee duplicates its item list once, so each item appears twice.
    const items = screen.getAllByText("Growth Strategy");
    expect(items.length).toBe(2);
  });

  it("renders the closing CTA section headline", () => {
    renderHomePage();
    expect(
      screen.getByRole("heading", { name: /let's grow your business/i })
    ).toBeInTheDocument();
  });

  it("does not render the WhyChooseUs or FAQ preview sections on the homepage", () => {
    renderHomePage();
    // Atlas home drops these; they live in the repo but are not rendered here.
    expect(screen.queryByText("Honest Approach")).not.toBeInTheDocument();
    expect(
      screen.queryByText("What platforms do you support?")
    ).not.toBeInTheDocument();
  });
});
