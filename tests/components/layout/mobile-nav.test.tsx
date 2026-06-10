import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MobileNav } from "@/components/layout/mobile-nav";
import type { NavItem } from "@/components/layout/header";
import { LanguageProvider } from "@/components/providers/language-provider";

// Mock next/navigation
const mockPathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

/**
 * Render component wrapped with LanguageProvider
 */
function renderWithProvider(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

// Atlas flat nav set (matches the header)
const mockNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Amazon", href: "/services/amazon" },
  { label: "Etsy", href: "/services/etsy" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const mockIsActive = vi.fn((href: string) => href === mockPathname());

describe("MobileNav", () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    mockPathname.mockReturnValue("/");
    mockIsActive.mockImplementation((href: string) => href === mockPathname());

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

  it("renders hamburger button with correct aria-label", () => {
    renderWithProvider(<MobileNav items={mockNavItems} isActive={mockIsActive} />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toBeInTheDocument();
  });

  it("hamburger button is hidden above the Atlas 860px breakpoint", () => {
    renderWithProvider(<MobileNav items={mockNavItems} isActive={mockIsActive} />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveClass("min-[861px]:hidden");
  });

  it("opens sheet when hamburger is clicked", async () => {
    const user = userEvent.setup();
    renderWithProvider(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    const button = screen.getByRole("button", { name: "Open menu" });
    await user.click(button);

    // Sheet should be open with navigation title
    expect(screen.getByText("Navigation")).toBeInTheDocument();
  });

  it("displays all navigation items when sheet is open", async () => {
    const user = userEvent.setup();
    renderWithProvider(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Amazon" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Etsy" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "FAQ" })).toBeInTheDocument();
  });

  it("includes a Book a Call CTA linking to contact", async () => {
    const user = userEvent.setup();
    renderWithProvider(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const cta = screen.getByRole("link", { name: "Book a Call" });
    expect(cta).toHaveAttribute("href", "/contact");
  });

  it("renders Amazon and Etsy as top-level service links", async () => {
    const user = userEvent.setup();
    renderWithProvider(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("link", { name: "Amazon" })).toHaveAttribute(
      "href",
      "/services/amazon"
    );
    expect(screen.getByRole("link", { name: "Etsy" })).toHaveAttribute("href", "/services/etsy");
  });

  it("sheet can be closed via close button", async () => {
    const user = userEvent.setup();
    renderWithProvider(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByText("Navigation")).toBeInTheDocument();

    // Click close button (sr-only text is "Close")
    const closeButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText("Navigation")).not.toBeInTheDocument();
    });
  });

  it("applies active styling to current route", async () => {
    mockPathname.mockReturnValue("/pricing");
    mockIsActive.mockImplementation((href: string) => href === "/pricing");

    const user = userEvent.setup();
    renderWithProvider(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    expect(pricingLink).toHaveClass("text-green-d");
    expect(pricingLink).toHaveAttribute("aria-current", "page");
  });

  it("applies active styling to a top-level service route", async () => {
    mockPathname.mockReturnValue("/services/amazon");
    mockIsActive.mockImplementation((href: string) => href === "/services/amazon");

    const user = userEvent.setup();
    renderWithProvider(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const amazonLink = screen.getByRole("link", { name: "Amazon" });
    expect(amazonLink).toHaveClass("text-green-d");
  });

  it("has mobile navigation landmark", async () => {
    const user = userEvent.setup();
    renderWithProvider(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const nav = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(nav).toBeInTheDocument();
  });

  it("renders navigation links with correct hrefs", async () => {
    const user = userEvent.setup();
    renderWithProvider(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/pricing");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
  });
});
