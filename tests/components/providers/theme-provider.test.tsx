import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ThemeProvider, useTheme } from "@/components/providers/theme-provider";

// Test component that uses the hook
function TestComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved-theme">{resolvedTheme}</span>
      <button onClick={() => setTheme("light")}>Set Light</button>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("system")}>Set System</button>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  let localStorageMock: Record<string, string>;
  let matchMediaMock: ReturnType<typeof vi.fn>;

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

    // Mock matchMedia for system preference
    matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-color-scheme: dark)" ? false : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    vi.stubGlobal("matchMedia", matchMediaMock);

    // Clear any existing classes on document
    document.documentElement.classList.remove("light", "dark");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.classList.remove("light", "dark");
  });

  it("renders children when mounted", () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Child Content</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("defaults to system theme when no preference stored", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("system");
  });

  it("respects system preference when theme is system and user prefers light", () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === "(prefers-color-scheme: dark)" ? false : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("light");
  });

  it("respects system preference when theme is system and user prefers dark", () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query === "(prefers-color-scheme: dark)" ? true : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("dark");
  });

  it("loads theme from localStorage on mount", () => {
    localStorageMock["scalenty-theme"] = "dark";

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("dark");
  });

  it("localStorage preference overrides system preference", () => {
    // System prefers light
    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    // But localStorage has dark
    localStorageMock["scalenty-theme"] = "dark";

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("dark");
  });

  it("setTheme updates theme and persists to localStorage", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("Set Dark"));

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(localStorage.setItem).toHaveBeenCalledWith("scalenty-theme", "dark");
  });

  it("toggleTheme switches between light and dark", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    // Start with light
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("light");

    // Toggle to dark
    fireEvent.click(screen.getByText("Toggle"));
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("dark");

    // Toggle back to light
    fireEvent.click(screen.getByText("Toggle"));
    expect(screen.getByTestId("resolved-theme")).toHaveTextContent("light");
  });

  it("adds dark class to html element when dark mode", () => {
    localStorageMock["scalenty-theme"] = "dark";

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes dark class when switching to light mode", () => {
    localStorageMock["scalenty-theme"] = "dark";

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);

    fireEvent.click(screen.getByText("Set Light"));

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("throws error when useTheme is used outside ThemeProvider", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useTheme must be used within a ThemeProvider"
    );

    consoleSpy.mockRestore();
  });

  it("listens for system preference changes when theme is system", () => {
    const addEventListenerMock = vi.fn();
    const removeEventListenerMock = vi.fn();

    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
    }));

    const { unmount } = render(
      <ThemeProvider defaultTheme="system">
        <TestComponent />
      </ThemeProvider>
    );

    expect(addEventListenerMock).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalled();
  });
});
