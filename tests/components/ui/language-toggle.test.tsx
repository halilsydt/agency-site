import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { LanguageProvider } from "@/components/providers/language-provider";

describe("LanguageToggle", () => {
  let localStorageMock: Record<string, string>;

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
    Object.defineProperty(navigator, "language", {
      get: () => "en-US",
      configurable: true,
    });

    document.documentElement.lang = "en";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.lang = "en";
  });

  /**
   * Render LanguageToggle with LanguageProvider wrapper
   */
  function renderToggle(initialLocale: "en" | "tr" = "en") {
    if (initialLocale !== "en") {
      localStorageMock["scalenty-locale"] = initialLocale;
    }
    return render(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>
    );
  }

  it("renders a button with correct aria-label for English locale", () => {
    renderToggle("en");
    const button = screen.getByRole("button", {
      name: /türkçe'ye geç/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("renders a button with correct aria-label for Turkish locale", () => {
    renderToggle("tr");
    const button = screen.getByRole("button", {
      name: /switch to english/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("displays EN when in English locale", () => {
    renderToggle("en");
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("EN");
  });

  it("displays TR when in Turkish locale", () => {
    renderToggle("tr");
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("TR");
  });

  it("toggles locale when clicked", () => {
    renderToggle("en");

    // Initially in English
    let button = screen.getByRole("button");
    expect(button).toHaveTextContent("EN");

    // Click to toggle to Turkish
    fireEvent.click(button);

    // Should now show TR
    button = screen.getByRole("button");
    expect(button).toHaveTextContent("TR");
  });

  it("toggles from Turkish to English when clicked", () => {
    renderToggle("tr");

    let button = screen.getByRole("button");
    expect(button).toHaveTextContent("TR");

    fireEvent.click(button);

    button = screen.getByRole("button");
    expect(button).toHaveTextContent("EN");
  });

  it("has ghost variant styling", () => {
    renderToggle();
    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-accent");
  });

  it("has sm size styling", () => {
    renderToggle();
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-8");
  });

  it("is keyboard accessible", () => {
    renderToggle();
    const button = screen.getByRole("button");

    // Can receive focus
    button.focus();
    expect(button).toHaveFocus();

    // Can be activated with keyboard
    fireEvent.keyDown(button, { key: "Enter" });
  });

  it("updates localStorage when toggled", () => {
    renderToggle("en");
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(localStorage.setItem).toHaveBeenCalledWith("scalenty-locale", "tr");
  });

  it("updates html lang attribute when toggled", () => {
    renderToggle("en");
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(document.documentElement.lang).toBe("tr");
  });
});
