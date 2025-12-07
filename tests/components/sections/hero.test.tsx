import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "@/components/sections/hero";

const defaultProps = {
  headline: "Test Headline",
  subheadline: "Test subheadline text",
  primaryCta: { text: "Primary CTA", href: "/contact" },
  secondaryCta: { text: "Secondary CTA", href: "/pricing" },
};

describe("Hero", () => {
  it("renders the headline as h1", () => {
    render(<Hero {...defaultProps} />);
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toHaveTextContent("Test Headline");
  });

  it("renders the subheadline", () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText("Test subheadline text")).toBeInTheDocument();
  });

  it("renders primary CTA button with correct href", () => {
    render(<Hero {...defaultProps} />);
    expect(
      screen.getByRole("link", { name: /primary cta/i })
    ).toHaveAttribute("href", "/contact");
  });

  it("renders secondary CTA button when provided", () => {
    render(<Hero {...defaultProps} />);
    expect(
      screen.getByRole("link", { name: /secondary cta/i })
    ).toHaveAttribute("href", "/pricing");
  });

  it("does not render secondary CTA when not provided", () => {
    const { secondaryCta, ...propsWithoutSecondary } = defaultProps;
    render(<Hero {...propsWithoutSecondary} />);
    expect(
      screen.queryByRole("link", { name: /secondary cta/i })
    ).not.toBeInTheDocument();
  });

  it("renders illustration placeholder", () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByTestId("hero-illustration")).toBeInTheDocument();
  });

  it("renders placeholder text when no imageUrl provided", () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText("Illustration Placeholder")).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided", () => {
    render(<Hero {...defaultProps} imageUrl="/test-image.png" imageAlt="Test alt" />);
    const img = screen.getByRole("img", { name: "Test alt" });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("test-image.png");
  });
});
