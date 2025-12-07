import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import ContactPage from "@/app/contact/page";

// Mock the formspree API
vi.mock("@/lib/api/formspree", () => ({
  submitContactForm: vi.fn(),
}));

// Mock CalendarEmbed to avoid Cal.com dependencies in tests
vi.mock("@/components/forms/calendar-embed", () => ({
  CalendarEmbed: () => <div data-testid="calendar-embed">Calendar Embed</div>,
}));

// Polyfills for Radix UI - jsdom doesn't support these
beforeAll(() => {
  Element.prototype.hasPointerCapture = vi.fn().mockReturnValue(false);
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

describe("Contact Page", () => {
  it("renders the contact hero with headline", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /touch/i
    );
  });

  it("renders the contact form with fields", () => {
    render(<ContactPage />);
    // Check for form elements by text content and role
    expect(screen.getByText(/name/i, { selector: "label" })).toBeInTheDocument();
    expect(screen.getByText(/email/i, { selector: "label" })).toBeInTheDocument();
    expect(screen.getByText(/message/i, { selector: "label" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("renders contact info with email", () => {
    render(<ContactPage />);
    const emailLink = screen.getByRole("link", {
      name: /admin@scalenty\.net/i,
    });
    expect(emailLink).toHaveAttribute("href", "mailto:admin@scalenty.net");
  });

  it("renders main element", () => {
    render(<ContactPage />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders form section heading", () => {
    render(<ContactPage />);
    expect(
      screen.getByRole("heading", { name: /send us a message/i })
    ).toBeInTheDocument();
  });

  it("renders contact info heading", () => {
    render(<ContactPage />);
    expect(
      screen.getByRole("heading", { name: /reach us directly/i })
    ).toBeInTheDocument();
  });

  it("renders booking section with headline", () => {
    render(<ContactPage />);
    expect(
      screen.getByRole("heading", { name: /book your free consultation/i })
    ).toBeInTheDocument();
  });

  it("includes calendar embed section", () => {
    render(<ContactPage />);
    expect(screen.getByTestId("calendar-embed")).toBeInTheDocument();
  });
});
