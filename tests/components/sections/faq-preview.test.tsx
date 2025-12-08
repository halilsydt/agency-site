import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { FAQPreviewSection } from "@/components/sections/faq-preview";
import { LanguageProvider } from "@/components/providers/language-provider";

/**
 * Render FAQPreviewSection with LanguageProvider wrapper
 */
function renderFAQPreview(props: { headline: string; subheadline?: string }) {
  return render(
    <LanguageProvider>
      <FAQPreviewSection {...props} />
    </LanguageProvider>
  );
}

describe("FAQPreviewSection", () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
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

    Object.defineProperty(navigator, "language", {
      get: () => "en-US",
      configurable: true,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the section headline", () => {
    renderFAQPreview({ headline: "Common Questions" });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Common Questions"
    );
  });

  it("renders optional subheadline when provided", () => {
    renderFAQPreview({
      headline: "Common Questions",
      subheadline: "Quick answers to help you decide",
    });
    expect(screen.getByText(/Quick answers/i)).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    renderFAQPreview({ headline: "Common Questions" });
    expect(screen.queryByText(/Quick answers/i)).not.toBeInTheDocument();
  });

  it("renders all default FAQ questions", () => {
    renderFAQPreview({ headline: "Common Questions" });
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
    renderFAQPreview({ headline: "Common Questions" });

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
    renderFAQPreview({ headline: "Common Questions" });

    const trigger = screen.getByRole("button", {
      name: /What platforms do you support/i,
    });
    await user.click(trigger);

    expect(trigger).toHaveAttribute("data-state", "open");
  });

  it("collapses accordion item when clicked again", async () => {
    const user = userEvent.setup();
    renderFAQPreview({ headline: "Common Questions" });

    const trigger = screen.getByRole("button", {
      name: /What platforms do you support/i,
    });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "closed");
  });

  it("renders the CTA link to FAQ page", () => {
    renderFAQPreview({ headline: "Common Questions" });
    const link = screen.getByRole("link", { name: /View All FAQs/i });
    expect(link).toHaveAttribute("href", "/faq");
  });

  it("renders 5 FAQ items", () => {
    renderFAQPreview({ headline: "FAQs" });
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(5);
  });
});
