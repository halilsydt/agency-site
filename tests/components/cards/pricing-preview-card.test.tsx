import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PricingPreviewCard } from "@/components/cards/pricing-preview-card";

const defaultProps = {
  platform: "amazon" as const,
  title: "Amazon Services",
  startingPrice: 499,
  features: ["Feature 1", "Feature 2", "Feature 3"],
};

describe("PricingPreviewCard", () => {
  it("renders the platform badge", () => {
    render(<PricingPreviewCard {...defaultProps} />);
    expect(screen.getByText("amazon")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<PricingPreviewCard {...defaultProps} />);
    expect(screen.getByText("Amazon Services")).toBeInTheDocument();
  });

  it("renders the starting price", () => {
    render(<PricingPreviewCard {...defaultProps} />);
    expect(screen.getByText(/\$499/)).toBeInTheDocument();
  });

  it('renders "Starting at" label', () => {
    render(<PricingPreviewCard {...defaultProps} />);
    expect(screen.getByText("Starting at")).toBeInTheDocument();
  });

  it("renders all feature highlights", () => {
    render(<PricingPreviewCard {...defaultProps} />);
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
  });

  it("renders etsy platform correctly", () => {
    render(
      <PricingPreviewCard
        platform="etsy"
        title="Etsy Services"
        startingPrice={399}
        features={["Etsy feature 1", "Etsy feature 2"]}
      />
    );
    expect(screen.getByText("etsy")).toBeInTheDocument();
    expect(screen.getByText("Etsy Services")).toBeInTheDocument();
    expect(screen.getByText(/\$399/)).toBeInTheDocument();
  });

  it("renders /month suffix after price", () => {
    render(<PricingPreviewCard {...defaultProps} />);
    expect(screen.getByText("/month")).toBeInTheDocument();
  });

  it("renders features as list items", () => {
    render(<PricingPreviewCard {...defaultProps} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(3);
  });
});
