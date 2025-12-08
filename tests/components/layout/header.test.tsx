import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";

// Mock next/navigation
const mockPathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

// Mock MobileNav to isolate Header tests
vi.mock("@/components/layout/mobile-nav", () => ({
  MobileNav: () => <div data-testid="mobile-nav">Mobile Nav</div>,
}));

/**
 * Render component wrapped with ThemeProvider and LanguageProvider
 */
function renderWithProvider(ui: React.ReactElement) {
  return render(
    <LanguageProvider>
      <ThemeProvider>{ui}</ThemeProvider>
    </LanguageProvider>
  );
}

describe("Header", () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    mockPathname.mockReturnValue("/");

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
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the logo linked to homepage", () => {
    renderWithProvider(<Header />);
    const logoLink = screen.getByRole("link", { name: /scalenty/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders all main navigation items", () => {
    renderWithProvider(<Header />);
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders Services dropdown with Amazon and Etsy links", async () => {
    const user = userEvent.setup();
    renderWithProvider(<Header />);

    // Click Services to open dropdown
    const servicesButton = screen.getByText("Services");
    await user.click(servicesButton);

    // Check dropdown items are visible
    expect(screen.getByText("Amazon Services")).toBeInTheDocument();
    expect(screen.getByText("Etsy Services")).toBeInTheDocument();
  });

  it("renders Services dropdown links with correct hrefs", async () => {
    const user = userEvent.setup();
    renderWithProvider(<Header />);

    const servicesButton = screen.getByText("Services");
    await user.click(servicesButton);

    const amazonLink = screen.getByRole("link", { name: "Amazon Services" });
    const etsyLink = screen.getByRole("link", { name: "Etsy Services" });

    expect(amazonLink).toHaveAttribute("href", "/services/amazon");
    expect(etsyLink).toHaveAttribute("href", "/services/etsy");
  });

  it("applies sticky positioning classes", () => {
    renderWithProvider(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("sticky");
    expect(header).toHaveClass("top-0");
    expect(header).toHaveClass("z-50");
  });

  it("applies backdrop blur effect", () => {
    renderWithProvider(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("backdrop-blur");
  });

  it("renders MobileNav component", () => {
    renderWithProvider(<Header />);
    expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();
  });

  it("applies active styling when on a matching route", () => {
    mockPathname.mockReturnValue("/pricing");
    renderWithProvider(<Header />);

    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    expect(pricingLink).toHaveClass("text-primary");
  });

  it("applies active styling for nested routes", () => {
    mockPathname.mockReturnValue("/services/amazon");
    renderWithProvider(<Header />);

    // Services trigger should be active
    const servicesButton = screen.getByText("Services");
    expect(servicesButton).toHaveClass("text-primary");
  });

  it("navigation items have correct href values", () => {
    renderWithProvider(<Header />);

    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute(
      "href",
      "/pricing"
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

});
