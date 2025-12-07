import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TermsPage from "@/app/terms/page";

describe("TermsPage", () => {
  it("renders page title", () => {
    render(<TermsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /terms of service/i
    );
  });

  it("renders last updated date in hero section", () => {
    render(<TermsPage />);
    // The hero section contains "Last updated: YYYY-MM-DD"
    expect(screen.getByText(/last updated: \d{4}-\d{2}-\d{2}/i)).toBeInTheDocument();
  });

  it("renders all content sections with h2 headings", () => {
    render(<TermsPage />);
    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.length).toBeGreaterThan(0);
    // Verify expected sections exist
    expect(screen.getByRole("heading", { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /disclaimers/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /limitation of liability/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /intellectual property/i })).toBeInTheDocument();
  });

  it("has correct heading hierarchy", () => {
    render(<TermsPage />);
    // h1 for main title
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
    // h2 for section titles (no h3, h4, etc. to skip levels)
    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.length).toBeGreaterThanOrEqual(7); // 7 sections defined
  });

  it("renders introduction text", () => {
    render(<TermsPage />);
    expect(
      screen.getByText(/welcome to marketplace consultants/i)
    ).toBeInTheDocument();
  });
});
