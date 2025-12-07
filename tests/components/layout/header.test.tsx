import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Header, navItems } from "@/components/layout/header";

// Mock next/navigation
const mockPathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

// Mock MobileNav to isolate Header tests
vi.mock("@/components/layout/mobile-nav", () => ({
  MobileNav: () => <div data-testid="mobile-nav">Mobile Nav</div>,
}));

describe("Header", () => {
  beforeEach(() => {
    mockPathname.mockReturnValue("/");
  });

  it("renders the logo linked to homepage", () => {
    render(<Header />);
    const logoLink = screen.getByRole("link", { name: /scalenty/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders all main navigation items", () => {
    render(<Header />);
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders Services dropdown with Amazon and Etsy links", async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Click Services to open dropdown
    const servicesButton = screen.getByText("Services");
    await user.click(servicesButton);

    // Check dropdown items are visible
    expect(screen.getByText("Amazon Services")).toBeInTheDocument();
    expect(screen.getByText("Etsy Services")).toBeInTheDocument();
  });

  it("renders Services dropdown links with correct hrefs", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const servicesButton = screen.getByText("Services");
    await user.click(servicesButton);

    const amazonLink = screen.getByRole("link", { name: "Amazon Services" });
    const etsyLink = screen.getByRole("link", { name: "Etsy Services" });

    expect(amazonLink).toHaveAttribute("href", "/services/amazon");
    expect(etsyLink).toHaveAttribute("href", "/services/etsy");
  });

  it("applies sticky positioning classes", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("sticky");
    expect(header).toHaveClass("top-0");
    expect(header).toHaveClass("z-50");
  });

  it("applies backdrop blur effect", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("backdrop-blur");
  });

  it("renders MobileNav component", () => {
    render(<Header />);
    expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();
  });

  it("applies active styling when on a matching route", () => {
    mockPathname.mockReturnValue("/pricing");
    render(<Header />);

    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    expect(pricingLink).toHaveClass("text-primary");
  });

  it("applies active styling for nested routes", () => {
    mockPathname.mockReturnValue("/services/amazon");
    render(<Header />);

    // Services trigger should be active
    const servicesButton = screen.getByText("Services");
    expect(servicesButton).toHaveClass("text-primary");
  });

  it("navigation items have correct href values", () => {
    render(<Header />);

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

  it("exports navItems with correct structure", () => {
    expect(navItems).toHaveLength(4);

    const services = navItems.find((item) => item.label === "Services");
    expect(services?.children).toHaveLength(2);
    expect(services?.children?.[0].href).toBe("/services/amazon");
    expect(services?.children?.[1].href).toBe("/services/etsy");
  });
});
