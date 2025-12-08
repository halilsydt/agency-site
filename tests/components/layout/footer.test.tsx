import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Footer } from "@/components/layout/footer";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render Footer with LanguageProvider wrapper
 */
function renderFooter() {
  return render(
    <LanguageProvider>
      <Footer />
    </LanguageProvider>
  );
}

describe("Footer", () => {
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
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the logo with correct text", () => {
    renderFooter();
    expect(screen.getByText("Scalenty")).toBeInTheDocument();
  });

  it("renders logo linked to homepage", () => {
    renderFooter();
    // Find the logo link specifically by looking for the one with href="/"
    const logoLinks = screen.getAllByRole("link").filter(
      (link) => link.getAttribute("href") === "/" && link.textContent?.includes("Scalenty")
    );
    expect(logoLinks).toHaveLength(1);
    expect(logoLinks[0]).toHaveAttribute("href", "/");
  });

  it("renders the tagline", () => {
    renderFooter();
    expect(
      screen.getByText(/honest e-commerce consulting for amazon.*etsy sellers/i)
    ).toBeInTheDocument();
  });

  it("renders contact email with mailto link", () => {
    renderFooter();
    const emailLink = screen.getByRole("link", {
      name: "admin@scalenty.net",
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:admin@scalenty.net");
  });

  // Social links are currently empty - tests will be added when social profiles are created

  it("renders all quick links", () => {
    renderFooter();
    expect(
      screen.getByRole("link", { name: "Amazon Services" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Etsy Services" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("renders quick links with correct href values", () => {
    renderFooter();
    expect(
      screen.getByRole("link", { name: "Amazon Services" })
    ).toHaveAttribute("href", "/services/amazon");
    expect(
      screen.getByRole("link", { name: "Etsy Services" })
    ).toHaveAttribute("href", "/services/etsy");
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

  it("renders Privacy Policy link with correct href", () => {
    renderFooter();
    const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("renders Terms of Service link with correct href", () => {
    renderFooter();
    const termsLink = screen.getByRole("link", { name: /terms of service/i });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute("href", "/terms");
  });

  it("renders copyright notice with current year", () => {
    renderFooter();
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear}`))
    ).toBeInTheDocument();
    expect(screen.getByText(/scalenty.*all rights reserved/i)).toBeInTheDocument();
  });

  it("renders with proper semantic HTML (footer element)", () => {
    renderFooter();
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("renders with muted background styling", () => {
    renderFooter();
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-muted");
  });

  it("renders responsive grid classes", () => {
    renderFooter();
    const footer = screen.getByRole("contentinfo");
    // Check that the grid container exists with responsive classes
    const gridContainer = footer.querySelector(".grid");
    expect(gridContainer).toHaveClass("grid-cols-1");
    expect(gridContainer).toHaveClass("md:grid-cols-2");
    expect(gridContainer).toHaveClass("lg:grid-cols-4");
  });

  it("renders section headings", () => {
    renderFooter();
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    // Contact heading - use getAllByText since "Contact" also exists as a quick link
    const contactHeadings = screen.getAllByText("Contact");
    expect(contactHeadings.length).toBeGreaterThanOrEqual(1);
  });

  it("renders footer navigation with aria-label", () => {
    renderFooter();
    const nav = screen.getByRole("navigation", { name: /footer quick links/i });
    expect(nav).toBeInTheDocument();
  });
});
