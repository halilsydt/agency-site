import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

describe("WhyChooseUs", () => {
  it("renders the section headline", () => {
    render(<WhyChooseUs headline="Why Choose Us" />);
    expect(
      screen.getByRole("heading", { level: 2 })
    ).toHaveTextContent("Why Choose Us");
  });

  it("renders all default differentiator cards", () => {
    render(<WhyChooseUs headline="Why Choose Us" />);
    expect(screen.getByText("Honest Approach")).toBeInTheDocument();
    expect(screen.getByText("Real Results")).toBeInTheDocument();
    expect(screen.getByText("Transparent Pricing")).toBeInTheDocument();
    expect(screen.getByText("Platform Expertise")).toBeInTheDocument();
  });

  it("renders differentiator icons", () => {
    render(<WhyChooseUs headline="Why Choose Us" />);
    expect(screen.getByText("🤝")).toBeInTheDocument();
    expect(screen.getByText("📈")).toBeInTheDocument();
    expect(screen.getByText("💰")).toBeInTheDocument();
    expect(screen.getByText("🎯")).toBeInTheDocument();
  });

  it("renders differentiator descriptions", () => {
    render(<WhyChooseUs headline="Why Choose Us" />);
    expect(screen.getByText(/no hype, no empty promises/i)).toBeInTheDocument();
    expect(screen.getByText(/measurable growth/i)).toBeInTheDocument();
    expect(screen.getByText(/no hidden fees/i)).toBeInTheDocument();
    expect(screen.getByText(/deep specialization/i)).toBeInTheDocument();
  });

  it("renders subheadline when provided", () => {
    render(
      <WhyChooseUs
        headline="Why Choose Us"
        subheadline="What sets us apart"
      />
    );
    expect(screen.getByText("What sets us apart")).toBeInTheDocument();
  });

  it("does not render subheadline when not provided", () => {
    render(<WhyChooseUs headline="Why Choose Us" />);
    expect(screen.queryByText("What sets us apart")).not.toBeInTheDocument();
  });

  it("renders custom differentiators when provided", () => {
    const customDifferentiators = [
      { icon: "✨", title: "Custom Value", description: "Custom description" },
    ];
    render(
      <WhyChooseUs
        headline="Our Values"
        differentiators={customDifferentiators}
      />
    );
    expect(screen.getByText("Custom Value")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
    expect(screen.queryByText("Honest Approach")).not.toBeInTheDocument();
  });
});
