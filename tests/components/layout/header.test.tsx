import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Header } from "@/components/layout/header";
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
 * Render component wrapped with LanguageProvider
 */
function renderWithProvider(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
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

  it("renders all Atlas top-level navigation items", () => {
    renderWithProvider(<Header />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Amazon" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Etsy" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "FAQ" })).toBeInTheDocument();
  });

  it("exposes Amazon and Etsy as top-level links with service hrefs", () => {
    renderWithProvider(<Header />);
    expect(screen.getByRole("link", { name: "Amazon" })).toHaveAttribute(
      "href",
      "/services/amazon"
    );
    expect(screen.getByRole("link", { name: "Etsy" })).toHaveAttribute("href", "/services/etsy");
  });

  it("renders the language pill", () => {
    renderWithProvider(<Header />);
    const pill = screen.getByRole("button", { name: /türkçe'ye geç/i });
    expect(pill).toBeInTheDocument();
    expect(pill).toHaveTextContent("EN");
    expect(pill).toHaveTextContent("TR");
  });

  it("renders the Book a Call CTA linking to contact", () => {
    renderWithProvider(<Header />);
    const cta = screen.getByRole("link", { name: "Book a Call" });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/contact");
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
    expect(header).toHaveClass("backdrop-blur-[14px]");
  });

  it("renders MobileNav component", () => {
    renderWithProvider(<Header />);
    expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();
  });

  it("applies active styling when on a matching route", () => {
    mockPathname.mockReturnValue("/pricing");
    renderWithProvider(<Header />);

    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    expect(pricingLink).toHaveClass("text-ink");
    expect(pricingLink).toHaveAttribute("aria-current", "page");
  });

  it("applies active styling for a top-level service route", () => {
    mockPathname.mockReturnValue("/services/amazon");
    renderWithProvider(<Header />);

    const amazonLink = screen.getByRole("link", { name: "Amazon" });
    expect(amazonLink).toHaveClass("text-ink");
    expect(amazonLink).toHaveAttribute("aria-current", "page");
  });

  it("matches Home only on the exact root path", () => {
    mockPathname.mockReturnValue("/pricing");
    renderWithProvider(<Header />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).not.toHaveAttribute("aria-current", "page");
  });

  it("navigation items have correct href values", () => {
    renderWithProvider(<Header />);

    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/pricing");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
  });
});
