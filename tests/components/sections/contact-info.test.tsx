import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContactInfo } from "@/components/sections/contact-info";

describe("ContactInfo", () => {
  it("renders email with mailto link", () => {
    render(<ContactInfo email="test@example.com" />);
    const emailLink = screen.getByRole("link", { name: /test@example\.com/i });
    expect(emailLink).toHaveAttribute("href", "mailto:test@example.com");
  });

  it("renders heading", () => {
    render(<ContactInfo email="test@example.com" />);
    expect(
      screen.getByRole("heading", { name: /reach us directly/i })
    ).toBeInTheDocument();
  });

  it("renders phone when provided", () => {
    render(<ContactInfo email="test@example.com" phone="555-1234" />);
    expect(screen.getByText(/555-1234/)).toBeInTheDocument();
  });

  it("renders address when provided", () => {
    render(<ContactInfo email="test@example.com" address="123 Main St" />);
    expect(screen.getByText(/123 Main St/)).toBeInTheDocument();
  });

  it("does not render phone when not provided", () => {
    render(<ContactInfo email="test@example.com" />);
    expect(screen.queryByText(/phone/i)).not.toBeInTheDocument();
  });
});
