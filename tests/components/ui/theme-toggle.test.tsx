import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ThemeProvider } from "@/components/providers/theme-provider";

describe("ThemeToggle", () => {
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

    // Mock matchMedia
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
    );

    document.documentElement.classList.remove("light", "dark");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.classList.remove("light", "dark");
  });

  /**
   * Render ThemeToggle with ThemeProvider wrapper
   */
  function renderToggle(defaultTheme: "light" | "dark" | "system" = "light") {
    return render(
      <ThemeProvider defaultTheme={defaultTheme}>
        <ThemeToggle />
      </ThemeProvider>
    );
  }

  it("renders a button with correct aria-label for light mode", () => {
    renderToggle("light");
    const button = screen.getByRole("button", {
      name: /switch to dark mode/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("renders a button with correct aria-label for dark mode", () => {
    localStorageMock["scalenty-theme"] = "dark";
    renderToggle("dark");
    const button = screen.getByRole("button", {
      name: /switch to light mode/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("toggles theme when clicked", () => {
    renderToggle("light");

    // Initially in light mode
    let button = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();

    // Click to toggle to dark
    fireEvent.click(button);

    // Should now show light mode toggle
    button = screen.getByRole("button", { name: /switch to light mode/i });
    expect(button).toBeInTheDocument();
  });

  it("has ghost variant styling", () => {
    renderToggle();
    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-accent");
  });

  it("has icon size styling", () => {
    renderToggle();
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-10", "w-10");
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

  it("has screen reader text", () => {
    renderToggle();
    expect(screen.getByText("Toggle theme")).toBeInTheDocument();
  });

  it("renders Sun icon in light mode", () => {
    renderToggle("light");
    // Sun icon should be visible (scale-100)
    const button = screen.getByRole("button");
    const sunIcon = button.querySelector("svg.lucide-sun");
    expect(sunIcon).toBeInTheDocument();
  });

  it("renders Moon icon in dark mode", () => {
    localStorageMock["scalenty-theme"] = "dark";
    renderToggle("dark");
    // Moon icon should be visible
    const button = screen.getByRole("button");
    const moonIcon = button.querySelector("svg.lucide-moon");
    expect(moonIcon).toBeInTheDocument();
  });

  it("icons have transition classes for animation", () => {
    renderToggle();
    const button = screen.getByRole("button");
    const icons = button.querySelectorAll("svg");
    icons.forEach((icon) => {
      expect(icon).toHaveClass("transition-all");
      expect(icon).toHaveClass("duration-300");
    });
  });
});
