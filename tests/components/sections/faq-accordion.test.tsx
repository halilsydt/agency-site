import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import type { FAQ } from "@/lib/types";

const mockFaqs: FAQ[] = [
  {
    id: "faq-1",
    category: "general",
    question: "Question 1?",
    answer: "Answer 1",
  },
  {
    id: "faq-2",
    category: "amazon",
    question: "Question 2?",
    answer: "Answer 2",
  },
];

describe("FAQAccordion", () => {
  it("renders all FAQ questions", () => {
    render(<FAQAccordion faqs={mockFaqs} />);

    expect(screen.getByText("Question 1?")).toBeInTheDocument();
    expect(screen.getByText("Question 2?")).toBeInTheDocument();
  });

  it("shows answer when accordion item expanded", async () => {
    const user = userEvent.setup();
    render(<FAQAccordion faqs={mockFaqs} />);

    const trigger = screen.getByRole("button", { name: /Question 1/i });
    await user.click(trigger);

    expect(screen.getByText("Answer 1")).toBeVisible();
  });

  it("accordion trigger has correct ARIA attributes", async () => {
    const user = userEvent.setup();
    render(<FAQAccordion faqs={mockFaqs} />);

    const trigger = screen.getByRole("button", { name: /Question 1/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("keyboard navigation works", async () => {
    const user = userEvent.setup();
    render(<FAQAccordion faqs={mockFaqs} />);

    const trigger = screen.getByRole("button", { name: /Question 1/i });
    trigger.focus();
    await user.keyboard("{Enter}");

    expect(trigger).toHaveAttribute("data-state", "open");
  });

  it("renders empty state when no FAQs provided", () => {
    render(<FAQAccordion faqs={[]} />);

    expect(
      screen.queryByRole("button", { name: /Question/i })
    ).not.toBeInTheDocument();
  });
});
