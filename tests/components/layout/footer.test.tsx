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

  it("renders logo linked to homepage with on-dark mark", () => {
    renderFooter();
    const logoLink = screen.getByRole("link", { name: "Scalenty" });
    expect(logoLink).toHaveAttribute("href", "/");
    // on-dark logo mark uses the mint arrow colour
    const fills = Array.from(logoLink.querySelectorAll("path")).map((p) => p.getAttribute("fill"));
    expect(fills).toContain("#6FD3A4");
  });

  it("renders the tagline", () => {
    renderFooter();
    expect(
      screen.getAllByText(/honest e-commerce consulting for etsy.*amazon sellers/i).length
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders contact email with mailto link", () => {
    renderFooter();
    const emailLink = screen.getByRole("link", {
      name: "admin@scalenty.net",
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:admin@scalenty.net");
  });

  it("renders Quick Links column links with correct hrefs", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/pricing");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
  });

  it("renders Services column links with correct hrefs", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: "Amazon Services" })).toHaveAttribute(
      "href",
      "/services/amazon"
    );
    expect(screen.getByRole("link", { name: "Etsy Services" })).toHaveAttribute(
      "href",
      "/services/etsy"
    );
    expect(screen.getByRole("link", { name: "Book a Call" })).toHaveAttribute("href", "/contact");
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
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
    expect(screen.getByText(/scalenty.*all rights reserved/i)).toBeInTheDocument();
  });

  it("renders with proper semantic HTML (footer element)", () => {
    renderFooter();
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("renders with the Atlas ink background", () => {
    renderFooter();
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-ink");
  });

  it("renders the Atlas 4-column grid that collapses to 2 columns", () => {
    renderFooter();
    const footer = screen.getByRole("contentinfo");
    const gridContainer = footer.querySelector(".grid");
    expect(gridContainer).toHaveClass("grid-cols-[1.7fr_1fr_1fr_1fr]");
    expect(gridContainer).toHaveClass("max-[760px]:grid-cols-2");
  });

  it("renders section headings", () => {
    renderFooter();
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    // Contact heading - use getAllByText since contact-related text recurs
    const contactHeadings = screen.getAllByText("Contact");
    expect(contactHeadings.length).toBeGreaterThanOrEqual(1);
  });

  it("renders footer navigation with aria-label", () => {
    renderFooter();
    const nav = screen.getByRole("navigation", { name: /footer quick links/i });
    expect(nav).toBeInTheDocument();
  });
});
