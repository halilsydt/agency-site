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

  it("renders the about hero with headline", () => {
    renderAboutPage();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /about/i
    );
  });

  it("renders mission section", () => {
    renderAboutPage();
    expect(
      screen.getByRole("heading", { name: /mission/i })
    ).toBeInTheDocument();
  });

  it("renders approach section", () => {
    renderAboutPage();
    expect(
      screen.getByRole("heading", { name: /approach/i })
    ).toBeInTheDocument();
  });

  it("renders experience highlights", () => {
    renderAboutPage();
    expect(screen.getByText(/years experience/i)).toBeInTheDocument();
    expect(screen.getByText(/clients helped/i)).toBeInTheDocument();
  });

  it("renders team section", () => {
    renderAboutPage();
    expect(
      screen.getByRole("heading", { name: /founder/i })
    ).toBeInTheDocument();
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
