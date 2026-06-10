import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Hero, type HeroProps } from "@/components/sections/hero";
import { LanguageProvider } from "@/components/providers/language-provider";

const defaultProps: HeroProps = {
  eyebrow: "Amazon & Etsy Consulting",
  line1: "Grow what you",
  line2: "built, with",
  mark: "honesty",
  subheadline: "Test subheadline text",
  primaryCta: { text: "Book Free Consultation", href: "/contact", useDialog: true },
  secondaryCta: { text: "View Pricing", href: "/pricing" },
  stats: [
    { value: 5, suffix: "+", label: "Years experience" },
    { value: 100, suffix: "+", label: "Sellers helped" },
    { value: 1, prefix: "$", suffix: "M+", label: "Revenue generated" },
  ],
  viz: {
    totalSalesLabel: "Total sales · 2025",
    totalSalesValue: "$1.28M",
    pill: "▲ +212%",
    roasValue: "2.1×",
    roasLabel: "Ad ROAS",
    convValue: "+38%",
    convLabel: "Conversion rate",
    floatValue: "30 days",
    floatLabel: "to first results",
  },
};

function renderHero(props: HeroProps = defaultProps) {
  return render(
    <LanguageProvider>
      <Hero {...props} />
    </LanguageProvider>
  );
}

describe("Hero", () => {
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

  it("renders the headline lines (with mark) inside a single h1", () => {
    renderHero();
    const h1 = screen.getByRole("heading", { level: 1 });
    // Lines are separate display blocks; textContent concatenates without spaces.
    expect(h1).toHaveTextContent("Grow what you");
    expect(h1).toHaveTextContent("built, with");
    expect(h1).toHaveTextContent("honesty");
  });

  it("renders the eyebrow label", () => {
    renderHero();
    expect(screen.getByText("Amazon & Etsy Consulting")).toBeInTheDocument();
  });

  it("renders the green mark word", () => {
    renderHero();
    const mark = screen.getByText("honesty");
    expect(mark).toHaveClass("text-green");
  });

  it("renders the subheadline", () => {
    renderHero();
    expect(screen.getByText("Test subheadline text")).toBeInTheDocument();
  });

  it("renders the primary CTA as a button opening the booking dialog", () => {
    renderHero();
    expect(
      screen.getByRole("button", { name: /book free consultation/i })
    ).toBeInTheDocument();
  });

  it("renders the secondary CTA linking to pricing", () => {
    renderHero();
    expect(
      screen.getByRole("link", { name: /view pricing/i })
    ).toHaveAttribute("href", "/pricing");
  });

  it("renders the three hero stat labels", () => {
    renderHero();
    expect(screen.getByText("Years experience")).toBeInTheDocument();
    expect(screen.getByText("Sellers helped")).toBeInTheDocument();
    expect(screen.getByText("Revenue generated")).toBeInTheDocument();
  });

  it("renders the viz card labels", () => {
    renderHero();
    expect(screen.getByText("Total sales · 2025")).toBeInTheDocument();
    expect(screen.getByText("$1.28M")).toBeInTheDocument();
    expect(screen.getByText("Ad ROAS")).toBeInTheDocument();
    expect(screen.getByText("Conversion rate")).toBeInTheDocument();
  });

  it("renders the floating chip", () => {
    renderHero();
    expect(screen.getByText("30 days")).toBeInTheDocument();
    expect(screen.getByText("to first results")).toBeInTheDocument();
  });

  it("does not render an illustration image (replaced by the viz card)", () => {
    renderHero();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
