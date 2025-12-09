import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import FAQPage from "@/app/faq/page";
import { LanguageProvider } from "@/components/providers/language-provider";

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

// Mock translations
vi.mock("@/lib/translations", () => ({
  getTranslations: () => ({
    common: {
      faqCtaHeadline: "Still Have Questions?",
      faqCtaDescription: "We're here to help.",
      contactUs: "Contact Us",
    },
    faqCategories: {
      all: "All",
      general: "General",
      amazon: "Amazon",
      etsy: "Etsy",
      pricing: "Pricing",
    },
  }),
}));

/**
 * Render FAQPage with LanguageProvider wrapper
 */
function renderFAQPage() {
  return render(
    <LanguageProvider>
      <FAQPage />
    </LanguageProvider>
  );
}

describe("FAQPage", () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    // Reset localStorage mock
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

    // Mock navigator.language
    Object.defineProperty(navigator, "language", {
      get: () => "en-US",
      configurable: true,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders page headline", () => {
    renderFAQPage();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Frequently Asked Questions"
    );
  });

  it("renders page subheadline", () => {
    renderFAQPage();
    expect(
      screen.getByText("Find answers to common questions.")
    ).toBeInTheDocument();
  });

  it("renders FAQ accordion", () => {
    renderFAQPage();
    expect(screen.getByText("General Q?")).toBeInTheDocument();
    expect(screen.getByText("Amazon Q?")).toBeInTheDocument();
    expect(screen.getByText("Pricing Q?")).toBeInTheDocument();
  });

  it("renders category filter", () => {
    renderFAQPage();
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Amazon" })).toBeInTheDocument();
  });

  it("renders contact CTA at bottom", () => {
    renderFAQPage();
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
    renderFAQPage();

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
    renderFAQPage();

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
