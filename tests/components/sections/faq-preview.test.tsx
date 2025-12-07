import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { FAQPreviewSection } from "@/components/sections/faq-preview";

describe("FAQPreviewSection", () => {
  it("renders the section headline", () => {
    render(<FAQPreviewSection headline="Common Questions" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Common Questions"
    );
  });

  it("renders optional subheadline when provided", () => {
    render(
      <FAQPreviewSection
        headline="Common Questions"
        subheadline="Quick answers to help you decide"
      />
    );
    expect(screen.getByText(/Quick answers/i)).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    render(<FAQPreviewSection headline="Common Questions" />);
    expect(screen.queryByText(/Quick answers/i)).not.toBeInTheDocument();
  });

  it("renders all default FAQ questions", () => {
    render(<FAQPreviewSection headline="Common Questions" />);
    expect(
      screen.getByText(/What platforms do you support/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/How does the consultation process work/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Are there any hidden fees/i)).toBeInTheDocument();
    expect(
      screen.getByText(/How long before I see results/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Do you offer refunds or guarantees/i)
    ).toBeInTheDocument();
  });

  it("shows FAQ answer when accordion item is expanded", async () => {
    const user = userEvent.setup();
    render(<FAQPreviewSection headline="Common Questions" />);

    const trigger = screen.getByRole("button", {
      name: /What platforms do you support/i,
    });
    await user.click(trigger);

    expect(
      screen.getByText(/We specialize in Amazon and Etsy/i)
    ).toBeVisible();
  });

  it("expands accordion item when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<FAQPreviewSection headline="Common Questions" />);

    const trigger = screen.getByRole("button", {
      name: /What platforms do you support/i,
    });
    await user.click(trigger);

    expect(trigger).toHaveAttribute("data-state", "open");
  });

  it("collapses accordion item when clicked again", async () => {
    const user = userEvent.setup();
    render(<FAQPreviewSection headline="Common Questions" />);

    const trigger = screen.getByRole("button", {
      name: /What platforms do you support/i,
    });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "closed");
  });

  it("renders the CTA link to FAQ page", () => {
    render(<FAQPreviewSection headline="Common Questions" />);
    const link = screen.getByRole("link", { name: /View All FAQs/i });
    expect(link).toHaveAttribute("href", "/faq");
  });

  it("renders custom FAQ items when provided", async () => {
    const user = userEvent.setup();
    const customFAQs = [
      { id: "custom-1", question: "Custom Question?", answer: "Custom Answer" },
    ];
    render(<FAQPreviewSection headline="FAQs" faqItems={customFAQs} />);
    expect(screen.getByText("Custom Question?")).toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: /Custom Question/i });
    await user.click(trigger);
    expect(screen.getByText("Custom Answer")).toBeVisible();
  });

  it("only shows custom FAQ items when provided, not defaults", () => {
    const customFAQs = [
      { id: "custom-1", question: "Custom Question?", answer: "Custom Answer" },
    ];
    render(<FAQPreviewSection headline="FAQs" faqItems={customFAQs} />);
    expect(
      screen.queryByText(/What platforms do you support/i)
    ).not.toBeInTheDocument();
  });
});
