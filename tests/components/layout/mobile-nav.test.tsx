import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MobileNav } from "@/components/layout/mobile-nav";
import type { NavItem } from "@/components/layout/header";

// Mock next/navigation
const mockPathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

const mockNavItems: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Amazon Services", href: "/services/amazon" },
      { label: "Etsy Services", href: "/services/etsy" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const mockIsActive = vi.fn((href: string) => href === mockPathname());

describe("MobileNav", () => {
  beforeEach(() => {
    mockPathname.mockReturnValue("/");
    mockIsActive.mockImplementation((href: string) => href === mockPathname());
  });

  it("renders hamburger button with correct aria-label", () => {
    render(<MobileNav items={mockNavItems} isActive={mockIsActive} />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toBeInTheDocument();
  });

  it("hamburger button is hidden on md screens and above", () => {
    render(<MobileNav items={mockNavItems} isActive={mockIsActive} />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveClass("md:hidden");
  });

  it("opens sheet when hamburger is clicked", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    const button = screen.getByRole("button", { name: "Open menu" });
    await user.click(button);

    // Sheet should be open with navigation title
    expect(screen.getByText("Navigation")).toBeInTheDocument();
  });

  it("displays all navigation items when sheet is open", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Amazon Services")).toBeInTheDocument();
    expect(screen.getByText("Etsy Services")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("displays Services children as sub-items", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    // Amazon and Etsy should be links
    const amazonLink = screen.getByRole("link", { name: "Amazon Services" });
    const etsyLink = screen.getByRole("link", { name: "Etsy Services" });

    expect(amazonLink).toHaveAttribute("href", "/services/amazon");
    expect(etsyLink).toHaveAttribute("href", "/services/etsy");
  });

  it("sheet can be closed via close button", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

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
    render(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    expect(pricingLink).toHaveClass("bg-accent");
    expect(pricingLink).toHaveClass("font-medium");
  });

  it("applies active styling to nested routes", async () => {
    mockPathname.mockReturnValue("/services/amazon");
    mockIsActive.mockImplementation(
      (href: string) =>
        href === "/services/amazon" || href === "/services"
    );

    const user = userEvent.setup();
    render(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const amazonLink = screen.getByRole("link", { name: "Amazon Services" });
    expect(amazonLink).toHaveClass("bg-accent");
  });

  it("has mobile navigation landmark", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const nav = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(nav).toBeInTheDocument();
  });

  it("renders navigation links with correct hrefs", async () => {
    const user = userEvent.setup();
    render(<MobileNav items={mockNavItems} isActive={mockIsActive} />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

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
