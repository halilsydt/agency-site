import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PrivacyPage from "@/app/privacy/page";

describe("PrivacyPage", () => {
  it("renders page title", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /privacy policy/i
    );
  });

  it("renders last updated date in hero section", () => {
    render(<PrivacyPage />);
    // The hero section contains "Last updated: YYYY-MM-DD"
    expect(screen.getByText(/last updated: \d{4}-\d{2}-\d{2}/i)).toBeInTheDocument();
  });

  it("renders all content sections with h2 headings", () => {
    render(<PrivacyPage />);
    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.length).toBeGreaterThan(0);
    // Verify expected sections exist
    expect(screen.getByRole("heading", { name: /data collection/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /cookies/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /third-party services/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /your rights/i })).toBeInTheDocument();
  });

  it("has correct heading hierarchy", () => {
    render(<PrivacyPage />);
    // h1 for main title
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
    // h2 for section titles (no h3, h4, etc. to skip levels)
    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.length).toBeGreaterThanOrEqual(6); // 6 sections defined
  });

  it("mentions third-party services", () => {
    render(<PrivacyPage />);
    // Use getAllByText since services may be mentioned multiple times
    expect(screen.getAllByText(/plausible/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/formspree/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/cal\.com/i).length).toBeGreaterThan(0);
  });

  it("renders introduction text", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByText(/we take your privacy seriously/i)
    ).toBeInTheDocument();
  });
});
