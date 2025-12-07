import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FAQPage from "@/app/faq/page";

// Mock content accessor
vi.mock("@/lib/content", () => ({
  getFAQPageContent: () => ({
    hero: {
      headline: "Frequently Asked Questions",
      subheadline: "Find answers to common questions.",
    },
    faqs: [
      {
        id: "faq-1",
        category: "general",
        question: "General Q?",
        answer: "General A",
      },
      {
        id: "faq-2",
        category: "amazon",
        question: "Amazon Q?",
        answer: "Amazon A",
      },
      {
        id: "faq-3",
        category: "pricing",
        question: "Pricing Q?",
        answer: "Pricing A",
      },
    ],
  }),
}));

describe("FAQPage", () => {
  it("renders page headline", () => {
    render(<FAQPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Frequently Asked Questions"
    );
  });

  it("renders page subheadline", () => {
    render(<FAQPage />);
    expect(
      screen.getByText("Find answers to common questions.")
    ).toBeInTheDocument();
  });

  it("renders FAQ accordion", () => {
    render(<FAQPage />);
    expect(screen.getByText("General Q?")).toBeInTheDocument();
    expect(screen.getByText("Amazon Q?")).toBeInTheDocument();
    expect(screen.getByText("Pricing Q?")).toBeInTheDocument();
  });

  it("renders category filter", () => {
    render(<FAQPage />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Amazon" })).toBeInTheDocument();
  });

  it("renders contact CTA at bottom", () => {
    render(<FAQPage />);
    expect(
      screen.getByRole("heading", { name: /Still Have Questions/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact Us/i })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("filtering by category shows only matching FAQs", async () => {
    const user = userEvent.setup();
    render(<FAQPage />);

    // Initially all FAQs visible
    expect(screen.getByText("General Q?")).toBeInTheDocument();
    expect(screen.getByText("Amazon Q?")).toBeInTheDocument();
    expect(screen.getByText("Pricing Q?")).toBeInTheDocument();

    // Click Amazon filter
    await user.click(screen.getByRole("button", { name: "Amazon" }));

    // Only Amazon FAQ visible
    expect(screen.queryByText("General Q?")).not.toBeInTheDocument();
    expect(screen.getByText("Amazon Q?")).toBeInTheDocument();
    expect(screen.queryByText("Pricing Q?")).not.toBeInTheDocument();
  });

  it("clicking All filter shows all FAQs again", async () => {
    const user = userEvent.setup();
    render(<FAQPage />);

    // Click Amazon filter first
    await user.click(screen.getByRole("button", { name: "Amazon" }));
    expect(screen.queryByText("General Q?")).not.toBeInTheDocument();

    // Click All filter
    await user.click(screen.getByRole("button", { name: "All" }));

    // All FAQs visible again
    expect(screen.getByText("General Q?")).toBeInTheDocument();
    expect(screen.getByText("Amazon Q?")).toBeInTheDocument();
    expect(screen.getByText("Pricing Q?")).toBeInTheDocument();
  });
});
