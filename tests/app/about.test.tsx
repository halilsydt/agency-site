import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import AboutPage from "@/app/about/page";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render AboutPage with LanguageProvider wrapper
 */
function renderAboutPage() {
  return render(
    <LanguageProvider>
      <AboutPage />
    </LanguageProvider>
  );
}

describe("About Page", () => {
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

  it("renders the about hero with the Atlas headline and eyebrow", () => {
    renderAboutPage();
    // Atlas h1 is the new "honest" sentence; "About Us" moves to the eyebrow.
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /honest/i
    );
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("renders mission section", () => {
    renderAboutPage();
    // "Our Mission" is now the eyebrow span (the h2 is the "no hype" sentence).
    expect(screen.getByText(/our mission/i)).toBeInTheDocument();
  });

  it("renders approach section", () => {
    renderAboutPage();
    // "Our Approach" is now the clay eyebrow span.
    expect(screen.getByText(/our approach/i)).toBeInTheDocument();
  });

  it("renders experience highlights", () => {
    renderAboutPage();
    expect(screen.getByText(/years experience/i)).toBeInTheDocument();
    expect(screen.getByText(/clients helped/i)).toBeInTheDocument();
  });

  it("renders team section", () => {
    renderAboutPage();
    // "Meet the founders" is the eyebrow; the h2 is "The people behind Scalenty".
    expect(screen.getByText(/meet the founders/i)).toBeInTheDocument();
    expect(screen.getByText(/the people behind scalenty/i)).toBeInTheDocument();
  });

  it("renders CTA linking to contact", () => {
    renderAboutPage();
    expect(
      screen.getByRole("link", { name: /consultation/i })
    ).toHaveAttribute("href", "/contact");
  });

  it("renders main element", () => {
    renderAboutPage();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
