import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  LanguageProvider,
  useLanguage,
} from "@/components/providers/language-provider";

/**
 * Test component that uses the useLanguage hook.
 */
function TestComponent() {
  const { locale, setLocale } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <button onClick={() => setLocale("en")}>Set English</button>
      <button onClick={() => setLocale("tr")}>Set Turkish</button>
    </div>
  );
}

describe("LanguageProvider", () => {
  let localStorageMock: Record<string, string>;
  let navigatorLanguageMock: string;

  beforeEach(() => {
    // Reset localStorage mock
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

    // Mock navigator.language
    navigatorLanguageMock = "en-US";
    Object.defineProperty(navigator, "language", {
      get: () => navigatorLanguageMock,
      configurable: true,
    });

    // Reset document lang attribute
    document.documentElement.lang = "en";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.lang = "en";
  });

  it("renders children when mounted", () => {
    render(
      <LanguageProvider>
        <div data-testid="child">Child Content</div>
      </LanguageProvider>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("detects English browser locale on first visit", () => {
    navigatorLanguageMock = "en-US";

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(localStorage.setItem).toHaveBeenCalledWith("scalenty-locale", "en");
  });

  it("detects Turkish browser locale on first visit", () => {
    navigatorLanguageMock = "tr-TR";

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("tr");
    expect(localStorage.setItem).toHaveBeenCalledWith("scalenty-locale", "tr");
  });

  it("maps tr locale variant to tr", () => {
    navigatorLanguageMock = "tr-CY"; // Turkish in Cyprus

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("tr");
  });

  it("localStorage preference overrides browser locale", () => {
    navigatorLanguageMock = "tr-TR";
    localStorageMock["scalenty-locale"] = "en";

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("en");
  });

  it("falls back to English for unsupported locale", () => {
    navigatorLanguageMock = "fr-FR"; // French - not supported

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("en");
  });

  it("falls back to English for invalid localStorage value", () => {
    localStorageMock["scalenty-locale"] = "invalid";

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("en");
  });

  it("setLocale updates state and localStorage", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText("Set Turkish"));

    expect(screen.getByTestId("locale")).toHaveTextContent("tr");
    expect(localStorage.setItem).toHaveBeenCalledWith("scalenty-locale", "tr");
  });

  it("setLocale updates html lang attribute", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText("Set Turkish"));

    expect(document.documentElement.lang).toBe("tr");
  });

  it("html lang attribute is set on mount", () => {
    localStorageMock["scalenty-locale"] = "tr";

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(document.documentElement.lang).toBe("tr");
  });

  it("throws error when useLanguage is used outside LanguageProvider", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useLanguage must be used within a LanguageProvider"
    );

    consoleSpy.mockRestore();
  });

  it("switching from Turkish to English updates all state correctly", () => {
    localStorageMock["scalenty-locale"] = "tr";

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("tr");
    expect(document.documentElement.lang).toBe("tr");

    fireEvent.click(screen.getByText("Set English"));

    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.setItem).toHaveBeenCalledWith("scalenty-locale", "en");
  });
});
